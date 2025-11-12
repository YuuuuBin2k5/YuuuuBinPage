// File: SideBar.jsx (Đã được sửa đổi)
import React, { useState } from "react";
import logo from "../assets/logo.svg";
import { useNavigate, Link } from "react-router-dom";
import { FONT_BITCOUNT } from "../utils/fonts";
import { TEXT_DARK_MODE, TEXT_LIGHT_MODE } from "../utils/text-font";

// Component SideBar bây giờ nhận isDarkMode và hàm onToggleDarkMode từ props
function SideBar({ isDarkMode, onToggleDarkMode }) {
  const navigate = useNavigate();
  const [language, setLanguage] = useState("VI");

  // Hàm này chỉ gọi hàm được truyền từ component cha
  const handleToggleDarkMode = () => {
    onToggleDarkMode();
  };

  const toggleLanguage = () => {
    setLanguage(language === "VI" ? "EN" : "VI");
  };

  //dieu huong
  const handleClick = () => {
    navigate("/");
  };

  // Đổi màu chữ
  const sideBarClassStyle = isDarkMode
    ? TEXT_DARK_MODE // Màu nền tối (Dark mode)
    : TEXT_LIGHT_MODE; // Màu nền sáng (Light mode)

  const hoverLink = isDarkMode
    ? "bg-gray-700 hover:bg-gray-600 text-yellow-300"
    : "bg-yellow-300 hover:bg-yellow-400 text-purple-900";

  return (
    <>
      <aside
        className="sidebar flex fixed rounded-b-2xl shadow-2xl border-b border-b-purple-950 w-full items-center justify-between p-3 text-xl"
        style={FONT_BITCOUNT}
      >
        <div className="cursor-pointer w-100 ml-5" onClick={handleClick}>
          <img
            className="w-14 h-13 rounded-full"
            src={logo}
            alt="logo"
            onClick={handleClick}
          />
          <h1
            className="fixed top-5 ml-20 logo-glow uppercase text-5xl"
            style={sideBarClassStyle}
            onClick={handleClick}
          >
            YuuuuBin
          </h1>
        </div>

        <nav
          className="sidebar-nav flex items-center gap-10"
          style={sideBarClassStyle}
        >
          {/* ... Các liên kết navigation ... */}
          {/* Liên kết 1: Trang Chủ */}
          <Link to="/" className="font-semibold hover:text-purple-300">
            Trang Chủ
          </Link>

          {/* Liên kết 2: Thông Tin */}
          <Link
            to="/myinfomation"
            className="font-semibold hover:text-purple-300"
          >
            Thông Tin
          </Link>

          {/* Liên kết 3: Dự Án */}
          <Link to="/myproject" className="font-semibold hover:text-purple-300">
            Dự Án
          </Link>

          {/* Liên kết 4: Bài Tập */}
          <Link to="/baitap" className="font-semibold hover:text-purple-300">
            Bài Tập
          </Link>

          {/* Liên kết 5: Contact */}
          <Link
            to="/contact"
            className="font-semibold hover:text-purple-300 mr-5"
          >
            Contact
          </Link>

          {/* Nút Chuyển Đổi Chế Độ Ánh Sáng */}
          <button
            onClick={handleToggleDarkMode} // <-- Gọi hàm từ props
            className={`p-2 rounded-full transition-colors duration-300 ease-in-out ${hoverLink}`}
            title={
              isDarkMode
                ? "Chuyển sang chế độ Ánh Sáng"
                : "Chuyển sang chế độ Tối"
            }
          >
            {isDarkMode ? "☀️" : "🌙"}
          </button>

          {/* ... Nút Chuyển Đổi Ngôn Ngữ ... */}
          <button
            onClick={toggleLanguage}
            className="
                p-2 rounded-full transition-colors duration-300 ease-in-out 
                bg-purple-700 hover:bg-purple-600 text-white font-bold text-sm ml-3 mr-10
            "
            title={
              language === "VI" ? "Switch to English" : "Chuyển sang Tiếng Việt"
            }
          >
            {language}
          </button>
        </nav>
      </aside>
    </>
  );
}

export default SideBar;
