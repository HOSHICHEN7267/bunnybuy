import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import cartIcon from "../assets/cart_icon.svg";
import logoutIcon from "../assets/logout.png";
import avatarImg from "../assets/user_icon.svg";
import profileIcon from "../assets/profile_icon.jpg"; // ✅ 建議你新增一個個人頁面的 icon

const UserMenu = ({ onLogout }: { onLogout: () => void }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !(menuRef.current as any).contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <img
        src={avatarImg}
        alt="user"
        className="w-8 h-8 rounded-full cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      />

      {open && (
        <div className="absolute right-0 mt-2 w-60 bg-white shadow-lg rounded-xl z-50 py-2 border">
          <div className="px-4 py-2 border-b">
            <p className="font-medium text-sm text-gray-800">UserName</p>
            <p className="text-xs text-gray-500">UserEmail@gmail.com</p>
          </div>

          {/* ✅ 新增個人檔案按鈕 */}
          <button
            onClick={() => {
              navigate("/profile");
              setOpen(false); // 點擊後關閉選單
            }}
            className="w-full text-left flex items-center px-4 py-2 text-sm hover:bg-gray-50"
          >
            <img src={profileIcon} alt="Profile" className="w-4 h-4 mr-2" />
            個人檔案
          </button>

          <button
            onClick={() => navigate("/cart")}
            className="w-full text-left flex items-center px-4 py-2 text-sm hover:bg-gray-50"
          >
            <img src={cartIcon} alt="Cart" className="w-4 h-4 mr-2" />
            購物車
          </button>

          <button
            onClick={onLogout}
            className="w-full text-left flex items-center px-4 py-2 text-sm text-red-500 hover:bg-gray-50"
          >
            <img src={logoutIcon} alt="Logout" className="w-4 h-4 mr-2" />
            登出
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
