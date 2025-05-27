import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import box_icon from "../assets/box_icon.svg";

const MyOrders = () => {
    const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());
    const navigate = useNavigate();

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

    const myorders = [
        {
            request_id: "order-1",
            buyer_id: "user-1",
            products: [
                { product_id: "product-1", name: "Bulbasaur", quantity: 2, price: 100, discount: 99, image: ["/products/Bulbasaur.png", "/products/Ivysaur.png"] },
                { product_id: "product-2", name: "Charmander", quantity: 1, price: 200, discount: 199, image: ["/products/Charmander.png", "/products/Charmeleon.png", "/products/Charizard.png"] },
            ],
            total_price: 100,
            payment: "COD",
            created_at: "2023-10-01",
            status: "pending",
        },
        {
            request_id: "order-2",
            buyer_id: "user-1",
            products: [
                { product_id: "product-1", name: "Bulbasaur", quantity: 2, price: 100, discount: 99, image: ["/products/Bulbasaur.png", "/products/Ivysaur.png"] },
                { product_id: "product-3", name: "Squirtle", quantity: 5, price: 300, discount: 299, image: ["/products/Squirtle.png", "/products/Blastoise.png"] },
            ],
            total_price: 500,
            payment: "COD",
            created_at: "2025-05-27",
            status: "pending",
        },
    ];

    return (
        <>
            <Navbar />
            <div className="flex flex-col justify-between px-6 md:px-16 lg:px-32 py-6 min-h-screen">
                <div className="space-y-5">
                    <h2 className="text-lg font-semibold mt-6 text-left">My Orders</h2>
                    <div className="max-w-5xl border-t border-gray-300 text-sm">
                        {myorders.map((order) => (
                            <div key={order.request_id} className="border-b border-gray-300">
                                {/* 訂單 summary row */}
                                <button
                                    onClick={() => toggleExpand(order.request_id)}
                                    className="w-full flex flex-col md:flex-row gap-5 justify-between p-5 cursor-pointer hover:bg-gray-50"
                                >
                                    <div className="flex-1 flex gap-5 max-w-80">
                                        <img
                                            className="max-w-16 max-h-16 object-cover"
                                            src={box_icon}
                                            alt="box_icon"
                                        />
                                        <p className="flex flex-col gap-3">
                                            <span className="font-medium text-base">
                                                {order.products
                                                    .map((item) => `${item.name} x ${item.quantity}`)
                                                    .join(", ")}
                                            </span>
                                            <span className="text-left">Items : {order.products.length}</span>
                                        </p>
                                    </div>
                                    <p className="font-medium my-auto">${order.total_price}</p>
                                    <div>
                                        <p className="flex flex-col text-left">
                                            <span>Method : {order.payment}</span>
                                            <span>Date : {order.created_at}</span>
                                            <span>Status : {order.status}</span>
                                        </p>
                                    </div>
                                </button>

                                {/* 展開內容 */}
                                {expandedOrders.has(order.request_id) && (
                                    <div className="px-4 overflow-hidden transition-all duration-300 ease-in-out max-h-96 pb-4">
                                        <table className="w-full mt-2 text-sm text-gray-700">
                                            <thead className="bg-gray-100 text-gray-700 border-b text-sm">
                                                <tr>
                                                    <th className="py-3 text-left">商品</th>
                                                    <th className="text-center">數量</th>
                                                    <th className="text-center">價格</th>
                                                    <th className="text-left">小計</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {order.products.map((product) => (
                                                    <tr key={product.product_id} className="border-b hover:bg-gray-50 transition">
                                                        <td
                                                            className="py-3 flex items-center gap-3 cursor-pointer"
                                                            onClick={() => {
                                                                navigate(`/product-detail/${product.product_id}`);
                                                                scrollTo(0, 0);
                                                            }}
                                                        >
                                                            <img
                                                                src={product.image[0]}
                                                                alt={product.name}
                                                                className="w-10 h-10 rounded object-cover border"
                                                            />
                                                            <span>{product.name}</span>
                                                        </td>
                                                        <td className="text-center">{product.quantity}</td>
                                                        <td>
                                                            ${product.discount}
                                                            <span className="text-sm font-normal text-gray-800/60 line-through ml-3">
                                                                ${product.price}
                                                            </span>
                                                        </td>
                                                        <td className="text-green-600 font-medium">
                                                            ${product.discount * product.quantity}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default MyOrders;
