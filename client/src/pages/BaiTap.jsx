import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useAuth } from "../contexts/AuthContext";
import { weeksAPI, exercisesAPI, baiTapAPI } from "../services";
import { useRenderTracker } from "../hooks/usePerformance";
import BaiTapHeader from "../components/exercises/BaiTapHeader";
import ViewModeToggle from "../components/exercises/ViewModeToggle";
import WeekCard from "../components/exercises/WeekCard";
import ExerciseCard from "../components/exercises/ExerciseCard";
import WeekForm from "../components/exercises/WeekForm";
import ExerciseForm from "../components/exercises/ExerciseForm";
import { Brain, Rocket, Flame, Trophy } from "lucide-react";

function BaiTap() {
  // Performance tracking
  const renderCount = useRenderTracker("BaiTap");

  const { isAdmin } = useAuth();
  const [weeks, setWeeks] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [expandedWeek, setExpandedWeek] = useState(null);
  const [viewMode, setViewMode] = useState("weeks");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showExerciseForm, setShowExerciseForm] = useState(false);
  const [currentWeekId, setCurrentWeekId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

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
          difficulty: exerciseFormData.difficulty.toUpperCase(),
          weekId: weekId,
        };

        await exercisesAPI.create(exerciseData);
        setShowExerciseForm(false);
        setCurrentWeekId(null);
        loadExercises();
        alert("Bài tập đã được thêm thành công!");
      } catch (error) {
        console.error("Error creating exercise:", error);
        alert("Có lỗi xảy ra khi tạo bài tập!");
      } finally {
        setLoading(false);
      }
    },
    [loadExercises]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/10 to-slate-900 px-6 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <BaiTapHeader />

        {/* View Mode Toggle & Controls */}
        <ViewModeToggle
          viewMode={viewMode}
          setViewMode={setViewMode}
          isAdmin={isAdmin}
          setShowCreateForm={setShowCreateForm}
          setShowExerciseForm={setShowExerciseForm}
          setCurrentWeekId={setCurrentWeekId}
        />

        {/* Empty State */}
        {((viewMode === "weeks" && weeks.length === 0) ||
          (viewMode === "exercises" && exercises.length === 0)) && (
          <div className="text-center py-20">
            <div className="mb-6">
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-slate-800 to-slate-700 rounded-full flex items-center justify-center">
                {viewMode === "weeks" ? (
                  <Brain className="w-16 h-16 text-slate-400" />
                ) : (
                  <Rocket className="w-16 h-16 text-slate-400" />
                )}
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-300 mb-2">
              {viewMode === "weeks"
                ? "Chưa có tuần học nào"
                : "Chưa có bài tập nào"}
            </h3>
            <p className="text-slate-400 mb-8">
              {viewMode === "weeks"
                ? "Tạo tuần học đầu tiên để bắt đầu hành trình coding!"
                : "Thêm bài tập đầu tiên để bắt đầu thử thách bản thân!"}
            </p>
          </div>
        )}

        {/* Weeks View */}
        {viewMode === "weeks" && weeks.length > 0 && (
          <div className="space-y-6">
            {weeks.map((week) => (
              <WeekCard
                key={week.id}
                week={week}
                exercises={exercises}
                expandedWeek={expandedWeek}
                setExpandedWeek={setExpandedWeek}
                setShowExerciseForm={setShowExerciseForm}
                setCurrentWeekId={setCurrentWeekId}
              />
            ))}
          </div>
        )}

        {/* All Exercises View */}
        {viewMode === "exercises" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-xl border border-purple-500/30">
                  <Trophy className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    Tất Cả Bài Tập
                  </h2>
                  <p className="text-slate-400">
                    {exercises.length} bài tập • Thử thách bản thân mỗi ngày!
                  </p>
                </div>
              </div>
            </div>

            {exercises.length > 0 ? (
              <div className="grid gap-6">
                {exercises.map((exercise) => (
                  <div
                    key={exercise.id}
                    className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-slate-700/50 rounded-2xl p-6 hover:border-purple-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-500/20 rounded-lg">
                          <Flame className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-xl font-bold text-white">
                              {exercise.title}
                            </h3>
                            {exercise.weekId && (
                              <span className="text-xs bg-slate-700/50 text-slate-400 px-2 py-1 rounded-lg">
                                Tuần{" "}
                                {weeks
                                  .find((w) => w.id === exercise.weekId)
                                  ?.title.split(":")[0] || exercise.weekId}
                              </span>
                            )}
                          </div>
                          <p className="text-slate-400">
                            {exercise.description}
                          </p>
                        </div>
                      </div>
                    </div>
                    <ExerciseCard exercise={exercise} />
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        )}

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
          onSubmit={handleCreateExercise}
          loading={loading}
        />
      </div>

      {/* Background Effects - Optimized */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/3 rounded-full blur-xl animate-pulse"></div>
        <div
          className="absolute top-3/4 right-1/4 w-64 h-64 bg-cyan-500/3 rounded-full blur-xl animate-pulse"
          style={{ animationDelay: "1000ms" }}
        ></div>
      </div>
    </div>
  );
}

export default BaiTap;
