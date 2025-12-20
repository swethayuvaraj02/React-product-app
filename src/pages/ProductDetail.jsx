import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";

export default function ProductDetail() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [activeTab, setActiveTab] = useState("description");
  const [showCartPopup, setShowCartPopup] = useState(false);
  const [showBuyPopup, setShowBuyPopup] = useState(false);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!product) {
    return <h2 style={{ padding: "20px" }}>Loading…</h2>;
  }

  return (
    <>
      {/* MAIN LAYOUT */}
      <div
        style={{
          display: "flex",
          padding: "40px",
          gap: "50px",
          alignItems: "flex-start",
        }}
      >
        {/* LEFT: IMAGES */}
        <div style={{ width: "40%" }}>
          <img
            src={product.thumbnail}
            alt={product.title}
            style={{ width: "100%", borderRadius: "12px" }}
          />

          <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
            {product.images?.slice(0, 3).map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt="thumb"
                style={{
                  width: "80px",
                  height: "80px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  border: "2px solid #ddd",
                }}
              />
            ))}
          </div>
        </div>

        {/* RIGHT: DETAILS */}
        <div style={{ width: "55%" }}>
          <h2>{product.title}</h2>

          <h3 style={{ margin: "8px 0" }}>${product.price}</h3>

          <p style={{ color: "red", fontWeight: "bold" }}>
            {product.discountPercentage}% OFF
          </p>

          <p>
            ⭐ {product.rating}{" "}
            <span style={{ color: "gray" }}>
              ({product.stock} reviews)
            </span>
          </p>

          <p style={{ color: "green", fontWeight: "bold" }}>In Stock</p>

          <p style={{ color: "#555" }}>
            Ships in 3–5 business days <br />
            1-week warranty
          </p>

          <p style={{ color: "red" }}>
            Minimum order: {product.minimumOrder ?? 1} unit
          </p>

          {/* ACTION BUTTONS */}
          <div style={{ margin: "20px 0", display: "flex", gap: "15px" }}>
            <Button
              variant="contained"
              onClick={() => setShowCartPopup(true)}
            >
              Add to Cart
            </Button>

            <Button
              variant="contained"
              color="secondary"
              onClick={() => setShowBuyPopup(true)}
            >
              Buy Now
            </Button>
          </div>

          {/* TABS */}
          <div style={{ display: "flex", gap: "20px", marginTop: "30px" }}>
            {["description", "reviews", "shipping"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                  fontWeight: activeTab === tab ? "bold" : "normal",
                  borderBottom:
                    activeTab === tab ? "2px solid black" : "none",
                }}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* TAB CONTENT */}
          <div style={{ marginTop: "20px", color: "#444" }}>
            {activeTab === "description" && <p>{product.description}</p>}

            {activeTab === "reviews" && (
              <p>⭐ 4.2 average rating from 99 verified buyers</p>
            )}

            {activeTab === "shipping" && (
              <p>Free delivery within 3–5 business days.</p>
            )}
          </div>
        </div>
      </div>

      {/* ADD TO CART POPUP */}
      {showCartPopup && (
        <Popup
          title="Added to Cart"
          text="This item is now in your cart."
          onClose={() => setShowCartPopup(false)}
        />
      )}

      {/* BUY NOW POPUP */}
      {showBuyPopup && (
        <Popup
          title="Proceed to Checkout?"
          text="You’ll be redirected to payment."
          primaryText="Proceed"
          onClose={() => setShowBuyPopup(false)}
        />
      )}
    </>
  );
}

/* REUSABLE POPUP */
function Popup({ title, text, onClose, primaryText = "OK" }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "12px",
          width: "320px",
          textAlign: "center",
        }}
      >
        <h3>{title}</h3>
        <p style={{ color: "#555" }}>{text}</p>

        <div style={{ marginTop: "20px" }}>
          <Button variant="contained" onClick={onClose}>
            {primaryText}
          </Button>
        </div>
      </div>
    </div>
  );
}
