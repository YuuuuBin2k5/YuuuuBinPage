# 📦 Hệ thống Cache & Quản lý State Global

## 🎯 Tính năng

Hệ thống này giúp:

- ✅ **Không tải lại** mỗi khi về trang chủ
- ✅ **Cache dữ liệu** trong 5 phút
- ✅ **Mượt mà hơn** khi chuyển trang
- ✅ **Chia sẻ state** giữa các component

## 🏗️ Cấu trúc

### DataContext (`src/contexts/DataContext.jsx`)

Context chính quản lý:

- **Cache localStorage**: Lưu dữ liệu 5 phút
- **State global**: Chia sẻ projects cho toàn app
- **Smart loading**: Chỉ fetch khi cần

### Cách sử dụng

```jsx
import { useData } from "../contexts/DataContext";

function MyComponent() {
  const { projects, loading, refreshData } = useData();

  // Sử dụng projects từ cache
  // Không cần fetch lại!
}
```

## ⚡ Luồng hoạt động

1. **Lần đầu load app**:

   - Check cache localStorage
   - Nếu không có hoặc hết hạn → Fetch API
   - Lưu vào cache + context

2. **Chuyển trang (Home ↔ Projects)**:

   - Dùng data từ context
   - **KHÔNG fetch lại** API
   - Hiển thị ngay lập tức

3. **Sau 5 phút**:

   - Cache tự động hết hạn
   - Lần load tiếp theo sẽ fetch mới

4. **Khi có thay đổi** (Create/Update/Delete):
   - Gọi `refreshData()` để cập nhật cache
   - Tất cả component tự động refresh

## 🔄 Cache Management

### Thời gian cache

```javascript
const CACHE_DURATION = 5 * 60 * 1000; // 5 phút
```

### Xóa cache thủ công

```javascript
const { clearCache } = useData();
clearCache(); // Xóa cache và force fetch
```

### Force refresh

```javascript
const { refreshData } = useData();
refreshData(); // Bỏ qua cache, fetch mới
```

## 📊 Components đã tối ưu

- ✅ `Home.jsx` - Dùng cached data
- ✅ `FeaturedProjects.jsx` - Dùng context thay vì fetch
- ✅ `MyProject.jsx` - Dùng context + refresh khi có thay đổi

## 🚀 Performance

**Trước khi tối ưu:**

- Mỗi lần về Home: ~500-1000ms (fetch API)
- Chuyển trang: Loading spinner hiện

**Sau khi tối ưu:**

- Lần đầu load: ~500-1000ms (fetch + cache)
- Lần sau về Home: **~0ms** (dùng cache)
- Chuyển trang: **Hiển thị ngay lập tức**

## 💡 Lợi ích

1. **UX tốt hơn**: Không thấy loading mỗi khi chuyển trang
2. **Giảm API calls**: Tiết kiệm bandwidth + server load
3. **Offline-ready**: Data vẫn có khi mất mạng tạm thời
4. **Scalable**: Dễ thêm cache cho exercises, tech stacks...

## 🔧 Mở rộng

Để thêm cache cho data khác:

```javascript
// Trong DataContext.jsx
const [exercises, setExercises] = useState([]);
const [techStacks, setTechStacks] = useState([]);

const fetchExercises = async () => {
  // Similar logic với fetchProjects
};
```

## 📝 Notes

- Cache được lưu trong **localStorage** (persist giữa các sessions)
- Data được share qua **React Context** (global state)
- Auto-refresh sau 5 phút để đảm bảo data mới
- Manual refresh khi có CRUD operations
