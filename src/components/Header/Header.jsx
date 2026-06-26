import "./Header.css";
import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
export function Header({ cartItems }) {
  const [searchParams] = useSearchParams();
  const searchText = searchParams.get("search");

  const [inputSearch, setInputSearch] = useState(searchText || "");
  const navigate = useNavigate();
  const inputText = (event) => {
    setInputSearch(event.target.value);
  };
  let totalQuantity = 0;

  cartItems.forEach((cartItem) => {
    totalQuantity += cartItem.quantity;
  });
  const searchProduct = () => {
    console.log(inputSearch);
    navigate(`/?search=${inputSearch}`);
  };

  return (
    <div className="header">
      <div className="left-section">
        <Link to="/" className="header-link">
          <img className="logo" src="/images/logo-white.png" />
          <img className="mobile-logo" src="/images/mobile-logo-white.png" />
        </Link>
      </div>

      <div className="middle-section">
        <input
          className="search-bar"
          type="text"
          placeholder="Search"
          value={inputSearch}
          onChange={inputText}
        />

        <button className="search-button" onClick={searchProduct}>
          <img className="search-icon" src="/images/icons/search-icon.png" />
        </button>
      </div>

      <div className="right-section">
        <Link to="/orders" className="orders-link header-link">
          <span className="orders-text">Orders</span>
        </Link>

        <Link to="/checkout" className="cart-link header-link">
          <img className="cart-icon" src="/images/icons/cart-icon.png" />
          <div className="cart-quantity">{totalQuantity}</div>
          <div className="cart-text">Cart</div>
        </Link>
      </div>
    </div>
  );
}
