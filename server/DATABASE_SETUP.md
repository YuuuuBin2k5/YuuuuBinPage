# Database Setup Instructions

## Prerequisites

- PostgreSQL installed and running
- Database named `portfolio` created

## Setup Database

1. **Connect to PostgreSQL:**

   ```bash
   psql -h localhost -U postgres -d portfolio
   ```

2. **Run the setup script:**

   ```sql
   \i portfolio-database-setup.sql
   ```

   Or using command line:

   ```bash
   psql -h localhost -U postgres -d portfolio -f portfolio-database-setup.sql
   ```

3. **Verify tables created:**
   ```sql
   \dt
   ```

## Database Schema

### Core Tables:

- **tech_stacks** - Technology stacks and tools
- **projects** - Portfolio projects
- **project_tech_stacks** - Many-to-many relationship between projects and tech stacks
- **weeks** - Learning weeks/modules
- **week_topics** - Topics covered in each week
- **exercises** - Practice exercises
- **exercise_hints** - Hints for exercises

### Sample Data Included:

- ✅ Tech stacks (React, JavaScript, Java, etc.)
- ✅ Sample projects with tech stack associations
- ✅ 6 learning weeks with topics
- ✅ 7 practice exercises with hints

## Application Configuration

Make sure your `application.properties` has:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/portfolio
spring.datasource.username=postgres
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=none
```

**Note:** Set `ddl-auto=none` since we're managing schema manually with SQL script.
