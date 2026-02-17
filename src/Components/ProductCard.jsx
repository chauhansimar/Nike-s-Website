const HeroSection = () => {
  const scrollToFootwear = () => {
    const footwearSection = document.getElementById("men-footwear");
    if (footwearSection) {
      footwearSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToSale = () => {
    const saleSection = document.getElementById("Sale");
    if (saleSection) {
      saleSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="nike-hero">
      <div className="nike-hero-image">
        <img src="/Images/shoe_imag.png" alt="Nike Shoe" />
      </div>

      <div className="nike-hero-content">
        <span className="nike-hero-tag">ATHLETIC INNOVATION</span>

        <h1 className="nike-hero-title">
          ‘ POWER IN EVERY STEP.’
        </h1>

        <div className="nike-hero-buttons">
          {/* SHOP MEN */}
          <button className="nike-btn primary" onClick={scrollToFootwear}>
            Shop Men
          </button>

          {/* VIEW SALE */}
          <button className="nike-btn secondary" onClick={scrollToSale}>
            View Sale
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
