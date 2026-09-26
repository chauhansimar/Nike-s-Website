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
import ChatBot from "./Components/Chatbot";

/* PAGES */
import Sale from "./Pages/Sale";
import Men from "./Pages/Men";
import Women from "./Pages/Women";
import Kids from "./Pages/Kids";
import Contact from "./Pages/Contact";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Admin from "./Pages/Admin";
import Wishlist from "./Pages/Wishlist";
import Cart from "./Pages/Cart";
import ProductPage from "./Pages/ProductPage";
import MyOrders from "./Pages/MyOrders";
import Footer from "./Pages/Footer";

/* CONTEXT */
import CartProvider from "./context/CartContext";

/* ---------------- HOME PAGE ---------------- */
const Home = ({ onSelectProduct }) => {
  return (
    <>
      <HeroSection />

      <section id="Sale">
        <Sale onSelectProduct={(p) => onSelectProduct(p, "Sale")} />
      </section>

      <section id="Men">
        <Men onSelectProduct={(p) => onSelectProduct(p, "Men")} />
      </section>

      <section id="Women">
        <Women onSelectProduct={(p) => onSelectProduct(p, "Women")} />
      </section>

      <section id="Kids">
        <Kids onSelectProduct={(p) => onSelectProduct(p, "Kids")} />
      </section>

      <section id="Contact">
        <Contact />
      </section>

      <Footer />
    </>
  );
};

/* ---------------- APP LAYOUT ---------------- */
const AppLayout = ({
  wishlist,
  removeFromWishlist,
  selectedProduct,
  sourceSection,
  setSelectedProduct,
}) => {
  const location = useLocation();

  const goBack = () => {
    setSelectedProduct(null);

    setTimeout(() => {
      if (sourceSection) {
        const sectionEl = document.getElementById(sourceSection);
        if (sectionEl) {
          sectionEl.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    }, 0);
  };

  return (
    <>
      {/* Hide Navbar on login page */}
      {location.pathname !== "/login" && <Navigation />}

      <Routes>
        <Route
          path="/"
          element={
            selectedProduct ? (
              <ProductPage
                product={selectedProduct}
                goBack={goBack}
              />
            ) : (
              <Home onSelectProduct={setSelectedProduct} />
            )
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/my-orders" element={<MyOrders />} />

        <Route
          path="/wishlist"
          element={
            <Wishlist
              wishlist={wishlist}
              removeFromWishlist={removeFromWishlist}
            />
          }
        />

        <Route path="/cart" element={<Cart />} />
      </Routes>

      {/* 🔥 Chatbot appears on all pages */}
      <ChatBot />
    </>
  );
};

/* ---------------- MAIN APP ---------------- */
const App = () => {
  const [wishlist, setWishlist] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sourceSection, setSourceSection] = useState(null);

  const handleSelectProduct = (product, section) => {
    setSourceSection(section);
    setSelectedProduct(product);
  };

  const removeFromWishlist = (id) => {
    setWishlist((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  return (
    <CartProvider>
      <Router>
        <AppLayout
          wishlist={wishlist}
          removeFromWishlist={removeFromWishlist}
          selectedProduct={selectedProduct}
          sourceSection={sourceSection}
          setSelectedProduct={handleSelectProduct}
        />
      </Router>
    </CartProvider>
  );
};

export default App;
