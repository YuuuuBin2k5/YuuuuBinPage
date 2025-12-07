# Quick Start - Tính Năng Nhiều Ảnh

## 🚀 Cài Đặt Nhanh

### 1. Chạy Migration Database
```bash
mysql -u root -p your_database_name < server/add-multiple-images.sql
```

### 2. Rebuild Backend
```bash
cd server
./mvnw clean install
./mvnw spring-boot:run
```

### 3. Rebuild Frontend
```bash
cd client
npm install
npm run dev
```

## ✨ Tính Năng Mới

### Bài Tập (Exercise)
- ✅ Thêm tối đa 10 ảnh
- ✅ Sắp xếp thứ tự ảnh
- ✅ Thêm caption cho mỗi ảnh
- ✅ Hiển thị dạng carousel

### Dự Án (Project)
- ✅ Thêm tối đa 15 ảnh
- ✅ Sắp xếp thứ tự ảnh
- ✅ Thêm caption cho mỗi ảnh
- ✅ Hiển thị dạng carousel

## 📝 Cách Sử Dụng

### Thêm Ảnh
1. Mở form tạo/chỉnh sửa bài tập hoặc dự án
2. Nhập URL ảnh vào ô "Thêm ảnh mới"
3. (Tùy chọn) Nhập mô tả ảnh
4. Click "Thêm Ảnh"
5. Lặp lại để thêm nhiều ảnh

### Sắp Xếp Ảnh
- Click nút ↑ để di chuyển ảnh lên
- Click nút ↓ để di chuyển ảnh xuống
- Click X để xóa ảnh

### Xem Ảnh
- Ảnh hiển thị dạng carousel trên card
- Hover để hiện nút prev/next
- Click dots để chuyển ảnh
- Xem counter (VD: 2/5)

## 🗂️ Files Đã Thay Đổi

### Backend
- ✅ `server/add-multiple-images.sql` - Migration SQL
- ✅ `ExerciseImage.java` - Entity mới
- ✅ `ProjectImage.java` - Entity mới
- ✅ `ExerciseImageRepository.java` - Repository mới
- ✅ `ProjectImageRepository.java` - Repository mới
- ✅ `ExerciseService.java` - Cập nhật
- ✅ `ProjectService.java` - Cập nhật
- ✅ `ExerciseDTO.java` - Thêm field images
- ✅ `ProjectDTO.java` - Thêm field images

### Frontend
- ✅ `MultiImageUploader.jsx` - Component mới
- ✅ `ImageCarousel.jsx` - Component mới
- ✅ `ExerciseForm.jsx` - Cập nhật
- ✅ `ExerciseCard.jsx` - Cập nhật
- ✅ `SimpleProjectForm.jsx` - Cập nhật
- ✅ `ProjectCard.jsx` - Cập nhật

## 🔍 Kiểm Tra

### Verify Database
```sql
-- Kiểm tra bảng mới
SHOW TABLES LIKE '%_images';

-- Kiểm tra dữ liệu đã migrate
SELECT * FROM exercise_images LIMIT 5;
SELECT * FROM project_images LIMIT 5;
```

### Verify Backend
- Truy cập: http://localhost:8080/api/exercises
- Kiểm tra response có field `images`

### Verify Frontend
- Truy cập: http://localhost:5173
- Mở form tạo bài tập/dự án
- Thử thêm nhiều ảnh
- Kiểm tra carousel hiển thị đúng

## 📚 Tài Liệu Chi Tiết

Xem file `MULTIPLE_IMAGES_GUIDE.md` để biết thêm chi tiết về:
- Cấu trúc database
- API format
- Troubleshooting
- Future enhancements

## ⚠️ Lưu Ý

- Dữ liệu cũ (imageUrl, coverImage) vẫn được giữ lại
- Hệ thống tự động fallback về ảnh đơn nếu không có images array
- Backward compatible với code cũ
