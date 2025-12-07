import React, { useState } from "react";
import { Plus, X, Image as ImageIcon, MoveUp, MoveDown } from "lucide-react";

const MultiImageUploader = ({ images = [], onChange, maxImages = 10 }) => {
  const [newImageUrl, setNewImageUrl] = useState("");
  const [newCaption, setNewCaption] = useState("");

  const addImage = () => {
    if (newImageUrl.trim() && images.length < maxImages) {
      const newImage = {
        imageUrl: newImageUrl.trim(),
        caption: newCaption.trim(),
        displayOrder: images.length,
      };
      onChange([...images, newImage]);
      setNewImageUrl("");
      setNewCaption("");
    }
  };

  const removeImage = (index) => {
    const updated = images.filter((_, i) => i !== index);
    // Reorder
    const reordered = updated.map((img, i) => ({ ...img, displayOrder: i }));
    onChange(reordered);
  };

  const moveImage = (index, direction) => {
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === images.length - 1)
    ) {
      return;
    }

    const newIndex = direction === "up" ? index - 1 : index + 1;
    const updated = [...images];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];

    // Update display order
    const reordered = updated.map((img, i) => ({ ...img, displayOrder: i }));
    onChange(reordered);
  };

  return (
    <div className="space-y-4">
      {/* Add New Image */}
      <div className="p-4 bg-slate-800/50 border border-blue-400/30 rounded-xl space-y-3">
        <label className="block text-sm font-medium text-slate-300">
          <ImageIcon className="w-4 h-4 inline mr-2" />
          Thêm ảnh mới ({images.length}/{maxImages})
        </label>

        <input
          type="url"
          value={newImageUrl}
          onChange={(e) => setNewImageUrl(e.target.value)}
          placeholder="https://example.com/image.jpg"
          className="w-full px-4 py-2 bg-slate-900/50 border border-blue-400/30 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addImage())}
        />

        <input
          type="text"
          value={newCaption}
          onChange={(e) => setNewCaption(e.target.value)}
          placeholder="Mô tả ảnh (tùy chọn)"
          className="w-full px-4 py-2 bg-slate-900/50 border border-blue-400/30 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addImage())}
        />

        <button
          type="button"
          onClick={addImage}
          disabled={!newImageUrl.trim() || images.length >= maxImages}
          className="w-full px-4 py-2 bg-blue-600/20 text-blue-400 border border-blue-500/30 rounded-lg hover:bg-blue-600/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Thêm Ảnh
        </button>
      </div>

      {/* Image List */}
      {images.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm text-slate-400">
            Danh sách ảnh (kéo để sắp xếp thứ tự)
          </p>
          {images.map((image, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg group"
            >
              {/* Preview */}
              <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-slate-800">
                <img
                  src={image.imageUrl}
                  alt={image.caption || `Image ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.parentElement.innerHTML = `<div class="w-full h-full flex items-center justify-center"><svg class="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg></div>`;
                  }}
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm text-slate-300 truncate mb-1">
                  {image.imageUrl}
                </p>
                {image.caption && (
                  <p className="text-xs text-slate-400">{image.caption}</p>
                )}
                <p className="text-xs text-blue-400 mt-1">
                  Thứ tự: {index + 1}
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => moveImage(index, "up")}
                  disabled={index === 0}
                  className="p-1.5 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  title="Di chuyển lên"
                >
                  <MoveUp className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => moveImage(index, "down")}
                  disabled={index === images.length - 1}
                  className="p-1.5 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  title="Di chuyển xuống"
                >
                  <MoveDown className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors"
                  title="Xóa"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiImageUploader;
