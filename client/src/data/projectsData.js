// Centralized Verified Projects Data
// Verified against available sources (CV, GitHub repository, and server codebase)

export const projectsData = [
  {
    id: 1,
    slug: "clothy-ecommerce",
    title: "Clothy — E-Commerce Fashion Platform",
    name: "Clothy",
    description: "Hệ thống backend RESTful APIs cho nền tảng thương mại điện tử thời trang với cơ sở dữ liệu hơn 20 thực thể PostgreSQL và bộ lọc sản phẩm động JPA Specifications.",
    category: "Backend API",
    status: "Completed",
    featured: true,
    startDate: "2026-05-01",
    endDate: "2026-07-01",
    period: "05/2026 – 07/2026",
    role: "Backend Developer",
    githubUrl: "https://github.com/chishiya2309/Clothing-Store-Backend",
    demoUrl: "https://www.youtube.com/watch?v=5Jsi5iqmjHQ",
    coverImage: "/images/projects/clothy-preview.png",
    imageUrl: "/images/projects/clothy-preview.png",
    images: [],
    
    // Native bilingual content
    i18n: {
      vi: {
        title: "Clothy — E-Commerce Fashion Platform",
        subtitle: "Hệ thống backend thương mại điện tử thời trang với 20+ thực thể PostgreSQL và bộ lọc động JPA Specifications",
        role: "Backend Developer",
        category: "Backend System",
        summary: "Hệ thống backend thương mại điện tử chuyên ngành thời trang được xây dựng bằng Spring Boot và PostgreSQL, quản lý hơn 20 thực thể, bộ lọc sản phẩm động và module quản lý biến thể hàng hóa.",
        responsibilities: [
          "Thiết kế và triển khai cơ sở dữ liệu PostgreSQL với hơn 20 thực thể (20+ entities), mô hình hóa quan hệ thực thể bằng Spring Data JPA / Hibernate.",
          "Phát triển hệ thống RESTful APIs cho các phân hệ: Product, Category, Inventory, Order, Review.",
          "Xây dựng tính năng quản lý biến thể sản phẩm theo SKU, size, color, stock.",
          "Triển khai tính năng lọc sản phẩm động đa tiêu chí sử dụng JPA Specifications (Dynamic multi-criteria product filtering using JPA Specifications).",
          "Hiện thực cơ chế tự động kiểm duyệt đánh giá và các tính năng quản trị phân quyền (Role-Based Administration).",
          "Phát triển các module phân tích và báo cáo doanh thu và sản phẩm bán chạy."
        ]
      },
      en: {
        title: "Clothy — E-Commerce Fashion Platform",
        subtitle: "Fashion e-commerce platform backend with 20+ PostgreSQL entities & dynamic JPA filtering",
        role: "Backend Developer",
        category: "Backend System",
        summary: "Fashion e-commerce backend system built with Spring Boot and PostgreSQL, featuring a 20+ entity relational database, dynamic product filtering, and variant management.",
        responsibilities: [
          "Designed and implemented a PostgreSQL database with 20+ entities, modeling relationships using Spring Data JPA / Hibernate.",
          "Developed RESTful APIs for Product, Category, Inventory, Order, and Review management.",
          "Built product variant management tracking SKU, size, color, and stock.",
          "Implemented dynamic multi-criteria product filtering using JPA Specifications.",
          "Implemented automated review moderation and role-based administration features.",
          "Developed analytics and reporting modules for revenue tracking and bestseller products."
        ]
      }
    },

    // Verified tech stack
    techStack: {
      backend: ["Java", "Spring Boot", "Spring Data JPA", "Hibernate"],
      database: ["PostgreSQL (20+ Entities)"],
      apis: ["Product", "Category", "Inventory", "Order", "Review"]
    },

    keyMetrics: [
      {
        label: { vi: "Quy mô cơ sở dữ liệu", en: "Database Scale" },
        value: "20+ Entities"
      },
      {
        label: { vi: "Công nghệ truy vấn động", en: "Dynamic Querying" },
        value: "JPA Specifications"
      },
      {
        label: { vi: "Mô hình biến thể", en: "Variant Attributes" },
        value: "SKU, Size, Color, Stock"
      },
      {
        label: { vi: "Phạm vi REST APIs", en: "REST API Domains" },
        value: "Product, Category, Inventory, Order, Review"
      }
    ]
  },
  {
    id: 2,
    slug: "portfolio-platform",
    title: "Personal Portfolio Platform",
    name: "Personal Portfolio Platform",
    description: "Nền tảng hồ sơ kỹ thuật với backend Spring Boot 3.2 độc lập, bộ nhớ đệm Caffeine qua Spring Cache và cơ sở dữ liệu PostgreSQL trên Supabase.",
    category: "Web App",
    status: "Completed",
    featured: true,
    startDate: "2025-01-01",
    endDate: "2026-03-01",
    period: "2025 – 2026",
    role: "Full-Stack Developer (Backend-Focused)",
    githubUrl: "https://github.com/YuuuuBin2k5/YuuuuBinPage",
    demoUrl: "https://yuuuu-bin-page-t5hp.vercel.app",
    coverImage: "/images/projects/portfolio-preview.png",
    imageUrl: "/images/projects/portfolio-preview.png",
    images: [],

    i18n: {
      vi: {
        title: "Personal Portfolio Platform",
        subtitle: "Nền tảng hồ sơ kỹ thuật với Spring Boot 3.2, Caffeine Cache và PostgreSQL trên Supabase",
        role: "Full-Stack Developer (Backend-Focused)",
        category: "Full-Stack System (Backend-Focused)",
        summary: "Nền tảng hồ sơ kỹ thuật cá nhân với backend Spring Boot 3.2 độc lập, ứng dụng bộ nhớ đệm Caffeine qua Spring Cache và cơ sở dữ liệu đám mây PostgreSQL.",
        responsibilities: [
          "Xây dựng backend RESTful APIs bằng Spring Boot 3.2.0 và Spring Data JPA kết nối PostgreSQL trên Supabase.",
          "Cấu hình Application-level in-memory caching using Spring Cache + Caffeine (thời gian sống 5 phút, tối đa 1000 items).",
          "Cấu hình JDBC vô hiệu hóa bộ đệm prepared statement nhằm tương thích với cơ chế PgBouncer transaction pooling trên Supabase cùng HikariCP.",
          "Đóng gói Docker multi-stage (Maven build sang Temurin-17 JRE Alpine runtime), chạy non-root user và Actuator healthcheck.",
          "Triển khai backend trên Render và frontend trên Vercel; hỗ trợ đa ngôn ngữ VI/EN và EmailJS."
        ]
      },
      en: {
        title: "Personal Portfolio Platform",
        subtitle: "Technical portfolio engine powered by Spring Boot 3.2, Caffeine Cache & PostgreSQL on Supabase",
        role: "Full-Stack Developer (Backend-Focused)",
        category: "Full-Stack System (Backend-Focused)",
        summary: "Personal portfolio platform with standalone Spring Boot 3.2 backend, application-level in-memory caching via Spring Cache + Caffeine, and PostgreSQL on Supabase.",
        responsibilities: [
          "Developed backend RESTful APIs using Spring Boot 3.2.0 and Spring Data JPA with PostgreSQL on Supabase.",
          "Configured application-level in-memory caching using Spring Cache + Caffeine (5-minute cache expiration, 1000 max size).",
          "Configured JDBC settings to disable prepared-statement caching for compatibility with Supabase PgBouncer transaction pooling with HikariCP.",
          "Packaged multi-stage Docker build (Maven build to Temurin-17 JRE Alpine runtime) with non-root user and Actuator healthcheck.",
          "Deployed backend on Render and frontend on Vercel; integrated VI/EN i18n and EmailJS."
        ]
      }
    },

    techStack: {
      backend: ["Java 17", "Spring Boot 3.2.0", "Spring Data JPA", "HikariCP", "Spring Cache", "Caffeine"],
      database: ["PostgreSQL (Supabase Cloud Pooler)"],
      devops: ["Docker Multi-stage", "Render", "Vercel", "Maven"],
      frontend: ["React 19", "Vite", "Tailwind CSS", "EmailJS"]
    },

    keyMetrics: [
      {
        label: { vi: "Bộ nhớ đệm", en: "In-Memory Cache" },
        value: "Spring Cache + Caffeine"
      },
      {
        label: { vi: "Cơ sở dữ liệu", en: "Database Host" },
        value: "PostgreSQL on Supabase"
      },
      {
        label: { vi: "Đóng gói container", en: "Container Build" },
        value: "Docker Multi-stage"
      },
      {
        label: { vi: "Triển khai", en: "Deployment" },
        value: "Render & Vercel"
      }
    ]
  }
];

// Preserved for backward compatibility with techStackService.js
export const techStacksData = [
  {
    id: 1,
    name: "React",
    category: "Frontend",
    icon: "react",
    proficiency: 85,
    color: "#61DAFB"
  },
  {
    id: 2,
    name: "Java",
    category: "Backend",
    icon: "java",
    proficiency: 80,
    color: "#007396"
  },
  {
    id: 3,
    name: "JavaScript",
    category: "Language",
    icon: "javascript",
    proficiency: 85,
    color: "#F7DF1E"
  },
  {
    id: 4,
    name: "TailwindCSS",
    category: "Frontend",
    icon: "tailwind",
    proficiency: 90,
    color: "#06B6D4"
  },
  {
    id: 5,
    name: "MySQL",
    category: "Database",
    icon: "mysql",
    proficiency: 75,
    color: "#4479A1"
  },
  {
    id: 6,
    name: "Spring Boot",
    category: "Backend",
    icon: "spring",
    proficiency: 70,
    color: "#6DB33F"
  },
  {
    id: 7,
    name: "Git",
    category: "Tools",
    icon: "git",
    proficiency: 80,
    color: "#F05032"
  },
  {
    id: 8,
    name: "HTML/CSS",
    category: "Frontend",
    icon: "html",
    proficiency: 90,
    color: "#E34F26"
  }
];
