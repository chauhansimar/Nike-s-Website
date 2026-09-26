import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Wishlist.css";

const Wishlist = () => {

  const [items, setItems] = useState([]);

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // ✅ FETCH WISHLIST FROM BACKEND
  const fetchWishlist = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/wishlist",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setItems(data);
      } else {
        alert(data.message);
      }

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  // ✅ REMOVE ITEM
  const removeItem = async (id) => {

    try {

      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/wishlist/${id}`,
        {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {

        setItems(
          items.filter((item) => item._id !== id)
        );

      } else {

        alert(data.message);

      }

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {

    fetchWishlist();

  }, []);

  return (
    <div className="wishlist-page">

      {/* BACK BUTTON */}
      <button
        className="wishlist-back-btn"
        onClick={() => navigate("/")}
      >
        ← Continue Shopping
      </button>

      <h1 className="wishlist-title">
        My Wishlist
      </h1>

      {loading ? (

        <p>Loading...</p>

      ) : items.length === 0 ? (

        <div className="wishlist-empty">

          <p>Your wishlist is empty.</p>

          <button onClick={() => navigate("/")}>
            Start Shopping
          </button>

        </div>

      ) : (

        <div className="wishlist-grid">

          {items.map((item) => (

            <div
              key={item._id}
              className="wishlist-card"
            >

              <img
                src={item.image}
                alt={item.name}
              />

              <div className="wishlist-info">

                <h3>{item.name}</h3>

                <p>₹{item.price}</p>

              </div>

              <button
                className="wishlist-remove-btn"
                onClick={() =>
                  removeItem(item._id)
                }
              >
                Remove
              </button>

            </div>

          ))}

        </div>

      )}
    </div>
  );
};

export default Wishlist;