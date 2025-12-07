import React, { useState, useRef, useEffect } from "react";
import { Code2, Download, Sparkles } from "lucide-react";
import { useTranslation } from "../../hooks/useTranslation";
import { useScrollReveal } from "../../hooks/useScrollReveal";

const SkillsShowcase = () => {
  const { t } = useTranslation();
  const [visibleIcons, setVisibleIcons] = useState([]);
  const [particles, setParticles] = useState([]);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const iconsContainerRef = useRef(null);
  const iconRefs = useRef([]);

  // Scroll reveal refs
  const titleReveal = useScrollReveal({ threshold: 0.3, rootMargin: "50px" });
  const iconsReveal = useScrollReveal({ threshold: 0.2, rootMargin: "100px" });

  // Function to center clicked icon
  const handleIconClick = (index, event) => {
    setSelectedIcon(index);
    
    const iconElement = iconRefs.current[index];
    const container = iconsContainerRef.current;
    
    if (iconElement && container) {
      // Get positions
      const iconRect = iconElement.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      
      // Calculate scroll needed to center the icon
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const iconCenter = iconRect.top + scrollTop + iconRect.height / 2;
      const viewportCenter = window.innerHeight / 2;
      const targetScroll = iconCenter - viewportCenter;
      
      // Smooth scroll to center
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  // OPTIMIZED: Bỏ parallax để giảm tính toán

  // OPTIMIZED: Bỏ mouse tracking vì không dùng

  // Generate floating particles - OPTIMIZED: Giảm từ 30 xuống 12
  useEffect(() => {
    if (!iconsReveal.isVisible) return;
    
    const newParticles = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 2,
      duration: Math.random() * 8 + 12,
      delay: Math.random() * 3,
    }));
    setParticles(newParticles);
  }, [iconsReveal.isVisible]);

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



  return (
    <>
      <div className="relative py-20 px-6 overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950">
        {/* Animated Grid Background - OPTIMIZED: Tắt animation */}
        <div className="absolute inset-0 opacity-15">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(to right, rgba(139, 92, 246, 0.08) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(139, 92, 246, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }} />
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="absolute rounded-full bg-gradient-to-br from-purple-400 to-emerald-400 opacity-60"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                animation: `floatParticle ${particle.duration}s ease-in-out infinite`,
                animationDelay: `${particle.delay}s`,
                boxShadow: '0 0 10px rgba(139, 92, 246, 0.5)',
              }}
            />
          ))}
        </div>

        {/* Background Effects - OPTIMIZED: Giảm parallax, tắt scale động */}
        <div className="absolute inset-0">
          <div
            className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl animate-pulse"
            style={{
              willChange: 'transform',
            }}
          />
          <div
            className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-600/15 rounded-full blur-3xl animate-pulse"
            style={{
              animationDelay: "1s",
              willChange: 'transform',
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
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600/20 via-purple-500/20 to-emerald-600/20 rounded-full border border-purple-500/30 mb-6 backdrop-blur-sm shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105">
              <Sparkles size={20} className="text-purple-400 animate-pulse" />
              <span className="text-purple-300 font-semibold tracking-wide">
                {t("skills.techStack")}
              </span>
              <Code2 size={20} className="text-emerald-400 animate-pulse" style={{ animationDelay: '0.5s' }} />
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
              {t("skills.title").split(" & ")[0]} &{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-emerald-400 bg-clip-text text-transparent animate-gradient">
                  {t("skills.title").split(" & ")[1]}
                </span>
                <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-emerald-400 rounded-full opacity-50 blur-sm"></span>
              </span>
            </h2>
            <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              {t("skills.subtitle")}
            </p>
          </div>

          {/* Tech Stack - 3D Spiral Galaxy Layout */}
          <div ref={iconsReveal.ref} className="relative">
            {/* Main Container with 3D Perspective */}
            <div
              ref={iconsContainerRef}
              className="relative max-w-6xl mx-auto"
              style={{ perspective: "2000px" }}
            >
              {/* Spiral Galaxy Layout */}
              <div className="relative w-full h-[600px] mb-12">
                {/* SVG background: Spiral Galaxy - OPTIMIZED: Tắt rotation */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none opacity-10"
                  width="1000"
                  height="600"
                  viewBox="0 0 1000 600"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Spiral arms */}
                  {/* OPTIMIZED: Bỏ SVG animations để giảm lag */}
                  <path
                    d="M500 300 Q550 250 600 280 Q650 310 680 360 Q700 410 690 460 Q670 510 620 540"
                    stroke="url(#gradient1)"
                    strokeWidth="2"
                    fill="none"
                    opacity="0.3"
                  />
                  <path
                    d="M500 300 Q450 250 400 280 Q350 310 320 360 Q300 410 310 460 Q330 510 380 540"
                    stroke="url(#gradient2)"
                    strokeWidth="2"
                    fill="none"
                    opacity="0.3"
                  />
                  <path
                    d="M500 300 Q500 200 550 150 Q600 100 670 90"
                    stroke="url(#gradient3)"
                    strokeWidth="2"
                    fill="none"
                    opacity="0.3"
                  />
                  <path
                    d="M500 300 Q500 200 450 150 Q400 100 330 90"
                    stroke="url(#gradient4)"
                    strokeWidth="2"
                    fill="none"
                    opacity="0.3"
                  />
                  <circle cx="500" cy="300" r="40" fill="url(#centerGlow)" opacity="0.2" />
                  <defs>
                    <linearGradient id="gradient1" x1="500" y1="300" x2="620" y2="540">
                      <stop offset="0%" stopColor="#a855f7" />
                      <stop offset="100%" stopColor="#10b981" />
                    </linearGradient>
                    <linearGradient id="gradient2" x1="500" y1="300" x2="380" y2="540">
                      <stop offset="0%" stopColor="#a855f7" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                    <linearGradient id="gradient3" x1="500" y1="300" x2="670" y2="90">
                      <stop offset="0%" stopColor="#ec4899" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                    <linearGradient id="gradient4" x1="500" y1="300" x2="330" y2="90">
                      <stop offset="0%" stopColor="#ec4899" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                    <radialGradient id="centerGlow">
                      <stop offset="0%" stopColor="#a855f7" />
                      <stop offset="100%" stopColor="transparent" />
                    </radialGradient>
                  </defs>
                </svg>
                {/* Spiral Galaxy Layout - Icons arranged in 3D spiral */}
                {(() => {
                  const total = techStack.length;
                  const centerX = 500;
                  const centerY = 300;
                  const iconSize = 72;
                  
                  // Create spiral layout
                  const spiralIcons = techStack.map((tech, i) => {
                    // Spiral parameters
                    const angle = (i / total) * Math.PI * 4; // 2 full rotations
                    const radius = 80 + (i / total) * 200; // Expanding radius
                    const depth = Math.sin(angle) * 50; // 3D depth effect
                    
                    // Calculate position
                    const x = centerX + Math.cos(angle) * radius;
                    const y = centerY + Math.sin(angle) * radius * 0.6 + (i / total) * 100;
                    
                    // Scale based on depth (closer = larger)
                    const scale = 1 + depth / 100;
                    
                    return (
                      <div
                        key={tech.name}
                        ref={(el) => (iconRefs.current[i] = el)}
                        className={`absolute transition-all duration-700 ${
                          visibleIcons.includes(i)
                            ? "opacity-100"
                            : "opacity-0"
                        } ${selectedIcon === i ? 'z-[100]' : ''}`}
                        style={{
                          left: `calc(${(x / 1000) * 100}% - ${iconSize / 2}px)`,
                          top: `${y}px`,
                          width: `${iconSize}px`,
                          height: `${iconSize}px`,
                          transform: `translateZ(${depth}px) scale(${selectedIcon === i ? scale * 1.2 : scale})`,
                          zIndex: selectedIcon === i ? 100 : Math.floor(50 + depth),
                          transitionDelay: `${i * 50}ms`,
                          willChange: 'transform, opacity',
                          // OPTIMIZED: Chỉ 1 animation thay vì 3
                          animation: `floatIcon ${10 + (i % 5)}s ease-in-out infinite`,
                          animationDelay: `${i * 0.15}s`,
                        }}
                      >
                        {/* 3D Magnetic Card with Glow */}
                        <div
                          className="group relative w-full h-full cursor-pointer"
                          style={{
                            transformStyle: "preserve-3d",
                            transition: "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
                            willChange: 'transform',
                            // OPTIMIZED: Tắt animation này khi không hover
                          }}
                          onClick={(e) => handleIconClick(i, e)}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = `
                              rotateY(180deg) 
                              translateY(-12px) 
                              scale(1.15)
                            `;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = `
                              rotateY(0deg) 
                              translateY(0) 
                              scale(1)
                            `;
                          }}
                        >
                          {/* Glow Effect - OPTIMIZED: Chỉ hiện khi hover */}
                          <div 
                            className="absolute -inset-2 bg-gradient-to-r from-purple-600/0 via-purple-600/50 to-emerald-600/0 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          />
                          
                          {/* Front Face - Icon with Glassmorphism */}
                          <div
                            className="absolute inset-0 flex items-center justify-center backdrop-blur-md rounded-xl overflow-hidden shadow-2xl"
                            style={{
                              backfaceVisibility: "hidden",
                              transform: "rotateY(0deg) translateZ(30px)",
                              background: `
                                linear-gradient(135deg, 
                                  rgba(30, 41, 59, 0.6) 0%, 
                                  rgba(15, 23, 42, 0.8) 100%
                                )
                              `,
                              border: "2px solid rgba(139, 92, 246, 0.3)",
                              boxShadow: `
                                0 8px 32px rgba(0, 0, 0, 0.4),
                                inset 0 2px 8px rgba(255, 255, 255, 0.1),
                                0 0 20px rgba(139, 92, 246, 0.2)
                              `,
                            }}
                          >
                            {/* Animated gradient border */}
                            <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                              style={{
                                background: `
                                  linear-gradient(45deg, 
                                    transparent 30%, 
                                    rgba(139, 92, 246, 0.3) 50%, 
                                    transparent 70%
                                  )
                                `,
                                backgroundSize: '200% 200%',
                                animation: 'shimmer 2s linear infinite'
                              }}
                            />
                            
                            {/* OPTIMIZED: Bỏ animations trên icon */}
                            <div 
                              className="relative z-10 text-3xl transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500"
                            >
                              {tech.icon}
                            </div>
                            
                            {/* Corner decorations */}
                            <div className="absolute top-1 right-1 w-4 h-4 border-t-2 border-r-2 border-purple-400/50 rounded-tr-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="absolute bottom-1 left-1 w-4 h-4 border-b-2 border-l-2 border-emerald-400/50 rounded-bl-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            
                            {/* Sparkle effect - OPTIMIZED: Giảm từ 4 xuống 2 */}
                            <div 
                              className="absolute top-2 left-2 w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping"
                            />
                            <div 
                              className="absolute bottom-2 right-2 w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping" 
                              style={{ animationDelay: '0.2s' }} 
                            />
                          </div>
                          
                          {/* Back Face - Name with Gradient */}
                          <div
                            className="absolute inset-0 flex flex-col items-center justify-center backdrop-blur-md rounded-xl overflow-hidden shadow-2xl"
                            style={{
                              backfaceVisibility: "hidden",
                              transform: "rotateY(180deg) translateZ(30px)",
                              background: `
                                linear-gradient(135deg, 
                                  rgba(139, 92, 246, 0.95) 0%, 
                                  rgba(16, 185, 129, 0.95) 100%
                                )
                              `,
                              border: "2px solid rgba(255, 255, 255, 0.3)",
                            }}
                          >
                            <div className="relative z-10 text-center px-3">
                              <p className="text-sm font-black text-white leading-tight tracking-wide drop-shadow-lg">
                                {tech.name}
                              </p>
                              <div className="mt-2 w-12 h-1 bg-white/80 rounded-full mx-auto shadow-lg" />
                              <p className="text-[10px] text-white/80 mt-1 font-semibold uppercase tracking-wider">
                                {tech.category}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  });
                  
                  return spiralIcons;
                })()}
              </div>
            </div>

            {/* Download CV Button - Premium Design */}
            <div className="mt-20 flex justify-center">
              <button className="group relative px-10 py-5 bg-gradient-to-r from-purple-600 via-pink-600 to-emerald-600 text-white font-bold rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 hover:scale-110 hover:shadow-purple-500/50 hover:shadow-[0_0_40px_rgba(168,85,247,0.6)]">
                {/* Animated shine effect */}
                <div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    transform: 'translateX(-100%)',
                    animation: 'shine 2s ease-in-out infinite'
                  }}
                />
                
                {/* Particle burst on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-white rounded-full"
                      style={{
                        top: '50%',
                        left: '50%',
                        animation: `particleBurst 0.8s ease-out ${i * 0.1}s infinite`,
                        transform: `rotate(${i * 45}deg) translateX(0)`,
                      }}
                    />
                  ))}
                </div>

                <span className="relative z-10 flex items-center gap-3 text-lg">
                  <Download
                    size={24}
                    className="group-hover:translate-y-1 group-hover:scale-110 transition-all duration-300"
                  />
                  <span className="tracking-wide">Download Full Resume</span>
                  <Sparkles 
                    size={20} 
                    className="group-hover:rotate-180 transition-transform duration-500"
                  />
                </span>
                
                {/* Border glow */}
                <div className="absolute inset-0 rounded-2xl border-2 border-white/20 group-hover:border-white/40 transition-colors duration-300" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SkillsShowcase;
