package com.portfolio.api.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "projects")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Project {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "project_id")
    private Long id;
    
    @Column(name = "title")
    private String title;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    private String category;
    
    private String status;
    
    @Column(name = "start_date")
    private LocalDate startDate;
    
    @Column(name = "end_date")
    private LocalDate endDate;
    
    @Column(name = "demo_url", columnDefinition = "TEXT")
    private String demoUrl;
    
    @Column(name = "github_url", columnDefinition = "TEXT")
    private String githubUrl;
    
    @Column(name = "cover_image", columnDefinition = "TEXT")
    private String coverImage;
    
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name = "project_tech_stacks",
        joinColumns = @JoinColumn(name = "project_id"),
        inverseJoinColumns = @JoinColumn(name = "tech_stack_id")
    )
    private Set<TechStack> techStacks = new HashSet<>();
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}