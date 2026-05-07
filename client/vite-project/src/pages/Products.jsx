import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const allProducts = [
  { id: 1, name: "Sony WH-1000XM5", category: "Electronics", price: 24999, originalPrice: 34999, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80", rating: 4.8, reviews: 2341, badge: "Best Seller" },
  { id: 2, name: "Nike Air Max 270", category: "Fashion", price: 8999, originalPrice: 12999, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80", rating: 4.6, reviews: 1892, badge: "Trending" },
  { id: 3, name: "Apple MacBook Air", category: "Electronics", price: 99900, originalPrice: 119900, image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&q=80", rating: 4.9, reviews: 3210, badge: "Premium" },
  { id: 4, name: "Fossil Gen 6 Watch", category: "Fashion", price: 18999, originalPrice: 24999, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80", rating: 4.5, reviews: 876, badge: "New" },
  { id: 5, name: "Levi's 511 Slim Jeans", category: "Fashion", price: 2999, originalPrice: 4999, image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&q=80", rating: 4.4, reviews: 5430, badge: null },
  { id: 6, name: "JBL Flip 6 Speaker", category: "Electronics", price: 11999, originalPrice: 14999, image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80", rating: 4.7, reviews: 1234, badge: "Hot" },
  { id: 7, name: "Adidas Ultraboost 22", category: "Sports", price: 12999, originalPrice: 17999, image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&q=80", rating: 4.6, reviews: 988, badge: null },
  { id: 8, name: "Samsung Galaxy Tab S9", category: "Electronics", price: 64999, originalPrice: 74999, image: "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=500&q=80", rating: 4.7, reviews: 765, badge: "New" },
  { id: 9, name: "Leather Crossbody Bag", category: "Fashion", price: 3499, originalPrice: 5999, image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&q=80", rating: 4.5, reviews: 432, badge: null },
  { id: 10, name: "Yoga Mat Pro", category: "Sports", price: 1999, originalPrice: 2999, image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&q=80", rating: 4.3, reviews: 2100, badge: null },
  { id: 11, name: "Canon EOS M50 Mark II", category: "Electronics", price: 54999, originalPrice: 64999, image: "https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?w=500&q=80", rating: 4.8, reviews: 654, badge: "Featured" },
  { id: 12, name: "Nike Dri-FIT T-Shirt", category: "Sports", price: 1499, originalPrice: 2499, image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500&q=80", rating: 4.4, reviews: 8760, badge: null }
];

const categories = ["All", "Electronics", "Fashion", "Sports"];
const sortOptions = ["Featured", "Price: Low to High", "Price: High to Low", "Highest Rated"];

function Stars({ rating }) {
  return (
    <span style={{ color: "#c8a97e", fontSize: 12, letterSpacing: 1 }}>
      {"★".repeat(Math.floor(rating))}{"☆".repeat(5 - Math.floor(rating))}
    </span>
  );
}

function Products() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("Featured");
  const [priceRange, setPriceRange] = useState(120000);
  const [wishlist, setWishlist] = useState([]);
  const [addedId, setAddedId] = useState(null);

  let filtered = allProducts.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "All" || p.category === category;
    const matchPrice = p.price <= priceRange;
    return matchSearch && matchCat && matchPrice;
  });

  if (sort === "Price: Low to High") filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sort === "Price: High to Low") filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (sort === "Highest Rated") filtered = [...filtered].sort((a, b) => b.rating - a.rating);

  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1800);
  };

  const toggleWishlist = (id) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const discount = (orig, curr) => Math.round((1 - curr / orig) * 100);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=Montserrat:wght@300;400;500;600&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body { background: #0a0806; color: #fff; }

        .products-page {
          min-height: 100vh;
          background: #0a0806;
          padding-top: 72px;
        }

        /* HEADER */
        .products-header {
          padding: 60px 80px 48px;
          border-bottom: 1px solid rgba(200,169,126,0.12);
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 24px;
          flex-wrap: wrap;
        }

        .products-header-left {}

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
          font-size: clamp(36px, 5vw, 64px);
          font-weight: 300;
          color: #fff;
          line-height: 1;
        }

        .page-title em { font-style: italic; color: #c8a97e; }

        .search-bar {
          display: flex;
          align-items: center;
          gap: 12px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(200,169,126,0.2);
          padding: 12px 20px;
          min-width: 300px;
          transition: border-color 0.3s;
        }

        .search-bar:focus-within { border-color: rgba(200,169,126,0.6); }

        .search-bar input {
          background: none;
          border: none;
          outline: none;
          color: #fff;
          font-family: 'Montserrat', sans-serif;
          font-size: 12px;
          width: 100%;
        }

        .search-bar input::placeholder {
          color: rgba(255,255,255,0.25);
          letter-spacing: 1.5px;
          font-size: 11px;
        }

        /* LAYOUT */
        .products-layout {
          display: grid;
          grid-template-columns: 260px 1fr;
          min-height: calc(100vh - 200px);
        }

        /* SIDEBAR */
        .sidebar {
          padding: 40px 32px;
          border-right: 1px solid rgba(200,169,126,0.1);
          background: #0e0c09;
          position: sticky;
          top: 72px;
          height: calc(100vh - 72px);
          overflow-y: auto;
        }

        .sidebar::-webkit-scrollbar { width: 3px; }
        .sidebar::-webkit-scrollbar-track { background: transparent; }
        .sidebar::-webkit-scrollbar-thumb { background: rgba(200,169,126,0.3); }

        .filter-group { margin-bottom: 40px; }

        .filter-title {
          font-family: 'Montserrat', sans-serif;
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 3.5px;
          text-transform: uppercase;
          color: #c8a97e;
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 1px solid rgba(200,169,126,0.15);
        }

        .cat-btn {
          display: block;
          width: 100%;
          text-align: left;
          padding: 10px 14px;
          background: none;
          border: none;
          cursor: pointer;
          font-family: 'Montserrat', sans-serif;
          font-size: 12px;
          font-weight: 400;
          color: rgba(255,255,255,0.5);
          letter-spacing: 1px;
          transition: all 0.25s;
          border-left: 2px solid transparent;
          margin-bottom: 2px;
        }

        .cat-btn:hover { color: rgba(255,255,255,0.9); border-left-color: rgba(200,169,126,0.4); }
        .cat-btn.active { color: #c8a97e; border-left-color: #c8a97e; background: rgba(200,169,126,0.06); }

        .price-range-wrap {}

        .price-display {
          display: flex;
          justify-content: space-between;
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          color: rgba(255,255,255,0.4);
          margin-bottom: 14px;
        }

        .price-display strong { color: #c8a97e; }

        input[type="range"] {
          width: 100%;
          -webkit-appearance: none;
          height: 2px;
          background: rgba(200,169,126,0.2);
          outline: none;
          accent-color: #c8a97e;
        }

        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 14px; height: 14px;
          border-radius: 50%;
          background: #c8a97e;
          cursor: pointer;
          box-shadow: 0 0 0 3px rgba(200,169,126,0.2);
        }

        /* MAIN */
        .products-main { padding: 40px 48px; }

        .toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 32px;
        }

        .result-count {
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          color: rgba(255,255,255,0.35);
          letter-spacing: 1.5px;
        }

        .result-count strong { color: rgba(255,255,255,0.7); }

        .sort-select {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(200,169,126,0.2);
          color: rgba(255,255,255,0.7);
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          letter-spacing: 1px;
          padding: 10px 16px;
          outline: none;
          cursor: pointer;
        }

        .sort-select option { background: #1a1510; }

        /* GRID */
        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 24px;
        }

        /* PRODUCT CARD */
        .product-card {
          background: #14120f;
          border: 1px solid rgba(255,255,255,0.05);
          overflow: hidden;
          transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s;
          position: relative;
          cursor: pointer;
        }

        .product-card:hover {
          border-color: rgba(200,169,126,0.25);
          transform: translateY(-4px);
          box-shadow: 0 20px 50px rgba(0,0,0,0.4);
        }

        .card-img-wrap {
          position: relative;
          overflow: hidden;
          aspect-ratio: 1;
          background: #1a1712;
        }

        .card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          filter: brightness(0.9);
        }

        .product-card:hover .card-img { transform: scale(1.07); }

        .card-badge {
          position: absolute;
          top: 12px; left: 12px;
          font-family: 'Montserrat', sans-serif;
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 4px 10px;
          background: #c8a97e;
          color: #0a0806;
        }

        .discount-badge {
          position: absolute;
          top: 12px; right: 12px;
          font-family: 'Montserrat', sans-serif;
          font-size: 10px;
          font-weight: 600;
          padding: 4px 8px;
          background: rgba(220,60,60,0.9);
          color: #fff;
        }

        .wishlist-btn {
          position: absolute;
          bottom: 12px; right: 12px;
          width: 36px; height: 36px;
          border-radius: 50%;
          background: rgba(10,8,6,0.8);
          border: 1px solid rgba(200,169,126,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 16px;
          transition: all 0.3s;
          opacity: 0;
          transform: translateY(4px);
        }

        .product-card:hover .wishlist-btn {
          opacity: 1;
          transform: translateY(0);
        }

        .wishlist-btn.active { background: #c8a97e; border-color: #c8a97e; }

        .card-body { padding: 20px 18px; }

        .card-category {
          font-family: 'Montserrat', sans-serif;
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: rgba(200,169,126,0.6);
          margin-bottom: 6px;
        }

        .card-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 20px;
          font-weight: 400;
          color: #fff;
          line-height: 1.2;
          margin-bottom: 8px;
        }

        .card-rating {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 14px;
        }

        .card-reviews {
          font-family: 'Montserrat', sans-serif;
          font-size: 10px;
          color: rgba(255,255,255,0.3);
        }

        .card-price-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 16px;
        }

        .card-price {
          font-family: 'Cormorant Garamond', serif;
          font-size: 24px;
          font-weight: 600;
          color: #c8a97e;
        }

        .card-original-price {
          font-family: 'Montserrat', sans-serif;
          font-size: 12px;
          color: rgba(255,255,255,0.25);
          text-decoration: line-through;
        }

        .add-btn {
          width: 100%;
          padding: 12px;
          background: none;
          border: 1px solid rgba(200,169,126,0.35);
          color: rgba(255,255,255,0.8);
          font-family: 'Montserrat', sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s;
        }

        .add-btn:hover, .add-btn.added {
          background: #c8a97e;
          border-color: #c8a97e;
          color: #0a0806;
        }

        /* EMPTY */
        .no-products {
          text-align: center;
          padding: 80px 20px;
          grid-column: 1/-1;
        }

        .no-products p {
          font-family: 'Cormorant Garamond', serif;
          font-size: 28px;
          color: rgba(255,255,255,0.3);
          font-style: italic;
        }

        @media (max-width: 1024px) {
          .products-layout { grid-template-columns: 1fr; }
          .sidebar { position: relative; top: 0; height: auto; display: flex; flex-wrap: wrap; gap: 24px; }
          .filter-group { margin-bottom: 0; flex: 1; min-width: 200px; }
          .products-header { padding: 40px 24px 32px; }
          .products-main { padding: 24px; }
        }

        @media (max-width: 640px) {
          .products-header { flex-direction: column; align-items: flex-start; }
          .search-bar { min-width: 100%; }
          .products-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
        }
      `}</style>

      <div className="products-page">
        <Navbar />

        {/* HEADER */}
        <div className="products-header">
          <div className="products-header-left">
            <div className="page-eyebrow">Our Collection</div>
            <h1 className="page-title">Premium <em>Products</em></h1>
          </div>
          <div className="search-bar">
            <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 16 }}>⌕</span>
            <input
              placeholder="Search products..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="products-layout">
          {/* SIDEBAR */}
          <aside className="sidebar">
            <div className="filter-group">
              <div className="filter-title">Category</div>
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`cat-btn ${category === cat ? "active" : ""}`}
                  onClick={() => setCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="filter-group">
              <div className="filter-title">Price Range</div>
              <div className="price-display">
                <span>₹0</span>
                <strong>₹{priceRange.toLocaleString()}</strong>
              </div>
              <input
                type="range"
                min={0}
                max={120000}
                step={500}
                value={priceRange}
                onChange={e => setPriceRange(Number(e.target.value))}
              />
            </div>

            <div className="filter-group">
              <div className="filter-title">Sort By</div>
              {sortOptions.map(opt => (
                <button
                  key={opt}
                  className={`cat-btn ${sort === opt ? "active" : ""}`}
                  onClick={() => setSort(opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
          </aside>

          {/* MAIN */}
          <main className="products-main">
            <div className="toolbar">
              <p className="result-count">
                Showing <strong>{filtered.length}</strong> of {allProducts.length} products
              </p>
            </div>

            <div className="products-grid">
              <AnimatePresence>
                {filtered.length === 0 ? (
                  <div className="no-products">
                    <p>No products match your criteria</p>
                  </div>
                ) : (
                  filtered.map((p, i) => (
                    <motion.div
                      key={p.id}
                      className="product-card"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: i * 0.05, duration: 0.5 }}
                      layout
                    >
                      <div className="card-img-wrap">
                        <img src={p.image} alt={p.name} className="card-img" />
                        {p.badge && <div className="card-badge">{p.badge}</div>}
                        <div className="discount-badge">-{discount(p.originalPrice, p.price)}%</div>
                        <button
                          className={`wishlist-btn ${wishlist.includes(p.id) ? "active" : ""}`}
                          onClick={() => toggleWishlist(p.id)}
                        >
                          {wishlist.includes(p.id) ? "♥" : "♡"}
                        </button>
                      </div>
                      <div className="card-body">
                        <div className="card-category">{p.category}</div>
                        <div className="card-name">{p.name}</div>
                        <div className="card-rating">
                          <Stars rating={p.rating} />
                          <span className="card-reviews">({p.reviews.toLocaleString()})</span>
                        </div>
                        <div className="card-price-row">
                          <span className="card-price">₹{p.price.toLocaleString()}</span>
                          <span className="card-original-price">₹{p.originalPrice.toLocaleString()}</span>
                        </div>
                        <button
                          className={`add-btn ${addedId === p.id ? "added" : ""}`}
                          onClick={() => addToCart(p)}
                        >
                          {addedId === p.id ? "✓ Added to Bag" : "Add to Bag"}
                        </button>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default Products;