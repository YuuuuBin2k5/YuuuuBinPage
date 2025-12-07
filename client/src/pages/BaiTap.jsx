import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useAuth } from "../contexts/AuthContext";
import { weeksAPI, exercisesAPI, baiTapAPI } from "../services";
import { useRenderTracker } from "../hooks/usePerformance";
import { useViewedExercises } from "../hooks/useViewedExercises";
import BaiTapHeader from "../components/exercises/BaiTapHeader";
import ViewModeToggle from "../components/exercises/ViewModeToggle";
import WeekCard from "../components/exercises/WeekCard";
import ExerciseCard from "../components/exercises/ExerciseCard";
import ExerciseDetailModal from "../components/exercises/ExerciseDetailModal";
import WeekForm from "../components/exercises/WeekForm";
import ExerciseForm from "../components/exercises/ExerciseForm";
import {
  Brain,
  Rocket,
  Flame,
  Trophy,
  Plus,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

function BaiTap() {
  // Performance tracking
  const renderCount = useRenderTracker("BaiTap");

  const { isAdmin } = useAuth();
  const { markAsViewed } = useViewedExercises();
  const [weeks, setWeeks] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [expandedWeek, setExpandedWeek] = useState(null);
  const [viewMode, setViewMode] = useState("weeks");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showExerciseForm, setShowExerciseForm] = useState(false);
  const [currentWeekId, setCurrentWeekId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [exercisesPerPage] = useState(9); // 9 bài tập mỗi trang (3x3 grid)

  // Load all data in one request for better performance
  useEffect(() => {
    const loadData = async () => {
      setIsInitialLoad(true);
      try {
        // Use combined API to reduce HTTP requests
        const data = await baiTapAPI.getAllData();
        setWeeks(data.weeks || []);
        setExercises(data.exercises || []);
      } catch (error) {
        console.error("Error loading bai tap data:", error);
        // Fallback to separate requests if combined API fails
        try {
          const [weeksData, exercisesData] = await Promise.all([
            weeksAPI.getAll(),
            exercisesAPI.getAll(),
          ]);
          setWeeks(weeksData || []);
          setExercises(exercisesData || []);
        } catch (fallbackError) {
          console.error("Fallback loading also failed:", fallbackError);
          setWeeks([]);
          setExercises([]);
        }
      } finally {
        setIsInitialLoad(false);
      }
    };
    loadData();
  }, []);

  // Load data functions for individual refresh
  const loadWeeks = useCallback(async () => {
    try {
      const weeksData = await weeksAPI.getAll();
      setWeeks(weeksData || []);
    } catch (error) {
      console.error("Error loading weeks:", error);
      setWeeks([]);
    }
  }, []);

  const loadExercises = useCallback(async () => {
    try {
      const exercisesData = await exercisesAPI.getAll();
      setExercises(exercisesData || []);
    } catch (error) {
      console.error("Error loading exercises:", error);
      setExercises([]);
    }
  }, []);

  // Form handlers
  const handleCreateWeek = useCallback(
    async (e, weekFormData) => {
      e.preventDefault();
      setLoading(true);

      try {
        const weekData = {
          ...weekFormData,
          difficulty: weekFormData.difficulty.toUpperCase(),
        };

        await weeksAPI.create(weekData);
        setShowCreateForm(false);
        loadWeeks();
        alert("Tuần học đã được tạo thành công!");
      } catch (error) {
        console.error("Error creating week:", error);
        alert("Có lỗi xảy ra khi tạo tuần học!");
      } finally {
        setLoading(false);
      }
    },
    [loadWeeks]
  );

  const handleCreateExercise = useCallback(
    async (e, exerciseFormData, weekId) => {
      e.preventDefault();
      setLoading(true);

      try {
        const exerciseData = {
          ...exerciseFormData,
          weekId: weekId,
        };

        // Nếu có selectedExercise thì update, không thì create
        if (selectedExercise) {
          await exercisesAPI.update(selectedExercise.id, exerciseData);
          alert("Bài tập đã được cập nhật thành công!");
        } else {
          await exercisesAPI.create(exerciseData);
          alert("Bài tập đã được thêm thành công!");
        }

        setShowExerciseForm(false);
        setCurrentWeekId(null);
        setSelectedExercise(null);
        loadExercises();
      } catch (error) {
        console.error("Error saving exercise:", error);
        alert("Có lỗi xảy ra khi lưu bài tập!");
      } finally {
        setLoading(false);
      }
    },
    [loadExercises, selectedExercise]
  );

  // Get exercises for selected week
  const currentWeekExercises = useMemo(() => {
    if (!expandedWeek) return exercises;
    return exercises.filter((ex) => ex.weekId === expandedWeek);
  }, [exercises, expandedWeek]);

  // Reset to page 1 when changing week
  useEffect(() => {
    setCurrentPage(1);
  }, [expandedWeek]);

  // Pagination calculations
  const totalPages = Math.ceil(currentWeekExercises.length / exercisesPerPage);
  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = currentWeekExercises.slice(
    indexOfFirstExercise,
    indexOfLastExercise
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Get current week info
  const currentWeek = useMemo(() => {
    if (!expandedWeek) return null;
    return weeks.find((w) => w.id === expandedWeek);
  }, [weeks, expandedWeek]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900/10 to-slate-900 -mt-24 pt-24">
      {/* Header */}
      <div className="px-6 py-8">
        <BaiTapHeader />
      </div>

      {/* Main Layout: Sidebar + Content */}
      <div className="relative lg:flex gap-6 px-6 pb-8">
        {/* Left Sidebar - Weeks Timeline (Desktop) */}
        <aside className="hidden lg:block w-80 shrink-0 sticky top-4 self-start h-fit max-h-[calc(100vh-2rem)] transition-all duration-300">
          <div className="bg-gradient-to-br from-slate-900/95 to-slate-800/95 border border-slate-700/50 rounded-2xl p-6 backdrop-blur-xl shadow-2xl shadow-blue-500/10">
            {/* Sidebar Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-2">
                Lộ Trình Học
              </h2>
              <p className="text-slate-400 text-sm">
                {weeks.length} tuần • {exercises.length} bài tập
              </p>
            </div>

            {/* Admin Controls */}
            {isAdmin && (
              <button
                onClick={() => setShowCreateForm(true)}
                className="w-full mb-4 px-4 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-medium rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-emerald-500/20"
              >
                <Plus className="w-4 h-4" />
                Thêm Tuần Mới
              </button>
            )}

            {/* Weeks List */}
            {weeks.length === 0 ? (
              <div className="text-center py-12">
                <Brain className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <p className="text-slate-500 text-sm">Chưa có tuần học nào</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[calc(100vh-18rem)] overflow-y-auto custom-scrollbar pr-2">
                {/* All Exercises Option */}
                <button
                  onClick={() => setExpandedWeek(null)}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-300 border ${
                    !expandedWeek
                      ? "bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border-blue-500/40 shadow-lg"
                      : "bg-slate-800/30 border-slate-700/30 hover:border-blue-500/30"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        !expandedWeek
                          ? "bg-gradient-to-br from-blue-500 to-cyan-500"
                          : "bg-slate-700/50"
                      }`}
                    >
                      <Rocket className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3
                        className={`font-bold ${
                          !expandedWeek ? "text-white" : "text-slate-300"
                        }`}
                      >
                        Tất Cả Bài Tập
                      </h3>
                      <p className="text-xs text-slate-400">
                        {exercises.length} bài tập
                      </p>
                    </div>
                  </div>
                </button>

                {/* Week Items */}
                {weeks.map((week) => {
                  const weekExCount = exercises.filter(
                    (ex) => ex.weekId === week.id
                  ).length;
                  const isActive = expandedWeek === week.id;

                  return (
                    <button
                      key={week.id}
                      onClick={() => setExpandedWeek(isActive ? null : week.id)}
                      className={`w-full text-left p-4 rounded-xl transition-all duration-300 border ${
                        isActive
                          ? "bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border-blue-500/40 shadow-lg"
                          : "bg-slate-800/30 border-slate-700/30 hover:border-blue-500/30 hover:bg-slate-800/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            isActive
                              ? "bg-gradient-to-br from-blue-500 to-cyan-500"
                              : "bg-slate-700/50"
                          }`}
                        >
                          <Brain className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3
                            className={`font-bold truncate ${
                              isActive ? "text-white" : "text-slate-300"
                            }`}
                          >
                            {week.title}
                          </h3>
                          <p className="text-xs text-slate-400">
                            {weekExCount} bài tập
                          </p>
                        </div>
                        {isActive && (
                          <div className="w-2 h-2 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full animate-pulse"></div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </aside>

        {/* Right Content - Exercises */}
        <main className="flex-1 min-w-0">
          {/* Mobile Week Selector */}
          <div className="lg:hidden mb-6">
            <select
              value={expandedWeek || ""}
              onChange={(e) =>
                setExpandedWeek(
                  e.target.value ? parseInt(e.target.value) : null
                )
              }
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 appearance-none cursor-pointer"
            >
              <option value="">Tất Cả Bài Tập ({exercises.length})</option>
              {weeks.map((week) => {
                const weekExCount = exercises.filter(
                  (ex) => ex.weekId === week.id
                ).length;
                return (
                  <option key={week.id} value={week.id}>
                    {week.title} ({weekExCount} bài tập)
                  </option>
                );
              })}
            </select>
          </div>

          {/* Content Header */}
          <div className="mb-6">
            <div className="bg-gradient-to-br from-slate-900/95 to-slate-800/95 border border-slate-700/50 rounded-2xl p-6 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  {currentWeek ? (
                    <>
                      <h1 className="text-3xl font-bold text-white mb-2">
                        {currentWeek.title}
                      </h1>
                      <p className="text-slate-300 mb-4">
                        {currentWeek.description}
                      </p>
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="px-3 py-1.5 bg-blue-500/20 text-blue-400 rounded-lg text-sm font-medium border border-blue-500/30">
                          {currentWeek.difficulty}
                        </span>
                        <span className="px-3 py-1.5 bg-slate-700/50 text-slate-300 rounded-lg text-sm flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {new Date(currentWeek.startDate).toLocaleDateString(
                            "vi-VN"
                          )}{" "}
                          -{" "}
                          {new Date(currentWeek.endDate).toLocaleDateString(
                            "vi-VN"
                          )}
                        </span>
                        <span className="px-3 py-1.5 bg-emerald-500/20 text-emerald-400 rounded-lg text-sm font-medium">
                          {currentWeekExercises.length} bài tập
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-300 mb-2">
                        Tất Cả Bài Tập
                      </h1>
                      <p className="text-slate-300">
                        Khám phá và thử thách bản thân với {exercises.length}{" "}
                        bài tập từ {weeks.length} tuần học
                      </p>
                    </>
                  )}
                </div>

                {/* Admin Add Exercise Button */}
                {isAdmin && currentWeek && (
                  <button
                    onClick={() => {
                      setCurrentWeekId(currentWeek.id);
                      setShowExerciseForm(true);
                    }}
                    className="ml-4 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-medium rounded-xl transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-blue-500/20"
                  >
                    <Plus className="w-4 h-4" />
                    Thêm Bài Tập
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Exercises Grid */}
          {currentWeekExercises.length === 0 ? (
            <div className="bg-gradient-to-br from-slate-900/95 to-slate-800/95 border border-slate-700/50 rounded-2xl p-12 text-center backdrop-blur-xl">
              <div className="mb-6">
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-slate-800 to-slate-700 rounded-full flex items-center justify-center">
                  <Flame className="w-12 h-12 text-slate-400" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-300 mb-2">
                Chưa có bài tập nào
              </h3>
              <p className="text-slate-400 mb-6">
                {currentWeek
                  ? "Tuần học này chưa có bài tập nào. Thêm bài tập đầu tiên để bắt đầu!"
                  : "Chọn một tuần học bên trái để xem bài tập hoặc thêm bài tập mới."}
              </p>
              {isAdmin && currentWeek && (
                <button
                  onClick={() => {
                    setCurrentWeekId(currentWeek.id);
                    setShowExerciseForm(true);
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-medium rounded-xl transition-all duration-300 shadow-lg hover:shadow-blue-500/20"
                >
                  <Plus className="w-4 h-4" />
                  Thêm Bài Tập Đầu Tiên
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentExercises.map((exercise, index) => (
                  <ExerciseCard
                    key={exercise.id}
                    exercise={exercise}
                    index={indexOfFirstExercise + index}
                    onClick={() => {
                      setSelectedExercise(exercise);
                      setShowDetailModal(true);
                    }}
                    onEdit={(exercise) => {
                      console.log("=== EDIT EXERCISE CLICKED ===");
                      console.log("Exercise:", exercise);
                      console.log("Exercise images:", exercise.images);
                      console.log("Images count:", exercise.images?.length || 0);
                      
                      setSelectedExercise(exercise);
                      setCurrentWeekId(exercise.weekId);
                      setShowExerciseForm(true);
                    }}
                    isAdmin={isAdmin}
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gradient-to-br from-slate-900/95 to-slate-800/95 border border-slate-700/50 rounded-2xl p-6 backdrop-blur-xl">
                  {/* Pagination Info */}
                  <div className="text-slate-400 text-sm">
                    Hiển thị{" "}
                    <span className="text-blue-400 font-semibold">
                      {indexOfFirstExercise + 1}
                    </span>{" "}
                    -{" "}
                    <span className="text-blue-400 font-semibold">
                      {Math.min(
                        indexOfLastExercise,
                        currentWeekExercises.length
                      )}
                    </span>{" "}
                    trong tổng số{" "}
                    <span className="text-blue-400 font-semibold">
                      {currentWeekExercises.length}
                    </span>{" "}
                    bài tập
                  </div>

                  {/* Pagination Controls */}
                  <div className="flex items-center gap-2">
                    {/* Previous Button */}
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="p-2 rounded-lg border transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-slate-700/50 border-slate-700/50 hover:border-blue-500/50 hover:bg-blue-500/10 text-slate-400 hover:text-blue-400"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>

                    {/* Page Numbers */}
                    <div className="flex items-center gap-1">
                      {[...Array(totalPages)].map((_, index) => {
                        const pageNumber = index + 1;
                        const isCurrentPage = currentPage === pageNumber;

                        // Show first page, last page, current page, and pages around current
                        const showPage =
                          pageNumber === 1 ||
                          pageNumber === totalPages ||
                          (pageNumber >= currentPage - 1 &&
                            pageNumber <= currentPage + 1);

                        if (!showPage) {
                          // Show ellipsis
                          if (
                            pageNumber === currentPage - 2 ||
                            pageNumber === currentPage + 2
                          ) {
                            return (
                              <span
                                key={pageNumber}
                                className="px-2 text-slate-500"
                              >
                                ...
                              </span>
                            );
                          }
                          return null;
                        }

                        return (
                          <button
                            key={pageNumber}
                            onClick={() => handlePageChange(pageNumber)}
                            className={`min-w-[40px] h-10 px-3 rounded-lg font-medium transition-all duration-300 ${
                              isCurrentPage
                                ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/20"
                                : "border border-slate-700/50 text-slate-400 hover:border-blue-500/50 hover:bg-blue-500/10 hover:text-blue-400"
                            }`}
                          >
                            {pageNumber}
                          </button>
                        );
                      })}
                    </div>

                    {/* Next Button */}
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="p-2 rounded-lg border transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-slate-700/50 border-slate-700/50 hover:border-blue-500/50 hover:bg-blue-500/10 text-slate-400 hover:text-blue-400"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {/* Exercise Detail Modal */}
      <ExerciseDetailModal
        exercise={selectedExercise}
        isOpen={showDetailModal}
        onClose={() => {
          setShowDetailModal(false);
          setSelectedExercise(null);
        }}
      />

      {/* Forms */}
      <WeekForm
        showCreateForm={showCreateForm}
        setShowCreateForm={setShowCreateForm}
        onSubmit={handleCreateWeek}
        loading={loading}
      />

      <ExerciseForm
        showExerciseForm={showExerciseForm}
        setShowExerciseForm={setShowExerciseForm}
        currentWeekId={currentWeekId}
        exercise={selectedExercise}
        onSubmit={handleCreateExercise}
        loading={loading}
      />

      {/* Background Effects - Optimized */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute top-2/3 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1000ms" }}
        ></div>
        <div
          className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2000ms" }}
        ></div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #3b82f6 0%, #06b6d4 100%);
          border-radius: 10px;
          transition: all 0.3s ease;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #2563eb 0%, #0891b2 100%);
        }
      `,
        }}
      />
    </div>
  );
}

export default BaiTap;
