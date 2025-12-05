import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { techStackAPI } from "../../services/api";
import { Plus, Edit, Trash2, Palette, Code } from "lucide-react";
import TechStackForm from "../admin/TechStackForm";

const MyProject = () => {
  const { isAdmin } = useAuth();
  const [techStacks, setTechStacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTechStack, setEditingTechStack] = useState(null);

  // Load tech stacks from API
  useEffect(() => {
    loadTechStacks();
  }, []);

  const loadTechStacks = async () => {
    try {
      setLoading(true);
      const data = await techStackAPI.getAll();
      setTechStacks(data);
    } catch (error) {
      console.error("Error loading tech stacks:", error);
      // Fallback to static data if API fails
      setTechStacks([
        {
          id: 1,
          name: "React",
          category: "Frontend",
          iconUrl:
            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
          colorCode: "#61DAFB",
        },
        {
          id: 2,
          name: "Spring Boot",
          category: "Backend",
          iconUrl:
            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
          colorCode: "#6DB33F",
        },
        {
          id: 3,
          name: "PostgreSQL",
          category: "Database",
          iconUrl:
            "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
          colorCode: "#336791",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTechStack = async (techStackData) => {
    try {
      const newTechStack = await techStackAPI.create(techStackData);
      setTechStacks((prev) => [...prev, newTechStack]);
      setShowForm(false);
    } catch (error) {
      console.error("Error creating tech stack:", error);
      alert("Error creating tech stack. Please try again.");
    }
  };

  const handleUpdateTechStack = async (techStackData) => {
    try {
      const updatedTechStack = await techStackAPI.update(
        editingTechStack.id,
        techStackData
      );
      setTechStacks((prev) =>
        prev.map((t) => (t.id === editingTechStack.id ? updatedTechStack : t))
      );
      setShowForm(false);
      setEditingTechStack(null);
    } catch (error) {
      console.error("Error updating tech stack:", error);
      alert("Error updating tech stack. Please try again.");
    }
  };

  const handleDeleteTechStack = async (id) => {
    if (!confirm("Are you sure you want to delete this technology?")) return;

    try {
      await techStackAPI.delete(id);
      setTechStacks((prev) => prev.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Error deleting tech stack:", error);
      alert("Error deleting tech stack. Please try again.");
    }
  };

  const groupedTechStacks = techStacks.reduce((acc, tech) => {
    const category = tech.category || "Other";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(tech);
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
            My Technology Stack
          </h2>
          <p className="text-gray-400">Technologies and tools I work with</p>
        </div>

        {isAdmin && (
          <button
            onClick={() => {
              setEditingTechStack(null);
              setShowForm(true);
            }}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            <Plus size={20} />
            Add Technology
          </button>
        )}
      </div>

      {/* Tech Stacks by Category */}
      <div className="space-y-8">
        {Object.entries(groupedTechStacks).map(([category, technologies]) => (
          <div
            key={category}
            className="bg-slate-900/30 border border-purple-500/20 rounded-2xl p-6"
          >
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Code className="text-purple-400" size={20} />
              {category}
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {technologies.map((tech) => (
                <div
                  key={tech.id}
                  className="group relative bg-slate-800/50 border border-purple-500/30 rounded-xl p-4 hover:border-purple-400/50 transition-all duration-300 transform hover:scale-105"
                >
                  {/* Admin Controls */}
                  {isAdmin && (
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                      <button
                        onClick={() => {
                          setEditingTechStack(tech);
                          setShowForm(true);
                        }}
                        className="p-1 text-blue-400 hover:text-blue-300 hover:bg-blue-500/20 rounded"
                      >
                        <Edit size={12} />
                      </button>
                      <button
                        onClick={() => handleDeleteTechStack(tech.id)}
                        className="p-1 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  )}

                  {/* Tech Icon */}
                  <div className="flex flex-col items-center text-center">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center mb-3 text-white font-bold"
                      style={{ backgroundColor: tech.colorCode }}
                    >
                      {tech.iconUrl ? (
                        <img
                          src={tech.iconUrl}
                          alt={tech.name}
                          className="w-8 h-8"
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "block";
                          }}
                        />
                      ) : (
                        <span className="text-lg">
                          {tech.name.charAt(0).toUpperCase()}
                        </span>
                      )}
                      <span
                        className="text-lg hidden"
                        style={{ display: tech.iconUrl ? "none" : "block" }}
                      >
                        {tech.name.charAt(0).toUpperCase()}
                      </span>
                    </div>

                    {/* Tech Name */}
                    <h4 className="text-sm font-medium text-white mb-1">
                      {tech.name}
                    </h4>

                    {/* Color Badge */}
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <Palette size={10} />
                      <span>{tech.colorCode}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {techStacks.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">⚙️</div>
          <h3 className="text-2xl font-bold text-gray-400 mb-2">
            No Technologies Yet
          </h3>
          <p className="text-gray-500 mb-6">
            {isAdmin
              ? "Add your first technology to showcase your skills!"
              : "Technology stack will appear here when available."}
          </p>
          {isAdmin && (
            <button
              onClick={() => {
                setEditingTechStack(null);
                setShowForm(true);
              }}
              className="px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-lg transition-all duration-300"
            >
              Add First Technology
            </button>
          )}
        </div>
      )}

      {/* Tech Stack Form Modal */}
      <TechStackForm
        isOpen={showForm}
        onClose={() => {
          setShowForm(false);
          setEditingTechStack(null);
        }}
        onSubmit={
          editingTechStack ? handleUpdateTechStack : handleCreateTechStack
        }
        techStack={editingTechStack}
      />
    </div>
  );
};

export default MyProject;
