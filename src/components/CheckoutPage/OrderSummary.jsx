import { CartItemDetails } from "./CartItemDetails";
import { DeliveryDate } from "./DeliveryDate";
export function OrderSummary({ deliveryOptions, cartItems, loadCart }) {
  return (
    <div className="order-summary">
      {cartItems.map((cartItem) => {
        const selectedDeliveryOption = deliveryOptions.find(
          (deliveryOption) => {
            return deliveryOption.id === cartItem.deliveryOptionId;
          },
        );

        return (
          <div key={cartItem.productId} className="cart-item-container">
            <DeliveryDate selectedDeliveryOption={selectedDeliveryOption} />

            <CartItemDetails
              cartItem={cartItem}
              deliveryOptions={deliveryOptions}
              loadCart={loadCart}
            />
          </div>
        );
      })}
    </div>
  );
}
