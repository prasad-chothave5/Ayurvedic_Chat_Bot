
import React, { useState } from "react";
import Navbar from "../components/Navbar";

export default function Chat() {
  const [messages, setMessages] = useState([
    { role: "assistant", text: "🌿 Namaste! I am your Ayurvedic AI assistant. Ask me anything about your health, diet, herbs, or Ayurvedic lifestyle!" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
        const res = await fetch("https://ayurveda-backend-j3zg.onrender.com/chat", {        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: "assistant", text: data.reply }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: "assistant", text: "Sorry, could not connect to AI. Make sure Flask is running!" }]);
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#FDF6EC" }}>
      <Navbar />
      <div style={{ maxWidth: 650, margin: "0 auto", padding: "1.5rem 1rem" }}>

        <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <div style={{ fontSize: 48 }}>🌿</div>
          <h2 style={{ color: "#6B3A1F", fontSize: 22, fontWeight: 600 }}>Ayurvedic AI Assistant</h2>
          <p style={{ color: "#8B6347", fontSize: 14 }}>Ask anything about Ayurveda, herbs, diet or your health</p>
        </div>

        <div style={{
          background: "white", borderRadius: 16, padding: "1rem",
          height: 380, overflowY: "auto", marginBottom: "1rem",
          border: "1px solid #F5E6C8", display: "flex",
          flexDirection: "column", gap: 12
        }}>
          {messages.map((msg, i) => (
            <div key={i} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
              <div style={{
                maxWidth: "80%", padding: "10px 14px", borderRadius: 12,
                background: msg.role === "user" ? "#A0522D" : "#F5E6C8",
                color: msg.role === "user" ? "white" : "#3B2A1A",
                fontSize: 14, lineHeight: 1.6
              }}>
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <div style={{ display: "flex", justifyContent: "flex-start" }}>
              <div style={{ background: "#F5E6C8", padding: "10px 14px", borderRadius: 12, color: "#8B6347", fontSize: 14 }}>
                🌿 Thinking...
              </div>
            </div>
          )}
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && sendMessage()}
            placeholder="Ask about your health, herbs, diet..."
            style={{
              flex: 1, padding: "12px 16px", borderRadius: 10,
              border: "1px solid #E0C9A6", fontSize: 14,
              background: "white", color: "#3B2A1A", outline: "none"
            }}
          />
          <button onClick={sendMessage} disabled={loading} style={{
            padding: "12px 20px", background: "#A0522D", color: "white",
            border: "none", borderRadius: 10, fontSize: 14, cursor: "pointer"
          }}>
            Send 🌿
          </button>
        </div>

        <div style={{ marginTop: 12 }}>
          <p style={{ fontSize: 12, color: "#8B6347", marginBottom: 8 }}>Quick questions:</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {["What is my Dosha?", "Best herbs for immunity", "Ayurvedic diet for diabetes", "How to reduce stress?", "Best foods for Pitta"].map((q, i) => (
              <button key={i} onClick={() => setInput(q)} style={{
                padding: "5px 12px", borderRadius: 20, fontSize: 12,
                background: "white", color: "#6B3A1F",
                border: "1px solid #E0C9A6", cursor: "pointer"
              }}>{q}</button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}