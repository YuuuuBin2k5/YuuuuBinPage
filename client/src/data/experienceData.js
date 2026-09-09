// Centralized Work Experience Data
// Verified against available sources (CV & Professional Records)

export const experienceData = [
  {
    id: "test-io",
    company: "Test IO",
    role: {
      vi: "Freelance Software Tester",
      en: "Freelance Software Tester"
    },
    period: "06/2024 – Present",
    engagementType: {
      vi: "Kiểm thử phần mềm tự do (Remote International Crowdtesting)",
      en: "Freelance Software Testing (Remote International Crowdtesting)"
    },
    
    // Verified Execution Scope (from CV)
    verifiedResponsibilities: {
      vi: [
        "Thực thi kiểm thử chức năng (functional testing) và kiểm thử thăm dò (exploratory testing) trên các ứng dụng web và di động.",
        "Xác định, tái hiện và lập tài liệu báo cáo lỗi phần mềm chi tiết (detailed bug reports).",
        "Phối hợp làm việc với các đội ngũ kiểm thử quốc tế trong các chu kỳ kiểm thử có cấu trúc.",
        "Thực hiện kiểm thử chéo thiết bị trên các thiết bị Android và các trình duyệt web."
      ],
      en: [
        "Executed functional and exploratory testing on web and mobile applications.",
        "Identified, reproduced, and documented software defects with detailed bug reports.",
        "Collaborated with international testing teams and followed structured testing cycles.",
        "Performed cross-device testing across Android devices and web browsers."
      ]
    },

    // Transferable Mindset for Backend Engineering (Framed strictly as engineering philosophy)
    transferableBackendValue: {
      vi: [
        "Tư duy kiểm thử biên (Defensive Mindset): Kinh nghiệm bóc tách và tái hiện lỗi giúp xây dựng thói quen bẫy lỗi cẩn trọng, kiểm soát chặt chẽ validation đầu vào và xử lý ngoại lệ ở tầng backend.",
        "Tài liệu hóa và tái hiện lỗi: Kỹ năng mô tả chính xác các bước tái hiện (Steps to Reproduce) giúp tăng tốc độ chẩn đoán, cô lập lỗi và phối hợp kỹ thuật.",
        "Nhận thức môi trường client: Kiểm thử trên thiết bị Android và trình duyệt web mang lại góc nhìn thực tế về sự sai khác môi trường hiển thị, củng cố thói quen kiểm soát dữ liệu đầu vào và bẫy lỗi cẩn trọng khi phát triển hệ thống."
      ],
      en: [
        "Defensive Engineering Mindset: Experience reproducing defect conditions reinforces disciplined input validation, defensive null-handling, and edge-case anticipation in backend services.",
        "Structured Defect Triage: Practice drafting reproducible bug documentation aids precise root-cause analysis and cross-functional technical collaboration.",
        "Client Environment Awareness: Testing across Android devices and web browsers provides practical awareness of how different client environments can expose inconsistent application behavior, reinforcing defensive validation and error-handling habits during development."
      ]
    }
  }
];

