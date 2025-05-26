import React, { useState } from "react";

interface AuthModalProps {
  onClose: () => void;
  onLogin: () => void;
}

const AuthModal = ({ onClose, onLogin }: AuthModalProps) => {

  const [mode, setMode] = useState<"login" | "register">("login");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (mode === "register") {
      if (password !== confirmPassword) {
        alert("密碼不一致，請重新確認。");
        return;
      }

      // 未來串接 API
      // 將 User 輸入的資料儲存到 User 資料庫

      setMode("login");
    }

    if (mode === "login") {

      // 未來串接 API
      // 連接到 User 資料庫驗證

      onLogin();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl w-[90%] max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-3 text-gray-400 hover:text-gray-700 w-6 h-6 flex items-center justify-center text-xl bg-white"
        >
          &times;
        </button>

        <h2 className="text-xl font-bold text-center mb-4 text-black">
          {mode === "login" ? "登入" : "註冊"}
        </h2>

        <form className="space-y-4 text-left" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border px-3 py-2 rounded mt-1"
              placeholder="輸入你的 Email"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium">密碼</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border px-3 py-2 rounded mt-1"
              placeholder="輸入密碼"
              required
            />
          </div>
          {mode === "register" && (
            <div>
              <label className="text-sm font-medium">確認密碼</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border px-3 py-2 rounded mt-1"
                placeholder="再次輸入密碼"
                required
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600 transition"
          >
            {mode === "login" ? "登入" : "註冊"}
          </button>

          <p className="text-center text-sm text-gray-500">
            {mode === "login" ? (
              <>
                尚未有帳號？{" "}
                <button
                  type="button"
                  onClick={() => setMode("register")}
                  className="text-pink-500 hover:underline"
                >
                  註冊
                </button>
              </>
            ) : (
              <>
                已經有帳號了？{" "}
                <button
                  type="button"
                  onClick={() => setMode("login")}
                  className="text-pink-500 hover:underline"
                >
                  登入
                </button>
              </>
            )}
          </p>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
