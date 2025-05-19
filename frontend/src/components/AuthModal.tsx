const AuthModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl w-[90%] max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-3 text-gray-400 hover:text-gray-700 w-6 h-6 flex items-center justify-center text-xl bg-white"
        >
          &times;
        </button>

        <h2 className="text-xl font-bold text-center mb-4 text-black">登入或註冊</h2>

        <form className="space-y-4">
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full border px-3 py-2 rounded mt-1"
              placeholder="輸入你的 Email"
            />
          </div>
          <div>
            <label className="text-sm font-medium">密碼</label>
            <input
              type="password"
              className="w-full border px-3 py-2 rounded mt-1"
              placeholder="輸入密碼"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600 transition"
          >
            登入
          </button>
          <p className="text-center text-sm text-gray-500">
            尚未有帳號？<a href="#" className="text-pink-500 hover:underline">註冊</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
