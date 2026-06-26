import "./TrackingPage.css";
import api from "../../axiosInstance";
import { Header } from "../Header/Header";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
export function TrackingPage({ cartItems }) {
  const { orderId, productId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchTrackingData = async () => {
      const response = await api.get(
        `/api/orders/${orderId}?expand=products`,
      );
      setOrder(response.data);
    };
    fetchTrackingData();
  }, [orderId]);

  if (!order) {
    return null;
  }
  const orderProduct = order.products.find((orderProduct) => {
    return orderProduct.productId === productId;
  });

  const totalDeliveryTimeMs =
    orderProduct.product.estimatedDeliveryTimeMs - orderProduct.orderTimeMs;
  const timePassedMs = dayjs().valueOf() - totalDeliveryTimeMs;
  const progressArrived = (timePassedMs / totalDeliveryTimeMs) * 100;
  return (
    <>
      <Header cartItems={cartItems} />

      <div className="tracking-page">
        <div className="order-tracking">
          <a className="back-to-orders-link link-primary" href="/orders">
            View all orders
          </a>

          <div className="delivery-date">
            Arriving on{" "}
            {dayjs(orderProduct.estimatedDeliveryTimeMs).format("dddd, MMMM D")}
          </div>

          <div className="product-info">{orderProduct.product.name}</div>

          <div className="product-info">Quantity: {orderProduct.quantity}</div>

          <img className="product-image" src={orderProduct.product.image} />

          <div className="progress-labels-container">
            <div className="progress-label">Preparing</div>
            <div className="progress-label current-status">Shipped</div>
            <div className="progress-label">Delivered</div>
          </div>

          <div className="progress-bar-container">
            <div
              className="progress-bar"
              style={{ width: `${progressArrived}%` }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}
