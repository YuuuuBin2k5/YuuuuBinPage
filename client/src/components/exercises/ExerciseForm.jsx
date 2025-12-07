import React, { useState } from "react";
import {
  X,
  Save,
  FileText,
  BookOpen,
  Target,
  Tag,
  Globe,
  Github,
  Clock,
  Sparkles,
  PlusCircle,
  Trash2,
} from "lucide-react";

const ExerciseForm = ({
  showExerciseForm,
  setShowExerciseForm,
  currentWeekId,
  exercise,
  onSubmit,
  loading,
}) => {
  const [exerciseForm, setExerciseForm] = useState({
    title: "",
    description: "",
    difficulty: "EASY",
    category: "Frontend",
    demoUrl: "",
    githubUrl: "",
    imageUrl: "",
    instructions: "",
    hints: [],
    estimatedTime: 60,
  });

  const [newHint, setNewHint] = useState("");

  // Điền dữ liệu vào form khi edit
  React.useEffect(() => {
    if (exercise) {
      setExerciseForm({
        title: exercise.title || "",
        description: exercise.description || "",
        difficulty: exercise.difficulty || "EASY",
        category: exercise.category || "Frontend",
        demoUrl: exercise.demoUrl || "",
        githubUrl: exercise.githubUrl || "",
        imageUrl: exercise.imageUrl || "",
        instructions: exercise.instructions || "",
        hints: exercise.hints || [],
        estimatedTime: exercise.estimatedTime || 60,
      });
    } else {
      // Reset form khi tạo mới
      setExerciseForm({
        title: "",
        description: "",
        difficulty: "EASY",
        category: "Frontend",
        demoUrl: "",
        githubUrl: "",
        imageUrl: "",
        instructions: "",
        hints: [],
        estimatedTime: 60,
      });
    }
  }, [exercise, showExerciseForm]);

  const handleSubmit = (e) => {
    onSubmit(e, exerciseForm, currentWeekId);
    // Reset form after submission
    setExerciseForm({
      title: "",
      description: "",
      difficulty: "EASY",
      category: "Frontend",
      demoUrl: "",
      githubUrl: "",
      instructions: "",
      hints: [],
      estimatedTime: 60,
    });
  };

  const addHint = () => {
    if (newHint.trim() && !exerciseForm.hints.includes(newHint.trim())) {
      setExerciseForm((prev) => ({
        ...prev,
        hints: [...prev.hints, newHint.trim()],
      }));
      setNewHint("");
    }
  };

  const removeHint = (hintToRemove) => {
    setExerciseForm((prev) => ({
      ...prev,
      hints: prev.hints.filter((hint) => hint !== hintToRemove),
    }));
  };

  if (!showExerciseForm) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-blue-500/30 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-blue-500/20">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <FileText className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">
                {exercise ? "Chỉnh Sửa Bài Tập" : "Thêm Bài Tập Mới"}
              </h2>
              <p className="text-slate-400">
                {exercise
                  ? "Cập nhật thông tin bài tập"
                  : currentWeekId
                  ? "Thêm vào tuần đã chọn"
                  : "Tạo bài tập độc lập"}
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowExerciseForm(false)}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                <FileText className="w-4 h-4 inline mr-2" />
                Tiêu đề bài tập
              </label>
              <input
                type="text"
                value={exerciseForm.title}
                onChange={(e) =>
                  setExerciseForm((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
                placeholder="VD: Tạo Component Counter với React Hooks"
                className="w-full px-4 py-3 bg-slate-800/50 border border-blue-400/30 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                <BookOpen className="w-4 h-4 inline mr-2" />
                Mô tả bài tập
              </label>
              <textarea
                value={exerciseForm.description}
                onChange={(e) =>
                  setExerciseForm((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Mô tả chi tiết về bài tập, yêu cầu và mục tiêu học tập..."
                className="w-full px-4 py-3 bg-slate-800/50 border border-blue-400/30 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24 resize-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                <Target className="w-4 h-4 inline mr-2" />
                Độ khó
              </label>
              <select
                value={exerciseForm.difficulty}
                onChange={(e) =>
                  setExerciseForm((prev) => ({
                    ...prev,
                    difficulty: e.target.value,
                  }))
                }
                className="w-full px-4 py-3 bg-slate-800/50 border border-blue-400/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="EASY">Easy</option>
                <option value="MEDIUM">Medium</option>
                <option value="HARD">Hard</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                <Tag className="w-4 h-4 inline mr-2" />
                Danh mục
              </label>
              <select
                value={exerciseForm.category}
                onChange={(e) =>
                  setExerciseForm((prev) => ({
                    ...prev,
                    category: e.target.value,
                  }))
                }
                className="w-full px-4 py-3 bg-slate-800/50 border border-blue-400/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="Full Stack">Full Stack</option>
                <option value="Database">Database</option>
                <option value="Algorithm">Algorithm</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                <Globe className="w-4 h-4 inline mr-2" />
                Demo URL (tùy chọn)
              </label>
              <input
                type="url"
                value={exerciseForm.demoUrl}
                onChange={(e) =>
                  setExerciseForm((prev) => ({
                    ...prev,
                    demoUrl: e.target.value,
                  }))
                }
                placeholder="https://example.com/demo"
                className="w-full px-4 py-3 bg-slate-800/50 border border-blue-400/30 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                <Github className="w-4 h-4 inline mr-2" />
                GitHub URL (tùy chọn)
              </label>
              <input
                type="url"
                value={exerciseForm.githubUrl}
                onChange={(e) =>
                  setExerciseForm((prev) => ({
                    ...prev,
                    githubUrl: e.target.value,
                  }))
                }
                placeholder="https://github.com/username/repo"
                className="w-full px-4 py-3 bg-slate-800/50 border border-blue-400/30 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                <Globe className="w-4 h-4 inline mr-2" />
                Image URL (tùy chọn)
              </label>
              <input
                type="url"
                value={exerciseForm.imageUrl}
                onChange={(e) =>
                  setExerciseForm((prev) => ({
                    ...prev,
                    imageUrl: e.target.value,
                  }))
                }
                placeholder="https://via.placeholder.com/400x300"
                className="w-full px-4 py-3 bg-slate-800/50 border border-blue-400/30 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                <Clock className="w-4 h-4 inline mr-2" />
                Thời gian ước tính (phút)
              </label>
              <input
                type="number"
                value={exerciseForm.estimatedTime}
                onChange={(e) =>
                  setExerciseForm((prev) => ({
                    ...prev,
                    estimatedTime: parseInt(e.target.value) || 60,
                  }))
                }
                min="15"
                max="480"
                className="w-full px-4 py-3 bg-slate-800/50 border border-blue-400/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Instructions */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              <FileText className="w-4 h-4 inline mr-2" />
              Hướng dẫn chi tiết
            </label>
            <textarea
              value={exerciseForm.instructions}
              onChange={(e) =>
                setExerciseForm((prev) => ({
                  ...prev,
                  instructions: e.target.value,
                }))
              }
              placeholder="Hướng dẫn từng bước để thực hiện bài tập..."
              className="w-full px-4 py-3 bg-slate-800/50 border border-blue-400/30 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32 resize-none"
            />
          </div>

          {/* Hints */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              <Sparkles className="w-4 h-4 inline mr-2" />
              Gợi ý (Hints)
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={newHint}
                onChange={(e) => setNewHint(e.target.value)}
                placeholder="Thêm gợi ý..."
                className="flex-1 px-4 py-2 bg-slate-800/50 border border-blue-400/30 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyPress={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addHint())
                }
              />
              <button
                type="button"
                onClick={addHint}
                className="px-4 py-2 bg-blue-600/20 text-blue-400 border border-blue-500/30 rounded-lg hover:bg-blue-600/30 transition-colors"
              >
                <PlusCircle className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2">
              {exerciseForm.hints.map((hint, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg"
                >
                  <span className="flex-1 text-slate-300">{hint}</span>
                  <button
                    type="button"
                    onClick={() => removeHint(hint)}
                    className="text-blue-400 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end gap-3 pt-4 border-t border-blue-500/20">
            <button
              type="button"
              onClick={() => setShowExerciseForm(false)}
              className="px-6 py-3 text-slate-300 hover:text-white transition-colors"
              disabled={loading}
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {exercise ? "Đang cập nhật..." : "Đang tạo..."}
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  {exercise ? "Cập Nhật" : "Tạo Bài Tập"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExerciseForm;
