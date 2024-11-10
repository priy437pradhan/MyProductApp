import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ProductPage from './components/ui/ProductPage';
import CartPage from './components/ui/CartPage';
import CheckoutPage from './components/ui/CheckoutPage';
import OrderConfirmationPage from './components/ui/OrderConfirmationPage';
import './App.css';
export default  function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
      </Routes>
    </Router>
  );
}

