import React from "react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">

        <div className="footer-item">
          <h4>Call for Quotation</h4>
          <p>+91-9217371321</p>
        </div>

        <div className="footer-item">
          <h4>Operation Hours</h4>
          <p>Mon to Sat 10:00AM to 06:00PM</p>
        </div>

        <div className="footer-item">
          <h4>Email Us</h4>
          <p>contact@cellogenbiotech.com</p>
        </div>

      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} All rights reserved to Cellogen Therapeutics
      </div>
    </footer>
  );
}