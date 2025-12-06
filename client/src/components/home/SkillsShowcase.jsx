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

  // Tech stack với icons thật (sử dụng SVG hoặc emoji cho demo)
  const techStack = [
    // Frontend Row 1
    {
      name: "React",
      icon: "⚛️",
      color: "from-cyan-400 to-blue-500",
      category: "frontend",
    },
    {
      name: "Next.js",
      icon: "▲",
      color: "from-slate-200 to-slate-400",
      category: "frontend",
    },
    {
      name: "TypeScript",
      icon: "TS",
      color: "from-blue-500 to-blue-600",
      category: "frontend",
    },
    {
      name: "Tailwind",
      icon: "🎨",
      color: "from-cyan-400 to-blue-400",
      category: "frontend",
    },
    {
      name: "Vue",
      icon: "V",
      color: "from-green-400 to-emerald-500",
      category: "frontend",
    },
    {
      name: "Redux",
      icon: "🔄",
      color: "from-purple-500 to-purple-600",
      category: "frontend",
    },

    // Backend Row 2
    {
      name: "Node.js",
      icon: "📗",
      color: "from-green-500 to-green-600",
      category: "backend",
    },
    {
      name: "Java",
      icon: "☕",
      color: "from-red-500 to-orange-500",
      category: "backend",
    },
    {
      name: "Spring",
      icon: "🍃",
      color: "from-emerald-500 to-green-500",
      category: "backend",
    },
    {
      name: "Python",
      icon: "🐍",
      color: "from-blue-500 to-yellow-500",
      category: "backend",
    },
    {
      name: "Express",
      icon: "⚡",
      color: "from-slate-400 to-slate-600",
      category: "backend",
    },
    {
      name: "PHP",
      icon: "🐘",
      color: "from-indigo-500 to-purple-500",
      category: "backend",
    },

    // Database Row 3
    {
      name: "MySQL",
      icon: "🐬",
      color: "from-blue-500 to-blue-600",
      category: "database",
    },
    {
      name: "PostgreSQL",
      icon: "🐘",
      color: "from-blue-600 to-indigo-600",
      category: "database",
    },
    {
      name: "MongoDB",
      icon: "🍃",
      color: "from-green-600 to-emerald-600",
      category: "database",
    },
    {
      name: "Redis",
      icon: "🔴",
      color: "from-red-500 to-red-600",
      category: "database",
    },
    {
      name: "Firebase",
      icon: "🔥",
      color: "from-yellow-500 to-orange-500",
      category: "database",
    },

    // DevOps & Tools Row 4
    {
      name: "Docker",
      icon: "🐳",
      color: "from-blue-400 to-blue-500",
      category: "devops",
    },
    {
      name: "Git",
      icon: "📦",
      color: "from-orange-500 to-red-500",
      category: "devops",
    },
    {
      name: "AWS",
      icon: "☁️",
      color: "from-orange-400 to-yellow-500",
      category: "devops",
    },
    {
      name: "Linux",
      icon: "🐧",
      color: "from-slate-600 to-slate-700",
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
    <div className="relative py-20 px-6 overflow-hidden bg-slate-900">
      {/* Background Effects with Parallax */}
      <div className="absolute inset-0">
        <div
          className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl transition-transform duration-0 animate-pulse"
          style={{
            transform: `translate(${parallaxLeft * 0.3}px, ${parallaxLeft}px)`,
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

        {/* Tech Stack Icons Grid - Flying In Effect */}
        <div ref={iconsReveal.ref} className="relative">
          {/* Container with perspective for 3D effect */}
          <div
            ref={iconsContainerRef}
            className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 md:gap-8 max-w-5xl mx-auto"
            style={{ perspective: "1000px" }}
          >
            {techStack.map((tech, index) => (
              <div
                key={index}
                className={`group relative ${
                  visibleIcons.includes(index)
                    ? getAnimationClass(index)
                    : "opacity-0 scale-0"
                }`}
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Icon Card */}
                <div className="relative aspect-square p-4 bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden transition-all duration-500 hover:scale-110 hover:border-white/30 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/50 cursor-pointer group-hover:animate-[flipIn_0.6s_ease-in-out]">
                  {/* Gradient Background */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${tech.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                  />

                  {/* Glow Effect */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${tech.color} opacity-0 group-hover:opacity-30 blur-2xl transition-opacity duration-500`}
                  />

                  {/* Shine Effect on Hover */}
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -translate-x-full group-hover:translate-x-full"
                    style={{
                      transition: "transform 0.6s ease-in-out, opacity 0.3s",
                    }}
                  />

                  {/* Icon */}
                  <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
                    <div className="text-4xl md:text-5xl mb-2 group-hover:scale-125 transition-transform duration-500">
                      {tech.icon}
                    </div>

                    {/* Tech Name - Shows on hover */}
                    <div className="absolute bottom-0 left-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-xs font-bold text-white text-center drop-shadow-lg">
                        {tech.name}
                      </p>
                    </div>
                  </div>

                  {/* Corner Accent */}
                  <div className="absolute top-1 right-1 w-2 h-2 bg-white/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Floating Badge - Shows category on hover */}
                <div className="absolute -top-2 -right-2 px-2 py-0.5 bg-slate-900/90 backdrop-blur-sm rounded-full border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-100 scale-75">
                  <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">
                    {tech.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Summary */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {[
            {
              label: "Frontend",
              count: techStack.filter((t) => t.category === "frontend").length,
              icon: "🎨",
            },
            {
              label: "Backend",
              count: techStack.filter((t) => t.category === "backend").length,
              icon: "⚙️",
            },
            {
              label: "Database",
              count: techStack.filter((t) => t.category === "database").length,
              icon: "💾",
            },
            {
              label: "DevOps",
              count: techStack.filter((t) => t.category === "devops").length,
              icon: "🚀",
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 bg-slate-800/40 backdrop-blur-sm rounded-2xl border border-white/5 hover:border-white/20 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-black text-white mb-1">
                {stat.count}+
              </div>
              <div className="text-sm text-slate-400 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
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
  );
};

export default SkillsShowcase;
