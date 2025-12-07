-- =============================================
-- Portfolio Database Setup - FINAL VERSION
-- =============================================
-- This is the definitive database schema for the portfolio project
-- Last updated: 2025-12-07

-- =============================================
-- DROP EXISTING TABLES
-- =============================================
DROP TABLE IF EXISTS exercise_hints CASCADE;
DROP TABLE IF EXISTS exercises CASCADE;
DROP TABLE IF EXISTS week_topics CASCADE;
DROP TABLE IF EXISTS weeks CASCADE;
DROP TABLE IF EXISTS project_tech_stacks CASCADE;
DROP TABLE IF EXISTS tech_stacks CASCADE;
DROP TABLE IF EXISTS projects CASCADE;

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
    title VARCHAR(255) NOT NULL,                -- Title field (required)
    name VARCHAR(255) NOT NULL,                 -- Name field (kept for compatibility)
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
    color VARCHAR(50) DEFAULT 'blue',
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
    image_url VARCHAR(500),                     -- Added image field
    estimated_time INT DEFAULT 60,              -- in minutes
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
    id BIGSERIAL PRIMARY KEY,
    exercise_id BIGINT NOT NULL,
    hint TEXT NOT NULL,
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
CREATE INDEX idx_tech_stacks_name ON tech_stacks(name);

-- Weeks indexes
CREATE INDEX idx_weeks_start_date ON weeks(start_date);
CREATE INDEX idx_weeks_difficulty ON weeks(difficulty);

-- Exercises indexes
CREATE INDEX idx_exercises_week_id ON exercises(week_id);
CREATE INDEX idx_exercises_category ON exercises(category);
CREATE INDEX idx_exercises_difficulty ON exercises(difficulty);
CREATE INDEX idx_exercises_created_at ON exercises(created_at);

-- =============================================
-- SAMPLE DATA - TECH STACKS
-- =============================================
INSERT INTO tech_stacks (name, category, color) VALUES
-- Frontend
('HTML5', 'Frontend', 'orange'),
('CSS3', 'Frontend', 'blue'),
('JavaScript', 'Frontend', 'yellow'),
('React', 'Frontend', 'cyan'),
('Tailwind CSS', 'Frontend', 'cyan'),
('Bootstrap', 'Frontend', 'purple'),
-- Backend
('Java', 'Backend', 'red'),
('Spring Boot', 'Backend', 'green'),
('JSP', 'Backend', 'purple'),
('JSTL', 'Backend', 'pink'),
('JPA', 'Backend', 'green'),
('Node.js', 'Backend', 'green'),
('Express.js', 'Backend', 'gray'),
-- Database
('PostgreSQL', 'Database', 'blue'),
('MySQL', 'Database', 'blue'),
('MongoDB', 'Database', 'green'),
('SQL', 'Database', 'cyan'),
-- Tools
('Git', 'Tool', 'red'),
('Docker', 'DevOps', 'blue'),
('Maven', 'Tool', 'red'),
('Postman', 'Tool', 'orange');

-- =============================================
-- SAMPLE DATA - PROJECTS
-- =============================================
INSERT INTO projects (title, name, description, short_description, category, demo_url, github_url, featured, image_url) VALUES
('Portfolio Website', 'portfolio-website', 'Personal portfolio website với React frontend và Spring Boot backend. Hiển thị projects, exercises và tech skills.', 'Full-stack portfolio với React + Spring Boot', 'Full Stack', 'https://portfolio-demo.com', 'https://github.com/user/portfolio', true, 'https://via.placeholder.com/600x400'),
('E-commerce Platform', 'ecommerce-app', 'Hệ thống thương mại điện tử đầy đủ với giỏ hàng, thanh toán, quản lý đơn hàng. Sử dụng React, Spring Boot và PostgreSQL.', 'Full-stack e-commerce với tích hợp payment', 'Full Stack', 'https://ecommerce-demo.com', 'https://github.com/user/ecommerce', true, 'https://via.placeholder.com/600x400'),
('Weather Dashboard', 'weather-app', 'Ứng dụng thời tiết sử dụng OpenWeather API, hiển thị dự báo theo giờ và 7 ngày. Built với React và Tailwind CSS.', 'Weather app với React và API integration', 'Frontend', 'https://weather-demo.com', 'https://github.com/user/weather', false, 'https://via.placeholder.com/600x400'),
('Task Manager API', 'task-api', 'RESTful API cho quản lý công việc với Spring Boot, JPA và PostgreSQL. Bao gồm authentication và authorization.', 'REST API với Spring Boot + JPA', 'Backend', null, 'https://github.com/user/task-api', false, null),
('Blog System', 'blog-system', 'Hệ thống blog với JSP, JSTL, Servlet. Quản lý bài viết, categories, comments và users.', 'Blog system với JSP/Servlet', 'Full Stack', null, 'https://github.com/user/blog', false, null);

-- =============================================
-- SAMPLE DATA - PROJECT TECH STACKS
-- =============================================
-- Portfolio Website (1): React, JavaScript, Tailwind, Java, Spring Boot, PostgreSQL
INSERT INTO project_tech_stacks (project_id, tech_stack_id) VALUES (1, 4), (1, 3), (1, 5), (1, 7), (1, 8), (1, 14);

-- E-commerce (2): React, JavaScript, Bootstrap, Node.js, Express, MongoDB
INSERT INTO project_tech_stacks (project_id, tech_stack_id) VALUES (2, 4), (2, 3), (2, 6), (2, 12), (2, 13), (2, 16);

-- Weather App (3): React, JavaScript, Tailwind, HTML5, CSS3
INSERT INTO project_tech_stacks (project_id, tech_stack_id) VALUES (3, 4), (3, 3), (3, 5), (3, 1), (3, 2);

-- Task API (4): Java, Spring Boot, JPA, PostgreSQL
INSERT INTO project_tech_stacks (project_id, tech_stack_id) VALUES (4, 7), (4, 8), (4, 11), (4, 14);

-- Blog System (5): Java, JSP, JSTL, MySQL
INSERT INTO project_tech_stacks (project_id, tech_stack_id) VALUES (5, 7), (5, 9), (5, 10), (5, 15);

-- =============================================
-- SAMPLE DATA - WEEKS
-- =============================================
INSERT INTO weeks (title, description, start_date, end_date, difficulty, color) VALUES
('Tuần 1: HTML & CSS Cơ Bản', 'Học cơ bản về HTML5 và CSS3, tạo layout responsive đầu tiên. Làm quen với semantic HTML và CSS Flexbox/Grid.', '2024-01-01', '2024-01-07', 'EASY', 'orange'),
('Tuần 2: JavaScript Fundamentals', 'Nắm vững các khái niệm cơ bản của JavaScript: variables, functions, arrays, objects, và control flow.', '2024-01-08', '2024-01-14', 'EASY', 'yellow'),
('Tuần 3: DOM Manipulation & Events', 'Thao tác với DOM, xử lý events, và tạo tương tác người dùng động. AJAX và Fetch API.', '2024-01-15', '2024-01-21', 'MEDIUM', 'blue'),
('Tuần 4: Java Core & OOP', 'Lập trình Java cơ bản, OOP principles, classes, objects, inheritance và polymorphism.', '2024-01-22', '2024-01-28', 'MEDIUM', 'red'),
('Tuần 5: Servlet & JSP', 'Xây dựng web application với Java Servlet, JSP, và JSTL. Session management và form handling.', '2024-01-29', '2024-02-04', 'MEDIUM', 'purple'),
('Tuần 6: Database & JDBC', 'Làm việc với SQL, PostgreSQL/MySQL, và JDBC. Thiết kế database, queries, và transactions.', '2024-02-05', '2024-02-11', 'MEDIUM', 'cyan'),
('Tuần 7: JPA & Hibernate', 'Object-Relational Mapping với JPA và Hibernate. Entity relationships, JPQL, và best practices.', '2024-02-12', '2024-02-18', 'HARD', 'green'),
('Tuần 8: Spring Boot Basics', 'Giới thiệu Spring Boot framework. Dependency Injection, REST APIs, và project structure.', '2024-02-19', '2024-02-25', 'HARD', 'green');

-- =============================================
-- SAMPLE DATA - WEEK TOPICS
-- =============================================
-- Week 1: HTML & CSS
INSERT INTO week_topics (week_id, topic) VALUES 
(1, 'HTML5 Semantic Tags'), (1, 'CSS Flexbox'), (1, 'CSS Grid'), (1, 'Responsive Design'), (1, 'Media Queries');

-- Week 2: JavaScript
INSERT INTO week_topics (week_id, topic) VALUES 
(2, 'Variables & Data Types'), (2, 'Functions'), (2, 'Arrays & Objects'), (2, 'Loops & Conditionals'), (2, 'ES6+ Features');

-- Week 3: DOM & Events
INSERT INTO week_topics (week_id, topic) VALUES 
(3, 'DOM Selection'), (3, 'Event Handling'), (3, 'Dynamic Content'), (3, 'AJAX'), (3, 'Fetch API');

-- Week 4: Java Core
INSERT INTO week_topics (week_id, topic) VALUES 
(4, 'Classes & Objects'), (4, 'Inheritance'), (4, 'Polymorphism'), (4, 'Interfaces'), (4, 'Exception Handling');

-- Week 5: Servlet & JSP
INSERT INTO week_topics (week_id, topic) VALUES 
(5, 'Servlet Lifecycle'), (5, 'Request/Response'), (5, 'JSP Syntax'), (5, 'JSTL Tags'), (5, 'Session Management');

-- Week 6: Database
INSERT INTO week_topics (week_id, topic) VALUES 
(6, 'SQL Basics'), (6, 'CRUD Operations'), (6, 'Joins'), (6, 'JDBC Connection'), (6, 'Prepared Statements');

-- Week 7: JPA
INSERT INTO week_topics (week_id, topic) VALUES 
(7, 'Entity Mapping'), (7, 'Relationships'), (7, 'JPQL'), (7, 'Entity Manager'), (7, 'Transactions');

-- Week 8: Spring Boot
INSERT INTO week_topics (week_id, topic) VALUES 
(8, 'Spring IoC'), (8, 'REST Controllers'), (8, 'Dependency Injection'), (8, 'Spring Data JPA'), (8, 'Configuration');

-- =============================================
-- SAMPLE DATA - EXERCISES
-- =============================================
INSERT INTO exercises (title, description, difficulty, category, demo_url, github_url, estimated_time, week_id, image_url) VALUES
-- Week 1: HTML & CSS
('Landing Page Responsive', 'Tạo landing page responsive với HTML5 và CSS3. Sử dụng Flexbox/Grid, media queries, và modern CSS features.', 'EASY', 'HTML/CSS', 'https://example.com/landing', 'https://github.com/user/landing-page', 120, 1, 'https://via.placeholder.com/400x300'),
('Portfolio Layout', 'Xây dựng layout portfolio với header, hero section, projects grid, và footer. Hoàn toàn responsive.', 'EASY', 'HTML/CSS', 'https://example.com/portfolio-layout', 'https://github.com/user/portfolio-layout', 150, 1, 'https://via.placeholder.com/400x300'),

-- Week 2: JavaScript
('Calculator App', 'Tạo ứng dụng máy tính với JavaScript. Xử lý các phép tính cơ bản, validation input, và UI interaction.', 'EASY', 'JavaScript', 'https://example.com/calculator', 'https://github.com/user/calculator', 180, 2, 'https://via.placeholder.com/400x300'),
('Quiz Application', 'Ứng dụng quiz với multiple choice, timer, score tracking. Sử dụng arrays và objects.', 'MEDIUM', 'JavaScript', 'https://example.com/quiz', 'https://github.com/user/quiz-app', 200, 2, 'https://via.placeholder.com/400x300'),

-- Week 3: DOM & Events
('Todo List với LocalStorage', 'Todo app với CRUD operations, localStorage persistence, và drag-and-drop sorting.', 'MEDIUM', 'JavaScript', 'https://example.com/todo', 'https://github.com/user/todo-app', 180, 3, 'https://via.placeholder.com/400x300'),
('Image Gallery với Fetch API', 'Gallery ảnh fetch từ API, với lightbox, filtering, và lazy loading.', 'MEDIUM', 'JavaScript', 'https://example.com/gallery', 'https://github.com/user/image-gallery', 200, 3, 'https://via.placeholder.com/400x300'),

-- Week 4: Java Core
('Student Management System', 'Hệ thống quản lý sinh viên với Java OOP. Classes, inheritance, file I/O.', 'MEDIUM', 'Java', null, 'https://github.com/user/student-mgmt', 240, 4, null),
('Library Management', 'Quản lý thư viện với books, members, borrowing. Áp dụng OOP principles.', 'MEDIUM', 'Java', null, 'https://github.com/user/library-mgmt', 300, 4, null),

-- Week 5: Servlet & JSP
('User Registration & Login', 'Hệ thống đăng ký/đăng nhập với Servlet, JSP, session management.', 'MEDIUM', 'Java Web', null, 'https://github.com/user/auth-system', 240, 5, null),
('Product Catalog với JSP', 'Catalog sản phẩm với listing, detail page, search. Sử dụng JSTL.', 'MEDIUM', 'Java Web', null, 'https://github.com/user/product-catalog', 280, 5, null),

-- Week 6: Database & JDBC
('Contact Manager với JDBC', 'Ứng dụng quản lý contacts với JDBC. CRUD operations, search, pagination.', 'MEDIUM', 'Java Web', null, 'https://github.com/user/contact-manager', 300, 6, null),
('Employee Database System', 'Hệ thống quản lý nhân viên với departments, complex queries, transactions.', 'HARD', 'Java Web', null, 'https://github.com/user/employee-db', 360, 6, null),

-- Week 7: JPA & Hibernate
('Blog System với JPA', 'Hệ thống blog với posts, comments, categories. Sử dụng JPA relationships.', 'HARD', 'Java Web', null, 'https://github.com/user/jpa-blog', 400, 7, null),
('E-commerce Backend với Hibernate', 'Backend e-commerce: products, orders, customers. Entity relationships phức tạp.', 'HARD', 'Backend', null, 'https://github.com/user/ecommerce-backend', 480, 7, null),

-- Week 8: Spring Boot
('REST API với Spring Boot', 'RESTful API đầy đủ CRUD với Spring Boot, Spring Data JPA, validation.', 'HARD', 'Backend', null, 'https://github.com/user/spring-rest-api', 360, 8, null),
('Microservice Authentication', 'Authentication microservice với JWT, Spring Security, role-based access.', 'HARD', 'Backend', null, 'https://github.com/user/auth-microservice', 480, 8, null);

-- =============================================
-- SUCCESS MESSAGE
-- =============================================
DO $$
BEGIN
    RAISE NOTICE '============================================';
    RAISE NOTICE 'Database setup completed successfully!';
    RAISE NOTICE '============================================';
    RAISE NOTICE 'Tables created:';
    RAISE NOTICE '  - tech_stacks (21 records)';
    RAISE NOTICE '  - projects (5 records)';
    RAISE NOTICE '  - project_tech_stacks (relationships)';
    RAISE NOTICE '  - weeks (8 records)';
    RAISE NOTICE '  - week_topics (40 records)';
    RAISE NOTICE '  - exercises (14 records)';
    RAISE NOTICE '  - exercise_hints';
    RAISE NOTICE '============================================';
    RAISE NOTICE 'Ready to use!';
END $$;
