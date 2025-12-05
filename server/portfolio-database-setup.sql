-- =============================================
-- Portfolio Database Setup - Complete Schema
-- =============================================

-- =============================================
-- Portfolio Database Setup - Complete Schema
-- =============================================

-- Drop tables if they exist with CASCADE to handle dependencies from old tables
DROP TABLE IF EXISTS exercise_hints CASCADE;
DROP TABLE IF EXISTS exercises CASCADE;
DROP TABLE IF EXISTS week_topics CASCADE;
DROP TABLE IF EXISTS weeks CASCADE;
DROP TABLE IF EXISTS project_tech_stacks CASCADE;
DROP TABLE IF EXISTS tech_stacks CASCADE;
DROP TABLE IF EXISTS projects CASCADE;

-- OPTIONAL: If you want to completely remove the old conflicting tables found in the error log:
DROP TABLE IF EXISTS project_tech CASCADE;
DROP TABLE IF EXISTS project_images CASCADE;
DROP TABLE IF EXISTS project_tasks CASCADE;
DROP TABLE IF EXISTS project_roles CASCADE;
DROP TABLE IF EXISTS links CASCADE;

-- =============================================
-- TECH STACKS TABLE
-- =============================================
CREATE TABLE tech_stacks (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    category VARCHAR(100) NOT NULL,
    icon_url VARCHAR(500),
    color VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- PROJECTS TABLE
-- =============================================
CREATE TABLE projects (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    short_description VARCHAR(500),
    image_url VARCHAR(500),
    demo_url VARCHAR(500),
    github_url VARCHAR(500),
    category VARCHAR(100) NOT NULL,
    status VARCHAR(50) DEFAULT 'completed',
    featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- PROJECT_TECH_STACKS TABLE (Many-to-Many)
-- =============================================
CREATE TABLE project_tech_stacks (
    project_id BIGINT NOT NULL,
    tech_stack_id BIGINT NOT NULL,
    PRIMARY KEY (project_id, tech_stack_id),
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY (tech_stack_id) REFERENCES tech_stacks(id) ON DELETE CASCADE
);

-- =============================================
-- WEEKS TABLE (Learning Weeks)
-- =============================================
CREATE TABLE weeks (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    difficulty VARCHAR(20) NOT NULL DEFAULT 'BEGINNER',
    color VARCHAR(50) DEFAULT 'purple',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- WEEK_TOPICS TABLE (One-to-Many)
-- =============================================
CREATE TABLE week_topics (
    week_id BIGINT NOT NULL,
    topic VARCHAR(255) NOT NULL,
    PRIMARY KEY (week_id, topic),
    FOREIGN KEY (week_id) REFERENCES weeks(id) ON DELETE CASCADE
);

-- =============================================
-- EXERCISES TABLE
-- =============================================
CREATE TABLE exercises (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    difficulty VARCHAR(20) NOT NULL DEFAULT 'BEGINNER',
    category VARCHAR(100) NOT NULL,
    demo_url VARCHAR(500),
    github_url VARCHAR(500),
    estimated_time INT DEFAULT 60,  -- in minutes
    instructions TEXT,
    week_id BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (week_id) REFERENCES weeks(id) ON DELETE SET NULL
);

-- =============================================
-- EXERCISE_HINTS TABLE (One-to-Many)
-- =============================================
CREATE TABLE exercise_hints (
    exercise_id BIGINT NOT NULL,
    hint TEXT NOT NULL,
    PRIMARY KEY (exercise_id, hint),
    FOREIGN KEY (exercise_id) REFERENCES exercises(id) ON DELETE CASCADE
);

-- =============================================
-- INDEXES FOR PERFORMANCE
-- =============================================

-- Projects indexes
CREATE INDEX idx_projects_category ON projects(category);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_featured ON projects(featured);
CREATE INDEX idx_projects_created_at ON projects(created_at);

-- Tech stacks indexes
CREATE INDEX idx_tech_stacks_category ON tech_stacks(category);

-- Weeks indexes
CREATE INDEX idx_weeks_start_date ON weeks(start_date);
CREATE INDEX idx_weeks_difficulty ON weeks(difficulty);

-- Exercises indexes
CREATE INDEX idx_exercises_week_id ON exercises(week_id);
CREATE INDEX idx_exercises_category ON exercises(category);
CREATE INDEX idx_exercises_difficulty ON exercises(difficulty);
CREATE INDEX idx_exercises_created_at ON exercises(created_at);

-- =============================================
-- SAMPLE DATA
-- =============================================

-- Tech Stacks
INSERT INTO tech_stacks (name, category, color) VALUES
('React', 'Frontend', 'blue'),
('TypeScript', 'Language', 'blue'),
('JavaScript', 'Language', 'yellow'),
('HTML5', 'Frontend', 'orange'),
('CSS3', 'Frontend', 'blue'),
('Tailwind CSS', 'Frontend', 'cyan'),
('Node.js', 'Backend', 'green'),
('Express.js', 'Backend', 'gray'),
('PostgreSQL', 'Database', 'blue'),
('MongoDB', 'Database', 'green'),
('Java', 'Language', 'orange'),
('Spring Boot', 'Backend', 'green'),
('Git', 'Tool', 'red'),
('Docker', 'DevOps', 'blue'),
('AWS', 'Cloud', 'orange');

-- Sample Projects
INSERT INTO projects (name, description, category, demo_url, github_url, featured) VALUES
('Portfolio Website', 'Personal portfolio website built with React and Spring Boot', 'Full Stack', 'https://portfolio-demo.com', 'https://github.com/user/portfolio', true),
('E-commerce App', 'Full-stack e-commerce application with user authentication', 'Full Stack', 'https://ecommerce-demo.com', 'https://github.com/user/ecommerce', true),
('Weather App', 'React weather application using OpenWeather API', 'Frontend', 'https://weather-demo.com', 'https://github.com/user/weather-app', false),
('Task Manager API', 'RESTful API for task management built with Spring Boot', 'Backend', null, 'https://github.com/user/task-api', false);

-- Link projects with tech stacks
INSERT INTO project_tech_stacks (project_id, tech_stack_id) VALUES
-- Portfolio Website
(1, 1), (1, 2), (1, 6), (1, 11), (1, 12), (1, 9),
-- E-commerce App  
(2, 1), (2, 3), (2, 6), (2, 7), (2, 8), (2, 10),
-- Weather App
(3, 1), (3, 3), (3, 4), (3, 5),
-- Task Manager API
(4, 11), (4, 12), (4, 9);

-- Sample Weeks
INSERT INTO weeks (title, description, start_date, end_date, difficulty, color) VALUES
('Tuần 1: HTML & CSS Cơ Bản', 'Học cơ bản về HTML và CSS, tạo layout đầu tiên', '2024-01-01', '2024-01-07', 'BEGINNER', 'blue'),
('Tuần 2: JavaScript Fundamentals', 'Nắm vững các khái niệm cơ bản của JavaScript', '2024-01-08', '2024-01-14', 'BEGINNER', 'emerald'),
('Tuần 3: DOM Manipulation', 'Thao tác với DOM và tương tác người dùng', '2024-01-15', '2024-01-21', 'INTERMEDIATE', 'amber'),
('Tuần 4: React Cơ Bản', 'Giới thiệu React và tạo component đầu tiên', '2024-01-22', '2024-01-28', 'INTERMEDIATE', 'purple'),
('Tuần 5: React Hooks & State', 'Học về React Hooks và quản lý state', '2024-01-29', '2024-02-04', 'INTERMEDIATE', 'purple'),
('Tuần 6: Backend với Spring Boot', 'Xây dựng API với Java Spring Boot', '2024-02-05', '2024-02-11', 'ADVANCED', 'green');

-- Week Topics
INSERT INTO week_topics (week_id, topic) VALUES
-- Week 1
(1, 'HTML Structure'), (1, 'CSS Styling'), (1, 'Responsive Design'),
-- Week 2
(2, 'Variables & Functions'), (2, 'Arrays & Objects'), (2, 'Control Structures'),
-- Week 3
(3, 'DOM Selection'), (3, 'Event Handling'), (3, 'Dynamic Content'),
-- Week 4
(4, 'JSX'), (4, 'Components'), (4, 'Props & State'),
-- Week 5
(5, 'useState'), (5, 'useEffect'), (5, 'Custom Hooks'),
-- Week 6
(6, 'REST APIs'), (6, 'JPA'), (6, 'Database Integration');

-- Sample Exercises
INSERT INTO exercises (title, description, difficulty, category, demo_url, github_url, estimated_time, instructions, week_id) VALUES
('Tạo Landing Page Đầu Tiên', 'Xây dựng một landing page đơn giản với HTML và CSS', 'BEGINNER', 'Frontend', 'https://example.com/landing', 'https://github.com/user/landing-page', 120, 
'1. Tạo file HTML cơ bản
2. Thêm CSS styling
3. Làm responsive
4. Tối ưu hóa', 1),

('CSS Grid Layout Practice', 'Thực hành tạo layout với CSS Grid', 'BEGINNER', 'Frontend', 'https://example.com/grid', 'https://github.com/user/css-grid', 90,
'1. Tạo HTML structure
2. Áp dụng CSS Grid
3. Tạo responsive layout
4. Test trên nhiều device', 1),

('Calculator App với Vanilla JS', 'Tạo ứng dụng máy tính đơn giản bằng JavaScript thuần', 'INTERMEDIATE', 'Frontend', 'https://example.com/calculator', 'https://github.com/user/calculator', 180, 
'1. Thiết kế UI máy tính
2. Xử lý sự kiện click
3. Thực hiện các phép tính
4. Xử lý lỗi', 2),

('Todo List với Local Storage', 'Ứng dụng quản lý công việc với khả năng lưu trữ cục bộ', 'INTERMEDIATE', 'Frontend', 'https://example.com/todo', 'https://github.com/user/todo-app', 150, 
'1. Tạo form thêm task
2. Hiển thị danh sách
3. Chỉnh sửa/xóa task
4. Lưu vào localStorage', 3),

('React Counter Component', 'Tạo component đếm số đơn giản với React Hooks', 'BEGINNER', 'Frontend', 'https://example.com/counter', 'https://github.com/user/react-counter', 90, 
'1. Setup React app
2. Tạo Counter component
3. Sử dụng useState
4. Thêm styling', 4),

('Shopping Cart với React', 'Xây dựng giỏ hàng với React và Context API', 'INTERMEDIATE', 'Frontend', 'https://example.com/cart', 'https://github.com/user/shopping-cart', 200,
'1. Tạo CartContext
2. Implement add/remove items
3. Calculate total
4. Persist với localStorage', 5),

('REST API với Spring Boot', 'Tạo API đầy đủ CRUD operations', 'ADVANCED', 'Backend', null, 'https://github.com/user/spring-api', 240,
'1. Setup Spring Boot project
2. Tạo Entity và Repository
3. Implement Controller
4. Test với Postman', 6);

-- Exercise Hints
INSERT INTO exercise_hints (exercise_id, hint) VALUES
-- Landing Page
(1, 'Sử dụng flexbox để căn chỉnh layout'),
(1, 'Áp dụng mobile-first approach cho responsive'),
(1, 'Sử dụng CSS Grid cho layout phức tạp'),

-- CSS Grid
(2, 'grid-template-areas giúp tạo layout trực quan'),
(2, 'Sử dụng fr unit để chia tỷ lệ'),
(2, 'gap property để tạo khoảng cách'),

-- Calculator
(3, 'Sử dụng eval() cẩn thận, tốt hơn là tự parse'),
(3, 'Xử lý phép chia cho 0'),
(3, 'Sử dụng regex để validate input'),

-- Todo List
(4, 'Sử dụng JSON.stringify/parse cho localStorage'),
(4, 'Thêm unique ID cho mỗi task'),
(4, 'Sử dụng event delegation cho danh sách động'),

-- React Counter
(5, 'useState trả về [state, setState]'),
(5, 'setState là async function'),
(5, 'Sử dụng functional update khi cần previous state'),

-- Shopping Cart
(6, 'useContext để share state giữa components'),
(6, 'useReducer cho complex state logic'),
(6, 'useMemo để optimize expensive calculations'),

-- Spring Boot API
(7, '@RestController để tạo REST endpoints'),
(7, '@RequestMapping để define base path'),
(7, 'ResponseEntity để control HTTP response');

-- =============================================
-- SUCCESS MESSAGE
-- =============================================
DO $$
BEGIN
    RAISE NOTICE 'Portfolio database setup completed successfully!';
    RAISE NOTICE 'Tables created: tech_stacks, projects, project_tech_stacks, weeks, week_topics, exercises, exercise_hints';
    RAISE NOTICE 'Sample data inserted for all tables';
END $$;