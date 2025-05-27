import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link, useLocation } from "react-router-dom";
import orderIcon from "../assets/icon-order.png";

// 多筆訂單資料結構
type OrderItem = {
  product_id: string;
  name: string;
  quantity: number;
  price: number;
  discount: number;
  image: string[];
};

type Order = {
  request_id: string;
  buyer_id: string;
  products: OrderItem[];
  total_price: number;
  payment: string;
  created_at: string;
  status: string;
};

const OrderConfirmationPage = () => {
  const location = useLocation();
  const orders = location.state?.orders as Order[];

  if (!orders || orders.length === 0) {
    return <div className="p-6 text-red-600">❌ 找不到訂單資訊</div>;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 px-6 md:px-16 lg:px-32 pt-12 pb-20">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">我的訂單</h1>

        <div className="space-y-8">
          {orders.map((order) => (
            <div
              key={order.request_id}
              className="border border-gray-300 rounded-lg bg-white shadow-sm overflow-hidden"
            >
              {/* 訂單圖片 + 訂單資訊 */}
              <div className="flex flex-col md:flex-row">
                <img
                  src={orderIcon}
                  alt="訂單圖片"
                  className="w-full md:w-1/3 object-contain max-h-64 p-4"
                />
                <div className="p-6 flex-1">
                  <p className="text-lg font-medium text-gray-700 mb-2">
                    訂單編號：{order.request_id}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    客戶：
                    <Link
                      to={`/users/${order.buyer_id}`}
                      className="text-blue-500 underline"
                    >
                      {order.buyer_id}
                    </Link>
                  </p>
                  <p className="text-sm text-gray-600">狀態：{order.status}</p>
                  <p className="text-sm text-gray-600">付款方式：{order.payment}</p>
                  <p className="text-lg font-bold text-gray-800 mt-4">
                    總金額：${order.total_price}
                  </p>
                </div>
              </div>

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
                    </tr>
                  </thead>
                  <tbody>
                    {order.products.map((item, idx) => (
                      <tr key={idx} className="border-t">
                        <td className="py-2">
                          <Link
                            to={`/product-detail/${item.product_id}`}
                            className="text-blue-500 underline"
                          >
                            {item.name}
                          </Link>
                        </td>
                        <td>{item.quantity}</td>
                        <td>${item.price}</td>
                        <td>${item.quantity * item.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrderConfirmationPage;
