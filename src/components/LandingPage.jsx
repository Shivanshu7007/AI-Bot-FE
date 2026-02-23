import React, { useEffect, useState } from "react";

export default function LandingPage({ onOpenChat }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + "/api/products", { cache: "no-store" })
      .then(res => res.json())
      .then(data => {
        setProducts(data);
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
      <h2 className="section-title">Our Therapeutic Kits</h2>

      {loading && <p style={{ marginTop: "20px" }}>Loading products...</p>}

      {!loading && products.length === 0 && (
        <p style={{ marginTop: "20px" }}>No products available.</p>
      )}

      {/* SLIDER CONTROLS */}
      <div className="slider-controls">
        <button onClick={scrollLeft}>←</button>
        <button onClick={scrollRight}>→</button>
      </div>

      {/* PRODUCTS */}
      <div className="products-grid">
        {products.map(product => (
          <div className="product-card" key={product.id}>
            {product.image_url ? (
              <img
                src={product.image_url}
                alt={product.name}
                className="product-image"
              />
            ) : (
              <div className="product-image-placeholder">
                No Image
              </div>
            )}

            <div className="product-content">
              <h3 className="product-title">{product.name}</h3>
              <p className="product-desc">{product.description}</p>

              <button
                className="btn-chat"
                onClick={() => onOpenChat(product.id, product.name)}
              >
                Chat with this Product
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}