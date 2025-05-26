import { useParams } from 'react-router-dom';
import Navbar from "../components/Navbar";
import HeaderSlider from "../components/HeaderSlider";
import Footer from "../components/Footer";

const OrderDetailsPage = () => {
  const { requestId } = useParams();

  // 之後串接 API：GET /purchase-requests/:id
  return (
    <>
      <Navbar />
      <HeaderSlider />
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-4">採購詳情</h2>
        <p>採購需求 ID: {requestId}</p>
        {/* 顯示更多詳細資料 */}
      </div>
      <Footer />
    </>
  );
};

export default OrderDetailsPage;
