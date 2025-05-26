import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import HeaderSlider from "../components/HeaderSlider";
import Footer from "../components/Footer";

interface PurchaseRequest {
  request_id: string;
  buyer_id: string;
  product_id: string;
  quantity: number;
  total_price: number;
  status: string;
  created_at: string;
}

const OrderPoolPage = () => {
  const [requests, setRequests] = useState<PurchaseRequest[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // 之後換成 fetch 後端 API
    const mockData: PurchaseRequest[] = [
      {
        request_id: '1',
        buyer_id: 'user1',
        product_id: 'product1',
        quantity: 2,
        total_price: 100,
        status: 'open',
        created_at: new Date().toISOString(),
      },
    ];
    setRequests(mockData);
  }, []);

  return (
    <>
      <Navbar />
      <HeaderSlider />
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-4">採購需求池</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {requests.map((req) => (
            <div
              key={req.request_id}
              className="p-4 border rounded shadow hover:bg-pink-50 cursor-pointer hover:text-black"
              onClick={() => navigate(`/order-details/${req.request_id}`)}
            >
              <h3 className="font-bold">商品 ID: {req.product_id}</h3>
              <p>數量: {req.quantity}</p>
              <p>總價: ${req.total_price}</p>
              <p>狀態: {req.status}</p>
              <p>建立時間: {new Date(req.created_at).toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrderPoolPage;
