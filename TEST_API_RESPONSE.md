# Test API Response

## 🔍 Vấn Đề Phát Hiện

Từ log:
```
Exercise images: undefined
Images count: 0
```

→ **API không trả về field `images`**

## 🧪 Test API Ngay

### 1. Test GET All Exercises
```bash
curl http://localhost:8080/api/exercises | json_pp
```

Hoặc mở browser:
```
http://localhost:8080/api/exercises
```

**Kiểm tra response:**
```json
[
  {
    "id": 1,
    "title": "...",
    "images": [...]  // ← Phải có field này!
  }
]
```

### 2. Test GET Single Exercise
```bash
curl http://localhost:8080/api/exercises/1 | json_pp
```

**Mong đợi:**
```json
{
  "id": 1,
  "title": "Test Exercise",
  "description": "...",
  "images": [
    {
      "id": 1,
      "imageUrl": "https://...",
      "displayOrder": 0,
      "caption": "..."
    }
  ]
}
```

## 🐛 Nếu Không Có Field `images`

### Nguyên nhân 1: Repository Không Tìm Thấy Images

**Kiểm tra database:**
```sql
-- Xem có ảnh trong database không
SELECT * FROM exercise_images LIMIT 5;

-- Xem ảnh của exercise cụ thể
SELECT * FROM exercise_images WHERE exercise_id = 1;
```

**Nếu không có data:**
- Chưa tạo ảnh nào
- Tạo test data:
```sql
INSERT INTO exercise_images (exercise_id, image_url, display_order, caption)
VALUES 
  (1, 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800', 0, 'Test image 1'),
  (1, 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=800', 1, 'Test image 2');
```

### Nguyên nhân 2: Repository Method Có Lỗi

**Kiểm tra backend console khi GET exercise:**

Nếu thấy error như:
```
org.springframework.dao.InvalidDataAccessApiUsageException
```

→ Repository method có vấn đề

**Fix:** Kiểm tra `ExerciseImageRepository`:
```java
List<ExerciseImage> findByExerciseIdOrderByDisplayOrder(Long exerciseId);
```

### Nguyên nhân 3: Service Không Load Images

**Thêm logging vào Service:**

Tôi sẽ thêm log vào `convertToDTO`:
