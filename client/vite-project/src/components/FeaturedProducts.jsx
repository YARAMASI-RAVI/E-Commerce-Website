function FeaturedProducts() {
  const products = [
    "Wireless Headphones",
    "Smart Watch",
    "Gaming Laptop",
    "Running Shoes"
  ];

  return (
    <section style={{
      padding: "60px 50px"
    }}>
      <h2 style={{
        marginBottom: "30px"
      }}>
        Featured Products
      </h2>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "20px"
      }}>
        {products.map((item, index) => (
          <div
            key={index}
            style={{
              background: "white",
              padding: "30px",
              borderRadius: "12px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
            }}
          >
            <h3>{item}</h3>
            <p style={{ margin: "15px 0" }}>
              Premium quality product
            </p>
            <button>Add to Cart</button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FeaturedProducts;