import { formatMoney } from "../../utils/formatMoney";
import { useNavigate } from "react-router";
import api from "../../axiosInstance";

export function PaymentSummary({ payment, loadCart, cartItems }) {
  const navigate = useNavigate();
  const createOrder = async () => {
    await api.post("/api/orders");
    await loadCart();
    navigate("/orders");
  };
  return (
    <>
      {cartItems.length > 0 && payment && (
        <div className="payment-summary">
          <div className="payment-summary-title">Payment Summary</div>

          <div
            className="payment-summary-row"
            data-testid="payment-summary-money1"
          >
            <div>Items ({payment.totalItems}):</div>
            <div className="payment-summary-money">
              {formatMoney(payment.productCostCents)}
            </div>
          </div>

          <div
            className="payment-summary-row"
            data-testid="payment-summary-money2"
          >
            <div>Shipping &amp; handling:</div>
            <div className="payment-summary-money">
              {formatMoney(payment.shippingCostCents)}
            </div>
          </div>

          <div
            className="payment-summary-row subtotal-row"
            data-testid="payment-summary-money3"
          >
            <div>Total before tax:</div>
            <div className="payment-summary-money">
              {formatMoney(payment.totalCostBeforeTaxCents)}
            </div>
          </div>

          <div
            className="payment-summary-row"
            data-testid="payment-summary-money4"
          >
            <div>Estimated tax (10%):</div>
            <div className="payment-summary-money">
              {formatMoney(payment.taxCents)}
            </div>
          </div>

          <div
            className="payment-summary-row total-row"
            data-testid="payment-summary-money5"
          >
            <div>Order total:</div>
            <div className="payment-summary-money">
              {formatMoney(payment.totalCostCents)}
            </div>
          </div>

          <button
            className="place-order-button button-primary"
            data-testid="place-order-button"
            onClick={createOrder}
          >
            Place your order
          </button>
        </div>
      )}
    </>
  );
}
