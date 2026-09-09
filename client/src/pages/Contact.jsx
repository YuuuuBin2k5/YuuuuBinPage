import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Send,
  Download,
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  MessageSquare,
  FileText
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { profileData } from "../data/profileData";

const Contact = () => {
  const { language } = useLanguage();
  const isEn = language === "en";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // { type: 'success' | 'error', message: string }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Transparent client-side validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setSubmitStatus({
        type: "error",
        message: isEn
          ? "Please provide your name, a valid email address, and a message."
          : "Vui lòng điền họ tên, địa chỉ email hợp lệ và nội dung tin nhắn.",
      });
      return;
    }

    if (!emailRegex.test(formData.email.trim())) {
      setSubmitStatus({
        type: "error",
        message: isEn
          ? "Please enter a valid email address (e.g. name@company.com)."
          : "Vui lòng nhập địa chỉ email đúng định dạng (ví dụ: name@company.com).",
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error("EmailJS client environment variables are not configured");
      }

      const result = await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name.trim(),
          from_email: formData.email.trim(),
          subject: formData.subject.trim() || (isEn ? "Recruiter Inquiry - Java Backend Intern" : "Liên Hệ Tuyển Dụng - Java Backend Intern"),
          message: formData.message.trim(),
        },
        publicKey
      );

      if (result.text === "OK" || result.status === 200) {
        setSubmitStatus({
          type: "success",
          message: isEn
            ? "Message sent successfully. Thank you for reaching out."
            : "Tin nhắn đã được gửi thành công. Cảm ơn bạn đã liên hệ.",
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        throw new Error("Email delivery returned non-OK status");
      }
    } catch (error) {
      console.error("EmailJS submission failure:", error);
      setSubmitStatus({
        type: "error",
        message: isEn
          ? "Unable to send message via the web form. Please send an email directly to " + profileData.email + "."
          : "Không thể gửi tin nhắn qua biểu mẫu trực tuyến. Vui lòng gửi email trực tiếp tới " + profileData.email + ".",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const mailtoHref = `mailto:${profileData.email}?subject=${encodeURIComponent(
    formData.subject ? `[Portfolio Contact] ${formData.subject}` : "[Portfolio Contact] Discussion with Java Backend Developer Intern"
  )}&body=${encodeURIComponent(
    `From: ${formData.name || ""}\nEmail: ${formData.email || ""}\n\n${formData.message || ""}`
  )}`;

  return (
    <div className="w-full bg-slate-950/90 text-slate-100 min-h-screen">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10">
        {/* Page Header */}
        <header className="space-y-3 text-left max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-950/70 border border-indigo-500/30 text-indigo-300 font-mono text-xs uppercase tracking-wider">
            <Mail className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{isEn ? "Recruiter Contact" : "Liên Hệ Tuyển Dụng"}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            {isEn ? "Let's Connect & Discuss Opportunities" : "Kết Nối & Trao Đổi Cơ Hội Hợp Tác"}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {isEn
              ? "I'm currently looking for Java Backend Developer Internship opportunities and am open to discussing backend projects, internship roles, or technical collaboration."
              : "Hiện tại tôi đang tìm kiếm cơ hội Thực tập sinh Java Backend và sẵn sàng trao đổi về vị trí thực tập, dự án backend hoặc các cơ hội hợp tác kỹ thuật phù hợp."}
          </p>
        </header>

        {/* 40 / 60 Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Candidate Identity & Verified Contact Details (~40%) */}
          <section
            aria-label={isEn ? "Candidate Contact Information" : "Thông Tin Liên Hệ Ứng Viên"}
            className="lg:col-span-5 space-y-6"
          >
            {/* Identity Card */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
              <div className="space-y-1">
                <h2 className="text-xl font-bold text-white tracking-tight">
                  {isEn ? profileData.fullName.en : profileData.fullName.vi}
                </h2>
                <div className="text-xs font-mono font-semibold text-indigo-400">
                  {isEn ? profileData.professionalTitle.en : profileData.professionalTitle.vi}
                </div>
                <div className="text-xs text-slate-400">
                  {isEn ? profileData.studentStatus.en : profileData.studentStatus.vi} • {profileData.university.short}
                </div>
              </div>

              {/* Verified Contact Details */}
              <div className="pt-2 border-t border-slate-800 space-y-3 text-xs sm:text-sm">
                {/* Email (Direct Fallback) */}
                <div className="flex items-start gap-3 text-slate-300">
                  <Mail className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" aria-hidden="true" />
                  <div className="space-y-0.5 min-w-0">
                    <span className="text-[11px] font-mono text-slate-400 block">{isEn ? "Direct Email:" : "Email trực tiếp:"}</span>
                    <a
                      href={`mailto:${profileData.email}`}
                      className="text-white hover:text-indigo-300 font-mono break-all transition-colors underline focus:outline-none focus:ring-1 focus:ring-indigo-400"
                    >
                      {profileData.email}
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3 text-slate-300">
                  <Phone className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" aria-hidden="true" />
                  <div className="space-y-0.5">
                    <span className="text-[11px] font-mono text-slate-400 block">{isEn ? "Phone Number:" : "Số điện thoại:"}</span>
                    <a
                      href={`tel:${profileData.phone.replace(/\s+/g, "")}`}
                      className="text-white hover:text-cyan-300 font-mono transition-colors focus:outline-none focus:ring-1 focus:ring-indigo-400"
                    >
                      {profileData.phone}
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-3 text-slate-300">
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
                  <div className="space-y-0.5">
                    <span className="text-[11px] font-mono text-slate-400 block">{isEn ? "Location:" : "Địa điểm:"}</span>
                    <span className="text-white">
                      {isEn ? profileData.location.en : profileData.location.vi}
                    </span>
                  </div>
                </div>
              </div>

              {/* Profiles & CV Download */}
              <div className="pt-3 border-t border-slate-800 space-y-3">
                <div className="flex items-center gap-3">
                  {profileData.githubUrl && (
                    <a
                      href={profileData.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-200 text-xs font-mono border border-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      aria-label={isEn ? "Visit GitHub profile" : "Xem hồ sơ GitHub"}
                    >
                      <Github className="w-4 h-4" aria-hidden="true" />
                      <span>GitHub</span>
                      <ExternalLink className="w-3 h-3 opacity-60" aria-hidden="true" />
                    </a>
                  )}

                  {profileData.linkedinUrl && (
                    <a
                      href={profileData.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-200 text-xs font-mono border border-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      aria-label={isEn ? "Visit LinkedIn profile" : "Xem hồ sơ LinkedIn"}
                    >
                      <Linkedin className="w-4 h-4 text-blue-400" aria-hidden="true" />
                      <span>LinkedIn</span>
                      <ExternalLink className="w-3 h-3 opacity-60" aria-hidden="true" />
                    </a>
                  )}
                </div>

                {/* CV Action */}
                {profileData.cvPath && (
                  <div className="pt-1">
                    <a
                      href={profileData.cvPath}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-mono font-medium border border-slate-700 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      aria-label={isEn ? "View candidate CV (PDF) in a new tab" : "Xem CV ứng viên (PDF) trong tab mới"}
                    >
                      <FileText className="w-4 h-4 text-indigo-400" aria-hidden="true" />
                      <span>{isEn ? "View CV (PDF)" : "Xem CV (PDF)"}</span>
                      <ExternalLink className="w-3.5 h-3.5 opacity-60" aria-hidden="true" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Right Column: Clean Contact Form (~60%) */}
          <section
            aria-label={isEn ? "Send Message Form" : "Biểu Mẫu Gửi Tin Nhắn"}
            className="lg:col-span-7"
          >
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-6">
              <div className="space-y-1">
                <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-indigo-400" aria-hidden="true" />
                  <span>{isEn ? "Send a Direct Message" : "Gửi Tin Nhắn Trực Tiếp"}</span>
                </h2>
                <p className="text-xs text-slate-400">
                  {isEn
                    ? "Fill out the fields below or reach out directly via email."
                    : "Điền thông tin bên dưới hoặc liên hệ trực tiếp qua hòm thư điện tử."}
                </p>
              </div>

              {/* Status Feedback (aria-live) */}
              <div aria-live="polite" className="space-y-2">
                {submitStatus && submitStatus.type === "success" && (
                  <div className="p-4 rounded-xl bg-emerald-950/70 border border-emerald-500/40 text-emerald-200 text-xs sm:text-sm flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
                    <div className="space-y-1">
                      <span className="font-bold block">{isEn ? "Success" : "Thành công"}</span>
                      <span>{submitStatus.message}</span>
                    </div>
                  </div>
                )}

                {submitStatus && submitStatus.type === "error" && (
                  <div className="p-4 rounded-xl bg-red-950/70 border border-red-500/40 text-red-200 text-xs sm:text-sm space-y-3">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" aria-hidden="true" />
                      <div className="space-y-1">
                        <span className="font-bold block">{isEn ? "Submission Note" : "Lưu ý gửi tin"}</span>
                        <span>{submitStatus.message}</span>
                      </div>
                    </div>
                    <div>
                      <a
                        href={mailtoHref}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-900/60 hover:bg-red-800 text-white font-mono text-xs border border-red-500/30 transition-colors"
                      >
                        <Mail className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>{isEn ? "Open Email Client Fallback" : "Mở Trình Gửi Email Trực Tiếp"}</span>
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-name" className="block text-xs font-mono font-medium text-slate-300">
                    {isEn ? "Your Name" : "Họ và tên"} <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    autoComplete="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    placeholder={isEn ? "e.g. John Doe / Technical Recruiter" : "Ví dụ: Nguyễn Văn A / Nhà tuyển dụng"}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 disabled:opacity-50 transition-colors"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-email" className="block text-xs font-mono font-medium text-slate-300">
                    {isEn ? "Email Address" : "Địa chỉ Email"} <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    placeholder="email@company.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 disabled:opacity-50 transition-colors font-mono"
                  />
                </div>

                {/* Subject */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-subject" className="block text-xs font-mono font-medium text-slate-300">
                    {isEn ? "Subject" : "Tiêu đề"}
                  </label>
                  <input
                    type="text"
                    id="contact-subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    placeholder={isEn ? "Java Backend Intern Opportunity" : "Cơ hội Thực tập sinh Java Backend"}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 disabled:opacity-50 transition-colors"
                  />
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-message" className="block text-xs font-mono font-medium text-slate-300">
                    {isEn ? "Message Content" : "Nội dung tin nhắn"} <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    placeholder={
                      isEn
                        ? "Describe the role, project requirements, or discussion topics..."
                        : "Mô tả vị trí tuyển dụng, yêu cầu dự án hoặc nội dung cần trao đổi..."
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 disabled:opacity-50 transition-colors resize-y"
                  />
                </div>

                {/* Submit Action */}
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <p className="text-[11px] text-slate-500">
                    {isEn ? "* Required fields for direct submission" : "* Các trường thông tin bắt buộc"}
                  </p>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-semibold shadow-md shadow-indigo-600/20 disabled:opacity-60 disabled:cursor-not-allowed transition-all focus:outline-none focus:ring-2 focus:ring-indigo-400 shrink-0"
                    aria-label={isEn ? "Send message via web form" : "Gửi tin nhắn qua biểu mẫu"}
                  >
                    <Send className="w-4 h-4" aria-hidden="true" />
                    <span>
                      {isSubmitting
                        ? (isEn ? "Sending..." : "Đang gửi...")
                        : (isEn ? "Send Message" : "Gửi Tin Nhắn")}
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Contact;
