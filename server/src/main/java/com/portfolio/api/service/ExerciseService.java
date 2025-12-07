package com.portfolio.api.service;

import com.portfolio.api.dto.ExerciseDTO;
import com.portfolio.api.entity.Exercise;
import com.portfolio.api.entity.Week;
import com.portfolio.api.repository.ExerciseRepository;
import com.portfolio.api.repository.WeekRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ExerciseService {
    
    private final ExerciseRepository exerciseRepository;
    private final WeekRepository weekRepository;
    
    @Cacheable(value = "exercises", key = "'all'")
    public List<ExerciseDTO> getAllExercises() {
        List<Exercise> exercises = exerciseRepository.findAllWithWeekOrderByCreatedAtDesc();
        return exercises.parallelStream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public Optional<ExerciseDTO> getExerciseById(Long id) {
        return exerciseRepository.findById(id)
                .map(this::convertToDTO);
    }
    
    @Cacheable(value = "exercisesByWeek", key = "#weekId")
    public List<ExerciseDTO> getExercisesByWeekId(Long weekId) {
        List<Exercise> exercises = exerciseRepository.findByWeekIdOrderByCreatedAt(weekId);
        return exercises.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    @Cacheable(value = "exercisesByCategory", key = "#category")
    public List<ExerciseDTO> getExercisesByCategory(String category) {
        List<Exercise> exercises = exerciseRepository.findByCategoryWithWeek(category);
        return exercises.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    @Transactional
    @Caching(evict = {
        @CacheEvict(value = "exercises", allEntries = true),
        @CacheEvict(value = "exercisesByWeek", allEntries = true),
        @CacheEvict(value = "exercisesByCategory", allEntries = true)
    })
    public ExerciseDTO createExercise(ExerciseDTO exerciseDTO) {
        Exercise exercise = convertToEntity(exerciseDTO);
        
        // Set week if weekId is provided
        if (exerciseDTO.getWeekId() != null) {
            weekRepository.findById(exerciseDTO.getWeekId())
                    .ifPresent(exercise::setWeek);
        }
        
        Exercise savedExercise = exerciseRepository.save(exercise);
        return convertToDTO(savedExercise);
    }
    
    @Transactional
    @Caching(evict = {
        @CacheEvict(value = "exercises", allEntries = true),
        @CacheEvict(value = "exercisesByWeek", allEntries = true),
        @CacheEvict(value = "exercisesByCategory", allEntries = true)
    })
    public Optional<ExerciseDTO> updateExercise(Long id, ExerciseDTO exerciseDTO) {
        return exerciseRepository.findById(id)
                .map(existingExercise -> {
                    existingExercise.setTitle(exerciseDTO.getTitle());
                    existingExercise.setDescription(exerciseDTO.getDescription());
                    existingExercise.setDifficulty(Exercise.Difficulty.valueOf(exerciseDTO.getDifficulty().toUpperCase()));
                    existingExercise.setCategory(exerciseDTO.getCategory());
                    existingExercise.setDemoUrl(exerciseDTO.getDemoUrl());
                    existingExercise.setGithubUrl(exerciseDTO.getGithubUrl());
                    existingExercise.setImageUrl(exerciseDTO.getImageUrl());
                    existingExercise.setEstimatedTime(exerciseDTO.getEstimatedTime());
                    existingExercise.setInstructions(exerciseDTO.getInstructions());
                    existingExercise.setHints(exerciseDTO.getHints());
                    
                    // Update week if weekId is provided
                    if (exerciseDTO.getWeekId() != null) {
                        weekRepository.findById(exerciseDTO.getWeekId())
                                .ifPresent(existingExercise::setWeek);
                    }
                    
                    Exercise savedExercise = exerciseRepository.save(existingExercise);
                    return convertToDTO(savedExercise);
                });
    }
    
    @Transactional
    @Caching(evict = {
        @CacheEvict(value = "exercises", allEntries = true),
        @CacheEvict(value = "exercisesByWeek", allEntries = true),
        @CacheEvict(value = "exercisesByCategory", allEntries = true)
    })
    public boolean deleteExercise(Long id) {
        if (exerciseRepository.existsById(id)) {
            exerciseRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
    public Long getExerciseCountByWeek(Long weekId) {
        return exerciseRepository.countByWeekId(weekId);
    }
    
    private ExerciseDTO convertToDTO(Exercise exercise) {
        ExerciseDTO dto = new ExerciseDTO();
        dto.setId(exercise.getId());
        dto.setTitle(exercise.getTitle());
        dto.setDescription(exercise.getDescription());
        dto.setDifficulty(exercise.getDifficulty().name());
        dto.setCategory(exercise.getCategory());
        dto.setDemoUrl(exercise.getDemoUrl());
        dto.setGithubUrl(exercise.getGithubUrl());
        dto.setImageUrl(exercise.getImageUrl());
        dto.setEstimatedTime(exercise.getEstimatedTime());
        dto.setInstructions(exercise.getInstructions());
        dto.setHints(exercise.getHints());
        dto.setCreatedAt(exercise.getCreatedAt());
        
        if (exercise.getWeek() != null) {
            dto.setWeekId(exercise.getWeek().getId());
            dto.setWeekTitle(exercise.getWeek().getTitle());
        }
        
        return dto;
    }
    
    private Exercise convertToEntity(ExerciseDTO dto) {
        Exercise exercise = new Exercise();
        exercise.setId(dto.getId());
        exercise.setTitle(dto.getTitle());
        exercise.setDescription(dto.getDescription());
        exercise.setDifficulty(Exercise.Difficulty.valueOf(dto.getDifficulty().toUpperCase()));
        exercise.setCategory(dto.getCategory());
        exercise.setDemoUrl(dto.getDemoUrl());
        exercise.setGithubUrl(dto.getGithubUrl());
        exercise.setImageUrl(dto.getImageUrl());
        exercise.setEstimatedTime(dto.getEstimatedTime());
        exercise.setInstructions(dto.getInstructions());
        exercise.setHints(dto.getHints());
        return exercise;
    }
}