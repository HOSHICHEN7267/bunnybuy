import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from 'react-router-dom';
import { Product, YourOrder } from "../interfaces";
import { useState, useEffect } from "react";

const OrderConfirmationPage = () => {

  const { user } = useAuth();
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState<YourOrder[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [editingOrderId, setEditingOrderId] = useState<string | null>(null);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [editingAssignmentId, setEditingAssignmentId] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>("");

  // 抓取 assignments
  useEffect(() => {
    if (!user?.user_id) return;

    const fetchAssignments = async () => {
      try {
        const res = await axios.get("http://localhost:3000/purchase-assignments/my", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
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

  const groupByRequestId = (orders: YourOrder[]) => {
    const map: { [key: string]: YourOrder[] } = {};
    for (const item of orders) {
      if (!map[item.request_id]) {
        map[item.request_id] = [];
      }
      map[item.request_id].push(item);
    }
    return map;
  };

  const grouped = groupByRequestId(assignments);

  const handleStatusSelect = (value: string) => {
    setSelectedStatus(value);
  };

  const handleConfirmStatusChange = async () => {
    if (!editingAssignmentId || !selectedStatus) return;

    try {
      await axios.patch(
        `http://localhost:3000/purchase-assignments/${editingAssignmentId}`,
        { status: selectedStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const res = await axios.get(`http://localhost:3000/purchase-requests/${editingOrderId}`, {
          headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const products = res.data.products || [];
      
      const updatedProducts = products.map((product: Product) => {
        if (product.product_id === editingProductId) {
          return {
            ...product,
            status: selectedStatus, // ✅ 替換成你要修改的欄位與值
          };
        }
        return product;
      });

      // 發送更新請求
      await axios.patch(`http://localhost:3000/purchase-requests/${editingOrderId}`, {
          products: updatedProducts,
      }, {
          headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
      });

      setAssignments((prev) =>
        prev.map((item) =>
          item.assignment_id === editingAssignmentId
            ? { ...item, status: selectedStatus }
            : item
        )
      );

      setEditingAssignmentId(null);
      setSelectedStatus("");
    } catch (error) {
      console.error("更新狀態失敗", error);
      alert("更新失敗");
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "幫你買":
        return "bg-yellow-200 font-semibold text-yellow-700 border-yellow-100";
      case "幫你了":
        return "bg-green-200 text-green-700 border-green-100";
      case "不幫了":
        return "bg-red-200 text-red-700 border-red-100";
      default:
        return "bg-gray-100 text-black-600 border-gray-100";
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 px-6 md:px-16 lg:px-32 pt-12 pb-20">
        <div className="space-y-5">
          <h1 className="text-xl font-semibold mt-6 text-left">幫你買訂單</h1>
          {assignments.length === 0 ? (
            <div className="text-gray-600 text-lg text-center mt-20">
              📭 你目前還沒有接單紀錄喔！
            </div>
          ) : (
            <div className="space-y-8">
              {Object.entries(grouped).map(([requestId, items]) => {
                return (
                  <div key={requestId} className="border border-gray-300 rounded-lg bg-white shadow-sm overflow-hidden">
                    {/* 商品明細 */}
                    <div className="px-4 overflow-hidden transition-all duration-300 ease-in-out max-h-96 pb-4">
                      <div className="mt-6 mb-4 px-4 py-2 bg-gray-200 rounded w-fit text-left">
                        <span className="text-md font-medium text-gray-600">對應的幫我買訂單: </span>
                        <span className="text-sm font-semibold text-gray-500 bg-gray-200 px-2 py-0.5 rounded">
                          {requestId}
                        </span>
                      </div>
                      <table className="w-full table-fixed mt-2 text-sm text-gray-700">
                        <thead className="bg-gray-100 text-gray-700 border-b text-sm">
                          <tr>
                            <th className="w-2/5 text-left py-3">商品</th>
                            <th className="w-1/12 text-center">數量</th>
                            <th className="w-1/6 text-center">價格</th>
                            <th className="w-1/6 text-center">小計</th>
                            <th className="w-1/6 text-center">狀態</th>
                          </tr>
                        </thead>
                        <tbody>
                          {items.map((item) => {
                            const product = getProductById(item.product_id);
                            return (
                              <tr key={item.product_id} className="border-b hover:bg-gray-50 transition">
                                <td
                                  className="py-3 flex items-center gap-3 cursor-pointer w-2/5"
                                  onClick={() => {
                                    navigate(`/product-detail/${item.product_id}`);
                                    scrollTo(0, 0);
                                  }}
                                >
                                  <img
                                    src={product?.image_list[0]}
                                    alt={product?.name}
                                    className="w-10 h-10 rounded object-cover border"
                                  />
                                  <span className="truncate whitespace-nowrap overflow-hidden max-w-[180px]">
                                    {product?.name || "Unknown Product"}
                                  </span>
                                </td>
                                <td className="text-center w-1/12">{item.quantity}</td>
                                <td className="text-center w-1/6">
                                  ${product?.discount ?? 0}
                                  <span className="text-sm font-normal text-gray-800/60 line-through ml-3">
                                    ${product?.price ?? 0}
                                  </span>
                                </td>
                                <td className="text-center w-1/6 text-green-600 font-medium">
                                  ${(product?.discount ?? 0) * item.quantity}
                                </td>
                                <td className="text-center w-1/6">
                                  {editingAssignmentId === item.assignment_id ? (
                                    <div className="flex items-center gap-2 justify-center">
                                      <select
                                        value={selectedStatus || item.status}
                                        onChange={(e) => handleStatusSelect(e.target.value)}
                                        className="border rounded px-2 py-1 text-sm"
                                      >
                                        <option value="幫你買">幫你買</option>
                                        <option value="幫你了">幫你了</option>
                                        <option value="不幫了">不幫了</option>
                                      </select>
                                      <button
                                        className="text-sm text-white bg-pink-500 hover:bg-pink-600 px-2 py-1 rounded"
                                        onClick={handleConfirmStatusChange}
                                      >
                                        確認
                                      </button>
                                    </div>
                                  ) : (
                                    <div className="flex items-center gap-2 justify-center">
                                      <span
                                        className={`px-2 py-0.5 rounded text-sm border ${getStatusStyle(item.status)}`}
                                      >
                                        {item.status}
                                      </span>
                                      <button
                                        className={`text-sm border px-2 py-1 rounded ${
                                          item.status === "幫你買"
                                            ? "hover:bg-pink-50 text-pink-500 border-pink-400"
                                            : "text-gray-400 border-gray-300 cursor-not-allowed"
                                        }`}
                                        disabled={item.status !== "幫你買"}
                                        onClick={() => {
                                          setEditingOrderId(item.request_id);
                                          setEditingProductId(item.product_id);
                                          setEditingAssignmentId(item.assignment_id);
                                          setSelectedStatus(item.status);
                                        }}
                                      >
                                        修改
                                      </button>
                                    </div>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrderConfirmationPage;
