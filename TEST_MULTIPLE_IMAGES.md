# Test Multiple Images Feature

## 🔍 Checklist Kiểm Tra

### 1. Database Setup
```sql
-- Kiểm tra bảng đã tạo
SHOW TABLES LIKE '%_images';

-- Kiểm tra cấu trúc
DESCRIBE exercise_images;
DESCRIBE project_images;

-- Kiểm tra dữ liệu
SELECT COUNT(*) FROM exercise_images;
SELECT COUNT(*) FROM project_images;
```

### 2. Backend Logs
Khi bạn tạo/cập nhật bài tập hoặc dự án, check console log của backend:

**Mong đợi thấy:**
```
=== CREATE EXERCISE ===
Exercise title: Test Exercise
Images count: 3
  - Image URL: https://example.com/image1.jpg
  - Image URL: https://example.com/image2.jpg
  - Image URL: https://example.com/image3.jpg

=== SAVING EXERCISE IMAGES ===
Exercise ID: 123
Number of images to save: 3
  Image 1: https://example.com/image1.jpg (order: 0)
  Image 2: https://example.com/image2.jpg (order: 1)
  Image 3: https://example.com/image3.jpg (order: 2)
Successfully saved 3 images to database
```

**Nếu KHÔNG thấy log "SAVING EXERCISE IMAGES":**
- Frontend không gửi field `images` trong request
- Hoặc `images` array rỗng

### 3. Frontend Console
Mở DevTools (F12) → Console tab

**Kiểm tra request payload:**
1. Mở Network tab
2. Tạo/cập nhật bài tập với nhiều ảnh
3. Click vào request POST/PUT
4. Xem tab "Payload" hoặc "Request"

**Mong đợi thấy:**
```json
{
  "title": "Test Exercise",
  "description": "...",
  "images": [
    {
      "imageUrl": "https://example.com/image1.jpg",
      "displayOrder": 0,
      "caption": "First image"
    },
    {
      "imageUrl": "https://example.com/image2.jpg",
      "displayOrder": 1,
      "caption": "Second image"
    }
  ],
  ...
}
```

**Nếu KHÔNG thấy field `images`:**
- Form không gửi images
- Kiểm tra `exerciseForm.images` trong component

### 4. Test Steps

#### Test Exercise
1. Mở trang Bài Tập
2. Click "Thêm Bài Tập"
3. Điền thông tin cơ bản
4. Trong phần "Ảnh bài tập (nhiều ảnh)":
   - Nhập URL: `https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800`
   - Nhập caption: "Main interface"
   - Click "Thêm Ảnh"
   - Lặp lại 2-3 lần với URL khác
5. Click "Tạo Bài Tập"
6. Kiểm tra:
   - ✅ Alert "Bài tập đã được thêm thành công!"
   - ✅ Backend log hiển thị "SAVING EXERCISE IMAGES"
   - ✅ Card hiển thị carousel với nhiều ảnh
   - ✅ Database có record trong `exercise_images`

#### Test Project
1. Mở trang Dự Án
2. Click "Thêm Dự Án"
3. Điền thông tin cơ bản
4. Trong phần "Ảnh dự án (nhiều ảnh)":
   - Nhập URL: `https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800`
   - Nhập caption: "Dashboard"
   - Click "Thêm Ảnh"
   - Lặp lại 2-3 lần với URL khác
5. Click "Tạo Dự Án"
6. Kiểm tra tương tự như Exercise

### 5. Database Verification

```sql
-- Kiểm tra ảnh vừa tạo
SELECT * FROM exercise_images ORDER BY created_at DESC LIMIT 10;
SELECT * FROM project_images ORDER BY created_at DESC LIMIT 10;

-- Kiểm tra với JOIN
SELECT 
  e.id,
  e.title,
  ei.image_url,
  ei.display_order,
  ei.caption
FROM exercises e
LEFT JOIN exercise_images ei ON e.id = ei.exercise_id
WHERE e.id = YOUR_EXERCISE_ID
ORDER BY ei.display_order;

SELECT 
  p.project_id,
  p.title,
  pi.image_url,
  pi.display_order,
  pi.caption
FROM projects p
LEFT JOIN project_images pi ON p.project_id = pi.project_id
WHERE p.project_id = YOUR_PROJECT_ID
ORDER BY pi.display_order;
```

### 6. API Testing với cURL

#### Test Create Exercise
```bash
curl -X POST http://localhost:8080/api/exercises \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Exercise",
    "description": "Test description",
    "difficulty": "EASY",
    "category": "Frontend",
    "estimatedTime": 60,
    "images": [
      {
        "imageUrl": "https://example.com/image1.jpg",
        "displayOrder": 0,
        "caption": "First image"
      },
      {
        "imageUrl": "https://example.com/image2.jpg",
        "displayOrder": 1,
        "caption": "Second image"
      }
    ]
  }'
```

#### Test Create Project
```bash
curl -X POST http://localhost:8080/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Project",
    "description": "Test description",
    "category": "Web App",
    "status": "In Progress",
    "images": [
      {
        "imageUrl": "https://example.com/image1.jpg",
        "displayOrder": 0,
        "caption": "Dashboard"
      },
      {
        "imageUrl": "https://example.com/image2.jpg",
        "displayOrder": 1,
        "caption": "Analytics"
      }
    ]
  }'
```

## 🐛 Common Issues

### Issue 1: Images không lưu vào database
**Triệu chứng:** Backend log không hiển thị "SAVING ... IMAGES"

**Nguyên nhân có thể:**
1. Frontend không gửi field `images`
2. `images` array rỗng
3. Form state không cập nhật đúng

**Giải pháp:**
```javascript
// Trong ExerciseForm.jsx hoặc SimpleProjectForm.jsx
// Thêm console.log trước khi submit
const handleSubmit = (e) => {
  e.preventDefault();
  console.log("Form data:", exerciseForm); // hoặc formData
  console.log("Images:", exerciseForm.images); // hoặc formData.images
  onSubmit(e, exerciseForm, currentWeekId);
};
```

### Issue 2: Images null trong backend
**Triệu chứng:** Backend log hiển thị "Images count: 0"

**Kiểm tra:**
1. Network tab → Request payload có field `images` không?
2. Backend DTO có getter/setter cho `images` không?
3. Jackson có deserialize đúng không?

**Giải pháp:**
- Verify DTO có `@Data` annotation
- Verify field name match giữa frontend và backend

### Issue 3: Foreign key constraint error
**Triệu chứng:** Error "Cannot add or update a child row"

**Nguyên nhân:**
- Exercise/Project ID không tồn tại
- Transaction chưa commit

**Giải pháp:**
- Verify exercise/project đã được save trước
- Check `@Transactional` annotation

### Issue 4: Images không hiển thị trên UI
**Triệu chứng:** Lưu thành công nhưng không thấy carousel

**Kiểm tra:**
1. API response có field `images` không?
2. Component có import `ImageCarousel` không?
3. Conditional rendering đúng không?

**Giải pháp:**
```javascript
// Trong ExerciseCard.jsx hoặc ProjectCard.jsx
console.log("Exercise/Project:", exercise); // hoặc project
console.log("Images:", exercise.images); // hoặc project.images
```

## ✅ Success Criteria

Tính năng hoạt động đúng khi:
- ✅ Backend log hiển thị "SAVING ... IMAGES"
- ✅ Database có records trong `exercise_images` / `project_images`
- ✅ API response bao gồm field `images` với data đúng
- ✅ UI hiển thị carousel với nhiều ảnh
- ✅ Navigation prev/next hoạt động
- ✅ Dots indicator hiển thị đúng
- ✅ Counter hiển thị đúng (VD: 2/5)
- ✅ Update exercise/project giữ nguyên images cũ hoặc cập nhật đúng

## 📊 Performance Check

```sql
-- Kiểm tra số lượng ảnh trung bình
SELECT 
  AVG(img_count) as avg_images_per_exercise
FROM (
  SELECT exercise_id, COUNT(*) as img_count
  FROM exercise_images
  GROUP BY exercise_id
) t;

SELECT 
  AVG(img_count) as avg_images_per_project
FROM (
  SELECT project_id, COUNT(*) as img_count
  FROM project_images
  GROUP BY project_id
) t;

-- Tìm items có nhiều ảnh nhất
SELECT 
  e.id,
  e.title,
  COUNT(ei.id) as image_count
FROM exercises e
LEFT JOIN exercise_images ei ON e.id = ei.exercise_id
GROUP BY e.id, e.title
ORDER BY image_count DESC
LIMIT 10;
```

## 🎯 Next Steps

Sau khi test thành công:
1. Remove console.log statements (optional)
2. Test với production build
3. Test với real image URLs
4. Test performance với nhiều ảnh (10-15 ảnh)
5. Test trên mobile devices
6. Backup database trước khi deploy
