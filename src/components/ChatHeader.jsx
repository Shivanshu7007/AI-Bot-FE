export default function ChatHeader() {
  return (
    <div className="chat-header">
      <div className="header-center">
        <img
          src={process.env.PUBLIC_URL + "/logo.png"}
          alt="Cellogen"
          className="logo"
        />
        <span className="header-title">
          Cellogen Therapeutics Bot
        </span>
      </div>
    </div>
  );
}

