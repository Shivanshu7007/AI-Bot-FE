import { useState, useEffect, useRef } from "react";

const FETCH_TIMEOUT_MS = 30000;

const SUPPORT_EMAIL    = "contact@cellogenbiotech.com";
const SUPPORT_WHATSAPP = "919217371321";

const isFallbackReply = (text) =>
  text.startsWith("I was not able to find this in the product documentation");

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
          sender: "disclaimer",
          text: "This assistant is AI-powered and answers from product documentation only. Always verify critical steps against the physical product insert. For safety or clinical decisions, contact Cellogen directly."
        },
        {
          sender: "bot",
          text: `Hello! I'm ready to answer your questions about ${productName || "this product"}.`
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
        body: JSON.stringify({
          product_id: productId,
          question: trimmed,
          history: messages.slice(-6)
        }),
        signal: controller.signal
      });

      const data = await response.json();

      if (data.status === "no_knowledge_base") {
        setMessages(prev => [
          ...prev,
          {
            sender: "bot",
            text: "Product documentation for this kit has not been uploaded yet. Please reach out to Cellogen for assistance.",
            showEscalation: true
          }
        ]);
        return;
      }

      const reply = data.reply || "No response received.";
      setMessages(prev => [
        ...prev,
        { sender: "bot", text: reply, showEscalation: isFallbackReply(reply) }
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
      {/* Overlay — always mounted, display controls visibility */}
      <div
        className="chat-overlay"
        onClick={onClose}
        style={{ display: isOpen ? "block" : "none" }}
      />

      {/* Chat widget — always mounted, display controls visibility */}
      <div
        className="chat-widget"
        style={{ display: isOpen ? "flex" : "none" }}
      >
        {/* Header */}
        <div className="chat-header">
          <div className="chat-header-left">
            <div className="chat-avatar">🤖</div>
            <div className="chat-header-info">
              <span className="chat-header-title">
                {productName || "QC Kit Assistant"}
              </span>
              <span className="chat-header-status">
                <span className="chat-status-dot" />
                Online
              </span>
            </div>
          </div>
          <button className="chat-minimize" onClick={onClose}>✕</button>
        </div>

        {/* Messages body */}
        <div className="chat-body">
          {messages.map((msg, index) => (
            msg.sender === "disclaimer" ? (
              <div key={index} className="chat-disclaimer">
                <span className="chat-disclaimer-icon">⚠️</span>
                {msg.text}
              </div>
            ) : (
              <div key={index} className={`chat-row ${msg.sender}`}>
                {msg.sender === "bot" && (
                  <div className="chat-bot-icon">AI</div>
                )}
                <div className={msg.sender === "bot" ? "chat-bubble-group" : ""}>
                  <div
                    className="chat-bubble"
                    style={{ whiteSpace: "pre-wrap" }}
                  >
                    {msg.text.replace(/^- /gm, "• ")}
                  </div>
                  {msg.showEscalation && (
                    <div className="chat-escalation-buttons">
                      <a
                        href={`mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(`Product Query - ${productName || "Kit"}`)}`}
                        className="chat-escalation-btn chat-escalation-email"
                        target="_blank"
                        rel="noreferrer"
                      >
                        ✉ Email Cellogen Support
                      </a>
                      <a
                        href={`https://wa.me/${SUPPORT_WHATSAPP}?text=${encodeURIComponent(`Hi, I need help with my ${productName || "Cellogen"} kit.`)}`}
                        className="chat-escalation-btn chat-escalation-whatsapp"
                        target="_blank"
                        rel="noreferrer"
                      >
                        💬 WhatsApp Us
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )
          ))}

          {/* Typing indicator */}
          {isLoading && (
            <div className="chat-row bot">
              <div className="chat-bot-icon">AI</div>
              <div className="chat-bubble chat-typing">
                <span /><span /><span />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div className="chat-input-wrapper">
          <div className="chat-input">
            <input
              ref={inputRef}
              type="text"
              placeholder={
                isLoading
                  ? "Waiting for response..."
                  : "Ask a question about this product..."
              }
              disabled={isLoading}
              onKeyDown={handleKeyDown}
            />
            <button onClick={handleSendClick} disabled={isLoading}>
              ➤
            </button>
          </div>
          <p className="chat-input-hint">Powered by Cellogen Biotech</p>
        </div>
      </div>

      {/* Floating toggle — always mounted, display controls visibility */}
      <button
        className="chat-toggle"
        onClick={onToggle}
        style={{ display: isOpen ? "none" : "flex" }}
      >
        🤖
      </button>
    </>
  );
}
