import React from "react";
import { GraduationCap, Award, Calendar, MapPin, BookOpen } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { profileData } from "../../data/profileData";

const EducationSection = () => {
  const { language } = useLanguage();
  const isEn = language === "en";

  return (
    <section
      id="education"
      aria-labelledby="education-title"
      className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/90 border-t border-slate-800/60 overflow-hidden"
    >
      <div className="relative z-10 max-w-7xl mx-auto space-y-8">
        {/* Section Header */}
        <div className="scroll-reveal space-y-2.5 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-950/70 border border-indigo-500/30 text-indigo-300 font-mono text-xs uppercase tracking-wider">
            <GraduationCap className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{isEn ? "Academic Foundation" : "Nền Tảng Học Vấn"}</span>
          </div>

          <h2
            id="education-title"
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight"
          >
            {isEn ? "Education & Academic Background" : "Học Vấn & Quá Trình Đào Tạo"}
          </h2>

          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-2xl">
            {isEn
              ? "Fourth-year Software Engineering student at HCMUTE, building a formal academic foundation alongside practical backend development projects."
              : "Sinh viên năm 4 ngành Kỹ thuật Phần mềm tại HCMUTE, kết hợp nền tảng đào tạo chính quy với các dự án phát triển backend thực tế."}
          </p>
        </div>

        {/* Compact Credential Card */}
        <div className="scroll-reveal delay-100 p-6 sm:p-7 rounded-2xl bg-slate-950/80 border border-slate-800 shadow-lg space-y-6">
          {/* Main Degree Row */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-6 border-b border-slate-800/80">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-indigo-950/70 border border-indigo-500/30 text-indigo-400 shrink-0 mt-0.5">
                <BookOpen className="w-5 h-5" aria-hidden="true" />
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                    {isEn ? profileData.university.en : profileData.university.vi}
                  </h3>
                  <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-indigo-950/80 text-indigo-300 border border-indigo-500/30">
                    {profileData.university.short}
                  </span>
                </div>

                <div className="text-sm font-medium text-slate-300">
                  {isEn ? profileData.major.en : profileData.major.vi}
                </div>

                <div className="text-xs text-slate-400">
                  {isEn ? profileData.studentStatus.en : profileData.studentStatus.vi}
                </div>
              </div>
            </div>

            {/* Academic Period Badge */}
            <div className="flex items-center gap-2 self-start md:self-auto px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 shrink-0">
              <Calendar className="w-3.5 h-3.5 text-indigo-400" aria-hidden="true" />
              <span>{profileData.academicPeriod}</span>
            </div>
          </div>

          {/* Metrics & Standing Footnote */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-wrap">
              {/* GPA Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-950/40 border border-indigo-500/30 text-indigo-200 text-xs font-mono">
                <Award className="w-4 h-4 text-indigo-400" aria-hidden="true" />
                <span className="text-slate-400">{isEn ? "GPA:" : "Điểm GPA:"}</span>
                <span className="font-bold text-white">{profileData.gpa}</span>
              </div>

              {/* Status Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400" aria-hidden="true" />
                <span>{isEn ? "Fourth-Year Standing" : "Sinh viên năm 4"}</span>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
              <MapPin className="w-3.5 h-3.5 text-slate-500" aria-hidden="true" />
              <span>{isEn ? profileData.location.en : profileData.location.vi}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
