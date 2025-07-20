from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from chatbot import call_llama_api
from document_retriever import retrieve_relevant_docs
import uvicorn

app = FastAPI()

# Enable CORS so frontend can talk to this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace "*" with your frontend domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/chat")
async def chat_endpoint(request: Request):
    data = await request.json()
    user_input = data.get("message", "")

    if not user_input:
        return {"error": "No message provided."}

    chat_history = [{"role": "user", "content": user_input}]
    retrieved_docs = retrieve_relevant_docs(user_input)
    messages = [{"role": "system", "content": "\n\n".join(retrieved_docs)}] + chat_history

    try:
        assistant_reply = call_llama_api(messages)
        return {"reply": assistant_reply}
    except Exception as e:
        return {"error": str(e)}

# For running locally
if __name__ == "__main__":
    uvicorn.run("api_server:app", host="0.0.0.0", port=8000, reload=True)
