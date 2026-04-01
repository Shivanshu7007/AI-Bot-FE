import React, { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToHome = () => {
    const section = document.getElementById("hero-section");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToKits = () => {
    const section = document.getElementById("kits-section");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToFooter = () => {
    const section = document.getElementById("contact-section");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
      <div className="nav-brand">
        Cellogen Biotech
      </div>

      <div className="nav-links">
        <button className="nav-link-btn" onClick={scrollToHome}>
          Home
        </button>
        <button className="nav-link-btn" onClick={scrollToKits}>
          QC Kit's
        </button>
        <button className="btn-contact" onClick={scrollToFooter}>
          Contact Us
        </button>
      </div>
    </nav>
  );
}
