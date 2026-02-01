import { useEffect, useState } from "react";

const USE_API = false; // 👈 change to true when you want API products

const Men = () => {
  const [products, setProducts] = useState([]);

  // Static fallback data (your original shoes)
  const staticShoes = [
    { img: "shoe1.png", title: "Nike High Dunk", price: "₹ 19,999" },
    { img: "shoe2.png", title: "Nike Downshifter", price: "₹ 7,499" },
    { img: "shoe3.png", title: "Nike Air Force", price: "₹ 8,499" },
    { img: "shoe4.png", title: "Nike Air Structure 26", price: "₹ 10,999" },
    { img: "shoe5.jpeg", title: "Nike Dunk High", price: "₹ 11,499" },
    { img: "shoe6.png", title: "Nike Zoom Haskbark Pro", price: "₹ 11,499" },
  ];

  useEffect(() => {
    if (!USE_API) {
      setProducts(staticShoes);
      return;
    }

    // Optional API mode (FakeStore)
    const fetchMenProducts = async () => {
      try {
        const res = await fetch(
          "https://fakestoreapi.com/products/category/men's clothing"
        );
        const data = await res.json();

        // Map API data to your card UI
        const mapped = data.map((item) => ({
          img: item.image,
          title: item.title,
          price: `₹ ${item.price}`,
          isApi: true,
        }));

        setProducts(mapped);
      } catch (err) {
        console.error("API failed, using static products");
        setProducts(staticShoes);
      }
    };

    fetchMenProducts();
  }, []);

  return (
    <>
      {/* MEN HERO SPLIT BANNER */}
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

      {/* MEN PRODUCTS SECTION */}
      <section id="men-footwear" className="men container">
        <div className="men-header">
          <h1>Men’s Footwear</h1>

          <div className="men-actions">
            <span>Hide Filters</span>
            <span>Sort By</span>
          </div>
        </div>

        <p className="men-subtext">
          Performance footwear built for everyday grind
        </p>

        <div className="men-grid">
          {products.map((shoe, index) => (
            <div className="men-card" key={index}>
              <img
                src={shoe.isApi ? shoe.img : `/Images/${shoe.img}`}
                alt={shoe.title}
              />
              <h3>{shoe.title}</h3>
              <p>Men’s Shoes</p>
              <strong>{shoe.price}</strong>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Men;
