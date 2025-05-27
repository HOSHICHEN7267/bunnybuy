import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";

import { useEffect, useState } from "react";
import axios from "axios";

const AllProducts = () => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/products") // ⬅️ 請確認這裡是你的後端 base URL
      .then((response) => {
        setProducts(response.data);
        console.log("Fetched products:", response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch products:", error);
      });
  }, []);


  return (
    <>
      <Navbar />
        <div className="flex flex-col items-start px-6 md:px-16 lg:px-32">
            <div className="flex flex-col items-end pt-12">
                <p className="text-2xl font-medium">All products</p>
                <div className="w-16 h-0.5 bg-orange-600 rounded-full"></div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex-col items-center gap-6 mt-12 pb-14 w-full">
                {products.map((product, index) => <ProductCard key={index} product={product} />)}
            </div>
        </div>
      <Footer />
    </>
  );
};

export default AllProducts;
