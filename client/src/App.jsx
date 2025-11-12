import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import SideBar from "./components/SideBar";
import AppRoutes from "./routes/AppRoutes";
import {
  BG_MIDNIGHT_MIST,
  BG_TOP_GRADIENT_RADIAL,
  GLOBAL_TRANSITION,
} from "./utils/background";
import { TEXT_DARK_MODE, TEXT_LIGHT_MODE } from "./utils/text-font";
import Footer from "./components/Footer";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Hàm chuyển đổi sẽ được truyền xuống SideBar
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Định nghĩa class cho nội dung chính
  const backgroundStyle = isDarkMode
    ? BG_MIDNIGHT_MIST
    : BG_TOP_GRADIENT_RADIAL;

  const textStyle = isDarkMode ? TEXT_DARK_MODE : TEXT_LIGHT_MODE;
  const finalStyle = {
    ...backgroundStyle,
    ...textStyle,
    ...GLOBAL_TRANSITION,
  };

  return (
    <BrowserRouter>
      <body
        className="app-container min-h-screen relative overflow-hidden"
        style={finalStyle}
      >
        {/* Header*/}
        <SideBar isDarkMode={isDarkMode} onToggleDarkMode={toggleDarkMode} />

        {/* Main */}
        <nav
          className={`pt-[100px] min-h-screen transition-colors duration-700`}
        >
          {/* Component AppRoutes quản lý tất cả các Routes */}
          <AppRoutes />
        </nav>

        {/* Chân trang */}
        <Footer />
      </body>
    </BrowserRouter>
  );
}

export default App;
