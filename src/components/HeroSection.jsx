import React from "react";

export default function HeroSection() {
  return (
    <section id="hero-section" className="hero-wrapper">
      {/* Background color orbs */}
      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />
      <div className="hero-orb hero-orb-3" />

      <div className="hero-inner">
        {/* ── Left content column ── */}
        <div className="hero-content">
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            Next-Gen Biotech Solutions
          </div>

          <h1 className="hero-title">
            Innovation Made<br />
            <span>Affordable</span>
          </h1>

          <p className="hero-subtitle">
            Enabling scientists and clinicians with world-class therapeutic
            materials built for the next generation of biomedical research.
          </p>

          <div className="hero-chips">
            <div className="hero-chip">AI-Driven Solutions</div>
            <div className="hero-chip">High Quality Products</div>
            <div className="hero-chip">Make in India</div>
          </div>

        </div>

        {/* ── Right visual column ── */}
        <div className="hero-visual">
          {/* Molecular orbiting rings */}
          <div className="molecule-wrap">
            <div className="molecule-core">
              <div className="molecule-core-inner" />
            </div>
            <div className="molecule-ring ring-1">
              <div className="molecule-dot dot-sky" />
            </div>
            <div className="molecule-ring ring-2">
              <div className="molecule-dot dot-green" />
            </div>
            <div className="molecule-ring ring-3">
              <div className="molecule-dot dot-indigo" />
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
