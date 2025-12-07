package com.portfolio.api.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExerciseDTO {
    private Long id;
    private String title;
    private String description;
    private String difficulty;
    private String category;
    private String demoUrl;
    private String githubUrl;
    private String imageUrl;
    private Integer estimatedTime;
    private String instructions;
    private List<String> hints;
    private LocalDateTime createdAt;
    private Long weekId;
    private String weekTitle;
}