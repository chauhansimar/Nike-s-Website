import React, { useEffect } from "react";
import "../styles/Login.css";

const Login = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

          <form className="login-form">
            <input type="email" placeholder="Email address" required />
            <input type="password" placeholder="Password" required />

            <button type="submit" className="login-btn">
              Login
            </button>
          </form>

          <p className="login-footer">
            Don’t have an account? <span>Sign up</span>
          </p>
        </div>

      </div>
    </section>
  );
};

export default Login;
