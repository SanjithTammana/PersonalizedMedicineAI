// src/app/chat/page.tsx
'use client';

import Chatbot from '../components/Chatbot';

export default function ChatPage() {
  return (
    <main className="min-h-screen bg-white p-4 flex items-center justify-center">
      <div className="w-full max-w-3xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Symptom Checker Chat</h1>
        <Chatbot />
      </div>
    </main>
  );
}




