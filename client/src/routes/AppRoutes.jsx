import React, { Suspense, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import ScrollToTop from "../components/common/ScrollToTop";
import { useLanguage } from "../contexts/LanguageContext";

// Lazy-loaded page components for route-level code splitting
const Home = React.lazy(() => import("../pages/Home"));
const MyProject = React.lazy(() => import("../pages/MyProject"));
const ProjectDetailPage = React.lazy(() => import("../pages/ProjectDetailPage"));
const BaiTap = React.lazy(() => import("../pages/BaiTap"));
const Contact = React.lazy(() => import("../pages/Contact"));
const MyInfomation = React.lazy(() => import("../pages/MyInfomation"));
const NotFound = React.lazy(() => import("../pages/NotFound"));

// Accessible minimal fallback for lazy route transitions
const RouteLoadingFallback = () => (
  <div
    role="status"
    aria-live="polite"
    className="min-h-[50vh] flex items-center justify-center p-8 text-slate-400 font-mono text-xs uppercase tracking-wider"
  >
    <div className="flex items-center gap-2">
      <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" aria-hidden="true" />
      <span>Loading page…</span>
    </div>
  </div>
);

// Lightweight route-aware document title updater
const DocumentTitleManager = () => {
  const { pathname } = useLocation();
  const { language } = useLanguage();
  const isEn = language === "en";

  useEffect(() => {
    let title = "Đào Nguyễn Nhật Anh | Java Backend Developer Intern";

    if (pathname === "/") {
      title = isEn
        ? "Đào Nguyễn Nhật Anh | Java Backend Developer Intern"
        : "Đào Nguyễn Nhật Anh | Thực tập sinh Java Backend";
    } else if (pathname === "/myproject") {
      title = isEn
        ? "Projects Catalog | Đào Nguyễn Nhật Anh"
        : "Danh Mục Dự Án | Đào Nguyễn Nhật Anh";
    } else if (pathname.startsWith("/projects/clothy-ecommerce")) {
      title = "Clothy E-Commerce Case Study | Đào Nguyễn Nhật Anh";
    } else if (pathname.startsWith("/projects/portfolio-platform")) {
      title = "Portfolio Platform Case Study | Đào Nguyễn Nhật Anh";
    } else if (pathname.startsWith("/projects/")) {
      title = isEn
        ? "Case Study | Đào Nguyễn Nhật Anh"
        : "Hồ Sơ Kỹ Thuật | Đào Nguyễn Nhật Anh";
    } else if (pathname === "/baitap") {
      title = isEn
        ? "Enterprise Java Fundamentals (Engineering Lab) | Đào Nguyễn Nhật Anh"
        : "Nền Tảng Java Web Doanh Nghiệp (Engineering Lab) | Đào Nguyễn Nhật Anh";
    } else if (pathname === "/contact") {
      title = isEn
        ? "Contact | Đào Nguyễn Nhật Anh"
        : "Liên Hệ | Đào Nguyễn Nhật Anh";
    } else if (pathname === "/myinfomation") {
      title = isEn
        ? "My Information | Đào Nguyễn Nhật Anh"
        : "Thông Tin Cá Nhân | Đào Nguyễn Nhật Anh";
    } else {
      title = isEn
        ? "Page Not Found | Đào Nguyễn Nhật Anh"
        : "Không Tìm Thấy Trang | Đào Nguyễn Nhật Anh";
    }

    document.title = title;
  }, [pathname, isEn]);

  return null;
};

const AppRoutes = () => {
  return (
    <>
      <ScrollToTop />
      <DocumentTitleManager />
      <Suspense fallback={<RouteLoadingFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/myinfomation" element={<MyInfomation />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/myproject" element={<MyProject />} />
          <Route path="/projects/:slug" element={<ProjectDetailPage />} />
          <Route path="/baitap" element={<BaiTap />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default AppRoutes;
