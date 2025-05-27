import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";

const AllProducts = () => {

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
