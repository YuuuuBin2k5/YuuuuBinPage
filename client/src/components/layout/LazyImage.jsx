import React, { useState, useEffect } from "react";
import { Image as ImageIcon } from "lucide-react";

const LazyImage = ({
  src,
  alt,
  className = "",
  placeholderClassName = "",
  onLoad,
  onError,
  ...props
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    if (!src) {
      setLoading(false);
      setError(true);
      return;
    }

    // Reset states when src changes
    setLoading(true);
    setError(false);
    setImageSrc(null);

    const img = new Image();

    const handleLoad = () => {
      console.log("Image loaded successfully:", src);
      setImageSrc(src);
      setLoading(false);
      setError(false);
      onLoad?.();
    };

    const handleError = () => {
      console.log("Image failed to load:", src);
      setLoading(false);
      setError(true);
      onError?.();
    };

    img.onload = handleLoad;
    img.onerror = handleError;
    img.src = src;

    // Cleanup function
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, onLoad, onError]);

  if (loading) {
    return (
      <div
        className={`flex items-center justify-center bg-slate-800/50 ${placeholderClassName} ${className}`}
      >
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-purple-500/30 border-t-purple-400 rounded-full animate-spin"></div>
          <span className="text-xs text-slate-400">Đang tải...</span>
        </div>
      </div>
    );
  }

  if (error || !imageSrc) {
    return (
      <div
        className={`flex items-center justify-center bg-slate-800/50 border border-purple-500/20 ${placeholderClassName} ${className}`}
      >
        <div className="flex flex-col items-center gap-2 text-slate-400 p-4 max-w-full">
          <ImageIcon className="w-8 h-8 text-slate-500" />
          <span className="text-xs text-center">Ảnh không tải được</span>
          {src && (
            <div className="text-xs text-slate-600 text-center max-w-full">
              <p className="mb-1">URL:</p>
              <p className="break-all bg-slate-900/50 p-2 rounded text-xs max-w-full overflow-hidden">
                {src.length > 80 ? `${src.substring(0, 80)}...` : src}
              </p>
              {src.includes("google.com") && (
                <p className="text-yellow-400 mt-2 text-xs">
                  ⚠️ Google search URL - cần URL ảnh trực tiếp
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  return <img src={imageSrc} alt={alt} className={className} {...props} />;
};

export default LazyImage;
