import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useEffect} from "react";
import axios from "axios";
import { MyOrder, Product } from "../interfaces";

import { useAuth } from "../contexts/AuthContext";


import ConfirmModal from "../components/ConfirmModal";


const OrderListView = () => {
  const navigate = useNavigate();
  // const [expandedOrderIds, setExpandedOrderIds] = useState<string[]>([]);

  // const toggleExpand = (orderId: string) => {
  //   setExpandedOrderIds((prev) =>
  //     prev.includes(orderId)
  //       ? prev.filter((id) => id !== orderId)
  //       : [...prev, orderId]
  //   );
  // };

  const { user, token } = useAuth(); // ✅ 同時取 user 和 token

  const handleAcceptOrder = async (orderId: string) => {
    const order = myorders.find((o) => o.request_id === orderId);
    if (!order) return;

    const agent_id = user?.user_id ?? "mock-agent";
    const today = new Date().toISOString().split("T")[0];

    const assignments = order.products.map((item) => ({
      product_id: item.product_id,
      quantity: item.quantity,
      request_id: orderId,
      agent_id,
      status: "已接受",
      delivery_date: today,
    }));
    
    const data = order.products.map((item) => ({
      product_id: item.product_id,
      quantity: item.quantity,
      status:"進行中",
    }));
    console.log("data", data);

    try {
      // 1. 新增 purchase_assignments
      await Promise.all(
        assignments.map((a) =>
          axios.post("http://localhost:3000/purchase-assignments", a)
        )
      );

      
      // 2. 更新 purchase_request 狀態為「進行中」
      await axios.patch(
        `http://localhost:3000/purchase-requests/${orderId}`,
        { products: data },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(`✅ 已成功接單，狀態更新為進行中`);
      
      // 你也可以在這更新前端狀態，避免重複點擊
    } catch (err) {
      console.error("❌ 接單或狀態更新失敗", err);
      alert("接單失敗，請稍後再試！");
    }
  };

  const [expandedOrderIds, setExpandedOrders] = useState<Set<string>>(new Set());
  const toggleExpand = (requestId: string) => {
      setExpandedOrders((prev) => {
          const updated = new Set(prev);
          if (updated.has(requestId)) {
              updated.delete(requestId);
          } else {
              updated.add(requestId);
          }
          return updated;
      });
  };
  const [confirmOrderId, setConfirmOrderId] = useState<string | null>(null);

  const [myorders, setMyOrders] = useState<MyOrder[]>([]);
  const [productsMap, setProductsMap] = useState<Map<string, Product>>(new Map());
  useEffect(() => {
      const fetchData = async () => {
          try {
              const [ordersRes, productsRes] = await Promise.all([
                  axios.get("http://localhost:3000/purchase-requests"),
                  axios.get("http://localhost:3000/products"),
              ]);
              console.log("Fetched orders:", ordersRes.data);
              console.log("Fetched products:", productsRes.data);
              setMyOrders(ordersRes.data);
              setProductsMap(new Map<string, Product>(
                (productsRes.data as Product[]).map(p => [p.product_id, p])
              ));
          } 
          catch (error) {
              console.error("Fetching error:", error);
          }
      };
  fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 px-6 md:px-16 lg:px-32 pt-12 pb-20">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">訂單總覽</h1>
        <div className="space-y-4">
          {myorders.map((order) => {
            const isExpanded = expandedOrderIds.has(order.request_id);
            const needProcessed = order.products.some(item => item.status === "待處理");
            if (!needProcessed) {
              return null; // 跳過已處理的訂單
            }
            return (
              <div
                key={order.request_id}
                className="border border-gray-300 rounded-lg bg-white shadow-sm transition-all"
              >
                <button
                  onClick={() => toggleExpand(order.request_id)}
                  className="w-full text-left p-4 flex justify-between items-center hover:bg-gray-200 bg-gray-100"
                >
                  <div>
                    <p className="text-lg font-medium text-gray-700">
                      訂單編號：{order.request_id}
                    </p>
                    <p className="text-sm text-gray-500">
                      客戶：{order.buyer_name} ｜ 付款方式：{order.payment}
                    </p>
                  </div>
                  <div className="text-right text-lg text-gray-600">
                    總金額：${order.total_price}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setConfirmOrderId(order.request_id); // ➤ 開啟 modal
                    }}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ml-4"
                  >
                    接單
                  </button>
                </button>

                <div
                  className={`px-4 overflow-hidden transition-all duration-300 ease-in-out ${
                    isExpanded ? "max-h-96 pb-4" : "max-h-0"
                  }`}
                >
                  <table className="w-full mt-2 border-t pt-2 text-sm text-gray-700">
                    <thead>
                      <tr className="text-left text-gray-600">
                        <th className="py-2">商品名稱</th>
                        <th>數量</th>
                        <th>價格</th>
                        <th>狀態</th>
                      </tr>
                    </thead>
                    <tbody>
                    {order.products.map((item, index) => {
                      const product = productsMap.get(item.product_id);

                      if (!product) {
                        // 找不到產品時，可以跳過或顯示預設內容
                        return (
                          <tr key={index} className="border-t">
                            <td className="py-2 text-red-500">產品不存在</td>
                            <td>{item.quantity}</td>
                            <td>$0</td>
                            <td>-</td>
                          </tr>
                        );
                      }

                      return (
                        <tr key={index} className="border-t">
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
                          <td>${product.discount}</td>
                          <td>{item.status}</td>
                        </tr>
                      );
                    })}
                    </tbody>
                  </table>

                </div>
              </div>
            );
          })}
        <button
          onClick={() => {
            navigate("/purchase-assign-list", {
            });
          }}
          className="fixed bottom-6 right-6 z-50 px-5 py-3 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition"
        >
          🛒 查看接單
        </button>
        </div>
        {confirmOrderId && (
          <ConfirmModal
            message="你確定要接下這筆訂單嗎？"
            onCancel={() => setConfirmOrderId(null)}
            onConfirm={() => {
              handleAcceptOrder(confirmOrderId);
              setConfirmOrderId(null);
            }}
          />
        )}
      </div>
      <Footer />
    </>
  );

};

export default OrderListView;
