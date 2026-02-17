import "../styles/Signup.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Validate inside submit only
    if (formData.password.length < 6) {
      setMessage("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Handle non-json safely
      const text = await res.text();
      const data = text ? JSON.parse(text) : {};

      if (res.ok) {
        setMessage("Account created successfully 🎉");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setMessage(data.message || "Signup failed");
      }

    } catch (error) {
      console.error("Signup error:", error);
      setMessage("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={wrapperStyle}>
      <div style={cardStyle}>
        <h2 style={titleStyle}>Become a Nike Member</h2>
        <p style={subTextStyle}>
          Create your account and join us today.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <button type="submit" disabled={loading} style={buttonStyle}>
            {loading ? "Creating..." : "Sign Up"}
          </button>
        </form>

        {message && (
          <p style={{ marginTop: "15px", color: "red" }}>
            {message}
          </p>
        )}

        <p style={{ marginTop: "20px", fontSize: "14px" }}>
          Already a member?{" "}
          <Link to="/login" style={linkStyle}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;

/* ---------------- STYLES ---------------- */

const wrapperStyle = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#000000",
};

const cardStyle = {
  width: "380px",
  padding: "40px",
  backgroundColor: "#fff",
  textAlign: "center",
};

const titleStyle = {
  fontWeight: "600",
  marginBottom: "10px",
};

const subTextStyle = {
  fontSize: "14px",
  marginBottom: "30px",
  color: "#555",
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  border: "1px solid #ddd",
  fontSize: "14px",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  backgroundColor: "black",
  color: "white",
  border: "none",
  fontSize: "14px",
  cursor: "pointer",
};

const linkStyle = {
  textDecoration: "none",
  fontWeight: "500",
  color: "black",
};
