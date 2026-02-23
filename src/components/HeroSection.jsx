// export default function HeroSection() {
//   return (
//     <section
//       id="hero-section"
//       className="hero-wrapper"
//       style={{
//         paddingTop: "130px",
//         paddingBottom: "60px",
//         background: "linear-gradient(135deg,#f0f9ff,#e0f2fe)",
//         textAlign: "center",
//       }}
//     >
//       {/* MAIN TITLE */}
//       <h1
//         style={{
//           fontSize: "3.2rem",
//           fontWeight: "700",
//           marginBottom: "1rem",
//           color: "#0f172a",
//           lineHeight: "1.2",
//         }}
//       >
//         Innovation Made <br /> Affordable
//       </h1>

//       {/* SUBTITLE */}
//       <p
//         style={{
//           maxWidth: "700px",
//           margin: "0 auto",
//           color: "#475569",
//           fontSize: "1.1rem",
//           lineHeight: "1.6",
//         }}
//       >
//         Enabling scientists and clinicians with world-class therapeutic materials.
//       </p>

//       {/* FEATURES ROW */}
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           gap: "2rem",
//           marginTop: "40px",
//           flexWrap: "wrap",
//         }}
//       >
//         {/* BOX 1 */}
//         <div className="feature-box">
//           <h3>AI-Driven<br />Solutions</h3>
//         </div>

//         {/* BOX 2 */}
//         <div className="feature-box">
//           <h3>High Quality<br />Products</h3>
//         </div>

//         {/* BOX 3 */}
//         <div className="feature-box">
//           <h3>‘Make in India’<br />Initiative</h3>
//         </div>
//       </div>
//     </section>
//   );
// }
import React from "react";

export default function HeroSection() {
  return (
    <section id="hero-section" className="hero-wrapper">
      <h1>
        Innovation Made <br /> Affordable
      </h1>

      <p>
        Enabling scientists and clinicians with world-class therapeutic materials.
      </p>

      <div style={{ display: "flex", justifyContent: "center", gap: "2rem", marginTop: "40px", flexWrap: "wrap" }}>
        <div className="feature-box"><h3>AI-Driven<br />Solutions</h3></div>
        <div className="feature-box"><h3>High Quality<br />Products</h3></div>
        <div className="feature-box"><h3>‘Make in India’<br />Initiative</h3></div>
      </div>
    </section>
  );
}