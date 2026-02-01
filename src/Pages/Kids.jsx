import "../styles/Kids.css";


const Kids = () => {
  return (
    <>
      {/* KIDS HERO SPLIT BANNER */}
      <section className="kids-hero-split">
        {/* LEFT IMAGE – OUTDOOR TRACK */}
        <div className="kids-hero-half left">
          <img
            src="/Images/kids-track.jpeg"
            alt="Kids running on track"
          />
        </div>

        {/* RIGHT IMAGE – STUDIO ATHLETIC */}
        <div className="kids-hero-half right">
          <img
            src="/Images/kids-studio.jpeg"
            alt="Kids studio athletic pose"
          />
        </div>

        {/* TEXT OVERLAY */}
        <div className="kids-hero-content">
          <h1 className="kids-hero-title">PLAY WITHOUT LIMITS.</h1>
          <p className="kids-hero-subtitle">
            Built for speed, comfort, and unstoppable energy.
          </p>

          <a href="#kids-footwear" className="kids-hero-btn">
            Shop Kids
          </a>
        </div>
      </section>

      {/* KIDS PRODUCTS SECTION */}
      <section id="kids-footwear" className="kids container">
        <div className="kids-header">
          <h1>Kids’ Footwear</h1>

          <div className="kids-actions">
          </div>
        </div>

        <p className="kids-subtext">
          Performance footwear for growing champions
        </p>

        <div className="kids-grid">
          {[
            { img: "kids-shoe1.jpeg", title: "Nike Cosmic Runner", price: "₹ 14,499" },
            { img: "kids-shoe2.jpeg", title: "Nike Runner 5", price: "₹ 13,999" },
            { img: "kids-shoe3.jpeg", title: "Nike Stellar 5", price: "₹ 14,299" },
            { img: "kids-shoe4.jpeg", title: "Nike Flex Runner 5", price: "₹ 14,799" },
            { img: "kids-shoe5.jpeg", title: "Nike Vomero 18", price: "₹ 14,799" },
            { img: "kids-shoe6.jpeg", title: "Nike Venom 5", price: "₹ 14,799" },
          ].map((shoe, index) => (
            <div className="kids-card" key={index}>
              <img src={`/Images/${shoe.img}`} alt={shoe.title} />
              <h3>{shoe.title}</h3>
              <p>Kids’ Shoes</p>
              <strong>{shoe.price}</strong>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Kids;
