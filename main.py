from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from backend import get_medication_recommendation
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# Add CORS middleware
origins = [
    "http://localhost:3000",  # default Next.js dev port
    "http://localhost:3008",  # your actual frontend port
    "http://localhost:3009",
    "http://localhost:3010",
    "http://localhost:3011",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:3008",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allow frontend origins here
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    reply: str

@app.get("/")
async def root():
    return {"message": "Hello from FastAPI!"}

@app.post("/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    user_message = request.message
    if not user_message:
        raise HTTPException(status_code=400, detail="No message provided")

    try:
        response = get_medication_recommendation(user_message)
        if response.startswith("Error:"):
            raise HTTPException(status_code=500, detail=response)
        return ChatResponse(reply=response)
    except Exception as e:
        print("ERROR in /chat:", e)
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000, reload=True)


