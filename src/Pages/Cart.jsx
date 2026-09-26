import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "../styles/Cart.css";

const Cart = () => {
  const { cart, removeFromCart, clearCart } =
    useContext(CartContext);
  const navigate = useNavigate();

  const total = cart.reduce((acc, item) => {
    const price = parseInt(
      item.price.replace(/[^\d]/g, "")
    );
    return acc + price;
  }, 0);

  const handleCheckout = () => {
    if (!cart.length) return;

    const existingOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    const updatedOrders = [
      ...existingOrders,
      {
        id: Date.now(),
        items: cart,
        total,
        date: new Date().toLocaleString(),
      },
    ];

    localStorage.setItem(
      "orders",
      JSON.stringify(updatedOrders)
    );

    clearCart();
    navigate("/my-orders");
  };

  return (
    <div className="cart-page">

      {/* 🔙 Back Button */}
      <button
        className="cart-back-btn"
        onClick={() => navigate("/")}
      >
        ← Continue Shopping
      </button>

      <h1 className="cart-title">My Cart</h1>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty.</p>
          <button onClick={() => navigate("/")}>
            Go Shopping
          </button>
        </div>
      ) : (
        <div className="cart-content">

          {/* LEFT SIDE ITEMS */}
          <div className="cart-items">
            {cart.map((item) => (
              <div
                className="cart-card"
                key={item.cartId}
              >
                <img
                  src={`/Images/${item.img}`}
                  alt={item.title}
                />

                <div className="cart-info">
                  <h3>{item.title}</h3>
                  <p>{item.price}</p>
                  <p>Size: {item.selectedSize}</p>
                </div>

                <button
                  className="remove-btn"
                  onClick={() =>
                    removeFromCart(item.cartId)
                  }
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* RIGHT SIDE SUMMARY */}
          <div className="cart-summary">
            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <button
              className="checkout-btn"
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </div>

        </div>
      )}
    </div>
  );
};

export default Cart;
