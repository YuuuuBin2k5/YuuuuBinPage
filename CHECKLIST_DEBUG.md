# 🔍 Checklist Debug - Multiple Images Feature

## ✅ Bước 1: Kiểm Tra Database

### 1.1 Chạy migration
```bash
mysql -u root -p your_database < server/database-multiple-images-complete.sql
```

### 1.2 Verify bảng đã tạo
```sql
SHOW TABLES LIKE '%_images';
```
**Mong đợi:** 2 bảng `exercise_images` và `project_images`

### 1.3 Kiểm tra cấu trúc
```sql
DESCRIBE exercise_images;
DESCRIBE project_images;
```
**Mong đợi:** Các cột: id, exercise_id/project_id, image_url, display_order, caption, created_at

---

## ✅ Bước 2: Kiểm Tra Backend

### 2.1 Rebuild backend
```bash
cd server
./mvnw clean install
```
**Mong đợi:** BUILD SUCCESS

### 2.2 Start server
```bash
./mvnw spring-boot:run
```
**Mong đợi:** Server chạy ở port 8080

### 2.3 Test API với cURL hoặc REST Client
Sử dụng file `server/TEST_API.http`

**Test create exercise:**
```bash
curl -X POST http://localhost:8080/api/exercises \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test",
    "description": "Test",
    "difficulty": "EASY",
    "category": "Frontend",
    "estimatedTime": 60,
    "images": [
      {"imageUrl": "https://example.com/1.jpg", "displayOrder": 0},
      {"imageUrl": "https://example.com/2.jpg", "displayOrder": 1}
    ]
  }'
```

**Kiểm tra backend console:**
```
=== CREATE EXERCISE ===
Exercise title: Test
Images count: 2
  - Image URL: https://example.com/1.jpg
  - Image URL: https://example.com/2.jpg

=== SAVING EXERCISE IMAGES ===
Exercise ID: 123
Number of images to save: 2
  Image 1: https://example.com/1.jpg (order: 0)
  Image 2: https://example.com/2.jpg (order: 1)
Successfully saved 2 images to database
```

**✅ PASS nếu:** Thấy tất cả log trên
**❌ FAIL nếu:** 
- Không thấy "Images count: 2" → Frontend không gửi images
- Không thấy "SAVING EXERCISE IMAGES" → Logic lưu không chạy
- Thấy error → Kiểm tra stack trace

---

## ✅ Bước 3: Kiểm Tra Database Sau Khi Tạo

```sql
-- Kiểm tra ảnh vừa tạo
SELECT * FROM exercise_images ORDER BY created_at DESC LIMIT 5;
SELECT * FROM project_images ORDER BY created_at DESC LIMIT 5;
```

**✅ PASS nếu:** Thấy records mới với đúng image_url
**❌ FAIL nếu:** Không có data → Xem lại backend log có error không

---

## ✅ Bước 4: Kiểm Tra Frontend

### 4.1 Rebuild frontend
```bash
cd client
npm install
npm run dev
```

### 4.2 Test trong browser
1. Mở http://localhost:5173
2. Đăng nhập (nếu cần)
3. Vào trang Bài Tập hoặc Dự Án
4. Click "Thêm Bài Tập" / "Thêm Dự Án"

### 4.3 Kiểm tra form
**✅ PASS nếu:**
- Thấy section "Ảnh bài tập (nhiều ảnh)" hoặc "Ảnh dự án (nhiều ảnh)"
- Có input để nhập URL
- Có input để nhập caption
- Có nút "Thêm Ảnh"

**❌ FAIL nếu:**
- Không thấy section → Component không được import
- Thấy lỗi console → Kiểm tra import path

### 4.4 Thêm ảnh trong form
1. Nhập URL: `https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800`
2. Nhập caption: "Test image"
3. Click "Thêm Ảnh"

**✅ PASS nếu:**
- Ảnh xuất hiện trong danh sách
- Có preview thumbnail
- Có nút xóa (X) và nút sắp xếp (↑↓)

**❌ FAIL nếu:**
- Ảnh không xuất hiện → Kiểm tra state update
- Console có error → Xem error message

### 4.5 Submit form
1. Điền các field bắt buộc
2. Thêm 2-3 ảnh
3. Click "Tạo Bài Tập" / "Tạo Dự Án"

**Mở DevTools (F12) → Network tab:**
- Tìm request POST `/api/exercises` hoặc `/api/projects`
- Click vào request
- Xem tab "Payload" hoặc "Request"

**✅ PASS nếu:**
- Request payload có field `images`
- `images` là array với 2-3 items
- Mỗi item có `imageUrl`, `displayOrder`, `caption`

**❌ FAIL nếu:**
- Không có field `images` → Form không gửi images
- `images` là null hoặc [] → State không được set đúng

### 4.6 Kiểm tra hiển thị
Sau khi tạo thành công:

**✅ PASS nếu:**
- Card hiển thị carousel với nhiều ảnh
- Hover vào card thấy nút prev/next
- Click prev/next chuyển ảnh được
- Thấy dots indicator
- Thấy counter (VD: 2/3)

**❌ FAIL nếu:**
- Chỉ thấy 1 ảnh → API không trả về images
- Không thấy ảnh → ImageCarousel không render
- Console có error → Xem error message

---

## ✅ Bước 5: Debug Nếu Có Lỗi

### Lỗi 1: Images không lưu vào database

**Kiểm tra:**
1. Backend console có log "SAVING ... IMAGES" không?
   - **Không có** → Frontend không gửi images hoặc images rỗng
   - **Có nhưng error** → Xem stack trace

2. Frontend Network tab có gửi images không?
   - **Không có** → Form state không đúng
   - **Có** → Backend có nhận không?

3. Backend Controller có log "Images count: X" không?
   - **Count = 0** → DTO không deserialize đúng
   - **Count > 0** → Service có gọi saveImages không?

**Giải pháp:**
```javascript
// Thêm vào ExerciseForm.jsx hoặc SimpleProjectForm.jsx
console.log("=== FORM SUBMIT ===");
console.log("Form data:", exerciseForm); // hoặc formData
console.log("Images:", exerciseForm.images); // hoặc formData.images
console.log("Images count:", exerciseForm.images?.length);
```

### Lỗi 2: Images null trong backend

**Kiểm tra DTO:**
```java
// ExerciseDTO.java hoặc ProjectDTO.java
// Phải có:
private List<ImageDTO> images;

public List<ImageDTO> getImages() { return images; }
public void setImages(List<ImageDTO> images) { this.images = images; }
```

**Kiểm tra Controller:**
```java
System.out.println("Images: " + exerciseDTO.getImages());
System.out.println("Images size: " + (exerciseDTO.getImages() != null ? exerciseDTO.getImages().size() : "null"));
```

### Lỗi 3: Foreign key constraint

**Error message:** "Cannot add or update a child row: a foreign key constraint fails"

**Nguyên nhân:**
- Exercise/Project chưa được save
- ID không tồn tại

**Giải pháp:**
- Verify exercise/project được save trước khi save images
- Check transaction có commit không

### Lỗi 4: Images không hiển thị

**Kiểm tra API response:**
```bash
curl http://localhost:8080/api/exercises/1
```

**Mong đợi:**
```json
{
  "id": 1,
  "title": "...",
  "images": [
    {"id": 1, "imageUrl": "...", "displayOrder": 0, "caption": "..."},
    {"id": 2, "imageUrl": "...", "displayOrder": 1, "caption": "..."}
  ]
}
```

**Nếu images = []:**
- Service có load images không?
- Repository có query đúng không?

**Nếu images = null:**
- DTO có set images không?
- convertToDTO có gọi load images không?

---

## 📊 Summary Checklist

- [ ] Database: Bảng exercise_images và project_images đã tạo
- [ ] Database: Foreign keys và indexes đã tạo
- [ ] Backend: Build thành công
- [ ] Backend: Server chạy được
- [ ] Backend: Controller nhận được images từ request
- [ ] Backend: Service lưu images vào database
- [ ] Backend: Service load images khi get
- [ ] Database: Có records trong exercise_images/project_images
- [ ] Frontend: Form hiển thị MultiImageUploader
- [ ] Frontend: Có thể thêm/xóa/sắp xếp ảnh
- [ ] Frontend: Request gửi field images
- [ ] Frontend: Card hiển thị ImageCarousel
- [ ] Frontend: Navigation prev/next hoạt động
- [ ] Frontend: Dots và counter hiển thị đúng

---

## 🆘 Nếu Vẫn Không Được

Gửi cho tôi:
1. Backend console log (toàn bộ)
2. Frontend console log (F12 → Console)
3. Network request payload (F12 → Network → Request)
4. Database query result: `SELECT * FROM exercise_images LIMIT 5;`
5. Screenshot của form và card

Tôi sẽ giúp bạn debug!
