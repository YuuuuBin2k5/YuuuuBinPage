package com.portfolio.api.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "exercises", indexes = {
    @Index(name = "idx_exercise_week_id", columnList = "week_id"),
    @Index(name = "idx_exercise_created_at", columnList = "created_at"),
    @Index(name = "idx_exercise_category", columnList = "category"),
    @Index(name = "idx_exercise_difficulty", columnList = "difficulty")
})
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Exercise {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String title;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Enumerated(EnumType.STRING)
    private Difficulty difficulty;
    
    private String category;
    
    @Column(name = "demo_url")
    private String demoUrl;
    
    @Column(name = "github_url")
    private String githubUrl;
    
    @Column(name = "image_url")
    private String imageUrl;
    
    @Column(name = "estimated_time")
    private Integer estimatedTime; // in minutes
    
    @Column(columnDefinition = "TEXT")
    private String instructions;
    
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "exercise_hints", joinColumns = @JoinColumn(name = "exercise_id"))
    @Column(name = "hint")
    private List<String> hints;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "week_id")
    private Week week;
    
    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }
    
    public enum Difficulty {
        BEGINNER, INTERMEDIATE, ADVANCED
    }
}