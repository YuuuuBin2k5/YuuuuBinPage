import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Github, Linkedin, Mail, MapPin, Code, Sparkles } from "lucide-react";
import { useTranslation } from "../../hooks/useTranslation";
import { useParallax } from "../../hooks/useParallax";
import avatarImg from "../../images/avatar.jpg";

const HeroSection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  // Parallax effects with different speeds
  const parallaxSlow = useParallax(0.3);
  const parallaxMedium = useParallax(0.5);
  const parallaxFast = useParallax(0.7);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs with Parallax */}
        <div
          className="absolute top-1/3 left-1/3 w-[600px] h-[600px] bg-indigo-600/15 rounded-full blur-3xl transition-transform duration-0"
          style={{ transform: `translateY(${parallaxSlow}px)` }}
        />
        <div
          className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-3xl transition-transform duration-0"
          style={{ transform: `translateY(${parallaxMedium}px)` }}
        />

        {/* Floating Particles */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-indigo-400/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div
        className={`relative z-10 w-full px-6 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Avatar & Visual */}
          <div className="relative flex justify-center lg:justify-end">
            {/* Decorative Ring */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[450px] h-[450px] border border-indigo-500/20 rounded-full animate-spin-slow" />
            </div>

            {/* Avatar Container */}
            <div className="relative z-10 group">
              {/* Glow Effect */}
              <div className="absolute -inset-4 bg-indigo-600/40 rounded-full opacity-60 blur-2xl group-hover:opacity-80 transition-opacity duration-700" />

              {/* Main Avatar */}
              <div className="relative w-80 h-80 rounded-full overflow-hidden border-4 border-white/10 shadow-2xl group-hover:scale-105 transition-transform duration-500">
                <img
                  src={avatarImg}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-6 py-3 rounded-full shadow-lg shadow-indigo-500/30">
                <div className="flex items-center gap-2">
                  <Sparkles size={16} />
                  <span className="font-bold text-sm">
                    {t("hero.availableForWork")}
                  </span>
                  <Sparkles size={16} />
                </div>
              </div>
            </div>
          </div>

          {/* Right: Text Content */}
          <div className="text-center lg:text-left space-y-8">
            {/* Greeting */}
            <div className="space-y-2">
              <p className="text-slate-400 font-semibold text-lg tracking-wider uppercase animate-fade-in">
                {t("hero.greeting")}
              </p>
              <h1 className="text-6xl md:text-7xl font-black text-white mb-4 animate-slide-up">
                <span className="bg-gradient-to-br from-slate-100 via-indigo-300 to-indigo-400 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(129,140,248,0.3)]">
                  {t("hero.name").split(" ")[0]} {t("hero.name").split(" ")[1]}
                </span>
                <br />
                <span className="bg-gradient-to-br from-indigo-300 via-violet-400 to-slate-400 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(129,140,248,0.3)]">
                  {t("hero.name").split(" ")[2]} {t("hero.name").split(" ")[3]}
                </span>
              </h1>

              {/* Role Text */}
              <div className="h-8 flex items-center justify-center lg:justify-start">
                <p className="text-xl md:text-2xl text-indigo-300 font-light">
                  {t("hero.role")}
                </p>
              </div>
            </div>

            {/* Location & Summary */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-slate-300 justify-center lg:justify-start">
                <MapPin size={20} className="text-indigo-400" />
                <span>{t("hero.location")}</span>
              </div>

              <p className="text-slate-400 text-lg leading-relaxed max-w-2xl">
                {t("hero.description")}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <button 
                onClick={() => navigate('/contact')}
                className="group relative px-8 py-4 bg-indigo-600 text-white font-semibold rounded-full overflow-hidden shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:bg-indigo-500 transition-all duration-300"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Code size={20} />
                  {t("hero.ctaConsulting")}
                </span>
              </button>

              <button 
                onClick={() => navigate('/myproject')}
                className="px-8 py-4 bg-white/5 backdrop-blur-sm text-white font-semibold rounded-full border border-white/10 hover:bg-white/10 hover:border-indigo-500/50 transition-all duration-300"
              >
                {t("hero.ctaPortfolio")}
              </button>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 justify-center lg:justify-start">
              {[
                {
                  icon: Github,
                  href: "https://github.com/YuuuuBin2k5",
                  color: "hover:text-indigo-400",
                },
                {
                  icon: Linkedin,
                  href: "https://www.linkedin.com/in/anh-nh%E1%BA%ADt-0b3ba0353/",
                  color: "hover:text-indigo-300",
                },
                {
                  icon: Mail,
                  href: "mailto:daonguyennhatanh0910@gmail.com",
                  color: "hover:text-violet-400",
                },
              ].map(({ icon: Icon, href, color }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 text-slate-400 ${color} hover:scale-110 hover:border-current transition-all duration-300`}
                >
                  <Icon size={24} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-purple-400/50 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-purple-400 rounded-full animate-scroll" />
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-20px) translateX(10px);
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes spin-reverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }

        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes blink {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }

        @keyframes scroll {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(20px);
            opacity: 0;
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-float {
          animation: float 15s infinite ease-in-out;
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .animate-spin-reverse {
          animation: spin-reverse 15s linear infinite;
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s infinite ease-in-out;
        }
        .animate-blink {
          animation: blink 1s infinite;
        }
        .animate-scroll {
          animation: scroll 2s infinite;
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 1s ease-out;
        }
        .delay-500 {
          animation-delay: 0.5s;
        }
        .delay-700 {
          animation-delay: 0.7s;
        }
        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
};

export default HeroSection;
