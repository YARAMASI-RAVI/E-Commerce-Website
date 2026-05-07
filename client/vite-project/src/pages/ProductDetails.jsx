import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

function ProductDetails() {
  const { id } = useParams();

  return (
    <>
      <Navbar />

      <div style={{ padding: "40px" }}>
        <h1>Product Details</h1>
        <h2>Product ID: {id}</h2>
        <p>More details coming soon...</p>
      </div>
    </>
  );
}

export default ProductDetails;