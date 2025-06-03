import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { MyOrder, Product, SelectedProduct } from "../interfaces";
import { useAuth } from "../contexts/AuthContext";

const OrderListView = () => {
  const navigate = useNavigate();
  const { token } = useAuth();

  /* ---------- state ---------- */
  const [myorders, setMyOrders] = useState<MyOrder[]>([]);
  const [productsMap, setProductsMap] = useState<Map<string, Product>>(new Map());
  const [expandedOrderIds, setExpandedOrders] = useState<Set<string>>(new Set());
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  /* ---------- helper ---------- */
  const toggleExpand = (requestId: string) => {
    setExpandedOrders(prev => {
      const updated = new Set(prev);
      updated.has(requestId) ? updated.delete(requestId) : updated.add(requestId);
      return updated;
    });
  };

  const toggleItemSelection = (requestId: string, productId: string) => {
    const key = `${requestId}_${productId}`;
    setSelectedItems(prev => {
      const updated = new Set(prev);
      updated.has(key) ? updated.delete(key) : updated.add(key);
      return updated;
    });
  };

  /* ---------- fetch 所有訂單＋產品 ---------- */
  const fetchData = useCallback(async () => {
    try {
      const [ordersRes, productsRes] = await Promise.all([
        axios.get("http://localhost:3000/purchase-requests", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:3000/products"),
      ]);
      setMyOrders(ordersRes.data);
      setProductsMap(new Map(productsRes.data.map((p: Product) => [p.product_id, p])));
      setSelectedItems(new Set()); // 清掉舊勾選
    } catch (error) {
      console.error("Fetching error:", error);
    }
  }, [token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  /* ---------- 送往確認頁 ---------- */
  const goToConfirm = () => {
    const selectedProducts: SelectedProduct[] = [];

    selectedItems.forEach((key) => {
      const [request_id, product_id] = key.split("_");
      const order = myorders.find(o => o.request_id === request_id);
      const productItem = order?.products.find(p => p.product_id === product_id);
      const product = productsMap.get(product_id);

      if (order && productItem && product) {
        selectedProducts.push({
          request_id,
          product_id,
          quantity: productItem.quantity,
          price: product.discount,
        });
      }
    });

    if (selectedProducts.length === 0) {
      alert("請先選擇要接單的商品！");
      return;
    }
    navigate("/orderconfirm", { state: { selectedProducts } });
  };

  /* ---------- render ---------- */
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 px-6 md:px-16 lg:px-32 pt-12 pb-20">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-left">訂單總覽</h1>

        <div className="space-y-4">
          {myorders.map((order) => {
            /* 只保留待處理商品 */
            const visibleProducts = order.products.filter(p => p.status === "待處理");
            if (visibleProducts.length === 0) return null;        // 全部被接走就不顯示

            const isExpanded = expandedOrderIds.has(order.request_id);

            return (
              <div key={order.request_id} className="border border-gray-300 rounded-lg bg-white shadow-sm">
                <button
                  onClick={() => toggleExpand(order.request_id)}
                  className="w-full text-left p-4 flex justify-between items-center hover:bg-gray-200 bg-gray-100"
                >
                  <div>
                    <p className="text-lg font-medium">訂單編號：{order.request_id}</p>
                    <p className="text-sm text-gray-500">
                      客戶：{order.buyer_name} ｜ 付款方式：{order.payment}
                    </p>
                  </div>
                  <div className="text-right text-lg text-gray-600">總金額：${order.total_price}</div>
                </button>

                {/* 商品明細 */}
                <div className={`px-4 overflow-hidden transition-all duration-300 ${isExpanded ? "max-h-96 pb-4" : "max-h-0"}`}>
                  <table className="w-full mt-2 border-t pt-2 text-sm">
                    <thead>
                      <tr className="text-left text-gray-600">
                        <th className="py-2">商品名稱</th>
                        <th className="py-2 text-center">數量</th>
                        <th className="py-2 text-center">價格</th>
                        <th className="py-2 text-center">狀態</th>
                        <th className="py-2 text-center">接單</th>
                      </tr>
                    </thead>
                      <tbody>
                        {order.products.map((item) => {
                          const key        = `${order.request_id}_${item.product_id}`;
                          const product    = productsMap.get(item.product_id);
                          const isPending  = item.status === "待處理";
                          const isChecked  = selectedItems.has(key);

                          /* 行樣式：待處理 => 正常；已接單 => 灰底灰字 */
                          const rowClass   = isPending
                            ? "border-b hover:bg-gray-50 transition"
                            : "border-b bg-gray-100 text-gray-400";

                          return (
                            <tr key={key} className={rowClass}>
                              {/* --- 勾選框 --- */}

                              {/* --- 商品（圖＋名，可點跳轉） --- */}
                              <td
                                className="py-3 flex items-center gap-3 cursor-pointer"
                                onClick={() => {
                                  navigate(`/product-detail/${item.product_id}`);
                                  scrollTo(0, 0);               // 若你原本有這行就保留
                                }}
                              >
                                <img
                                  src={product?.image_list?.[0] || "/placeholder.png"}
                                  alt={product?.name}
                                  className="w-10 h-10 rounded object-cover border"
                                />
                                <span>{product?.name ?? "Unknown Product"}</span>
                              </td>

                              {/* --- 數量、價格、小計 --- */}
                              <td className="text-center">{item.quantity}</td>

                              <td className="text-green-600 font-medium">
                                ${(product?.discount ?? 0) * item.quantity}
                              </td>
                              <td className="text-center">
                                {isPending ? (
                                  <span className="text-yellow-600">{item.status}</span>
                                ) : (
                                  <span className="text-gray-400">{item.status}</span>
                                )}
                              </td>
                              <td className="py-3 text-center">
                                <input
                                  type="checkbox"
                                  disabled={!isPending}
                                  checked={isChecked && isPending}
                                  onChange={() =>
                                    isPending && toggleItemSelection(order.request_id, item.product_id)
                                  }
                                  className={isPending ? "" : "cursor-not-allowed"}
                                />
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

        {/* 右下角按鈕 */}
        <button
          onClick={goToConfirm}
          className="fixed bottom-6 right-6 z-50 px-5 py-3 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700"
        >
          🛒 查看接單
        </button>
      </div>
      <Footer />
    </>
  );
};

export default OrderListView;