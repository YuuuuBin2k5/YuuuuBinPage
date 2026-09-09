// Centralized Engineering Lab Summary Data
// Verified against baitapData.js (Chapters 3 through 14 across 11 modules)

export const labSummaryData = {
  title: {
    vi: "Nền tảng Java Web Doanh Nghiệp (Engineering Lab)",
    en: "Enterprise Java Fundamentals (Engineering Lab)"
  },
  badge: {
    vi: "Nền tảng học thuật • HCMUTE",
    en: "Academic Foundations • HCMUTE"
  },
  totalModules: 11,
  chapterCoverage: "Chapters 3 – 14 (Murach's Java Servlets & JSP)",
  summary: {
    vi: "Chuỗi 11 module thực hành chuyên sâu về nền tảng Java Web trước kỷ nguyên Spring Boot: làm chủ chu trình sống của Servlet, quản lý Session/Cookie, kiến trúc MVC với JSP/JSTL, Tomcat DBCP connection pool, JPA thuần và JavaMail API.",
    en: "A series of 11 hands-on modules exploring core Java Web mechanics before Spring Boot: mastering Servlet lifecycle, Session/Cookie state, MVC with JSP/JSTL, Tomcat DBCP connection pooling, JPA/EntityManager, and JavaMail API."
  },
  strategicRationale: {
    vi: "Việc nắm vững các cơ chế tầng thấp (HTTP lifecycle, Servlets, connection pooling, Session/Cookie) mang lại hiểu biết nền tảng về cách Spring Boot trừu tượng hóa và quản lý hạ tầng bên dưới.",
    en: "Mastering foundational low-level mechanics (HTTP lifecycle, Servlets, connection pooling, Session/Cookie state) provides a foundational understanding of how Spring Boot abstractly manages underlying web infrastructure."
  },
  representativeTopics: [
    {
      id: "servlet",
      name: "Servlet Lifecycle",
      desc: {
        vi: "Chu trình sống Servlet & xử lý HTTP request",
        en: "Servlet lifecycle & HTTP request handling"
      }
    },
    {
      id: "mvc-jsp",
      name: "MVC with JSP & JSTL",
      desc: {
        vi: "Kiến trúc phân tầng View-Controller & thẻ JSTL",
        en: "Layered View-Controller separation & JSTL tags"
      }
    },
    {
      id: "state",
      name: "State Management",
      desc: {
        vi: "Quản lý Session, Cookies & URL Rewriting",
        en: "Session tracking, Cookies & URL Rewriting"
      }
    },
    {
      id: "jdbc",
      name: "JDBC & Connection Pooling",
      desc: {
        vi: "Tomcat DBCP pooler & tối ưu hóa kết nối DB",
        en: "Tomcat DBCP pooler & DB connection reuse"
      }
    },
    {
      id: "jpa",
      name: "JPA & EntityManager",
      desc: {
        vi: "Ánh xạ @Entity & thao tác CRUD persistence",
        en: "Entity mapping & persistence CRUD operations"
      }
    },
    {
      id: "tomcat",
      name: "Apache Tomcat",
      desc: {
        vi: "Cấu hình servlet container & web.xml",
        en: "Servlet container configuration & web.xml"
      }
    }
  ],
  modules: [
    {
      id: 1,
      chapter: "Chapter 3",
      title: {
        vi: "NetBeans IDE & Apache Tomcat",
        en: "NetBeans IDE & Apache Tomcat"
      },
      topic: {
        vi: "Cấu hình dự án Web Application và quản lý máy chủ Tomcat",
        en: "Web Application project configuration and Tomcat server management"
      }
    },
    {
      id: 2,
      chapter: "Chapter 4",
      title: {
        vi: "HTML & CSS Form Processing",
        en: "HTML & CSS Form Processing"
      },
      topic: {
        vi: "Cấu trúc form, validation phía client và ánh xạ request lên server",
        en: "Form structure, client-side validation, and server request mapping"
      }
    },
    {
      id: 3,
      chapter: "Chapter 5",
      title: {
        vi: "Servlets Deep-Dive",
        en: "Servlets Deep-Dive"
      },
      topic: {
        vi: "Chu trình sống Servlet, xử lý doGet/doPost, @WebServlet và web.xml",
        en: "Servlet lifecycle, doGet/doPost processing, @WebServlet, and web.xml"
      }
    },
    {
      id: 4,
      chapter: "Chapter 6",
      title: {
        vi: "MVC Architecture & JSP",
        en: "MVC Architecture & JSP"
      },
      topic: {
        vi: "Tách biệt View (JSP) và Controller (Servlet) theo kiến trúc MVC",
        en: "Separating View (JSP) and Controller (Servlet) using MVC pattern"
      }
    },
    {
      id: 5,
      chapter: "Chapter 7",
      title: {
        vi: "State Management",
        en: "State Management"
      },
      topic: {
        vi: "Quản lý trạng thái với Cookies, Session và URL Rewriting",
        en: "State management via Cookies, Session persistence, and URL Rewriting"
      }
    },
    {
      id: 6,
      chapter: "Chapters 8 & 9",
      title: {
        vi: "EL & Core JSTL",
        en: "EL & Core JSTL"
      },
      topic: {
        vi: "Expression Language (EL) và thẻ JSTL core (<c:if>, <c:out>, <c:forEach> chống XSS)",
        en: "Expression Language (EL) & JSTL tags (<c:if>, <c:out>, <c:forEach> with XSS protection)"
      }
    },
    {
      id: 7,
      chapter: "Chapter 10",
      title: {
        vi: "Custom JSP Tags",
        en: "Custom JSP Tags"
      },
      topic: {
        vi: "Tạo thẻ JSP tùy chỉnh (Tag handlers, file .tld) để tái sử dụng logic UI",
        en: "Creating custom JSP tags (.tld mapping) for reusable presentation logic"
      }
    },
    {
      id: 8,
      chapter: "Chapter 11",
      title: {
        vi: "SQL & Relational MySQL",
        en: "SQL & Relational MySQL"
      },
      topic: {
        vi: "Thiết kế cơ sở dữ liệu quan hệ, viết script DDL/DML",
        en: "Relational schema scripting and DDL/DML operations"
      }
    },
    {
      id: 9,
      chapter: "Chapter 12",
      title: {
        vi: "JDBC & Connection Pooling",
        en: "JDBC & Connection Pooling"
      },
      topic: {
        vi: "Tối ưu hóa kết nối DB với Tomcat DBCP và ConnectionPool pattern",
        en: "Optimizing database connections with Tomcat DBCP and ConnectionPool pattern"
      }
    },
    {
      id: 10,
      chapter: "Chapter 13",
      title: {
        vi: "JPA & ORM Fundamentals",
        en: "JPA & ORM Fundamentals"
      },
      topic: {
        vi: "Ánh xạ thực thể @Entity, persistence.xml và EntityManager CRUD",
        en: "Entity mapping with @Entity, persistence.xml, and EntityManager CRUD"
      }
    },
    {
      id: 11,
      chapter: "Chapter 14",
      title: {
        vi: "JavaMail API Integration",
        en: "JavaMail API Integration"
      },
      topic: {
        vi: "Cấu hình SMTP và gửi email tự động từ Java Servlet",
        en: "SMTP configuration and automated email dispatch from Java Servlets"
      }
    }
  ],
  labRoute: "/baitap"
};

