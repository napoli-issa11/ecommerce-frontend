import "./HomePage.css";
import { useState, useEffect } from "react";
import api from "../../axiosInstance";
import { useSearchParams } from "react-router";
import { Header } from "../Header/Header";
import { ProductsGrid } from "./ProductsGrid";

export function HomePage({ cartItems, loadCart }) {
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");

  useEffect(() => {
    const fetchProducts = async () => {
      const urlPath = search
        ? `/api/products?search=${search}`
        : "/api/products";
      const response = await api.get(urlPath);
      setProducts(response.data);
    };
    fetchProducts();
  }, [search]);

  return (
    <div className="home-page">
      <Header cartItems={cartItems} />

      <ProductsGrid products={products} loadCart={loadCart} />
    </div>
  );
}
