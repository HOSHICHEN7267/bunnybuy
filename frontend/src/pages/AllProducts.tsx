import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";

const AllProducts = () => {

  const products = [
    {
      product_id: "1",
      provider_id: "",
      name: "Bulbasaur",
      description: "Description for Bulbasaur",
      price: 100,
      discount: 100,
      stock: 100,
      status: "available",
      created_at: "",
      image: ["/product/Bulbasaur.png"],
    },
    {
      product_id: "2",
      provider_id: "",
      name: "Charmander",
      description: "Description for Charmander",
      price: 200,
      discount: 200,
      stock: 100,
      status: "available",
      created_at: "",
      image: ["/product/Charmander.png"],
    },
    {
      product_id: "3",
      provider_id: "",
      name: "Squirtle",
      description: "Description for Squirtle",
      price: 300,
      discount: 300,
      stock: 100,
      status: "available",
      created_at: "",
      image: ["/product/Squirtle.png"],
    },
    {
      product_id: "4",
      provider_id: "",
      name: "Mew",
      description: "Description for Mew",
      price: 500,
      discount: 500,
      stock: 100,
      status: "available",
      created_at: "",
      image: ["/product/Mew.png"],
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
