package com.portfolio.api.repository;

import com.portfolio.api.entity.ExerciseImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ExerciseImageRepository extends JpaRepository<ExerciseImage, Long> {
    List<ExerciseImage> findByExerciseIdOrderByDisplayOrder(Long exerciseId);
    
    @Modifying
    @Query("DELETE FROM ExerciseImage ei WHERE ei.exerciseId = :exerciseId")
    void deleteByExerciseId(@Param("exerciseId") Long exerciseId);
}
