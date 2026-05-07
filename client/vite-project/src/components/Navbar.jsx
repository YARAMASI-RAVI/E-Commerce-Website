import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const [cartCount, setCartCount] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();

  const isHome = location.pathname === "/";

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(cart.length);
    const u = JSON.parse(localStorage.getItem("user"));
    setUser(u);
  }, [location]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/";
  };

  const navBg = isHome
    ? scrolled
      ? "rgba(10,8,6,0.97)"
      : "transparent"
    : "rgba(10,8,6,0.97)";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=Montserrat:wght@300;400;500;600&display=swap');

        .navbar {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 1000;
          padding: 0 60px;
          height: 72px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: background 0.5s ease, box-shadow 0.4s;
          background: ${navBg};
          box-shadow: ${scrolled || !isHome ? "0 1px 0 rgba(200,169,126,0.15)" : "none"};
        }

        .nav-logo {
          font-family: 'Cormorant Garamond', serif;
          font-size: 26px;
          font-weight: 600;
          color: #c8a97e;
          letter-spacing: 3px;
          text-decoration: none;
          text-transform: uppercase;
        }

        .nav-logo span {
          color: #fff;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 38px;
          list-style: none;
        }

        .nav-links a {
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.75);
          text-decoration: none;
          transition: color 0.3s;
          position: relative;
          padding-bottom: 4px;
        }

        .nav-links a::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 0; height: 1px;
          background: #c8a97e;
          transition: width 0.3s ease;
        }

        .nav-links a:hover { color: #c8a97e; }
        .nav-links a:hover::after { width: 100%; }

        .nav-right {
          display: flex;
          align-items: center;
          gap: 22px;
        }

        .cart-btn {
          position: relative;
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.8);
          text-decoration: none;
          padding: 8px 20px;
          border: 1px solid rgba(200,169,126,0.4);
          transition: all 0.3s;
        }

        .cart-btn:hover {
          background: #c8a97e;
          color: #000;
          border-color: #c8a97e;
        }

        .cart-badge {
          position: absolute;
          top: -7px; right: -7px;
          width: 17px; height: 17px;
          border-radius: 50%;
          background: #c8a97e;
          color: #000;
          font-size: 10px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .logout-btn {
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.5);
          background: none;
          border: none;
          cursor: pointer;
          transition: color 0.3s;
        }
        .logout-btn:hover { color: #c8a97e; }

        @media (max-width: 768px) {
          .navbar { padding: 0 20px; }
          .nav-links { display: none; }
        }
      `}</style>

      <nav className="navbar">
        <Link to="/" className="nav-logo">Shop<span>Pro</span></Link>

        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/products">Collection</Link></li>
          {user?.isAdmin && <li><Link to="/admin">Admin</Link></li>}
        </ul>

        <div className="nav-right">
          {user ? (
            <>
              <span style={{ fontFamily: 'Montserrat', fontSize: 11, color: 'rgba(255,255,255,0.5)', letterSpacing: 1 }}>
                {user.name}
              </span>
              <button className="logout-btn" onClick={logout}>Logout</button>
            </>
          ) : (
            <Link to="/login" style={{ fontFamily: 'Montserrat', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>
              Login
            </Link>
          )}
          <Link to="/cart" className="cart-btn">
            Bag
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
        </div>
      </nav>
    </>
  );
}

export default Navbar;