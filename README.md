# PersonalizedMedicineAI

PersonalizedMedicineAI is a Next.js prototype that retrieves passages from a Pinecone index before sending a medical-information question to a Groq chat model. It supports general, allopathic, homeopathic, and naturopathic treatment-preference modes.

## What it does

- Provides a chat interface with treatment-preference mode selection.
- Creates an embedding for each user message with OpenAI.
- Queries Pinecone for up to five related passages and includes matches above the configured relevance threshold in the prompt.
- Uses Groq to generate the chat response.
- Includes a script that extracts text from PDFs in `documents/`, chunks the text, embeds each chunk, and upserts the resulting vectors into Pinecone.

## Architecture

`scripts/ingest.js` builds the retrieval index from local PDFs. At request time, `app/api/chat/route.js` embeds the current question, queries the configured Pinecone index, adds retrieved text to the system prompt, and sends the final message list to Groq. The client in `app/chatbot/page.js` sends the selected mode and in-session chat history to that route.

## Tech stack

- React and Next.js
- OpenAI embeddings
- Pinecone
- Groq SDK
- `pdf-parse`
- Material UI

## Running locally

```bash
git clone https://github.com/SanjithTammana/PersonalizedMedicineAI.git
cd PersonalizedMedicineAI
npm install
npm run dev
```

Open `http://localhost:3000`. To populate or rebuild the vector index, run:

```bash
node scripts/ingest.js
```

## Environment variables

Create `.env.local` and set:

- `GROQ_API_KEY`
- `OPENAI_API_KEY`
- `PINECONE_API_KEY`
- `PINECONE_INDEX_NAME`

Optional model overrides:

- `OPENAI_EMBEDDING_MODEL`
- `GROQ_CHAT_MODEL`

## Limitations

- This is an information prototype, not a diagnostic or clinical system and not a substitute for a licensed healthcare professional or emergency services.
- Retrieval quality depends on the configured Pinecone index and the PDF corpus used to build it.
- The route currently returns retrieval debug metadata with each response; that is useful during development but should be reviewed before a production deployment.
