import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import box_icon from "../assets/box_icon.svg";
import { MyOrder, Product } from "../interfaces";
import axios from "axios";

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

    const [myorders, setMyOrders] = useState<MyOrder[]>([]);
    const [productsMap, setProductsMap] = useState<Map<string, Product>>(new Map());

    useEffect(() => {
        const fetchData = async () => {
            try {
            const [ordersRes, productsRes] = await Promise.all([
                axios.get("http://localhost:3000/purchase-requests/my", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                }),
                axios.get("http://localhost:3000/products"),
            ]);

            setMyOrders(ordersRes.data);
            setProductsMap(new Map<string, Product>(
                (productsRes.data as Product[]).map(p => [p.product_id, p])
            ));
            } catch (error) {
            console.error("Fetching error:", error);
            }
        };

        fetchData();
    }, []);

    const [editingOrderId, setEditingOrderId] = useState<string | null>(null);
    const [editingProductId, setEditingProductId] = useState<string | null>(null);
    const [selectedStatus, setSelectedStatus] = useState<string>("");

    const handleStatusSelect = (value: string) => {
        setSelectedStatus(value);
    };

    const handleConfirmStatusChange = async () => {
        if (!editingOrderId || !editingProductId || !selectedStatus) return;

        try {
            const order = myorders.find(o => o.request_id === editingOrderId);
            if (!order) return;

            const productItem = order.products.find(p => p.product_id === editingProductId);
            if (!productItem) return;

            // 更新狀態
            productItem.status = selectedStatus;

            // 發送更新請求
            await axios.patch(`http://localhost:3000/purchase-requests/${editingOrderId}`, {
                products: order.products,
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            // 重置編輯狀態
            setEditingOrderId(null);
            setEditingProductId(null);
            setSelectedStatus("");

        } catch (error) {
            console.error("更新狀態失敗", error);
            alert("更新失敗");
        }
    }

    const getStatusStyle = (status: string) => {
        switch (status) {
        case "幫你買":
            return "bg-yellow-200 font-semibold text-yellow-700 border-yellow-100";
        case "幫你了":
            return "bg-green-200 text-green-700 border-green-100";
        case "不幫了":
            return "bg-red-200 text-red-700 border-red-100";
        case "幫你找":
            return "bg-sky-200 text-blue-700 border border-blue-100";
        default:
            return "bg-gray-100 text-black-600 border-gray-100";
        }
    };


    return (
        <>
            <Navbar />
            <div className="flex flex-col justify-between px-6 md:px-16 lg:px-32 py-6 min-h-screen">
                <div className="space-y-5">
                    <h2 className="text-lg font-semibold mt-6 text-left">幫我買訂單</h2>
                    <div className="max-w-5xl border-t border-gray-300 text-sm">
                        {myorders.map((order: MyOrder) => (
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
                                            <span className="font-medium text-base truncate whitespace-nowrap overflow-hidden max-w-[180px]">
                                                {order.products.map((item) => {
                                                    const product = productsMap.get(item.product_id);
                                                    const name = product?.name || "Unknown";
                                                    return `${name} x ${item.quantity}`;
                                                })
                                                .join(", ")
                                                }
                                            </span>
                                            <span className="text-left">Items : {order.products.length}</span>
                                        </p>
                                    </div>
                                    <p className="font-medium my-auto">${order.total_price}</p>
                                    <div>
                                        <p className="flex flex-col text-left">
                                            <span>Payment : {order.payment}</span>
                                            <span>Date : {order.created_at}</span>
                                            <span>Delivery : {order.delivery_method}</span>
                                        </p>
                                    </div>
                                </button>

                                {/* 展開內容 */}
                                {expandedOrders.has(order.request_id) && (
                                    <div className="px-4 overflow-hidden transition-all duration-300 ease-in-out max-h-96 pb-4">
                                        <table className="table-fixed w-full mt-2 text-sm text-gray-700">
                                            <thead className="bg-gray-100 text-gray-700 border-b text-sm">
                                                <tr>
                                                    <th className="py-3 text-left">商品</th>
                                                    <th className="text-center">數量</th>
                                                    <th className="text-center">價格</th>
                                                    <th className="text-center">小計</th>
                                                    <th className="w-1/6 text-center">狀態</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {order.products.map((item) => {
                                                const product = productsMap.get(item.product_id); // 這裡查出完整 Product

                                                return (
                                                    <tr key={item.product_id} className="border-b hover:bg-gray-50 transition">
                                                        <td
                                                            className="py-3 flex items-center gap-3 cursor-pointer"
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
                                                        <td className="text-center">{item.quantity}</td>
                                                        <td>
                                                            ${product?.discount ?? 0}
                                                            <span className="text-sm font-normal text-gray-800/60 line-through ml-3">
                                                                ${product?.price ?? 0}
                                                            </span>
                                                        </td>
                                                        <td className="text-green-600 font-medium">
                                                            ${(product?.discount ?? 0) * item.quantity}
                                                        </td>
                                                        <td className="text-center w-1/6">
                                                            {(editingOrderId === order.request_id && editingProductId === item.product_id) ? (
                                                                <div className="flex items-center gap-2 justify-center">
                                                                    <select
                                                                        value={selectedStatus || item.status}
                                                                        onChange={(e) => handleStatusSelect(e.target.value)}
                                                                        className="border rounded px-2 py-1 text-sm"
                                                                    >
                                                                    {item.status === "幫你找" && (
                                                                        <>
                                                                            <option value="幫你找">幫你找</option>
                                                                            <option value="幫你買" disabled>幫你買</option>
                                                                            <option value="幫你了" disabled>幫你了</option>
                                                                            <option value="不幫了">不幫了</option>
                                                                        </>
                                                                    )}
                                                                    {/* {item.status === "幫你買" && (
                                                                        <>
                                                                            <option value="幫你找" disabled>幫你找</option>
                                                                            <option value="幫你買">幫你買</option>
                                                                            <option value="幫你了">幫你了</option>
                                                                            <option value="不幫了" disabled>不幫了</option>
                                                                        </>
                                                                    )} */}
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
                                                                    item.status === "幫你找"
                                                                    //  || item.status === "幫你買"
                                                                        ? "hover:bg-pink-50 text-pink-500 border-pink-400"
                                                                        : "text-gray-400 border-gray-300 cursor-not-allowed"
                                                                    }`}
                                                                    disabled={item.status !== "幫你找"
                                                                        //  && item.status !== "幫你買"
                                                                    }
                                                                    onClick={() => {
                                                                        setEditingOrderId(order.request_id);
                                                                        setEditingProductId(item.product_id);
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
