// import React from "react";

export default function Footer() {
  return (
    <footer id="contact-section" style={{ marginTop: "80px", background: "#0f3d5a", color: "white", padding: "40px 20px" }}>
      <div style={{ textAlign: "center" }}>
        © {new Date().getFullYear()} All rights reserved to Cellogen Therapeutics
      </div>
    </footer>
  );
}