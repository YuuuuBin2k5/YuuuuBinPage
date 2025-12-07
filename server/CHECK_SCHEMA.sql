-- Kiểm tra cấu trúc bảng projects
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'projects'
ORDER BY ordinal_position;

-- Hoặc dùng lệnh này
\d projects
