import Navbar from "../components/Navbar";
import HeaderSlider from "../components/HeaderSlider";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard"; // 用你已經做好的卡片元件
import { Product } from "../interfaces";
import { useEffect, useState } from "react";
import axios from "axios";

const featuredProducts: Product[] = [
  {
    product_id: "07a52d6c-4fe6-467d-8aea-a17727f055cd",
    name: "Apple AirPods Pro",
    description: "最新第二代，支援主動降噪與空間音訊。",
    price: 7990,
    discount: 6990,
    stock_list: [
      { store_name: "Apple 台灣", stock: 20, provider_id: "user-apple" }
    ],
    status: "available",
    created_at: "2024-01-01T10:00:00Z",
    image_list: ["/products/airpods_pro/product_details_page_apple_earphone_image1.png"]
  },
  {
    product_id: "84f421f2-3c12-4fde-acc9-bd3de2ca5640",
    name: "Dr.Jart+ 保濕霜",
    description: "韓國熱銷修復霜，適合敏感肌，保濕鎮定。",
    price: 980,
    discount: 799,
    stock_list: [
      { store_name: "韓國 Olive Young", stock: 50, provider_id: "user-kor" }
    ],
    status: "available",
    created_at: "2024-02-15T15:30:00Z",
    image_list: ["/products/drjart.png"]
  },
  {
    product_id: "ea425391-dc0b-47d0-94e1-9c601612e089",
    name: "任天堂 Switch 主機",
    description: "內建馬力歐派對，攜帶型遊戲主機首選。",
    price: 9980,
    discount: 8790,
    stock_list: [
      { store_name: "日本 Amazon", stock: 15, provider_id: "user-jp" }
    ],
    status: "available",
    created_at: "2024-03-20T08:45:00Z",
    image_list: ["/products/switch.png"]
  }
];


const HomePage = () => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/products") // ⬅️ 請確認這裡是你的後端 base URL
      .then((response) => {
        setProducts(response.data);
        console.log("Fetched products:", response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch products:", error);
      });
  }, []);

  return (
    <>
      <Navbar />

      {/* Featured Section */}
      <section className="px-6 md:px-16 lg:px-32 py-12 bg-gray-50">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
            🔥 精選商品
          </h2>
          <p className="text-gray-500 text-sm mt-1">精挑細選，熱門推薦</p>
          <div className="w-16 h-1 bg-pink-500 mt-2 mx-auto rounded-full"></div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {products
            .filter((product: Product) => product.product_id === "07a52d6c-4fe6-467d-8aea-a17727f055cd" || product.product_id === "84f421f2-3c12-4fde-acc9-bd3de2ca5640" || product.product_id === "ea425391-dc0b-47d0-94e1-9c601612e089" || product.product_id === "bd9e4b90-5360-4866-8023-88f50b3cc5cb")
            .map((product, index) => (<ProductCard key={index} product={product} />))}
        </div>
      </section>

      <HeaderSlider />

      {/* 在 HomePage 函數內 return 的 JSX 中 Featured Section 和 HeaderSlider 中間加上：*/}
      <section className="px-6 md:px-16 lg:px-32 py-12 bg-gray-50">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
            🎯 熱門分類
          </h2>
          <p className="text-gray-500 text-sm mt-1">快速導覽熱門代購品類</p>
          <div className="w-16 h-1 bg-orange-500 mt-2 mx-auto rounded-full"></div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {[
            { name: "美妝保養", emoji: "💄" },
            { name: "3C 電子", emoji: "💻" },
            { name: "服飾穿搭", emoji: "👕" },
            { name: "母嬰用品", emoji: "🍼" },
            { name: "遊戲娛樂", emoji: "🎮" },
            { name: "保健食品", emoji: "🧴" },
          ].map((category, index) => (
            <div
              key={index}
              className="bg-white hover:bg-pink-50 transition rounded-lg p-6 text-center shadow-sm cursor-pointer border border-gray-200 hover:border-pink-400"
            >
              <div className="text-3xl mb-2">{category.emoji}</div>
              <div className="text-sm font-semibold text-gray-700">{category.name}</div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default HomePage;
