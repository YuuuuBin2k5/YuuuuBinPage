// File: SideBar.jsx - ULTRA OPTIMIZED - Zero Lag Navigation
import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import logo from "../../assets/logo.svg";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useLanguage } from "../../contexts/LanguageContext";
import { useTranslation } from "../../hooks/useTranslation";
import AdminLogin from "../admin/AdminLogin";
import {
  LogOut,
  Settings,
  Home,
  FileText,
  Briefcase,
  BookOpen,
  Mail,
  Globe,
  Shield,
} from "lucide-react";

// Memoized NavItem component - prevents re-render
const NavItem = React.memo(({ item, isActive, scrolled, onMouseMove, onMouseLeave }) => {
  const IconComponent = item.icon;
  
  return (
    <Link
      to={item.path}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`group relative flex items-center gap-3 rounded-xl overflow-hidden ${
        scrolled ? "px-3 py-2" : "px-4 py-2.5"
      } ${
        isActive
          ? "bg-gradient-to-r from-white/15 to-white/5 text-white shadow-lg shadow-black/30"
          : "text-slate-400 hover:text-white"
      }`}
      style={{ transition: 'padding 0.2s ease, color 0.15s ease, background 0.15s ease' }}
    >
      <div 
        className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-transparent opacity-0 group-hover:opacity-100 rounded-xl" 
        style={{ transition: 'opacity 0.2s ease' }}
      />

      <IconComponent
        className={`relative z-10 group-hover:rotate-6 ${
          scrolled ? "w-3.5 h-3.5" : "w-4 h-4"
        }`}
        style={{ transition: 'transform 0.15s ease, width 0.2s ease, height 0.2s ease' }}
      />
      <span
        className={`relative z-10 font-medium tracking-wide ${
          scrolled ? "text-xs" : "text-sm"
        }`}
        style={{ transition: 'font-size 0.2s ease' }}
      >
        {item.label}
      </span>

      {isActive && (
        <div className="absolute -bottom-1 left-1/2 w-12 h-0.5 bg-gradient-to-r from-transparent via-white/80 to-transparent rounded-full" />
      )}

      <div 
        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-white/40 via-white/60 to-white/40 rounded-full group-hover:w-10" 
        style={{ transition: 'width 0.2s ease' }}
      />
    </Link>
  );
});

NavItem.displayName = 'NavItem';

function SideBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { language, toggleLanguage } = useLanguage();
  const { t } = useTranslation();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isAdmin, logout } = useAuth();

  // Scroll state - optimized
  const [scrollState, setScrollState] = useState({
    scrolled: false,
    isScrollingDown: false,
  });
  const lastScrollY = useRef(0);
  const scrollTicking = useRef(false);
  const scrollStateRef = useRef(scrollState);

  // Keep ref in sync
  useEffect(() => {
    scrollStateRef.current = scrollState;
  }, [scrollState]);

  // CRITICAL: Empty deps array - prevents re-render on route change
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollTicking.current) {
        scrollTicking.current = true;
        
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const newScrolled = currentScrollY > 20;
          const newIsScrollingDown = currentScrollY > lastScrollY.current && currentScrollY > 100;

          const currentState = scrollStateRef.current;
          if (newScrolled !== currentState.scrolled || newIsScrollingDown !== currentState.isScrollingDown) {
            setScrollState({
              scrolled: newScrolled,
              isScrollingDown: newIsScrollingDown,
            });
          }
          
          lastScrollY.current = currentScrollY;
          scrollTicking.current = false;
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogoClick = useCallback(() => {
    if (location.pathname === "/") {
      sessionStorage.removeItem("hasVisited");
      window.location.reload();
    } else {
      navigate("/");
    }
  }, [location.pathname, navigate]);

  // Simplified magnetic hover
  const handleMouseMove = useCallback((e) => {
    const element = e.currentTarget;
    if (!element) return;
    
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const distance = Math.sqrt(x * x + y * y);
    const maxDistance = 20; // Further reduced for performance
    
    if (distance < maxDistance) {
      const angle = Math.atan2(y, x);
      const strength = (maxDistance - distance) / maxDistance;
      const moveX = Math.cos(angle) * strength * 0.6;
      const moveY = Math.sin(angle) * strength * 0.6;
      element.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
    } else {
      element.style.transform = "translate3d(0, 0, 0)";
    }
  }, []);

  const handleMouseLeave = useCallback((e) => {
    const element = e.currentTarget;
    if (element) {
      element.style.transform = "translate3d(0, 0, 0)";
    }
  }, []);

  // Memoize nav items
  const navItems = useMemo(() => [
    { path: "/", label: t("nav.about"), icon: Home },
    { path: "/myinfomation", label: t("nav.resume"), icon: FileText },
    { path: "/myproject", label: t("nav.projects"), icon: Briefcase },
    { path: "/baitap", label: t("nav.exercises"), icon: BookOpen },
    { path: "/contact", label: t("nav.contact"), icon: Mail },
  ], [t]);

  // Memoize active path check
  const activePath = useMemo(() => location.pathname, [location.pathname]);

  const { scrolled, isScrollingDown } = scrollState;

  // Inline styles for better performance
  const navStyle = useMemo(() => ({
    transition: 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.2s ease, border-color 0.2s ease',
    willChange: isScrollingDown || scrolled ? 'transform' : 'auto'
  }), [isScrollingDown, scrolled]);

  const containerStyle = useMemo(() => ({
    transition: 'height 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
  }), []);

  return (
    <>
      <nav
        className={`fixed left-0 right-0 z-50 ${
          isScrollingDown ? "-top-24" : "top-0"
        } ${
          scrolled
            ? "bg-slate-900/98 backdrop-blur-xl shadow-2xl shadow-purple-500/10 border-b border-purple-500/20"
            : "bg-slate-900/95 backdrop-blur-md border-b border-slate-800/50"
        }`}
        style={navStyle}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div
            className={`flex items-center justify-between ${
              scrolled ? "h-16" : "h-20"
            }`}
            style={containerStyle}
          >
            {/* Left Navigation */}
            <div className={`flex items-center ${scrolled ? "space-x-4" : "space-x-8"}`}>
              {navItems.slice(0, 2).map((item) => (
                <NavItem
                  key={item.path}
                  item={item}
                  isActive={activePath === item.path}
                  scrolled={scrolled}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                />
              ))}
            </div>

            {/* Center Logo */}
            <div 
              className={`flex flex-col items-center ${scrolled ? "scale-90" : "scale-100"}`} 
              style={{ transition: 'transform 0.2s ease' }}
            >
              <button
                onClick={handleLogoClick}
                className="group relative flex flex-col items-center p-1.5 rounded-xl"
              >
                <div className="relative mb-0.5">
                  <div
                    className={`relative rounded-full bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900 flex items-center justify-center shadow-lg group-hover:scale-110 border border-purple-500/30 ${
                      scrolled ? "w-8 h-8 p-1.5" : "w-9 h-9 p-2"
                    }`}
                    style={{ transition: 'transform 0.2s ease, width 0.2s ease, height 0.2s ease' }}
                  >
                    <img
                      src={logo}
                      alt="Eagle Logo"
                      className="relative w-full h-full object-contain filter brightness-0 invert drop-shadow-[0_0_6px_rgba(168,85,247,0.7)] group-hover:drop-shadow-[0_0_10px_rgba(168,85,247,1)] z-10"
                      style={{ transition: 'filter 0.2s ease' }}
                    />
                  </div>
                </div>

                <div
                  className={`text-center space-y-0 relative z-10 ${
                    scrolled ? "opacity-0 scale-75 h-0" : "opacity-100 scale-100"
                  }`}
                  style={{ transition: 'opacity 0.2s ease, transform 0.2s ease, height 0.2s ease' }}
                >
                  <h1 
                    className="text-sm font-black tracking-[0.15em] bg-gradient-to-r from-purple-200 via-pink-200 to-cyan-200 bg-clip-text text-transparent drop-shadow-sm group-hover:scale-105" 
                    style={{ transition: 'transform 0.2s ease' }}
                  >
                    YUUUUBIN
                  </h1>
                  <div className="flex items-center gap-1 justify-center">
                    <div className="h-[1px] w-3 bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
                    <p className="text-[7px] text-slate-400 uppercase tracking-[0.15em] font-medium">
                      Developer
                    </p>
                    <div className="h-[1px] w-3 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
                  </div>
                </div>
              </button>
            </div>

            {/* Right Navigation */}
            <div className={`flex items-center ${scrolled ? "space-x-4" : "space-x-8"}`}>
              {navItems.slice(2, 5).map((item) => (
                <NavItem
                  key={item.path}
                  item={item}
                  isActive={activePath === item.path}
                  scrolled={scrolled}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                />
              ))}
            </div>

            {/* Control Panel */}
            <div className={`flex items-center ${scrolled ? "gap-2" : "gap-3"}`}>
              {isAdmin ? (
                <>
                  <div
                    className={`group relative flex items-center gap-2 bg-slate-800/80 hover:bg-slate-800 backdrop-blur-sm border border-emerald-500/30 hover:border-emerald-400/50 rounded-xl overflow-hidden ${
                      scrolled ? "px-3 py-2" : "px-4 py-2.5"
                    }`}
                    style={{ transition: 'padding 0.2s ease, background-color 0.2s ease, border-color 0.2s ease' }}
                  >
                    <Settings
                      size={scrolled ? 14 : 16}
                      className="relative z-10 text-emerald-400 group-hover:rotate-90"
                      style={{ transition: 'transform 0.2s ease' }}
                    />
                    <span className={`relative z-10 text-emerald-400 font-semibold hidden sm:block ${scrolled ? "text-xs" : "text-sm"}`}>
                      Quản Trị
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      logout();
                      navigate("/");
                    }}
                    className={`group relative bg-slate-800/80 hover:bg-red-600/20 backdrop-blur-sm border border-slate-700/50 hover:border-red-500/50 text-slate-400 hover:text-red-400 rounded-xl overflow-hidden ${
                      scrolled ? "p-2" : "p-2.5"
                    }`}
                    style={{ transition: 'padding 0.2s ease, background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease' }}
                    title={t("nav.logout")}
                  >
                    <LogOut
                      size={scrolled ? 16 : 18}
                      className="relative z-10 group-hover:scale-110 group-hover:translate-x-0.5"
                      style={{ transition: 'transform 0.2s ease' }}
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
                  className={`group relative flex items-center gap-2 bg-slate-800/80 hover:bg-slate-800 backdrop-blur-sm border border-purple-500/30 hover:border-purple-400/50 text-purple-400 hover:text-purple-300 rounded-xl overflow-hidden ${
                    scrolled ? "px-3 py-2" : "px-4 py-2.5"
                  }`}
                  style={{ transition: 'padding 0.2s ease, background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease' }}
                  title="Admin Login"
                  type="button"
                >
                  <Shield
                    size={scrolled ? 14 : 16}
                    className="relative z-10 group-hover:scale-110"
                    style={{ transition: 'transform 0.2s ease' }}
                  />
                  <span className={`relative z-10 font-semibold hidden sm:block ${scrolled ? "text-xs" : "text-sm"}`}>
                    Quản Trị
                  </span>
                </button>
              )}

              <button
                onClick={toggleLanguage}
                className={`group relative flex items-center gap-2 bg-slate-800/80 hover:bg-slate-800 backdrop-blur-sm border border-slate-700/50 hover:border-cyan-500/50 text-slate-300 hover:text-cyan-300 rounded-xl overflow-hidden ${
                  scrolled ? "px-3 py-2" : "px-4 py-2.5"
                }`}
                style={{ transition: 'padding 0.2s ease, background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease' }}
                title={language === "vi" ? "Switch to English" : "Chuyển sang Tiếng Việt"}
              >
                <Globe
                  size={scrolled ? 14 : 16}
                  className="relative z-10 group-hover:scale-110 group-hover:rotate-12"
                  style={{ transition: 'transform 0.2s ease' }}
                />
                <span className={`relative z-10 font-semibold ${scrolled ? "text-xs" : "text-sm"}`}>
                  {t("nav.language")}
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>

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

export default React.memo(SideBar);
