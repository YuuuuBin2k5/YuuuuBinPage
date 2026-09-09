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
    ],

    // Centralized Technical Case Study Facts
    technicalDetails: {
      databaseScope: {
        entityCount: "20+",
        description: {
          en: "The platform uses a PostgreSQL relational model with 20+ entities, with entity relationships mapped through JPA/Hibernate.",
          vi: "Hệ thống sử dụng mô hình quan hệ PostgreSQL với hơn 20 thực thể, các mối quan hệ thực thể được ánh xạ qua JPA/Hibernate."
        }
      },
      apiDomains: [
        { name: "Product", desc: { en: "Product management", vi: "Quản lý sản phẩm" } },
        { name: "Category", desc: { en: "Category management", vi: "Quản lý danh mục" } },
        { name: "Inventory", desc: { en: "Inventory management", vi: "Quản lý tồn kho" } },
        { name: "Order", desc: { en: "Order management", vi: "Quản lý đơn hàng" } },
        { name: "Review", desc: { en: "Review management", vi: "Quản lý đánh giá" } }
      ],
      variantStructure: {
        parent: "Product",
        child: "Product Variant",
        attributes: ["SKU", "Size", "Color", "Stock"]
      },
      filtering: {
        en: "Implemented dynamic multi-criteria product filtering using Spring Data JPA Specifications. Filter conditions can be composed dynamically.",
        vi: "Hiện thực bộ lọc sản phẩm động đa tiêu chí sử dụng Spring Data JPA Specifications. Các điều kiện lọc có thể được kết hợp linh hoạt."
      },
      operations: [
        { en: "Automated Review Moderation", vi: "Tự động kiểm duyệt đánh giá" },
        { en: "Role-Based Administration", vi: "Phân quyền quản trị theo vai trò" }
      ],
      analytics: [
        { en: "Revenue tracking", vi: "Theo dõi doanh thu" },
        { en: "Bestseller product reporting", vi: "Báo cáo sản phẩm bán chạy" }
      ]
    }
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
          "Đóng gói Docker multi-stage (Maven build sang Temurin-17 JRE Alpine runtime), chạy non-root runtime user: spring và Actuator healthcheck.",
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
          "Packaged multi-stage Docker build (Maven build to Temurin-17 JRE Alpine runtime) with non-root runtime user: spring and Actuator healthcheck.",
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
    ],

    // Centralized Technical Case Study Facts
    technicalDetails: {
      backendArchitecture: {
        description: {
          en: "The platform operates a standalone Spring Boot 3.2 server structured into standard Controller, Service, and Repository layers. HikariCP connection pooling and Spring Data JPA provide persistence operations against PostgreSQL.",
          vi: "Hệ thống vận hành máy chủ Spring Boot 3.2 độc lập được tổ chức theo kiến trúc phân tầng chuẩn Controller, Service và Repository. HikariCP connection pool cùng Spring Data JPA đảm nhiệm các thao tác dữ liệu với PostgreSQL."
        }
      },
      databaseConnectivity: {
        description: {
          en: "PostgreSQL hosted on Supabase Cloud with JDBC configuration compatible with PgBouncer transaction pooling.",
          vi: "Cơ sở dữ liệu PostgreSQL được lưu trữ trên nền tảng đám mây Supabase với cấu hình JDBC tương thích cơ chế pooling giao dịch của PgBouncer."
        },
        technicalNote: {
          en: "Prepared-statement caching is disabled in JDBC configuration for transaction-pooler compatibility.",
          vi: "Bộ đệm prepared-statement được vô hiệu hóa trong cấu hình JDBC để đảm bảo tương thích hoàn toàn với transaction pooler."
        }
      },
      caching: {
        ttl: { en: "5 Minutes", vi: "5 Phút" },
        maxSize: "1,000",
        groups: ["projects", "weeks", "exercises"],
        description: {
          en: "Application-level in-memory caching using Spring Cache + Caffeine (5-minute expiration, 1,000 max size, cache groups: projects, weeks, exercises).",
          vi: "Bộ nhớ đệm in-memory tầng ứng dụng sử dụng Spring Cache + Caffeine (thời gian sống 5 phút, tối đa 1.000 mục, các nhóm cache: projects, weeks, exercises)."
        }
      },
      dockerPackaging: {
        summary: {
          en: "Multi-stage Docker build separates build and runtime stages.",
          vi: "Quy trình đóng gói Docker multi-stage phân tách môi trường build và runtime."
        },
        runtimeUser: "Non-root runtime user: spring",
        flow: [
          { step: "01", name: "Maven Build Stage", desc: { en: "Multi-stage Maven compilation and package step", vi: "Biên dịch và đóng gói Maven multi-stage" } },
          { step: "02", name: "Temurin 17 JRE", desc: { en: "Lightweight Eclipse Temurin Java 17 runtime", vi: "Runtime Eclipse Temurin Java 17 tinh gọn" } },
          { step: "03", name: "Alpine Runtime Image", desc: { en: "Alpine-based Java runtime image", vi: "Image runtime Java nền tảng Alpine" } },
          { step: "04", name: "Non-Root User", desc: { en: "Non-root runtime user: spring", vi: "Thực thi với người dùng non-root: spring" } },
          { step: "05", name: "Actuator Health Check", desc: { en: "Actuator Health Check", vi: "Kiểm tra trạng thái Actuator Health Check" } },
          { step: "06", name: "Render Deployment", desc: { en: "Backend deployed on Render", vi: "Backend triển khai trên Render" } }
        ]
      },
      hostingAndClient: {
        backend: {
          en: "Backend deployed on Render connected to Supabase PostgreSQL.",
          vi: "Backend triển khai trên Render kết nối PostgreSQL Supabase."
        },
        frontend: {
          en: "Frontend deployed on Vercel.",
          vi: "Frontend triển khai trên Vercel."
        },
        clientDetails: {
          en: "React 19, Vite, Tailwind CSS, EmailJS integration, and bilingual Vietnamese/English localization.",
          vi: "React 19, Vite, Tailwind CSS, tích hợp EmailJS và hỗ trợ đa ngôn ngữ Tiếng Việt/Tiếng Anh."
        }
      }
    }
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
