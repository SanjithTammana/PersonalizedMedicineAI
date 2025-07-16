import os
import requests
from document_retriever import retrieve_relevant_docs

TOGETHER_API_KEY = os.getenv("TOGETHER_API_KEY")
API_URL = "https://api.together.xyz/v1/chat/completions"

def build_system_prompt_with_context(retrieved_docs):
    context = "\n\n".join(retrieved_docs)
    return {
        "role": "system",
        "content": (
            "You are a helpful medical assistant. Use the following retrieved medical information to assist the user:\n"
            f"{context}"
        )
    }

def build_messages(chat_history, retrieved_docs):
    system_message = build_system_prompt_with_context(retrieved_docs)
    return [system_message] + chat_history

def call_llama_api(messages):
    headers = {
        "Authorization": f"Bearer {TOGETHER_API_KEY}",
        "Content-Type": "application/json"
    }
    payload = {
        "model": "meta-llama/Llama-3-8b-chat-hf",
        "messages": messages,
        "temperature": 0.5,
        "max_tokens": 300
    }
    response = requests.post(API_URL, headers=headers, json=payload)
    response.raise_for_status()
    data = response.json()
    return data["choices"][0]["message"]["content"].strip()

def main():
    if TOGETHER_API_KEY is None:
        print("Error: Set your TOGETHER_API_KEY environment variable before running.")
        return

    chat_history = []
    print("Welcome to the Personalized Medicine Chatbot! Type 'quit' to exit.")

    while True:
        user_input = input("You: ").strip()
        if user_input.lower() == "quit":
            print("Goodbye!")
            break

        chat_history.append({"role": "user", "content": user_input})
        retrieved_docs = retrieve_relevant_docs(user_input)
        messages = build_messages(chat_history, retrieved_docs)

        try:
            assistant_reply = call_llama_api(messages)
            print(f"LLaMA: {assistant_reply}\n")
            chat_history.append({"role": "assistant", "content": assistant_reply})
        except Exception as e:
            print(f"Error during API call: {e}")

if __name__ == "__main__":
    main()
