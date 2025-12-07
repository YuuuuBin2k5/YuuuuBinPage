import React, { useState, useEffect } from "react";
import emailjs from '@emailjs/browser';
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Facebook,
  Send,
  User,
  MessageSquare,
  Code,
  Terminal,
  Zap,
  Server,
  Database,
  Lock,
  Clock,
  Activity,
} from "lucide-react";

function MyInfomation() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Trigger animations on mount
  useEffect(() => {
    // Small delay for smooth entrance
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Send email using EmailJS
      const result = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      
      if (result.text === 'OK') {
        alert(">>> MESSAGE_SENT_SUCCESSFULLY\n>>> EMAIL_DELIVERED_TO: daonguyennhatanh0910@gmail.com\n>>> RESPONSE_TIME: <24h\n>>> STATUS: 200_OK");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        throw new Error('Failed to send email');
      }
      
    } catch (error) {
      console.error("Error sending message:", error);
      
      // Fallback: Use mailto (opens email client)
      const mailtoLink = `mailto:daonguyennhatanh0910@gmail.com?subject=${encodeURIComponent(
        `[Portfolio Contact] ${formData.subject}`
      )}&body=${encodeURIComponent(
        `Từ: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
      )}`;
      
      alert(">>> EMAILJS_ERROR\n>>> OPENING_EMAIL_CLIENT_AS_FALLBACK\n>>> STATUS: FALLBACK_MODE");
      window.location.href = mailtoLink;
      
      setTimeout(() => {
        setFormData({ name: "", email: "", subject: "", message: "" });
      }, 1000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Contact information - Hacker style
  const contactInfo = [
    {
      icon: Mail,
      label: "EMAIL_ADDRESS",
      value: "daonguyennhatanh0910@gmail.com",
      link: "mailto:daonguyennhatanh0910@gmail.com",
      color: "from-cyan-500 to-blue-500",
      code: "const email = 'daonguyennhatanh0910@gmail.com';",
    },
    {
      icon: Phone,
      label: "PHONE_NUMBER",
      value: "0786 759 178",
      link: "tel:0786759178",
      color: "from-green-500 to-emerald-500",
      code: "const phone = '0786759178';",
    },
    {
      icon: MapPin,
      label: "LOCATION_GPS",
      value: "KTX D2, ĐHSPKT TP.HCM",
      link: "https://maps.google.com/?q=KTX+D2+Truong+Dai+Hoc+Su+Pham+Ky+Thuat",
      color: "from-red-500 to-orange-500",
      code: "const location = {lat: 10.850, lng: 106.772};",
    },
  ];

  // Social links - Hacker style
  const socialLinks = [
    {
      icon: Github,
      label: "GITHUB",
      link: "https://github.com/yourusername",
      color: "hover:text-purple-400",
      bg: "hover:bg-purple-500/30",
      border: "hover:border-purple-400",
    },
    {
      icon: Linkedin,
      label: "LINKEDIN",
      link: "https://linkedin.com/in/yourusername",
      color: "hover:text-blue-400",
      bg: "hover:bg-blue-500/30",
      border: "hover:border-blue-400",
    },
    {
      icon: Facebook,
      label: "FACEBOOK",
      link: "https://facebook.com/yourusername",
      color: "hover:text-cyan-400",
      bg: "hover:bg-cyan-500/30",
      border: "hover:border-cyan-400",
    },
  ];

  return (
    <div className={`min-h-screen bg-black -mt-24 pt-24 relative overflow-hidden transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Matrix-style background */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 0, 0.03) 2px, rgba(0, 255, 0, 0.03) 4px)`,
        }}></div>
      </div>

      {/* Scanline effect - Optimized */}
      <div className="fixed inset-0 pointer-events-none will-change-transform">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent animate-scan"></div>
      </div>

      {/* Header Section - Compact */}
      <div className={`px-6 py-8 relative transition-all duration-700 ${isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}>
        <div className="max-w-7xl mx-auto text-center">
          {/* Simple Title */}
          <div className="inline-block mb-4 px-4 py-1 bg-black border-2 border-cyan-500">
            <span className="text-cyan-400 font-mono font-black text-xs tracking-widest">
              CONTACT_PROTOCOL
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tight">
            <span className="text-cyan-400">GET</span>
            <span className="text-white">_</span>
            <span className="text-green-400">IN</span>
            <span className="text-white">_</span>
            <span className="text-cyan-400">TOUCH</span>
          </h1>
          
          <p className="text-green-400 font-mono text-sm max-w-2xl mx-auto">
            <span className="text-gray-500">// </span>
            Ready to collaborate on innovative projects
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 pb-12 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Left Column - Contact Info & Map */}
            <div className={`space-y-6 transition-all duration-700 delay-100 ${isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'}`}>
              {/* Contact Cards - Hacker Style */}
              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <a
                    key={index}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group"
                    style={{
                      animation: isLoaded ? `slideInLeft 0.5s ease-out ${0.3 + index * 0.1}s both` : 'none'
                    }}
                  >
                    <div className="relative bg-black border-4 border-cyan-500/50 hover:border-cyan-400 transition-all duration-300 overflow-hidden">
                      {/* Corner decorations */}
                      <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-green-400"></div>
                      <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-green-400"></div>
                      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-green-400"></div>
                      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-green-400"></div>
                      
                      {/* Glitch effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/20 to-cyan-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></div>
                      
                      <div className="relative p-6">
                        {/* Header bar */}
                        <div className="flex items-center gap-3 mb-4 pb-3 border-b-2 border-cyan-500/30">
                          <div className={`w-12 h-12 bg-gradient-to-br ${item.color} flex items-center justify-center border-2 border-white/20`}>
                            <item.icon className="w-6 h-6 text-black font-bold" />
                          </div>
                          <div className="flex-1">
                            <p className="text-xs text-cyan-400 font-mono font-black tracking-widest mb-1">
                              {item.label}
                            </p>
                            <p className="text-white font-bold text-lg group-hover:text-cyan-400 transition-colors">
                              {item.value}
                            </p>
                          </div>
                          <Terminal className="w-5 h-5 text-green-400 opacity-0 group-hover:opacity-100 transition-opacity animate-pulse" />
                        </div>
                        
                        {/* Code snippet */}
                        <div className="bg-slate-950 border-2 border-green-500/30 p-3 font-mono text-xs">
                          <span className="text-gray-500">// </span>
                          <span className="text-green-400">{item.code}</span>
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              {/* Google Map - Hacker Style */}
              <div className="relative bg-black border-4 border-red-500/50 overflow-hidden">
                {/* Map header */}
                <div className="absolute top-0 left-0 right-0 z-10 bg-red-500 text-black px-4 py-2 font-mono font-black text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>GPS_COORDINATES</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4 animate-pulse" />
                    <span>TRACKING_ACTIVE</span>
                  </div>
                </div>
                
                <div className="mt-10">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.4449446781814!2d106.77242407570754!3d10.850637889300238!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752701e8d9a3e5%3A0x30056b2fdf8c95b!2zS1RYIMSQSCBTUEtUIFRQLkhDTQ!5e0!3m2!1svi!2s!4v1701234567890!5m2!1svi!2s"
                    width="100%"
                    height="350"
                    style={{ border: 0, filter: 'grayscale(100%) contrast(1.2) brightness(0.8)' }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
                
                {/* Overlay grid */}
                <div className="absolute inset-0 pointer-events-none" style={{
                  backgroundImage: 'linear-gradient(rgba(255,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,0,0,0.1) 1px, transparent 1px)',
                  backgroundSize: '20px 20px'
                }}></div>
              </div>

              {/* Social Links - Hacker Style */}
              <div className="bg-black border-4 border-green-500/50 p-6">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-green-500/30">
                  <Server className="w-6 h-6 text-green-400 animate-pulse" />
                  <h3 className="text-xl font-black text-green-400 font-mono tracking-wider">
                    SOCIAL_NETWORKS
                  </h3>
                  <div className="flex-1 h-0.5 bg-gradient-to-r from-green-500/50 to-transparent"></div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative"
                    >
                      <div className={`bg-black border-4 border-slate-700 ${social.border} ${social.bg} transition-all duration-300 p-6 hover:scale-105 relative overflow-hidden`}>
                        {/* Corner accents */}
                        <div className="absolute top-0 left-0 w-2 h-2 bg-cyan-400"></div>
                        <div className="absolute top-0 right-0 w-2 h-2 bg-cyan-400"></div>
                        <div className="absolute bottom-0 left-0 w-2 h-2 bg-cyan-400"></div>
                        <div className="absolute bottom-0 right-0 w-2 h-2 bg-cyan-400"></div>
                        
                        <social.icon className={`w-8 h-8 text-slate-400 ${social.color} transition-colors mx-auto mb-3`} />
                        <p className="text-xs text-slate-400 text-center font-mono font-bold tracking-wider">
                          {social.label}
                        </p>
                        
                        {/* Hover effect */}
                        <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form - Hacker Style */}
            <div className={`bg-black border-4 border-cyan-500/50 relative overflow-hidden transition-all duration-700 delay-200 ${isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}>
              {/* Header bar */}
              <div className="bg-cyan-500 text-black px-6 py-3 font-mono font-black text-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Terminal className="w-5 h-5" />
                  <span>MESSAGE_PROTOCOL</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 animate-pulse" />
                  <span className="text-xs">ENCRYPTED</span>
                </div>
              </div>

              <div className="p-8">
                {/* Form header */}
                <div className="mb-8 bg-slate-950 border-2 border-green-500/30 p-4">
                  <div className="font-mono text-xs text-green-400">
                    <span className="text-gray-500">// </span>
                    <span className="text-cyan-400">async function</span>
                    <span className="text-white"> </span>
                    <span className="text-yellow-400">sendMessage</span>
                    <span className="text-white">(data) {"{"}</span>
                    <br />
                    <span className="text-white ml-4">await </span>
                    <span className="text-cyan-400">fetch</span>
                    <span className="text-white">(</span>
                    <span className="text-orange-400">'/api/contact'</span>
                    <span className="text-white">, data);</span>
                    <br />
                    <span className="text-white ml-4">return </span>
                    <span className="text-orange-400">'SUCCESS'</span>
                    <span className="text-white">;</span>
                    <br />
                    <span className="text-white">{"}"}</span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Input */}
                  <div>
                    <label className="block text-xs font-mono font-black text-cyan-400 mb-2 tracking-widest flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>USERNAME</span>
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-black border-4 border-slate-700 focus:border-cyan-400 text-green-400 placeholder-slate-600 focus:outline-none transition-all font-mono font-bold"
                      placeholder="root@user"
                    />
                  </div>

                  {/* Email Input */}
                  <div>
                    <label className="block text-xs font-mono font-black text-cyan-400 mb-2 tracking-widest flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <span>EMAIL_ADDRESS</span>
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-black border-4 border-slate-700 focus:border-cyan-400 text-green-400 placeholder-slate-600 focus:outline-none transition-all font-mono font-bold"
                      placeholder="user@domain.com"
                    />
                  </div>

                  {/* Subject Input */}
                  <div>
                    <label className="block text-xs font-mono font-black text-cyan-400 mb-2 tracking-widest flex items-center gap-2">
                      <Code className="w-4 h-4" />
                      <span>SUBJECT_LINE</span>
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-black border-4 border-slate-700 focus:border-cyan-400 text-green-400 placeholder-slate-600 focus:outline-none transition-all font-mono font-bold"
                      placeholder="PROJECT_COLLABORATION | INQUIRY | OTHER"
                    />
                  </div>

                  {/* Message Textarea */}
                  <div>
                    <label className="block text-xs font-mono font-black text-cyan-400 mb-2 tracking-widest flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      <span>MESSAGE_BODY</span>
                      <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="6"
                      className="w-full px-4 py-3 bg-black border-4 border-slate-700 focus:border-cyan-400 text-green-400 placeholder-slate-600 focus:outline-none transition-all resize-none font-mono"
                      placeholder="// Enter your message here..."
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full group relative overflow-hidden px-6 py-4 bg-gradient-to-r from-green-600 to-cyan-600 hover:from-green-500 hover:to-cyan-500 text-black font-black border-4 border-green-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></div>
                    <span className="relative flex items-center justify-center gap-3 font-mono text-lg tracking-wider">
                      {isSubmitting ? (
                        <>
                          <div className="w-6 h-6 border-4 border-black/30 border-t-black animate-spin"></div>
                          TRANSMITTING...
                        </>
                      ) : (
                        <>
                          <Send className="w-6 h-6" />
                          SEND_MESSAGE
                          <Zap className="w-6 h-6 animate-pulse" />
                        </>
                      )}
                    </span>
                  </button>
                </form>

                {/* Status Info */}
                <div className="mt-8 bg-slate-950 border-2 border-green-500/30 p-4">
                  <div className="grid grid-cols-2 gap-4 font-mono text-xs">
                    <div className="flex items-center gap-2 text-green-400">
                      <Clock className="w-4 h-4 animate-pulse" />
                      <div>
                        <div className="text-gray-500">RESPONSE_TIME:</div>
                        <div className="font-bold">&lt; 24 HOURS</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-cyan-400">
                      <Activity className="w-4 h-4 animate-pulse" />
                      <div>
                        <div className="text-gray-500">AVAILABILITY:</div>
                        <div className="font-bold">24/7 ONLINE</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Glowing orbs */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 blur-3xl animate-pulse"></div>
        <div className="absolute top-2/3 right-1/4 w-96 h-96 bg-green-500/20 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-red-500/20 blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Custom Styles - Optimized */}
      <style dangerouslySetInnerHTML={{
        __html: `
          /* Scanline animation - GPU accelerated */
          @keyframes scan {
            0% { transform: translate3d(0, -100%, 0); }
            100% { transform: translate3d(0, 100%, 0); }
          }
          .animate-scan {
            animation: scan 8s linear infinite;
            will-change: transform;
          }
          
          /* Gradient animation */
          @keyframes gradient {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          .animate-gradient {
            background-size: 200% 200%;
            animation: gradient 3s ease infinite;
          }
          
          /* Custom scrollbar */
          ::-webkit-scrollbar {
            width: 10px;
          }
          ::-webkit-scrollbar-track {
            background: #000;
            border-left: 2px solid #0ff;
          }
          ::-webkit-scrollbar-thumb {
            background: linear-gradient(180deg, #0ff, #0f0);
            border: 2px solid #000;
          }
          ::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(180deg, #0f0, #0ff);
          }
          
          /* Slide in animations */
          @keyframes slideInLeft {
            from {
              opacity: 0;
              transform: translateX(-30px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          @keyframes slideInRight {
            from {
              opacity: 0;
              transform: translateX(30px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          /* Performance optimizations */
          * {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
          
          /* Reduce motion for accessibility */
          @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
          }
        `
      }} />
    </div>
  );
}

export default MyInfomation;
