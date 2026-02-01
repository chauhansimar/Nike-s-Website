import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "../styles/cart.css"; // optional but recommended

const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext);

  return (
    <section className="cart-page">
      <h1>Your Cart 🛒</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cart.map((item) => (
          <div className="cart-item" key={item.productId}>
            <div>
              <p><b>Product ID:</b> {item.productId}</p>
              <p><b>Quantity:</b> {item.quantity}</p>
            </div>

            <button onClick={() => removeFromCart(item.productId)}>
              Remove
            </button>
          </div>
        ))
      )}
    </section>
  );
};

export default Cart;
