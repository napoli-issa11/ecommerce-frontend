import { useState } from "react";
import { formatMoney } from "../../utils/formatMoney";
import api from "../../axiosInstance";

export function ProductCard({ product, loadCart }) {
  const [added, setAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const updateQuantity = (event) => {
    setQuantity(Number(event.target.value));
  };
  const addedToCart = async () => {
    await api.post("/api/cart-items", {
      productId: product.id,
      quantity: quantity,
    });
    await loadCart();
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="product-container" data-testid="product-container">
      <div className="product-image-container">
        <img
          className="product-image"
          data-testid="product-image"
          src={product.image}
        />
      </div>

      <div className="product-name limit-text-to-2-lines">{product.name}</div>

      <div className="product-rating-container">
        <img
          className="product-rating-stars"
          src={`/images/ratings/rating-${product.rating.stars * 10}.png`}
          data-testid="stars-image"
        />
        <div className="product-rating-count link-primary">
          {product.rating.count}
        </div>
      </div>

      <div className="product-price">{formatMoney(product.priceCents)}</div>

      <div className="product-quantity-container">
        <select
          value={quantity}
          onChange={updateQuantity}
          data-testid="quantity-selector"
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div className="product-spacer"></div>

      <div className="added-to-cart" style={{ opacity: added ? 1 : 0 }}>
        <img src="/images/icons/checkmark.png" />
        Added
      </div>

      <button
        className="add-to-cart-button button-primary"
        onClick={addedToCart}
        data-testid="add-to-cart-button"
      >
        Add to Cart
      </button>
    </div>
  );
}
