import "../styles/Footer.css";
const Footer = () => {
  return (
    <footer className="nike-footer">
      <div className="footer-container">

        {/* LEFT */}
        <div className="footer-brand">
          
          <p>India</p>
        </div>

        {/* LINKS */}
        <div className="footer-links">
          <div>
            <h4>Shop</h4>
            <ul>
              <li>Men</li>
              <li>Women</li>
              <li>Kids</li>
              <li>Footwear</li>
            </ul>
          </div>

          <div>
            <h4>Help</h4>
            <ul>
              <li>Contact Us</li>
              <li>Order Status</li>
              <li>Returns</li>
              <li>FAQs</li>
            </ul>
          </div>

          <div>
            <h4>Company</h4>
            <ul>
              <li>About Nike</li>
              <li>Careers</li>
              <li>News</li>
            </ul>
          </div>
        </div>

      </div>

      {/* BOTTOM */}
      <div className="footer-bottom">
        © 2026 Nike, Inc. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
