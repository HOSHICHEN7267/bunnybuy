import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ProfilePage = () => {
  const user = {
    avatarUrl: 'src/assets/avatar.jpg', // 假設這是用戶頭像的路徑
    username: '烏薩奇',
    email: 'usagi@example.com',
    points: 1200,
    title: '代購金兔',
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* 頁首導覽列 */}
      <Navbar />

      {/* 主體內容 */}
      <main className="flex-grow flex justify-center items-center bg-gray-100 px-4 py-10">
        <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md sm:max-w-lg text-center">
          <div className="flex justify-center mb-4">
            <img
              src={user.avatarUrl}
              alt="Avatar"
              className="w-24 h-24 rounded-full border-4 border-indigo-500 object-cover"
            />
          </div>
          <h2 className="text-2xl font-semibold text-gray-800">{user.username}</h2>
          <p className="text-gray-500">{user.email}</p>
          <div className="mt-4 text-left space-y-2">
            <div className="flex justify-between border-b pb-1">
              <span className="text-gray-600">點數</span>
              <span className="font-medium text-indigo-600">{user.points}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">稱號</span>
              <span className="font-medium text-indigo-600">{user.title}</span>
            </div>
          </div>
        </div>
      </main>

      {/* 頁尾 */}
      <Footer />
    </div>
  );
};

export default ProfilePage;
