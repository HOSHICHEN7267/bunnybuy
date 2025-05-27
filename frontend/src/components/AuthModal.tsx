import React, { useState } from "react";

interface AuthModalProps {
  onClose: () => void;
  onLogin: (token: string, user: any) => void;
}

const AuthModal = ({ onClose, onLogin }: AuthModalProps) => {
  const [mode, setMode] = useState<"login" | "register">("login");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (mode === "register") {
      if (password !== confirmPassword) {
        setError("❌ 密碼不一致，請重新確認。");
        return;
      }

      try {
        const res = await fetch("http://localhost:3000/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, email, password }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "註冊失敗");

        alert("註冊成功，請登入！");
        setMode("login");
      } catch (err: any) {
        if (err.message.includes('已存在') || err.message.includes('Duplicate')) {
          setError("❌ 使用者名稱或 Email 已被註冊");
        } else {
          setError(err.message);
        }
      }
    }

    if (mode === "login") {
      try {
        const res = await fetch("http://localhost:3000/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "登入失敗");

        const { access_token, user } = data;
        onLogin(access_token, user); // ✅ 直接存入 context
        onClose();
      } catch (err: any) {
        setError(err.message);
      }
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
          {mode === "register" && (
            <div>
              <label className="text-sm font-medium">使用者名稱</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border px-3 py-2 rounded mt-1"
                placeholder="輸入使用者名稱"
                required
              />
            </div>
          )}
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

          {error && <p className="text-red-500 text-sm">{error}</p>}

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
