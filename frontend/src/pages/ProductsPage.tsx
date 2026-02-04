import { useEffect, useState } from "react";
import { api } from "../services/api";
import type { Product } from "../types/product";
import { useCart } from "../context/useCart";
import { Link } from "react-router-dom";

function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();

  useEffect(() => {
    api
      .get<Product[]>("/products")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h2>Loading products...</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Clothing Store</h1>

      <div style={{ display: "flex", gap: "20px" }}>
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              width: "200px",
            }}
          >
            <Link to={`/product/${product.id}`}>
              <img src={product.image} alt={product.name} width="100%" />
              <h3>{product.name}</h3>
            </Link>

            <button
              onClick={() => addToCart(product)}
              style={{
                marginTop: "10px",
                width: "100%",
                padding: "8px",
                backgroundColor: "#000",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductsPage;
