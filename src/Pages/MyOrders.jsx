import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Orders.css";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(saved.reverse());
  }, []);

  const handleDeleteOrder = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this order?"
    );

    if (!confirmDelete) return;

    const updatedOrders = orders.filter(
      (order) => order.id !== id
    );

    setOrders(updatedOrders);

    localStorage.setItem(
      "orders",
      JSON.stringify(updatedOrders.reverse())
    );
  };

  return (
    <div className="orders-page">

      <button
        className="orders-back-btn"
        onClick={() => navigate("/")}
      >
        ← Continue Shopping
      </button>

      <h1 className="orders-title">My Orders</h1>

      {orders.length === 0 ? (
        <div className="orders-empty">
          <p>No orders placed yet.</p>
          <button onClick={() => navigate("/")}>
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="orders-container">
          {orders.map((order) => (
            <div
              key={order.id}
              className="order-card"
            >
              {/* ORDER HEADER */}
              <div className="order-header">

                <div>
                  <p className="order-date">
                    Order Date: {order.date}
                  </p>
                  <p className="order-id">
                    Order ID: #{order.id}
                  </p>
                </div>

                <div className="order-actions">
                  <span className="order-total">
                    ₹{order.total}
                  </span>

                  <button
                    className="delete-order-btn"
                    onClick={() =>
                      handleDeleteOrder(order.id)
                    }
                  >
                    Delete
                  </button>
                </div>

              </div>

              {/* ITEMS */}
              <div className="order-items">
                {order.items?.map((item) => (
                  <div
                    key={item.cartId}
                    className="order-item"
                  >
                    <img
                      src={`/Images/${item.img}`}
                      alt={item.title}
                    />

                    <div className="order-info">
                      <h4>{item.title}</h4>
                      <p>{item.price}</p>
                      <p>Size: {item.selectedSize}</p>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
