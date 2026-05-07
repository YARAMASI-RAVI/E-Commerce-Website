import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setError("");
    setLoading(true);

    try {
      const endpoint = isLogin
        ? "http://localhost:5000/api/users/login"
        : "http://localhost:5000/api/users/register";

      const body = isLogin
        ? { email, password }
        : { name, email, password };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong");
        setLoading(false);
        return;
      }

      localStorage.setItem("user", JSON.stringify(data));
      navigate("/");
    } catch (err) {
      setError("Connection error. Is the server running?");
    }

    setLoading(false);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Montserrat:wght@300;400;500;600&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body { background: #0a0806; }

        .login-page {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          background: #0a0806;
        }

        /* LEFT SIDE - VISUAL */
        .login-visual {
          position: relative;
          overflow: hidden;
        }

        .login-visual-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(0.5) sepia(0.2);
        }

        .login-visual-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(10,8,6,0.6), rgba(200,169,126,0.12));
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 60px;
        }

        .visual-logo {
          font-family: 'Cormorant Garamond', serif;
          font-size: 32px;
          font-weight: 600;
          color: #c8a97e;
          letter-spacing: 4px;
          text-transform: uppercase;
          position: absolute;
          top: 48px;
          left: 60px;
        }

        .visual-logo span { color: #fff; }

        .visual-quote {
          font-family: 'Cormorant Garamond', serif;
          font-size: 40px;
          font-weight: 300;
          color: #fff;
          line-height: 1.2;
          font-style: italic;
          margin-bottom: 20px;
        }

        .visual-quote em { color: #c8a97e; font-style: normal; }

        .visual-sub {
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          letter-spacing: 2.5px;
          color: rgba(255,255,255,0.45);
          text-transform: uppercase;
        }

        /* RIGHT SIDE - FORM */
        .login-form-side {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 80px 80px;
          background: #0e0c09;
          border-left: 1px solid rgba(200,169,126,0.1);
        }

        .form-eyebrow {
          font-family: 'Montserrat', sans-serif;
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: #c8a97e;
          margin-bottom: 12px;
        }

        .form-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 48px;
          font-weight: 300;
          color: #fff;
          line-height: 1.1;
          margin-bottom: 8px;
        }

        .form-title em { font-style: italic; color: #c8a97e; }

        .form-sub {
          font-family: 'Montserrat', sans-serif;
          font-size: 12px;
          font-weight: 300;
          color: rgba(255,255,255,0.35);
          margin-bottom: 48px;
          letter-spacing: 0.5px;
        }

        .form-toggle {
          display: flex;
          gap: 0;
          margin-bottom: 36px;
          border: 1px solid rgba(200,169,126,0.2);
        }

        .toggle-btn {
          flex: 1;
          padding: 12px;
          background: none;
          border: none;
          font-family: 'Montserrat', sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          cursor: pointer;
          transition: all 0.3s;
        }

        .toggle-btn.active {
          background: #c8a97e;
          color: #0a0806;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-label {
          display: block;
          font-family: 'Montserrat', sans-serif;
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
          margin-bottom: 10px;
        }

        .form-input {
          width: 100%;
          padding: 14px 18px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(200,169,126,0.2);
          border-radius: 0;
          color: #fff;
          font-family: 'Montserrat', sans-serif;
          font-size: 13px;
          outline: none;
          transition: border-color 0.3s, background 0.3s;
        }

        .form-input:focus {
          border-color: rgba(200,169,126,0.6);
          background: rgba(200,169,126,0.04);
        }

        .form-input::placeholder {
          color: rgba(255,255,255,0.18);
        }

        .form-error {
          padding: 12px 16px;
          background: rgba(220,60,60,0.1);
          border: 1px solid rgba(220,60,60,0.25);
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          color: rgba(220,120,120,0.9);
          margin-bottom: 20px;
          letter-spacing: 0.5px;
        }

        .submit-btn {
          width: 100%;
          padding: 17px;
          background: #c8a97e;
          border: none;
          color: #0a0806;
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s;
          margin-top: 8px;
        }

        .submit-btn:hover:not(:disabled) {
          background: #e8c99e;
          box-shadow: 0 12px 40px rgba(200,169,126,0.3);
        }

        .submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .spinner {
          display: inline-block;
          width: 13px; height: 13px;
          border: 2px solid rgba(10,8,6,0.3);
          border-top-color: #0a0806;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          margin-right: 8px;
          vertical-align: middle;
        }

        @keyframes spin { to { transform: rotate(360deg); } }

        .form-footer {
          margin-top: 32px;
          text-align: center;
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          color: rgba(255,255,255,0.25);
          letter-spacing: 0.5px;
        }

        .form-footer a {
          color: #c8a97e;
          text-decoration: none;
          font-weight: 500;
        }

        .divider {
          display: flex;
          align-items: center;
          gap: 16px;
          margin: 28px 0;
        }

        .divider-line {
          flex: 1;
          height: 1px;
          background: rgba(255,255,255,0.08);
        }

        .divider-text {
          font-family: 'Montserrat', sans-serif;
          font-size: 10px;
          color: rgba(255,255,255,0.2);
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .back-home {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: 'Montserrat', sans-serif;
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.25);
          text-decoration: none;
          transition: color 0.3s;
          margin-bottom: 48px;
        }

        .back-home:hover { color: #c8a97e; }

        @media (max-width: 900px) {
          .login-page { grid-template-columns: 1fr; }
          .login-visual { display: none; }
          .login-form-side { padding: 60px 32px; }
        }
      `}</style>

      <div className="login-page">
        {/* LEFT VISUAL */}
        <div className="login-visual">
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=900&q=80"
            alt=""
            className="login-visual-img"
          />
          <div className="login-visual-overlay">
            <Link to="/" className="visual-logo">Shop<span>Pro</span></Link>
            <blockquote className="visual-quote">
              Your style,<br /><em>your story</em>
            </blockquote>
            <p className="visual-sub">Curated for the discerning few</p>
          </div>
        </div>

        {/* RIGHT FORM */}
        <motion.div
          className="login-form-side"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Link to="/" className="back-home">← Back to Home</Link>

          <div className="form-eyebrow">Welcome to ShopPro</div>
          <h1 className="form-title">
            {isLogin ? <>Sign <em>In</em></> : <>Create <em>Account</em></>}
          </h1>
          <p className="form-sub">
            {isLogin ? "Access your personal shopping experience" : "Join thousands of happy customers"}
          </p>

          {/* TOGGLE */}
          <div className="form-toggle">
            <button className={`toggle-btn ${isLogin ? "active" : ""}`} onClick={() => setIsLogin(true)}>
              Sign In
            </button>
            <button className={`toggle-btn ${!isLogin ? "active" : ""}`} onClick={() => setIsLogin(false)}>
              Register
            </button>
          </div>

          {/* ERROR */}
          {error && <div className="form-error">⚠ {error}</div>}

          {/* FIELDS */}
          {!isLogin && (
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="Your full name"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-input"
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSubmit()}
            />
          </div>

          <button className="submit-btn" onClick={handleSubmit} disabled={loading}>
            {loading ? (
              <><span className="spinner" />{isLogin ? "Signing In..." : "Creating Account..."}</>
            ) : (
              isLogin ? "Sign In" : "Create Account"
            )}
          </button>

          <div className="divider">
            <div className="divider-line" />
            <span className="divider-text">or</span>
            <div className="divider-line" />
          </div>

          <div className="form-footer">
            {isLogin ? (
              <>Don't have an account?{" "}
                <a href="#" onClick={() => setIsLogin(false)}>Create one</a>
              </>
            ) : (
              <>Already a member?{" "}
                <a href="#" onClick={() => setIsLogin(true)}>Sign in</a>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </>
  );
}

export default Login;