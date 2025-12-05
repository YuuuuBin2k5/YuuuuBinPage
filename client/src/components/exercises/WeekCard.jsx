import React, { useMemo } from "react";
import { Brain, ChevronRight, ChevronDown, Calendar, Plus } from "lucide-react";
import { StatusBadge, DifficultyBadge } from "./Badges";
import ExerciseCard from "./ExerciseCard";
import { useAuth } from "../../contexts/AuthContext";

const WeekCard = ({
  week,
  exercises,
  expandedWeek,
  setExpandedWeek,
  setShowExerciseForm,
  setCurrentWeekId,
}) => {
  const { isAdmin } = useAuth();

  const getWeekColorClasses = (color) => {
    const colors = {
      emerald: {
        border: "border-emerald-500/30 hover:border-emerald-400/50",
        glow: "shadow-emerald-500/20",
        progress: "from-emerald-500 to-green-500",
        accent: "text-emerald-400",
      },
      blue: {
        border: "border-blue-500/30 hover:border-blue-400/50",
        glow: "shadow-blue-500/20",
        progress: "from-blue-500 to-cyan-500",
        accent: "text-blue-400",
      },
      amber: {
        border: "border-amber-500/30 hover:border-amber-400/50",
        glow: "shadow-amber-500/20",
        progress: "from-amber-500 to-yellow-500",
        accent: "text-amber-400",
      },
      purple: {
        border: "border-purple-500/30 hover:border-purple-400/50",
        glow: "shadow-purple-500/20",
        progress: "from-purple-500 to-violet-500",
        accent: "text-purple-400",
      },
    };
    return colors[color] || colors.purple;
  };

  // Memoize expensive calculations
  const weekStatus = useMemo(() => {
    const today = new Date();
    const startDate = new Date(week.startDate);
    const endDate = new Date(week.endDate);

    if (today >= startDate && today <= endDate) {
      return "current";
    } else if (today > endDate) {
      return "completed";
    }
    return "upcoming";
  }, [week.startDate, week.endDate]);

  const colorClasses = useMemo(
    () => getWeekColorClasses(week.color),
    [week.color]
  );
  const isExpanded = expandedWeek === week.id;

  // Memoize filtered exercises
  const weekExercises = useMemo(
    () => exercises.filter((ex) => ex.weekId === week.id),
    [exercises, week.id]
  );

  return (
    <div
      className={`group relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 border rounded-2xl transition-all duration-300 will-change-transform hover:scale-[1.01] hover:shadow-xl ${colorClasses.border}`}
    >
      {/* Glow effect */}
      <div
        className={`absolute -inset-1 bg-gradient-to-r ${colorClasses.progress} rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-sm`}
      ></div>

      <div className="relative p-6">
        {/* Week Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-purple-500/20">
                <Brain className="w-5 h-5 text-purple-400" />
              </div>
              <div className="flex-1">
                <h3
                  className={`text-xl font-bold ${colorClasses.accent} group-hover:text-white transition-colors`}
                >
                  {week.title}
                </h3>
                <p className="text-slate-400 text-sm">{week.description}</p>
              </div>
              <button
                onClick={() => setExpandedWeek(isExpanded ? null : week.id)}
                className="p-2 text-slate-400 hover:text-white transition-colors"
              >
                {isExpanded ? (
                  <ChevronDown className="w-5 h-5" />
                ) : (
                  <ChevronRight className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Status & Difficulty */}
            <div className="flex items-center gap-3 mb-4">
              <StatusBadge status={weekStatus} />
              <DifficultyBadge difficulty={week.difficulty} />
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-slate-700/50 text-slate-300 rounded-xl text-xs">
                <Calendar className="w-3 h-3" />
                {week.startDate} - {week.endDate}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-300">Tiến độ</span>
                <span className={colorClasses.accent}>
                  {week.completedExercises}/{week.totalExercises} bài (
                  {week.progress}%)
                </span>
              </div>
              <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${colorClasses.progress} transition-all duration-500 ease-out`}
                  style={{ width: `${week.progress}%` }}
                ></div>
              </div>
            </div>

            {/* Topics */}
            <div className="flex flex-wrap gap-2">
              {week.topics.map((topic, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-slate-700/50 text-slate-300 rounded-lg text-xs border border-slate-600/50"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="border-t border-slate-700/50 pt-4 mt-4 space-y-4">
            {/* Exercises List */}
            {weekExercises.length > 0 ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-semibold text-slate-300">
                    Bài tập ({weekExercises.length})
                  </h4>
                  {isAdmin && (
                    <button
                      onClick={() => {
                        setCurrentWeekId(week.id);
                        setShowExerciseForm(true);
                      }}
                      className="flex items-center gap-2 px-3 py-1 bg-blue-600/20 text-blue-400 border border-blue-500/30 rounded-lg hover:bg-blue-600/30 transition-colors text-sm"
                    >
                      <Plus className="w-4 h-4" />
                      Thêm bài tập
                    </button>
                  )}
                </div>
                {weekExercises.map((exercise) => (
                  <ExerciseCard key={exercise.id} exercise={exercise} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-slate-400">
                  Chưa có bài tập nào cho tuần này
                </p>
                {isAdmin && (
                  <button
                    onClick={() => {
                      setCurrentWeekId(week.id);
                      setShowExerciseForm(true);
                    }}
                    className="mt-4 flex items-center gap-2 mx-auto px-4 py-2 bg-blue-600/20 text-blue-400 border border-blue-500/30 rounded-lg hover:bg-blue-600/30 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Thêm bài tập đầu tiên
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(WeekCard);
