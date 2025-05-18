import logo from '../assets/logo.png';

const Footer = () => {
  return (
    <footer>
      <div className="flex flex-col md:flex-row items-start justify-center px-6 md:px-16 lg:px-32 gap-10 py-14 border-b border-gray-300/40 text-gray-600 bg-gray-50">
        
        {/* Logo & About */}
        <div className="w-4/5 md:w-1/3">
          <img src={logo} alt="BunnyBuy Logo" className="w-28 h-auto ml-24"/>
          <p className="mt-6 text-sm">
            BunnyBuy 是您的全球代購好夥伴，無論日韓美歐，我們幫您輕鬆買到想要的商品。安全、快速、專業代購，通通交給我們！
          </p>
        </div>

        {/* 公司連結 */}
        <div className="w-1/2 md:w-1/4 flex items-start justify-start md:justify-center">
          <div>
            <h2 className="font-semibold text-gray-900 mb-5">BunnyBuy</h2>
            <ul className="text-sm space-y-2">
              <li>
                <a className="hover:underline transition" href="/">首頁</a>
              </li>
              <li>
                <a className="hover:underline transition" href="/about">關於我們</a>
              </li>
              <li>
                <a className="hover:underline transition" href="/faq">常見問題</a>
              </li>
              <li>
                <a className="hover:underline transition" href="/privacy">隱私政策</a>
              </li>
            </ul>
          </div>
        </div>

        {/* 聯絡資訊 */}
        <div className="w-1/2 md:w-1/4 flex items-start justify-start md:justify-center">
          <div>
            <h2 className="font-semibold text-gray-900 mb-5">聯絡我們</h2>
            <div className="text-sm space-y-2">
              <p>+886-2-1234-5678</p>
              <p>support@bunnybuy.tw</p>
              <p>週一至週五 09:00-18:00</p>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <p className="py-4 text-center text-xs md:text-sm bg-gray-50 text-gray-400">
        &copy; 2025 BunnyBuy Inc. 版權所有
      </p>
    </footer>
  );
};

export default Footer;
