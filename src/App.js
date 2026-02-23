import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import LandingPage from "./components/LandingPage";
import FloatingChatWidget from "./components/FloatingChatWidget";
import Footer from "./components/Footer";

function App() {
  const [activeProductId, setActiveProductId] = useState(null);
  const [activeProductName, setActiveProductName] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL;

  // 🔥 Handle QR Scan
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const scannedId = params.get("product_id");

    if (scannedId) {
      const id = Number(scannedId);
      setActiveProductId(id);

      // 🔥 Fetch product name from API
      fetch(`${API_URL}/api/products`)
        .then(res => res.json())
        .then(data => {
          const product = data.find(p => p.id === id);
          if (product) {
            setActiveProductName(product.name);
          }
          setIsChatOpen(true);
        })
        .catch(err => {
          console.error("Product fetch error:", err);
          setIsChatOpen(true);
        });
    }
  }, [API_URL]);

  // 🔥 Open Chat From Landing Page
  const handleOpenChat = (id, name) => {
    setActiveProductId(Number(id));
    setActiveProductName(name);
    setIsChatOpen(true);
    window.history.pushState({}, "", `?product_id=${id}`);
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
    window.history.pushState({}, "", window.location.pathname);
  };

  const handleToggleChat = () => {
    setIsChatOpen(prev => !prev);
  };

  return (
    <>
      <Navbar />
      <HeroSection />
      <LandingPage onOpenChat={handleOpenChat} />

      <FloatingChatWidget
        productId={activeProductId}
        productName={activeProductName}
        isOpen={isChatOpen}
        onClose={handleCloseChat}
        onToggle={handleToggleChat}
      />

      <Footer />
    </>
  );
}

export default App;