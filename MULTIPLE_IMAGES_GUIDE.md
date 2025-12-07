# Hướng Dẫn Sử Dụng Tính Năng Nhiều Ảnh

## Tổng Quan
Hệ thống đã được cập nhật để hỗ trợ tải lên và hiển thị nhiều ảnh cho cả **Bài Tập (Exercise)** và **Dự Án (Project)**.

## Cài Đặt Database

### Bước 1: Chạy Migration SQL
Chạy file SQL để tạo bảng mới:

```bash
# Kết nối vào MySQL
mysql -u root -p your_database_name < server/add-multiple-images.sql
```

Hoặc copy nội dung file `server/add-multiple-images.sql` và chạy trong MySQL Workbench/phpMyAdmin.

### Bước 2: Kiểm Tra Bảng Mới
Sau khi chạy migration, bạn sẽ có 2 bảng mới:
- `exercise_images` - Lưu nhiều ảnh cho bài tập
- `project_images` - Lưu nhiều ảnh cho dự án

### Bước 3: Migration Dữ Liệu Cũ
Script SQL tự động migrate ảnh cũ từ:
- `exercises.image_url` → `exercise_images`
- `projects.cover_image` → `project_images`

**Lưu ý:** Các cột cũ (`image_url`, `cover_image`) vẫn được giữ lại để backward compatibility. Bạn có thể xóa sau khi kiểm tra hệ thống hoạt động tốt.

## Cấu Trúc Bảng

### exercise_images
```sql
- id: BIGINT (Primary Key)
- exercise_id: BIGINT (Foreign Key → exercises.id)
- image_url: TEXT (URL của ảnh)
- display_order: INT (Thứ tự hiển thị, 0-based)
- caption: VARCHAR(255) (Mô tả ảnh, tùy chọn)
- created_at: TIMESTAMP
```

### project_images
```sql
- id: BIGINT (Primary Key)
- project_id: BIGINT (Foreign Key → projects.project_id)
- image_url: TEXT (URL của ảnh)
- display_order: INT (Thứ tự hiển thị, 0-based)
- caption: VARCHAR(255) (Mô tả ảnh, tùy chọn)
- created_at: TIMESTAMP
```

## Backend Changes

### Entities Mới
- `ExerciseImage.java` - Entity cho ảnh bài tập
- `ProjectImage.java` - Entity cho ảnh dự án

### Repositories Mới
- `ExerciseImageRepository.java`
- `ProjectImageRepository.java`

### DTOs Cập Nhật
- `ExerciseDTO` - Thêm field `List<ImageDTO> images`
- `ProjectDTO` - Thêm field `List<ImageDTO> images`

### Services Cập Nhật
- `ExerciseService` - Xử lý lưu/load nhiều ảnh
- `ProjectService` - Xử lý lưu/load nhiều ảnh

## Frontend Changes

### Components Mới

#### 1. MultiImageUploader
Component để thêm/xóa/sắp xếp nhiều ảnh trong form.

**Props:**
- `images`: Array các ảnh hiện tại
- `onChange`: Callback khi danh sách ảnh thay đổi
- `maxImages`: Số ảnh tối đa (mặc định 10)

**Tính năng:**
- Thêm ảnh mới bằng URL
- Thêm caption cho mỗi ảnh
- Xóa ảnh
- Sắp xếp thứ tự (move up/down)
- Preview ảnh

#### 2. ImageCarousel
Component hiển thị nhiều ảnh dạng carousel/slider.

**Props:**
- `images`: Array các ảnh
- `alt`: Alt text cho ảnh

**Tính năng:**
- Hiển thị ảnh với navigation (prev/next)
- Dots indicator
- Counter (1/5)
- Caption hiển thị
- Auto-hide controls khi chỉ có 1 ảnh
- Hover để hiện controls

### Forms Cập Nhật

#### ExerciseForm
- Thay thế input URL đơn bằng `MultiImageUploader`
- Hỗ trợ tối đa 10 ảnh

#### SimpleProjectForm
- Thay thế input URL đơn bằng `MultiImageUploader`
- Hỗ trợ tối đa 15 ảnh

### Cards Cập Nhật

#### ExerciseCard
- Hiển thị `ImageCarousel` nếu có nhiều ảnh
- Fallback về ảnh đơn nếu chỉ có `imageUrl`
- Fallback về placeholder nếu không có ảnh

#### ProjectCard
- Hiển thị `ImageCarousel` nếu có nhiều ảnh
- Fallback về ảnh đơn nếu chỉ có `coverImage`

## Cách Sử Dụng

### Thêm Bài Tập/Dự Án Mới

1. Click nút "Thêm Bài Tập" hoặc "Thêm Dự Án"
2. Điền thông tin cơ bản
3. Trong phần "Ảnh", nhập URL ảnh và caption (tùy chọn)
4. Click "Thêm Ảnh"
5. Lặp lại để thêm nhiều ảnh
6. Sử dụng nút ↑↓ để sắp xếp thứ tự
7. Click X để xóa ảnh không cần
8. Submit form

### Chỉnh Sửa

1. Click nút Edit trên card
2. Form sẽ load với danh sách ảnh hiện tại
3. Thêm/xóa/sắp xếp ảnh như mong muốn
4. Submit để cập nhật

### Xem

- Ảnh hiển thị dạng carousel trên card
- Hover để hiện nút prev/next
- Click dots để jump đến ảnh cụ thể
- Counter hiển thị vị trí hiện tại (VD: 2/5)

## API Response Format

### Exercise với nhiều ảnh
```json
{
  "id": 1,
  "title": "React Hooks Tutorial",
  "description": "...",
  "imageUrl": "https://...",  // Backward compatibility
  "images": [
    {
      "id": 1,
      "imageUrl": "https://example.com/image1.jpg",
      "displayOrder": 0,
      "caption": "Main screenshot"
    },
    {
      "id": 2,
      "imageUrl": "https://example.com/image2.jpg",
      "displayOrder": 1,
      "caption": "Code example"
    }
  ],
  ...
}
```

### Project với nhiều ảnh
```json
{
  "id": 1,
  "name": "E-commerce Platform",
  "description": "...",
  "coverImage": "https://...",  // Backward compatibility
  "images": [
    {
      "id": 1,
      "imageUrl": "https://example.com/home.jpg",
      "displayOrder": 0,
      "caption": "Homepage"
    },
    {
      "id": 2,
      "imageUrl": "https://example.com/product.jpg",
      "displayOrder": 1,
      "caption": "Product page"
    }
  ],
  ...
}
```

## Backward Compatibility

Hệ thống vẫn hỗ trợ:
- Đọc từ `imageUrl` và `coverImage` cũ
- Hiển thị ảnh đơn nếu không có `images` array
- API response bao gồm cả field cũ và mới

## Testing

### Test Backend
```bash
cd server
./mvnw clean install
./mvnw spring-boot:run
```

### Test Frontend
```bash
cd client
npm install
npm run dev
```

### Test Cases
1. ✅ Tạo bài tập/dự án mới với nhiều ảnh
2. ✅ Chỉnh sửa và thêm/xóa ảnh
3. ✅ Sắp xếp thứ tự ảnh
4. ✅ Hiển thị carousel trên card
5. ✅ Navigation prev/next
6. ✅ Backward compatibility với ảnh đơn cũ

## Troubleshooting

### Lỗi: Foreign Key Constraint
- Đảm bảo bảng `exercises` và `projects` đã tồn tại
- Kiểm tra tên cột foreign key đúng

### Lỗi: Images không hiển thị
- Kiểm tra API response có field `images`
- Kiểm tra console log có lỗi CORS
- Verify URL ảnh accessible

### Lỗi: Cannot save images
- Kiểm tra `ExerciseImageRepository` và `ProjectImageRepository` đã được inject
- Verify transaction đang hoạt động

## Tối Ưu Hóa

### Performance
- Lazy loading ảnh với `loading="lazy"`
- Optimize image URLs (sử dụng CDN, resize)
- Cache API responses

### UX
- Thêm loading state khi upload
- Preview ảnh trước khi submit
- Drag & drop để sắp xếp (future enhancement)

## Future Enhancements

- [ ] Upload ảnh trực tiếp (không qua URL)
- [ ] Drag & drop để sắp xếp
- [ ] Crop/resize ảnh
- [ ] Lightbox/fullscreen view
- [ ] Lazy load images trong carousel
- [ ] Video support
- [ ] Bulk upload

## Support

Nếu gặp vấn đề, kiểm tra:
1. Database migration đã chạy thành công
2. Backend server đang chạy
3. Frontend đã rebuild
4. Browser console có lỗi không
5. Network tab có API call thành công không
