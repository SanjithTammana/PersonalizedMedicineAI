'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type Message = {
  id: number;
  type: 'user' | 'bot';
  text: string;
};

export default function Home() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [botText, setBotText] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [botTypingIndex, setBotTypingIndex] = useState(0);
  const router = useRouter();

  const aboutRef = useRef<HTMLDivElement | null>(null);
  const faqRef = useRef<HTMLDivElement | null>(null);
  const feedbackRef = useRef<HTMLDivElement | null>(null);

  // ** This ref now points to the scrollable chat container div **
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const preventScroll = (e: WheelEvent | TouchEvent) => e.preventDefault();

    window.addEventListener('wheel', preventScroll, { passive: false });
    window.addEventListener('touchmove', preventScroll, { passive: false });

    return () => {
      window.removeEventListener('wheel', preventScroll);
      window.removeEventListener('touchmove', preventScroll);
    };
  }, []);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      const yOffset = -100;
      const y = ref.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const startBotTyping = (text: string) => {
    setIsBotTyping(true);
    setBotText('');
    setBotTypingIndex(0);

    const interval = setInterval(() => {
      setBotTypingIndex((prev) => {
        if (prev < text.length) {
          setBotText(text.slice(0, prev + 1));
          return prev + 1;
        } else {
          clearInterval(interval);
          setIsBotTyping(false);
          setBotText('');
          return prev;
        }
      });
    }, 50);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    if (!trimmedInput || isBotTyping) return;

    setMessages((msgs) => [
      ...msgs,
      { id: msgs.length + 1, type: 'user', text: trimmedInput },
    ]);
    setInput('');
    startBotTyping('...');

    try {
      const response = await fetch('http://127.0.0.1:8000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmedInput }),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();

      setIsBotTyping(false);
      setBotText('');

      setMessages((msgs) => [
        ...msgs,
        { id: msgs.length + 1, type: 'bot', text: data.reply },
      ]);
    } catch (error) {
      console.error('Error fetching bot reply:', error);
      setIsBotTyping(false);
      setBotText('');

      setMessages((msgs) => [
        ...msgs,
        { id: msgs.length + 1, type: 'bot', text: 'Oops! Something went wrong.' },
      ]);
    }
  };

  // Scroll chat container **inside the box** to bottom on messages or botText update
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages, botText]);

  // Scroll chat container to bottom immediately on mount (if any existing messages)
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, []);

  return (
    <div className="min-h-screen bg-blue-100 text-center px-4 pb-12">
      <header className="fixed top-0 left-0 w-full bg-blue-100 border-b border-gray-300 z-50 flex justify-between items-center px-6 py-4">
        <div className="font-bold">[Website Name + Logo]</div>
        <nav className="space-x-6 text-blue-900 font-medium">
          <button onClick={scrollToTop}>Home</button>
          <button onClick={() => scrollToSection(aboutRef)}>About Us</button>
          <button onClick={() => scrollToSection(faqRef)}>FAQs</button>
          <button onClick={() => scrollToSection(feedbackRef)}>Feedback</button>
        </nav>
      </header>

      <div className="h-24" />

      <main className="flex flex-col items-center justify-center w-full max-w-3xl mx-auto mt-10 relative">
        <h1 className="text-4xl font-bold mb-6">Welcome to ChatBot</h1>
        <p className="text-xl mb-10">
          The symptom checker to understand your health and recommend the fitting over-the-counter-medicine for you
        </p>

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

        <div
          className="bg-white rounded-lg shadow-md max-w-xl mx-auto mb-6 flex flex-col"
          style={{ height: '500px' }}
        >
          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-4 text-left space-y-3"
            style={{ scrollbarWidth: 'thin', scrollbarColor: '#888 #ddd' }}
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
          >
            {messages.map(({ id, type, text }) => (
              <div
                key={id}
                className={`max-w-[80%] px-4 py-2 rounded ${
                  type === 'user'
                    ? 'bg-blue-200 text-right self-end'
                    : 'bg-gray-200 text-left self-start'
                }`}
                style={{
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                }}
              >
                {text}
              </div>
            ))}
            {isBotTyping && (
              <div
                className="max-w-[80%] bg-gray-200 text-left self-start px-4 py-2 rounded"
                style={{
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                }}
              >
                {botText}
              </div>
            )}
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex border-t border-gray-300 w-full"
            style={{ minHeight: '60px' }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your symptoms here..."
              className="p-3 focus:outline-none flex-grow"
              style={{ minWidth: 0, width: '100%' }}
            />
            <button
              type="submit"
              disabled={isBotTyping}
              className="bg-blue-700 disabled:bg-blue-400 hover:bg-blue-800 text-white px-6 font-semibold"
            >
              Send
            </button>
          </form>
        </div>
      </main>

      <div ref={aboutRef} className="mt-[50vh] w-full max-w-4xl mx-auto text-left px-6">
        <h2 className="text-3xl font-bold mb-6 text-center">About Us</h2>
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
          <div className="flex flex-col gap-6">
            {[1, 2, 3, 4, 5].map((_, index) => (
              <div
                key={index}
                className="flex items-start gap-6 p-4 border border-gray-300 bg-white rounded-lg"
              >
                <div>
                  <p className="font-semibold text-lg">[Name] — [Role]</p>
                  <p className="text-sm text-gray-700">[Short description of responsibilities and contributions]</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-6">
          <h3 className="text-xl font-semibold">Tech Stack</h3>
          <p>[Insert information about the tools and coding languages used to create this website.]</p>
        </div>
      </div>

      <div ref={faqRef} className="mt-[50vh] w-full max-w-4xl mx-auto text-left px-6">
        <h2 className="text-3xl font-bold mb-6 text-center">FAQ</h2>
        <ol className="space-y-6">
          {[1, 2, 3, 4, 5].map((num) => (
            <li key={num}>
              <p className="font-semibold text-lg">{num}. [Question goes here]</p>
              <p className="ml-4 text-gray-700">[Answer goes here]</p>
            </li>
          ))}
        </ol>
      </div>

      <div className="h-[50vh]" />

      <div ref={feedbackRef} className="mt-[50vh] w-full max-w-3xl mx-auto text-center px-6">
        <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
        <form className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-3 border border-gray-300 rounded"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-3 border border-gray-300 rounded"
          />
          <textarea
            placeholder="Type your message here..."
            className="w-full p-3 border border-gray-300 rounded min-h-[120px]"
          />
          <button
            type="submit"
            className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-2 rounded"
          >
            Send
          </button>
        </form>
      </div>

      <div className="h-[50vh]" />

      <footer className="text-xs text-gray-600 text-center max-w-3xl mx-auto mt-10 px-4 pb-4">
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



