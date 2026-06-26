import "./OrderPage.css";
import { useState, useEffect } from "react";
import api from "../../axiosInstance";
import { OrderGrid } from "./OrderGrid";
import { Header } from "../Header/Header";
export function OrderPage({ cartItems, loadCart }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await api.get("/api/orders?expand=products");
      setOrders(response.data);
    };
    fetchOrders();
  }, []);

  return (
    <>
      <Header cartItems={cartItems} />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <OrderGrid orders={orders} loadCart={loadCart} />
      </div>
    </>
  );
}
