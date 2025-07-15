'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [input, setInput] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      router.push(`/chat?query=${encodeURIComponent(input)}`);
    }
  };

  return (
    <div className="min-h-screen bg-blue-100 flex flex-col items-center justify-between text-center px-4 py-12">
      {/* Header */}
      <header className="w-full flex justify-between items-center px-6">
        <div className="font-bold">[Website Name + Logo]</div>
        <nav className="space-x-6 text-blue-900 font-medium">
          <a href="#">Home</a>
          <a href="#about-us">About Us ▾</a>
          <a href="#">FAQs</a>
          <a href="#">Feedback</a>
        </nav>
      </header>

      {/* Intro Content */}
      <main className="flex flex-col items-center justify-center flex-grow w-full max-w-3xl">
        <h1 className="text-4xl font-bold mb-6">Welcome to ChatBot</h1>
        <p className="text-xl mb-10">
          The symptom checker to understand your health and recommend the fitting over-the-counter-medicine for you
        </p>

        {/* Starter Popup Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-4">
          {[
            'I have a headache',
            'I feel nauseous',
            'I have a sore throat',
            'I feel dizzy',
          ].map((preset, index) => (
            <button
              key={index}
              onClick={() => setInput(preset)}
              className="bg-white text-gray-800 border border-gray-300 px-4 py-2 rounded-full text-sm hover:bg-gray-100 transition"
            >
              {preset}
            </button>
          ))}
        </div>

        {/* Input Box */}
        <form onSubmit={handleSubmit} className="w-full">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-xl mx-auto mb-6">
            <p className="font-semibold text-lg mb-1">Type here to get started</p>
            <p className="text-sm text-gray-500 mb-4">(age, gender, symptoms, time)</p>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Example: Female, 20, severe headache for a week, dizziness, family history of migraines"
              className="w-full p-3 border border-gray-300 rounded text-sm"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-2 rounded"
          >
            Search
          </button>
        </form>
      </main>

      {/* About Us Section */}
      <section id="about-us" className="mt-40 w-full max-w-4xl text-left px-6">
        <h2 className="text-3xl font-bold mb-6">About Us</h2>

        <div className="mb-6">
          <h3 className="text-xl font-semibold">How It Started</h3>
          <p>
            As a part of a summer program in artificial intelligence and machine learning, we wanted to create
            something both helpful and accessible. After brainstorming, we decided to build a chatbot that analyzes the
            symptoms of users and suggests over-the-counter medications based on user input.
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold">Project Mission</h3>
          <p>
            Our mission is to make basic health information more accessible. It's not meant to replace a professional
            healthcare practitioner.
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold">Team Members</h3>
          <div className="flex items-start gap-4">
            <div className="w-24 h-24 bg-white border border-gray-300 flex items-center justify-center">
              Insert photo of team member
            </div>
            <div>
              <p className="font-semibold">[ROLE]</p>
              <p>[Insert introduction about yourself and experience in CS]</p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold">Tech Stack</h3>
          <p>[Insert information tools and coding languages used to create this website.]</p>
        </div>
      </section>

      {/* Disclaimer/Footer */}
      <footer className="text-xs text-gray-600 text-center max-w-3xl mt-10 px-4 pb-4">
        <p className="mb-2">
          DISCLAIMER: [App name] does not provide a medical diagnosis, and should not replace the judgement of a
          licensed healthcare practitioner. If you have any questions or concerns, please consult a licensed healthcare
          practitioner.
        </p>
        <p className="mb-2">
          Note: No personal data is shared. Your inputs are processed only to generate a response and are not saved.
        </p>
        <p className="text-sm text-blue-800 mt-2">📷 @ig-handle</p>
      </footer>
    </div>
  );
}









