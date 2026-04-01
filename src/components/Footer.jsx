import React from "react";
import useScrollReveal from "../hooks/useScrollReveal";

export default function Footer() {
  useScrollReveal([]);

  return (
    <footer id="contact-section" className="footer">
      <div className="footer-top">
        <div className="footer-item" data-animate="left">
          <div className="footer-item-icon">📞</div>
          <h4>Call for Quotation</h4>
          <p>+91-9217371321</p>
        </div>

        <div
          className="footer-item"
          data-animate="fade"
          style={{ transitionDelay: "0.15s" }}
        >
          <div className="footer-item-icon">🕐</div>
          <h4>Operation Hours</h4>
          <p>Mon to Sat · 10AM – 6PM</p>
        </div>

        <div
          className="footer-item"
          data-animate
          style={{ transitionDelay: "0.3s" }}
        >
          <div className="footer-item-icon">✉️</div>
          <h4>Email Us</h4>
          <p>contact@cellogenbiotech.com</p>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Cellogen Therapeutics Pvt. Ltd. · All rights reserved.
      </div>
    </footer>
  );
}
