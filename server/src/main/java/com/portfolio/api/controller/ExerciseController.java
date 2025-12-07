package com.portfolio.api.controller;

import com.portfolio.api.dto.ExerciseDTO;
import com.portfolio.api.service.ExerciseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/exercises")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
@RequiredArgsConstructor
public class ExerciseController {
    
    private final ExerciseService exerciseService;
    
    @GetMapping
    public ResponseEntity<List<ExerciseDTO>> getAllExercises() {
        List<ExerciseDTO> exercises = exerciseService.getAllExercises();
        return ResponseEntity.ok(exercises);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ExerciseDTO> getExerciseById(@PathVariable Long id) {
        return exerciseService.getExerciseById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/week/{weekId}")
    public ResponseEntity<List<ExerciseDTO>> getExercisesByWeekId(@PathVariable Long weekId) {
        List<ExerciseDTO> exercises = exerciseService.getExercisesByWeekId(weekId);
        return ResponseEntity.ok(exercises);
    }
    
    @GetMapping("/category/{category}")
    public ResponseEntity<List<ExerciseDTO>> getExercisesByCategory(@PathVariable String category) {
        List<ExerciseDTO> exercises = exerciseService.getExercisesByCategory(category);
        return ResponseEntity.ok(exercises);
    }
    
    @GetMapping("/week/{weekId}/count")
    public ResponseEntity<Long> getExerciseCountByWeek(@PathVariable Long weekId) {
        Long count = exerciseService.getExerciseCountByWeek(weekId);
        return ResponseEntity.ok(count);
    }
    
    @PostMapping
    public ResponseEntity<ExerciseDTO> createExercise(@RequestBody ExerciseDTO exerciseDTO) {
        System.out.println("=== CREATE EXERCISE ===");
        System.out.println("Exercise title: " + exerciseDTO.getTitle());
        System.out.println("Images count: " + (exerciseDTO.getImages() != null ? exerciseDTO.getImages().size() : 0));
        if (exerciseDTO.getImages() != null) {
            exerciseDTO.getImages().forEach(img -> 
                System.out.println("  - Image URL: " + img.getImageUrl())
            );
        }
        ExerciseDTO createdExercise = exerciseService.createExercise(exerciseDTO);
        return ResponseEntity.ok(createdExercise);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<ExerciseDTO> updateExercise(@PathVariable Long id, @RequestBody ExerciseDTO exerciseDTO) {
        System.out.println("=== UPDATE EXERCISE ===");
        System.out.println("Exercise ID: " + id);
        System.out.println("Exercise title: " + exerciseDTO.getTitle());
        System.out.println("Images count: " + (exerciseDTO.getImages() != null ? exerciseDTO.getImages().size() : 0));
        if (exerciseDTO.getImages() != null) {
            exerciseDTO.getImages().forEach(img -> 
                System.out.println("  - Image URL: " + img.getImageUrl())
            );
        }
        return exerciseService.updateExercise(id, exerciseDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExercise(@PathVariable Long id) {
        boolean deleted = exerciseService.deleteExercise(id);
        return deleted ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }
}