import { useState, useRef, useEffect } from "react";
import "../styles/Chatbot.css";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi 👋 I’m your AI assistant. How can I help you today?", sender: "bot" }
  ]);
  const [input, setInput] = useState("");

  const chatBoxRef = useRef(null);

  /* Auto scroll to bottom */
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  /* Send Message */
  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);

    const userInput = input;
    setInput("");

    try {
      setMessages((prev) => [
        ...prev,
        { text: "Thinking...", sender: "bot" }
      ]);

      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userInput })
      });

      if (!response.ok) throw new Error("API error");

      const data = await response.json();

      setMessages((prev) => {
        const updated = [...prev];
        updated.pop(); // remove thinking
        return [...updated, { text: data.reply, sender: "bot" }];
      });

    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { text: "AI service unavailable.", sender: "bot" }
      ]);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <div className="chat-toggle" onClick={() => setIsOpen(!isOpen)}>
        💬
      </div>

      {isOpen && (
        <div className={`chat-container ${isFullScreen ? "fullscreen" : ""}`}>

          {/* ===================== FULLSCREEN MODE ===================== */}
          {isFullScreen ? (
            <div className="chat-dashboard">

              {/* LEFT PANEL */}
              <div className="chat-sidebar">
                <h3>AI Chatbot</h3>
                <p>Status: Online</p>
                <p>Total Messages: {messages.length}</p>
              </div>

              {/* MAIN CHAT */}
              <div className="chat-main">

                {/* HEADER */}
                <div className="chat-main-header">
                  <div className="header-left">
                    <button
                      className="back-btn"
                      onClick={() => setIsFullScreen(false)}
                    >
                      ⬅
                    </button>
                    <h3>AI Assistant</h3>
                  </div>

                  <div className="chat-controls">
                    <button onClick={() => setIsOpen(false)}>✖</button>
                  </div>
                </div>

                {/* MESSAGE AREA (Only this scrolls) */}
                <div className="chat-messages" ref={chatBoxRef}>
                  {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.sender}`}>
                      {msg.text}
                    </div>
                  ))}
                </div>

                {/* INPUT BAR (Fixed at bottom) */}
                <form
                  className="chat-input-modern"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend();
                  }}
                >
                  <button type="button" className="icon-btn">📎</button>x

                  <input
                   
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                  />

                  <button type="button" className="icon-btn">🎤</button>

                  <button
                    type="submit"
                    className="send-btn"
                    disabled={!input.trim()}
                  >
                    ➤
                  </button>
                </form>

              </div>

              {/* RIGHT PANEL */}
              <div className="chat-info">
                <h3>Capabilities</h3>
                <ul>
                  <li>Answer questions</li>
                  <li>Provide suggestions</li>
                  <li>Assist with tasks</li>
                  <li>Understand context</li>
                </ul>
              </div>

            </div>
          ) : (
            /* ===================== FLOATING MODE ===================== */
            <>
              <div className="chat-header">
                <span>AI Assistant</span>
                <div className="chat-controls">
                  <button onClick={() => setIsFullScreen(true)}>🗖</button>
                  <button onClick={() => setIsOpen(false)}>✖</button>
                </div>
              </div>

              <div className="chat-box" ref={chatBoxRef}>
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={
                      msg.sender === "bot"
                        ? "bot-message"
                        : "user-message"
                    }
                  >
                    {msg.text}
                  </div>
                ))}
              </div>

              <form
                className="chat-input"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type..."
                />
                <button type="submit" disabled={!input.trim()}>
                  Send
                </button>
              </form>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ChatBot;