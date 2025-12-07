-- =============================================
-- CUSTOM DATA UPDATE - Java Web Course (Nov-Dec 2025)
-- =============================================
-- Cập nhật dữ liệu theo lộ trình học thực tế
-- Tương thích với database-setup-final.sql

-- =============================================
-- Bước 1: Xóa dữ liệu mẫu cũ
-- =============================================
TRUNCATE TABLE exercise_hints, exercises, week_topics, weeks, project_tech_stacks, projects, tech_stacks RESTART IDENTITY CASCADE;

-- =============================================
-- 1. TECH STACKS (Công nghệ Java Web thực tế)
-- =============================================
INSERT INTO tech_stacks (id, name, category, color) VALUES
(1, 'HTML5', 'Frontend', 'orange'),
(2, 'CSS3', 'Frontend', 'blue'),
(3, 'Java', 'Language', 'red'),
(4, 'JSP/Servlet', 'Backend', 'orange'),
(5, 'JDBC', 'Database', 'gray'),
(6, 'PostgreSQL', 'Database', 'blue'),
(7, 'MySQL', 'Database', 'orange'),
(8, 'JSTL', 'Backend', 'yellow'),
(9, 'Hibernate/JPA', 'Backend', 'green'),
(10, 'JavaMail', 'Library', 'purple'),
(11, 'Tomcat', 'DevOps', 'orange'),
(12, 'FTP/Hosting', 'DevOps', 'blue');

-- =============================================
-- 2. WEEKS (Lịch trình từ 06/11/2025)
-- =============================================
INSERT INTO weeks (id, title, description, start_date, end_date, difficulty, color) VALUES
(1, 'Tuần 1: Hosting & Deployment', 'Làm quen với Hosting, FTP và cấu trúc Web Server', '2025-11-06', '2025-11-10', 'EASY', 'blue'),
(2, 'Tuần 2: HTML5, CSS3 & JSP Cơ Bản', 'Học về giao diện Semantic, Forms và JavaServer Pages', '2025-11-11', '2025-11-18', 'EASY', 'green'),
(3, 'Tuần 3: Session, Cookies & JSTL', 'Quản lý phiên làm việc và sử dụng thư viện thẻ chuẩn JSTL', '2025-11-20', '2025-11-25', 'MEDIUM', 'amber'),
(4, 'Tuần 4: Database với JDBC', 'Kết nối và thao tác cơ sở dữ liệu an toàn với JDBC', '2025-11-26', '2025-12-01', 'MEDIUM', 'purple'),
(5, 'Tuần 5: Advanced Backend (JPA & Mail)', 'Nâng cao với ORM Framework (JPA) và chức năng gửi Email', '2025-12-02', '2025-12-05', 'HARD', 'red');

-- =============================================
-- 3. WEEK TOPICS
-- =============================================
INSERT INTO week_topics (week_id, topic) VALUES
-- Tuần 1
(1, 'ISP & Web Hosting Basics'),
(1, 'FTP Transfer (FileZilla/WinSCP)'),
(1, 'Server Directory (WEB-INF, classes, lib)'),
-- Tuần 2
(2, 'HTML5 Semantic Elements'),
(2, 'CSS3 External Stylesheets'),
(2, 'HTML Forms & Controls'),
(2, 'JavaBeans (POJO)'),
(2, 'Expression Language (EL)'),
(2, 'JSP Includes (Runtime vs Compile-time)'),
-- Tuần 3
(3, 'HTTP Stateless & Session Tracking'),
(3, 'Cookies (Persistent vs Per-session)'),
(3, 'URL Rewriting & Hidden Fields'),
(3, 'EL with Arrays/Lists/Maps'),
(3, 'JSTL Core Tags (c:out, c:forEach)'),
-- Tuần 4
(4, 'JDBC Driver & DriverManager'),
(4, 'Statement vs PreparedStatement'),
(4, 'ResultSet Processing'),
(4, 'Connection Pooling & Optimization'),
-- Tuần 5
(5, 'O/R Mapping Concepts'),
(5, 'JPA Entity & EntityManager'),
(5, 'SMTP/POP3/IMAP Protocols'),
(5, 'JavaMail Session & MimeMessage');

-- =============================================
-- 4. EXERCISES (Bài tập thực hành - FIXED)
-- =============================================
-- Thêm demo_url, github_url, image_url để tương thích với schema
INSERT INTO exercises (id, week_id, title, description, category, difficulty, estimated_time, instructions, demo_url, github_url, image_url) VALUES
-- Tuần 1
(1, 1, 'Deploy ứng dụng Web đầu tiên', 'Sử dụng FTP để đưa web lên môi trường thực tế', 'DevOps', 'EASY', 60,
'1. Cài đặt FileZilla hoặc WinSCP.
2. Kết nối tới server thông qua IP và tài khoản FTP được cấp.
3. Upload file .war hoặc thư mục web vào thư mục gốc.
4. Kiểm tra cấu trúc WEB-INF/classes và lib.', NULL, NULL, 'https://via.placeholder.com/400x300/3b82f6/ffffff?text=FTP+Deploy'),

-- Tuần 2
(2, 2, 'Xây dựng Form đăng ký với HTML5/CSS3', 'Tạo giao diện form chuẩn Semantic và CSS tách biệt', 'Frontend', 'EASY', 90,
'1. Sử dụng thẻ header, footer, section.
2. Tạo form với text box, checkbox, radio, combo box.
3. Link file CSS external để định dạng.
4. Đảm bảo form gửi dữ liệu đúng method (GET/POST).', NULL, NULL, 'https://via.placeholder.com/400x300/f97316/ffffff?text=HTML+Form'),

(3, 2, 'JSP Data Display với JavaBeans', 'Hiển thị thông tin từ Java Object ra màn hình', 'Backend', 'EASY', 120,
'1. Tạo class Java (Bean) có constructor rỗng và getter/setter.
2. Dùng JSP để khởi tạo Bean.
3. Sử dụng EL ${bean.property} để hiển thị dữ liệu.
4. Tách header/footer dùng jsp:include.', NULL, NULL, 'https://via.placeholder.com/400x300/10b981/ffffff?text=JSP+Beans'),

-- Tuần 3
(4, 3, 'Hệ thống Login & Remember Me', 'Xử lý đăng nhập dùng Session và Cookies', 'Backend', 'MEDIUM', 150,
'1. Tạo form login.
2. Lưu thông tin user vào Session khi đăng nhập thành công.
3. Tạo Cookie để nhớ user cho lần sau.
4. Xử lý Logout (hủy session và cookie).', NULL, NULL, 'https://via.placeholder.com/400x300/f59e0b/ffffff?text=Login+System'),

(5, 3, 'Quản lý danh sách sản phẩm với JSTL', 'Hiển thị danh sách phức tạp dùng vòng lặp JSTL', 'Backend', 'MEDIUM', 120,
'1. Import thư viện JSTL Core.
2. Dùng c:forEach để duyệt List<Product>.
3. Dùng c:if/c:choose để hiển thị trạng thái (còn hàng/hết hàng).
4. Dùng c:out để chống lỗi XSS.', NULL, NULL, 'https://via.placeholder.com/400x300/eab308/ffffff?text=JSTL+List'),

-- Tuần 4
(6, 4, 'CRUD Ứng dụng Quản lý Sinh viên', 'Thêm, sửa, xóa sinh viên trong MySQL dùng JDBC', 'Database', 'MEDIUM', 180,
'1. Tạo kết nối MySQL dùng DriverManager.
2. Viết câu lệnh INSERT/UPDATE dùng PreparedStatement.
3. Hiển thị danh sách dùng ResultSet.
4. Cấu hình Connection Pooling trong context.xml.', NULL, NULL, 'https://via.placeholder.com/400x300/a855f7/ffffff?text=JDBC+CRUD'),

-- Tuần 5
(7, 5, 'Quản lý User với JPA', 'Thay thế JDBC bằng JPA để thao tác dữ liệu', 'Backend', 'HARD', 200,
'1. Cấu hình persistence.xml.
2. Map class User với bảng Users dùng Annotation.
3. Dùng EntityManager để Persist (thêm) và Find (tìm).
4. Thực hiện transaction commit.', NULL, NULL, 'https://via.placeholder.com/400x300/10b981/ffffff?text=JPA+ORM'),

(8, 5, 'Chức năng Gửi Email Tự động', 'Gửi email chào mừng khi user đăng ký', 'Backend', 'HARD', 120,
'1. Cấu hình SMTP Host (ví dụ Gmail port 587).
2. Tạo Session với Authenticator.
3. Tạo nội dung mail (MimeMessage) có hỗ trợ HTML.
4. Gửi mail thông qua Transport.send().', NULL, NULL, 'https://via.placeholder.com/400x300/c026d3/ffffff?text=JavaMail');

-- =============================================
-- 5. EXERCISE HINTS
-- =============================================
INSERT INTO exercise_hints (exercise_id, hint) VALUES
-- Bài 1: Deploy
(1, 'Thư mục classes chứa Java compiled code, lib chứa file .jar'),
(1, 'Đảm bảo quyền ghi (permissions) trên server nếu upload lỗi'),
-- Bài 2: HTML/CSS
(2, 'Dùng <input type="email"> để browser tự validate email'),
(2, 'Luôn có thẻ <label> đi kèm với input để tốt cho accessibility'),
-- Bài 3: JSP/Bean
(3, 'JavaBean bắt buộc phải implement Serializable (khuyên dùng)'),
(3, 'Expression Language (EL) tự động xử lý null an toàn hơn code Java'),
-- Bài 4: Session/Cookie
(4, 'Cookie persistent cần setMaxAge(giây) > 0'),
(4, 'URL rewriting cần thiết nếu client tắt cookie trên trình duyệt'),
-- Bài 5: JSTL
(5, 'Luôn khai báo <%@ taglib prefix="c" ... %> ở đầu file JSP'),
(5, 'c:url giúp tự động thêm Context Path vào link'),
-- Bài 6: JDBC
(6, 'Luôn dùng PreparedStatement để chặn SQL Injection'),
(6, 'Nhớ đóng connection trong block finally hoặc try-with-resources'),
-- Bài 7: JPA
(7, 'Entity phải có @Id làm khóa chính'),
(7, 'persistence.xml phải nằm trong thư mục META-INF'),
-- Bài 8: Mail
(8, 'Gmail yêu cầu "App Password" nếu bật xác thực 2 bước'),
(8, 'Port 465 dùng cho SSL, Port 587 dùng cho TLS');

-- =============================================
-- 6. RESET SEQUENCES
-- =============================================
SELECT setval('tech_stacks_id_seq', (SELECT MAX(id) FROM tech_stacks));
SELECT setval('weeks_id_seq', (SELECT MAX(id) FROM weeks));
SELECT setval('exercises_id_seq', (SELECT MAX(id) FROM exercises));

-- =============================================
-- SUCCESS MESSAGE
-- =============================================
DO $$
BEGIN
    RAISE NOTICE '================================================';
    RAISE NOTICE 'Đã cập nhật dữ liệu Java Web Course (Nov-Dec 2025)!';
    RAISE NOTICE '================================================';
    RAISE NOTICE 'Tech Stacks: 12 records (Java, JSP, JDBC, JPA...)';
    RAISE NOTICE 'Weeks: 5 tuần học (06/11/2025 - 05/12/2025)';
    RAISE NOTICE 'Topics: 27 chủ đề chi tiết';
    RAISE NOTICE 'Exercises: 8 bài tập thực hành';
    RAISE NOTICE 'Hints: 16 gợi ý hữu ích';
    RAISE NOTICE '================================================';
END $$;
