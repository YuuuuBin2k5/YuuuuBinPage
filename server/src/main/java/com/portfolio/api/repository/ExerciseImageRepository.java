package com.portfolio.api.repository;

import com.portfolio.api.entity.ExerciseImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ExerciseImageRepository extends JpaRepository<ExerciseImage, Long> {
    List<ExerciseImage> findByExerciseIdOrderByDisplayOrder(Long exerciseId);
    void deleteByExerciseId(Long exerciseId);
}
