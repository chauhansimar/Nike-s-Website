import "./App.css";
import "./styles/Sale.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useState } from "react";

/* COMPONENTS */
import Navigation from "./Components/Navigation";
import HeroSection from "./Components/Hero";

/* PAGES */
import Sale from "./Pages/Sale";
import Men from "./Pages/Men";
import Women from "./Pages/Women";
import Kids from "./Pages/Kids";
import Contact from "./Pages/Contact";
import Login from "./Pages/Login";
import Footer from "./Pages/Footer";
import Wishlist from "./Pages/Wishlist";
import Cart from "./Pages/Cart"; // 


/* CONTEXT */
import CartProvider from "./context/CartContext";

/* ---------------- HOME PAGE ---------------- */
const Home = () => {
  return (
    <>
      <HeroSection />

      <section id="Sale">
        <Sale />
      </section>

      <section id="Men">
        <Men />
      </section>

      <section id="Women">
        <Women />
      </section>

      <section id="Kids">
        <Kids />
      </section>

      <section id="Contact">
        <Contact />
      </section>

      <Footer />
    </>
  );
};

/* ---------------- APP LAYOUT ---------------- */
const AppLayout = ({ wishlist, removeFromWishlist }) => {
  const location = useLocation();

  return (
    <>
      {/* Hide navbar on login page */}
      {location.pathname !== "/login" && <Navigation />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* Wishlist */}
        <Route
          path="/wishlist"
          element={
            <Wishlist
              wishlist={wishlist}
              removeFromWishlist={removeFromWishlist}
            />
          }
        />

        {/* ✅ CART ROUTE */}
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  );
};

/* ---------------- MAIN APP ---------------- */
const App = () => {
  const [wishlist, setWishlist] = useState([]);

  // ➕ Add to Wishlist
  const addToWishlist = (product) => {
    setWishlist((prev) => {
      if (prev.some((item) => item.id === product.id)) return prev;
      return [...prev, product];
    });
  };

  // ❌ Remove from Wishlist
  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <CartProvider> {/* ✅ WRAP HERE */}
      <Router>
        <AppLayout
          wishlist={wishlist}
          addToWishlist={addToWishlist}
          removeFromWishlist={removeFromWishlist}
        />
      </Router>
    </CartProvider>
  );
};

export default App;
