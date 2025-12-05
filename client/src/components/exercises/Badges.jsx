import React from "react";
import {
  CheckCircle,
  Play,
  Clock,
  GraduationCap,
  Brain,
  Crown,
} from "lucide-react";

const StatusBadge = ({ status }) => {
  const getStatusInfo = (status) => {
    const statusConfig = {
      completed: {
        color:
          "from-emerald-500/20 to-green-500/20 text-emerald-300 border-emerald-500/40",
        icon: <CheckCircle className="w-4 h-4" />,
        text: "Hoàn thành",
        bgGlow: "shadow-emerald-500/20",
      },
      current: {
        color:
          "from-blue-500/20 to-cyan-500/20 text-blue-300 border-blue-500/40",
        icon: <Play className="w-4 h-4" />,
        text: "Đang học",
        bgGlow: "shadow-blue-500/20",
      },
      upcoming: {
        color:
          "from-purple-500/20 to-violet-500/20 text-purple-300 border-purple-500/40",
        icon: <Clock className="w-4 h-4" />,
        text: "Sắp tới",
        bgGlow: "shadow-purple-500/20",
      },
    };
    return statusConfig[status] || statusConfig["upcoming"];
  };

  const statusInfo = getStatusInfo(status);

  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-xl text-xs font-medium border bg-gradient-to-r ${statusInfo.color}`}
    >
      {statusInfo.icon}
      {statusInfo.text}
    </span>
  );
};

const DifficultyBadge = ({ difficulty }) => {
  const getDifficultyInfo = (difficulty) => {
    const difficultyConfig = {
      Beginner: {
        color: "bg-green-500/20 text-green-300 border-green-500/30",
        icon: <GraduationCap className="w-3 h-3" />,
      },
      Intermediate: {
        color: "bg-orange-500/20 text-orange-300 border-orange-500/30",
        icon: <Brain className="w-3 h-3" />,
      },
      Advanced: {
        color: "bg-red-500/20 text-red-300 border-red-500/30",
        icon: <Crown className="w-3 h-3" />,
      },
    };
    return difficultyConfig[difficulty] || difficultyConfig["Beginner"];
  };

  const difficultyInfo = getDifficultyInfo(difficulty);

  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-xl text-xs font-medium border ${difficultyInfo.color}`}
    >
      {difficultyInfo.icon}
      {difficulty}
    </span>
  );
};

export { StatusBadge, DifficultyBadge };
