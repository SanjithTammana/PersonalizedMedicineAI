'use client';

import { useState } from 'react';

export default function ChatPage() {
  const [messages, setMessages] = useState([
    {
      role: 'user',
      content:
        'Female, 20, severe headache for a week, dizziness, family history of migraines.',
    },
    {
      role: 'bot',
      content: `Thanks for sharing. A few questions to help you better:
1. How severe is the headache (scale of 1–10)?
2. Are you experiencing nausea, vision changes, or sensitivity to light/sound?
3. Have you tried any medications so far?`,
    },
    {
      role: 'user',
      content:
        'About a 7 right now. I do feel nauseous and bright lights make it worse. I took acetaminophen but it didn’t help.',
    },
    {
      role: 'bot',
      content: `Your symptoms sound consistent with a migraine. You could try Advil 400mg every 6–8 hours (not exceeding 1200mg unless approved by a healthcare professional). Avoid caffeine/alcohol, stay hydrated, and rest in a quiet dark room. Hope you feel better soon!`,
    },
  ])

  const [input, setInput] = useState('');

  const starterSuggestions = [
    'I feel dizzy',
    'I have a sore throat',
    'I have a fever and chills',
    'I feel tired all the time',
    'I have a stomach ache',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages([...messages, { role: 'user', content: input }]);
    setInput('');
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  return (
    <div className="min-h-screen bg-blue-100 p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-6">ChatBot</h1>

      {/* Chat history */}
      <div className="flex flex-col space-y-4 mb-6 w-full max-w-2xl">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-lg ${
              msg.role === 'user'
                ? 'bg-white self-end text-right'
                : 'bg-gray-200 self-start text-left'
            }`}
          >
            <p>{msg.content}</p>
          </div>
        ))}
      </div>

      {/* Starter Buttons */}
      <div className="flex flex-wrap gap-2 mb-4 w-full max-w-2xl justify-center">
        {starterSuggestions.map((suggestion, idx) => (
          <button
            key={idx}
            onClick={() => handleSuggestionClick(suggestion)}
            className="bg-white px-3 py-1 border border-gray-300 rounded-full text-sm hover:bg-gray-100"
          >
            {suggestion}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 w-full max-w-2xl"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your symptoms here..."
          className="flex-1 p-3 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          ➤
        </button>
      </form>
    </div>
  );
}


