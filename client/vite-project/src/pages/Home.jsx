import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const collections = [
  {
    name: "Headphones",
    sub: "Premium Audio",
    price: "From ₹2,999",
    img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80",
    tag: "Best Seller"
  },
  {
    name: "Footwear",
    sub: "Street & Sport",
    price: "From ₹1,499",
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
    tag: "New Arrival"
  },
  {
    name: "Laptops",
    sub: "Pro Computing",
    price: "From ₹49,999",
    img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=80",
    tag: "Featured"
  },
  {
    name: "Watches",
    sub: "Smart & Classic",
    price: "From ₹3,999",
    img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
    tag: "Trending"
  }
];

const marqueeItems = ["Free Shipping Over ₹999", "Premium Quality", "30-Day Returns", "Authentic Products", "24/7 Support", "Exclusive Collections"];

export default function Home() {
  const heroRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState(0);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scaleHero = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  useEffect(() => {
    const t = setInterval(() => setActiveCategory(p => (p + 1) % collections.length), 3500);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Montserrat:wght@300;400;500;600&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body { background: #0a0806; overflow-x: hidden; }

        /* ─── MARQUEE ─── */
        .marquee-wrap {
          position: fixed;
          top: 0; left: 0; right: 0;
          height: 28px;
          background: #c8a97e;
          z-index: 1100;
          overflow: hidden;
          display: flex;
          align-items: center;
        }

        .marquee-track {
          display: flex;
          gap: 60px;
          white-space: nowrap;
          animation: marquee 28s linear infinite;
        }

        .marquee-track span {
          font-family: 'Montserrat', sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #1a1208;
        }

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* ─── HERO ─── */
        .hero-section {
          height: 100vh;
          overflow: hidden;
          position: relative;
          padding-top: 28px;
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(10,8,6,0.3) 0%,
            rgba(10,8,6,0.1) 40%,
            rgba(10,8,6,0.7) 80%,
            rgba(10,8,6,1) 100%
          );
          z-index: 1;
        }

        .hero-content {
          position: absolute;
          inset: 0;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 0 20px;
          padding-top: 28px;
        }

        .hero-eyebrow {
          font-family: 'Montserrat', sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 6px;
          text-transform: uppercase;
          color: #c8a97e;
          margin-bottom: 28px;
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .hero-eyebrow::before,
        .hero-eyebrow::after {
          content: '';
          width: 40px;
          height: 1px;
          background: #c8a97e;
        }

        .hero-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(56px, 9vw, 120px);
          font-weight: 300;
          line-height: 0.9;
          color: #fff;
          letter-spacing: -1px;
        }

        .hero-title em {
          font-style: italic;
          color: #c8a97e;
        }

        .hero-sub {
          font-family: 'Montserrat', sans-serif;
          font-size: 13px;
          font-weight: 300;
          letter-spacing: 3px;
          color: rgba(255,255,255,0.6);
          margin-top: 28px;
          text-transform: uppercase;
        }

        .hero-cta-group {
          margin-top: 50px;
          display: flex;
          gap: 16px;
          align-items: center;
        }

        .btn-primary {
          display: inline-block;
          padding: 16px 48px;
          background: #c8a97e;
          color: #0a0806;
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 3px;
          text-transform: uppercase;
          text-decoration: none;
          transition: all 0.3s;
          clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
        }

        .btn-primary:hover {
          background: #e8c99e;
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(200,169,126,0.35);
        }

        .btn-ghost {
          display: inline-block;
          padding: 15px 40px;
          border: 1px solid rgba(255,255,255,0.3);
          color: rgba(255,255,255,0.8);
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 3px;
          text-transform: uppercase;
          text-decoration: none;
          transition: all 0.3s;
        }

        .btn-ghost:hover {
          border-color: #c8a97e;
          color: #c8a97e;
        }

        /* ─── SCROLL INDICATOR ─── */
        .scroll-indicator {
          position: absolute;
          bottom: 48px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 3;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }

        .scroll-line {
          width: 1px;
          height: 60px;
          background: linear-gradient(to bottom, rgba(200,169,126,0.8), transparent);
          animation: scrollPulse 2s ease-in-out infinite;
        }

        .scroll-text {
          font-family: 'Montserrat', sans-serif;
          font-size: 9px;
          letter-spacing: 3px;
          color: rgba(255,255,255,0.4);
          text-transform: uppercase;
          writing-mode: vertical-rl;
        }

        @keyframes scrollPulse {
          0%, 100% { opacity: 0.4; transform: scaleY(1); }
          50% { opacity: 1; transform: scaleY(1.15); }
        }

        /* ─── STATS BAR ─── */
        .stats-bar {
          background: #12100d;
          border-top: 1px solid rgba(200,169,126,0.15);
          border-bottom: 1px solid rgba(200,169,126,0.15);
          padding: 32px 80px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 40px;
          text-align: center;
        }

        .stat-item {}

        .stat-number {
          font-family: 'Cormorant Garamond', serif;
          font-size: 42px;
          font-weight: 300;
          color: #c8a97e;
          line-height: 1;
        }

        .stat-label {
          font-family: 'Montserrat', sans-serif;
          font-size: 9px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
          margin-top: 6px;
        }

        /* ─── COLLECTIONS ─── */
        .collections-section {
          padding: 100px 80px;
          background: #0a0806;
        }

        .section-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 60px;
        }

        .section-eyebrow {
          font-family: 'Montserrat', sans-serif;
          font-size: 9px;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: #c8a97e;
          margin-bottom: 12px;
        }

        .section-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(36px, 4vw, 60px);
          font-weight: 300;
          color: #fff;
          line-height: 1.1;
        }

        .section-title em { font-style: italic; color: #c8a97e; }

        .view-all {
          font-family: 'Montserrat', sans-serif;
          font-size: 10px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.5);
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 10px;
          transition: color 0.3s;
          padding-bottom: 4px;
          border-bottom: 1px solid rgba(255,255,255,0.2);
        }

        .view-all:hover { color: #c8a97e; border-color: #c8a97e; }

        .collections-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        .collection-card {
          position: relative;
          overflow: hidden;
          cursor: pointer;
          background: #141210;
        }

        .collection-card:first-child {
          grid-row: span 2;
        }

        .collection-img-wrap {
          overflow: hidden;
          aspect-ratio: 3/4;
        }

        .collection-card:first-child .collection-img-wrap {
          height: 100%;
          aspect-ratio: unset;
        }

        .collection-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          filter: brightness(0.75);
        }

        .collection-card:hover .collection-img {
          transform: scale(1.08);
          filter: brightness(0.9);
        }

        .collection-info {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          padding: 28px 24px;
          background: linear-gradient(to top, rgba(10,8,6,0.95), transparent);
        }

        .collection-tag {
          display: inline-block;
          font-family: 'Montserrat', sans-serif;
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: #c8a97e;
          border: 1px solid rgba(200,169,126,0.4);
          padding: 3px 10px;
          margin-bottom: 10px;
        }

        .collection-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 26px;
          font-weight: 400;
          color: #fff;
          line-height: 1.1;
        }

        .collection-sub {
          font-family: 'Montserrat', sans-serif;
          font-size: 10px;
          letter-spacing: 2px;
          color: rgba(255,255,255,0.5);
          text-transform: uppercase;
          margin-top: 4px;
        }

        .collection-price {
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          color: rgba(255,255,255,0.7);
          margin-top: 8px;
        }

        /* ─── BRAND STORY ─── */
        .brand-section {
          padding: 120px 80px;
          background: #0e0c09;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 100px;
          align-items: center;
        }

        .brand-content {}

        .brand-quote {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(32px, 4vw, 56px);
          font-weight: 300;
          color: #fff;
          line-height: 1.25;
          font-style: italic;
        }

        .brand-quote span { color: #c8a97e; }

        .brand-desc {
          font-family: 'Montserrat', sans-serif;
          font-size: 13px;
          font-weight: 300;
          line-height: 2;
          color: rgba(255,255,255,0.5);
          margin-top: 30px;
        }

        .brand-cta {
          margin-top: 40px;
        }

        .brand-visual {
          position: relative;
        }

        .brand-img-main {
          width: 100%;
          aspect-ratio: 3/4;
          object-fit: cover;
          filter: brightness(0.85) sepia(0.15);
        }

        .brand-accent-box {
          position: absolute;
          bottom: -30px;
          left: -30px;
          width: 180px;
          height: 180px;
          border: 1px solid rgba(200,169,126,0.3);
          z-index: -1;
        }

        .brand-gold-line {
          position: absolute;
          top: 40px;
          right: -20px;
          width: 60px;
          height: 1px;
          background: #c8a97e;
        }

        /* ─── TESTIMONIALS ─── */
        .testimonials {
          padding: 100px 80px;
          background: #0a0806;
          text-align: center;
        }

        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
          margin-top: 60px;
        }

        .testimonial-card {
          padding: 40px 36px;
          border: 1px solid rgba(200,169,126,0.12);
          position: relative;
          text-align: left;
          transition: border-color 0.3s;
        }

        .testimonial-card:hover {
          border-color: rgba(200,169,126,0.35);
        }

        .testimonial-stars {
          color: #c8a97e;
          font-size: 14px;
          letter-spacing: 2px;
          margin-bottom: 18px;
        }

        .testimonial-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: 18px;
          font-weight: 300;
          font-style: italic;
          color: rgba(255,255,255,0.85);
          line-height: 1.7;
        }

        .testimonial-author {
          margin-top: 24px;
          font-family: 'Montserrat', sans-serif;
          font-size: 10px;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: #c8a97e;
        }

        .testimonial-card::before {
          content: '"';
          position: absolute;
          top: 16px; right: 24px;
          font-family: 'Cormorant Garamond', serif;
          font-size: 80px;
          color: rgba(200,169,126,0.1);
          line-height: 1;
        }

        /* ─── NEWSLETTER ─── */
        .newsletter {
          padding: 100px 80px;
          background: #12100d;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .newsletter::before {
          content: '';
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 700px; height: 700px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(200,169,126,0.06) 0%, transparent 70%);
          pointer-events: none;
        }

        .newsletter-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(40px, 5vw, 68px);
          font-weight: 300;
          color: #fff;
          line-height: 1.1;
        }

        .newsletter-title em { font-style: italic; color: #c8a97e; }

        .newsletter-sub {
          font-family: 'Montserrat', sans-serif;
          font-size: 12px;
          letter-spacing: 2px;
          color: rgba(255,255,255,0.4);
          margin-top: 16px;
          text-transform: uppercase;
        }

        .newsletter-form {
          margin-top: 50px;
          display: flex;
          gap: 0;
          max-width: 520px;
          margin-left: auto;
          margin-right: auto;
        }

        .newsletter-input {
          flex: 1;
          padding: 16px 24px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(200,169,126,0.25);
          border-right: none;
          color: #fff;
          font-family: 'Montserrat', sans-serif;
          font-size: 12px;
          outline: none;
          transition: border-color 0.3s;
        }

        .newsletter-input::placeholder {
          color: rgba(255,255,255,0.25);
          letter-spacing: 2px;
          font-size: 11px;
        }

        .newsletter-input:focus {
          border-color: rgba(200,169,126,0.6);
        }

        .newsletter-submit {
          padding: 16px 32px;
          background: #c8a97e;
          border: none;
          color: #0a0806;
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 0.3s;
        }

        .newsletter-submit:hover { background: #e8c99e; }

        /* ─── FOOTER ─── */
        .footer {
          background: #060504;
          padding: 80px 80px 40px;
          border-top: 1px solid rgba(200,169,126,0.1);
        }

        .footer-top {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 60px;
          padding-bottom: 60px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }

        .footer-brand-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 32px;
          font-weight: 600;
          color: #c8a97e;
          letter-spacing: 3px;
          text-transform: uppercase;
        }

        .footer-brand-name span { color: #fff; }

        .footer-desc {
          font-family: 'Montserrat', sans-serif;
          font-size: 12px;
          font-weight: 300;
          line-height: 1.9;
          color: rgba(255,255,255,0.35);
          margin-top: 16px;
        }

        .footer-col-title {
          font-family: 'Montserrat', sans-serif;
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 3.5px;
          text-transform: uppercase;
          color: #c8a97e;
          margin-bottom: 24px;
        }

        .footer-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .footer-links a {
          font-family: 'Montserrat', sans-serif;
          font-size: 12px;
          font-weight: 300;
          color: rgba(255,255,255,0.4);
          text-decoration: none;
          transition: color 0.3s;
          letter-spacing: 0.5px;
        }

        .footer-links a:hover { color: #c8a97e; }

        .footer-bottom {
          padding-top: 32px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .footer-copy {
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          color: rgba(255,255,255,0.2);
          letter-spacing: 1px;
        }

        .footer-legal {
          display: flex;
          gap: 24px;
        }

        .footer-legal a {
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          color: rgba(255,255,255,0.2);
          text-decoration: none;
          transition: color 0.3s;
        }

        .footer-legal a:hover { color: #c8a97e; }

        @media (max-width: 1024px) {
          .collections-grid { grid-template-columns: repeat(2, 1fr); }
          .collection-card:first-child { grid-row: span 1; }
          .brand-section { grid-template-columns: 1fr; gap: 60px; }
          .testimonials-grid { grid-template-columns: 1fr; }
          .stats-bar { grid-template-columns: repeat(2, 1fr); }
          .footer-top { grid-template-columns: 1fr 1fr; gap: 40px; }
        }

        @media (max-width: 768px) {
          .collections-section,
          .brand-section,
          .testimonials,
          .newsletter,
          .footer { padding-left: 24px; padding-right: 24px; }
          .stats-bar { padding: 32px 24px; }
          .collections-grid { grid-template-columns: 1fr; }
          .newsletter-form { flex-direction: column; }
          .newsletter-input { border-right: 1px solid rgba(200,169,126,0.25); }
          .footer-top { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* ─── MARQUEE BAR ─── */}
      <div className="marquee-wrap">
        <div className="marquee-track">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i}>✦ {item}</span>
          ))}
        </div>
      </div>

      <Navbar />

      {/* ─── HERO ─── */}
      <section className="hero-section" ref={heroRef} style={{ paddingTop: 28 }}>
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            y: yBg,
            scale: scaleHero
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80"
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </motion.div>

        <div className="hero-overlay" />

        <motion.div
          className="hero-content"
          style={{ opacity: opacityHero }}
        >
          <motion.div
            className="hero-eyebrow"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            New Season 2026
          </motion.div>

          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            Timeless<br /><em>Elegance</em><br />Redefined
          </motion.h1>

          <motion.p
            className="hero-sub"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            Curated for the discerning few
          </motion.p>

          <motion.div
            className="hero-cta-group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <Link to="/products" className="btn-primary">Explore Collection</Link>
            <Link to="/products" className="btn-ghost">View Lookbook</Link>
          </motion.div>
        </motion.div>

        <div className="scroll-indicator">
          <span className="scroll-text">Scroll</span>
          <div className="scroll-line" />
        </div>
      </section>

      {/* ─── STATS BAR ─── */}
      <motion.div
        className="stats-bar"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {[
          { n: "12K+", l: "Happy Customers" },
          { n: "500+", l: "Premium Products" },
          { n: "99%", l: "Satisfaction Rate" },
          { n: "24/7", l: "Customer Support" }
        ].map((s, i) => (
          <motion.div
            key={i}
            className="stat-item"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.12, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="stat-number">{s.n}</div>
            <div className="stat-label">{s.l}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* ─── COLLECTIONS ─── */}
      <section className="collections-section">
        <div className="section-header">
          <div>
            <div className="section-eyebrow">Curated Selection</div>
            <h2 className="section-title">Featured <em>Collections</em></h2>
          </div>
          <Link to="/products" className="view-all">View All →</Link>
        </div>

        <div className="collections-grid">
          {collections.map((item, i) => (
            <motion.div
              key={i}
              className="collection-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.12, duration: 0.7 }}
              viewport={{ once: true }}
            >
              <div className="collection-img-wrap">
                <img src={item.img} alt={item.name} className="collection-img" />
              </div>
              <div className="collection-info">
                <div className="collection-tag">{item.tag}</div>
                <div className="collection-name">{item.name}</div>
                <div className="collection-sub">{item.sub}</div>
                <div className="collection-price">{item.price}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── BRAND STORY ─── */}
      <section className="brand-section">
        <motion.div
          className="brand-content"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
        >
          <div className="section-eyebrow">Our Story</div>
          <blockquote className="brand-quote">
            "Crafted for those who <span>live without</span> compromise."
          </blockquote>
          <p className="brand-desc">
            ShopPro was born from a belief that premium quality should be accessible. Every product in our collection is handpicked by our expert curators, tested rigorously, and delivered with care. We don't just sell products — we deliver experiences that last a lifetime.
          </p>
          <div className="brand-cta">
            <Link to="/products" className="btn-primary">Shop the Story</Link>
          </div>
        </motion.div>

        <motion.div
          className="brand-visual"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
        >
          <img
            src="https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=700&q=80"
            alt="Brand Story"
            className="brand-img-main"
          />
          <div className="brand-accent-box" />
          <div className="brand-gold-line" />
        </motion.div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="testimonials">
        <div className="section-eyebrow">What Clients Say</div>
        <h2 className="section-title">Loved by <em>Thousands</em></h2>

        <div className="testimonials-grid">
          {[
            { text: "Absolutely stunning quality. The headphones I ordered surpassed every expectation. ShopPro's curation is unmatched.", author: "Arjun Mehta, Mumbai" },
            { text: "From the packaging to the product itself — every detail exudes luxury. Will never shop anywhere else.", author: "Priya Sharma, Delhi" },
            { text: "Placed my first order hesitantly, but the experience was seamless and the product arrived in perfect condition.", author: "Rohit Verma, Hyderabad" }
          ].map((t, i) => (
            <motion.div
              key={i}
              className="testimonial-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.7 }}
              viewport={{ once: true }}
            >
              <div className="testimonial-stars">★★★★★</div>
              <p className="testimonial-text">{t.text}</p>
              <div className="testimonial-author">{t.author}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── NEWSLETTER ─── */}
      <section className="newsletter">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="newsletter-title">Stay <em>Ahead</em> of the Curve</h2>
          <p className="newsletter-sub">Exclusive drops, early access & member-only offers</p>
          <div className="newsletter-form">
            <input type="email" placeholder="Your email address" className="newsletter-input" />
            <button className="newsletter-submit">Subscribe</button>
          </div>
        </motion.div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="footer">
        <div className="footer-top">
          <div>
            <div className="footer-brand-name">Shop<span>Pro</span></div>
            <p className="footer-desc">
              Premium curated products for the modern connoisseur. Quality without compromise, delivered to your door.
            </p>
          </div>
          <div>
            <div className="footer-col-title">Shop</div>
            <ul className="footer-links">
              <li><Link to="/products">All Products</Link></li>
              <li><a href="#">New Arrivals</a></li>
              <li><a href="#">Best Sellers</a></li>
              <li><a href="#">Sale</a></li>
            </ul>
          </div>
          <div>
            <div className="footer-col-title">Help</div>
            <ul className="footer-links">
              <li><a href="#">Track Order</a></li>
              <li><a href="#">Returns</a></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <div className="footer-col-title">Company</div>
            <ul className="footer-links">
              <li><a href="#">About Us</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Press</a></li>
              <li><a href="#">Sustainability</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span className="footer-copy">© 2026 ShopPro. All rights reserved.</span>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Settings</a>
          </div>
        </div>
      </footer>
    </>
  );
}