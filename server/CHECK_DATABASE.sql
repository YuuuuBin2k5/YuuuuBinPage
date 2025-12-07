-- =====================================================
-- SCRIPT KIỂM TRA DATABASE - MULTIPLE IMAGES FEATURE
-- =====================================================

-- 1. Kiểm tra bảng đã tạo chưa
SHOW TABLES LIKE '%_images';

-- 2. Kiểm tra cấu trúc bảng exercise_images
DESCRIBE exercise_images;

-- 3. Kiểm tra cấu trúc bảng project_images
DESCRIBE project_images;

-- 4. Đếm tổng số ảnh
SELECT 
  'Exercise Images' AS type,
  COUNT(*) AS total_count
FROM exercise_images
UNION ALL
SELECT 
  'Project Images' AS type,
  COUNT(*) AS total_count
FROM project_images;

-- 5. Xem 10 ảnh exercise mới nhất
SELECT 
  ei.id,
  ei.exercise_id,
  e.title AS exercise_title,
  ei.image_url,
  ei.display_order,
  ei.caption,
  ei.created_at
FROM exercise_images ei
LEFT JOIN exercises e ON ei.exercise_id = e.id
ORDER BY ei.created_at DESC
LIMIT 10;

-- 6. Xem 10 ảnh project mới nhất
SELECT 
  pi.id,
  pi.project_id,
  p.title AS project_title,
  pi.image_url,
  pi.display_order,
  pi.caption,
  pi.created_at
FROM project_images pi
LEFT JOIN projects p ON pi.project_id = p.project_id
ORDER BY pi.created_at DESC
LIMIT 10;

-- 7. Đếm số ảnh cho mỗi exercise
SELECT 
  e.id,
  e.title,
  COUNT(ei.id) AS image_count,
  GROUP_CONCAT(ei.image_url ORDER BY ei.display_order SEPARATOR '\n') AS image_urls
FROM exercises e
LEFT JOIN exercise_images ei ON e.id = ei.exercise_id
GROUP BY e.id, e.title
HAVING image_count > 0
ORDER BY image_count DESC, e.created_at DESC
LIMIT 20;

-- 8. Đếm số ảnh cho mỗi project
SELECT 
  p.project_id,
  p.title,
  COUNT(pi.id) AS image_count,
  GROUP_CONCAT(pi.image_url ORDER BY pi.display_order SEPARATOR '\n') AS image_urls
FROM projects p
LEFT JOIN project_images pi ON p.project_id = pi.project_id
GROUP BY p.project_id, p.title
HAVING image_count > 0
ORDER BY image_count DESC, p.created_at DESC
LIMIT 20;

-- 9. Tìm exercises KHÔNG có ảnh
SELECT 
  e.id,
  e.title,
  e.created_at
FROM exercises e
LEFT JOIN exercise_images ei ON e.id = ei.exercise_id
WHERE ei.id IS NULL
ORDER BY e.created_at DESC
LIMIT 10;

-- 10. Tìm projects KHÔNG có ảnh
SELECT 
  p.project_id,
  p.title,
  p.created_at
FROM projects p
LEFT JOIN project_images pi ON p.project_id = pi.project_id
WHERE pi.id IS NULL
ORDER BY p.created_at DESC
LIMIT 10;

-- 11. Thống kê số lượng ảnh
SELECT 
  'Exercises' AS type,
  COUNT(DISTINCT e.id) AS total_items,
  COUNT(ei.id) AS total_images,
  ROUND(AVG(img_per_item), 2) AS avg_images_per_item,
  MAX(img_per_item) AS max_images,
  MIN(img_per_item) AS min_images
FROM exercises e
LEFT JOIN exercise_images ei ON e.id = ei.exercise_id
LEFT JOIN (
  SELECT exercise_id, COUNT(*) AS img_per_item
  FROM exercise_images
  GROUP BY exercise_id
) counts ON e.id = counts.exercise_id

UNION ALL

SELECT 
  'Projects' AS type,
  COUNT(DISTINCT p.project_id) AS total_items,
  COUNT(pi.id) AS total_images,
  ROUND(AVG(img_per_item), 2) AS avg_images_per_item,
  MAX(img_per_item) AS max_images,
  MIN(img_per_item) AS min_images
FROM projects p
LEFT JOIN project_images pi ON p.project_id = pi.project_id
LEFT JOIN (
  SELECT project_id, COUNT(*) AS img_per_item
  FROM project_images
  GROUP BY project_id
) counts ON p.project_id = counts.project_id;

-- 12. Kiểm tra foreign key constraints
SELECT 
  TABLE_NAME,
  CONSTRAINT_NAME,
  COLUMN_NAME,
  REFERENCED_TABLE_NAME,
  REFERENCED_COLUMN_NAME
FROM information_schema.KEY_COLUMN_USAGE
WHERE TABLE_SCHEMA = DATABASE()
  AND TABLE_NAME IN ('exercise_images', 'project_images')
  AND REFERENCED_TABLE_NAME IS NOT NULL;

-- 13. Kiểm tra indexes
SELECT 
  TABLE_NAME,
  INDEX_NAME,
  COLUMN_NAME,
  SEQ_IN_INDEX,
  INDEX_TYPE
FROM information_schema.STATISTICS
WHERE TABLE_SCHEMA = DATABASE()
  AND TABLE_NAME IN ('exercise_images', 'project_images')
ORDER BY TABLE_NAME, INDEX_NAME, SEQ_IN_INDEX;

-- 14. Xem chi tiết 1 exercise với tất cả ảnh (thay ID)
SELECT 
  e.id AS exercise_id,
  e.title,
  e.description,
  e.difficulty,
  e.category,
  ei.id AS image_id,
  ei.image_url,
  ei.display_order,
  ei.caption,
  ei.created_at AS image_created_at
FROM exercises e
LEFT JOIN exercise_images ei ON e.id = ei.exercise_id
WHERE e.id = 1  -- THAY ĐỔI ID NÀY
ORDER BY ei.display_order;

-- 15. Xem chi tiết 1 project với tất cả ảnh (thay ID)
SELECT 
  p.project_id,
  p.title,
  p.description,
  p.category,
  p.status,
  pi.id AS image_id,
  pi.image_url,
  pi.display_order,
  pi.caption,
  pi.created_at AS image_created_at
FROM projects p
LEFT JOIN project_images pi ON p.project_id = pi.project_id
WHERE p.project_id = 1  -- THAY ĐỔI ID NÀY
ORDER BY pi.display_order;

-- 16. Tìm ảnh bị duplicate (cùng URL)
SELECT 
  image_url,
  COUNT(*) AS count,
  GROUP_CONCAT(DISTINCT exercise_id) AS exercise_ids
FROM exercise_images
GROUP BY image_url
HAVING count > 1;

SELECT 
  image_url,
  COUNT(*) AS count,
  GROUP_CONCAT(DISTINCT project_id) AS project_ids
FROM project_images
GROUP BY image_url
HAVING count > 1;

-- 17. Kiểm tra display_order có đúng không (phải liên tục 0,1,2,...)
SELECT 
  exercise_id,
  GROUP_CONCAT(display_order ORDER BY display_order) AS orders,
  COUNT(*) AS image_count
FROM exercise_images
GROUP BY exercise_id
HAVING image_count > 1;

SELECT 
  project_id,
  GROUP_CONCAT(display_order ORDER BY display_order) AS orders,
  COUNT(*) AS image_count
FROM project_images
GROUP BY project_id
HAVING image_count > 1;

-- 18. Xóa tất cả ảnh của 1 exercise (CẢNH BÁO: Thay ID trước khi chạy!)
-- DELETE FROM exercise_images WHERE exercise_id = 999;

-- 19. Xóa tất cả ảnh của 1 project (CẢNH BÁO: Thay ID trước khi chạy!)
-- DELETE FROM project_images WHERE project_id = 999;

-- 20. Backup data trước khi xóa cột cũ
-- CREATE TABLE exercise_images_backup AS SELECT * FROM exercise_images;
-- CREATE TABLE project_images_backup AS SELECT * FROM project_images;

-- =====================================================
-- KẾT THÚC SCRIPT KIỂM TRA
-- =====================================================
