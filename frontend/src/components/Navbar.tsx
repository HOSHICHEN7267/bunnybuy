"use client";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import AuthModal from "./AuthModal";
import logo from '../assets/logo.png';

import UserMenu from "./UserMenu";

const Navbar = () => {
  
  const [showModal, setShowModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("isLoggedIn");
    if (stored === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true); 
    localStorage.setItem("isLoggedIn", "true");
    setShowModal(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
  };

  return (
    <>
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-4 border-b border-gray-200 text-gray-800 bg-white shadow-sm z-50">
        {/* Logo */}
        <Link to="/">
          <img
            src={logo}
            alt="BunnyBuy Logo"
            className="w-28 md:w-32 cursor-pointer"
          />
        </Link>

        {/* Menu */}
        <div className="hidden md:flex items-center gap-6 text-sm">
          <Link to="/" className="text-base hover:text-pink-500">首頁</Link>
          <Link to="/all-products" className="text-base hover:text-pink-500">商品總覽</Link>
          <Link to="/order-list" className="text-base hover:text-pink-500">訂單總覽</Link>
          <Link to="/about" className="text-base hover:text-pink-500">關於我們</Link>
          <Link to="/contact" className="text-base hover:text-pink-500">聯絡我們</Link>
        </div>

        {/* 登入按鈕 */}
        <div className="flex items-center">
          {isLoggedIn ? (
            <UserMenu onLogout={handleLogout} />
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

      {/* 浮動登入視窗 */}
      {showModal && (
        <AuthModal onClose={() => setShowModal(false)} onLogin={handleLogin} />
      )}
    </>
  );
};

export default Navbar;
