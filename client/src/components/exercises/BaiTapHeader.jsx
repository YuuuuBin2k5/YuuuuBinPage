import React from "react";
import { Code2, Brain, Terminal, Layers } from "lucide-react";

const BaiTapHeader = () => {
  return (
    <div className="relative text-center mb-8">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative max-w-5xl mx-auto">
        {/* Label Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-sm border border-blue-500/20 rounded-full mb-6">
          <Terminal className="w-4 h-4 text-blue-400" />
          <span className="text-sm font-semibold text-blue-300">
            WEB PROGRAMMING EXERCISES
          </span>
          <Layers className="w-4 h-4 text-cyan-400" />
        </div>

        {/* Main Title */}
        <h1 className="text-5xl md:text-7xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-200 to-cyan-200">
          Bài Tập Thực Hành
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed mb-6">
          Hành trình từ HTML/CSS cơ bản đến JavaScript nâng cao và React
          Framework. Mỗi bài tập là một thử thách mới để nâng cao kỹ năng lập
          trình web.
        </p>

        {/* Tech Stack Icons */}
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <div className="px-3 py-1.5 bg-orange-500/10 border border-orange-500/30 rounded-lg backdrop-blur-sm">
            <span className="text-xs font-semibold text-orange-400">HTML5</span>
          </div>
          <div className="px-3 py-1.5 bg-blue-500/10 border border-blue-500/30 rounded-lg backdrop-blur-sm">
            <span className="text-xs font-semibold text-blue-400">CSS3</span>
          </div>
          <div className="px-3 py-1.5 bg-yellow-500/10 border border-yellow-500/30 rounded-lg backdrop-blur-sm">
            <span className="text-xs font-semibold text-yellow-400">
              JavaScript
            </span>
          </div>
          <div className="px-3 py-1.5 bg-red-500/10 border border-red-500/30 rounded-lg backdrop-blur-sm">
            <span className="text-xs font-semibold text-red-400">Java</span>
          </div>
          <div className="px-3 py-1.5 bg-purple-500/10 border border-purple-500/30 rounded-lg backdrop-blur-sm">
            <span className="text-xs font-semibold text-purple-400">JSP</span>
          </div>
          <div className="px-3 py-1.5 bg-pink-500/10 border border-pink-500/30 rounded-lg backdrop-blur-sm">
            <span className="text-xs font-semibold text-pink-400">JSTL</span>
          </div>
          <div className="px-3 py-1.5 bg-green-500/10 border border-green-500/30 rounded-lg backdrop-blur-sm">
            <span className="text-xs font-semibold text-green-400">JPA</span>
          </div>
          <div className="px-3 py-1.5 bg-cyan-500/10 border border-cyan-500/30 rounded-lg backdrop-blur-sm">
            <span className="text-xs font-semibold text-cyan-400">SQL</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BaiTapHeader;
