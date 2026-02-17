import { useState, useEffect, useRef } from "react";
import ChatHeader from "../components/ChatHeader";
import ChatMessages from "../components/ChatMessages";
import ChatInput from "../components/ChatInput";
import "../styles/chat.css";

export default function ChatPage() {

  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("product_id");

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello! 👋 Ask anything about this product."
    }
  ]);

  const messagesEndRef = useRef(null);

  // ✅ Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const cleanText = (text) => {
    if (!text) return "";

    return text
      .replace(/\*\*/g, "")     // remove bold markdown
      .replace(/\*/g, "")       // remove single *
      .replace(/#/g, "")        // remove headings
      .replace(/\\n/g, "\n")    // fix escaped newline
      .trim();
  };

  const sendMessage = async (text) => {

    if (!text.trim()) return;

    setMessages(prev => [...prev, { sender: "user", text }]);

    try {

      const response = await fetch("/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          product_id: productId,
          question: text
        })
      });

      const data = await response.json();

      let replyText = "";

      if (data.reply) {
        replyText = cleanText(data.reply);
      } else if (data.error) {
        replyText = "⚠️ " + cleanText(data.error);
      } else {
        replyText = "⚠️ Sorry, I couldn't process that.";
      }

      setMessages(prev => [
        ...prev,
        { sender: "bot", text: replyText }
      ]);

    } catch (error) {
      setMessages(prev => [
        ...prev,
        { sender: "bot", text: "⚠️ Server error. Please try again." }
      ]);
    }
  };

  return (
    <div className="chat-wrapper">
      <ChatHeader />
      <div className="chat-divider"></div>

      <div className="chat-messages">
        <ChatMessages messages={messages} />
        <div ref={messagesEndRef} />
      </div>

      <ChatInput onSend={sendMessage} />
    </div>
  );
}
