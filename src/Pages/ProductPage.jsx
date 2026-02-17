import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import "../styles/ProductPage.css";





const ProductPage = ({ product, goBack }) => {
  const { addToCart } = useContext(CartContext);
  const [selectedSize, setSelectedSize] = useState(null);

  if (!product) return null;

  const sizes = [
    "UK 6", 
    "UK 7", 
    "UK 8",
    "UK 9", "UK 10",
  ];

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }

    addToCart({
      ...product,
      selectedSize,
    });

    alert("Added to Bag ✅");
  };

  return (
    <div className="pdp">

      {/* 🔙 BACK BUTTON */}
      <button className="pdp-back-btn" onClick={goBack}>
        ← Back
      </button>

      {/* LEFT SIDE – PRODUCT IMAGE */}
      <div className="pdp-images">
        <img
          src={product.isApi ? product.img : `/Images/${product.img}`}
          alt={product.title}
          className="pdp-main-img"
        />
      </div>

      {/* RIGHT SIDE – DETAILS */}
      <div className="pdp-details">

        <span className="brand">Nike</span>

        <h1 className="title">{product.title}</h1>

        <div className="price-wrapper">
          <p className="price">{product.price}</p>
          <p className="tax">Inclusive of all taxes</p>
        </div>

        <div className="divider"></div>

        {/* SIZE SECTION */}
        <div className="size-section">
          <div className="size-header">
            <span>Select Size</span>
            <span className="size-guide">Size Guide</span>
          </div>

          <div className="size-grid">
            {sizes.map((size) => (
              <button
                key={size}
                className={`size-btn ${selectedSize === size ? "active" : ""}`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* ADD TO CART */}
        <button className="add-to-cart" onClick={handleAddToCart}>
          Add to Bag
        </button>

        {/* DESCRIPTION */}
        <div className="product-description">
   
         
        </div>

      </div>
    </div>
  );
};

export default ProductPage;
