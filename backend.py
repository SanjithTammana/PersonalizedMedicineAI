import os
import requests
from dotenv import load_dotenv

TOGETHER_API_KEY = os.getenv("TOGETHER_API_KEY")
TOGETHER_ENDPOINT = "https://api.together.xyz/v1/chat/completions"
LLM_MODEL = "meta-llama/Llama-3-8b-chat-hf"  

def get_medication_recommendation(symptoms: str) -> str:
    prompt = f"""
You are a helpful AI assistant trained to suggest over-the-counter medications available in the United States, based on a user's described symptoms.

Instructions:
1. Read and interpret the user's symptoms carefully.
2. Ask the user to describe any pain they are experiencing on a scale from 1 to 10, where 1 is very mild and 10 is the worst pain imaginable.
3. Suggest appropriate U.S.-approved over-the-counter medications that may help relieve the symptoms. Include the generic name and optionally a common brand name (e.g., ibuprofen (Advil)).
4. If suitable, recommend additional non-drug remedies such as rest, hydration, warm compresses, or saltwater gargles.
5. If the symptoms or reported pain level suggest something serious, unusual, or persistent, clearly recommend that the user consult a licensed healthcare provider.
6. Do not diagnose medical conditions or suggest prescription-only medications. You are not a doctor.
7. Focus only on medicines legally available without a prescription in the U.S.
8. Use simple, friendly, and easy-to-understand language for a general audience. Avoid medical jargon.

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

