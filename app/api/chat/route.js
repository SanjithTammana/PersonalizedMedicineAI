// app/api/chat/route.js

import { NextResponse } from "next/server";
import Groq from "groq-sdk";
import OpenAI from "openai";
import { Pinecone } from "@pinecone-database/pinecone";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
const index = pinecone.index(process.env.PINECONE_INDEX_NAME);

export async function POST(request) {
  try {
    const { message, history = [], treatmentMode = "general" } = await request.json();

    if (!message?.trim()) {
      return NextResponse.json(
        { error: "Message content is required" },
        { status: 400 }
      );
    }

    // 1️⃣ Generate embedding for the user's message
    const embedRes = await openai.embeddings.create({
      model: process.env.OPENAI_EMBEDDING_MODEL || "text-embedding-3-small",
      input: message,
    });
    const userVector = embedRes.data[0].embedding;

    // 2️⃣ Query Pinecone for relevant context
    const queryRes = await index.query({
      vector: userVector,
      topK: 5,
      includeMetadata: true,
      includeValues: false, // Don't need the vector values back
    });

    // 3️⃣ Build context from retrieved documents
    let contextText = "";
    if (queryRes.matches && queryRes.matches.length > 0) {
      // Filter matches by relevance score (optional - adjust threshold as needed)
      const relevantMatches = queryRes.matches.filter(match => match.score > 0.7);

      if (relevantMatches.length > 0) {
        contextText = relevantMatches
          .map((match, i) => {
            const source = match.metadata?.source || "Unknown";
            const text = match.metadata?.text || "";
            return `Context ${i + 1} (Source: ${source}, Relevance: ${match.score.toFixed(2)}):\n${text.substring(0, 800)}...`;
          })
          .join("\n\n");
      }
    }

    // 4️⃣ Enhanced system prompt with context
    const basePrompt = `You are an AI-powered medical assistant trained to diagnose common, non-emergency medical symptoms and recommend appropriate over-the-counter (OTC) treatments available in the United States. Your recommendations span across allopathy, homeopathy, and naturopathy, tailored to user preferences and symptom profiles.

Your task is to:
- Ask clarifying questions to understand the user's symptoms, duration, severity, age, and existing health conditions or medications
- Identify potential common illnesses or conditions, such as cold, allergies, indigestion, minor headaches, muscle pain, or skin irritation
- Provide personalized recommendations for over-the-counter treatment options
- Explain how each treatment works, possible side effects, and when to seek professional care
- Respect limitations — clearly state when the condition may require a licensed medical professional or emergency attention

Based on the user's current treatment preference mode (${treatmentMode}), adjust your recommendations:
- General: Provide options across allopathy, homeopathy, and naturopathy
- Allopathy: Focus on FDA-approved OTC medications (Tylenol, Benadryl, Pepto-Bismol, etc.)
- Homeopathy: Focus on homeopathic remedies (Oscillococcinum, Arnica montana, etc.)
- Naturopathy: Focus on herbal remedies, essential oils, dietary adjustments, and lifestyle modifications

Present information in a friendly, informative, and easy to understand manner. Use bullet points or short paragraphs for clarity. 

⚠️ IMPORTANT DISCLAIMERS:
- Always recommend consulting with a healthcare professional for serious symptoms
- This is for informational purposes only and not a substitute for professional medical advice
- If symptoms worsen or persist, seek immediate medical attention`;

    // 5️⃣ Construct the final system prompt with context
    const systemPrompt = contextText
      ? `${basePrompt}

📚 RELEVANT MEDICAL KNOWLEDGE BASE CONTEXT:
${contextText}

Use this context to inform your recommendations when relevant, but always prioritize user safety and appropriate medical disclaimers.`
      : basePrompt;

    // 6️⃣ Prepare conversation messages
    const messages = [
      { role: "system", content: systemPrompt },
      ...history.map((msg) => ({
        role: msg.sender === "user" ? "user" : "assistant",
        content: msg.text || msg.content, // Handle both text and content properties
      })),
      { role: "user", content: message },
    ];

    // 7️⃣ Get response from Groq
    const chatCompletion = await groq.chat.completions.create({
      messages,
      model: process.env.GROQ_CHAT_MODEL || "mixtral-8x7b-32768",
      temperature: 0.7,
      max_tokens: 1024,
      top_p: 1,
      stream: false,
    });

    const responseMessage = chatCompletion.choices[0]?.message?.content || "No response generated.";

    // 8️⃣ Return response with debug information
    return NextResponse.json({
      response: responseMessage,
      // 🔍 DEBUG INFO - Enable this to verify RAG is working
      debug: {
        contextUsed: queryRes.matches?.length > 0,
        totalMatches: queryRes.matches?.length || 0,
        relevantMatches: queryRes.matches?.filter(m => m.score > 0.7).length || 0,
        topScores: queryRes.matches?.slice(0, 3).map(m => m.score.toFixed(3)) || [],
        sources: queryRes.matches?.slice(0, 3).map(m => ({
          source: m.metadata?.source,
          score: m.score.toFixed(3),
          textPreview: m.metadata?.text?.substring(0, 100) + "..."
        })) || [],
        contextLength: contextText.length,
        hasContext: contextText.length > 0,
        ragStatus: queryRes.matches?.length > 0 ? "✅ RAG Active" : "❌ No Context Found"
      }
    });

  } catch (error) {
    console.error("Error in RAG chat API:", error);

    // More specific error handling
    if (error.message?.includes('OPENAI_API_KEY')) {
      return NextResponse.json(
        { error: "OpenAI API configuration error" },
        { status: 500 }
      );
    } else if (error.message?.includes('PINECONE')) {
      return NextResponse.json(
        { error: "Vector database connection error" },
        { status: 500 }
      );
    } else if (error.message?.includes('GROQ')) {
      return NextResponse.json(
        { error: "Chat model service error" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "An error occurred while processing your request." },
      { status: 500 }
    );
  }
}