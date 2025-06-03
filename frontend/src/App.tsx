import { Routes, Route } from 'react-router-dom';
import './App.css';

import HomePage from './pages/HomePage';
import AllProducts from './pages/AllProducts';
import ProductDetail from './pages/ProductDetail';
import OrderListView from './pages/OrderListView';
import Cart from './pages/Cart';
import ProfilePage from './pages/ProfilePage';
import Checkout from './pages/CheckoutPage';
import BunnyBuy from "./pages/BunnyBuy";
import MyOrders from './pages/MyOrders';
import Contact from './pages/Contact';
// import OrderConfirmationPage from './pages/OrderConfirmationPage';


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
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/contact" element={<Contact />} />

        {/* PrivateRoutes */}
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/bunny-buy"
          element={
            <PrivateRoute>
              <BunnyBuy />
            </PrivateRoute>
          }
        />
        <Route
          path="/purchase-request-list"
          element={
            <PrivateRoute>
              <MyOrders />
            </PrivateRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />
        
      </Routes>
    </AuthProvider>
  );
}

export default App;
