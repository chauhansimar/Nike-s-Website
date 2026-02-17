import "../styles/Women.css";

const Women = ({ onSelectProduct }) => {
  const womenShoes = [
    { id: "w1", img: "women-shoe1.jpeg", title: "Nike Air Max 95 Big Bubble", price: "₹ 19,499" },
    { id: "w2", img: "women-shoe2.jpeg", title: "Nike Vomero 18", price: "₹ 18,999" },
    { id: "w3", img: "women-shoe3.jpeg", title: "Nike Precision 7", price: "₹ 17,499" },
    { id: "w4", img: "women-shoe4.jpeg", title: "Nike Jordan Heir Series PF", price: "₹ 10,999" },
    { id: "w5", img: "women-shoe5.jpeg", title: "Nike Cortez Leather", price: "₹ 11,299" },
    { id: "w6", img: "women-shoe6.jpeg", title: "Nike Air Max Moto", price: "₹ 18,799" },
  ];

  return (
    <>
      {/* WOMEN HERO */}
      <section className="women-hero-split">
        <div className="women-hero-half left">
          <img src="/Images/Women-hero-left.jpg" alt="Women training outdoor" />
        </div>

        <div className="women-hero-half right">
          <img src="/Images/Women-hero-right.jpg" alt="Women studio athletic pose" />
        </div>

        <div className="women-hero-overlay">
          <h1 className="hero-title">UNLEASH YOUR GAME.</h1>
          <p className="hero-subtitle">
            Introducing the new high-performance collection.
          </p>

          <a href="#women-footwear" className="hero-btn">
            Shop Women
          </a>
        </div>
      </section>

      {/* WOMEN PRODUCTS */}
      <section id="women-footwear" className="women container">
        <div className="women-header">
          <h1>Women's Footwear</h1>
        </div>

        <p className="women-subtext">
          Featured shoes for women
        </p>

        <div className="women-grid">
          {womenShoes.map((shoe) => (
            <div
              key={shoe.id}
              className="women-card"
              onClick={() => onSelectProduct(shoe, "Women")}   // ✅ IMPORTANT
              style={{ cursor: "pointer" }}
            >
              <img src={`/Images/${shoe.img}`} alt={shoe.title} />
              <h3>{shoe.title}</h3>
              <p>Women's Shoes</p>
              <strong>{shoe.price}</strong>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Women;
