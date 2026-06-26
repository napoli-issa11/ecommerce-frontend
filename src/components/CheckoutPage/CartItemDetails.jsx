import { formatMoney } from "../../utils/formatMoney";
import { useState } from "react";
import api from "../../axiosInstance";
import dayjs from "dayjs";

export function CartItemDetails({ cartItem, deliveryOptions, loadCart }) {
  const [quantity, setQuantity] = useState(cartItem.quantity);
  const updateQuantity = (event) => {
    setQuantity(event.target.value);
  };
  const keyDown = (event) => {
    if (event.key === "Enter") {
      clickUpdate();
    }
    if (event.key === "Escape") {
      setIsUpdate(false);
    }
  };
  const [isUpdate, setIsUpdate] = useState(false);
  const clickUpdate = async () => {
    if (isUpdate) {
      await api.put(`/api/cart-items/${cartItem.productId}`, {
        quantity: Number(quantity),
      });
      await loadCart();
      setIsUpdate(false);
    } else {
      setIsUpdate(true);
    }
  };
  const deleteProduct = async () => {
    await api.delete(`/api/cart-items/${cartItem.productId}`);
    await loadCart();
  };
  return (
    <div className="cart-item-details-grid">
      <img className="product-image" src={cartItem.product.image} />

      <div className="cart-item-details">
        <div className="product-name">{cartItem.product.name}</div>
        <div className="product-price">
          {formatMoney(cartItem.product.priceCents)}
        </div>
        <div className="product-quantity">
          <span>
            Quantity:
            {isUpdate ? (
              <input
                type="text"
                style={{ width: "50px" }}
                value={quantity}
                onChange={updateQuantity}
                onKeyDown={keyDown}
              />
            ) : (
              <span className="quantity-label">{cartItem.quantity}</span>
            )}
          </span>
          <span
            className="update-quantity-link link-primary"
            onClick={clickUpdate}
          >
            Update
          </span>
          <span
            className="delete-quantity-link link-primary"
            onClick={deleteProduct}
          >
            Delete
          </span>
        </div>
      </div>

      <div className="delivery-options">
        <div className="delivery-options-title">Choose a delivery option:</div>
        {deliveryOptions.map((deliveryOption) => {
          let shippingPrice = "FREE Shipping";
          if (deliveryOption.priceCents > 0) {
            shippingPrice = `${formatMoney(deliveryOption.priceCents)} - Shipping`;
          }
          const updateDeliveryDate = async () => {
            await api.put(`/api/cart-items/${cartItem.productId}`, {
              deliveryOptionId: deliveryOption.id,
            });
            await loadCart();
          };
          return (
            <div
              key={deliveryOption.id}
              className="delivery-option"
              onClick={updateDeliveryDate}
            >
              <input
                type="radio"
                checked={deliveryOption.id === cartItem.deliveryOptionId}
                onChange={() => {}}
                className="delivery-option-input"
                name={`delivery-option-${cartItem.productId}`}
              />
              <div>
                <div className="delivery-option-date">
                  {dayjs(deliveryOption.estimatedDeliveryTimeMs).format(
                    "dddd, MMMM D",
                  )}
                </div>
                <div className="delivery-option-price">{shippingPrice}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
