import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext";
import { profileData } from "../../data/profileData";
import logo from "../../assets/logo.svg";
import {
  Github,
  Linkedin,
  Mail,
  ArrowUp,
  Code2,
  Terminal,
} from "lucide-react";

function Footer() {
  const { language } = useLanguage();
  const isEn = language === "en";
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = [
    {
      icon: Github,
      href: profileData.githubUrl,
      label: "GitHub",
    },
    {
      icon: Linkedin,
      href: profileData.linkedinUrl,
      label: "LinkedIn",
    },
    {
      icon: Mail,
      href: `mailto:${profileData.email}`,
      label: "Email",
    },
  ];

  const quickLinks = [
    { name: isEn ? "Home" : "Trang Chủ", href: "/" },
    { name: isEn ? "Projects" : "Dự Án", href: "/myproject" },
    { name: isEn ? "Engineering Lab" : "Lab Kỹ Thuật", href: "/baitap" },
    { name: isEn ? "Contact" : "Liên Hệ", href: "/contact" },
  ];

  return (
    <footer className="relative bg-slate-950 border-t border-slate-800/60 overflow-hidden">
      {/* Subtle Static Grid Texture */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.3) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(255, 255, 255, 0.3) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* Brand & Value Summary */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-900 border border-indigo-500/30 flex items-center justify-center p-2">
                <img
                  src={logo}
                  alt="Eagle Logo"
                  className="w-full h-full object-contain filter brightness-0 invert"
                />
              </div>
              <div>
                <span className="text-lg font-bold text-white block">
                  {isEn ? profileData.fullName.en : profileData.fullName.vi}
                </span>
                <span className="text-xs text-indigo-400 font-mono">
                  {isEn ? profileData.professionalTitle.en : profileData.professionalTitle.vi}
                </span>
              </div>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
              {isEn ? profileData.summary.en : profileData.summary.vi}
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-1">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    aria-label={social.label}
                  >
                    <Icon className="w-4 h-4" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white font-mono flex items-center gap-2">
              <Terminal className="w-4 h-4 text-indigo-400" aria-hidden="true" />
              <span>{isEn ? "Quick Navigation" : "Điều Hướng Nhanh"}</span>
            </h4>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-slate-400 hover:text-indigo-300 transition-colors focus:outline-none focus:underline"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Technical Specs & Stack Note */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white font-mono flex items-center gap-2">
              <Code2 className="w-4 h-4 text-emerald-400" aria-hidden="true" />
              <span>{isEn ? "Architecture & Stack" : "Kiến Trúc & Công Nghệ"}</span>
            </h4>
            <div className="space-y-2 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" aria-hidden="true" />
                <span>React 19 & Vite</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" aria-hidden="true" />
                <span>Tailwind CSS</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
                <span>Spring Boot 3.2</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400" aria-hidden="true" />
                <span>PostgreSQL on Supabase</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Scroll to Top */}
        <div className="pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <div>
            <span>© {currentYear} </span>
            <span className="text-slate-300 font-semibold">
              {isEn ? profileData.fullName.en : profileData.fullName.vi}
            </span>
            <span> • {isEn ? "All Rights Reserved" : "Đã đăng ký bản quyền"}</span>
          </div>

          <div className="flex items-center gap-4">
            <span>{profileData.university.short} • {profileData.major[isEn ? "en" : "vi"]}</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400"
              aria-label={isEn ? "Scroll to top of page" : "Cuộn lên đầu trang"}
              title={isEn ? "Scroll to top" : "Lên đầu trang"}
            >
              <ArrowUp className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
