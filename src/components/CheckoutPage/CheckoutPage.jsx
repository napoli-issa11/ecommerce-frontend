import "./CheckoutPage.css";
import { CheckoutGrid } from "./CheckoutGrid";
import { useState, useEffect } from "react";
import api from "../../axiosInstance";
import { CheckoutHeader } from "./CheckoutHeader";

export function CheckoutPage({ cartItems, loadCart }) {
  const [payment, setPayment] = useState(null);
  const [deliveryOptions, setDeliveryOptions] = useState([]);

  useEffect(() => {
    const fetchPaymentAndDeliveryOptions = async () => {
      let response = await api.get("/api/payment-summary");
      setPayment(response.data);

      response = await api.get(
        "/api/delivery-options?expand=estimatedDeliveryTime",
      );
      setDeliveryOptions(response.data);
    };
    fetchPaymentAndDeliveryOptions();
  }, [cartItems]);
  const resetButton = async () => {
    localStorage.clear();
    await api.delete("/api/cart-items")
    if (typeof loadCart === "function") {
      loadCart()
    }
    else {
      window.location.reload()
    }
  };
  return (
    <>
      <CheckoutHeader cartItems={cartItems} />

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <CheckoutGrid
          payment={payment}
          deliveryOptions={deliveryOptions}
          cartItems={cartItems}
          loadCart={loadCart}
        />
      </div>
      <button className={cartItems.length === 0? "btn-disabled" : "reset-button"}
              onClick={resetButton}
              disabled={cartItems.length === 0}>
        Reset
      </button>
    </>
  );
}
