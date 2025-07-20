from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# Create FastAPI app
app = FastAPI()

# Enable CORS so your frontend (e.g., localhost:3000) can call backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For stricter security, replace "*" with your frontend URL, e.g. ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define request body model
class ChatRequest(BaseModel):
    message: str

# Optional response model for clarity
class ChatResponse(BaseModel):
    reply: str

# POST /chat endpoint
@app.post("/chat", response_model=ChatResponse)
async def chat_endpoint(req: ChatRequest):
    user_input = req.message.lower()

    # Simple symptom-based logic
    if "headache" in user_input:
        reply = "You mentioned a headache. Try Tylenol (acetaminophen) or Advil (ibuprofen)."
    elif "sore throat" in user_input:
        reply = "You mentioned a sore throat. Lozenges like Cepacol or Chloraseptic can help."
    elif "nausea" in user_input:
        reply = "You mentioned nausea. Pepto-Bismol or Dramamine might be useful."
    else:
        reply = "Sorry, I didn't quite understand that. Could you describe your symptoms more clearly?"

    return {"reply": reply}


