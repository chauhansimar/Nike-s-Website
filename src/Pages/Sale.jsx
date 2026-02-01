import React from "react";
import leftImg from "../assets/sale_left.png";
import rightImg from "../assets/sale_right.png";

const Sale = () => {

  const scrollToFootwear = () => {
    const footwearSection = document.getElementById("men-footwear");
    if (footwearSection) {
      footwearSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="sale-section">
      <div className="sale-container">

        {/* LEFT SECTION */}
        <div className="sale-box left">
          <img src={leftImg} alt="Nike Collection" className="sale-bg" />

          <div className="sale-content">
            <h1 className="sale-title">JUST DO IT</h1>
            <p className="sale-subtitle">
            </p>
            <p className="sale-tagline">It’s About to Get Loud</p>

            {/* SHOP → MEN’S FOOTWEAR */}
            <button className="sale-btn" onClick={scrollToFootwear}>
              Shop
            </button>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="sale-box right">
          <img src={rightImg} alt="Nike Astrograbber" className="sale-bg" />

          <div className="sale-content bottom">
            <p className="sale-subtitle">Nike Astrograbber</p>

            {/* SHOP → MEN’S FOOTWEAR */}
            <button className="sale-btn" onClick={scrollToFootwear}>
              Shop
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Sale;
