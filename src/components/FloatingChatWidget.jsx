// import { useState, useEffect, useRef } from "react";

// export default function FloatingChatWidget({
//   productId,
//   productName,
//   isOpen,
//   onClose,
//   onToggle
// }) {

//   const [messages, setMessages] = useState([]);
//   const messagesEndRef = useRef(null);

//   const API_URL = process.env.REACT_APP_API_URL;

//   useEffect(() => {
//     if (productId && productName) {
//       setMessages([
//         {
//           sender: "bot",
//           text: `Hello 👋 I am ready to answer your questions about ${productName}.`
//         }
//       ]);
//     }
//   }, [productId, productName]);

//   useEffect(() => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [messages]);

//   const sendMessage = async (text) => {

//     if (!text.trim()) return;

//     setMessages(prev => [...prev, { sender: "user", text }]);

//     if (!productId) {
//       setMessages(prev => [
//         ...prev,
//         {
//           sender: "bot",
//           text: "I am a product-specific chatbot. Please scan the QR code from your kit to continue."
//         }
//       ]);
//       return;
//     }

//     try {

//       const response = await fetch(`${API_URL}/chat`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//           product_id: productId,
//           question: text
//         })
//       });

//       const data = await response.json();

//       setMessages(prev => [
//         ...prev,
//         { sender: "bot", text: data.reply }
//       ]);

//     } catch (err) {
//       setMessages(prev => [
//         ...prev,
//         { sender: "bot", text: "⚠️ Server error. Please try again." }
//       ]);
//     }
//   };

//   return (
//     <>
//       {isOpen && (
//         <div
//           style={{
//             position: "fixed",
//             inset: 0,
//             background: "rgba(0,0,0,0.4)",
//             backdropFilter: "blur(6px)",
//             zIndex: 999
//           }}
//           onClick={onClose}
//         />
//       )}

//       {isOpen && (
//         <div
//           style={{
//             position: "fixed",
//             bottom: "30px",
//             right: "30px",
//             width: "380px",
//             height: "600px",
//             background: "#fff",
//             borderRadius: "22px",
//             boxShadow: "0 30px 60px rgba(0,0,0,0.4)",
//             display: "flex",
//             flexDirection: "column",
//             overflow: "hidden",
//             zIndex: 1000
//           }}
//         >

//           <div
//             style={{
//               padding: "18px 20px",
//               background: "linear-gradient(135deg,#0f3d4a,#1b5f63,#9c4f2f)",
//               color: "white",
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center"
//             }}
//           >
//             <span style={{ fontWeight: 600 }}>
//               {productName || "Cellogen Therapeutics Bot"}
//             </span>

//             <button
//               onClick={onClose}
//               style={{
//                 background: "transparent",
//                 border: "none",
//                 color: "white",
//                 fontSize: "20px",
//                 cursor: "pointer"
//               }}
//             >
//               —
//             </button>
//           </div>

//           <div
//             style={{
//               flex: 1,
//               padding: "20px",
//               overflowY: "auto",
//               background: "#f4f6f8"
//             }}
//           >
//             {messages.map((msg, index) => (
//               <div
//                 key={index}
//                 style={{
//                   display: "flex",
//                   justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
//                   marginBottom: "15px"
//                 }}
//               >
//                 <div
//                   style={{
//                     padding: "14px 18px",
//                     borderRadius: "18px",
//                     maxWidth: "75%",
//                     background:
//                       msg.sender === "user"
//                         ? "linear-gradient(135deg,#1b5f63,#0f3d4a)"
//                         : "#fff",
//                     color: msg.sender === "user" ? "#fff" : "#111",
//                     border:
//                       msg.sender === "bot" ? "1px solid #e5e7eb" : "none"
//                   }}
//                 >
//                   {msg.text}
//                 </div>
//               </div>
//             ))}

//             <div ref={messagesEndRef} />
//           </div>

//           <div
//             style={{
//               padding: "16px",
//               borderTop: "1px solid #e5e7eb",
//               background: "#fff"
//             }}
//           >
//             <div
//               style={{
//                 display: "flex",
//                 border: "2px solid #e2e8f0",
//                 borderRadius: "30px",
//                 padding: "6px"
//               }}
//             >
//               <input
//                 type="text"
//                 placeholder="Ask a question"
//                 style={{
//                   flex: 1,
//                   border: "none",
//                   outline: "none",
//                   padding: "10px 15px"
//                 }}
//                 onKeyDown={(e) => {
//                   if (e.key === "Enter") {
//                     sendMessage(e.target.value);
//                     e.target.value = "";
//                   }
//                 }}
//               />

//               <button
//                 style={{
//                   width: "42px",
//                   height: "42px",
//                   borderRadius: "50%",
//                   border: "none",
//                   background: "#1b5f63",
//                   color: "#fff",
//                   cursor: "pointer"
//                 }}
//                 onClick={(e) => {
//                   const input =
//                     e.currentTarget.parentElement.querySelector("input");
//                   sendMessage(input.value);
//                   input.value = "";
//                 }}
//               >
//                 →
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {!isOpen && (
//         <button
//           onClick={onToggle}
//           style={{
//             position: "fixed",
//             bottom: "30px",
//             right: "30px",
//             width: "60px",
//             height: "60px",
//             borderRadius: "50%",
//             border: "none",
//             background: "linear-gradient(135deg,#1b5f63,#9c4f2f)",
//             color: "white",
//             fontSize: "22px",
//             cursor: "pointer",
//             boxShadow: "0 10px 25px rgba(0,0,0,0.4)",
//             zIndex: 1000
//           }}
//         >
//           💬
//         </button>
//       )}
//     </>
//   );
// }