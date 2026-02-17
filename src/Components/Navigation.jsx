import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const Navigation = () => {
  const navigate = useNavigate();
  const { cart } = useContext(CartContext);

  const [activeSection, setActiveSection] = useState("");
  const [user, setUser] = useState(null);
    

  // Check if logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="navbar">
      {/* LOGO */}
      <div className="logo" onClick={() => navigate("/")}>
        <img src="/Images/brand_logo.png" alt="logo" />
      </div>

      {/* NAV LINKS */}
      <ul className="nav-links">
        {["Sale", "Men", "Women", "Kids", "Contact"].map((item) => (
          <li
            key={item}
            onClick={() => scrollToSection(item)}
            className={activeSection === item ? "nav-item active" : "nav-item"}
          >
            {item}
          </li>
        ))}
      </ul>

      {/* RIGHT SIDE */}
      <div className="nav-right">
        <input type="text" className="nav-search" placeholder="Search" />
<span
  className="nav-icon"
  onClick={() => navigate("/my-orders")}
>
  📦
</span>

        <span className="nav-icon" onClick={() => navigate("/wishlist")}>
          🩶
        </span>

        <span className="nav-icon" onClick={() => navigate("/cart")}>
          🛒 {cart.length > 0 && <sup>{cart.length}</sup>}
        </span>

        {/* AUTH SECTION */}
        {user ? (
          <>
            <span style={{ marginRight: "10px" }}>
              Hi, {user.name}
            </span>

            <button
              className="login-btn"
              onClick={handleLogout}
              style={{
                backgroundColor: "black",
                color: "white",
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <button
            className="login-btn"
            onClick={() => navigate("/login")}
            style={{
              backgroundColor: "black",
              color: "white",
            }}
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
