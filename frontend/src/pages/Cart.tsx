import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import arrow_right_icon_colored from "../assets/arrow_right_icon_colored.svg";
import { CartItem } from "../interfaces";

const Cart = () => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState<any[]>([]);

  // ✅ 初始讀取 localStorage 中的購物車資料
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem("cartItems");
      if (storedCart) {
        const parsed = JSON.parse(storedCart);
        if (Array.isArray(parsed)) {
          const validated = parsed.map((item: any) => ({
            ...item,
            image_list: Array.isArray(item.image_list) ? item.image_list : [],
          }));
          setCartItems(validated);
        } else {
          setCartItems([]); // 如果不是陣列就設空
        }
      } else {
        setCartItems([]); // 沒資料也設空
      }
    } catch (error) {
      console.error("⚠️ localStorage 資料壞掉，已清空", error);
      localStorage.removeItem("cartItems");
      setCartItems([]);
    }
  }, []);

  // ✅ 同步更新到 localStorage
  const syncToLocalStorage = (items: any[]) => {
    setCartItems(items);
    localStorage.setItem("cartItems", JSON.stringify(items));
  };

  const updateQuantity = (product_id: string, amount: number) => {
    const updated = cartItems.map((item) =>
      item.product_id === product_id
        ? { ...item, quantity: Math.max(1, item.quantity + amount) }
        : item
    );
    syncToLocalStorage(updated);
  };

  const removeItem = (product_id: string) => {
    const updated = cartItems.filter((item) => item.product_id !== product_id);
    syncToLocalStorage(updated);
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.discount * item.quantity,
    0
  );

  const totalItems = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  return (
    <>
      <Navbar />

      <div className="px-6 md:px-16 lg:px-32 py-10 min-h-screen">
        <div className="flex items-center justify-between mb-8 border-b border-gray-500/30 pb-6">
          <p className="text-2xl font-semibold md:text-3xl text-gray-500">
            Your Cart
          </p>
          <p className="text-lg md:text-xl text-gray-500/80">{totalItems} Items</p>
        </div>

        {cartItems.length === 0 ? (
          <p className="text-gray-500">目前購物車是空的。</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-separate border-spacing-y-4">
              <thead className="text-gray-500 text-sm md:text-base border-b border-gray-300">
                <tr>
                  <th className="px-2">Product Details</th>
                  <th className="px-2">Price</th>
                  <th className="px-2">Quantity</th>
                  <th className="px-2">Subtotal</th>
                  <th className="px-2"></th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item: CartItem) => (
                  <tr key={item.product_id} className="align-middle">
                    <td className="flex items-center gap-4">
                      <div
                        className="cursor-pointer group relative bg-gray-500/10 rounded-lg w-20 h-20 flex items-center justify-center"
                        onClick={() => {
                          navigate(`/product-detail/${item.product_id}`);
                          scrollTo(0, 0);
                        }}
                      >
                        <img
                          src={item.image_list[0]}
                          alt={item.name}
                          className="w-16 h-16 object-contain"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium truncate whitespace-nowrap overflow-hidden max-w-[180px]">{item.name}</span>
                        <button
                          className="text-xs text-red-500 hover:underline w-20 h-8 text-center"
                          onClick={() => removeItem(item.product_id)}
                        >
                          Remove
                        </button>
                      </div>
                    </td>
                    <td>${item.discount}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <button
                          className="px-2 py-1 border rounded"
                          onClick={() => updateQuantity(item.product_id, -1)}
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          className="px-2 py-1 border rounded"
                          onClick={() => updateQuantity(item.product_id, 1)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>${(item.discount * item.quantity).toFixed(2)}</td>
                    <td></td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* 總金額與結帳按鈕 */}
            <div className="flex justify-between items-center mt-8">
              <p className="text-xl font-semibold">
                總金額：${totalPrice.toFixed(2)}
              </p>
              <button
                className="bg-pink-500 text-white px-6 py-2 rounded hover:bg-pink-600 transition"
                onClick={() =>
                  navigate("/checkout", {
                    state: { totalprice: totalPrice, cart: cartItems },
                  })
                }
              >
                前往結帳
              </button>
            </div>

            <button onClick={()=> navigate('/all-products')} className="group flex items-center mt-6 gap-2 text-orange-600 bg-white">
              <img
              className="group-hover:-translate-x-1 transition"
              src={arrow_right_icon_colored}
              alt="arrow_right_icon_colored"
              />
              Continue Shopping
            </button>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Cart;
