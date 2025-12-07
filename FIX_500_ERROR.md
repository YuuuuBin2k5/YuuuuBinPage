# Fix 500 Error When Update

## ✅ Tiến Độ
- Frontend gửi đúng: Images count: 4 ✅
- Backend nhận request ✅
- Backend trả về 500 error ❌

## 🔍 Cần Làm Ngay

### 1. Restart Backend Với Logging Mới
```bash
cd server
# Ctrl+C để stop
./mvnw spring-boot:run
```

### 2. Test Update Lại
1. Refresh frontend (F5)
2. Click Edit exercise
3. Thêm 1 ảnh mới
4. Click "Cập Nhật"

### 3. Xem Backend Console

**Mong đợi thấy:**
```
=== UPDATE EXERCISE SERVICE ===
Exercise ID: 1
Images to update: 4
Saving exercise...
Exercise saved successfully
Deleting old images...
Old images deleted
Saving new images...
=== SAVING EXERCISE IMAGES ===
Exercise ID: 1
Number of images to save: 4
  Image 1: ... (order: 0)
  Image 2: ... (order: 1)
  Image 3: ... (order: 2)
  Image 4: ... (order: 3)
Successfully saved 4 images to database
New images saved
Converting to DTO...
Update completed successfully
```

**Nếu thấy ERROR:**
```
ERROR in updateExercise: ...
[Stack trace sẽ hiện ở đây]
```

## 🐛 Các Lỗi Có Thể

### Lỗi 1: Foreign Key Constraint
```
Cannot delete or update a parent row: a foreign key constraint fails
```

**Nguyên nhân:** Không thể xóa ảnh cũ vì constraint

**Giải pháp:** Kiểm tra foreign key có ON DELETE CASCADE không
```sql
SHOW CREATE TABLE exercise_images;
```

Nếu không có CASCADE, chạy:
```sql
ALTER TABLE exercise_images 
DROP FOREIGN KEY fk_exercise_images_exercise;

ALTER TABLE exercise_images
ADD CONSTRAINT fk_exercise_images_exercise
FOREIGN KEY (exercise_id) REFERENCES exercises(id)
ON DELETE CASCADE ON UPDATE CASCADE;
```

### Lỗi 2: Transaction Rollback
```
Transaction rolled back because it has been marked as rollback-only
```

**Nguyên nhân:** Lỗi trong transaction

**Giải pháp:** Xem stack trace để tìm lỗi gốc

### Lỗi 3: Null Pointer
```
NullPointerException
```

**Nguyên nhân:** Một field nào đó null

**Giải pháp:** Kiểm tra exerciseDTO có đầy đủ fields không

### Lỗi 4: Repository Method Not Found
```
No property 'deleteByExerciseId' found
```

**Nguyên nhân:** Repository method không đúng

**Giải pháp:** Kiểm tra `ExerciseImageRepository`:
```java
@Modifying
@Transactional
void deleteByExerciseId(Long exerciseId);
```

Nếu thiếu `@Modifying`, thêm vào:
```java
import org.springframework.data.jpa.repository.Modifying;

@Modifying
@Transactional
void deleteByExerciseId(Long exerciseId);
```

## 📝 Gửi Cho Tôi

Sau khi restart backend và test lại, gửi cho tôi:

1. **Backend console log** (toàn bộ từ lúc click "Cập Nhật")
2. **Error stack trace** (nếu có)
3. **Database state:**
```sql
SELECT * FROM exercise_images WHERE exercise_id = 1;
```

## 🔧 Quick Test

Nếu muốn test nhanh, dùng cURL:
```bash
curl -X PUT http://localhost:8080/api/exercises/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Title",
    "description": "Updated desc",
    "difficulty": "MEDIUM",
    "category": "Frontend",
    "estimatedTime": 90,
    "images": [
      {"imageUrl": "https://example.com/1.jpg", "displayOrder": 0},
      {"imageUrl": "https://example.com/2.jpg", "displayOrder": 1}
    ]
  }'
```

Xem backend console có error gì không.
