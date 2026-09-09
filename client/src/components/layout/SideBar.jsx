import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext";
import { profileData } from "../../data/profileData";
import logo from "../../assets/logo.svg";
import {
  Menu,
  X,
  Download,
  Globe,
  Briefcase,
  Cpu,
  Award,
  BookOpen,
  Mail,
} from "lucide-react";

function SideBar() {
  const location = useLocation();
  const { language, toggleLanguage } = useLanguage();
  const isEn = language === "en";

  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const drawerRef = useRef(null);
  const triggerBtnRef = useRef(null);

  // Focus trap, initial focus, and focus restoration for mobile drawer
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const timer = setTimeout(() => {
      const focusable = drawerRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable && focusable.length > 0) {
        focusable[0].focus();
      }
    }, 50);

    const handleTrapTab = (e) => {
      if (e.key !== "Tab" || !drawerRef.current) return;
      const focusables = Array.from(
        drawerRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      );
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    const triggerEl = triggerBtnRef.current;
    window.addEventListener("keydown", handleTrapTab);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", handleTrapTab);
      triggerEl?.focus();
    };
  }, [isMobileMenuOpen]);

  // Passive scroll listener for stable navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  // Safe navigation strategy for anchors (Strategy B):
  // If target element exists on page, smooth-scroll; otherwise navigate to route without crashing.
  const handleNavClick = (e, item) => {
    setIsMobileMenuOpen(false);
    if (item.isAnchor && location.pathname === "/") {
      const element = document.getElementById(item.anchorId);
      if (element) {
        e.preventDefault();
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const navItems = [
    {
      to: "/myproject",
      label: isEn ? "Projects" : "Dự Án",
      icon: Briefcase,
      isAnchor: false,
    },
    {
      to: "/#capabilities",
      anchorId: "capabilities",
      label: isEn ? "Capabilities" : "Kỹ Năng",
      icon: Cpu,
      isAnchor: true,
    },
    {
      to: "/#experience",
      anchorId: "experience",
      label: isEn ? "Experience" : "Kinh Nghiệm",
      icon: Award,
      isAnchor: true,
    },
    {
      to: "/baitap",
      label: isEn ? "Engineering Lab" : "Lab Kỹ Thuật",
      icon: BookOpen,
      isAnchor: false,
    },
    {
      to: "/contact",
      label: isEn ? "Contact" : "Liên Hệ",
      icon: Mail,
      isAnchor: false,
    },
  ];

  const isActivePath = (path) => location.pathname === path;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-200 ${
          scrolled
            ? "bg-slate-950/95 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/20"
            : "bg-slate-950/80 backdrop-blur-sm border-b border-slate-800/40"
        }`}
        aria-label={isEn ? "Main Navigation" : "Điều hướng chính"}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18">
            {/* Brand Identity (Semantic span, strictly non-h1) */}
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 p-1 group"
              aria-label={isEn ? "Home - Dao Nguyen Nhat Anh" : "Trang chủ - Đào Nguyễn Nhật Anh"}
            >
              <div className="w-9 h-9 rounded-full bg-slate-900 border border-indigo-500/30 flex items-center justify-center p-1.5 shadow-sm group-hover:border-indigo-400/60 transition-colors">
                <img
                  src={logo}
                  alt="Eagle Logo"
                  className="w-full h-full object-contain filter brightness-0 invert"
                />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-sm font-black tracking-[0.15em] bg-gradient-to-r from-purple-200 via-pink-200 to-cyan-200 bg-clip-text text-transparent group-hover:opacity-90 transition-opacity">
                  YUUUUBIN
                </span>
                <span className="text-[9px] text-slate-400 uppercase tracking-[0.15em] font-medium font-mono">
                  Backend Developer
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links (>= 768px) */}
            <div className="hidden md:flex items-center gap-1 lg:gap-2">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                const active = !item.isAnchor && isActivePath(item.to);

                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={(e) => handleNavClick(e, item)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs lg:text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                      active
                        ? "bg-slate-800 text-white font-semibold shadow-sm border border-slate-700/60"
                        : "text-slate-300 hover:text-white hover:bg-slate-850"
                    }`}
                  >
                    <IconComponent className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Desktop Action Controls: CV & Language (>= 768px) */}
            <div className="hidden md:flex items-center gap-2.5">
              {/* CV Action Button */}
              <a
                href={profileData.cvPath}
                download="Dao-Nguyen-Nhat-Anh-Backend-Intern.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-sm shadow-indigo-500/20 transition-all hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-950"
                aria-label={isEn ? "Download CV in PDF format" : "Tải hồ sơ CV dạng PDF"}
              >
                <Download className="w-3.5 h-3.5" aria-hidden="true" />
                <span>CV (PDF)</span>
              </a>

              {/* Language Toggle */}
              <button
                type="button"
                onClick={toggleLanguage}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700/60 text-slate-300 hover:text-white text-xs font-mono transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400"
                aria-label={isEn ? "Switch to Vietnamese" : "Chuyển sang Tiếng Anh"}
                title={isEn ? "Switch to Vietnamese" : "Chuyển sang Tiếng Anh"}
              >
                <Globe className="w-3.5 h-3.5 text-cyan-400" aria-hidden="true" />
                <span className="font-semibold">{isEn ? "EN" : "VI"}</span>
              </button>
            </div>

            {/* Mobile Hamburger Button (< 768px) */}
            <div className="flex md:hidden items-center gap-2">
              <button
                ref={triggerBtnRef}
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg bg-slate-900 border border-slate-700/60 text-slate-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                aria-label={
                  isMobileMenuOpen
                    ? isEn ? "Close navigation menu" : "Đóng menu điều hướng"
                    : isEn ? "Open navigation menu" : "Mở menu điều hướng"
                }
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-navigation-drawer"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" aria-hidden="true" />
                ) : (
                  <Menu className="w-5 h-5" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Accessible Mobile Navigation Drawer (< 768px) */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          {/* Backdrop Overlay */}
          <div
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <div
            ref={drawerRef}
            id="mobile-navigation-drawer"
            role="dialog"
            aria-modal="true"
            aria-label={isEn ? "Mobile navigation menu" : "Menu điều hướng trên di động"}
            className="fixed top-0 right-0 bottom-0 z-50 w-72 max-w-[80vw] bg-slate-900 border-l border-slate-800 p-5 shadow-2xl flex flex-col justify-between overflow-y-auto"
          >
            <div className="space-y-6">
              {/* Drawer Top Row */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold text-white font-mono tracking-wider">
                    MENU
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    YUUUUBIN
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  aria-label={isEn ? "Close drawer" : "Đóng menu"}
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>

              {/* Navigation Items */}
              <nav className="flex flex-col space-y-1.5" aria-label="Mobile Navigation Links">
                {navItems.map((item) => {
                  const IconComponent = item.icon;
                  const active = !item.isAnchor && isActivePath(item.to);

                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={(e) => handleNavClick(e, item)}
                      className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                        active
                          ? "bg-indigo-950/60 text-indigo-300 font-semibold border border-indigo-500/30"
                          : "text-slate-300 hover:text-white hover:bg-slate-800"
                      }`}
                    >
                      <IconComponent className="w-4 h-4 text-slate-400" aria-hidden="true" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Drawer Bottom Actions: CV & Language */}
            <div className="pt-6 border-t border-slate-800 space-y-3">
              <a
                href={profileData.cvPath}
                download="Dao-Nguyen-Nhat-Anh-Backend-Intern.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                aria-label={isEn ? "Download CV in PDF format" : "Tải hồ sơ CV dạng PDF"}
              >
                <Download className="w-4 h-4" aria-hidden="true" />
                <span>{isEn ? "Download CV (PDF)" : "Tải CV (PDF)"}</span>
              </a>

              <div className="flex items-center justify-between px-2 pt-1">
                <span className="text-xs text-slate-400 font-mono">
                  {isEn ? "Language" : "Ngôn ngữ"}:
                </span>
                <button
                  type="button"
                  onClick={toggleLanguage}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs font-mono text-cyan-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                >
                  <Globe className="w-3.5 h-3.5 text-cyan-400" aria-hidden="true" />
                  <span className="font-bold">{isEn ? "English (EN)" : "Tiếng Việt (VI)"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SideBar;
