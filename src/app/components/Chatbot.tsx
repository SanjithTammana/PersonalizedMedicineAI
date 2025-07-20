import React, { useState } from "react";

export default function Chatbot() {
  const [messages, setMessages] = useState<{ from: "user" | "bot"; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!input.trim()) return;

    // Add user message to chat
    setMessages((msgs) => [...msgs, { from: "user", text: input }]);
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch");
      }

      const data = await res.json();
      // Add bot response to chat
      setMessages((msgs) => [...msgs, { from: "bot", text: data.reply }]);
    } catch (error) {
      setMessages((msgs) => [...msgs, { from: "bot", text: "Error: Unable to get response." }]);
    } finally {
      setLoading(false);
      setInput("");
    }
  }

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <div
        style={{
          border: "1px solid #ccc",
          padding: 10,
          height: 400,
          overflowY: "auto",
          marginBottom: 10,
          backgroundColor: "#f9f9f9",
        }}
      >
        {messages.map((msg, i) => (
          <div key={i} style={{ margin: "10px 0", textAlign: msg.from === "user" ? "right" : "left" }}>
            <b>{msg.from === "user" ? "You" : "Bot"}:</b> {msg.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") sendMessage();
        }}
        disabled={loading}
        style={{ width: "80%", padding: 8 }}
        placeholder="Type your symptoms..."
      />
      <button onClick={sendMessage} disabled={loading} style={{ padding: "8px 12px", marginLeft: 8 }}>
        {loading ? "Sending..." : "Send"}
      </button>
    </div>
  );
}
