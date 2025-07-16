from fastapi import FastAPI
from pydantic import BaseModel
from Logic import get_medication_recommendation

app = FastAPI()

class SymptomRequest(BaseModel):
    symptoms: str

async def chat(symptom_request: SymptomRequest):
    response = get_medication_recommendation(symptom_request.symptoms)
    return {"recommendation": response}
