-- SQL Script để thêm 3 dự án VÀ IMAGES vào PostgreSQL
-- Chạy script này nếu bạn muốn thêm cả ảnh cho dự án

-- Bước 1: Insert Projects và lấy ID
-- (Chạy từng câu lệnh một và note lại ID)

-- 1. Quản Lý Phòng GYM
INSERT INTO projects (
    title,
    description,
    category,
    status,
    demo_url,
    github_url,
    start_date,
    end_date,
    tech_stack,
    created_at,
    updated_at
) VALUES (
    'Quản Lý Phòng GYM',
    'Ứng dụng desktop quản lý phòng gym với đầy đủ chức năng quản lý hội viên, gói tập, lịch tập và thanh toán. Thiết kế giao diện chuyên nghiệp với WinForms/WPF, xây dựng CRUD hoàn chỉnh cho hội viên, nhân viên, dịch vụ, và tích hợp SQL Server để quản lý dữ liệu hiệu quả.',
    'Desktop App',
    'Completed',
    NULL,
    'https://github.com/YuuuuBin2k5/QuanLyPhongGYM',
    '2024-01-01',
    '2024-03-31',
    'C#, WinForms, WPF, SQL Server, .NET Framework',
    NOW(),
    NOW()
) RETURNING id;
-- Note: Giả sử ID = 101

-- 2. Todolist Web App
INSERT INTO projects (
    title,
    description,
    category,
    status,
    demo_url,
    github_url,
    start_date,
    end_date,
    tech_stack,
    created_at,
    updated_at
) VALUES (
    'Todolist Web App',
    'Ứng dụng web quản lý công việc với giao diện thân thiện, hỗ trợ CRUD và đánh dấu hoàn thành. Xây dựng backend với Flask/Django và REST API, thiết kế giao diện responsive với HTML/CSS/Bootstrap, và triển khai database với SQLite/MySQL.',
    'Web App',
    'Completed',
    NULL,
    'https://github.com/YuuuuBin2k5/Todolist',
    '2024-04-01',
    '2024-05-31',
    'Python, Flask, Django, SQLite, MySQL, HTML, CSS, Bootstrap',
    NOW(),
    NOW()
) RETURNING id;
-- Note: Giả sử ID = 102

-- 3. Trí Tuệ Nhân Tạo - UTE
INSERT INTO projects (
    title,
    description,
    category,
    status,
    demo_url,
    github_url,
    start_date,
    end_date,
    tech_stack,
    created_at,
    updated_at
) VALUES (
    'Trí Tuệ Nhân Tạo - UTE',
    'Dự án học tập AI/ML với các thuật toán Machine Learning cơ bản và nâng cao. Triển khai các bài toán phân loại, hồi quy, clustering, áp dụng TensorFlow/Keras để huấn luyện mô hình, và trực quan hóa dữ liệu với Matplotlib/Seaborn.',
    'AI/ML',
    'Completed',
    NULL,
    'https://github.com/YuuuuBin2k5/TriTueNhanTao_UTE',
    '2024-06-01',
    '2024-08-31',
    'Python, Scikit-learn, TensorFlow, Keras, Pandas, Matplotlib, Seaborn, NumPy',
    NOW(),
    NOW()
) RETURNING id;
-- Note: Giả sử ID = 103


-- Bước 2: Insert Images (Thay PROJECT_ID bằng ID thực tế từ bước 1)
-- Nếu bạn có ảnh, upload lên và thay URL

-- Images cho Quản Lý Phòng GYM (project_id = 101)
INSERT INTO project_images (project_id, image_url, display_order, created_at)
VALUES 
    (101, 'https://via.placeholder.com/800x600/4A5568/FFFFFF?text=GYM+Management+1', 1, NOW()),
    (101, 'https://via.placeholder.com/800x600/4A5568/FFFFFF?text=GYM+Management+2', 2, NOW());

-- Images cho Todolist (project_id = 102)
INSERT INTO project_images (project_id, image_url, display_order, created_at)
VALUES 
    (102, 'https://via.placeholder.com/800x600/3B82F6/FFFFFF?text=Todolist+1', 1, NOW()),
    (102, 'https://via.placeholder.com/800x600/3B82F6/FFFFFF?text=Todolist+2', 2, NOW());

-- Images cho AI/ML (project_id = 103)
INSERT INTO project_images (project_id, image_url, display_order, created_at)
VALUES 
    (103, 'https://via.placeholder.com/800x600/10B981/FFFFFF?text=AI+ML+1', 1, NOW()),
    (103, 'https://via.placeholder.com/800x600/10B981/FFFFFF?text=AI+ML+2', 2, NOW());


-- Kiểm tra kết quả
SELECT 
    p.id,
    p.title,
    p.category,
    p.status,
    COUNT(pi.id) as image_count
FROM projects p
LEFT JOIN project_images pi ON p.id = pi.project_id
WHERE p.title IN ('Quản Lý Phòng GYM', 'Todolist Web App', 'Trí Tuệ Nhân Tạo - UTE')
GROUP BY p.id, p.title, p.category, p.status
ORDER BY p.created_at DESC;
