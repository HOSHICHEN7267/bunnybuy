import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import arrow_right_icon_colored from "../assets/arrow_right_icon_colored.svg";
import { CartItem } from "../interfaces";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import { MyOrder } from "../interfaces";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const cartItems: CartItem[] = location.state?.cart ?? [];
  const carttotalPrice = location.state?.totalprice ?? 0;
  const shippingFee = carttotalPrice >= 1000 ? 0 : 60;
  const total = carttotalPrice + shippingFee;

  const { user } = useAuth();
  console.log("🚀 user:", user);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    payment: "cod",
    delivery_method: "面交",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if(!form.name || !form.phone || !form.address) {
      alert("請填寫所有聯絡資訊！");
      return;
    }

    try {
      const payload: Omit<MyOrder, "request_id" | "created_at"> = {
        buyer_id: user?.user_id || "aaa", // 從登入資訊抓，或你要用 localStorage 暫存
        buyer_name: user?.username || form.name,
        payment: form.payment,
        delivery_method: form.delivery_method,
        delivery_address: form.address,
        total_price: total,
        products: cartItems.map((item) => ({
          product_id: item.product_id,
          quantity: item.quantity,
          status: "幫你找",
        })),
      };

      await axios.post("http://localhost:3000/purchase-requests", payload);

      alert("✅ 訂單已送出！");
      localStorage.removeItem("cartItems");
      navigate("/");
    } catch (err) {
      console.error("❌ 訂單送出失敗", err);
      alert("訂單送出失敗，請稍後再試。");
    }
  };


  return (
    <>
      <Navbar />

      <div className="px-6 md:px-16 lg:px-32 py-10 min-h-screen bg-gray-50">
        <h1 className="text-2xl font-bold mb-8">結帳資訊</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* 左邊：購買項目 */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">購買項目</h2>
            <div className="space-y-4 text-sm">
              {cartItems.map((item) => (
                <div
                  key={item.product_id}
                  className="flex items-center gap-4 border-b pb-3"
                >
                  <img
                    src={item.image_list[0]}
                    alt={item.name}
                    className="w-16 h-16 object-contain rounded"
                  />
                  <div className="flex-1">
                    <span className="font-medium truncate whitespace-nowrap overflow-hidden max-w-[150px] inline-block align-middle">
                      {item.name}
                    </span>
                    <span className="font-medium"> × {item.quantity}</span>
                  </div>
                  <div className="text-right font-medium">
                    ${item.discount * item.quantity}
                  </div>
                </div>
              ))}
            </div>
            <div className="text-right pt-4 border-t text-sm text-gray-600">
                總共 {cartItems.length} 項商品
            </div>
          </div>

          {/* 右邊：聯絡資訊 + 訂單摘要（兩塊分開） */}
          <div className="space-y-6">
            {/* 🔹 聯絡資訊區塊 */}
            <form
              onSubmit={handleSubmit}
              className="bg-white p-6 rounded-lg shadow space-y-4"
            >
              <h2 className="text-lg font-semibold">聯絡資訊</h2>

              <div>
                <label className="block text-sm font-medium mb-1">姓名</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">電話</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  收件地址
                </label>
                <input
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  required
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  付款方式
                </label>
                <select
                  name="payment"
                  value={form.payment}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="cod">貨到付款</option>
                  <option value="credit">信用卡</option>
                  <option value="mobilepay">行動支付</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  交貨方式
                </label>
                <select
                  name="delivery_method"
                  value={form.delivery_method}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                >
  
                  <option value="面交">面交</option>
                  <option value="店到店">店到店</option>
                </select>
              </div>

            </form>

            {/* 🔹 訂單摘要區塊 */}
            <div className="bg-white p-6 rounded-lg shadow space-y-3">
              <h2 className="text-lg font-semibold mb-2">訂單摘要</h2>
              <div className="flex justify-between text-sm">
                <span>商品小計</span>
                <span>${carttotalPrice}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>運費</span>
                <span>
                  {shippingFee === 0 ? (
                    <span className="text-gray-500">
                      <s>$60</s>{" "}
                      <span className="text-green-600 font-medium ml-1">
                        免運費
                      </span>
                    </span>
                  ) : (
                    <>${shippingFee}</>
                  )}
                </span>
              </div>
              <div className="flex justify-between text-base font-semibold border-t pt-3 mt-2">
                <span>總金額</span>
                <span>${total}</span>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600 transition mt-3"
              >
                提交訂單
              </button>
            </div>
          </div>
          <button onClick={()=> navigate('/all-products')} className="group flex items-center mt-6 gap-2 text-orange-600">
            <img
            className="group-hover:-translate-x-1 transition"
            src={arrow_right_icon_colored}
            alt="arrow_right_icon_colored"
            />
            Continue Shopping
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Checkout;
