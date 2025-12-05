import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import SideBar from "./components/layout/SideBar";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./contexts/AuthContext";
import {
  BG_MIDNIGHT_MIST,
  BG_TOP_GRADIENT_RADIAL,
  GLOBAL_TRANSITION,
} from "./utils/background";
import { TEXT_DARK_MODE, TEXT_LIGHT_MODE } from "./utils/text-font";
import Footer from "./components/layout/Footer";

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
    <AuthProvider>
      <BrowserRouter>
        <div
          className="app-container min-h-screen relative overflow-hidden overflow-y-auto"
          style={finalStyle}
        >
          {/* Header*/}
          <SideBar isDarkMode={isDarkMode} onToggleDarkMode={toggleDarkMode} />

          {/* Main */}
          <main className="pt-24 min-h-screen transition-colors duration-700 overflow-y-auto w-full">
            {/* Component AppRoutes quản lý tất cả các Routes */}
            <AppRoutes />
          </main>

          {/* Chân trang */}
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
