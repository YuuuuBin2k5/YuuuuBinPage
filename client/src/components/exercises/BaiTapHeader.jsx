import React from "react";
import { Wand2, Sparkles } from "lucide-react";
import { FONT_COINY } from "../../utils/fonts";

const BaiTapHeader = () => {
  return (
    <div className="relative text-center mb-12">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-96 h-96 bg-gradient-to-r from-purple-600/10 via-cyan-600/10 to-purple-600/10 rounded-full blur-xl animate-pulse"></div>
      </div>
      <div className="relative">
        <div className="flex justify-center mb-4">
          <div className="relative">
            <Wand2 className="w-16 h-16 text-purple-400 animate-pulse" />
            <div className="absolute -inset-2 bg-purple-500/20 rounded-full blur-md animate-pulse"></div>
            <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-cyan-400 animate-bounce" />
          </div>
        </div>
        <h1
          className={`text-5xl font-extrabold bg-gradient-to-r from-purple-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent mb-4 ${FONT_COINY}`}
        >
          🧙‍♂️ Ma Thuật Học Tập
        </h1>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Khám phá hành trình học lập trình đầy thử thách và kỹ thuật. Mỗi tuần
          là một cuộc phiêu lưu mới trong thế giới của code! ✨
        </p>
      </div>
    </div>
  );
};

export default BaiTapHeader;
