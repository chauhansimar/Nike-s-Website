import "../styles/Contact.css";
const Contact = () => {
  return (
    <section id="Contact" className="contact container">
      <h1>Contact Us</h1>
      <p>Feel free to reach out to us.</p>

      <form className="contact-form">
        <input type="text" placeholder="Your Name" />
        <input type="email" placeholder="Your Email" />
        <textarea placeholder="Your Message" rows="5"></textarea>
        <button>Send Message</button>
      </form>
    </section>
  );
};

export default Contact;
