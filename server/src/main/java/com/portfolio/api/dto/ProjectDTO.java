package com.portfolio.api.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProjectDTO {
    private Long id;
    private String name;
    private String description;
    private String category;
    private String status;
    private LocalDate startDate;
    private LocalDate endDate;
    private String demoUrl;
    private String githubUrl;
    private String coverImage;
    private List<TechStackDTO> techStacks;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}