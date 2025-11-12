import React, { useState } from "react";
import avatar from "../images/avatar.jpg";
import video_card from "../videos/video-card.mp4";
import { FONT_COINY } from "../utils/fonts";

function ProfileCard({
  name,
  role,
  avatarSrc,
  location,
  summary,
  skills,
  contact,
}) {
  // Thêm trạng thái để kiểm soát việc lật thẻ
  const [isFlipped, setIsFlipped] = useState(false);

  const [showClickText, setShowClickText] = useState(true);

  const handleFlip = () => {
    if (!isFlipped) {
      setIsFlipped(true);
      setShowClickText(false);
    } else {
      // Đóng thẻ: Lật ngược ngay lập tức (transition 1s)
      setIsFlipped(false);

      // Độ trễ 2000ms (2 giây) sau khi lật, mới hiện chữ "Click"
      setTimeout(() => {
        setShowClickText(true); // Hiển thị chữ Click
      }, 1000);
    }
  };

  const PRESERVE_3D_STYLE = {
    // Chuyển sang camelCase và áp dụng giá trị
    transformStyle: "preserve-3d",
  };

  const CARD_CONTAINER_STYLE = {
    // Giá trị 1000px là tiêu chuẩn, bạn có thể thử 800px hoặc 1200px
    perspective: "3000px",
    perspectiveOrigin: "50% 50%",
  };

  const BACKFACE_HIDDEN_STYLE = {
    backfaceVisibility: "hidden",
    transformOrigin: "center center",
  };

  // Định nghĩa lớp xoay động
  const flipClass = isFlipped ? "rotate-y-180" : "";

  // Class cho hiệu ứng xuất hiện mờ dần
  const infoClass = isFlipped
    ? "opacity-100 translate-y-0 delay-500"
    : "opacity-0 translate-y-4";

  const skillFadeClass = isFlipped
    ? "opacity-100 translate-y-0 delay-700"
    : "opacity-0 translate-y-4";

  const contactFadeClass = isFlipped
    ? "opacity-100 translate-y-0 delay-1000"
    : "opacity-0 translate-y-4";

  return (
    <div
      className="flex items-center justify-center container-main p-20"
      style={CARD_CONTAINER_STYLE}
    >
      <div
        className={`flex relative w-230 h-120 transition-transform duration-1000 ease-in-out ${flipClass} cursor-pointer`}
        onClick={handleFlip}
        style={PRESERVE_3D_STYLE}
      >
        <video
          src={video_card}
          className="flex absolute w-230 h-120 rounded-4xl shadow-2xl shadow-purple-400 object-cover"
          autoPlay
          loop
          muted
          style={BACKFACE_HIDDEN_STYLE}
        ></video>
        {showClickText && (
          <p
            className="absolute mt-100 ml-190 text-3xl text-purple-300 z-30 animate-pulse" // Thêm animate-pulse để nhấp nháy
            style={FONT_COINY}
          >
            Click Me
          </p>
        )}
        <div
          className="flex absolute backface-hidden p-10 w-230 h-120 rounded-4xl gap-6 shadow-2xl shadow-purple-400 rotate-y-180"
          style={BACKFACE_HIDDEN_STYLE}
        >
          <img
            className="animation-avatar w-120 h-95 mr-4 mt-2 border-2 rounded-b-full rounded-l-full object-cover"
            src="#"
            alt="avatar"
          />
          {/* 2. Phần Thông tin Người dùng (Bên phải) */}
          <div className="flex flex-col w-full p-2 gap-3" style={FONT_COINY}>
            <div className={`transition transform duration-500 ${infoClass}`}>
              <h3 className="logo-glow text-2xl uppercase" style={FONT_COINY}>
                {name}
              </h3>
              <p className="text-sm text-purple-200 mt-1">{role}</p>
              <p className="text-base font-medium mt-2">Location: {location}</p>
              <p className="text-base font-medium mt-2">MSSV: 23110073</p>
              <p className="text-base font-medium mt-2">{summary}</p>
            </div>
            {/* HIỂN THỊ SKILLS - DÙNG .MAP() */}
            <div
              className={`mt-4 pt-2 border-t border-purple-400 transition transform duration-500 ${skillFadeClass}`}
            >
              <h4 className="text-sm font-bold mb-2 text-purple-300">
                Skills:
              </h4>
              <div className="flex flex-wrap gap-2">
                {skills &&
                  skills.map((skill, index) => (
                    <span
                      key={index}
                      className="text-xs bg-purple-700/50 px-2 py-1 rounded-full whitespace-nowrap"
                    >
                      {skill}
                    </span>
                  ))}
              </div>
            </div>

            {/* HIỂN THỊ CONTACT - TRUY CẬP THUỘC TÍNH */}
            <div
              className={`mt-4 pt-2 border-t border-purple-400 transition transform duration-500 ${contactFadeClass}`}
            >
              <h4 className="text-sm font-bold mb-2 text-purple-300">
                Contact:
              </h4>
              <p className="text-xs truncate">
                Email:{" "}
                <a
                  href={`mailto:${contact.email}`}
                  className="text-purple-300 hover:text-purple-100"
                >
                  {contact.email}
                </a>
              </p>
              <p className="text-xs truncate">
                GitHub:{" "}
                <a
                  href={contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-300 hover:text-purple-100"
                >
                  Profile Link
                </a>
              </p>
              <p className="text-xs truncate">
                LinkedIn:{" "}
                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-300 hover:text-purple-100"
                >
                  Profile Link
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
