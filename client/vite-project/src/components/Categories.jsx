function Categories() {
  const categories = [
    "Electronics",
    "Fashion",
    "Home",
    "Sports"
  ];

  return (
    <section style={{
      padding: "60px 50px",
      background: "#ffffff"
    }}>
      <h2 style={{
        marginBottom: "30px"
      }}>
        Shop by Category
      </h2>

      <div style={{
        display: "flex",
        gap: "20px",
        flexWrap: "wrap"
      }}>
        {categories.map((cat, index) => (
          <div
            key={index}
            style={{
              padding: "20px 30px",
              background: "#f1f3f5",
              borderRadius: "10px"
            }}
          >
            {cat}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Categories;