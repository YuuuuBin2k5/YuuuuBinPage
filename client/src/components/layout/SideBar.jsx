// File: SideBar.jsx - Modern Horizontal Navigation
import React, { useState, useEffect } from "react";
import logo from "../../assets/logo.svg";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useLanguage } from "../../contexts/LanguageContext";
import { useTranslation } from "../../hooks/useTranslation";
import AdminLogin from "../admin/AdminLogin";
import {
  User,
  LogOut,
  Settings,
  Home,
  FileText,
  Briefcase,
  BookOpen,
  Mail,
  Moon,
  Sun,
  Globe,
  Shield,
} from "lucide-react";

function SideBar({ isDarkMode, onToggleDarkMode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { language, toggleLanguage } = useLanguage();
  const { t } = useTranslation();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isAdmin, logout } = useAuth();

  // Scroll effects state
  const [scrolled, setScrolled] = useState(false);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hoveredItem, setHoveredItem] = useState(null);

  // Optimized scroll detection with RAF and throttling
  useEffect(() => {
    let rafId = null;
    let lastUpdate = 0;
    const throttleDelay = 100; // Update every 100ms max

    const handleScroll = () => {
      const now = Date.now();
      
      // Cancel previous RAF if exists
      if (rafId) {
        cancelAnimationFrame(rafId);
      }

      // Throttle updates
      if (now - lastUpdate < throttleDelay) {
        return;
      }

      rafId = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;

        // Batch state updates
        const newScrolled = currentScrollY > 20;
        const newIsScrollingDown = currentScrollY > lastScrollY && currentScrollY > 100;

        // Only update if changed
        if (newScrolled !== scrolled) setScrolled(newScrolled);
        if (newIsScrollingDown !== isScrollingDown) setIsScrollingDown(newIsScrollingDown);
        
        setLastScrollY(currentScrollY);
        lastUpdate = now;
        rafId = null;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [lastScrollY, scrolled, isScrollingDown]);

  const handleToggleDarkMode = () => {
    onToggleDarkMode();
  };

  const handleLogoClick = () => {
    // If already on home page, clear sessionStorage and reload to show intro
    if (location.pathname === "/") {
      sessionStorage.removeItem("hasVisited");
      window.location.reload();
    } else {
      // Navigate to home normally
      navigate("/");
    }
  };

  // Magnetic hover effect handler
  const handleMouseMove = (e, itemPath) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const distance = Math.sqrt(x * x + y * y);
    const maxDistance = 50;

    if (distance < maxDistance) {
      const angle = Math.atan2(y, x);
      const strength = (maxDistance - distance) / maxDistance;
      const moveX = Math.cos(angle) * strength * 3;
      const moveY = Math.sin(angle) * strength * 3;
      e.currentTarget.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
    }
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = "translate(0, 0) scale(1)";
  };

  // Navigation items with icons
  const navItems = [
    { path: "/", label: t("nav.about"), icon: Home },
    { path: "/myinfomation", label: t("nav.resume"), icon: FileText },
    { path: "/myproject", label: t("nav.projects"), icon: Briefcase },
    { path: "/baitap", label: t("nav.exercises"), icon: BookOpen },
    { path: "/contact", label: t("nav.contact"), icon: Mail },
  ];

  const isActivePath = (path) => location.pathname === path;

  return (
    <>
      <nav
        className={`fixed left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
          isScrollingDown ? "-top-24" : "top-0"
        } ${
          scrolled
            ? "bg-slate-900/98 backdrop-blur-xl shadow-2xl shadow-purple-500/10 border-b border-purple-500/20"
            : "bg-slate-900/95 backdrop-blur-md border-b border-slate-800/50"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div
            className={`flex items-center justify-between transition-all duration-500 ${
              scrolled ? "h-16" : "h-20"
            }`}
          >
            {/* Left Navigation */}
            <div
              className={`flex items-center transition-all duration-500 ${
                scrolled ? "space-x-4" : "space-x-8"
              }`}
            >
              {navItems.slice(0, 2).map((item) => {
                const IconComponent = item.icon;
                const isActive = isActivePath(item.path);

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onMouseMove={(e) => handleMouseMove(e, item.path)}
                    onMouseEnter={() => setHoveredItem(item.path)}
                    onMouseLeave={(e) => {
                      handleMouseLeave(e);
                      setHoveredItem(null);
                    }}
                    className={`group relative flex items-center gap-3 rounded-xl transition-all duration-200 ease-out overflow-hidden ${
                      scrolled ? "px-3 py-2" : "px-4 py-2.5"
                    } ${
                      isActive
                        ? "bg-gradient-to-r from-white/15 to-white/5 text-white shadow-lg shadow-black/30"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {/* Smooth slide background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>

                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>

                    <IconComponent
                      className={`relative z-10 transition-all duration-500 group-hover:rotate-6 ${
                        scrolled ? "w-3.5 h-3.5" : "w-4 h-4"
                      } ${hoveredItem === item.path ? "animate-float" : ""}`}
                    />
                    <span
                      className={`relative z-10 font-medium tracking-wide transition-all duration-300 ${
                        scrolled ? "text-xs" : "text-sm"
                      }`}
                    >
                      {item.label}
                    </span>

                    {/* Active underline with draw animation */}
                    {isActive && (
                      <div className="absolute -bottom-1 left-1/2 w-12 h-0.5 bg-gradient-to-r from-transparent via-white/80 to-transparent rounded-full animate-drawLine origin-center"></div>
                    )}

                    {/* Progressive hover underline */}
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-white/40 via-white/60 to-white/40 rounded-full group-hover:w-10 transition-all duration-500 ease-out"></div>
                  </Link>
                );
              })}
            </div>

            {/* Center Logo - Premium Design with Scroll Effects */}
            <div
              className={`flex flex-col items-center transition-all duration-500 ${
                scrolled ? "scale-90" : "scale-100"
              }`}
            >
              <button
                onClick={handleLogoClick}
                className="group relative flex flex-col items-center p-1.5 rounded-xl transition-all duration-500"
              >
                {/* Subtle Static Glow */}
                <div
                  className={`absolute inset-0 transition-all duration-500 ${
                    scrolled ? "opacity-0" : "opacity-30"
                  }`}
                >
                  <div className="w-12 h-12 mx-auto rounded-full bg-white/10 blur-lg group-hover:opacity-60 transition-opacity duration-500"></div>
                </div>

                {/* Logo Container */}
                <div className="relative mb-0.5">
                  {/* Subtle Outer Ring */}
                  <div className="absolute -inset-0.5 bg-white/10 rounded-full opacity-30 group-hover:opacity-60 blur-[1px] transition-all duration-500"></div>

                  {/* Main Logo Circle */}
                  <div
                    className={`relative rounded-full bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900 flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-500 border border-purple-500/30 ${
                      scrolled ? "w-8 h-8 p-1.5" : "w-9 h-9 p-2"
                    }`}
                  >
                    {/* Inner Shine Effect */}
                    <div className="absolute inset-1 rounded-full bg-gradient-to-br from-purple-400/10 via-transparent to-cyan-400/10"></div>

                    {/* Eagle Logo */}
                    <img
                      src={logo}
                      alt="Eagle Logo"
                      className="relative w-full h-full object-contain filter brightness-0 invert drop-shadow-[0_0_6px_rgba(168,85,247,0.7)] group-hover:drop-shadow-[0_0_10px_rgba(168,85,247,1)] transition-all duration-300 z-10"
                    />

                    {/* Accent Light */}
                    <div className="absolute top-0.5 right-0.5 w-0.5 h-0.5 bg-cyan-400 rounded-full blur-[1px] opacity-60"></div>
                  </div>

                  {/* Static Accent Dots */}
                  <div
                    className={`absolute -top-0.5 -right-0.5 w-1 h-1 bg-white/40 rounded-full transition-all duration-500 group-hover:bg-white/80 ${
                      scrolled ? "opacity-0 scale-0" : "opacity-100 scale-100"
                    }`}
                  ></div>
                </div>

                {/* Name & Title with Luxury Typography */}
                <div
                  className={`text-center space-y-0 relative z-10 transition-all duration-500 ${
                    scrolled
                      ? "opacity-0 scale-75 h-0"
                      : "opacity-100 scale-100"
                  }`}
                >
                  <h1 className="text-sm font-black tracking-[0.15em] bg-gradient-to-r from-purple-200 via-pink-200 to-cyan-200 bg-clip-text text-transparent drop-shadow-sm group-hover:scale-105 transition-transform duration-300">
                    YUUUUBIN
                  </h1>
                  <div className="flex items-center gap-1 justify-center">
                    <div className="h-[1px] w-3 bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
                    <p className="text-[7px] text-slate-400 uppercase tracking-[0.15em] font-medium">
                      Developer
                    </p>
                    <div className="h-[1px] w-3 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
                  </div>
                </div>
              </button>
            </div>

            {/* Right Navigation */}
            <div
              className={`flex items-center transition-all duration-500 ${
                scrolled ? "space-x-4" : "space-x-8"
              }`}
            >
              {navItems.slice(2, 4).map((item) => {
                const IconComponent = item.icon;
                const isActive = isActivePath(item.path);

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onMouseMove={(e) => handleMouseMove(e, item.path)}
                    onMouseEnter={() => setHoveredItem(item.path)}
                    onMouseLeave={(e) => {
                      handleMouseLeave(e);
                      setHoveredItem(null);
                    }}
                    className={`group relative flex items-center gap-3 rounded-xl transition-all duration-200 ease-out overflow-hidden ${
                      scrolled ? "px-3 py-2" : "px-4 py-2.5"
                    } ${
                      isActive
                        ? "bg-gradient-to-r from-white/15 to-white/5 text-white shadow-lg shadow-black/30"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {/* Smooth slide background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>

                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>

                    <IconComponent
                      className={`relative z-10 transition-all duration-500 group-hover:rotate-6 ${
                        scrolled ? "w-3.5 h-3.5" : "w-4 h-4"
                      } ${hoveredItem === item.path ? "animate-float" : ""}`}
                    />
                    <span
                      className={`relative z-10 font-medium tracking-wide transition-all duration-300 ${
                        scrolled ? "text-xs" : "text-sm"
                      }`}
                    >
                      {item.label}
                    </span>

                    {/* Active underline with draw animation */}
                    {isActive && (
                      <div className="absolute -bottom-1 left-1/2 w-12 h-0.5 bg-gradient-to-r from-transparent via-white/80 to-transparent rounded-full animate-drawLine origin-center"></div>
                    )}

                    {/* Progressive hover underline */}
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-white/40 via-white/60 to-white/40 rounded-full group-hover:w-10 transition-all duration-500 ease-out"></div>
                  </Link>
                );
              })}

              {/* Contact */}
              <Link
                to="/contact"
                onMouseMove={(e) => handleMouseMove(e, "/contact")}
                onMouseEnter={() => setHoveredItem("/contact")}
                onMouseLeave={(e) => {
                  handleMouseLeave(e);
                  setHoveredItem(null);
                }}
                className={`group relative flex items-center gap-3 rounded-xl transition-all duration-200 ease-out overflow-hidden ${
                  scrolled ? "px-3 py-2" : "px-4 py-2.5"
                } ${
                  isActivePath("/contact")
                    ? "bg-gradient-to-r from-white/15 to-white/5 text-white shadow-lg shadow-black/30"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {/* Smooth slide background */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>

                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>

                <Mail
                  className={`relative z-10 transition-all duration-500 group-hover:rotate-6 ${
                    scrolled ? "w-3.5 h-3.5" : "w-4 h-4"
                  } ${hoveredItem === "/contact" ? "animate-float" : ""}`}
                />
                <span
                  className={`relative z-10 font-medium tracking-wide transition-all duration-300 ${
                    scrolled ? "text-xs" : "text-sm"
                  }`}
                >
                  {t("nav.contact")}
                </span>

                {/* Active underline with draw animation */}
                {isActivePath("/contact") && (
                  <div className="absolute -bottom-1 left-1/2 w-12 h-0.5 bg-gradient-to-r from-transparent via-white/80 to-transparent rounded-full animate-drawLine origin-center"></div>
                )}

                {/* Progressive hover underline */}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-white/40 via-white/60 to-white/40 rounded-full group-hover:w-10 transition-all duration-500 ease-out"></div>
              </Link>
            </div>

            {/* Control Panel */}
            <div
              className={`flex items-center transition-all duration-500 ${
                scrolled ? "gap-2" : "gap-3"
              }`}
            >
              {/* Admin Controls */}
              {isAdmin ? (
                <>
                  {/* Admin Badge */}
                  <div
                    className={`group relative flex items-center gap-2 bg-slate-800/80 hover:bg-slate-800 backdrop-blur-sm border border-emerald-500/30 hover:border-emerald-400/50 rounded-xl transition-all duration-300 overflow-hidden ${
                      scrolled ? "px-3 py-2" : "px-4 py-2.5"
                    }`}
                  >
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/10 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <Settings
                      size={scrolled ? 14 : 16}
                      className="relative z-10 text-emerald-400 group-hover:rotate-90 transition-transform duration-500"
                    />
                    <span
                      className={`relative z-10 text-emerald-400 font-semibold hidden sm:block ${
                        scrolled ? "text-xs" : "text-sm"
                      }`}
                    >
                      Quản Trị
                    </span>
                  </div>

                  {/* Logout Button */}
                  <button
                    onClick={() => {
                      logout();
                      navigate("/");
                    }}
                    className={`group relative bg-slate-800/80 hover:bg-red-600/20 backdrop-blur-sm border border-slate-700/50 hover:border-red-500/50 text-slate-400 hover:text-red-400 rounded-xl transition-all duration-300 overflow-hidden ${
                      scrolled ? "p-2" : "p-2.5"
                    }`}
                    title={t("nav.logout")}
                  >
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 to-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <LogOut
                      size={scrolled ? 16 : 18}
                      className="relative z-10 group-hover:scale-110 group-hover:translate-x-0.5 transition-transform duration-300"
                    />
                  </button>
                </>
              ) : (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowLoginModal(true);
                  }}
                  className={`group relative flex items-center gap-2 bg-slate-800/80 hover:bg-slate-800 backdrop-blur-sm border border-purple-500/30 hover:border-purple-400/50 text-purple-400 hover:text-purple-300 rounded-xl transition-all duration-300 overflow-hidden ${
                    scrolled ? "px-3 py-2" : "px-4 py-2.5"
                  }`}
                  title="Admin Login"
                  type="button"
                >
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/10 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <Shield
                    size={scrolled ? 14 : 16}
                    className="relative z-10 group-hover:scale-110 transition-transform duration-300"
                  />
                  <span
                    className={`relative z-10 font-semibold hidden sm:block ${
                      scrolled ? "text-xs" : "text-sm"
                    }`}
                  >
                    Quản Trị
                  </span>
                </button>
              )}

              {/* Language Toggle */}
              <button
                onClick={toggleLanguage}
                className={`group relative flex items-center gap-2 bg-slate-800/80 hover:bg-slate-800 backdrop-blur-sm border border-slate-700/50 hover:border-cyan-500/50 text-slate-300 hover:text-cyan-300 rounded-xl transition-all duration-300 overflow-hidden ${
                  scrolled ? "px-3 py-2" : "px-4 py-2.5"
                }`}
                title={
                  language === "vi"
                    ? "Switch to English"
                    : "Chuyển sang Tiếng Việt"
                }
              >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <Globe
                  size={scrolled ? 14 : 16}
                  className="relative z-10 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 ease-out"
                />
                <span
                  className={`relative z-10 font-semibold ${
                    scrolled ? "text-xs" : "text-sm"
                  }`}
                >
                  {t("nav.language")}
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Admin Login Modal */}
      <AdminLogin
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={() => {
          localStorage.setItem("isAdmin", "true");
          window.location.reload();
        }}
      />
    </>
  );
}
export default SideBar;
