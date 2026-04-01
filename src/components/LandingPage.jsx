import React, { useEffect, useState } from "react";
import useScrollReveal from "../hooks/useScrollReveal";

export default function LandingPage({ onOpenChat }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useScrollReveal([products]);

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + "/api/products", { cache: "no-store" })
      .then(res => res.json())
      .then(data => {
        setProducts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const scrollLeft = () => {
    document.querySelector(".products-grid")
      ?.scrollBy({ left: -340, behavior: "smooth" });
  };

  const scrollRight = () => {
    document.querySelector(".products-grid")
      ?.scrollBy({ left: 340, behavior: "smooth" });
  };

  return (
    <section id="kits-section" className="products-section">
      <div className="section-header" data-animate>
        <span className="section-eyebrow">Our Catalog</span>
        <h2 className="section-title">Therapeutic Kits</h2>
        <p className="section-subtitle">
          Precision-engineered research kits designed for cutting-edge biomedical applications.
        </p>
      </div>

      <div className="slider-controls" data-animate>
        <button onClick={scrollLeft}>←</button>
        <button onClick={scrollRight}>→</button>
      </div>

      <div className="products-grid">
        {/* Skeleton loading state */}
        {loading && (
          <>
            <div className="skeleton-card" />
            <div className="skeleton-card" style={{ animationDelay: "0.15s" }} />
            <div className="skeleton-card" style={{ animationDelay: "0.3s" }} />
          </>
        )}

        {/* Empty state */}
        {!loading && products.length === 0 && (
          <p style={{ color: "var(--muted)", padding: "20px 48px" }}>
            No products available.
          </p>
        )}

        {/* Product cards */}
        {!loading && products.map((product, index) => (
          <div
            className="product-card"
            key={product.id}
            data-animate="scale"
            style={{ transitionDelay: `${index * 0.1}s` }}
          >
            {product.image_url ? (
              <img
                src={product.image_url}
                alt={product.name}
                className="product-image"
              />
            ) : (
              <div className="product-image-placeholder">🧪</div>
            )}

            <div className="product-content">
              <span className="product-tag">Therapeutic Kit</span>
              <h3 className="product-title">{product.name}</h3>
              <p className="product-desc">{product.description}</p>

              <button
                className="btn-chat"
                onClick={() => onOpenChat(product.id, product.name)}
              >
                💬 Chat with this Product
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
