# Database Setup - FINAL VERSION

## 📌 Sử dụng file nào?

**File chính thức:** `database-setup-final.sql`

## 🚀 Hướng dẫn setup

### 1. Tạo database

```bash
# Kết nối PostgreSQL
psql -U postgres

# Tạo database
CREATE DATABASE portfolio;

# Thoát
\q
```

### 2. Chạy script setup

```bash
psql -U postgres -d portfolio -f database-setup-final.sql
```

Hoặc từ trong psql:

```sql
\c portfolio
\i database-setup-final.sql
```

### 3. Kiểm tra

```sql
-- Xem danh sách tables
\dt

-- Xem dữ liệu mẫu
SELECT * FROM tech_stacks;
SELECT * FROM projects;
SELECT * FROM weeks;
SELECT * FROM exercises;
```

## 📊 Database Schema

### Tables

1. **tech_stacks** - Công nghệ/tools (21 records mẫu)

   - HTML5, CSS3, JavaScript, React, Tailwind
   - Java, Spring Boot, JSP, JSTL, JPA
   - PostgreSQL, MySQL, MongoDB, SQL
   - Git, Docker, Maven, Postman

2. **projects** - Dự án (5 records mẫu)

   - Portfolio Website
   - E-commerce Platform
   - Weather Dashboard
   - Task Manager API
   - Blog System

3. **project_tech_stacks** - Liên kết projects ↔ tech_stacks

4. **weeks** - Tuần học (8 tuần)

   - HTML & CSS → JavaScript → DOM
   - Java Core → Servlet/JSP → Database
   - JPA → Spring Boot

5. **week_topics** - Topics trong mỗi tuần (40 topics)

6. **exercises** - Bài tập (14 exercises)

   - Landing Page, Calculator, Todo List
   - Student Management, Contact Manager
   - Blog System, REST API

7. **exercise_hints** - Gợi ý cho bài tập

## ⚠️ Lưu ý

- **projects table** có cả `title` và `name` để đảm bảo tương thích
- **exercises table** có `image_url` để hiển thị thumbnail
- Tất cả foreign keys có `ON DELETE CASCADE` hoặc `SET NULL` phù hợp
- Đã thêm indexes cho performance
- Sample data phản ánh đúng tech stack: Java, JSP, JSTL, JPA, SQL

## 🗑️ Files cũ (không dùng nữa)

- `portfolio-database-setup.sql` - Version cũ thiếu `title` field
- `fix-projects-table.sql` - Fix lỗi cũ, đã merge vào final version

## ✅ Checklist

- [x] Schema đầy đủ với tất cả tables
- [x] Foreign keys và relationships đúng
- [x] Indexes cho performance
- [x] Sample data phong phú và realistic
- [x] Projects có cả `title` và `name`
- [x] Exercises có `image_url`
- [x] Tech stacks bao gồm Java backend stack
- [x] 8 tuần học từ cơ bản đến nâng cao
- [x] 14 bài tập thực hành đa dạng
