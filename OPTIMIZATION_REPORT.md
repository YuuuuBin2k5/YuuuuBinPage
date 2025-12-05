# Optimization Report - Bài Tập Module

## Vấn đề đã phát hiện

### 1. **N+1 Query Problem**

- Query `findAllWithWeekOrderByCreatedAtDesc` có thể gây nhiều queries khi fetch lazy relationships
- ElementCollection `hints` được fetch LAZY gây thêm queries

### 2. **Không có caching ở Backend**

- Mỗi lần load trang đều phải query database
- Không có caching strategy cho data ít thay đổi

### 3. **Multiple HTTP Requests**

- Frontend gọi 2 API riêng biệt (weeks và exercises)
- Tăng network latency và overhead

### 4. **Frontend caching quá ngắn**

- Cache chỉ 30 giây, không đủ hiệu quả
- Mỗi 30s lại phải fetch lại từ backend

## Giải pháp đã implement

### 1. **Backend Caching với Caffeine**

#### Dependencies thêm vào `pom.xml`:

```xml
<!-- Spring Boot Cache -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-cache</artifactId>
</dependency>

<!-- Caffeine Cache -->
<dependency>
    <groupId>com.github.ben-manes.caffeine</groupId>
    <artifactId>caffeine</artifactId>
</dependency>
```

#### Cache Configuration (`CacheConfig.java`):

- Cache duration: 5 phút
- Maximum size: 1000 entries
- Caches: exercises, weeks, exercisesByWeek, exercisesByCategory

#### Cache annotations:

- `@Cacheable` cho read operations
- `@CacheEvict` cho write operations (create, update, delete)

### 2. **Optimized Database Queries**

#### Exercise Entity:

```java
// Changed from LAZY to EAGER to avoid N+1
@ElementCollection(fetch = FetchType.EAGER)
private List<String> hints;
```

#### Repository Query:

```java
// Optimized with LEFT JOIN FETCH
@Query("SELECT DISTINCT e FROM Exercise e LEFT JOIN FETCH e.week ORDER BY e.createdAt DESC")
List<Exercise> findAllWithWeekOrderByCreatedAtDesc();
```

### 3. **Combined API Endpoint**

#### New Controller (`BaiTapController.java`):

```java
@GetMapping("/all")
public ResponseEntity<BaiTapDataDTO> getAllBaiTapData() {
    BaiTapDataDTO data = new BaiTapDataDTO();
    data.setWeeks(weekService.getAllWeeks());
    data.setExercises(exerciseService.getAllExercises());
    return ResponseEntity.ok(data);
}
```

**Lợi ích:**

- Giảm từ 2 HTTP requests xuống 1 request
- Tận dụng backend caching cho cả 2 datasets
- Giảm network latency

### 4. **HTTP Compression**

#### application.properties:

```properties
server.compression.enabled=true
server.compression.mime-types=application/json,application/xml,text/html,text/xml,text/plain
server.compression.min-response-size=1024
```

**Lợi ích:**

- Giảm ~70% kích thước response
- Tăng tốc độ transfer qua network

### 5. **Frontend Optimization**

#### Increased Cache Duration:

```javascript
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
```

#### New Combined API Service:

```javascript
export const baiTapAPI = {
  getAllData: async () => {
    // Fetch both weeks and exercises in one request
    const response = await fetch(`${API_BASE_URL}/baitap/all`);
    return await response.json();
  },
};
```

#### BaiTap.jsx Updates:

- Sử dụng combined API để load data nhanh hơn
- Có fallback về separate APIs nếu combined API fail
- Better error handling

## Kết quả mong đợi

### Performance Improvements:

1. **First Load:**

   - Backend queries database → cache result
   - Response được compress ~70%
   - 1 HTTP request thay vì 2

2. **Subsequent Loads (trong 5 phút):**

   - Frontend return từ cache ngay lập tức (0ms)
   - Không có HTTP request

3. **After Frontend Cache Expires (5 phút):**

   - 1 HTTP request tới backend
   - Backend return từ cache (very fast, ~5-10ms)
   - Không query database

4. **After Backend Cache Expires (5 phút):**
   - Backend query database lần nữa
   - Cache được refresh
   - Cycle lặp lại

### Network Optimization:

- **Before:** 2 requests, uncompressed JSON (~50-100KB)
- **After:** 1 request, compressed JSON (~15-30KB)
- **Improvement:** ~60-70% giảm data transfer

### Database Load:

- **Before:** Query mỗi page load
- **After:** Query mỗi 5 phút (khi cache expire)
- **Improvement:** ~95% giảm database queries

## Testing Instructions

### 1. Build Backend:

```bash
cd server
./mvnw clean package -DskipTests
```

### 2. Start Backend:

```bash
./mvnw spring-boot:run
```

### 3. Test Performance:

#### First Request:

```bash
curl -w "\nTime: %{time_total}s\n" http://localhost:8081/api/baitap/all
```

Expected: ~200-500ms (database query + processing)

#### Second Request (within 5 minutes):

```bash
curl -w "\nTime: %{time_total}s\n" http://localhost:8081/api/baitap/all
```

Expected: ~5-20ms (from cache)

#### Check Compression:

```bash
curl -H "Accept-Encoding: gzip" -I http://localhost:8081/api/baitap/all
```

Look for: `Content-Encoding: gzip`

### 4. Monitor Cache:

Check logs for cache hits/misses:

```
DEBUG - Cache hit for key: exercises:all
DEBUG - Cache miss for key: exercises:all, fetching from database
```

## Additional Optimizations (Future)

### 1. Database Indexing:

Already implemented in entities:

```java
@Index(name = "idx_exercise_week_id", columnList = "week_id")
@Index(name = "idx_exercise_created_at", columnList = "created_at")
```

### 2. Pagination:

Consider implementing pagination if dataset grows:

```java
@GetMapping("/all")
public Page<ExerciseDTO> getAllExercises(Pageable pageable) {
    return exerciseService.getAllExercises(pageable);
}
```

### 3. Lazy Loading Components:

Consider React.lazy() for heavy components:

```javascript
const ExerciseCard = React.lazy(() => import("./ExerciseCard"));
```

### 4. Virtual Scrolling:

If có nhiều exercises (>100), consider react-window:

```javascript
import { FixedSizeList } from "react-window";
```

## Troubleshooting

### Cache không hoạt động:

1. Check `@EnableCaching` trong CacheConfig
2. Check logs có cache hits không
3. Clear Maven cache: `./mvnw clean`

### Compression không hoạt động:

1. Check browser network tab → Headers → Content-Encoding
2. Verify response size > 1024 bytes
3. Check Accept-Encoding header trong request

### API endpoint không hoạt động:

1. Verify controller được scan: check package structure
2. Test individual APIs: `/api/weeks` và `/api/exercises`
3. Check CORS configuration

## Monitoring

### Cache Statistics:

Caffeine provides built-in stats. Enable với:

```java
cacheManager.setCaffeine(Caffeine.newBuilder()
    .recordStats()
    .maximumSize(1000)
    .expireAfterWrite(5, TimeUnit.MINUTES));
```

### Performance Metrics:

Consider adding Spring Boot Actuator:

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

Access metrics at: `http://localhost:8081/actuator/metrics`
