import { useEffect, useState } from "react";

const USE_API = false; // change to true if API needed

const Men = ({ onSelectProduct }) => {
  const [products, setProducts] = useState([]);

  const staticShoes = [
    {
      id: "men-1",
      img: "shoe1.png",
      title: "Nike High Dunk",
      price: "₹ 19,999",
      category: "Men's Shoes",
    },
    {
      id: "men-2",
      img: "shoe2.png",
      title: "Nike Downshifter",
      price: "₹ 7,499",
      category: "Men's Shoes",
    },
    {
      id: "men-3",
      img: "shoe3.png",
      title: "Nike Air Force",
      price: "₹ 8,499",
      category: "Men's Shoes",
    },
    {
      id: "men-4",
      img: "shoe4.png",
      title: "Nike Air Structure 26",
      price: "₹ 10,999",
      category: "Men's Shoes",
    },
    {
      id: "men-5",
      img: "shoe5.jpeg",
      title: "Nike Dunk High",
      price: "₹ 11,499",
      category: "Men's Shoes",
    },
    {
      id: "men-6",
      img: "shoe6.png",
      title: "Nike Zoom Haskbark Pro",
      price: "₹ 11,499",
      category: "Men's Shoes",
    },
  ];

  useEffect(() => {
    if (!USE_API) {
      setProducts(staticShoes);
      return;
    }
  }, []);

  return (
    <>
      {/* MEN HERO */}
      <section className="men-hero-split">
        <div className="men-hero-half left">
          <img src="/Images/men-banner1.jpg" alt="Men street lifestyle" />
        </div>

        <div className="men-hero-half right">
          <img src="/Images/men-banner2.jpg" alt="Men athletic training" />
        </div>

        <div className="men-hero-content">
          <h1 className="men-hero-title">BUILT TO DOMINATE.</h1>
          <p className="men-hero-subtitle">
            Power, precision, and performance—engineered for men.
          </p>

          <a href="#men-footwear" className="men-hero-btn">
            Shop Men
          </a>
        </div>
      </section>

      {/* MEN PRODUCTS */}
      <section id="men-footwear" className="men container">
        <div className="men-header">
          <h1>Men's Footwear</h1>
        </div>

        <p className="men-subtext">
          Performance footwear built for everyday grind
        </p>

        <div className="men-grid">
          {products.map((shoe) => (
            <div
              key={shoe.id}
              className="men-card"
              onClick={() => onSelectProduct(shoe, "Men")}   // ✅ IMPORTANT
              style={{ cursor: "pointer" }}
            >
              <img src={`/Images/${shoe.img}`} alt={shoe.title} />
              <h3>{shoe.title}</h3>
              <p>{shoe.category}</p>
              <strong>{shoe.price}</strong>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Men;
