import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import { Product, YourOrder } from "../interfaces";

const OrderConfirmationPage = () => {

  const { user } = useAuth();
  const [assignments, setAssignments] = useState<YourOrder[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  // 抓取 assignments
  useEffect(() => {
    if (!user?.user_id) return;

    const fetchAssignments = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/purchase-assignments?agent_id=${user.user_id}`
        );
        setAssignments(res.data);
      } catch (error) {
        console.error("取得負責商品失敗", error);
      }
    };

    fetchAssignments();
  }, [user?.user_id]);

  // 抓取所有商品資訊（或根據 assignments 中出現過的 product_id 抓取）
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:3000/products");
        setProducts(res.data);
      } catch (error) {
        console.error("取得商品資料失敗", error);
      }
    };

    fetchProducts();
  }, []);

  const getProductById = (id: string) => {
    return products.find(p => p.product_id === id);
  };

  if (!assignments.length) {
    return <div className="p-6 text-red-600">❌ 找不到接單資訊</div>;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 px-6 md:px-16 lg:px-32 pt-12 pb-20">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">我的訂單</h1>

        <div className="space-y-8">
          {assignments.map((item) => {
            const product = getProductById(item.product_id);
            return (
              <div
                key={`${item.request_id}-${item.product_id}`}
                className="border border-gray-300 rounded-lg bg-white shadow-sm overflow-hidden"
              >
                {/* 商品明細 */}
                <div className="px-6 pt-4 pb-6">
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">
                    商品明細
                  </h2>
                  <table className="w-full text-sm text-gray-700 border-t">
                    <thead>
                      <tr className="text-left text-gray-600">
                        <th className="py-2">商品名稱</th>
                        <th>數量</th>
                        <th>價格</th>
                        <th>小計</th>
                        <th>狀態 (你的任務)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t">
                        <td className="py-2">
                          {product ? (
                            <Link
                              to={`/product-detail/${item.product_id}`}
                              className="text-blue-500 underline"
                            >
                              {product.name}
                            </Link>
                          ) : (
                            "讀取中..."
                          )}
                        </td>
                        <td>{item.quantity}</td>
                        <td>${product?.discount ?? "?"}</td>
                        <td>
                          $
                          {product
                            ? item.quantity * product.discount
                            : "?"}
                        </td>
                        <td>{item.status}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrderConfirmationPage;
