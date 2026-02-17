export default function BotInfo() {
  return (
    <div className="bot-info">
      <img
        src={process.env.PUBLIC_URL + "/bot.png"}
        alt="Bot"
        className="bot-avatar"
      />
      <span>Cellogen Bot</span>
    </div>
  );
}
