package com.portfolio.api.controller;

import com.portfolio.api.dto.WeekDTO;
import com.portfolio.api.service.WeekService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/weeks")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
@RequiredArgsConstructor
public class WeekController {
    
    private final WeekService weekService;
    
    @GetMapping
    public ResponseEntity<List<WeekDTO>> getAllWeeks() {
        List<WeekDTO> weeks = weekService.getAllWeeks();
        return ResponseEntity.ok(weeks);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<WeekDTO> getWeekById(@PathVariable Long id) {
        return weekService.getWeekById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/current")
    public ResponseEntity<List<WeekDTO>> getCurrentWeeks() {
        List<WeekDTO> weeks = weekService.getCurrentWeeks();
        return ResponseEntity.ok(weeks);
    }
    
    @GetMapping("/upcoming")
    public ResponseEntity<List<WeekDTO>> getUpcomingWeeks() {
        List<WeekDTO> weeks = weekService.getUpcomingWeeks();
        return ResponseEntity.ok(weeks);
    }
    
    @PostMapping
    public ResponseEntity<WeekDTO> createWeek(@RequestBody WeekDTO weekDTO) {
        WeekDTO createdWeek = weekService.createWeek(weekDTO);
        return ResponseEntity.ok(createdWeek);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<WeekDTO> updateWeek(@PathVariable Long id, @RequestBody WeekDTO weekDTO) {
        return weekService.updateWeek(id, weekDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWeek(@PathVariable Long id) {
        boolean deleted = weekService.deleteWeek(id);
        return deleted ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }
}