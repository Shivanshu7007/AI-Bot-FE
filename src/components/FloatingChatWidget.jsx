import { useState, useEffect, useRef } from "react";

export default function FloatingChatWidget({
  productId,
  productName,
  isOpen,
  onClose,
  onToggle
}) {
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    if (productId) {
      setMessages([
        {
          sender: "bot",
          text: `Hello 👋 I am ready to answer your questions about ${productName || "this product"}.`
        }
      ]);
    }
  }, [productId, productName]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    setMessages(prev => [...prev, { sender: "user", text }]);

    if (!productId) {
      setMessages(prev => [
        ...prev,
        { sender: "bot", text: "Please scan the QR code from your kit." }
      ]);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_id: productId,
          question: text
        })
      });

      const data = await response.json();

      setMessages(prev => [
        ...prev,
        { sender: "bot", text: data.reply }
      ]);
    } catch {
      setMessages(prev => [
        ...prev,
        { sender: "bot", text: "⚠️ Server error. Try again." }
      ]);
    }
  };

  return (
    <>
      {/* OVERLAY */}
      {isOpen && <div className="chat-overlay" onClick={onClose} />}

      {/* CHAT WINDOW */}
      {isOpen && (
        <div className="chat-widget">
          <div className="chat-header">
            <span>{productName || "Cellogen Therapeutics Bot"}</span>

            {/* SIMPLE MINIMIZE LINE */}
            <button className="chat-minimize" onClick={onClose}>
              —
            </button>
          </div>

          <div className="chat-body">
            {messages.map((msg, index) => (
              <div key={index} className={`chat-row ${msg.sender}`}>
                <div className="chat-bubble">
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input-wrapper">
            <div className="chat-input">
              <input
                type="text"
                placeholder="Ask a question"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    sendMessage(e.target.value);
                    e.target.value = "";
                  }
                }}
              />
              <button
                onClick={(e) => {
                  const input =
                    e.currentTarget.parentElement.querySelector("input");
                  sendMessage(input.value);
                  input.value = "";
                }}
              >
                →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FLOATING BUTTON */}
      {!isOpen && (
        <button className="chat-toggle" onClick={onToggle}>
          💬
        </button>
      )}
    </>
  );
}