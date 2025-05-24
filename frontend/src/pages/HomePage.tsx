const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold text-gray-800">Welcome to BunnyBuy!</h1>
      <p className="mt-4 text-lg text-gray-600">Your global shopping partner.</p>
      <a
        href="/order-pool"
        className="mt-6 px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 transition"
      >
        查看採購池
      </a>
    </div>
  );
};

export default HomePage;