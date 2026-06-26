import api from "../../axiosInstance";
import { Fragment } from "react";
import { Link, useNavigate } from "react-router";
export function ProductOrder({ order, orderProduct, loadCart }) {
  const navigate = useNavigate();
  const addToCart = async () => {
    await api.post(`/api/cart-items`, {
      productId: orderProduct.productId,
      quantity: 1,
    });
    navigate("/checkout");
    await loadCart();
  };
  return (
    <Fragment>
      <div className="product-image-container">
        <img src={orderProduct.product.image} />
      </div>

      <div className="product-details">
        <div className="product-name">{orderProduct.product.name}</div>
        <div className="product-delivery-date">Arriving on: August 15</div>
        <div className="product-quantity">
          Quantity: {orderProduct.quantity}
        </div>
        <button className="buy-again-button button-primary">
          <img className="buy-again-icon" src="/images/icons/buy-again.png" />
          <span className="buy-again-message" onClick={addToCart}>
            Add to Cart
          </span>
        </button>
      </div>

      <div className="product-actions">
        <Link to={`/tracking/${order.id}/${orderProduct.product.id}`}>
          <button className="track-package-button button-secondary">
            Track package
          </button>
        </Link>
      </div>
    </Fragment>
  );
}
