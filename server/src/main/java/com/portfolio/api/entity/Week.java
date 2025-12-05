package com.portfolio.api.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "weeks", indexes = {
    @Index(name = "idx_week_start_date", columnList = "start_date"),
    @Index(name = "idx_week_end_date", columnList = "end_date"),
    @Index(name = "idx_week_difficulty", columnList = "difficulty")
})
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Week {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String title;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;
    
    @Column(name = "end_date", nullable = false)
    private LocalDate endDate;
    
    @Enumerated(EnumType.STRING)
    private Difficulty difficulty;
    
    private String color;
    
    @ElementCollection(fetch = FetchType.LAZY)
    @CollectionTable(name = "week_topics", joinColumns = @JoinColumn(name = "week_id"))
    @Column(name = "topic")
    private List<String> topics;
    
    @OneToMany(mappedBy = "week", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Exercise> exercises;
    
    public enum Difficulty {
        BEGINNER, INTERMEDIATE, ADVANCED
    }
}