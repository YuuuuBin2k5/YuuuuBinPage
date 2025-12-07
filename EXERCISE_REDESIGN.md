# 🎨 Thiết Kế Mới - Trang Bài Tập

## 📋 Tổng Quan

Redesign hoàn toàn trang Bài Tập với layout **Sidebar + Main Content** để dễ navigation và hiển thị thông tin rõ ràng hơn.

## 🎯 Yêu Cầu Đã Thực Hiện

### ✅ **1. Nhìn Thấy Rõ Các Tuần**

- **Sidebar Timeline** (bên trái): Hiển thị tất cả các tuần học
- Click vào tuần → Xem bài tập của tuần đó
- Highlight tuần đang chọn với gradient purple-pink
- Hiển thị số lượng bài tập của mỗi tuần

### ✅ **2. Thông Tin Bài Tập Đầy Đủ**

Mỗi bài tập hiển thị:

- ✨ **Ảnh preview lớn** (280x224px)
- 📝 **Tiêu đề & mô tả** rõ ràng
- 🎯 **Độ khó** (Easy/Medium/Hard) với màu gradient
- 🏷️ **Category** (HTML/CSS/JS/React...)
- ⏱️ **Thời gian ước tính**
- 💡 **Gợi ý** (có thể mở rộng xem chi tiết)
- 🔗 **Links**: Demo + GitHub

### ✅ **3. Sáng Tạo & Bắt Mắt**

#### **Design Elements:**

- **Gradient overlays** trên images
- **Hover effects** mượt mà với scale & glow
- **Color-coded badges** cho difficulty & category
- **Animation** slideUp khi load
- **Glassmorphism** với backdrop blur
- **Custom scrollbar** với gradient

#### **Color Scheme:**

```
- Purple (#a855f7) → Pink (#ec4899) gradients
- Emerald cho Easy
- Amber cho Medium
- Red cho Hard
- Specific colors cho từng category
```

## 🏗️ Cấu Trúc Layout

### **Desktop (>1024px):**

```
┌─────────────────────────────────────────┐
│           Header & Title                │
├──────────┬──────────────────────────────┤
│  Sidebar │     Main Content             │
│          │                              │
│  Week 1  │   ┌────────────────────┐   │
│  Week 2  │   │  Exercise Card 1   │   │
│  Week 3  │   │  [Image + Info]    │   │
│  Week 4  │   └────────────────────┘   │
│  ...     │                              │
│          │   ┌────────────────────┐   │
│ (Sticky) │   │  Exercise Card 2   │   │
│          │   └────────────────────┘   │
└──────────┴──────────────────────────────┘
```

### **Mobile (<1024px):**

```
┌─────────────────────────┐
│    Header & Title       │
├─────────────────────────┤
│  📱 Week Dropdown       │
├─────────────────────────┤
│  ┌───────────────────┐ │
│  │ Exercise Card 1   │ │
│  │  [Full Width]     │ │
│  └───────────────────┘ │
│  ┌───────────────────┐ │
│  │ Exercise Card 2   │ │
│  └───────────────────┘ │
└─────────────────────────┘
```

## 🎨 Exercise Card Components

### **Layout:**

```
┌─────────────────────────────────────────────┐
│  [Image Preview]  │  Title & Info           │
│   280x224px       │  ┌──────────────────┐  │
│   - Hover scale   │  │ Category Badge   │  │
│   - Gradient      │  │ Difficulty Badge │  │
│   - Lazy load     │  │ Time Badge       │  │
│                   │  └──────────────────┘  │
│                   │  Description...        │
│                   │  [Demo] [GitHub]       │
│                   │  💡 X gợi ý có sẵn    │
│                   │  [Xem gợi ý ▼]        │
└─────────────────────────────────────────────┘
│ [Expanded Hints - Optional]                 │
│ 1. Hint text here...                        │
│ 2. Another hint...                          │
└─────────────────────────────────────────────┘
```

### **Interactive Features:**

1. **Hover Effects:**

   - Image scale 110%
   - Card border glow
   - Title gradient transition
   - Shadow intensify

2. **Expandable Hints:**

   - Click để xem/ẩn gợi ý
   - Smooth expand animation
   - Numbered hints với gradient badges

3. **Image Handling:**
   - Lazy loading
   - Fallback placeholder nếu không có ảnh
   - Error handling

## 📱 Responsive Behavior

### **Desktop (≥1024px):**

- Sidebar fixed bên trái (sticky)
- Main content flex-grow
- Cards hiển thị full info

### **Tablet (768-1023px):**

- Dropdown thay sidebar
- Cards vẫn hiển thị full
- Image resize responsive

### **Mobile (<768px):**

- Dropdown selector
- Cards stack vertically
- Image full width
- Touch-friendly buttons

## 🎭 Animations

### **Page Load:**

```css
@keyframes slideUp {
  from: opacity 0, translateY(30px)
  to: opacity 1, translateY(0)
}
```

- Stagger delay: index \* 0.1s

### **Hover:**

- Transform: scale(1.01)
- Glow effect: opacity 0 → 0.2
- Duration: 500ms

### **Click:**

- Week selection: highlight animation
- Expand hints: height auto transition

## 🎨 Color Palette

### **Difficulty:**

- **Easy**: `from-emerald-500 to-green-500`
- **Medium**: `from-amber-500 to-orange-500`
- **Hard**: `from-red-500 to-rose-500`

### **Categories:**

- **HTML**: Orange (#f97316)
- **CSS**: Blue (#3b82f6)
- **JavaScript**: Yellow (#eab308)
- **React**: Cyan (#06b6d4)
- **Backend**: Green (#22c55e)
- **Fullstack**: Purple (#a855f7)

### **UI Elements:**

- **Primary**: Purple → Pink gradient
- **Background**: Slate-900/800
- **Border**: Slate-700 with transparency
- **Text**: White/Slate-300/400

## 🚀 Performance

### **Optimizations:**

1. **React.memo** cho ExerciseCard
2. **useMemo** cho filtered exercises
3. **Lazy loading** images
4. **CSS will-change** cho animations
5. **Stagger animations** để tránh jank

### **Loading States:**

- Skeleton screens (future)
- Progressive image loading
- Smooth transitions

## 💡 User Experience

### **For Students:**

1. Chọn tuần từ sidebar/dropdown
2. Scroll xem các bài tập
3. Click xem gợi ý nếu cần
4. Click Demo/GitHub để xem chi tiết

### **For Teachers:**

1. Nhìn tổng quan tất cả tuần
2. Thấy rõ số bài tập mỗi tuần
3. Click vào tuần để xem chi tiết
4. Dễ đánh giá tiến độ học sinh

## 📊 Benefits

### **Trước khi redesign:**

- ❌ Phải expand từng tuần
- ❌ Bài tập hiển thị nhỏ, thiếu thông tin
- ❌ Không có ảnh
- ❌ Khó navigation

### **Sau khi redesign:**

- ✅ Sidebar navigation rõ ràng
- ✅ Bài tập hiển thị full info + ảnh lớn
- ✅ Dễ so sánh các tuần
- ✅ Mobile-friendly
- ✅ Bắt mắt, chuyên nghiệp

## 🎯 Future Enhancements

1. **Filter & Search:**

   - Filter by difficulty
   - Filter by category
   - Search exercises

2. **Progress Tracking:**

   - Mark completed exercises
   - Show progress percentage
   - Streak counter

3. **Interactive Features:**

   - Rating system
   - Comments
   - Solutions sharing

4. **Admin Features:**
   - Drag & drop reorder
   - Bulk operations
   - Analytics dashboard
