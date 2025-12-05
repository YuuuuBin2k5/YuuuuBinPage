import React, { useState, useEffect } from "react";
import { X, Palette, Link } from "lucide-react";

const TechStackForm = ({ isOpen, onClose, onSubmit, techStack = null }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    iconUrl: "",
    colorCode: "#6366f1",
  });

  useEffect(() => {
    if (techStack) {
      setFormData({
        name: techStack.name || "",
        category: techStack.category || "",
        iconUrl: techStack.iconUrl || "",
        colorCode: techStack.colorCode || "#6366f1",
      });
    } else {
      setFormData({
        name: "",
        category: "",
        iconUrl: "",
        colorCode: "#6366f1",
      });
    }
  }, [techStack, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (!isOpen) return null;

  const categories = [
    "Frontend",
    "Backend",
    "Database",
    "DevOps",
    "Mobile",
    "Design",
    "Testing",
    "Other",
  ];

  const predefinedColors = [
    "#6366f1",
    "#8b5cf6",
    "#ec4899",
    "#ef4444",
    "#f97316",
    "#eab308",
    "#22c55e",
    "#06b6d4",
    "#3b82f6",
    "#6366f1",
    "#8b5cf6",
    "#ec4899",
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900/95 border border-purple-500/30 rounded-2xl p-6 w-full max-w-lg">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            {techStack ? "Edit Tech Stack" : "Add New Tech Stack"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Tech Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Technology Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-800/50 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="e.g., React, Node.js, PostgreSQL"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-800/50 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Select category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Icon URL */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Link className="inline mr-2" size={16} />
              Icon URL
            </label>
            <input
              type="url"
              name="iconUrl"
              value={formData.iconUrl}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-800/50 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="https://cdn.example.com/icon.svg"
            />
            <p className="text-xs text-gray-400 mt-1">
              Use icons from: devicons.dev, simpleicons.org, or CDN links
            </p>
          </div>

          {/* Color Picker */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Palette className="inline mr-2" size={16} />
              Brand Color
            </label>

            {/* Predefined Colors */}
            <div className="grid grid-cols-6 gap-2 mb-4">
              {predefinedColors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, colorCode: color }))
                  }
                  className={`w-10 h-10 rounded-lg border-2 transition-all ${
                    formData.colorCode === color
                      ? "border-white scale-110"
                      : "border-gray-600 hover:border-gray-400"
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>

            {/* Custom Color Input */}
            <div className="flex gap-2">
              <input
                type="color"
                name="colorCode"
                value={formData.colorCode}
                onChange={handleChange}
                className="w-12 h-12 rounded-lg border border-purple-500/30 bg-slate-800 cursor-pointer"
              />
              <input
                type="text"
                value={formData.colorCode}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    colorCode: e.target.value,
                  }))
                }
                className="flex-1 px-4 py-3 bg-slate-800/50 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="#6366f1"
              />
            </div>
          </div>

          {/* Preview */}
          <div className="p-4 bg-slate-800/30 rounded-lg border border-purple-500/20">
            <p className="text-sm text-gray-400 mb-2">Preview:</p>
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: formData.colorCode }}
              >
                {formData.iconUrl ? (
                  <img
                    src={formData.iconUrl}
                    alt=""
                    className="w-6 h-6"
                    onError={(e) => (e.target.style.display = "none")}
                  />
                ) : (
                  formData.name.charAt(0).toUpperCase()
                )}
              </div>
              <div>
                <p className="text-white font-medium">
                  {formData.name || "Technology Name"}
                </p>
                <p className="text-sm text-gray-400">
                  {formData.category || "Category"}
                </p>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-6 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700/50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 px-6 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-medium rounded-lg transition-all duration-300"
            >
              {techStack ? "Update Tech Stack" : "Add Tech Stack"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TechStackForm;
