import React from "react";

export default function Footer() {
  return (
    <footer
      id="contact-section"
      style={{
        marginTop: "80px",
        background: "#0f3d5a",
        color: "white",
        padding: "40px 20px",
        borderTopLeftRadius: "10px",
        borderTopRightRadius: "10px"
      }}
    >
      {/* TOP INFO BAR */}
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "2rem",
          paddingBottom: "25px",
          borderBottom: "1px solid rgba(255,255,255,0.2)"
        }}
      >
        {/* ITEM 1 */}
        <div style={{ textAlign: "center" }}>
          <h4 style={{ marginBottom: "6px", fontSize: "1.1rem" }}>
            Call for Quotation
          </h4>
          <p style={{ opacity: 0.85, fontSize: "1rem" }}>0120-3139174</p>
        </div>

        {/* ITEM 2 */}
        <div style={{ textAlign: "center" }}>
          <h4 style={{ marginBottom: "6px", fontSize: "1.1rem" }}>
            Operation Hours
          </h4>
          <p style={{ opacity: 0.85, fontSize: "1rem" }}>
            Mon to Sat 10AM - 6PM
          </p>
        </div>

        {/* ITEM 3 */}
        <div style={{ textAlign: "center" }}>
          <h4 style={{ marginBottom: "6px", fontSize: "1.1rem" }}>
            Email Us
          </h4>
          <p style={{ opacity: 0.85, fontSize: "1rem" }}>
            contact@cellogenbiotech.com
          </p>
        </div>
      </div>

      {/* COPYRIGHT TEXT */}
      <div
        style={{
          textAlign: "center",
          marginTop: "25px",
          fontSize: "0.9rem",
          opacity: 0.8
        }}
      >
        © {new Date().getFullYear()} All rights reserved to Cellogen Therapeutics
      </div>
    </footer>
  );
}
