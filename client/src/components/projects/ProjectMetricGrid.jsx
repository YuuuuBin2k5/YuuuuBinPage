import React from "react";
import { Database, Layers, Zap, Box, Cloud, Server } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";

const metricIconMap = {
  "Database Scale": Database,
  "Quy mô cơ sở dữ liệu": Database,
  "Dynamic Querying": Layers,
  "Công nghệ truy vấn động": Layers,
  "Variant Attributes": Layers,
  "Mô hình biến thể": Layers,
  "REST API Domains": Server,
  "Phạm vi REST APIs": Server,
  "In-Memory Cache": Zap,
  "Bộ nhớ đệm": Zap,
  "Database Host": Database,
  "Cơ sở dữ liệu": Database,
  "Container Build": Box,
  "Đóng gói container": Box,
  Deployment: Cloud,
  "Triển khai": Cloud,
};

const ProjectMetricGrid = ({ keyMetrics = [] }) => {
  const { language } = useLanguage();
  const isEn = language === "en";

  if (!keyMetrics || keyMetrics.length === 0) return null;

  return (
    <section aria-label={isEn ? "Key System Metrics" : "Các Chỉ Số Kỹ Thuật Chính"} className="space-y-3">
      <h2 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
        {isEn ? "Key Verified System Indicators" : "Chỉ Số Kỹ Thuật Đã Xác Thực"}
      </h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {keyMetrics.map((metric, idx) => {
          const labelStr = isEn ? metric.label.en : metric.label.vi;
          const MetricIcon = metricIconMap[labelStr] || Layers;

          return (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-900/90 border border-slate-800/80 shadow-sm space-y-1.5"
            >
              <div className="flex items-center gap-2 text-indigo-400 text-xs font-mono">
                <MetricIcon className="w-4 h-4" aria-hidden="true" />
                <span className="truncate">{labelStr}</span>
              </div>
              <div className="text-xl sm:text-2xl font-bold text-white font-mono tracking-tight">
                {metric.value}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ProjectMetricGrid;
