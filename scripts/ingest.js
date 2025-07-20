// scripts/ingest.js

const path = require('path');
// 1️⃣ Load your .env.local explicitly
require('dotenv').config({
  path: path.resolve(process.cwd(), '.env.local'),
  override: true,
});

const fs     = require('fs');
const pdf    = require('pdf-parse');
const OpenAI = require('openai').default;
// 👇 Correct import from v6.x SDK
const { Pinecone } = require('@pinecone-database/pinecone');

// ── Simple chunker: split text into ~3 000‑char (~500‑token) passages ──
const CHUNK_SIZE = 3000;
function chunkText(text, size = CHUNK_SIZE) {
  const chunks = [];
  for (let i = 0; i < text.length; i += size) {
    chunks.push(text.slice(i, i + size).trim());
  }
  return chunks.filter(chunk => chunk.length > 0); // Remove empty chunks
}

async function main() {
  // 2️⃣ Validate required env vars
  if (!process.env.OPENAI_API_KEY) {
    console.error('❌ OPENAI_API_KEY missing in .env.local');
    process.exit(1);
  }
  if (!process.env.PINECONE_API_KEY) {
    console.error('❌ PINECONE_API_KEY missing in .env.local');
    process.exit(1);
  }
  if (!process.env.PINECONE_INDEX_NAME) {
    console.error('❌ PINECONE_INDEX_NAME missing in .env.local');
    process.exit(1);
  }

  // 3️⃣ Initialize OpenAI & Pinecone clients
  const openai   = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });

  try {
    // 👇 Get the index reference
    const index = pinecone.index(process.env.PINECONE_INDEX_NAME);

    // Test the index connection
    const indexStats = await index.describeIndexStats();
    console.log('✅ Connected to Pinecone index:', process.env.PINECONE_INDEX_NAME);
    console.log('Index stats:', indexStats);

    // 4️⃣ Point at your PDFs folder
    const docsDir = path.resolve(process.cwd(), 'documents');
    if (!fs.existsSync(docsDir)) {
      console.error(`❌ documents folder not found at ${docsDir}`);
      process.exit(1);
    }
    const files = fs
      .readdirSync(docsDir)
      .filter(f => f.toLowerCase().endsWith('.pdf'));
    if (files.length === 0) {
      console.error(`❌ no PDF files in ${docsDir}`);
      process.exit(1);
    }

    console.log(`📁 Found ${files.length} PDF files to process...`);

    // 5️⃣ Ingest each PDF
    for (const file of files) {
      console.log(`📖 Processing ${file}...`);

      const buffer = fs.readFileSync(path.join(docsDir, file));
      const { text } = await pdf(buffer);

      if (!text || text.trim().length === 0) {
        console.warn(`⚠️ No text extracted from ${file}, skipping...`);
        continue;
      }

      const passages = chunkText(text);
      console.log(`📄 Split ${file} into ${passages.length} chunks`);

      // Process chunks in batches to avoid rate limits
      const batchSize = 10;
      for (let batchStart = 0; batchStart < passages.length; batchStart += batchSize) {
        const batch = passages.slice(batchStart, batchStart + batchSize);
        const vectors = [];

        for (let i = 0; i < batch.length; i++) {
          const chunk = batch[i];
          const actualIndex = batchStart + i;

          try {
            console.log(`🔄 Creating embedding for chunk ${actualIndex + 1}/${passages.length} of ${file}...`);

            const embedRes = await openai.embeddings.create({
              model: process.env.OPENAI_EMBEDDING_MODEL || 'text-embedding-ada-002',
              input: chunk,
            });

            vectors.push({
              id: `${file}::${actualIndex}`,
              values: embedRes.data[0].embedding,
              metadata: {
                text: chunk,
                source: file,
                chunkIndex: actualIndex,
                totalChunks: passages.length
              },
            });

            // Add a small delay to respect rate limits
            await new Promise(resolve => setTimeout(resolve, 100));

          } catch (embeddingError) {
            console.error(`❌ Error creating embedding for ${file} chunk ${actualIndex}:`, embeddingError.message);
            continue;
          }
        }

        if (vectors.length > 0) {
          try {
            // 👇 Use the correct upsert format - pass vectors array directly
            await index.upsert(vectors);
            console.log(`✅ Upserted batch of ${vectors.length} vectors for ${file}`);
          } catch (upsertError) {
            console.error(`❌ Error upserting batch for ${file}:`, upsertError.message);
            // Try individual upserts as fallback
            for (const vector of vectors) {
              try {
                await index.upsert([vector]);
              } catch (individualError) {
                console.error(`❌ Error upserting individual vector ${vector.id}:`, individualError.message);
              }
            }
          }
        }

        // Add delay between batches
        if (batchStart + batchSize < passages.length) {
          console.log('⏳ Waiting before next batch...');
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }

      console.log(`✅ Successfully ingested ${file} as ${passages.length} chunks.`);
    }

    console.log('🎉 All PDFs ingested successfully!');

  } catch (error) {
    console.error('❌ Error during ingestion:', error);
    process.exit(1);
  }
}

main().catch(err => {
  console.error('❌ Unhandled error:', err);
  process.exit(1);
});