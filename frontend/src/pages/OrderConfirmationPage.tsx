import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../contexts/AuthContext";
import { Product, SelectedProduct } from "../interfaces";

const OrderConfirmationPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedProducts }: { selectedProducts: SelectedProduct[] } =
    location.state || { selectedProducts: [] };

  const [products, setProducts] = useState<Product[]>([]);

  /* 取得商品資料 (僅一次) */
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("http://localhost:3000/products");
        setProducts(res.data);
      } catch (err) {
        console.error("取得商品失敗", err);
      }
    })();
  }, []);

  const getProductById = (id: string) => products.find(p => p.product_id === id);

  /* 確認接單 */
  const handleConfirmAssignments = async () => {
    const agent_id = user?.user_id ?? "mock-agent";
    const today = new Date().toISOString().split("T")[0];

    try {
      /* 1) 寫入 purchase_assignments */
      await Promise.all(
        selectedProducts.map(item =>
          axios.post(
            "http://localhost:3000/purchase-assignments",
            {
              request_id: item.request_id,
              product_id: item.product_id,
              quantity: item.quantity,
              agent_id,
              status: "已接受",
              delivery_date: today,
            },
            { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
          )
        )
      );

      /* 2) 分組後 PATCH 每張訂單 (只改狀態，不覆蓋整陣列) */
      const grouped: Record<string, SelectedProduct[]> = {};
      selectedProducts.forEach(sp => {
        if (!grouped[sp.request_id]) grouped[sp.request_id] = [];
        grouped[sp.request_id].push(sp);
      });

      await Promise.all(
        Object.entries(grouped).map(async ([request_id, items]) => {
          // 2-1 取得完整 products
          const orderRes = await axios.get(`http://localhost:3000/purchase-requests/${request_id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          });
          const currentProducts = orderRes.data.products as {
            product_id: string;
            quantity: number;
            status: string;
          }[];

          // 2-2 更新狀態
          const updatedProducts = currentProducts.map(p =>
            items.find(i => i.product_id === p.product_id)
              ? { ...p, status: "已接單" }
              : p
          );

          // 2-3 PATCH 回去
          await axios.patch(
            `http://localhost:3000/purchase-requests/${request_id}`,
            { products: updatedProducts },
            { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
          );
        })
      );

      alert("✅ 成功接單！");
      navigate("/order-list");   // 返回清單，自動重新 fetch
    } catch (err) {
      console.error("❌ 接單失敗", err);
      alert("❌ 接單失敗，請稍後再試");
    }
  };

  /* ---------- render ---------- */
  if (selectedProducts.length === 0) {
    return <div className="p-10 text-center">沒有選擇任何商品！</div>;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 px-6 md:px-16 lg:px-32 pt-12 pb-20">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">確認接單商品</h1>

        <div className="space-y-8">
          {selectedProducts.map((item) => {
            const product = getProductById(item.product_id);
            return (
              <div
                key={`${item.request_id}-${item.product_id}`}
                className="border border-gray-300 rounded-lg bg-white shadow-sm"
              >
                <div className="px-6 pt-4 pb-6">
                  <h2 className="text-lg font-semibold mb-2">訂單編號：{item.request_id}</h2>
                  <table className="w-full text-sm border-t">
                    <thead>
                      <tr className="text-left text-gray-600">
                        <th className="py-2">商品名稱</th><th>數量</th><th>價格</th><th>小計</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t">
                        <td className="py-2">
                          {product ? (
                            <Link to={`/product-detail/${item.product_id}`} className="text-blue-500 underline">
                              {product.name}
                            </Link>
                          ) : "讀取中..."}
                        </td>
                        <td>{item.quantity}</td>
                        <td>${item.price}</td>
                        <td>${item.quantity * item.price}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}

          <div className="text-right mt-6">
            <button
              onClick={handleConfirmAssignments}
              className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
            >
              ✅ 確認接單
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrderConfirmationPage;
