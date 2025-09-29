import React, { useEffect, useRef, useState } from "react";
import "./App.css";

const SUGGESTIONS = [
  "What can you do?",
  "Summarize this text",
  "Create interview questions",
  "Explain a concept simply",
];

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [recording, setRecording] = useState(false);
  const [error, setError] = useState("");
  const chatEndRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text) return;
    setMessages((prev) => [...prev, { sender: "user", text }]);
    setInput("");
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://backend:8000/ask-gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const json = await res.json();
      setMessages((prev) => [...prev, { sender: "bot", text: json.reply || "No response" }]);
    } catch (e) {
      setMessages((prev) => [...prev, { sender: "bot", text: "Error: Unable to reach server" }]);
      setError(e?.message || "");
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const startRecording = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return alert("Browser not supported");
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = true;
    recognition.continuous = true;
    recognition.onresult = (e) => {
      const transcript = Array.from(e.results).map((r) => r[0].transcript).join("");
      setInput(transcript);
    };
    recognition.onstart = () => setRecording(true);
    recognition.onend = () => setRecording(false);
    recognition.onerror = () => setRecording(false);
    recognition.start();
    recognitionRef.current = recognition;
  };
  const stopRecording = () => recognitionRef.current?.stop();

  const clearChat = () => setMessages([]);
  const copyLast = async () => {
    const last = [...messages].reverse().find((m) => m.sender === "bot");
    if (!last) return;
    try { await navigator.clipboard.writeText(last.text); } catch {}
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="brand">
          <span className="brand-logo">✨</span>
          <div>
            <div className="brand-title">Interview Assist</div>
            <div className="brand-sub">AI Chatbot</div>
          </div>
        </div>
        <div className="header-actions">
          <button className="ghost" onClick={copyLast}>Copy last</button>
          <button className="ghost" onClick={clearChat}>Clear</button>
        </div>
      </header>

      <div className="layout">
        <aside className="sidebar">
          <div className="card">
            <div className="card-title">Quick suggestions</div>
            <div className="chips">
              {SUGGESTIONS.map((s) => (
                <button key={s} className="chip" onClick={() => setInput(s)}>{s}</button>
              ))}
            </div>
          </div>
          <div className="card">
            <div className="card-title">Tips</div>
            <ul className="tips">
              <li>Press Enter to send, Shift+Enter for a new line</li>
              <li>Use the mic to dictate your question</li>
              <li>Be specific for better results</li>
            </ul>
          </div>
        </aside>

        <main className="chat-panel">
          <div className="messages">
            {messages.length === 0 && (
              <div className="welcome">Ask anything to get started ✨</div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`row ${m.sender}`}>
                {m.sender === "bot" && <div className="avatar">🤖</div>}
                <div className="bubble animate-in">{m.text}</div>
                {m.sender === "user" && <div className="avatar">🙋</div>}
              </div>
            ))}
            {loading && (
              <div className="row bot">
                <div className="avatar">🤖</div>
                <div className="bubble typing"><span className="dot" /><span className="dot" /><span className="dot" /></div>
              </div>
            )}
            {error && <div className="error-banner">{error}</div>}
            <div ref={chatEndRef} />
          </div>

          <div className="composer">
            <button
              className={`mic ${recording ? "on" : ""}`}
              onClick={recording ? stopRecording : startRecording}
              aria-label={recording ? "Stop recording" : "Start recording"}
            >
              {recording ? "■" : "🎙"}
            </button>
            <textarea
              className="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Type your message..."
              rows={2}
            />
            <button className="send" onClick={handleSend} disabled={!input.trim() || loading}>
              {loading ? "..." : "Send"}
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
