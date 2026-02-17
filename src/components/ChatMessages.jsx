import MessageBubble from "./MessageBubble";

export default function ChatMessages({ messages }) {
  return (
    <div className="chat-messages">
      {messages.map((msg, i) => (
        <MessageBubble key={i} message={msg} />
      ))}
    </div>
  );
}
