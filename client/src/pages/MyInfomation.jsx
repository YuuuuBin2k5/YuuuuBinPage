import React, { useState, useEffect } from "react";
import {
  Code,
  Database,
  Server,
  Laptop,
  Award,
  Briefcase,
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Download,
  Terminal,
  Zap,
  CheckCircle2,
  Star,
  TrendingUp,
  Target,
  Globe,
  Facebook,
  Instagram,
} from "lucide-react";

function MyInfomation() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState("skills");

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Personal Info
  const personalInfo = {
    name: "ĐÀO NGUYỄN NHẬT ANH",
    title: "FULL STACK DEVELOPER",
    birthDate: "09/10/2005",
    email: "daonguyennhatanh0910@gmail.com",
    phone: "0786 759 178",
    location: "KTX D2, ĐHSPKT TP.HCM",
    github: "https://github.com/YuuuuBin2k5",
    linkedin: "https://www.linkedin.com/in/anh-nh%E1%BA%ADt-0b3ba0353/",
    facebook: "https://www.facebook.com/YuuuBinn/",
    instagram: "https://www.instagram.com/yuuubin2k5/",
  };

  // Skills
  const skills = {
    frontend: [
      { name: "HTML5", level: 70, color: "orange" },
      { name: "CSS3", level: 60, color: "blue" },
      { name: "React.js", level: 40, color: "cyan" },
      { name: "JavaScript/ES6+", level: 50, color: "yellow" },
      { name: "Tailwind CSS", level: 45, color: "cyan" },
    ],
    backend: [
      { name: "Java/Spring Boot", level: 30, color: "red" },
      { name: "Python/Flask", level: 35, color: "blue" },
      { name: "C#/.NET", level: 40, color: "purple" },
      { name: "RESTful API", level: 35, color: "green" },
    ],
    database: [
      { name: "MySQL", level: 35, color: "blue" },
      { name: "SQL Server", level: 38, color: "red" },
      { name: "SQLite", level: 30, color: "cyan" },
      { name: "MongoDB", level: 20, color: "green" },
    ],
    tools: [
      { name: "Git/GitHub", level: 65, color: "purple" },
      { name: "Docker", level: 50, color: "blue" },
      { name: "VS Code", level: 75, color: "cyan" },
      { name: "Postman", level: 55, color: "orange" },
    ],
  };

  // Projects (thay vì Experience vì chưa có kinh nghiệm làm việc)
  const projects = [
    {
      title: "Quản Lý Phòng GYM",
      tech: "C#, WinForms/WPF, SQL Server",
      period: "2024",
      description: "Ứng dụng desktop quản lý phòng gym với đầy đủ chức năng quản lý hội viên, gói tập, lịch tập và thanh toán",
      achievements: [
        "Thiết kế giao diện desktop chuyên nghiệp với WinForms/WPF",
        "Xây dựng CRUD hoàn chỉnh cho hội viên, nhân viên, dịch vụ",
        "Tích hợp SQL Server để quản lý dữ liệu hiệu quả",
      ],
      github: "https://github.com/YuuuuBin2k5/QuanLyPhongGYM",
    },
    {
      title: "Todolist Web App",
      tech: "Python, Flask/Django, SQLite/MySQL",
      period: "2024",
      description: "Ứng dụng web quản lý công việc với giao diện thân thiện, hỗ trợ CRUD và đánh dấu hoàn thành",
      achievements: [
        "Xây dựng backend với Flask/Django và REST API",
        "Thiết kế giao diện responsive với HTML/CSS/Bootstrap",
        "Triển khai database với SQLite/MySQL",
      ],
      github: "https://github.com/YuuuuBin2k5/Todolist",
    },
    {
      title: "Trí Tuệ Nhân Tạo - UTE",
      tech: "Python, Scikit-learn, TensorFlow, Pandas",
      period: "2024",
      description: "Dự án học tập AI/ML với các thuật toán Machine Learning cơ bản và nâng cao",
      achievements: [
        "Triển khai các bài toán phân loại, hồi quy, clustering",
        "Áp dụng TensorFlow/Keras để huấn luyện mô hình",
        "Trực quan hóa dữ liệu với Matplotlib/Seaborn",
      ],
      github: "https://github.com/YuuuuBin2k5/TriTueNhanTao_UTE",
    },
    {
      title: "Portfolio Website",
      tech: "React, Spring Boot, MySQL, Tailwind CSS",
      period: "2024 - Present",
      description: "Website portfolio cá nhân với thiết kế hiện đại, quản lý dự án và bài tập",
      achievements: [
        "Xây dựng full-stack với React và Spring Boot",
        "Thiết kế UI/UX chuyên nghiệp với Tailwind CSS",
        "Tích hợp EmailJS cho form liên hệ",
      ],
      github: "https://github.com/YuuuuBin2k5/WebCaNhan",
    },
  ];

  // Education
  const education = [
    {
      degree: "Cử Nhân Công Nghệ Thông Tin",
      school: "Đại Học Sư Phạm Kỹ Thuật TP.HCM",
      period: "2023 - 2027",
      currentYear: "Năm 3",
      status: "Đang theo học",
    },
  ];

  // Career Objective
  const objective = "Sinh viên năm 3 ngành Công Nghệ Thông Tin với đam mê phát triển phần mềm. Tìm kiếm cơ hội thực tập Full Stack Developer để áp dụng kiến thức về React, Spring Boot, và các công nghệ web hiện đại vào dự án thực tế. Mong muốn học hỏi và phát triển kỹ năng lập trình trong môi trường chuyên nghiệp.";

  // Languages
  const languages = [
    { name: "Tiếng Việt", level: "Native" },
    { name: "Tiếng Anh", level: "Đọc hiểu tài liệu kỹ thuật" },
  ];

  // Soft Skills
  const softSkills = [
    "Tự học và nghiên cứu công nghệ mới",
    "Làm việc nhóm hiệu quả",
    "Giải quyết vấn đề logic",
    "Quản lý thời gian tốt",
  ];

  const getColorClass = (color) => {
    const colors = {
      cyan: "from-cyan-500 to-blue-500",
      yellow: "from-yellow-500 to-orange-500",
      orange: "from-orange-500 to-red-500",
      blue: "from-blue-500 to-cyan-500",
      purple: "from-purple-500 to-pink-500",
      red: "from-red-500 to-orange-500",
      green: "from-green-500 to-emerald-500",
    };
    return colors[color] || colors.cyan;
  };

  return (
    <div className={`min-h-screen bg-black -mt-24 pt-24 relative overflow-hidden transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Background effects */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 0, 0.03) 2px, rgba(0, 255, 0, 0.03) 4px)`,
        }}></div>
      </div>

      {/* Header */}
      <div className={`px-6 py-8 relative transition-all duration-700 ${isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}>
        <div className="max-w-6xl mx-auto">
          {/* Title */}
          <div className="text-center mb-8">
            <div className="inline-block mb-4 px-4 py-1 bg-black border-2 border-green-500">
              <span className="text-green-400 font-mono font-black text-xs tracking-widest">
                RESUME_PROTOCOL
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black mb-2 tracking-tight">
              <span className="text-green-400">{personalInfo.name}</span>
            </h1>
            
            <p className="text-cyan-400 font-mono text-xl font-bold mb-6">
              <span className="text-gray-500">// </span>
              {personalInfo.title}
            </p>

            {/* Contact Info - Compact */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-mono mb-6">
              <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors">
                <Mail className="w-4 h-4" />
                {personalInfo.email}
              </a>
              <span className="text-slate-700">|</span>
              <a href={`tel:${personalInfo.phone}`} className="flex items-center gap-2 text-slate-400 hover:text-green-400 transition-colors">
                <Phone className="w-4 h-4" />
                {personalInfo.phone}
              </a>
              <span className="text-slate-700">|</span>
              <span className="flex items-center gap-2 text-slate-400">
                <MapPin className="w-4 h-4" />
                {personalInfo.location}
              </span>
            </div>

            {/* Social Links */}
            <div className="flex items-center justify-center gap-3">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-black border-2 border-slate-700 hover:border-purple-400 hover:bg-purple-500/10 transition-all"
                title="GitHub"
              >
                <Github className="w-5 h-5 text-slate-400 hover:text-purple-400" />
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-black border-2 border-slate-700 hover:border-blue-400 hover:bg-blue-500/10 transition-all"
                title="LinkedIn"
              >
                <Linkedin className="w-5 h-5 text-slate-400 hover:text-blue-400" />
              </a>
              <a
                href={personalInfo.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-black border-2 border-slate-700 hover:border-cyan-400 hover:bg-cyan-500/10 transition-all"
                title="Facebook"
              >
                <Facebook className="w-5 h-5 text-slate-400 hover:text-cyan-400" />
              </a>
              <a
                href={personalInfo.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-black border-2 border-slate-700 hover:border-pink-400 hover:bg-pink-500/10 transition-all"
                title="Instagram"
              >
                <Instagram className="w-5 h-5 text-slate-400 hover:text-pink-400" />
              </a>
            </div>
          </div>

          {/* Download CV Button */}
          <div className="text-center mb-8">
            <button className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-600 to-cyan-600 hover:from-green-500 hover:to-cyan-500 text-black font-mono font-black border-4 border-green-400 transition-all duration-300 hover:scale-105">
              <Download className="w-5 h-5" />
              DOWNLOAD_CV.pdf
              <Zap className="w-5 h-5 animate-pulse" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 pb-12 relative">
        <div className="max-w-6xl mx-auto">
          {/* Section Tabs */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {["about", "skills", "projects", "education"].map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`px-6 py-2 font-mono font-bold text-sm tracking-wider border-2 transition-all duration-300 ${
                  activeSection === section
                    ? "bg-cyan-500 text-black border-cyan-400"
                    : "bg-black text-slate-400 border-slate-700 hover:border-cyan-500 hover:text-cyan-400"
                }`}
              >
                {section.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Skills Section */}
          {activeSection === "skills" && (
            <div className="grid md:grid-cols-2 gap-6 animate-in fade-in duration-500">
              {Object.entries(skills).map(([category, items]) => (
                <div key={category} className="bg-black border-4 border-cyan-500/50 p-6">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-cyan-500/30">
                    {category === "frontend" && <Laptop className="w-6 h-6 text-cyan-400" />}
                    {category === "backend" && <Server className="w-6 h-6 text-green-400" />}
                    {category === "database" && <Database className="w-6 h-6 text-blue-400" />}
                    {category === "tools" && <Terminal className="w-6 h-6 text-purple-400" />}
                    <h3 className="text-xl font-black text-white font-mono tracking-wider uppercase">
                      {category}
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {items.map((skill, index) => (
                      <div key={index}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-slate-300 font-mono font-bold text-sm">
                            {skill.name}
                          </span>
                          <span className="text-cyan-400 font-mono font-black text-xs">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="h-2 bg-slate-900 border-2 border-slate-700">
                          <div
                            className={`h-full bg-gradient-to-r ${getColorClass(skill.color)} transition-all duration-1000`}
                            style={{ width: isLoaded ? `${skill.level}%` : '0%' }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* About Section */}
          {activeSection === "about" && (
            <div className="space-y-6 animate-in fade-in duration-500">
              {/* Career Objective */}
              <div className="bg-black border-4 border-cyan-500/50 p-8">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-cyan-500/30">
                  <Target className="w-6 h-6 text-cyan-400" />
                  <h3 className="text-2xl font-black text-white font-mono">MỤC TIÊU NGHỀ NGHIỆP</h3>
                </div>
                <p className="text-slate-300 leading-relaxed text-lg">{objective}</p>
              </div>

              {/* Soft Skills */}
              <div className="bg-black border-4 border-green-500/50 p-8">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-green-500/30">
                  <Star className="w-6 h-6 text-green-400" />
                  <h3 className="text-2xl font-black text-white font-mono">KỸ NĂNG MỀM</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {softSkills.map((skill, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-slate-300">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div className="bg-black border-4 border-purple-500/50 p-8">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-purple-500/30">
                  <Globe className="w-6 h-6 text-purple-400" />
                  <h3 className="text-2xl font-black text-white font-mono">NGÔN NGỮ</h3>
                </div>
                <div className="space-y-4">
                  {languages.map((lang, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="text-slate-300 font-mono font-bold">{lang.name}</span>
                      <span className="text-purple-400 font-mono">{lang.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Projects Section */}
          {activeSection === "projects" && (
            <div className="space-y-6 animate-in fade-in duration-500">
              {projects.map((project, index) => (
                <div key={index} className="bg-black border-4 border-green-500/50 p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-cyan-500 flex items-center justify-center border-2 border-white/20">
                      <Code className="w-6 h-6 text-black" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-black text-white mb-1">{project.title}</h3>
                      <p className="text-cyan-400 font-mono font-bold mb-1">{project.tech}</p>
                      <p className="text-slate-500 font-mono text-sm">{project.period}</p>
                    </div>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-slate-800 hover:bg-slate-700 border-2 border-slate-600 hover:border-green-400 transition-all"
                    >
                      <Github className="w-5 h-5 text-slate-400 hover:text-green-400" />
                    </a>
                  </div>

                  <p className="text-slate-300 mb-4">{project.description}</p>

                  <div className="space-y-2">
                    {project.achievements.map((achievement, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-400 text-sm">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Education Section */}
          {activeSection === "education" && (
            <div className="space-y-6 animate-in fade-in duration-500">
              {education.map((edu, index) => (
                <div key={index} className="bg-black border-4 border-blue-500/50 p-8">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center border-2 border-white/20">
                      <GraduationCap className="w-8 h-8 text-black" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-3xl font-black text-white mb-2">{edu.degree}</h3>
                      <p className="text-cyan-400 font-mono font-bold text-lg mb-1">{edu.school}</p>
                      <p className="text-slate-500 font-mono mb-2">{edu.period}</p>
                      <div className="flex items-center gap-4">
                        <span className="px-3 py-1 bg-blue-500/20 border-2 border-blue-400 text-blue-400 font-mono font-bold text-sm">
                          {edu.currentYear}
                        </span>
                        <span className="px-3 py-1 bg-green-500/20 border-2 border-green-400 text-green-400 font-mono font-bold text-sm">
                          {edu.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t-2 border-blue-500/30">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3">
                        <TrendingUp className="w-6 h-6 text-green-400" />
                        <span className="text-slate-300 font-mono">
                          Chuyên ngành: <span className="text-green-400 font-bold">Full Stack Development</span>
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Award className="w-6 h-6 text-yellow-400" />
                        <span className="text-slate-300 font-mono">
                          Tốt nghiệp dự kiến: <span className="text-yellow-400 font-bold">2027</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Glowing orbs */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 blur-3xl animate-pulse"></div>
        <div className="absolute top-2/3 right-1/4 w-96 h-96 bg-green-500/20 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Custom Styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-in {
            animation: fadeIn 0.5s ease-out;
          }
        `
      }} />
    </div>
  );
}

export default MyInfomation;
