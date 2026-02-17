import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.type === "email" ? "email" : "password"]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setMessage("");

      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        navigate("/");
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="login-section">
      <div className="login-container">

        {/* LEFT SIDE */}
        <div className="login-left">
          <h1>JOIN NIKE MEMBERSHIP.</h1>
          <p>Log in to access exclusive footwear and offers.</p>
        </div>

        {/* RIGHT SIDE */}
        <div className="login-right">
          <h2>Welcome Back</h2>

          <form className="login-form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email address"
              required
              onChange={handleChange}
            />

            <input
              type="password"
              placeholder="Password"
              required
              onChange={handleChange}
            />

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {message && (
            <p style={{ color: "red", marginTop: "10px" }}>
              {message}
            </p>
          )}

          <p className="login-footer">
            Don’t have an account?{" "}
            <Link to="/signup" style={{ fontWeight: "bold" }}>
              Sign up
            </Link>
          </p>

        </div>

      </div>
    </section>
  );
};

export default Login;
