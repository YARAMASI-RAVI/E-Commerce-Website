import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

function Admin() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [tab, setTab] = useState("dashboard");
  const [loading, setLoading] = useState(true);
  const [newProduct, setNewProduct] = useState({ name: "", category: "", price: "", description: "", image: "" });
  const [adding, setAdding] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user?.token) {
      window.location.href = "/login";
      return;
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [prodRes, orderRes] = await Promise.all([
        fetch("http://localhost:5000/api/products"),
        fetch("http://localhost:5000/api/orders", {
          headers: { Authorization: `Bearer ${user.token}` }
        })
      ]);
      const prods = await prodRes.json();
      const ords = await orderRes.json();
      setProducts(Array.isArray(prods) ? prods : []);
      setOrders(Array.isArray(ords) ? ords : []);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    await fetch(`http://localhost:5000/api/products/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${user.token}` }
    });
    setProducts(products.filter(p => p._id !== id));
  };

  const addProduct = async () => {
    if (!newProduct.name || !newProduct.price) return alert("Name and price required");
    setAdding(true);
    try {
      const res = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`
        },
        body: JSON.stringify(newProduct)
      });
      const data = await res.json();
      if (res.ok) {
        setProducts([...products, data]);
        setNewProduct({ name: "", category: "", price: "", description: "", image: "" });
      }
    } catch (e) { console.error(e); }
    setAdding(false);
  };

  const totalRevenue = orders.reduce((s, o) => s + (o.total || 0), 0);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=Montserrat:wght@300;400;500;600&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #0a0806; }

        .admin-page {
          min-height: 100vh;
          background: #0a0806;
          padding-top: 72px;
          display: grid;
          grid-template-columns: 240px 1fr;
        }

        /* SIDEBAR */
        .admin-sidebar {
          background: #0e0c09;
          border-right: 1px solid rgba(200,169,126,0.1);
          padding: 40px 0;
          position: sticky;
          top: 72px;
          height: calc(100vh - 72px);
        }

        .sidebar-logo {
          padding: 0 28px 32px;
          border-bottom: 1px solid rgba(200,169,126,0.1);
          margin-bottom: 32px;
        }

        .sidebar-logo-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: 20px;
          font-weight: 600;
          color: #c8a97e;
          letter-spacing: 3px;
          text-transform: uppercase;
        }

        .sidebar-logo-sub {
          font-family: 'Montserrat', sans-serif;
          font-size: 9px;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.25);
          margin-top: 4px;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 13px 28px;
          cursor: pointer;
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 1.5px;
          color: rgba(255,255,255,0.4);
          transition: all 0.25s;
          border-left: 2px solid transparent;
          text-transform: uppercase;
        }

        .nav-item:hover { color: rgba(255,255,255,0.8); background: rgba(255,255,255,0.03); }
        .nav-item.active { color: #c8a97e; border-left-color: #c8a97e; background: rgba(200,169,126,0.06); }
        .nav-item-icon { font-size: 16px; }

        /* MAIN */
        .admin-main { padding: 48px; overflow-y: auto; }

        .admin-header {
          margin-bottom: 40px;
        }

        .admin-eyebrow {
          font-family: 'Montserrat', sans-serif;
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: #c8a97e;
          margin-bottom: 8px;
        }

        .admin-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 48px;
          font-weight: 300;
          color: #fff;
        }

        .admin-title em { font-style: italic; color: #c8a97e; }

        /* STATS */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-bottom: 48px;
        }

        .stat-card {
          background: #14120f;
          border: 1px solid rgba(200,169,126,0.12);
          padding: 28px 24px;
          transition: border-color 0.3s;
        }

        .stat-card:hover { border-color: rgba(200,169,126,0.3); }

        .stat-icon { font-size: 24px; margin-bottom: 14px; }

        .stat-value {
          font-family: 'Cormorant Garamond', serif;
          font-size: 38px;
          font-weight: 300;
          color: #c8a97e;
          line-height: 1;
        }

        .stat-label {
          font-family: 'Montserrat', sans-serif;
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          margin-top: 8px;
        }

        /* SECTION */
        .section-card {
          background: #14120f;
          border: 1px solid rgba(200,169,126,0.12);
          overflow: hidden;
          margin-bottom: 32px;
        }

        .section-card-header {
          padding: 22px 28px;
          border-bottom: 1px solid rgba(200,169,126,0.1);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .section-card-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px;
          font-weight: 300;
          color: #fff;
        }

        /* TABLE */
        .admin-table {
          width: 100%;
          border-collapse: collapse;
        }

        .admin-table th {
          padding: 14px 20px;
          text-align: left;
          font-family: 'Montserrat', sans-serif;
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
          background: rgba(255,255,255,0.02);
          border-bottom: 1px solid rgba(200,169,126,0.1);
        }

        .admin-table td {
          padding: 16px 20px;
          font-family: 'Montserrat', sans-serif;
          font-size: 12px;
          color: rgba(255,255,255,0.65);
          border-bottom: 1px solid rgba(255,255,255,0.04);
          vertical-align: middle;
        }

        .admin-table tr:hover td { background: rgba(200,169,126,0.03); }

        .product-thumb {
          width: 44px;
          height: 44px;
          object-fit: cover;
          border: 1px solid rgba(200,169,126,0.15);
        }

        .product-name-cell {
          font-family: 'Cormorant Garamond', serif;
          font-size: 16px;
          color: #fff;
        }

        .price-cell { color: #c8a97e; font-weight: 500; }

        .delete-btn {
          padding: 6px 14px;
          background: none;
          border: 1px solid rgba(220,60,60,0.3);
          color: rgba(220,100,100,0.7);
          font-family: 'Montserrat', sans-serif;
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s;
        }

        .delete-btn:hover { background: rgba(220,60,60,0.1); border-color: rgba(220,60,60,0.6); color: rgba(220,80,80,0.9); }

        /* ADD FORM */
        .add-form {
          padding: 28px;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 16px;
        }

        .field-group { display: flex; flex-direction: column; gap: 8px; }

        .field-label {
          font-family: 'Montserrat', sans-serif;
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: rgba(200,169,126,0.6);
        }

        .field-input {
          padding: 12px 14px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(200,169,126,0.18);
          color: #fff;
          font-family: 'Montserrat', sans-serif;
          font-size: 12px;
          outline: none;
          transition: border-color 0.3s;
        }

        .field-input:focus { border-color: rgba(200,169,126,0.5); }
        .field-input::placeholder { color: rgba(255,255,255,0.18); }

        .add-btn {
          padding: 13px 36px;
          background: #c8a97e;
          border: none;
          color: #0a0806;
          font-family: 'Montserrat', sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s;
        }

        .add-btn:hover:not(:disabled) { background: #e8c99e; box-shadow: 0 8px 30px rgba(200,169,126,0.3); }
        .add-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        /* STATUS BADGE */
        .status-badge {
          display: inline-block;
          padding: 3px 10px;
          font-family: 'Montserrat', sans-serif;
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 1.5px;
          text-transform: uppercase;
        }

        .status-paid { background: rgba(92,184,92,0.15); color: #5cb85c; }
        .status-pending { background: rgba(200,169,126,0.15); color: #c8a97e; }

        .loading-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 80px;
        }

        .loading-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: 24px;
          color: rgba(200,169,126,0.4);
          font-style: italic;
        }

        @media (max-width: 1200px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 900px) {
          .admin-page { grid-template-columns: 1fr; }
          .admin-sidebar { position: relative; top: 0; height: auto; display: flex; flex-wrap: wrap; padding: 20px; gap: 8px; }
          .nav-item { border-left: none; border-bottom: 2px solid transparent; padding: 10px 16px; }
          .nav-item.active { border-left: none; border-bottom-color: #c8a97e; }
          .admin-main { padding: 24px; }
          .form-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="admin-page">
        <Navbar />

        {/* SIDEBAR */}
        <aside className="admin-sidebar">
          <div className="sidebar-logo">
            <div className="sidebar-logo-text">ShopPro</div>
            <div className="sidebar-logo-sub">Admin Panel</div>
          </div>

          {[
            { id: "dashboard", icon: "◈", label: "Dashboard" },
            { id: "products", icon: "◉", label: "Products" },
            { id: "orders", icon: "◎", label: "Orders" },
            { id: "add", icon: "⊕", label: "Add Product" },
          ].map(item => (
            <div
              key={item.id}
              className={`nav-item ${tab === item.id ? "active" : ""}`}
              onClick={() => setTab(item.id)}
            >
              <span className="nav-item-icon">{item.icon}</span>
              {item.label}
            </div>
          ))}
        </aside>

        {/* MAIN */}
        <main className="admin-main">
          {loading ? (
            <div className="loading-wrap">
              <p className="loading-text">Loading data...</p>
            </div>
          ) : (
            <>
              {/* DASHBOARD */}
              {tab === "dashboard" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="admin-header">
                    <div className="admin-eyebrow">Overview</div>
                    <h1 className="admin-title">Admin <em>Dashboard</em></h1>
                  </div>

                  <div className="stats-grid">
                    {[
                      { icon: "📦", value: products.length, label: "Total Products" },
                      { icon: "🛒", value: orders.length, label: "Total Orders" },
                      { icon: "💰", value: `₹${totalRevenue.toLocaleString()}`, label: "Total Revenue" },
                      { icon: "✅", value: orders.filter(o => o.isPaid).length, label: "Paid Orders" },
                    ].map((s, i) => (
                      <motion.div
                        key={i}
                        className="stat-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <div className="stat-icon">{s.icon}</div>
                        <div className="stat-value">{s.value}</div>
                        <div className="stat-label">{s.label}</div>
                      </motion.div>
                    ))}
                  </div>

                  {/* RECENT ORDERS */}
                  <div className="section-card">
                    <div className="section-card-header">
                      <div className="section-card-title">Recent Orders</div>
                    </div>
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Order ID</th>
                          <th>Items</th>
                          <th>Total</th>
                          <th>Status</th>
                          <th>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.slice(0, 5).map(o => (
                          <tr key={o._id}>
                            <td style={{ fontFamily: 'monospace', fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>
                              #{o._id?.slice(-6).toUpperCase()}
                            </td>
                            <td>{o.items?.length || 0} item(s)</td>
                            <td className="price-cell">₹{(o.total || 0).toLocaleString()}</td>
                            <td>
                              <span className={`status-badge ${o.isPaid ? "status-paid" : "status-pending"}`}>
                                {o.isPaid ? "Paid" : "Pending"}
                              </span>
                            </td>
                            <td>{o.createdAt ? new Date(o.createdAt).toLocaleDateString() : "—"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

              {/* PRODUCTS */}
              {tab === "products" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="admin-header">
                    <div className="admin-eyebrow">Inventory</div>
                    <h1 className="admin-title">All <em>Products</em></h1>
                  </div>
                  <div className="section-card">
                    <div className="section-card-header">
                      <div className="section-card-title">{products.length} Products</div>
                    </div>
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Image</th>
                          <th>Name</th>
                          <th>Category</th>
                          <th>Price</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map(p => (
                          <tr key={p._id}>
                            <td>
                              {p.image
                                ? <img src={p.image} alt={p.name} className="product-thumb" />
                                : <div style={{ width: 44, height: 44, background: 'rgba(200,169,126,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>📦</div>
                              }
                            </td>
                            <td className="product-name-cell">{p.name}</td>
                            <td>{p.category || "—"}</td>
                            <td className="price-cell">₹{(p.price || 0).toLocaleString()}</td>
                            <td>
                              <button className="delete-btn" onClick={() => deleteProduct(p._id)}>Delete</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

              {/* ORDERS */}
              {tab === "orders" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="admin-header">
                    <div className="admin-eyebrow">Transactions</div>
                    <h1 className="admin-title">All <em>Orders</em></h1>
                  </div>
                  <div className="section-card">
                    <div className="section-card-header">
                      <div className="section-card-title">{orders.length} Orders</div>
                    </div>
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Order ID</th>
                          <th>Customer</th>
                          <th>Items</th>
                          <th>Total</th>
                          <th>Status</th>
                          <th>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map(o => (
                          <tr key={o._id}>
                            <td style={{ fontFamily: 'monospace', fontSize: 11 }}>#{o._id?.slice(-6).toUpperCase()}</td>
                            <td>{o.user?.name || o.user?.email || "Guest"}</td>
                            <td>{o.items?.length || 0}</td>
                            <td className="price-cell">₹{(o.total || 0).toLocaleString()}</td>
                            <td>
                              <span className={`status-badge ${o.isPaid ? "status-paid" : "status-pending"}`}>
                                {o.isPaid ? "Paid" : "Pending"}
                              </span>
                            </td>
                            <td>{o.createdAt ? new Date(o.createdAt).toLocaleDateString() : "—"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

              {/* ADD PRODUCT */}
              {tab === "add" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="admin-header">
                    <div className="admin-eyebrow">Inventory</div>
                    <h1 className="admin-title">Add <em>Product</em></h1>
                  </div>
                  <div className="section-card">
                    <div className="section-card-header">
                      <div className="section-card-title">New Product Details</div>
                    </div>
                    <div className="add-form">
                      <div className="form-grid">
                        <div className="field-group">
                          <label className="field-label">Product Name *</label>
                          <input className="field-input" placeholder="e.g. Sony WH-1000XM5" value={newProduct.name} onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} />
                        </div>
                        <div className="field-group">
                          <label className="field-label">Category</label>
                          <input className="field-input" placeholder="Electronics / Fashion / Sports" value={newProduct.category} onChange={e => setNewProduct({ ...newProduct, category: e.target.value })} />
                        </div>
                        <div className="field-group">
                          <label className="field-label">Price (₹) *</label>
                          <input className="field-input" type="number" placeholder="2999" value={newProduct.price} onChange={e => setNewProduct({ ...newProduct, price: e.target.value })} />
                        </div>
                        <div className="field-group">
                          <label className="field-label">Image URL</label>
                          <input className="field-input" placeholder="https://..." value={newProduct.image} onChange={e => setNewProduct({ ...newProduct, image: e.target.value })} />
                        </div>
                      </div>
                      <div className="field-group" style={{ marginBottom: 24 }}>
                        <label className="field-label">Description</label>
                        <input className="field-input" placeholder="Brief product description..." value={newProduct.description} onChange={e => setNewProduct({ ...newProduct, description: e.target.value })} />
                      </div>
                      <button className="add-btn" onClick={addProduct} disabled={adding}>
                        {adding ? "Adding..." : "Add Product"}
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </>
          )}
        </main>
      </div>
    </>
  );
}

export default Admin;