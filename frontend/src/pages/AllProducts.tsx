import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";

const AllProducts = () => {

  const products = [
    {
      _id: "1",
      name: "Bulbasaur",
      description: "Description for Bulbasaur",
      image: ["/product/Bulbasaur.png"],
      offerPrice: 100,
    },
    {
      _id: "2",
      name: "Charmander",
      description: "Description for Charmander",
      image: ["/product/Charmander.png"],
      offerPrice: 200,
    },
    {
      _id: "3",
      name: "Squirtle",
      description: "Description for Squirtle",
      image: ["/product/Squirtle.png"],
      offerPrice: 300,
    },
    {
      _id: "4",
      name: "Mew",
      description: "Description for Mew",
      image: ["/product/Mew.png"],
      offerPrice: 500,
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
