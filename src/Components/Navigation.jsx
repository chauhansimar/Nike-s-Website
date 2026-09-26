import { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart } = useContext(CartContext);

  const sections = ["Sale", "Men", "Women", "Kids", "Contact"];

  const [activeSection, setActiveSection] = useState("");
  const [user, setUser] = useState(null);
  const [isHidden, setIsHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  /* ================= LOGIN CHECK ================= */
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  /* ================= SCROLL TO SECTION ================= */
  const scrollToSection = (id) => {
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: id } });
    } else {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
        setActiveSection(id);
      }
    }
  };

  /* ================= SCROLL SPY ================= */
  useEffect(() => {
    if (location.pathname !== "/") return;

    const handleScrollSpy = () => {
      for (let id of sections) {
        const section = document.getElementById(id);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScrollSpy);

    return () => {
      window.removeEventListener("scroll", handleScrollSpy);
    };
  }, [location.pathname]);

  /* ================= AUTO HIDE NAVBAR ================= */
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScrollDirection = () => {
      const currentScrollY = window.scrollY;

      // Hide on scroll down
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }

      // Add shadow when scrolled
      if (currentScrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScrollDirection);

    return () => {
      window.removeEventListener("scroll", handleScrollDirection);
    };
  }, []);

  /* ================= LOGOUT ================= */
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <nav
      className={`navbar 
        ${isHidden ? "navbar-hidden" : ""} 
        ${isScrolled ? "navbar-shadow" : ""}
      `}
    >
      {/* LOGO */}
      <div className="logo" onClick={() => navigate("/")}>
        <img src="/Images/brand_logo.png" alt="logo" />
      </div>

      {/* NAV LINKS */}
      <ul className="nav-links">
        {sections.map((item) => (
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

        <input
          type="text"
          className="nav-search"
          placeholder="Search"
        />

        {/* Orders */}
        <span
          className="nav-icon"
          onClick={() => navigate("/my-orders")}
        >
          📦
        </span>

        {/* Wishlist */}
        <span
          className="nav-icon"
          onClick={() => navigate("/wishlist")}
        >
          🩶
        </span>

        {/* Cart */}
        <span
          className="nav-icon"
          onClick={() => navigate("/cart")}
        >
          🛒
          {cart?.length > 0 && (
            <span className="cart-count">{cart.length}</span>
          )}
        </span>

        {/* AUTH */}
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