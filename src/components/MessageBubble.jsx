export default function MessageBubble({ message }) {

  const isBot = message.sender === "bot";

  const formattedText = message.text
    .split("\n")
    .map((line, index) => (
      <div key={index}>{line}</div>
    ));

  return (
    <div className={`aws-row ${isBot ? "left" : "right"}`}>
      {isBot && (
        <img
          src={process.env.PUBLIC_URL + "/bot.png"}
          alt="Bot"
          className="aws-avatar"
        />
      )}

      <div className={`aws-bubble ${isBot ? "bot" : "user"}`}>
        {formattedText}
      </div>
    </div>
  );
}
