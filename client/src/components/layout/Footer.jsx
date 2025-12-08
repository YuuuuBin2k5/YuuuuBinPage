import React from "react";
import { useTranslation } from "../../hooks/useTranslation";
import logo from "../../assets/logo.svg";
import {
  Github,
  Linkedin,
  Mail,
  Heart,
  ArrowUp,
  Code2,
  Terminal,
  Coffee,
} from "lucide-react";

function Footer() {
  const { t } = useTranslation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/YuuuuBin2k5",
      label: "GitHub",
      color: "hover:text-purple-400",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/anh-nh%E1%BA%ADt-0b3ba0353/",
      label: "LinkedIn",
      color: "hover:text-blue-400",
    },
    {
      icon: Mail,
      href: "mailto:daonguyennhatanh0910@gmail.com",
      label: "Email",
      color: "hover:text-emerald-400",
    },
  ];

  const quickLinks = [
    { name: t("nav.about"), href: "/" },
    { name: t("nav.resume"), href: "./myinfomation" },
    { name: t("nav.projects"), href: "./myproject" },
    { name: t("nav.exercises"), href: "./baitap" },
    { name: t("nav.contact"), href: "./contact" },
  ];

  return (
    <footer className="relative bg-slate-950 border-t border-slate-800/50 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-600/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-emerald-600/5 rounded-full blur-3xl animate-pulse delay-700" />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                <div className="relative w-12 h-12 bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900 rounded-2xl flex items-center justify-center border border-purple-500/30 p-2.5">
                  <img
                    src={logo}
                    alt="Eagle Logo"
                    className="w-full h-full object-contain filter brightness-0 invert"
                  />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-emerald-400 bg-clip-text text-transparent">
                  Đào Nguyễn Nhật Anh
                </h3>
                <p className="text-slate-500 text-sm">Full-stack Developer</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
              {t("hero.description")}
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group p-3 bg-slate-900/50 hover:bg-slate-800/50 border border-slate-800/50 hover:border-purple-500/30 rounded-xl transition-all duration-300 ${social.color}`}
                    aria-label={social.label}
                  >
                    <Icon
                      size={18}
                      className="transition-transform group-hover:scale-110"
                    />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold flex items-center gap-2">
              <Terminal size={16} className="text-purple-400" />
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-purple-400 text-sm transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-4 h-px bg-gradient-to-r from-purple-400 to-transparent transition-all duration-300" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold flex items-center gap-2">
              <Code2 size={16} className="text-emerald-400" />
              Built With
            </h4>
            <div className="space-y-2 text-sm text-slate-400">
              <p className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-blue-400" />
                React + Vite
              </p>
              <p className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-cyan-400" />
                Tailwind CSS
              </p>
              <p className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-red-400" />
                Spring Boot
              </p>
              <p className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-emerald-400" />
                PostgreSQL
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-800/50" />
          </div>
          <div className="relative flex justify-center">
            <div className="px-4 bg-slate-950">
              <Coffee size={16} className="text-slate-600 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <span>© 2025</span>
            <span className="text-purple-400 font-semibold">YuuuuBin</span>
            <span>•</span>
            <span>{t("footer.rights")}</span>
          </div>

          <div className="flex items-center gap-2">
            <span>{t("footer.builtWith")}</span>
            <Heart
              size={14}
              className="text-red-400 animate-pulse"
              fill="currentColor"
            />
            <span>{t("footer.and")}</span>
            <Coffee size={14} className="text-orange-400" />
          </div>

          {/* Scroll to Top */}
          <button
            onClick={scrollToTop}
            className="group p-2 bg-slate-900/50 hover:bg-gradient-to-br hover:from-purple-600/20 hover:to-emerald-600/20 border border-slate-800/50 hover:border-purple-500/30 rounded-lg transition-all duration-300"
            aria-label="Scroll to top"
          >
            <ArrowUp
              size={16}
              className="text-slate-400 group-hover:text-purple-400 transition-colors group-hover:-translate-y-0.5 transform duration-300"
            />
          </button>
        </div>
      </div>

      {/* Accent Line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-pink-500 to-emerald-600" />
    </footer>
  );
}

export default Footer;
