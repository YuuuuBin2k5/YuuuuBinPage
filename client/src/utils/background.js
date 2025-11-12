export const BG_CUSTOM_RADIAL = {
  backgroundImage: `radial-gradient(125% 125% at 50% 10%, #000000 40%, #2b092b 100%)`,
  color: "white",
};

export const BG_MIDNIGHT_MIST = {
  backgroundImage: `
        radial-gradient(circle at 50% 100%, rgba(70, 85, 110, 0.5) 0%, transparent 60%),
        radial-gradient(circle at 50% 100%, rgba(99, 102, 241, 0.4) 0%, transparent 70%),
        radial-gradient(circle at 50% 100%, rgba(181, 184, 208, 0.3) 0%, transparent 80%)
    `,
  backgroundColor: "#111827",
  color: "white",
};

// --- Định nghĩa Style Nền và Màu Chữ (Light Mode) ---
export const BG_TOP_GRADIENT_RADIAL = {
  backgroundImage: `radial-gradient(125% 125% at 50% 10%, #fff 40%, #6366f1 100%)`,
  color: "#4B0082",
};

// --- Định nghĩa Transition Toàn Cục ---
export const GLOBAL_TRANSITION = {
  transition:
    "background-color 1s ease-in-out, background-image 1s ease-in-out, color 1s ease-in-out",
};
