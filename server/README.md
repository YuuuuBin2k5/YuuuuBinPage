# Portfolio API Backend

Spring Boot REST API for managing portfolio projects and technology stacks.

## Technology Stack

- **Java 11+**
- **Spring Boot 3.2.0**
- **Spring Data JPA**
- **PostgreSQL**
- **Maven**
- **Lombok**

## Architecture

Clean layered architecture with:

- **Entities**: JPA entities for database mapping
- **DTOs**: Data Transfer Objects for API responses
- **Repositories**: Data access layer
- **Services**: Business logic layer
- **Controllers**: REST endpoints
- **Mappers**: Entity-DTO conversion

## Database Schema

### Projects Table

- Project information with categories and status
- Tech stack relationships
- Images, tasks, roles, and links

### Tech_Stack Table

- Technology information with categories
- Icon URLs and color codes

## API Endpoints

### Projects

- `GET /api/projects` - Get all projects (paginated)
- `GET /api/projects/{id}` - Get project by ID
- `GET /api/projects/category/{category}` - Get projects by category
- `GET /api/projects/status/{status}` - Get projects by status
- `GET /api/projects/search?query={query}` - Search projects
- `GET /api/projects/featured` - Get featured projects
- `POST /api/projects` - Create new project
- `PUT /api/projects/{id}` - Update project
- `DELETE /api/projects/{id}` - Delete project

### Tech Stacks

- `GET /api/tech-stacks` - Get all tech stacks (paginated)
- `GET /api/tech-stacks/{id}` - Get tech stack by ID
- `GET /api/tech-stacks/category/{category}` - Get tech stacks by category
- `GET /api/tech-stacks/search?query={query}` - Search tech stacks
- `POST /api/tech-stacks` - Create new tech stack
- `PUT /api/tech-stacks/{id}` - Update tech stack
- `DELETE /api/tech-stacks/{id}` - Delete tech stack

## Configuration

### Database Configuration

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/portfolio_db
spring.datasource.username=portfolio_user
spring.datasource.password=portfolio_password
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
```

### CORS Configuration

- Allows requests from React development servers (localhost:3000, localhost:5173)
- Configured for all HTTP methods

## Running the Application

1. **Prerequisites**

   - Java 11 or higher
   - PostgreSQL database
   - Maven 3.6+

2. **Database Setup**

   - Create PostgreSQL database: `portfolio_db`
   - Create user with appropriate permissions
   - Update `application.properties` with your database credentials

3. **Run Application**

   ```bash
   cd server
   mvn clean install
   mvn spring-boot:run
   ```

4. **API Access**
   - Base URL: `http://localhost:8080/api`
   - Swagger documentation (if enabled): `http://localhost:8080/swagger-ui.html`

## Features

- **Clean Architecture**: Separation of concerns with distinct layers
- **DTO Mapping**: Clean API responses without exposing entity internals
- **Error Handling**: Global exception handling with proper HTTP status codes
- **Validation**: Request validation using Bean Validation annotations
- **Logging**: Comprehensive logging with SLF4J
- **CORS Support**: Frontend integration ready
- **Transaction Management**: Database transaction handling
- **Search**: Text-based search functionality
- **Pagination**: Large dataset handling

## Development Notes

- All entities have audit fields (created_at, updated_at)
- Proper relationship mappings between entities
- Custom queries for complex data retrieval
- Service layer handles business logic
- Controllers focus on HTTP layer concerns
