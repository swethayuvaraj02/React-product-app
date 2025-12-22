import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const navigate = useNavigate();
  const itemsPerPage = 8;

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }, []);

  const filteredProducts = products.filter((prod) =>
    prod.title.toLowerCase().includes(search.toLowerCase())
  );

  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const visibleProducts = filteredProducts.slice(start, end);

  useEffect(() => {
    setPage(1);
  }, [search]);

  return (
    <div
      style={{
        padding: "40px",
        maxWidth: "1200px",
        margin: "0 auto",
        fontFamily: "'Poppins', Arial, sans-serif",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
          gap: "20px",
        }}
      >
        <h2 style={{ margin: 0 }}>Products</h2>

        <TextField
          label="Search products"
          variant="outlined"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "30px",
        }}
      >
        {visibleProducts.map((prod) => (
          <div
            key={prod.id}
            style={{
              background: "#fff",
              borderRadius: "16px",
              padding: "20px",
              boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
              display: "flex",
              flexDirection: "column",
              fontFamily: "'Poppins', Arial, sans-serif",
            }}
          >
            <img
              src={prod.thumbnail}
              alt={prod.title}
              style={{
                width: "100%",
                height: "180px",
                objectFit: "contain",
                marginBottom: "15px",
              }}
            />

            <h4 style={{ marginBottom: "8px" }}>{prod.title}</h4>
            <p style={{ fontWeight: "bold", marginBottom: "16px" }}>
              ₹{prod.price}
            </p>

            <Button
              variant="contained"
              fullWidth
              onClick={() => navigate(`/product/${prod.id}`)}
            >
              View Details
            </Button>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <p style={{ marginTop: "40px", textAlign: "center", color: "#777" }}>
          No products found.
        </p>
      )}

      {filteredProducts.length > itemsPerPage && (
        <Stack alignItems="center" marginTop={5}>
          <Pagination
            count={Math.ceil(filteredProducts.length / itemsPerPage)}
            page={page}
            onChange={(e, value) => setPage(value)}
            color="primary"
          />
        </Stack>
      )}
    </div>
  );
}

export default Home;
