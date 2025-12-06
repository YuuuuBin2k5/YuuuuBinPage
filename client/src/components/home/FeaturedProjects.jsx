import React, { useState, useEffect, useRef } from "react";
import {
  ExternalLink,
  Github,
  ArrowUpRight,
  Sparkles,
  Code2,
  Zap,
  Star,
} from "lucide-react";
import { useTranslation } from "../../hooks/useTranslation";
import { projectAPI } from "../../services/projectService";

const FeaturedProjects = () => {
  const { t } = useTranslation();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [visibleCards, setVisibleCards] = useState([]);
  const cardRefs = useRef([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Clear cache first
        localStorage.removeItem("projects_all");

        const data = await projectAPI.getAll();
        console.log("=== FETCHED PROJECTS ===", data);

        if (!data || data.length === 0) {
          console.warn("No projects returned from API");
          return;
        }

        // Map API response to component format
        const mappedProjects = data.map((project) => {
          const imageUrl = project.coverImage || project.imageUrl || "";
          console.log(`📷 Project "${project.name}": Image = "${imageUrl}"`);

          return {
            ...project,
            imageUrl: imageUrl,
            liveUrl: project.demoUrl || project.liveUrl,
          };
        });

        console.log("=== MAPPED PROJECTS ===", mappedProjects);
        setProjects(mappedProjects.slice(0, 6));
      } catch (error) {
        console.error("❌ Error loading featured projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Scroll Reveal Animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = cardRefs.current.indexOf(entry.target);
            if (index !== -1 && !visibleCards.includes(index)) {
              setTimeout(() => {
                setVisibleCards((prev) => [...prev, index]);
              }, index * 100); // Stagger animation
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => {
      cardRefs.current.forEach((card) => {
        if (card) observer.unobserve(card);
      });
    };
  }, [projects, visibleCards]);

  if (loading) {
    return (
      <div className="mb-20">
        <div className="text-center mb-12">
          <p className="text-slate-400">
            {(localStorage.getItem("language") || "en") === "vi"
              ? "Đang tải..."
              : "Loading..."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-32 relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Section Header */}
      <div className="text-center mb-20 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-purple-500/20 rounded-full mb-6">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span className="text-purple-400 text-sm font-bold uppercase tracking-wider">
            Featured Projects
          </span>
        </div>

        <h3 className="text-5xl md:text-7xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-pink-200">
          My Creative Journey
        </h3>

        <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
          Products crafted with passion and boundless creativity
        </p>
      </div>

      {/* Bento Grid Layout - Creative Asymmetric Design */}
      <div className="relative z-10 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 lg:gap-6 auto-rows-[280px]">
          {projects.map((project, index) => {
            // Define creative grid spans for asymmetric layout
            const gridLayouts = [
              "md:col-span-2 lg:col-span-3 md:row-span-2", // Large featured
              "md:col-span-2 lg:col-span-3 md:row-span-1", // Wide
              "md:col-span-2 lg:col-span-2 md:row-span-2", // Medium tall
              "md:col-span-2 lg:col-span-2 md:row-span-1", // Medium
              "md:col-span-2 lg:col-span-2 md:row-span-1", // Medium
              "md:col-span-2 lg:col-span-2 md:row-span-1", // Medium
            ];

            const isLarge = index === 0;
            const isTall = index === 2;

            return (
              <div
                key={project.id}
                ref={(el) => (cardRefs.current[index] = el)}
                onMouseEnter={() => setHoveredProject(index)}
                onMouseLeave={() => setHoveredProject(null)}
                onMouseMove={(e) => {
                  if (hoveredProject === index) {
                    const card = e.currentTarget;
                    const rect = card.getBoundingClientRect();
                    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
                    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
                    card.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg) translateZ(20px)`;
                  }
                }}
                className={`group relative transition-all duration-700 ${
                  gridLayouts[index] || "md:col-span-2"
                } ${
                  visibleCards.includes(index)
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                }`}
                style={{
                  transitionDelay: visibleCards.includes(index)
                    ? "0ms"
                    : `${index * 100}ms`,
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Subtle Elevation Shadow */}
                <div
                  className={`absolute -inset-2 bg-white/10 rounded-3xl blur-2xl transition-all duration-700 ${
                    hoveredProject === index
                      ? "opacity-100 scale-105"
                      : "opacity-0 scale-100"
                  }`}
                />

                {/* Main Card - Full Height */}
                <div
                  className="relative h-full bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-slate-800/90 backdrop-blur-2xl border border-slate-700/30 rounded-2xl overflow-hidden transition-all duration-700 group-hover:border-white/20 group-hover:shadow-[0_20px_70px_rgba(0,0,0,0.6)]"
                  style={{ transformStyle: "preserve-3d" }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform =
                      "perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0px)";
                  }}
                >
                  {/* Mesh Gradient Background */}
                  <div className="absolute inset-0 opacity-30">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(236,72,153,0.2),rgba(255,255,255,0))]" />
                  </div>

                  {/* Animated Orbs */}
                  {hoveredProject === index && (
                    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
                      <div
                        className="absolute w-32 h-32 bg-purple-500 rounded-full blur-3xl animate-float"
                        style={{
                          top: "10%",
                          left: "20%",
                          animationDelay: "0s",
                        }}
                      />
                      <div
                        className="absolute w-24 h-24 bg-pink-500 rounded-full blur-3xl animate-float"
                        style={{
                          top: "60%",
                          right: "30%",
                          animationDelay: "1s",
                        }}
                      />
                      <div
                        className="absolute w-20 h-20 bg-indigo-500 rounded-full blur-2xl animate-float"
                        style={{
                          bottom: "20%",
                          left: "40%",
                          animationDelay: "2s",
                        }}
                      />
                    </div>
                  )}

                  {/* Content Layout - Responsive to card size */}
                  <div
                    className={`relative h-full flex flex-col justify-between ${
                      isLarge || isTall ? "p-8" : "p-6"
                    }`}
                  >
                    {/* Background Image with Smooth Hover Effect */}
                    {project.imageUrl ? (
                      <div className="absolute inset-0 overflow-hidden">
                        {/* Main Image - Brighter and Smoother */}
                        <div
                          className="absolute inset-0 transition-all duration-1000 ease-out group-hover:scale-105"
                          style={{
                            backgroundImage: `url(${project.imageUrl})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            filter:
                              "brightness(0.7) saturate(1.1) contrast(1.05)",
                          }}
                        />

                        {/* Subtle Overlay - Less on hover for brightness */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-slate-900/30 group-hover:from-slate-900/90 group-hover:via-slate-900/50 group-hover:to-transparent transition-all duration-1000" />

                        {/* Smooth Color Wash on Hover */}
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 via-pink-600/0 to-indigo-600/0 group-hover:from-purple-600/10 group-hover:via-pink-600/10 group-hover:to-indigo-600/10 transition-all duration-1000 ease-out" />

                        {/* Subtle Glow Border Effect */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5" />
                        </div>
                      </div>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-slate-800/50">
                        <Code2 className="w-16 h-16 text-slate-600" />
                      </div>
                    )}

                    {/* Top Section - Badges & Quick Actions */}
                    <div className="relative z-20 flex items-start justify-between">
                      {/* Number Badge */}
                      <div
                        className={`inline-flex items-center justify-center ${
                          isLarge ? "w-14 h-14 text-xl" : "w-10 h-10 text-lg"
                        } font-bold bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-lg transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        {/* Top Project Badge */}
                        {index < 3 && (
                          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-xl rounded-full border border-yellow-500/30">
                            <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                            <span className="text-xs font-semibold text-yellow-300">
                              Top {index + 1}
                            </span>
                          </div>
                        )}

                        {/* Quick Action Icons */}
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-9 h-9 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg flex items-center justify-center hover:bg-white/20 hover:border-white/40 hover:scale-110 transition-all duration-300"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <ExternalLink className="w-4 h-4 text-white" />
                            </a>
                          )}
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-9 h-9 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg flex items-center justify-center hover:bg-white/20 hover:border-white/40 hover:scale-110 transition-all duration-300"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Github className="w-4 h-4 text-white" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Section - Project Info */}
                    <div
                      className={`relative z-20 ${
                        isLarge || isTall ? "space-y-4" : "space-y-3"
                      }`}
                    >
                      {/* Decorative Corner Accent */}
                      <div className="absolute -top-8 right-0 w-24 h-24 bg-gradient-to-br from-purple-500/10 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      {/* Title & Description */}
                      <div className="space-y-2">
                        <h3
                          className={`${
                            isLarge
                              ? "text-3xl"
                              : isTall
                              ? "text-2xl"
                              : "text-xl"
                          } font-bold text-white tracking-tight`}
                        >
                          <span className="relative inline-block group-hover:translate-x-1 transition-transform duration-300">
                            {project.name}
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-500"></span>
                          </span>
                        </h3>

                        {(isLarge || isTall) && project.description && (
                          <p
                            className={`text-slate-300 ${
                              isLarge
                                ? "text-base line-clamp-3"
                                : "text-sm line-clamp-2"
                            } leading-relaxed`}
                          >
                            {project.description}
                          </p>
                        )}
                      </div>

                      {/* Tech Stack Tags - Hover Reveal with Stagger */}
                      {project.techStacks && project.techStacks.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {project.techStacks
                            .slice(0, isLarge ? 6 : 4)
                            .map((tech, techIndex) => (
                              <span
                                key={techIndex}
                                className={`px-3 py-1 text-xs font-medium bg-white/10 backdrop-blur-xl text-slate-200 rounded-full border border-white/20 transition-all duration-500 hover:bg-white/20 hover:border-white/40 hover:-translate-y-0.5 ${
                                  hoveredProject === index
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-2"
                                }`}
                                style={{
                                  transitionDelay: `${techIndex * 50}ms`,
                                }}
                              >
                                {tech.name}
                              </span>
                            ))}
                          {project.techStacks.length > (isLarge ? 6 : 4) && (
                            <span className="px-3 py-1 text-xs font-medium bg-purple-500/20 backdrop-blur-xl text-purple-300 rounded-full border border-purple-400/30">
                              +{project.techStacks.length - (isLarge ? 6 : 4)}
                            </span>
                          )}
                        </div>
                      )}

                      {/* CTA Button for Large Cards */}
                      {isLarge && (
                        <div className="pt-2 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100">
                          <a
                            href={project.liveUrl || "#"}
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-sm font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/50"
                            onClick={(e) => e.stopPropagation()}
                          >
                            View Project
                            <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Subtle Bottom Border on Hover */}
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-white/30 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-20px) scale(1.1);
          }
        }
        
        @keyframes scanDown {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100vh);
          }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-scan-down {
          animation: scanDown 3s ease-in-out infinite;
        }
      `}</style>

      {/* View All Projects CTA - Minimalist */}
      <div className="text-center relative">
        <div className="inline-flex items-center gap-4">
          <a
            href="/my-project"
            className="group/all relative px-8 py-4 bg-white/5 backdrop-blur-sm text-white font-bold rounded-full border border-white/10 overflow-hidden transition-all duration-500 hover:scale-105 hover:bg-white/10 hover:border-white/20 hover:shadow-2xl hover:shadow-black/50"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Explore More Projects
              <ArrowUpRight className="w-5 h-5 group-hover/all:translate-x-1 group-hover/all:-translate-y-1 transition-transform" />
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProjects;
