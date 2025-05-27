import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Cart = () => {

  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([
    {
      id: "1",
      name: "Bulbasaur",
      price: 100,
      discount: 99,
      quantity: 1,
      image: "/products/Bulbasaur.png",
    },
    {
      id: "2",
      name: "Charmander",
      price: 200,
      discount: 199,
      quantity: 2,
      image: "/products/Charmander.png",
    },
  ]);

  const updateQuantity = (id: string, amount: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const total = cartItems.reduce(
    (acc, item) => acc + item.discount * item.quantity,
    0
  );

  return (
    <>
      <Navbar />

      <div className="px-6 md:px-16 lg:px-32 py-10 min-h-screen">
        <h1 className="text-2xl font-semibold mb-6 text-left ">購物車</h1>

        {cartItems.length === 0 ? (
          <p className="text-gray-500">目前購物車是空的。</p>
        ) : (
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 border-b pb-4"
              >
                <div className="cursor-pointer group relative bg-gray-500/10 rounded-lg w-24 h-24 flex items-center justify-center" onClick={() => { navigate(`/product-detail/${item.id}`); scrollTo(0, 0) }}>
                    <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-contain"
                    />
                </div>
                <div className="flex-1 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <p className="font-medium text-left text-base md:text-lg">{item.name}</p>
                  <p className="text-base font-semibold mt-6 md:text-center">
                    ${item.discount}
                    <span className="text-sm font-normal text-gray-800/60 line-through ml-3">
                        ${item.price}
                    </span>
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      className="px-2 py-1 border rounded"
                      onClick={() => updateQuantity(item.id, -1)}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="px-2 py-1 border rounded"
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-gray-600">
                    ${item.discount * item.quantity}
                  </p>
                  <button
                    className="text-xs text-red-500 mt-2 hover:underline"
                    onClick={() => removeItem(item.id)}
                  >
                    移除
                  </button>
                </div>
              </div>
            ))}

            <div className="flex justify-between items-center mt-6">
              <p className="text-xl font-semibold">總金額：${total}</p>
              <button className="bg-pink-500 text-white px-6 py-2 rounded hover:bg-pink-600 transition" onClick={() => navigate("/checkout")}>
                前往結帳
              </button>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Cart;
