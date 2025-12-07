import React from "react";
import { Routes, Route } from "react-router-dom";

import MyInfomation from "../pages/MyInfomation";
import BaiTap from "../pages/BaiTap";
import NotFound from "../pages/NotFound"; // Thêm trang 404 cho đầy đủ
import Home from "../pages/Home";
import MyProject from "../pages/MyProject";

// Component quản lý Route chính
const AppRoutes = () => {
  return (
    <Routes>
      {/* Định nghĩa các Route */}
      <Route path="/" element={<Home />} />
      <Route path="/myinfomation" element={<MyInfomation />} />
      <Route path="/contact" element={<MyInfomation />} />
      <Route path="/myproject" element={<MyProject />} />
      <Route path="/baitap" element={<BaiTap />} />

      {/* Route cho các đường dẫn không tồn tại (404) */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
