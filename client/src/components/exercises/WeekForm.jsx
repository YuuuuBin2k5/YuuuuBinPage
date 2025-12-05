import React, { useState } from "react";
import {
  X,
  Save,
  Calendar,
  User,
  BookOpen,
  Target,
  Tag,
  PlusCircle,
  Trash2,
} from "lucide-react";

const WeekForm = ({ showCreateForm, setShowCreateForm, onSubmit, loading }) => {
  const [weekForm, setWeekForm] = useState({
    title: "",
    description: "",
    difficulty: "Beginner",
    startDate: "",
    endDate: "",
    topics: [],
    color: "purple",
  });

  const [newTopic, setNewTopic] = useState("");

  const handleSubmit = (e) => {
    onSubmit(e, weekForm);
    // Reset form after submission
    setWeekForm({
      title: "",
      description: "",
      difficulty: "Beginner",
      startDate: "",
      endDate: "",
      topics: [],
      color: "purple",
    });
  };

  const addTopic = () => {
    if (newTopic.trim() && !weekForm.topics.includes(newTopic.trim())) {
      setWeekForm((prev) => ({
        ...prev,
        topics: [...prev.topics, newTopic.trim()],
      }));
      setNewTopic("");
    }
  };

  const removeTopic = (topicToRemove) => {
    setWeekForm((prev) => ({
      ...prev,
      topics: prev.topics.filter((topic) => topic !== topicToRemove),
    }));
  };

  if (!showCreateForm) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-purple-500/30 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-purple-500/20">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Calendar className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">
                Tạo Tuần Học Mới
              </h2>
              <p className="text-slate-400">
                Thêm tuần học mới vào chương trình
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowCreateForm(false)}
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
                <User className="w-4 h-4 inline mr-2" />
                Tiêu đề tuần học
              </label>
              <input
                type="text"
                value={weekForm.title}
                onChange={(e) =>
                  setWeekForm((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder="VD: Tuần 1: HTML & CSS Cơ Bản"
                className="w-full px-4 py-3 bg-slate-800/50 border border-purple-400/30 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                <BookOpen className="w-4 h-4 inline mr-2" />
                Mô tả
              </label>
              <textarea
                value={weekForm.description}
                onChange={(e) =>
                  setWeekForm((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Mô tả về nội dung và mục tiêu học tập của tuần này..."
                className="w-full px-4 py-3 bg-slate-800/50 border border-purple-400/30 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent h-24 resize-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                <Target className="w-4 h-4 inline mr-2" />
                Độ khó
              </label>
              <select
                value={weekForm.difficulty}
                onChange={(e) =>
                  setWeekForm((prev) => ({
                    ...prev,
                    difficulty: e.target.value,
                  }))
                }
                className="w-full px-4 py-3 bg-slate-800/50 border border-purple-400/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                <Tag className="w-4 h-4 inline mr-2" />
                Màu chủ đề
              </label>
              <select
                value={weekForm.color}
                onChange={(e) =>
                  setWeekForm((prev) => ({ ...prev, color: e.target.value }))
                }
                className="w-full px-4 py-3 bg-slate-800/50 border border-purple-400/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="purple">Purple</option>
                <option value="blue">Blue</option>
                <option value="emerald">Emerald</option>
                <option value="amber">Amber</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                <Calendar className="w-4 h-4 inline mr-2" />
                Ngày bắt đầu
              </label>
              <input
                type="date"
                value={weekForm.startDate}
                onChange={(e) =>
                  setWeekForm((prev) => ({
                    ...prev,
                    startDate: e.target.value,
                  }))
                }
                className="w-full px-4 py-3 bg-slate-800/50 border border-purple-400/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                <Calendar className="w-4 h-4 inline mr-2" />
                Ngày kết thúc
              </label>
              <input
                type="date"
                value={weekForm.endDate}
                onChange={(e) =>
                  setWeekForm((prev) => ({ ...prev, endDate: e.target.value }))
                }
                className="w-full px-4 py-3 bg-slate-800/50 border border-purple-400/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
          </div>

          {/* Topics */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              <BookOpen className="w-4 h-4 inline mr-2" />
              Chủ đề chính
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={newTopic}
                onChange={(e) => setNewTopic(e.target.value)}
                placeholder="Thêm chủ đề..."
                className="flex-1 px-4 py-2 bg-slate-800/50 border border-purple-400/30 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                onKeyPress={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addTopic())
                }
              />
              <button
                type="button"
                onClick={addTopic}
                className="px-4 py-2 bg-purple-600/20 text-purple-400 border border-purple-500/30 rounded-lg hover:bg-purple-600/30 transition-colors"
              >
                <PlusCircle className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2">
              {weekForm.topics.map((topic, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg"
                >
                  <span className="flex-1 text-slate-300">{topic}</span>
                  <button
                    type="button"
                    onClick={() => removeTopic(topic)}
                    className="text-purple-400 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end gap-3 pt-4 border-t border-purple-500/20">
            <button
              type="button"
              onClick={() => setShowCreateForm(false)}
              className="px-6 py-3 text-slate-300 hover:text-white transition-colors"
              disabled={loading}
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white rounded-xl font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Đang tạo...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Tạo Tuần Học
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WeekForm;
