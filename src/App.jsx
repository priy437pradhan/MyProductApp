import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ProductPage from './components/ui/ProductPage';
import CartPage from './components/ui/CartPage';
import './App.css';
export default  function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </Router>
  );
}
