import React from "react";
import { Calendar, Brain, Play, BookOpen } from "lucide-react";

const ViewModeToggle = ({
  viewMode,
  setViewMode,
  isAdmin,
  setShowCreateForm,
  setShowExerciseForm,
  setCurrentWeekId,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-12">
      {/* Mode Toggle */}
      <div className="flex bg-slate-800/50 border border-slate-700/50 rounded-2xl p-2 backdrop-blur-sm">
        <button
          onClick={() => setViewMode("weeks")}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 font-medium ${
            viewMode === "weeks"
              ? "bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow-lg shadow-purple-500/30"
              : "text-slate-400 hover:text-white hover:bg-slate-700/50"
          }`}
        >
          <Calendar className="w-5 h-5" />
          Theo Tuần
        </button>
        <button
          onClick={() => setViewMode("exercises")}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 font-medium ${
            viewMode === "exercises"
              ? "bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow-lg shadow-purple-500/30"
              : "text-slate-400 hover:text-white hover:bg-slate-700/50"
          }`}
        >
          <Brain className="w-5 h-5" />
          Tất Cả Bài Tập
        </button>
      </div>

      {/* Admin Controls */}
      {isAdmin && (
        <div className="flex gap-3">
          {viewMode === "weeks" && (
            <button
              onClick={() => setShowCreateForm(true)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl font-medium transition-all duration-300 shadow-lg shadow-emerald-500/20"
            >
              <Play className="w-5 h-5" />
              Tạo Tuần Mới
            </button>
          )}
          <button
            onClick={() => {
              setCurrentWeekId(null);
              setShowExerciseForm(true);
            }}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl font-medium transition-all duration-300 shadow-lg shadow-blue-500/20"
          >
            <BookOpen className="w-5 h-5" />
            Thêm Bài Tập
          </button>
        </div>
      )}
    </div>
  );
};

export default ViewModeToggle;
