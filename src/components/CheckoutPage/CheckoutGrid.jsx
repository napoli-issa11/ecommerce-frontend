import { PaymentSummary } from "./PaymentSummary";
import { OrderSummary } from "./OrderSummary";

export function CheckoutGrid({
  deliveryOptions,
  cartItems,
  payment,
  loadCart,
}) {
  return (
    <div className="checkout-grid">
      <OrderSummary
        deliveryOptions={deliveryOptions}
        cartItems={cartItems}
        loadCart={loadCart}
      />
      <PaymentSummary
        payment={payment}
        loadCart={loadCart}
        cartItems={cartItems}
      />
    </div>
  );
}
