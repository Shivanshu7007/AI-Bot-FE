// export default function Navbar() {

//   // Scroll to Hero Section (Home)
//   const scrollToHome = () => {
//     const section = document.getElementById("hero-section");
//     if (section) {
//       section.scrollIntoView({ behavior: "smooth" });
//     }
//   };

//   // Scroll to Kits Section
//   const scrollToKits = () => {
//     const section = document.getElementById("kits-section");
//     if (section) {
//       section.scrollIntoView({ behavior: "smooth" });
//     }
//   };

//   // Scroll to Footer (Contact Us)
//   const scrollToFooter = () => {
//     const section = document.getElementById("contact-section");
//     if (section) {
//       section.scrollIntoView({ behavior: "smooth" });
//     }
//   };

//   return (
//     <nav className="navbar">
//       <div className="nav-brand">Cellogen Biotech</div>

//       <div className="nav-links">
//         <button className="nav-link-btn" onClick={scrollToHome}>
//           Home
//         </button>

//         <button className="nav-link-btn" onClick={scrollToKits}>
//           Kit's
//         </button>

//         <button className="btn-contact" onClick={scrollToFooter}>
//           Contact Us
//         </button>
//       </div>
//     </nav>
//   );
// }
import React from "react";

export default function Navbar() {
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
    <nav className="navbar">
      <div className="nav-brand">Cellogen Biotech</div>
      <div className="nav-links">
        <button className="nav-link-btn" onClick={scrollToHome}>Home</button>
        <button className="nav-link-btn" onClick={scrollToKits}>Kit's</button>
        <button className="btn-contact" onClick={scrollToFooter}>Contact Us</button>
      </div>
    </nav>
  );
}