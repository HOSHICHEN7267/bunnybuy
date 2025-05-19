"use client";
import { useState } from "react";
import AuthModal from "./AuthModal";
import logo from '../assets/logo.png';

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
//   const [authMode, setAuthMode] = useState<"login" | "register">("login");

  const toggleModal = () => setShowModal((prev) => !prev);

  return (
    <>
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-4 border-b border-gray-200 text-gray-800 bg-white shadow-sm z-50">
        {/* Logo */}
        <img
          src={logo}
          alt="BunnyBuy Logo"
          className="w-28 md:w-32 cursor-pointer"
          onClick={() => (window.location.href = "/")}
        />

        {/* Menu */}
        <div className="hidden md:flex items-center gap-6 text-sm">
          <a className="cursor-pointer hover:text-pink-500" onClick={() => (window.location.href = "/")}>首頁</a>
          <a className="cursor-pointer hover:text-pink-500" onClick={() => (window.location.href = "/all-products")}>商品總覽</a>
          <a className="cursor-pointer hover:text-pink-500" onClick={() => (window.location.href = "/about")}>關於我們</a>
          <a className="cursor-pointer hover:text-pink-500" onClick={() => (window.location.href = "/contact")}>聯絡我們</a>
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
