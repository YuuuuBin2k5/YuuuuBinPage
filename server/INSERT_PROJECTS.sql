-- SQL Script để thêm 3 dự án vào database PostgreSQL
-- Chạy script này trong pgAdmin hoặc psql

-- SQL Script để thêm 3 dự án vào PostgreSQL
-- Schema: title, description, short_description, category, status, demo_url, github_url, start_date, end_date

-- 1. Quản Lý Phòng GYM
INSERT INTO projects (
    name,
    title,
    description,
    short_description,
    category,
    status,
    demo_url,
    github_url,
    start_date,
    end_date,
    featured
) VALUES (
    'quan-ly-phong-gym',
    'Quản Lý Phòng GYM',
    'Ứng dụng desktop quản lý phòng gym với đầy đủ chức năng quản lý hội viên, gói tập, lịch tập và thanh toán. Thiết kế giao diện chuyên nghiệp với WinForms/WPF, xây dựng CRUD hoàn chỉnh cho hội viên, nhân viên, dịch vụ, và tích hợp SQL Server để quản lý dữ liệu hiệu quả. Tech Stack: C#, WinForms, WPF, SQL Server, .NET Framework',
    'Desktop app quản lý phòng gym với C# và SQL Server',
    'Desktop App',
    'Completed',
    NULL,
    'https://github.com/YuuuuBin2k5/QuanLyPhongGYM',
    '2024-01-01',
    '2024-03-31',
    false
);

-- 2. Todolist Web App
INSERT INTO projects (
    name,
    title,
    description,
    short_description,
    category,
    status,
    demo_url,
    github_url,
    start_date,
    end_date,
    featured
) VALUES (
    'todolist-web-app',
    'Todolist Web App',
    'Ứng dụng web quản lý công việc với giao diện thân thiện, hỗ trợ CRUD và đánh dấu hoàn thành. Xây dựng backend với Flask/Django và REST API, thiết kế giao diện responsive với HTML/CSS/Bootstrap, và triển khai database với SQLite/MySQL. Tech Stack: Python, Flask, Django, SQLite, MySQL, HTML, CSS, Bootstrap',
    'Web app quản lý công việc với Python Flask/Django',
    'Web App',
    'Completed',
    NULL,
    'https://github.com/YuuuuBin2k5/Todolist',
    '2024-04-01',
    '2024-05-31',
    false
);

-- 3. Trí Tuệ Nhân Tạo - UTE
INSERT INTO projects (
    name,
    title,
    description,
    short_description,
    category,
    status,
    demo_url,
    github_url,
    start_date,
    end_date,
    featured
) VALUES (
    'tri-tue-nhan-tao-ute',
    'Trí Tuệ Nhân Tạo - UTE',
    'Dự án học tập AI/ML với các thuật toán Machine Learning cơ bản và nâng cao. Triển khai các bài toán phân loại, hồi quy, clustering, áp dụng TensorFlow/Keras để huấn luyện mô hình, và trực quan hóa dữ liệu với Matplotlib/Seaborn. Tech Stack: Python, Scikit-learn, TensorFlow, Keras, Pandas, Matplotlib, Seaborn, NumPy',
    'Dự án AI/ML với Python, TensorFlow và Scikit-learn',
    'AI/ML',
    'Completed',
    NULL,
    'https://github.com/YuuuuBin2k5/TriTueNhanTao_UTE',
    '2024-06-01',
    '2024-08-31',
    false
);



-- Kiểm tra kết quả
SELECT id, title, category, status, github_url, start_date, end_date
FROM projects 
ORDER BY created_at DESC 
LIMIT 3;

-- Kiểm tra kết quả
SELECT id, title, category, status, github_url 
FROM projects 
ORDER BY created_at DESC 
LIMIT 3;
