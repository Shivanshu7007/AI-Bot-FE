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
  const [products, setProducts] = useState([]);

  const API_URL = process.env.REACT_APP_API_URL;

  // ✅ Fetch products once
  useEffect(() => {
    fetch(`${API_URL}/api/products`)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
      })
      .catch(() => {});
  }, [API_URL]);

  // ✅ Handle QR param AFTER products load
  useEffect(() => {
    if (!products.length) return;

    const params = new URLSearchParams(window.location.search);
    const scannedId = params.get("product_id");

    if (scannedId) {
      const found = products.find(
        p => String(p.id) === String(scannedId)
      );

      if (found) {
        setActiveProductId(found.id);
        setActiveProductName(found.name);
        setIsChatOpen(true);
      }
    }
  }, [products]);

  const handleOpenChat = (id, name) => {
    setActiveProductId(id);
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
        key={activeProductId}   // 🔥 React DOM fix
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