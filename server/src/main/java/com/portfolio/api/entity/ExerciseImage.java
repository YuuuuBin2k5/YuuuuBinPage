package com.portfolio.api.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "exercise_images", indexes = {
    @Index(name = "idx_exercise_images_exercise_id", columnList = "exercise_id"),
    @Index(name = "idx_exercise_images_order", columnList = "exercise_id, display_order")
})
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExerciseImage {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "exercise_id", nullable = false)
    private Long exerciseId;
    
    @Column(name = "image_url", columnDefinition = "TEXT", nullable = false)
    private String imageUrl;
    
    @Column(name = "display_order")
    private Integer displayOrder = 0;
    
    @Column(name = "caption")
    private String caption;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }
}
