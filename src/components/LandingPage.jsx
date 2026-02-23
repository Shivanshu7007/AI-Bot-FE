// import React, { useEffect, useState } from "react";

// export default function LandingPage({ onOpenChat }) {

//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch Products
//   useEffect(() => {
//     fetch(process.env.REACT_APP_API_URL + "/api/products", { cache: "no-store" })
//       .then(res => res.json())
//       .then(data => {
//         setProducts(data);
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error("API Error:", err);
//         setLoading(false);
//       });
//   }, []);

//   const scrollLeft = () => {
//     document.querySelector(".products-grid")
//       .scrollBy({ left: -340, behavior: "smooth" });
//   };

//   const scrollRight = () => {
//     document.querySelector(".products-grid")
//       .scrollBy({ left: 340, behavior: "smooth" });
//   };

//   return (
//     <div className="landing-wrapper">

//       {/* ================= SECTION TITLE ================= */}
//       <section id="kits-section" className="products-section">

//         <h2 className="section-title">Our Therapeutic Kits</h2>

//         {loading && (
//           <p style={{ textAlign: "center", marginTop: "20px" }}>
//             Loading products...
//           </p>
//         )}

//         {!loading && products.length === 0 && (
//           <p style={{ textAlign: "center", marginTop: "20px" }}>
//             No products available.
//           </p>
//         )}

//         {/* ====== SLIDER ARROWS ====== */}
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "center",
//             gap: "20px",
//             marginBottom: "20px",
//             marginTop: "20px"
//           }}
//         >
//           <button
//             onClick={scrollLeft}
//             style={{
//               fontSize: "22px",
//               padding: "8px 14px",
//               borderRadius: "8px",
//               border: "1px solid #ccc",
//               cursor: "pointer",
//               background: "white",
//               boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
//             }}
//           >
//             ←
//           </button>

//           <button
//             onClick={scrollRight}
//             style={{
//               fontSize: "22px",
//               padding: "8px 14px",
//               borderRadius: "8px",
//               border: "1px solid #ccc",
//               cursor: "pointer",
//               background: "white",
//               boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
//             }}
//           >
//             →
//           </button>
//         </div>

//         {/* ================= PRODUCTS SLIDER ================= */}
//         <div className="products-grid">

//           {products.map(product => (
//             <div className="product-card" key={product.id}>

//               {/* PRODUCT IMAGE */}
//               {product.image_url ? (
//                 <img
//                   src={product.image_url}
//                   alt={product.name}
//                   className="product-image"
//                 />
//               ) : (
//                 <div
//                   style={{
//                     height: "200px",
//                     background: "#e5e7eb",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center"
//                   }}
//                 >
//                   No Image
//                 </div>
//               )}

//               {/* PRODUCT DETAILS */}
//               <div className="product-content">

//                 <h3 className="product-title">{product.name}</h3>
//                 <p className="product-desc">{product.description}</p>

//                 <button
//                   className="btn-chat"
//                   onClick={() => onOpenChat(product.id, product.name)}
//                 >
//                   Chat with this Product
//                 </button>

//               </div>
//             </div>
//           ))}

//         </div>

//       </section>

//     </div>
//   );
// }
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
      .catch(err => {
        console.error("API Error:", err);
        setLoading(false);
      });
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

      {loading && <p className="center-text">Loading products...</p>}
      {!loading && products.length === 0 && (
        <p className="center-text">No products available.</p>
      )}

      <div className="slider-controls">
        <button onClick={scrollLeft}>←</button>
        <button onClick={scrollRight}>→</button>
      </div>

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
              <div className="no-image">No Image</div>
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