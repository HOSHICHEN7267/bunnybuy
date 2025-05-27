import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Product, CartItem } from "../interfaces";

import star_icon from '../assets/star_icon.svg';
import star_dull_icon from '../assets/star_dull_icon.svg';

const ProductDetail = () => {

    const products = [
        {
        product_id: "product-1",
        name: "Bulbasaur",
        description: "Description for Bulbasaur",
        price: 100,
        discount: 99,
        stock_list: [
            {"store_name": "商家A", "stock": 100, "provider_id": "user-1"},
            {"store_name": "商家B", "stock": 50, "provider_id": "user-2"},
        ],
        status: "available",
        created_at: "",
        image: ["/products/Bulbasaur.png", "/products/Ivysaur.png"],
        },
        {
        product_id: "product-2",
        name: "Charmander",
        description: "Description for Charmander",
        price: 200,
        discount: 199,
        stock_list: [
            {"store_name": "商家C", "stock": 100, "provider_id": "user-2"},
            {"store_name": "商家D", "stock": 50, "provider_id": "user-2"},
        ],
        status: "available",
        created_at: "",
        image: ["/products/Charmander.png", "/products/Charmeleon.png", "/products/Charizard.png"],
        },
        {
        product_id: "product-3",
        name: "Squirtle",
        description: "Description for Squirtle",
        price: 300,
        discount: 299,
        stock_list: [
            {"store_name": "商家E", "stock": 100, "provider_id": "user-1"},
            {"store_name": "商家F", "stock": 50, "provider_id": "user-1"},
        ],
        status: "available",
        created_at: "",
        image: ["/products/Squirtle.png", "/products/Blastoise.png"],
        },
        {
        product_id: "product-4",
        name: "Mew",
        description: "Description for Mew",
        price: 500,
        discount: 499,
        stock_list: [
            {"store_name": "商家G", "stock": 100, "provider_id": "user-3"},
            {"store_name": "商家H", "stock": 50, "provider_id": "user-4"},
        ],
        status: "available",
        created_at: "",
        image: ["/products/Mew.png", "/products/Mewtwo.png"],
        },
        // Add more products as needed
    ]

    const { productId } = useParams();

    const product = products.find((p) => p.product_id === productId);
    const navigate = useNavigate();
    const [showStockList, setShowStockList] = useState(false);
    const [mainImage, setMainImage] = useState("");

    const addToCart = (product: Product) => {
        const cart = JSON.parse(localStorage.getItem("cartItems") || "[]");
        const existingIndex = cart.findIndex((item: CartItem ) => item.product_id === product.product_id);

        if (existingIndex !== -1) {
            cart[existingIndex].quantity += 1;  // 商品已存在 → 數量 +1
        } else {
            cart.push({...product, quantity: 1,});  // 加入新商品
        }

        localStorage.setItem("cartItems", JSON.stringify(cart));
        alert("已加入購物車！");
    };

    // const [productData, setProductData] = useState(null);

    // const fetchProductData = async () => {
    //     const product = products.find(product => product._id === id);
    //     setProductData(product);
    // }

    // useEffect(() => {
    //     fetchProductData();
    // }, [id, products.length])

    return product ? (<>
        <Navbar />
        <div className="px-6 md:px-16 lg:px-32 pt-14 space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <div className="px-5 lg:px-16 xl:px-20">
                    <div className="rounded-lg overflow-hidden bg-gray-500/10 mb-4">
                        <img
                            src={mainImage || product.image[0]}
                            alt="alt"
                            className="w-full h-auto object-cover mix-blend-multiply"
                            width={1280}
                            height={720}
                        />
                    </div>

                    <div className="grid grid-cols-4 gap-4">
                        {product.image.map((image, index) => (
                            <div
                                key={index}
                                onClick={() => setMainImage(image)}
                                className="cursor-pointer rounded-lg overflow-hidden bg-gray-500/10"
                            >
                                <img
                                    src={image}
                                    alt="alt"
                                    className="w-full h-auto object-cover mix-blend-multiply"
                                    width={1280}
                                    height={720}
                                />
                            </div>

                        ))}
                    </div>
                </div>

                <div className="flex flex-col">
                    <h1 className="text-3xl font-medium text-gray-800/90 mb-4 text-left">
                        {product.name}
                    </h1>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-0.5">
                            <img className="h-4 w-4" src={star_icon} alt="star_icon" />
                            <img className="h-4 w-4" src={star_icon} alt="star_icon" />
                            <img className="h-4 w-4" src={star_icon} alt="star_icon" />
                            <img className="h-4 w-4" src={star_icon} alt="star_icon" />
                            <img
                                className="h-4 w-4"
                                src={star_dull_icon}
                                alt="star_dull_icon"
                            />
                        </div>
                        <p>(4/5)</p>
                    </div>
                    <p className="text-gray-600 mt-3 text-left">
                        {product.description}
                    </p>
                    <p className="text-3xl font-medium mt-6 text-left">
                        ${product.discount}
                        <span className="text-base font-normal text-gray-800/60 line-through ml-2">
                            ${product.price}
                        </span>
                    </p>
                    <hr className="bg-gray-600 my-6" />
                    <div className="overflow-x-auto text-left">
                        <table className="table-auto border-collapse w-full max-w-72">
                            <tbody>
                                <tr className="cursor-pointer" onClick={() => setShowStockList(!showStockList)}>
                                    <td className="text-gray-600 font-medium">Stock</td>
                                    <td className="text-gray-800/50">
                                        {product.stock_list.reduce((sum, s) => sum + s.stock, 0)}
                                        <span className="ml-2 text-xs text-blue-500">
                                            {showStockList ? "收起 ▲" : "展開 ▼"}
                                        </span>
                                    </td>
                                </tr>
                                {showStockList && (
                                <tr>
                                    <td colSpan={2} className="pt-2">
                                    <table className="w-full border border-gray-200 text-sm">
                                        <thead>
                                        <tr className="bg-gray-100 text-gray-600">
                                            <th className="p-2 text-left">store name</th>
                                            <th className="p-2 text-left">stock</th>
                                            <th className="p-2 text-left">provider ID</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {product.stock_list.map((item, index) => (
                                            <tr key={index} className="border-t border-gray-200">
                                            <td className="p-2">{item.store_name}</td>
                                            <td className="p-2">{item.stock}</td>
                                            <td className="p-2">{item.provider_id}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                    </td>
                                </tr>
                                )}

                                <tr>
                                    <td className="text-gray-600 font-medium">Status</td>
                                    <td className="text-gray-800/50">{product.status}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="flex items-center mt-10 gap-4">
                        <button onClick={() => addToCart(product)} className="w-full py-3.5 bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition">
                            加入購物車
                        </button>

                        <button onClick={() => { addToCart(product); navigate("/cart"); }}
                            className="w-full py-3.5 bg-orange-500 text-white hover:bg-orange-600 transition"
                        >
                            立即購買
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center">
                <div className="flex flex-col items-center mb-4 mt-16">
                    <p className="text-3xl font-medium">Featured <span className="font-medium text-orange-600">Products</span></p>
                    <div className="w-28 h-0.5 bg-orange-600 mt-2"></div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6 pb-14 w-full">
                    {products.slice(0, 5).map((product, index) => <ProductCard key={index} product={product} />)}
                </div>
                <button className="px-8 py-2 mb-16 border rounded text-gray-500/70 hover:bg-slate-50/90 transition">
                    See more
                </button>
            </div>
        </div>
        <Footer />
    </>
    ) : <Loading />;
};

export default ProductDetail;