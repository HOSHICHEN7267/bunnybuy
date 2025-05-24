"use client";
import { useState } from "react";
import AuthModal from "./AuthModal";
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
//   const [authMode, setAuthMode] = useState<"login" | "register">("login");

  const toggleModal = () => setShowModal((prev) => !prev);

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
          <Link to="/" className="hover:text-pink-500">首頁</Link>
          <Link to="/all-products" className="hover:text-pink-500">商品總覽</Link>
          <Link to="/order-pool" className="hover:text-pink-500">訂單總覽</Link>
          <Link to="/about" className="hover:text-pink-500">關於我們</Link>
          <Link to="/contact" className="hover:text-pink-500">聯絡我們</Link>
        </div>

        {/* 登入按鈕 */}
        <button
          onClick={toggleModal}
          className="text-sm border px-4 py-1.5 rounded-full hover:bg-pink-100 transition"
        >
          登入 / 註冊
        </button>
      </nav>

      {/* 浮動登入視窗 */}
      {showModal && <AuthModal onClose={() => setShowModal(false)} />}
    </>
  );
};

export default Navbar;
