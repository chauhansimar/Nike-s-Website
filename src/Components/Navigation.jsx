import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";

const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cart } = useContext(CartContext); // ✅ USE CONTEXT

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  // ✅ NORMAL PAGE NAVIGATION (NO react-router-dom)
  const goToLogin = () => {
    window.location.href = "/login";
  };

  const goToWishlist = () => {
    window.location.href = "/wishlist";
  };

  const goToCart = () => {
    window.location.href = "/cart";
  };

  return (
    <nav className="navbar">
      {/* LOGO */}
      <div className="logo">
        <img src="/Images/brand_logo.png" alt="logo" />
      </div>

      {/* NAV LINKS */}
      <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
        <li onClick={() => scrollToSection("Sale")}>Sale</li>
        <li onClick={() => scrollToSection("Men")}>Men</li>
        <li onClick={() => scrollToSection("Women")}>Women</li>
        <li onClick={() => scrollToSection("Kids")}>Kids</li>
        <li onClick={() => scrollToSection("Contact")}>Contact</li>
      </ul>

      {/* RIGHT SIDE */}
      <div className="nav-right">
        <input type="text" className="nav-search" placeholder="Search" />

        {/* Wishlist */}
        <span className="nav-icon" onClick={goToWishlist}>
          🩶
        </span>

        {/* Cart */}
        <span className="nav-icon" onClick={goToCart}>
          🛒 {cart.length > 0 && <sup>{cart.length}</sup>}
        </span>

        {/* HAMBURGER */}
        <div
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </div>
      </div>

      {/* LOGIN */}
      <button className="login-btn" onClick={goToLogin}>
        Login
      </button>
    </nav>
  );
};

const CartIcon = ({ size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3 3H5L6.6 14.2C6.7 14.8 7.2 15.2 7.8 15.2H18.4C19 15.2 19.5 14.8 19.6 14.2L21 6H6"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="9" cy="20" r="1.5" fill="currentColor" />
    <circle cx="17" cy="20" r="1.5" fill="currentColor" />
  </svg>
);

export default Navigation;
