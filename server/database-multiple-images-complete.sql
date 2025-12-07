-- =====================================================
-- 1. TẠO BẢNG EXERCISE_IMAGES (PostgreSQL Version)
-- =====================================================
CREATE TABLE IF NOT EXISTS exercise_images (
    id BIGSERIAL PRIMARY KEY,
    exercise_id BIGINT NOT NULL,
    image_url TEXT NOT NULL,
    display_order INT DEFAULT 0,
    caption VARCHAR(255) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Tạo khóa ngoại liên kết với bảng exercises
    CONSTRAINT fk_exercise_images_exercise 
        FOREIGN KEY (exercise_id) 
        REFERENCES exercises (id) 
        ON DELETE CASCADE 
        ON UPDATE CASCADE
);

-- Tạo Index để truy vấn nhanh hơn
CREATE INDEX IF NOT EXISTS idx_exercise_images_exercise_id ON exercise_images(exercise_id);
CREATE INDEX IF NOT EXISTS idx_exercise_images_order ON exercise_images(exercise_id, display_order);

-- =====================================================
-- 2. TẠO BẢNG PROJECT_IMAGES (PostgreSQL Version)
-- =====================================================
CREATE TABLE IF NOT EXISTS project_images (
    id BIGSERIAL PRIMARY KEY,
    project_id BIGINT NOT NULL,
    image_url TEXT NOT NULL,
    display_order INT DEFAULT 0,
    caption VARCHAR(255) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Tạo khóa ngoại liên kết với bảng projects
    CONSTRAINT fk_project_images_project 
        FOREIGN KEY (project_id) 
        REFERENCES projects (id) 
        ON DELETE CASCADE 
        ON UPDATE CASCADE
);

-- Tạo Index
CREATE INDEX IF NOT EXISTS idx_project_images_project_id ON project_images(project_id);
CREATE INDEX IF NOT EXISTS idx_project_images_order ON project_images(project_id, display_order);

-- =====================================================
-- 3. DI TRUYỂN DỮ LIỆU CŨ (MIGRATION)
-- =====================================================
-- Chuyển dữ liệu từ cột image_url cũ (nếu có) sang bảng mới
-- Lưu ý: Chỉ chạy nếu bảng exercises cũ của bạn đã có cột image_url và có dữ liệu
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'exercises' AND column_name = 'image_url') THEN
        INSERT INTO exercise_images (exercise_id, image_url, display_order)
        SELECT id, image_url, 0
        FROM exercises
        WHERE image_url IS NOT NULL AND image_url != ''
        ON CONFLICT DO NOTHING; -- Tránh lỗi nếu chạy nhiều lần
    END IF;
END $$;

-- =====================================================
-- 4. THÊM DỮ LIỆU MẪU (SAMPLE DATA)
-- =====================================================
-- Xóa dữ liệu mẫu cũ trong bảng ảnh để tránh trùng lặp khi chạy lại
TRUNCATE TABLE exercise_images RESTART IDENTITY;

-- Thêm nhiều ảnh cho từng bài tập (Mô phỏng: 1 ảnh giao diện, 1 ảnh code, 1 ảnh kết quả)
INSERT INTO exercise_images (exercise_id, image_url, display_order, caption) VALUES
-- Bài 1: Hosting (ID 1)
(1, 'https://placehold.co/600x400/png?text=Bai1_FileZilla_Setup', 0, 'Cấu hình FileZilla'),
(1, 'https://placehold.co/600x400/png?text=Bai1_Server_Folder', 1, 'Cấu trúc thư mục trên Server'),
(1, 'https://placehold.co/600x400/png?text=Bai1_Deploy_Success', 2, 'Kết quả Deploy thành công'),

-- Bài 2: HTML5 Form (ID 2)
(2, 'https://placehold.co/600x400/png?text=Bai2_Form_UI', 0, 'Giao diện Form đăng ký'),
(2, 'https://placehold.co/600x400/png?text=Bai2_HTML_Structure', 1, 'Cấu trúc Semantic HTML'),
(2, 'https://placehold.co/600x400/png?text=Bai2_CSS_Validation', 2, 'Validation form với CSS'),

-- Bài 3: JSP Bean (ID 3)
(3, 'https://placehold.co/600x400/png?text=Bai3_JavaBean_Class', 0, 'Code lớp Student.java'),
(3, 'https://placehold.co/600x400/png?text=Bai3_JSP_Display', 1, 'Hiển thị dữ liệu bằng EL'),

-- Bài 4: Login Session (ID 4)
(4, 'https://placehold.co/600x400/png?text=Bai4_Login_Screen', 0, 'Màn hình đăng nhập'),
(4, 'https://placehold.co/600x400/png?text=Bai4_Session_Code', 1, 'Xử lý Session trong Servlet'),
(4, 'https://placehold.co/600x400/png?text=Bai4_Cookie_Browser', 2, 'Cookie được lưu trên trình duyệt'),

-- Bài 5: JSTL List (ID 5)
(5, 'https://placehold.co/600x400/png?text=Bai5_Product_List', 0, 'Danh sách sản phẩm'),
(5, 'https://placehold.co/600x400/png?text=Bai5_JSTL_ForEach', 1, 'Vòng lặp c:forEach'),

-- Bài 6: JDBC Student (ID 6)
(6, 'https://placehold.co/600x400/png?text=Bai6_Database_Table', 0, 'Bảng MySQL Students'),
(6, 'https://placehold.co/600x400/png?text=Bai6_JDBC_Connection', 1, 'Kết nối Database thành công'),
(6, 'https://placehold.co/600x400/png?text=Bai6_CRUD_Demo', 2, 'Demo chức năng Thêm/Xóa'),

-- Bài 7: JPA User (ID 7)
(7, 'https://placehold.co/600x400/png?text=Bai7_Persistence_XML', 0, 'Cấu hình persistence.xml'),
(7, 'https://placehold.co/600x400/png?text=Bai7_Entity_Mapping', 1, 'Mapping User Entity'),

-- Bài 8: JavaMail (ID 8)
(8, 'https://placehold.co/600x400/png?text=Bai8_Email_Form', 0, 'Form soạn thảo Email'),
(8, 'https://placehold.co/600x400/png?text=Bai8_Inbox_Result', 1, 'Email nhận được trong Inbox'),
(8, 'https://placehold.co/600x400/png?text=Bai8_Console_Log', 2, 'Log gửi mail thành công');

-- =====================================================
-- 5. KIỂM TRA DỮ LIỆU
-- =====================================================
DO $$
BEGIN
    RAISE NOTICE 'Đã tạo bảng images và thêm dữ liệu mẫu thành công!';
END $$;

-- Truy vấn thử để xem kết quả (Bạn chạy dòng này riêng để xem)
-- SELECT e.title, ei.caption, ei.image_url 
-- FROM exercises e 
-- JOIN exercise_images ei ON e.id = ei.exercise_id 
-- ORDER BY e.id, ei.display_order;