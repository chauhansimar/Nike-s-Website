import { useNavigate } from "react-router-dom";
import "../styles/Footer.css";

const Footer = () => {
  const navigate = useNavigate();

  const scrollToSection = (id) => {
    navigate("/"); // go to homepage first

    setTimeout(() => {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }, 200);
  };

  return (
    <footer className="nike-footer">
      <div className="footer-container">

        {/* LEFT */}
        <div className="footer-brand">
          <p>India</p>
        </div>

        {/* LINKS */}
        <div className="footer-links">

          {/* SHOP */}
          <div>
            <h4>Shop</h4>
            <ul>
              <li onClick={() => scrollToSection("Men")}>Men</li>
              <li onClick={() => scrollToSection("Women")}>Women</li>
              <li onClick={() => scrollToSection("Kids")}>Kids</li>
              <li onClick={() => scrollToSection("Sale")}>Footwear</li>
            </ul>
          </div>

          {/* HELP */}
          <div>
            <h4>Help</h4>
            <ul>
              <li onClick={() => scrollToSection("Contact")}>Contact Us</li>
              <li onClick={() => navigate("/orders")}>Order Status</li>
              <li onClick={() => navigate("/returns")}>Returns</li>
              <li onClick={() => navigate("/faq")}>FAQs</li>
            </ul>
          </div>

          {/* COMPANY */}
          <div>
            <h4>Company</h4>
            <ul>
              <li onClick={() => navigate("/about")}>About Nike</li>
              <li onClick={() => navigate("/careers")}>Careers</li>
              <li onClick={() => navigate("/news")}>News</li>
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
