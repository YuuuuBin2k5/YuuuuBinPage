import React, { useState } from "react";
import { X, Lock, User, Eye, EyeOff, Shield, AlertCircle } from "lucide-react";
import { useTranslation } from "../../hooks/useTranslation";

const AdminLogin = ({ isOpen, onClose, onLogin }) => {
  const { t } = useTranslation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  console.log("AdminLogin render - isOpen:", isOpen);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate authentication delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (username === "admin" && password === "admin123") {
      onLogin();
      onClose();
      setUsername("");
      setPassword("");
    } else {
      setError(t("adminLogin.error"));
      // Shake animation
      const form = e.target;
      form.classList.add("shake");
      setTimeout(() => form.classList.remove("shake"), 500);
    }
    setIsLoading(false);
  };

  const handleClose = () => {
    if (!isLoading) {
      setUsername("");
      setPassword("");
      setError("");
      setShowPassword(false);
      onClose();
    }
  };

  if (!isOpen) {
    console.log("AdminLogin hidden - isOpen is false");
    return null;
  }

  console.log("AdminLogin showing modal!");

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isLoading) {
          handleClose();
        }
      }}
    >
      <div className="relative w-full max-w-md bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl shadow-2xl border border-slate-700/50 overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-emerald-600/10 pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-emerald-500" />

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all duration-200 z-10"
          disabled={isLoading}
          type="button"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="relative pt-8 pb-6 px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-gradient-to-br from-purple-600 to-emerald-600 rounded-2xl shadow-lg">
            <Shield size={32} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            {t("adminLogin.title")}
          </h2>
          <p className="text-slate-400 text-sm">{t("adminLogin.subtitle")}</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="relative px-8 pb-8 space-y-5">
          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          {/* Username Field */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300">
              {t("adminLogin.username")}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User size={18} className="text-slate-400" />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-200"
                placeholder={t("adminLogin.usernamePlaceholder")}
                required
                disabled={isLoading}
                autoFocus
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300">
              {t("adminLogin.password")}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock size={18} className="text-slate-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-3 bg-slate-800/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-200"
                placeholder={t("adminLogin.passwordPlaceholder")}
                required
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white transition-colors"
                disabled={isLoading}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-emerald-600 hover:from-purple-700 hover:to-emerald-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>{t("adminLogin.processing")}</span>
              </>
            ) : (
              <>
                <Shield size={18} />
                <span>{t("adminLogin.loginButton")}</span>
              </>
            )}
          </button>

          {/* Info Text */}
          <p className="text-xs text-slate-500 text-center mt-4">
            {t("adminLogin.info")}
          </p>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
