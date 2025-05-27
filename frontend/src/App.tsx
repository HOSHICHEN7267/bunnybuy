import { Routes, Route } from 'react-router-dom';
import './App.css';

import HomePage from './pages/HomePage';
import AllProducts from './pages/AllProducts';
import ProductDetail from './pages/ProductDetail';
import OrderListView from './pages/OrderListView';
import Cart from './pages/Cart';
import ProfilePage from './pages/ProfilePage';
import Checkout from './pages/CheckoutPage';

import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './routes/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/order-list" element={<OrderListView />} />
        <Route path="/all-products" element={<AllProducts />} />
        <Route path="/product-detail/:productId" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />

        {/* ✅ 受保護的頁面 */}
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
