import os
import requests
from dotenv import load_dotenv

load_dotenv()

TOGETHER_API_KEY = os.getenv("TOGETHER_API_KEY")
TOGETHER_ENDPOINT = "https://api.together.xyz/v1/chat/completions"
LLM_MODEL = "meta-llama/Llama-3-8b-chat-hf"  

def get_medication_recommendation(symptoms: str) -> str:
    prompt = f"""
You are a helpful AI assistant for personalized medicine.
A user describes their symptoms: 

Respond with a recommendation for possible over-the-counter medications or advice (if applicable).
If symptoms are serious or unusual, advise them to consult a doctor.
"""

    headers = {
        "Authorization": f"Bearer {TOGETHER_API_KEY}",
        "Content-Type": "application/json"
    }

    payload = {
        "model": LLM_MODEL,
        "messages": [
            {"role": "system", "content": "You are a medical assistant trained to suggest general, over-the-counter medications based on symptoms."},
            {"role": "user", "content": symptoms}
        ],
        "temperature": 0.7,
        "max_tokens": 200
    }

    response = requests.post(TOGETHER_ENDPOINT, headers=headers, json=payload)

    if response.status_code == 200:
        data = response.json()
        return data["choices"][0]["message"]["content"].strip()
    else:
        return f"Error: {response.status_code} - {response.text}"

