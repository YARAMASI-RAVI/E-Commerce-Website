import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { motion, AnimatePresence } from "framer-motion";

function Cart() {
  const [cart, setCart] = useState([]);
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart")) || []);
  }, []);

  const removeItem = (index) => {
    const updated = [...cart];
    updated.splice(index, 1);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
  const discount = couponApplied ? Math.round(subtotal * 0.1) : 0;
  const shipping = subtotal > 999 ? 0 : 99;
  const total = subtotal - discount + shipping;

  const applyCoupon = () => {
    if (coupon.toUpperCase() === "SHOPPRO10") {
      setCouponApplied(true);
    } else {
      alert("Invalid coupon code");
    }
  };

  // Razorpay Payment Handler
  const handlePayment = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || !user.token) {
      alert("Please login to place your order");
      navigate("/login");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty");
      return;
    }

    setPaymentLoading(true);

    try {
      // Step 1: Create Razorpay order on backend
      const orderRes = await fetch("http://localhost:5000/api/orders/create-razorpay-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ amount: total }),
      });

      const orderData = await orderRes.json();

      if (!orderRes.ok) {
        alert(orderData.message || "Failed to initiate payment");
        setPaymentLoading(false);
        return;
      }

      // Step 2: Open Razorpay checkout
      const options = {
        key: "YOUR_RAZORPAY_KEY_ID", // Replace with your Razorpay Key ID
        amount: orderData.amount,
        currency: "INR",
        name: "ShopPro",
        description: `Order of ${cart.length} item(s)`,
        order_id: orderData.id,
        handler: async function (response) {
          // Step 3: Verify payment on backend
          const verifyRes = await fetch("http://localhost:5000/api/orders/verify-payment", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              items: cart,
              total: total,
            }),
          });

          const verifyData = await verifyRes.json();

          if (verifyRes.ok) {
            localStorage.removeItem("cart");
            setCart([]);
            navigate("/order-success");
          } else {
            alert(verifyData.message || "Payment verification failed");
          }
        },
        prefill: {
          name: user.name || "",
          email: user.email || "",
        },
        theme: {
          color: "#c8a97e",
        },
        modal: {
          ondismiss: function () {
            setPaymentLoading(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
      setPaymentLoading(false);

    } catch (error) {
      console.error(error);
      alert("Payment failed. Please try again.");
      setPaymentLoading(false);
    }
  };

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=Montserrat:wght@300;400;500;600&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #0a0806; }

        .cart-page {
          min-height: 100vh;
          background: #0a0806;
          padding-top: 72px;
        }

        .cart-header {
          padding: 60px 80px 40px;
          border-bottom: 1px solid rgba(200,169,126,0.12);
        }

        .page-eyebrow {
          font-family: 'Montserrat', sans-serif;
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: #c8a97e;
          margin-bottom: 10px;
        }

        .page-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(36px, 5vw, 60px);
          font-weight: 300;
          color: #fff;
        }

        .page-title em { font-style: italic; color: #c8a97e; }

        .cart-layout {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 40px;
          padding: 48px 80px;
          align-items: start;
        }

        /* CART ITEMS */
        .cart-items {}

        .cart-item {
          display: grid;
          grid-template-columns: 100px 1fr auto;
          gap: 24px;
          align-items: center;
          padding: 24px;
          background: #14120f;
          border: 1px solid rgba(255,255,255,0.05);
          margin-bottom: 16px;
          transition: border-color 0.3s;
        }

        .cart-item:hover { border-color: rgba(200,169,126,0.2); }

        .cart-item-img {
          width: 100px;
          height: 100px;
          object-fit: cover;
          filter: brightness(0.9);
        }

        .cart-item-details {}

        .item-category {
          font-family: 'Montserrat', sans-serif;
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: rgba(200,169,126,0.6);
          margin-bottom: 4px;
        }

        .item-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px;
          font-weight: 400;
          color: #fff;
          margin-bottom: 8px;
        }

        .item-price {
          font-family: 'Cormorant Garamond', serif;
          font-size: 20px;
          font-weight: 600;
          color: #c8a97e;
        }

        .remove-btn {
          background: none;
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.3);
          width: 36px; height: 36px;
          cursor: pointer;
          font-size: 18px;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .remove-btn:hover {
          border-color: rgba(220,60,60,0.5);
          color: rgba(220,60,60,0.7);
          background: rgba(220,60,60,0.05);
        }

        .empty-cart {
          text-align: center;
          padding: 100px 20px;
        }

        .empty-icon {
          font-size: 64px;
          margin-bottom: 24px;
          opacity: 0.2;
        }

        .empty-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 36px;
          color: rgba(255,255,255,0.3);
          font-style: italic;
          margin-bottom: 16px;
        }

        .empty-sub {
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          letter-spacing: 2px;
          color: rgba(255,255,255,0.2);
          text-transform: uppercase;
          margin-bottom: 32px;
        }

        /* ORDER SUMMARY */
        .order-summary {
          background: #14120f;
          border: 1px solid rgba(200,169,126,0.15);
          padding: 36px;
          position: sticky;
          top: 90px;
        }

        .summary-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 26px;
          font-weight: 300;
          color: #fff;
          margin-bottom: 28px;
          padding-bottom: 20px;
          border-bottom: 1px solid rgba(200,169,126,0.15);
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 14px;
        }

        .summary-label {
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          color: rgba(255,255,255,0.45);
          letter-spacing: 1px;
        }

        .summary-value {
          font-family: 'Montserrat', sans-serif;
          font-size: 13px;
          color: rgba(255,255,255,0.8);
          font-weight: 500;
        }

        .summary-value.free { color: #5cb85c; }
        .summary-value.discount { color: #c8a97e; }

        .summary-divider {
          height: 1px;
          background: rgba(200,169,126,0.12);
          margin: 20px 0;
        }

        .summary-total-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 28px;
        }

        .total-label {
          font-family: 'Cormorant Garamond', serif;
          font-size: 20px;
          color: #fff;
        }

        .total-value {
          font-family: 'Cormorant Garamond', serif;
          font-size: 32px;
          font-weight: 600;
          color: #c8a97e;
        }

        /* COUPON */
        .coupon-wrap {
          display: flex;
          gap: 0;
          margin-bottom: 24px;
        }

        .coupon-input {
          flex: 1;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(200,169,126,0.2);
          border-right: none;
          padding: 12px 16px;
          color: #fff;
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          outline: none;
          letter-spacing: 2px;
          text-transform: uppercase;
          transition: border-color 0.3s;
        }

        .coupon-input::placeholder {
          color: rgba(255,255,255,0.2);
          font-size: 10px;
        }

        .coupon-input:focus { border-color: rgba(200,169,126,0.5); }

        .coupon-btn {
          padding: 12px 16px;
          background: rgba(200,169,126,0.15);
          border: 1px solid rgba(200,169,126,0.35);
          color: #c8a97e;
          font-family: 'Montserrat', sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s;
          white-space: nowrap;
        }

        .coupon-btn:hover { background: #c8a97e; color: #0a0806; }

        .coupon-success {
          font-family: 'Montserrat', sans-serif;
          font-size: 10px;
          color: #5cb85c;
          letter-spacing: 1px;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        /* PAY BUTTON */
        .pay-btn {
          width: 100%;
          padding: 18px;
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
          position: relative;
          overflow: hidden;
        }

        .pay-btn:hover:not(:disabled) {
          background: #e8c99e;
          box-shadow: 0 12px 40px rgba(200,169,126,0.35);
        }

        .pay-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .pay-btn-spinner {
          display: inline-block;
          width: 14px; height: 14px;
          border: 2px solid rgba(10,8,6,0.3);
          border-top-color: #0a0806;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          margin-right: 8px;
          vertical-align: middle;
        }

        @keyframes spin { to { transform: rotate(360deg); } }

        .secure-note {
          margin-top: 16px;
          text-align: center;
          font-family: 'Montserrat', sans-serif;
          font-size: 10px;
          color: rgba(255,255,255,0.25);
          letter-spacing: 1px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }

        .continue-link {
          display: block;
          text-align: center;
          margin-top: 14px;
          font-family: 'Montserrat', sans-serif;
          font-size: 10px;
          color: rgba(255,255,255,0.3);
          text-decoration: none;
          letter-spacing: 1.5px;
          transition: color 0.3s;
        }

        .continue-link:hover { color: #c8a97e; }

        .shop-btn {
          display: inline-block;
          padding: 14px 36px;
          border: 1px solid rgba(200,169,126,0.4);
          color: rgba(255,255,255,0.7);
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          text-decoration: none;
          transition: all 0.3s;
        }

        .shop-btn:hover {
          background: #c8a97e;
          color: #0a0806;
          border-color: #c8a97e;
        }

        @media (max-width: 1024px) {
          .cart-layout { grid-template-columns: 1fr; padding: 32px 24px; }
          .cart-header { padding: 40px 24px 32px; }
          .order-summary { position: relative; top: 0; }
        }

        @media (max-width: 640px) {
          .cart-item { grid-template-columns: 80px 1fr; }
          .remove-btn { grid-column: 2; justify-self: start; }
        }
      `}</style>

      <div className="cart-page">
        <Navbar />

        <div className="cart-header">
          <div className="page-eyebrow">Your Selection</div>
          <h1 className="page-title">Shopping <em>Bag</em></h1>
        </div>

        <div className="cart-layout">
          {/* ITEMS */}
          <div className="cart-items">
            <AnimatePresence>
              {cart.length === 0 ? (
                <motion.div
                  className="empty-cart"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="empty-icon">🛍</div>
                  <div className="empty-title">Your bag is empty</div>
                  <p className="empty-sub">Discover something beautiful</p>
                  <Link to="/products" className="shop-btn">Explore Collection</Link>
                </motion.div>
              ) : (
                cart.map((item, i) => (
                  <motion.div
                    key={i}
                    className="cart-item"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20, height: 0, marginBottom: 0, padding: 0 }}
                    transition={{ delay: i * 0.05 }}
                    layout
                  >
                    <img src={item.image} alt={item.name} className="cart-item-img" />
                    <div className="cart-item-details">
                      <div className="item-category">{item.category || "Product"}</div>
                      <div className="item-name">{item.name}</div>
                      <div className="item-price">₹{item.price.toLocaleString()}</div>
                    </div>
                    <button className="remove-btn" onClick={() => removeItem(i)} title="Remove">×</button>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>

          {/* ORDER SUMMARY */}
          <div className="order-summary">
            <div className="summary-title">Order Summary</div>

            <div className="summary-row">
              <span className="summary-label">Subtotal ({cart.length} items)</span>
              <span className="summary-value">₹{subtotal.toLocaleString()}</span>
            </div>

            <div className="summary-row">
              <span className="summary-label">Shipping</span>
              <span className={`summary-value ${shipping === 0 ? "free" : ""}`}>
                {shipping === 0 ? "FREE" : `₹${shipping}`}
              </span>
            </div>

            {couponApplied && (
              <div className="summary-row">
                <span className="summary-label">Coupon Discount</span>
                <span className="summary-value discount">-₹{discount.toLocaleString()}</span>
              </div>
            )}

            <div className="summary-divider" />

            <div className="summary-total-row">
              <span className="total-label">Total</span>
              <span className="total-value">₹{total.toLocaleString()}</span>
            </div>

            {/* COUPON */}
            {!couponApplied && (
              <div className="coupon-wrap">
                <input
                  type="text"
                  className="coupon-input"
                  placeholder="Coupon code"
                  value={coupon}
                  onChange={e => setCoupon(e.target.value)}
                />
                <button className="coupon-btn" onClick={applyCoupon}>Apply</button>
              </div>
            )}

            {couponApplied && (
              <div className="coupon-success">
                ✓ Coupon SHOPPRO10 applied — 10% off
              </div>
            )}

            {!couponApplied && (
              <p style={{ fontFamily: 'Montserrat', fontSize: 10, color: 'rgba(255,255,255,0.2)', letterSpacing: 1, marginBottom: 20 }}>
                Try <strong style={{ color: 'rgba(200,169,126,0.5)' }}>SHOPPRO10</strong> for 10% off
              </p>
            )}

            <button
              className="pay-btn"
              onClick={handlePayment}
              disabled={paymentLoading || cart.length === 0}
            >
              {paymentLoading ? (
                <><span className="pay-btn-spinner" />Processing...</>
              ) : (
                `Pay ₹${total.toLocaleString()} Securely`
              )}
            </button>

            <div className="secure-note">
              🔒 &nbsp;Secured by Razorpay · 256-bit SSL
            </div>

            <Link to="/products" className="continue-link">← Continue Shopping</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;