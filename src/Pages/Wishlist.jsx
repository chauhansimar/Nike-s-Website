import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Wishlist = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(
          "http://localhost:5000/api/wishlist",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error("Unauthorized or server error");
        }

        const data = await res.json();
        setItems(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Wishlist fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [token]);

  const removeItem = async (id) => {
    try {
      await fetch(
        `http://localhost:5000/api/wishlist/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setItems((prev) =>
        prev.filter((item) => item._id !== id)
      );
    } catch (error) {
      console.error("Remove error:", error);
    }
  };

  // 🔐 If not logged in → show message (no redirect)
  if (!token) {
    return (
      <div className="wishlist-container">
        <h1>❤️ Wishlist</h1>
        <p>Please login to view your wishlist.</p>
        <button onClick={() => navigate("/login")}>
          Go to Login
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="wishlist-container">
        <h1>❤️ Wishlist</h1>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="wishlist-container">
      <h1>❤️ Wishlist</h1>

      {items.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="wishlist-grid">
          {items.map((item) => (
            <div
              className="wishlist-card"
              key={item._id}
            >
              <img
                src={item.image}
                alt={item.name}
              />
              <h3>{item.name}</h3>
              <p>₹{item.price}</p>

              <button
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
