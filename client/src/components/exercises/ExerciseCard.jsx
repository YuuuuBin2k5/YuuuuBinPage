import React from "react";
import { Clock, Globe, Github } from "lucide-react";

const ExerciseCard = ({ exercise }) => {
  return (
    <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded-lg">
              {exercise.difficulty}
            </span>
            <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-lg">
              {exercise.category}
            </span>
            {exercise.estimatedTime && (
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {exercise.estimatedTime}p
              </span>
            )}
          </div>
          <h5 className="font-medium text-white mb-1">{exercise.title}</h5>
          <p className="text-sm text-slate-400">{exercise.description}</p>
          {exercise.hints && exercise.hints.length > 0 && (
            <div className="mt-2">
              <span className="text-xs text-purple-400">
                {exercise.hints.length} gợi ý có sẵn
              </span>
            </div>
          )}
        </div>
        <div className="flex gap-2 ml-4">
          {exercise.demoUrl && (
            <a
              href={exercise.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 rounded-lg transition-colors"
            >
              <Globe className="w-4 h-4" />
            </a>
          )}
          {exercise.githubUrl && (
            <a
              href={exercise.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-slate-600/20 text-slate-400 hover:bg-slate-600/30 rounded-lg transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(ExerciseCard);
