import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { useNavigate } from "react-router-dom";

interface Order {
    request_id: string,
    buyer_id: string,
    products: {
        product_id: string,
        name: string,
        quantity: number,
        price: number,
        discount: number,
        image: string[],
    }[],
    total_price: number,
    payment: string,
    created_at: string,
    status: string,
}

{/*  import { Order } from "../interfaces"; */}


// type OrderItem = {
//   productName: string;
//   quantity: number;
//   price: number;
// };

// type Order = {
//   orderId: string;
//   customerName: string;
//   status: string;
//   total: number;
//   items: Product[];
// };

// const mockOrders: Order[] = [
//   {
//     orderId: "A001",
//     customerName: "Alice",
//     status: "待處理",
//     total: 499,
//     items: [
//       { productName: "Charmander", quantity: 1, price: 199 },
//       { productName: "Squirtle", quantity: 1, price: 300 },
//     ],
//   },
//   {
//     orderId: "B002",
//     customerName: "Bob",
//     status: "已完成",
//     total: 199,
//     items: [
//       { productName: "Bulbasaur", quantity: 2, price: 99 },
//     ],
//   },
// ];

const myorders = [
    {
        request_id: "order-1",
        buyer_id: "user-1",
        products: [
            { product_id: "product-1", name: "Bulbasaur", quantity: 2, price: 100, discount: 99, image: ["/products/Bulbasaur.png", "/products/Ivysaur.png"] },
            { product_id: "product-2", name: "Charmander", quantity: 1, price: 200, discount: 199, image: ["/products/Charmander.png", "/products/Charmeleon.png", "/products/Charizard.png"] },
        ],
        total_price: 100,
        payment: "貨到付款",
        created_at: "2023-10-01",
        status: "待處理",
    },
    {
        request_id: "order-2",
        buyer_id: "user-1",
        products: [
            { product_id: "product-1", name: "Bulbasaur", quantity: 2, price: 100, discount: 99, image: ["/products/Bulbasaur.png", "/products/Ivysaur.png"] },
            { product_id: "product-3", name: "Squirtle", quantity: 5, price: 300, discount: 299, image: ["/products/Squirtle.png", "/products/Blastoise.png"] },
        ],
        total_price: 500,
        payment: "貨到付款",
        created_at: "2025-05-27",
        status: "待處理",
    },
];

const OrderListView = () => {
  const navigate = useNavigate();
  const [expandedOrderIds, setExpandedOrderIds] = useState<string[]>([]);

  const toggleExpand = (orderId: string) => {
    setExpandedOrderIds((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  const handleAcceptOrder = (orderId: string) => {
    alert(`你已接單：${orderId}`);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 px-6 md:px-16 lg:px-32 pt-12 pb-20">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">訂單總覽</h1>
        <div className="space-y-4">
          {myorders.map((order) => {
            const isExpanded = expandedOrderIds.includes(order.request_id);
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
                      客戶：{order.buyer_id} ｜ 狀態：{order.status}
                    </p>
                  </div>
                  <div className="text-right text-lg text-gray-600">
                    總金額：${order.total_price}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAcceptOrder(order.request_id);
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
                      </tr>
                    </thead>
                    <tbody>
                      {order.products.map((item, index) => (
                        <tr key={index} className="border-t">
                          <td className="py-2">{item.name}</td>
                          <td>{item.quantity}</td>
                          <td>${item.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <button
                    onClick={() => {
                      navigate("/order-confirmation", {
                        state: { orders: myorders },
                      });
                    }}
                    className="fixed bottom-6 right-6 z-50 px-5 py-3 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition"
                  >
                    🛒 確認接單
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
//     const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());

//   const toggleOrder = (orderId: string) => {
//     setExpandedOrders(prev => {
//       const newSet = new Set(prev);
//       newSet.has(orderId) ? newSet.delete(orderId) : newSet.add(orderId);
//       return newSet;
//     });
//   };

//   const handleAcceptOrder = (orderId: string) => {
//     alert(`你已接單：${orderId}`);
//     // 可加上 API 請求邏輯
//   };

//   return (
//     <div className="p-4 max-w-4xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">訂單總覽</h1>
//       {orders.map(order => (
//         <div
//           key={order.orderId}
//           className="border rounded-lg shadow-md mb-4 overflow-hidden"
//         >
//           <div
//             onClick={() => toggleOrder(order.orderId)}
//             className="cursor-pointer flex justify-between items-center p-4 bg-gray-100 hover:bg-gray-200"
//           >
//             <div>
//               <p className="font-semibold">訂單編號: {order.orderId}</p>
//               <p>客戶: {order.customerName}</p>
//               <p>狀態: {order.status}</p>
//               <p>總金額: ${order.total}</p>
//             </div>
//             <button
//               onClick={e => {
//                 e.stopPropagation();
//                 handleAcceptOrder(order.orderId);
//               }}
//               className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//             >
//               接單
//             </button>
//           </div>
//           {expandedOrders.has(order.orderId) && (
//             <div className="bg-white p-4 border-t">
//               <h2 className="text-lg font-semibold mb-2">商品明細</h2>
//               {order.items.map(item => (
//                 <div
//                   key={item.product_id}
//                   className="mb-4 p-2 border rounded shadow-sm"
//                 >
//                   <div className="flex gap-4">
//                     <img
//                       src={item.image[0]}
//                       alt={item.name}
//                       className="w-20 h-20 object-cover rounded"
//                     />
//                     <div>
//                       <p className="font-bold">{item.name}</p>
//                       <p>{item.description}</p>
//                       <p>價格: ${item.price}</p>
//                       <p>折扣後: ${item.discount}</p>
//                       <p>商家庫存:</p>
//                       <ul className="ml-4 list-disc">
//                         {item.stock_list.map((stock, index) => (
//                           <li key={index}>
//                             {stock.store_name}：{stock.stock} 件（供應商ID:{" "}
//                             {stock.provider_id}）
//                           </li>
//                         ))}
//                       </ul>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };
};

export default OrderListView;
