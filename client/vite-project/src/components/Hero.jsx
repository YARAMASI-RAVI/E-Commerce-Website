function Hero() {
  return (
    <section style={{
      padding: "80px 50px",
      textAlign: "center",
      background: "#ffffff"
    }}>
      <h1 style={{
        fontSize: "48px",
        marginBottom: "20px"
      }}>
        Welcome to ShopPro
      </h1>

      <p style={{
        fontSize: "20px",
        marginBottom: "30px"
      }}>
        Discover premium products at the best prices
      </p>

      <button style={{
        padding: "14px 30px",
        border: "none",
        background: "black",
        color: "white",
        borderRadius: "8px"
      }}>
        Shop Now
      </button>
    </section>
  );
}

export default Hero;