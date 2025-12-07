package com.portfolio.api.service;

import com.portfolio.api.dto.ExerciseDTO;
import com.portfolio.api.entity.Exercise;
import com.portfolio.api.entity.ExerciseImage;
import com.portfolio.api.entity.Week;
import com.portfolio.api.repository.ExerciseRepository;
import com.portfolio.api.repository.ExerciseImageRepository;
import com.portfolio.api.repository.WeekRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ExerciseService {
    
    private final ExerciseRepository exerciseRepository;
    private final ExerciseImageRepository exerciseImageRepository;
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
        
        // Save images if provided
        if (exerciseDTO.getImages() != null && !exerciseDTO.getImages().isEmpty()) {
            saveExerciseImages(savedExercise.getId(), exerciseDTO.getImages());
        }
        
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
                    
                    // Update images if provided
                    if (exerciseDTO.getImages() != null) {
                        exerciseImageRepository.deleteByExerciseId(id);
                        if (!exerciseDTO.getImages().isEmpty()) {
                            saveExerciseImages(id, exerciseDTO.getImages());
                        }
                    }
                    
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
        
        // Load images
        System.out.println("=== LOADING IMAGES FOR EXERCISE ===");
        System.out.println("Exercise ID: " + exercise.getId());
        try {
            List<ExerciseImage> images = exerciseImageRepository.findByExerciseIdOrderByDisplayOrder(exercise.getId());
            System.out.println("Found " + images.size() + " images in database");
            
            List<ExerciseDTO.ImageDTO> imageDTOs = images.stream()
                    .map(img -> {
                        System.out.println("  - Image: " + img.getImageUrl() + " (order: " + img.getDisplayOrder() + ")");
                        return new ExerciseDTO.ImageDTO(img.getId(), img.getImageUrl(), img.getDisplayOrder(), img.getCaption());
                    })
                    .collect(Collectors.toList());
            
            dto.setImages(imageDTOs);
            System.out.println("Set " + imageDTOs.size() + " images to DTO");
        } catch (Exception e) {
            System.err.println("ERROR loading images: " + e.getMessage());
            e.printStackTrace();
            dto.setImages(new ArrayList<>());
        }
        
        if (exercise.getWeek() != null) {
            dto.setWeekId(exercise.getWeek().getId());
            dto.setWeekTitle(exercise.getWeek().getTitle());
        }
        
        return dto;
    }
    
    private void saveExerciseImages(Long exerciseId, List<ExerciseDTO.ImageDTO> imageDTOs) {
        System.out.println("=== SAVING EXERCISE IMAGES ===");
        System.out.println("Exercise ID: " + exerciseId);
        System.out.println("Number of images to save: " + imageDTOs.size());
        
        List<ExerciseImage> images = new ArrayList<>();
        for (int i = 0; i < imageDTOs.size(); i++) {
            ExerciseDTO.ImageDTO imgDTO = imageDTOs.get(i);
            ExerciseImage img = new ExerciseImage();
            img.setExerciseId(exerciseId);
            img.setImageUrl(imgDTO.getImageUrl());
            img.setDisplayOrder(imgDTO.getDisplayOrder() != null ? imgDTO.getDisplayOrder() : i);
            img.setCaption(imgDTO.getCaption());
            images.add(img);
            System.out.println("  Image " + (i+1) + ": " + imgDTO.getImageUrl() + " (order: " + img.getDisplayOrder() + ")");
        }
        
        List<ExerciseImage> savedImages = exerciseImageRepository.saveAll(images);
        System.out.println("Successfully saved " + savedImages.size() + " images to database");
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