import { useState } from "react";
import { Link } from 'react-router-dom';
import AuthModal from "./AuthModal";
import logo from '../assets/logo.png';
import UserMenu from "./UserMenu";

import { useAuth } from "../contexts/AuthContext"; // ✅ 匯入 context

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const { user, login, logout } = useAuth(); // ✅ 使用 context

  return (
    <>
      <nav className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-4 border-b border-gray-200 text-gray-800 bg-white shadow-sm z-50">
        <Link to="/">
          <img
            src={logo}
            alt="BunnyBuy Logo"
            className="w-28 md:w-32 cursor-pointer"
          />
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm">
          <Link to="/" className="text-base hover:text-pink-500">首頁</Link>
          <Link to="/all-products" className="text-base hover:text-pink-500">商品總覽</Link>
          <Link to="/order-list" className="text-base hover:text-pink-500">訂單總覽</Link>
          {/* <Link to="/about" className="text-base hover:text-pink-500">關於我們</Link> */}
          <Link to="/contact" className="text-base hover:text-pink-500">聯絡我們</Link>
        </div>

        <div className="flex items-center">
          {user ? (
            <UserMenu onLogout={logout} /> // ✅ 登出時使用 context logout
          ) : (
            <button
              onClick={() => setShowModal(true)}
              className="text-sm border px-4 py-1.5 rounded-full hover:bg-pink-100 transition"
            >
              登入 / 註冊
            </button>
          )}
        </div>
      </nav>

      {showModal && (
        <AuthModal onClose={() => setShowModal(false)} onLogin={login} /> // ✅ 使用 context login
      )}
    </>
  );
};

export default Navbar;
