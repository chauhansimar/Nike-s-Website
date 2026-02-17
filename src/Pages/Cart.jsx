import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "../styles/Cart.css";

const Cart = ({ setSelectedProduct }) => {
  const { cart, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  const totalPrice = cart.reduce((acc, item) => {
    const price = parseInt(item.price.replace(/[^\d]/g, ""));
    return acc + price;
  }, 0);

  const openProduct = (product) => {
    setSelectedProduct(product);
    navigate("/");
  };

  return (
    <div className="cart-container">

      <button
        className="cart-back-btn"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <h1>Your Bag</h1>

      {cart.length === 0 ? (
        <p className="empty-cart">Your bag is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.cartId} className="cart-item">

                <img
                  src={item.isApi ? item.img : `/Images/${item.img}`}
                  alt={item.title}
                  onClick={() => openProduct(item)}
                  style={{ cursor: "pointer" }}
                />

                <div className="cart-details">
                  <h3
                    onClick={() => openProduct(item)}
                    style={{ cursor: "pointer" }}
                  >
                    {item.title}
                  </h3>

                  <p className="brand">Nike</p>
                  <p className="size">Size: {item.selectedSize}</p>
                  <p className="price">{item.price}</p>

                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item.cartId)}
                  >
                    Remove
                  </button>
                </div>

              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Summary</h2>
            <p>Total: ₹{totalPrice}</p>
            <button className="checkout-btn">
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
