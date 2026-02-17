import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Cart.css";

const MyOrders = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(saved);
  }, []);

  return (
    <div className="cart-container">

      {/* 🔙 Short Back Button */}
      <button
        className="back-btn"
        onClick={() => navigate("/")}
      >
        ← Back
      </button>

      <h1>📦 My Orders</h1>

      {cartItems.length === 0 ? (
        <p>Your list is empty.</p>
      ) : (
        <div className="cart-grid">
          {cartItems.map((item) => (
            <div
              className="cart-card"
              key={item.cartId}
            >
              <img
                src={
                  item.isApi
                    ? item.image
                    : `/Images/${item.img}`
                }
                alt={item.title || item.name}
              />

              <h3>{item.title || item.name}</h3>
              <p>{item.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
