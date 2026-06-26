import { Routes, Route } from 'react-router'
import { CheckoutPage } from './components/CheckoutPage/CheckoutPage'
import { OrderPage } from './components/OrderPage/OrderPage'
import { TrackingPage } from './components/TrackingPage/TrackingPage'
import { HomePage } from './components/HomePage/HomePage'
import { useState, useEffect } from 'react';
import api from './axiosInstance';
import './App.css'

function App() {
  const [cartItems, setCartItems] = useState([]);

  const loadCart = async () => {
        const response = await api.get("/api/cart-items?expand=product")
        setCartItems(response.data);
      }
  useEffect(() => {
      loadCart()
    }, []);
  return (
    <Routes>
      <Route path="/" element={<HomePage cartItems={cartItems} loadCart={loadCart} />} />
      <Route path="/checkout" element={<CheckoutPage cartItems={cartItems} loadCart={loadCart}/>} />
      <Route path="/orders" element={<OrderPage cartItems={cartItems} loadCart={loadCart}/>} />
      <Route path="/tracking/:orderId/:productId" element={<TrackingPage cartItems={cartItems}/>} />
    </Routes>
  )
  
}

export default App
