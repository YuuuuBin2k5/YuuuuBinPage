# Hướng Dẫn Chạy Migration Database

## 📋 Yêu Cầu
- MySQL 5.7+ hoặc MariaDB 10.2+
- Database đã có sẵn bảng `exercises` và `projects`
- Quyền CREATE TABLE, ALTER TABLE, INSERT

## 🚀 Cách 1: Chạy từ Command Line

### Windows
```cmd
mysql -u root -p your_database_name < database-multiple-images-complete.sql
```

### Linux/Mac
```bash
mysql -u root -p your_database_name < database-multiple-images-complete.sql
```

Hoặc với host và port cụ thể:
```bash
mysql -h localhost -P 3306 -u root -p your_database_name < database-multiple-images-complete.sql
```

## 🖥️ Cách 2: Chạy từ MySQL Workbench

1. Mở MySQL Workbench
2. Kết nối đến database của bạn
3. File → Open SQL Script
4. Chọn file `database-multiple-images-complete.sql`
5. Click nút Execute (⚡ icon) hoặc Ctrl+Shift+Enter
6. Kiểm tra kết quả trong Output panel

## 📱 Cách 3: Chạy từ phpMyAdmin

1. Đăng nhập vào phpMyAdmin
2. Chọn database của bạn từ sidebar trái
3. Click tab "SQL" ở trên
4. Click "Choose File" và chọn `database-multiple-images-complete.sql`
5. Hoặc copy toàn bộ nội dung file và paste vào text area
6. Click "Go" để thực thi

## 🔍 Kiểm Tra Sau Khi Chạy

### 1. Kiểm tra bảng đã tạo
```sql
SHOW TABLES LIKE '%_images';
```
Kết quả mong đợi:
- exercise_images
- project_images

### 2. Kiểm tra cấu trúc bảng
```sql
DESCRIBE exercise_images;
DESCRIBE project_images;
```

### 3. Kiểm tra dữ liệu đã migrate
```sql
-- Đếm số ảnh đã migrate
SELECT COUNT(*) AS total_exercise_images FROM exercise_images;
SELECT COUNT(*) AS total_project_images FROM project_images;

-- Xem 5 ảnh đầu tiên
SELECT * FROM exercise_images LIMIT 5;
SELECT * FROM project_images LIMIT 5;
```

### 4. Kiểm tra foreign key constraints
```sql
SELECT 
  TABLE_NAME,
  CONSTRAINT_NAME,
  REFERENCED_TABLE_NAME
FROM information_schema.KEY_COLUMN_USAGE
WHERE TABLE_SCHEMA = 'your_database_name'
  AND TABLE_NAME IN ('exercise_images', 'project_images')
  AND REFERENCED_TABLE_NAME IS NOT NULL;
```

## ⚠️ Xử Lý Lỗi Thường Gặp

### Lỗi: Table 'exercises' doesn't exist
**Nguyên nhân:** Bảng exercises chưa được tạo
**Giải pháp:** Chạy migration tạo bảng exercises trước

### Lỗi: Cannot add foreign key constraint
**Nguyên nhân:** 
- Bảng exercises hoặc projects không tồn tại
- Kiểu dữ liệu không khớp
- Engine không khớp (InnoDB vs MyISAM)

**Giải pháp:**
```sql
-- Kiểm tra engine của bảng
SHOW TABLE STATUS WHERE Name IN ('exercises', 'projects');

-- Nếu cần, chuyển sang InnoDB
ALTER TABLE exercises ENGINE=InnoDB;
ALTER TABLE projects ENGINE=InnoDB;
```

### Lỗi: Duplicate entry
**Nguyên nhân:** Đã chạy migration trước đó
**Giải pháp:** Script đã có check `NOT EXISTS`, nên không sao. Hoặc xóa dữ liệu cũ:
```sql
TRUNCATE TABLE exercise_images;
TRUNCATE TABLE project_images;
```

### Lỗi: Access denied
**Nguyên nhân:** User không có quyền
**Giải pháp:**
```sql
-- Grant quyền cần thiết
GRANT CREATE, ALTER, INSERT, SELECT ON your_database_name.* TO 'your_user'@'localhost';
FLUSH PRIVILEGES;
```

## 🔄 Rollback (Nếu Cần)

Nếu muốn xóa các bảng mới tạo:
```sql
-- Xóa bảng (cẩn thận!)
DROP TABLE IF EXISTS exercise_images;
DROP TABLE IF EXISTS project_images;
```

## 📊 Thống Kê Sau Migration

```sql
-- Tổng quan
SELECT 
  'Exercises' AS type,
  COUNT(DISTINCT e.id) AS total_items,
  COUNT(ei.id) AS total_images,
  ROUND(AVG(img_count), 2) AS avg_images_per_item
FROM exercises e
LEFT JOIN (
  SELECT exercise_id, COUNT(*) as img_count
  FROM exercise_images
  GROUP BY exercise_id
) ei ON e.id = ei.exercise_id

UNION ALL

SELECT 
  'Projects' AS type,
  COUNT(DISTINCT p.project_id) AS total_items,
  COUNT(pi.id) AS total_images,
  ROUND(AVG(img_count), 2) AS avg_images_per_item
FROM projects p
LEFT JOIN (
  SELECT project_id, COUNT(*) as img_count
  FROM project_images
  GROUP BY project_id
) pi ON p.project_id = pi.project_id;
```

## 🎯 Bước Tiếp Theo

Sau khi migration thành công:

1. ✅ Rebuild backend Java
   ```bash
   cd server
   ./mvnw clean install
   ```

2. ✅ Start backend server
   ```bash
   ./mvnw spring-boot:run
   ```

3. ✅ Test API endpoint
   ```bash
   curl http://localhost:8080/api/exercises
   curl http://localhost:8080/api/projects
   ```

4. ✅ Rebuild frontend
   ```bash
   cd client
   npm install
   npm run dev
   ```

5. ✅ Test trong browser
   - Mở http://localhost:5173
   - Tạo bài tập/dự án mới với nhiều ảnh
   - Kiểm tra carousel hiển thị đúng

## 📝 Ghi Chú

- Dữ liệu cũ (image_url, cover_image) vẫn được giữ nguyên
- Có thể xóa các cột cũ sau khi verify (xem section 6 trong SQL file)
- Backup database trước khi xóa cột cũ!

## 🆘 Cần Trợ Giúp?

Nếu gặp vấn đề:
1. Kiểm tra MySQL error log
2. Verify database connection
3. Check user permissions
4. Review foreign key constraints
5. Xem file `MULTIPLE_IMAGES_GUIDE.md` để biết thêm chi tiết
