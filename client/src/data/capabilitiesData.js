// Centralized Technical Capabilities Data
// Verified against available sources (CV & Repository Codebase)

export const capabilitiesData = [
  {
    id: "backend-core",
    category: {
      vi: "Backend Core & Frameworks",
      en: "Backend Core & Frameworks"
    },
    description: {
      vi: "Nền tảng lập trình máy chủ với Java, hệ sinh thái Spring và thiết kế RESTful APIs",
      en: "Server-side engineering with Java, Spring ecosystem, and RESTful API design"
    },
    skills: [
      {
        name: "Java",
        details: {
          vi: "Java 17, Lập trình hướng đối tượng (OOP), Collections Framework",
          en: "Java 17, Object-Oriented Programming (OOP), Collections Framework"
        }
      },
      {
        name: "Spring Boot",
        details: {
          vi: "Spring Boot 3.2, Layered Architecture (Controller, Service, Repository)",
          en: "Spring Boot 3.2, Layered Architecture (Controller, Service, Repository)"
        }
      },
      {
        name: "RESTful APIs",
        details: {
          vi: "Thiết kế chuẩn REST, xử lý mã HTTP status, request/response DTOs",
          en: "REST design standards, HTTP status codes, request/response DTOs"
        }
      },
      {
        name: "Spring Data JPA & Hibernate",
        details: {
          vi: "Ánh xạ quan hệ thực thể (ORM), Repository pattern",
          en: "Object-Relational Mapping (ORM), Repository pattern"
        }
      },
      {
        name: "Spring Security & JWT",
        details: {
          vi: "Xác thực qua JWT, phân quyền quản trị theo vai trò (Role-Based Administration)",
          en: "JWT authentication, Role-Based Administration"
        }
      }
    ]
  },
  {
    id: "database-persistence",
    category: {
      vi: "Cơ sở dữ liệu & Data Persistence",
      en: "Database & Data Persistence"
    },
    description: {
      vi: "Thiết kế mô hình dữ liệu quan hệ, kết nối và truy vấn động",
      en: "Relational data modeling, connectivity, and dynamic querying"
    },
    skills: [
      {
        name: "PostgreSQL",
        details: {
          vi: "Cơ sở dữ liệu quan hệ chính, thiết kế schema 20+ thực thể, khóa ngoại",
          en: "Primary relational database, 20+ entity schema design, foreign keys"
        }
      },
      {
        name: "JPA Specifications",
        details: {
          vi: "Xây dựng bộ lọc động đa tiêu chí (Dynamic criteria queries)",
          en: "Dynamic multi-criteria product querying"
        }
      },
      {
        name: "HikariCP & Connection Pooling",
        details: {
          vi: "Cấu hình connection pool tương thích với PgBouncer transaction pooler",
          en: "Connection pool configuration compatible with PgBouncer transaction pooling"
        }
      },
      {
        name: "Application Caching (Caffeine)",
        details: {
          vi: "Spring Cache kết hợp Caffeine lưu đệm dữ liệu ứng dụng",
          en: "Application-level in-memory caching using Spring Cache + Caffeine"
        }
      }
    ]
  },
  {
    id: "quality-testing",
    category: {
      vi: "Chất lượng phần mềm & Kiểm thử",
      en: "Quality & Testing Mindset"
    },
    description: {
      vi: "Tư duy kiểm thử thực tế và thói quen phòng ngừa lỗi biên tầng backend",
      en: "Practical testing mindset and defensive error prevention in backend services"
    },
    skills: [
      {
        name: "Functional & Exploratory Testing",
        details: {
          vi: "Thực thi kiểm thử chức năng và thăm dò trên ứng dụng web/mobile (Test IO)",
          en: "Functional and exploratory testing on web/mobile apps (Test IO)"
        }
      },
      {
        name: "Defect Reproduction & Triage",
        details: {
          vi: "Cô lập điều kiện lỗi, lập báo cáo bug chi tiết, hỗ trợ fix bug",
          en: "Isolating defect triggers, detailed reproduction steps, bug reporting"
        }
      },
      {
        name: "Postman",
        details: {
          vi: "Công cụ hỗ trợ gửi request trong quá trình phát triển API",
          en: "API request and development tooling"
        }
      },
      {
        name: "Defensive Validation",
        details: {
          vi: "Kiểm soát chặt chẽ validation dữ liệu đầu vào và xử lý ngoại lệ",
          en: "Rigorous input data validation and exception handling"
        }
      }
    ]
  },
  {
    id: "tools-delivery",
    category: {
      vi: "Công cụ & Môi trường triển khai",
      en: "Tools & Deployment"
    },
    description: {
      vi: "Công cụ quản lý mã nguồn, đóng gói container và triển khai cloud",
      en: "Version control, container packaging, and cloud deployment tools"
    },
    skills: [
      {
        name: "Git & GitHub",
        details: {
          vi: "Quản lý mã nguồn và kiểm soát phiên bản với Git và GitHub",
          en: "Source code management and version control with Git and GitHub"
        }
      },
      {
        name: "Maven",
        details: {
          vi: "Quản lý thư viện phụ thuộc và build lifecycle ứng dụng Java",
          en: "Dependency management and Java application build lifecycle"
        }
      },
      {
        name: "Docker",
        details: {
          vi: "Đóng gói ứng dụng Java đa tầng (Multi-stage build, non-root user)",
          en: "Multi-stage container builds for Java, non-root runtime user"
        }
      },
      {
        name: "Cloud Deployment",
        details: {
          vi: "Triển khai backend trên Render và frontend trên Vercel",
          en: "Backend hosting on Render, frontend hosting on Vercel"
        }
      }
    ]
  },
  {
    id: "supporting-client",
    category: {
      vi: "Kỹ năng bổ trợ Client-Side",
      en: "Supporting Client-Side Capabilities"
    },
    description: {
      vi: "Công cụ hỗ trợ giao diện nhằm phục vụ tích hợp API và prototype nhanh",
      en: "Supporting frontend tools for API integration and rapid prototyping"
    },
    skills: [
      {
        name: "React 19 & Vite",
        details: {
          vi: "Xây dựng giao diện client kết nối và kiểm thử trực quan các REST APIs",
          en: "Client-side interface development to consume and verify REST APIs"
        }
      },
      {
        name: "Tailwind CSS",
        details: {
          vi: "Định kiểu giao diện nhanh, responsive và nhất quán",
          en: "Utility-first styling, responsive layout design"
        }
      },
      {
        name: "Java Web Fundamentals",
        details: {
          vi: "Làm chủ nền tảng gốc: Servlet, JSP, JSTL, Tomcat, DBCP",
          en: "Core foundational Java Web: Servlets, JSP, JSTL, Tomcat, DBCP"
        }
      },
      {
        name: "C++ & Python",
        details: {
          vi: "Nền tảng thuật toán, cấu trúc dữ liệu và giải quyết vấn đề",
          en: "Foundational algorithms, data structures, and problem solving"
        }
      }
    ]
  }
];

