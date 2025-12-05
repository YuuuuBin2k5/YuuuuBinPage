package com.portfolio.api.repository;

import com.portfolio.api.entity.Exercise;
import com.portfolio.api.entity.Week;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ExerciseRepository extends JpaRepository<Exercise, Long> {
    
    List<Exercise> findByWeek(Week week);
    
    @Query("SELECT e FROM Exercise e LEFT JOIN FETCH e.week WHERE e.week.id = :weekId ORDER BY e.createdAt ASC")
    List<Exercise> findByWeekIdOrderByCreatedAt(@Param("weekId") Long weekId);
    
    @Query("SELECT e FROM Exercise e LEFT JOIN FETCH e.week WHERE e.category = :category")
    List<Exercise> findByCategoryWithWeek(@Param("category") String category);
    
    @Query("SELECT e FROM Exercise e WHERE e.week.id = :weekId ORDER BY e.createdAt ASC")
    List<Exercise> findByWeekIdOrderByCreatedAtOriginal(@Param("weekId") Long weekId);
    
    List<Exercise> findByCategory(String category);
    
    @Query("SELECT e FROM Exercise e LEFT JOIN FETCH e.week WHERE e.difficulty = :difficulty")
    List<Exercise> findByDifficultyWithWeek(@Param("difficulty") Exercise.Difficulty difficulty);
    
    List<Exercise> findByDifficulty(Exercise.Difficulty difficulty);
    
    @Query("SELECT e FROM Exercise e ORDER BY e.createdAt DESC")
    List<Exercise> findAllOrderByCreatedAtDesc();
    
    @Query("SELECT DISTINCT e FROM Exercise e LEFT JOIN FETCH e.week ORDER BY e.createdAt DESC")
    List<Exercise> findAllWithWeekOrderByCreatedAtDesc();
    
    @Query("SELECT COUNT(e) FROM Exercise e WHERE e.week.id = :weekId")
    Long countByWeekId(@Param("weekId") Long weekId);
}