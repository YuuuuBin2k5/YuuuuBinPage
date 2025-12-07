package com.portfolio.api.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "project_images", indexes = {
    @Index(name = "idx_project_images_project_id", columnList = "project_id"),
    @Index(name = "idx_project_images_order", columnList = "project_id, display_order")
})
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProjectImage {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "project_id", nullable = false)
    private Long projectId;
    
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
