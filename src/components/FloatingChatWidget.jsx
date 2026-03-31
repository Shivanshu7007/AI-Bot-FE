import { useState, useEffect, useRef } from "react";

const FETCH_TIMEOUT_MS = 30000;

export default function FloatingChatWidget({
  productId,
  productName,
  isOpen,
  onClose,
  onToggle
}) {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

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
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    setMessages(prev => [...prev, { sender: "user", text: trimmed }]);

    if (!productId) {
      setMessages(prev => [
        ...prev,
        { sender: "bot", text: "Please scan the QR code from your kit." }
      ]);
      return;
    }

    setIsLoading(true);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

    try {
      const response = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product_id: productId, question: trimmed }),
        signal: controller.signal
      });

      const data = await response.json();

      setMessages(prev => [
        ...prev,
        { sender: "bot", text: data.reply || "No response received." }
      ]);
    } catch (err) {
      const msg = err.name === "AbortError"
        ? "⚠️ Request timed out. Please try again."
        : "⚠️ Server error. Try again.";
      setMessages(prev => [...prev, { sender: "bot", text: msg }]);
    } finally {
      clearTimeout(timeoutId);
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !isLoading) {
      sendMessage(e.target.value);
      e.target.value = "";
    }
  };

  const handleSendClick = () => {
    if (inputRef.current && !isLoading) {
      sendMessage(inputRef.current.value);
      inputRef.current.value = "";
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
            <button className="chat-minimize" onClick={onClose}>—</button>
          </div>

          <div className="chat-body">
            {messages.map((msg, index) => (
              <div key={index} className={`chat-row ${msg.sender}`}>
                <div className="chat-bubble">{msg.text}</div>
              </div>
            ))}

            {isLoading && (
              <div className="chat-row bot">
                <div className="chat-bubble chat-typing">
                  <span>.</span><span>.</span><span>.</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input-wrapper">
            <div className="chat-input">
              <input
                ref={inputRef}
                type="text"
                placeholder={isLoading ? "Waiting for response..." : "Ask a question"}
                disabled={isLoading}
                onKeyDown={handleKeyDown}
              />
              <button onClick={handleSendClick} disabled={isLoading}>
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