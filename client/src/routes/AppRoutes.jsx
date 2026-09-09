import React from "react";
import { Routes, Route } from "react-router-dom";

import MyInfomation from "../pages/MyInfomation";
import Contact from "../pages/Contact";
import BaiTap from "../pages/BaiTap";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home";
import MyProject from "../pages/MyProject";
import ProjectDetailPage from "../pages/ProjectDetailPage";
import ScrollToTop from "../components/common/ScrollToTop";

// Component quản lý Route chính
const AppRoutes = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Định nghĩa các Route */}
        <Route path="/" element={<Home />} />
        <Route path="/myinfomation" element={<MyInfomation />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/myproject" element={<MyProject />} />
        <Route path="/projects/:slug" element={<ProjectDetailPage />} />
        <Route path="/baitap" element={<BaiTap />} />

        {/* Route cho các đường dẫn không tồn tại (404) */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
