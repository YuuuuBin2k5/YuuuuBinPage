import React, { useState, useRef, useEffect } from "react";
import { Code2, Download } from "lucide-react";
import { useTranslation } from "../../hooks/useTranslation";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useParallax } from "../../hooks/useParallax";

const SkillsShowcase = () => {
  const { t } = useTranslation();
  const [visibleIcons, setVisibleIcons] = useState([]);
  const iconsContainerRef = useRef(null);

  // Scroll reveal refs
  const titleReveal = useScrollReveal({ threshold: 0.3, rootMargin: "50px" });
  const iconsReveal = useScrollReveal({ threshold: 0.2, rootMargin: "100px" });

  // Parallax for background orbs
  const parallaxLeft = useParallax(0.3);
  const parallaxRight = useParallax(0.5);

  // Tech stack - Những công nghệ đã sử dụng
  const techStack = [
    // Programming Languages
    {
      name: "C++",
      icon: "C++",
      color: "from-blue-600 to-blue-700",
      category: "language",
    },
    {
      name: "Java",
      icon: "☕",
      color: "from-red-500 to-orange-500",
      category: "language",
    },
    {
      name: "Python",
      icon: "🐍",
      color: "from-blue-500 to-yellow-500",
      category: "language",
    },
    {
      name: "JavaScript",
      icon: "JS",
      color: "from-yellow-400 to-yellow-500",
      category: "language",
    },

    // Frontend
    {
      name: "HTML5",
      icon: "🌐",
      color: "from-orange-500 to-red-500",
      category: "frontend",
    },
    {
      name: "CSS3",
      icon: "🎨",
      color: "from-blue-500 to-cyan-500",
      category: "frontend",
    },
    {
      name: "React",
      icon: "⚛️",
      color: "from-cyan-400 to-blue-500",
      category: "frontend",
    },

    // Backend & Framework
    {
      name: "Spring Boot",
      icon: "🍃",
      color: "from-emerald-500 to-green-500",
      category: "backend",
    },
    {
      name: "Tailwind",
      icon: "💨",
      color: "from-cyan-400 to-blue-400",
      category: "frontend",
    },
    {
      name: "Bootstrap",
      icon: "🅱️",
      color: "from-purple-500 to-purple-600",
      category: "frontend",
    },

    // Database
    {
      name: "MySQL",
      icon: "🐬",
      color: "from-blue-500 to-blue-600",
      category: "database",
    },

    // Tools
    {
      name: "Git",
      icon: "📦",
      color: "from-orange-500 to-red-500",
      category: "devops",
    },
    {
      name: "VS Code",
      icon: "💻",
      color: "from-blue-500 to-cyan-500",
      category: "devops",
    },
    {
      name: "Figma",
      icon: "🎨",
      color: "from-purple-500 to-pink-500",
      category: "devops",
    },
  ];

  // Wave effect for icons flying in
  useEffect(() => {
    if (!iconsReveal.isVisible) return;

    techStack.forEach((_, index) => {
      setTimeout(() => {
        setVisibleIcons((prev) => [...prev, index]);
      }, index * 80); // 80ms delay between each icon
    });
  }, [iconsReveal.isVisible]);

  // Get animation direction based on position
  const getAnimationClass = (index) => {
    const col = index % 6;
    if (col < 2)
      return "animate-[flyInFromLeft_0.8s_cubic-bezier(0.34,1.56,0.64,1)_forwards]";
    if (col >= 4)
      return "animate-[flyInFromRight_0.8s_cubic-bezier(0.34,1.56,0.64,1)_forwards]";
    if (index < 6)
      return "animate-[flyInFromTop_0.8s_cubic-bezier(0.34,1.56,0.64,1)_forwards]";
    return "animate-[flyInFromBottom_0.8s_cubic-bezier(0.34,1.56,0.64,1)_forwards]";
  };

  return (
    <>
      <div className="relative py-20 px-6 overflow-hidden bg-slate-900">
        {/* Background Effects with Parallax */}
        <div className="absolute inset-0">
          <div
            className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl transition-transform duration-0 animate-pulse"
            style={{
              transform: `translate(${
                parallaxLeft * 0.3
              }px, ${parallaxLeft}px)`,
            }}
          />
          <div
            className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl transition-transform duration-0 animate-pulse"
            style={{
              transform: `translate(${-parallaxRight * 0.3}px, ${
                -parallaxRight * 0.8
              }px)`,
              animationDelay: "1s",
            }}
          />
        </div>

        <div className="relative z-10 w-full px-6">
          {/* Section Title */}
          <div
            ref={titleReveal.ref}
            className={`text-center mb-16 transition-all duration-1000 ease-out ${
              titleReveal.isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600/20 rounded-full border border-purple-500/30 mb-6">
              <Code2 size={20} className="text-purple-400" />
              <span className="text-purple-300 font-semibold">
                {t("skills.techStack")}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              {t("skills.title").split(" & ")[0]} &{" "}
              <span className="bg-gradient-to-r from-purple-400 to-emerald-400 bg-clip-text text-transparent">
                {t("skills.title").split(" & ")[1]}
              </span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              {t("skills.subtitle")}
            </p>
          </div>

          {/* Tech Stack - Diamond Grid with 3D Cards */}
          <div ref={iconsReveal.ref} className="relative">
            {/* Main Container with Diamond Layout */}
            <div
              ref={iconsContainerRef}
              className="relative max-w-5xl mx-auto"
              style={{ perspective: "1200px" }}
            >
              {/* Eagle Wing Layout - Center Spread Fix */}
              <div className="relative w-full h-[520px] mb-12">
                {/* SVG background: eagle silhouette */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  width="1000"
                  height="520"
                  viewBox="0 0 1000 520"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M500 120 Q480 180 300 320 Q200 400 80 480 Q500 320 920 480 Q800 400 700 320 Q520 180 500 120 Z"
                    fill="#232a3a"
                    opacity="0.12"
                  />
                  <ellipse
                    cx="500"
                    cy="120"
                    rx="18"
                    ry="24"
                    fill="#232a3a"
                    opacity="0.18"
                  />
                </svg>
                {/* Split icons into left and right wings, with higher center and extra horizontal gap for center icons */}
                {(() => {
                  const total = techStack.length;
                  const leftWing = techStack.slice(0, Math.ceil(total / 2));
                  const rightWing = techStack.slice(Math.ceil(total / 2));
                  const centerX = 500;
                  const baseY = 120;
                  const tipY = 480;
                  const spread = 420;
                  const iconSize = 64;
                  // Custom horizontal offset for center icons (stronger spread)
                  function getExtraX(i, n) {
                    // Spread out the 3 icons gần giữa
                    if (n < 4) return 0;
                    const mid = Math.floor(n / 2);
                    if (i === mid) return 80; // center
                    if (i === mid - 1) return 40;
                    if (i === mid + 1) return -40;
                    return 0;
                  }
                  // Custom vertical offset for top (peak) icons
                  function getPeakYOffset(i, n) {
                    // Nếu là icon đỉnh (trên cùng), cho cao hơn và giãn ra
                    if (n < 4) return 0;
                    const mid = Math.floor(n / 2);
                    if (i === mid) return -32; // icon đỉnh
                    if (i === mid - 1 || i === mid + 1) return -16; // hai bên đỉnh
                    return 0;
                  }
                  // Left wing
                  const leftIcons = leftWing.map((tech, i) => {
                    const n = leftWing.length;
                    const t = i / (n - 1);
                    const extraX = getExtraX(i, n);
                    const extraY = getPeakYOffset(i, n);
                    const x = centerX - t * spread - extraX;
                    const y =
                      baseY +
                      Math.pow(t, 2.2) * (tipY - baseY) +
                      i * 14 +
                      extraY;
                    const rotation = -32 + t * 32;
                    return (
                      <div
                        key={tech.name}
                        className={`absolute ${
                          visibleIcons.includes(i)
                            ? "opacity-100 scale-100"
                            : "opacity-0 scale-0"
                        }`}
                        style={{
                          left: `calc(${(x / 1000) * 100}% - ${
                            iconSize / 2
                          }px)`,
                          top: `${y}px`,
                          width: `${iconSize}px`,
                          height: `${iconSize}px`,
                          transform: `rotate(${rotation}deg)`,
                        }}
                      >
                        {/* 3D Rotating Card */}
                        <div
                          className="group relative w-full h-full cursor-pointer"
                          style={{
                            transformStyle: "preserve-3d",
                            transition:
                              "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = `rotateY(180deg) translateY(-10px) scale(1.1)`;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = `rotateY(0deg) translateY(0) scale(1)`;
                          }}
                        >
                          {/* Front Face - Icon */}
                          <div
                            className="absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-lg overflow-hidden"
                            style={{
                              backfaceVisibility: "hidden",
                              transform: "rotateY(0deg) translateZ(20px)",
                              background:
                                "linear-gradient(135deg, rgba(30, 41, 59, 0.4) 0%, rgba(15, 23, 42, 0.6) 100%)",
                              border: "1px solid rgba(71, 85, 105, 0.3)",
                              boxShadow:
                                "0 4px 12px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
                            }}
                          >
                            <div className="relative z-10 text-2xl transform group-hover:scale-110 transition-transform duration-300">
                              {tech.icon}
                            </div>
                            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-slate-600/50 rounded-tr-lg" />
                            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-slate-600/50 rounded-bl-lg" />
                          </div>
                          {/* Back Face - Name */}
                          <div
                            className="absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-lg overflow-hidden"
                            style={{
                              backfaceVisibility: "hidden",
                              transform: "rotateY(180deg) translateZ(20px)",
                              background:
                                "linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.95) 100%)",
                              border: "1px solid rgba(100, 116, 139, 0.4)",
                            }}
                          >
                            <div className="relative z-10 text-center px-2">
                              <p className="text-xs font-bold text-white leading-tight">
                                {tech.name}
                              </p>
                              <div className="mt-1 w-8 h-0.5 bg-gradient-to-r from-transparent via-slate-400 to-transparent mx-auto" />
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  });
                  // Right wing
                  const rightIcons = rightWing.map((tech, i) => {
                    const n = rightWing.length;
                    const t = i / (n - 1);
                    const extraX = getExtraX(i, n);
                    const extraY = getPeakYOffset(i, n);
                    const x = centerX + t * spread + extraX;
                    const y =
                      baseY +
                      Math.pow(t, 2.2) * (tipY - baseY) +
                      i * 14 +
                      extraY;
                    const rotation = 32 - t * 32;
                    return (
                      <div
                        key={tech.name}
                        className={`absolute ${
                          visibleIcons.includes(i + leftWing.length)
                            ? "opacity-100 scale-100"
                            : "opacity-0 scale-0"
                        }`}
                        style={{
                          left: `calc(${(x / 1000) * 100}% - ${
                            iconSize / 2
                          }px)`,
                          top: `${y}px`,
                          width: `${iconSize}px`,
                          height: `${iconSize}px`,
                          transform: `rotate(${rotation}deg)`,
                        }}
                      >
                        {/* 3D Rotating Card */}
                        <div
                          className="group relative w-full h-full cursor-pointer"
                          style={{
                            transformStyle: "preserve-3d",
                            transition:
                              "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = `rotateY(180deg) translateY(-10px) scale(1.1)`;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = `rotateY(0deg) translateY(0) scale(1)`;
                          }}
                        >
                          {/* Front Face - Icon */}
                          <div
                            className="absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-lg overflow-hidden"
                            style={{
                              backfaceVisibility: "hidden",
                              transform: "rotateY(0deg) translateZ(20px)",
                              background:
                                "linear-gradient(135deg, rgba(30, 41, 59, 0.4) 0%, rgba(15, 23, 42, 0.6) 100%)",
                              border: "1px solid rgba(71, 85, 105, 0.3)",
                              boxShadow:
                                "0 4px 12px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
                            }}
                          >
                            <div className="relative z-10 text-2xl transform group-hover:scale-110 transition-transform duration-300">
                              {tech.icon}
                            </div>
                            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-slate-600/50 rounded-tr-lg" />
                            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-slate-600/50 rounded-bl-lg" />
                          </div>
                          {/* Back Face - Name */}
                          <div
                            className="absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-lg overflow-hidden"
                            style={{
                              backfaceVisibility: "hidden",
                              transform: "rotateY(180deg) translateZ(20px)",
                              background:
                                "linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.95) 100%)",
                              border: "1px solid rgba(100, 116, 139, 0.4)",
                            }}
                          >
                            <div className="relative z-10 text-center px-2">
                              <p className="text-xs font-bold text-white leading-tight">
                                {tech.name}
                              </p>
                              <div className="mt-1 w-8 h-0.5 bg-gradient-to-r from-transparent via-slate-400 to-transparent mx-auto" />
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  });
                  return [...leftIcons, ...rightIcons];
                })()}
              </div>
            </div>

            {/* Download CV Button - Minimalist */}
            <div className="mt-16 flex justify-center">
              <button className="group relative px-8 py-4 bg-white/5 backdrop-blur-sm text-white font-semibold rounded-full border border-white/10 overflow-hidden shadow-lg transition-all duration-500 hover:scale-105 hover:bg-white/10 hover:border-white/20 hover:shadow-2xl hover:shadow-black/50">
                {/* Animated gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-emerald-600/20 to-purple-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <span className="relative z-10 flex items-center gap-2">
                  <Download
                    size={20}
                    className="group-hover:translate-y-1 transition-transform duration-300"
                  />
                  Download Full Resume
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SkillsShowcase;
