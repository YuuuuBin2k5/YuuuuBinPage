// Dữ liệu cứng cho phần Bài Tập - Không cần backend
// Thông tin: Đào Nguyễn Nhật Anh - MSSV: 23110073

export const weeksData = [
  {
    id: 1,
    title: "Chapter 3 - NetBeans & Tomcat",
    description: "Làm quen với NetBeans IDE và Apache Tomcat để chạy ứng dụng web Java. Tạo và chạy Web Application, cấu hình project sử dụng Tomcat server.",
    difficulty: "EASY",
    startDate: "2025-11-01",
    endDate: "2025-11-07",
    content: `🔹 Mục tiêu: Làm quen với NetBeans IDE và Apache Tomcat để chạy ứng dụng web Java.

📚 Nội dung chính:
• Tạo và chạy Web Application trong NetBeans
• Cấu hình project sử dụng Tomcat server
• Cấu trúc project web: HTML, JSP, Servlet (Java), WEB-INF, web.xml
• Chạy toàn bộ project hoặc riêng từng file JSP/Servlet
• Hiểu sự khác nhau giữa chạy file qua Tomcat và mở file trực tiếp bằng file system
• Làm quen với Projects window, Files window, Services window (deploy/undeploy app)

✅ Kết quả đạt được: Biết cách tạo – chạy – quản lý web app Java bằng NetBeans + Tomcat.`
  },
  {
    id: 2,
    title: "Chapter 4 - HTML & CSS",
    description: "Ôn lại và thực hành HTML + CSS trong bối cảnh web app Java. Form validation, CSS layout & styling.",
    difficulty: "EASY",
    startDate: "2025-11-08",
    endDate: "2025-11-14",
    content: `🔹 Mục tiêu: Ôn lại và thực hành HTML + CSS trong bối cảnh web app Java.

📚 Nội dung chính:
• Cấu trúc HTML form
• Validation phía client (required fields)
• CSS layout & styling
• Hiểu Form submit gửi request lên server, URL mapping
• Thực hành chỉnh sửa: Image, Input field, Radio button, Checkbox, Default value

✅ Kết quả đạt được: Hiểu rõ frontend (HTML/CSS) hoạt động thế nào trước khi kết nối với servlet.`
  },
  {
    id: 3,
    title: "Chapter 5 - Servlets",
    description: "Hiểu và làm chủ Servlet – trung tâm xử lý logic của web app Java. Servlet lifecycle, HTTP methods.",
    difficulty: "MEDIUM",
    startDate: "2025-11-15",
    endDate: "2025-11-21",
    content: `🔹 Mục tiêu: Hiểu và làm chủ Servlet – trung tâm xử lý logic của web app Java.

📚 Nội dung chính:
• Servlet lifecycle
• HTTP methods: doGet, doPost
• Mapping servlet: web.xml, @WebServlet
• Xử lý request & response
• Validation dữ liệu phía server
• Debug: In ra console, Ghi log file
• Hiểu lỗi: GET không hỗ trợ khi chưa có doGet

✅ Kết quả đạt được: Biết cách xây dựng servlet chuẩn, xử lý GET/POST và debug servlet.`
  },
  {
    id: 4,
    title: "Chapter 6 - JSP & JSTL",
    description: "Tách view (JSP) ra khỏi logic (Servlet) theo MVC. JSP include, Expression Language (EL), JSTL tags.",
    difficulty: "MEDIUM",
    startDate: "2025-11-15",
    endDate: "2025-11-21",
    content: `🔹 Mục tiêu: Tách view (JSP) ra khỏi logic (Servlet) theo MVC.

📚 Nội dung chính:
• JSP cơ bản
• JSP include: Runtime include, Compile-time include
• Expression Language (EL)
• JSTL: <c:if>, <c:out>
• Forward dữ liệu từ Servlet → JSP
• Không dùng scriptlet trực tiếp trong JSP (best practice)

✅ Kết quả đạt được: Viết JSP sạch – chuẩn – dễ bảo trì, dùng EL + JSTL thay vì Java code.`
  },
  {
    id: 5,
    title: "Chapter 7 - State Management",
    description: "Quản lý trạng thái người dùng trong web app: Cookie, Session, URL Rewriting.",
    difficulty: "MEDIUM",
    startDate: "2025-11-18",
    endDate: "2025-11-24",
    content: `🔹 Mục tiêu: Quản lý trạng thái người dùng trong web app.

📚 Nội dung chính:

1️⃣ Cookies:
• Lưu dữ liệu phía client
• Set thời gian sống (maxAge)
• Đọc cookie bằng EL (\${cookie.xxx.value})

2️⃣ Session:
• Lưu object phía server
• Dùng session cho dữ liệu tạm thời (Product, User)
• Session vẫn hoạt động khi cookie bị xóa

3️⃣ URL Rewriting:
• Truyền dữ liệu qua URL
• So sánh GET (hiện params) vs POST (không hiện params)
• Cho servlet hỗ trợ cả GET & POST

✅ Kết quả đạt được: Hiểu rõ 3 cách lưu trạng thái và biết khi nào nên dùng cách nào.`
  },
  {
    id: 6,
    title: "Chapter 8 & 9 - EL & JSTL",
    description: "Sử dụng Expression Language (EL) và JSTL để thay thế JSP tag & scriptlet cũ.",
    difficulty: "MEDIUM",
    startDate: "2025-11-25",
    endDate: "2025-11-28",
    content: `🔹 Chapter 8 – Expression Language (EL)
Mục tiêu: Sử dụng EL để thay thế JSP tag & scriptlet cũ, giúp JSP ngắn gọn – dễ đọc – an toàn hơn.

📚 Nội dung:
• Chuyển từ <jsp:getProperty ...> sang \${user.email}
• Dùng EL để hiển thị JavaBean, truy cập collection (ArrayList)
• Truy cập request/session/application scope, init-param
• Chỉ định rõ scope: \${sessionScope.user}, \${requestScope.currentDate}

🔹 Chapter 9 – JSTL (JSP Standard Tag Library)
Mục tiêu: Dùng JSTL để thay thế logic Java trong JSP.

📚 Nội dung:
• Core JSTL tags: <c:out> (chống XSS), <c:if> (điều kiện), <c:forEach> (vòng lặp)
• Duyệt ArrayList<Product> trong JSP
• Kết hợp JSTL + EL
• Escape dữ liệu output để chống XSS attack

✅ Kết quả: JSTL giúp JSP không còn scriptlet, an toàn hơn, dễ bảo trì.`
  },
  {
    id: 7,
    title: "Chapter 10 - Custom JSP Tags",
    description: "Tạo custom tag để tái sử dụng UI logic. Tag đơn, tag có logic, reiterating tag.",
    difficulty: "HARD",
    startDate: "2025-11-25",
    endDate: "2025-12-01",
    content: `🔹 Mục tiêu: Tạo custom tag để tái sử dụng UI logic.

📚 Nội dung chính:
• Tạo tag đơn: currentDate, currentTime
• Tạo tag có logic: ifEmptyMark
• Tạo reiterating tag: Lặp qua ArrayList<Product>, thay thế cả bảng HTML
• Cấu hình: Tag class, .tld file
• Điều chỉnh format (SHORT → LONG)

✅ Kết quả đạt được: Custom tag giúp JSP rất "sạch", logic hiển thị tái sử dụng, chuẩn enterprise.`
  },
  {
    id: 8,
    title: "Chapter 11 - SQL & MySQL",
    description: "Làm quen với MySQL + SQL script + Workbench. CREATE DATABASE, CREATE TABLE, INSERT, SELECT.",
    difficulty: "MEDIUM",
    startDate: "2025-11-25",
    endDate: "2025-12-01",
    content: `🔹 Mục tiêu: Làm quen với MySQL + SQL script + Workbench.

📚 Nội dung chính:
• SQL script: CREATE DATABASE, CREATE TABLE, INSERT, DROP DATABASE
• Làm việc với: murachmusic, murach_jpa
• SELECT / UPDATE dữ liệu
• Hiểu dữ liệu nền cho web app

✅ Kết quả đạt được: Hiểu database backend mà servlet/JPA sẽ thao tác.`
  },
  {
    id: 9,
    title: "Chapter 12 - JDBC & Connection Pooling",
    description: "Tối ưu truy cập database bằng connection pooling. JDBC thuần, Tomcat DBCP.",
    difficulty: "HARD",
    startDate: "2025-11-27",
    endDate: "2025-12-03",
    content: `🔹 Mục tiêu: Tối ưu truy cập database bằng connection pooling.

📚 Nội dung chính:
• JDBC thuần
• Tomcat DBCP: context.xml + <Resource>
• ConnectionPool class
• Đảm bảo: getConnection, freeConnection (finally block)
• Xây dựng User Admin app (JDBC): View users, Update user, Delete user
• Ràng buộc dữ liệu (FK constraint)

✅ Kết quả đạt được: Đây là chuẩn JDBC production, không dùng DriverManager trực tiếp.`
  },
  {
    id: 10,
    title: "Chapter 13 - JPA",
    description: "Dùng ORM (JPA) thay thế JDBC thủ công. Entity, @Entity, @Id, persistence.xml, EntityManager.",
    difficulty: "HARD",
    startDate: "2025-12-02",
    endDate: "2025-12-08",
    content: `🔹 Mục tiêu: Dùng ORM (JPA) thay thế JDBC thủ công.

📚 Nội dung chính:
• Entity: @Entity, @Id
• persistence.xml
• EntityManager
• Getter annotation vs Field annotation
• Tự động tạo bảng
• User Admin app dùng JPA: CRUD User, không viết SQL trực tiếp

✅ Kết quả đạt được: JPA giúp code gọn, ít lỗi, chuẩn Spring / Jakarta EE.`
  },
  {
    id: 11,
    title: "Chapter 14 - Send Email",
    description: "Gửi email từ servlet. JavaMail API, SMTP config (Gmail/Yahoo).",
    difficulty: "MEDIUM",
    startDate: "2025-12-04",
    endDate: "2025-12-10",
    content: `🔹 Mục tiêu: Gửi email từ servlet.

📚 Nội dung chính:
• JavaMail API
• SMTP config (Gmail / Yahoo)
• Helper class
• Gửi email khi user đăng ký
• Xử lý lỗi: JSP error message, Tomcat log

✅ Kết quả đạt được: Ứng dụng web thực tế luôn cần email cho Verify, Notify, Reset password.`
  }
];


export const exercisesData = [
  {
    id: 1,
    weekId: 2,
    title: "Bài tập số 2",
    description: "23110073 Đào Nguyễn Nhật Anh - Hoàn thành bài tập số 2 hosting",
    category: "HTML/CSS",
    demoUrl: "https://webbaitap2.onrender.com",
    githubUrl: "",
    completedDate: "2025-11-06",
    status: "COMPLETED",
    images: [
      { imageUrl: "/images/projects/Chuong2.png", caption: "Bài tập số 2" }
    ]
  },
  {
    id: 2,
    weekId: 2,
    title: "Bài tập Chương 4",
    description: "Đào Nguyễn Nhật Anh 23110073 - Hoàn thành bài tập chương 4",
    category: "HTML/CSS",
    demoUrl: "https://baitapbuoi3.onrender.com",
    githubUrl: "",
    completedDate: "2025-11-11",
    status: "COMPLETED",
    images: [
      { imageUrl: "/images/projects/Chuong4.png", caption: "Chương 4 - Trang 1" },
      { imageUrl: "/images/projects/Chuong4_1.png", caption: "Chương 4 - Trang 2" }
    ]
  },
  {
    id: 3,
    weekId: 4,
    title: "Bài tập Chương 6 (1)",
    description: "Đào Nguyễn Nhật Anh 23110073 - Hoàn thành bài tập chương 6",
    category: "JSP/JSTL",
    demoUrl: "https://tuan2-buoi2.onrender.com",
    githubUrl: "",
    completedDate: "2025-11-18",
    status: "COMPLETED",
    images: [
      { imageUrl: "/images/projects/Chuong6.png", caption: "Chương 6 - Demo 1" }
    ]
  },
  {
    id: 4,
    weekId: 4,
    title: "Bài tập Chương 6 (2)",
    description: "Đào Nguyễn Nhật Anh 23110073 - Hoàn thành bài tập chương 6",
    category: "JSP/JSTL",
    demoUrl: "https://tuan3-buoi1.onrender.com",
    githubUrl: "",
    completedDate: "2025-11-18",
    status: "COMPLETED",
    images: [
      { imageUrl: "/images/projects/Chuong6_1.png", caption: "Chương 6 - Demo 2" }
    ]
  },
  {
    id: 5,
    weekId: 5,
    title: "Bài tập Chương 7",
    description: "Đào Nguyễn Nhật Anh 23110073 - Hoàn thành bài tập chương 7",
    category: "Session/Cookie",
    demoUrl: "https://btchuong7-wjda.onrender.com",
    githubUrl: "",
    completedDate: "2025-11-20",
    status: "COMPLETED",
    images: [
      { imageUrl: "/images/projects/Chuong7.png", caption: "Chương 7 - Trang 1" },
      { imageUrl: "/images/projects/Chuong7_1.png", caption: "Chương 7 - Trang 2" }
    ]
  },
  {
    id: 6,
    weekId: 6,
    title: "Bài tập Chương 8 & 9 (1)",
    description: "Đào Nguyễn Nhật Anh 23110073 - Hoàn thành bài tập chương 8 và 9",
    category: "EL/JSTL",
    demoUrl: "https://ch-07-09.onrender.com",
    githubUrl: "",
    completedDate: "2025-11-25",
    status: "COMPLETED",
    images: [
      { imageUrl: "/images/projects/Chuong8.png", caption: "Chương 8 - Trang 1" },
      { imageUrl: "/images/projects/Chuong8_1.png", caption: "Chương 8 - Trang 2" },
      { imageUrl: "/images/projects/Chuong8_2.png", caption: "Chương 8 - Trang 3" },
      { imageUrl: "/images/projects/Chuong8_3.png", caption: "Chương 8 - Trang 4" },
      { imageUrl: "/images/projects/Chuong8_4.png", caption: "Chương 8 - Trang 5" }
    ]
  },
  {
    id: 7,
    weekId: 6,
    title: "Bài tập Chương 8 & 9 (2)",
    description: "Đào Nguyễn Nhật Anh 23110073 - Hoàn thành bài tập chương 8 và 9",
    category: "EL/JSTL",
    demoUrl: "https://ch-09.onrender.com",
    githubUrl: "",
    completedDate: "2025-11-25",
    status: "COMPLETED",
    images: [
      { imageUrl: "/images/projects/Chuong9.png", caption: "Chương 9 - Trang 1" },
      { imageUrl: "/images/projects/Chuong9_1.png", caption: "Chương 9 - Trang 2" }
    ]
  },
  {
    id: 8,
    weekId: 9,
    title: "Bài tập Chương 12",
    description: "Đào Nguyễn Nhật Anh 23110073 - Hoàn thành bài tập chương 12",
    category: "JDBC/Database",
    demoUrl: "https://ch-12-web.onrender.com",
    githubUrl: "",
    completedDate: "2025-11-27",
    status: "COMPLETED",
    images: [
      { imageUrl: "/images/projects/Chuong12.png", caption: "Chương 12 - Trang 1" },
      { imageUrl: "/images/projects/Chuong12_1.png", caption: "Chương 12 - Trang 2" },
      { imageUrl: "/images/projects/Chuong12_2.png", caption: "Chương 12 - Trang 3" },
      { imageUrl: "/images/projects/Chuong12_3.png", caption: "Chương 12 - Trang 4" },
      { imageUrl: "/images/projects/Chuong12_4.png", caption: "Chương 12 - Trang 5" },
      { imageUrl: "/images/projects/Chuong12_5.png", caption: "Chương 12 - Trang 6" }
    ]
  },
  {
    id: 9,
    weekId: 10,
    title: "Bài tập Chương 13",
    description: "23110073 - Đào Nguyễn Nhật Anh hoàn thành bài tập chương 13",
    category: "JPA/ORM",
    demoUrl: "https://ch-13-ex1-email.onrender.com",
    githubUrl: "",
    completedDate: "2025-12-02",
    status: "COMPLETED",
    images: [
      { imageUrl: "/images/projects/Chuong13.png", caption: "Chương 13 - Trang 1" },
      { imageUrl: "/images/projects/Chuong13_1.png", caption: "Chương 13 - Trang 2" },
      { imageUrl: "/images/projects/Chuong13_2.png", caption: "Chương 13 - Trang 3" },
      { imageUrl: "/images/projects/Chuong13_3.png", caption: "Chương 13 - Trang 4" }
    ]
  },
  {
    id: 10,
    weekId: 11,
    title: "Bài tập Chương 14",
    description: "Đào Nguyễn Nhật Anh 23110073 - Hoàn thành bài tập chương 14",
    category: "Email/JavaMail",
    demoUrl: "https://ch-14-email.onrender.com",
    githubUrl: "",
    completedDate: "2025-12-04",
    status: "COMPLETED",
    images: [
      { imageUrl: "/images/projects/Chuong14.png", caption: "Chương 14 - Trang 1" },
      { imageUrl: "/images/projects/Chuong14_1.png", caption: "Chương 14 - Trang 2" },
      { imageUrl: "/images/projects/Chuong14_2.png", caption: "Chương 14 - Trang 3" }
    ]
  }
];

// Export combined data
export const getAllBaiTapData = () => ({
  weeks: weeksData,
  exercises: exercisesData
});
