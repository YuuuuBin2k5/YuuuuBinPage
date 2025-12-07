package com.portfolio.api.controller;

import com.portfolio.api.dto.ProjectDTO;
import com.portfolio.api.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
@RequiredArgsConstructor
public class ProjectController {
    
    private final ProjectService projectService;
    
    @GetMapping
    public ResponseEntity<List<ProjectDTO>> getAllProjects() {
        List<ProjectDTO> projects = projectService.getAllProjects();
        return ResponseEntity.ok(projects);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ProjectDTO> getProjectById(@PathVariable Long id) {
        return projectService.getProjectById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/category/{category}")
    public ResponseEntity<List<ProjectDTO>> getProjectsByCategory(@PathVariable String category) {
        List<ProjectDTO> projects = projectService.getProjectsByCategory(category);
        return ResponseEntity.ok(projects);
    }
    
    @PostMapping
    public ResponseEntity<ProjectDTO> createProject(@RequestBody ProjectDTO projectDTO) {
        System.out.println("=== CREATE PROJECT ===");
        System.out.println("Project name: " + projectDTO.getName());
        System.out.println("Images count: " + (projectDTO.getImages() != null ? projectDTO.getImages().size() : 0));
        if (projectDTO.getImages() != null) {
            projectDTO.getImages().forEach(img -> 
                System.out.println("  - Image URL: " + img.getImageUrl())
            );
        }
        ProjectDTO createdProject = projectService.createProject(projectDTO);
        return ResponseEntity.ok(createdProject);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<ProjectDTO> updateProject(@PathVariable Long id, @RequestBody ProjectDTO projectDTO) {
        System.out.println("=== UPDATE PROJECT ===");
        System.out.println("Project ID: " + id);
        System.out.println("Project name: " + projectDTO.getName());
        System.out.println("Images count: " + (projectDTO.getImages() != null ? projectDTO.getImages().size() : 0));
        if (projectDTO.getImages() != null) {
            projectDTO.getImages().forEach(img -> 
                System.out.println("  - Image URL: " + img.getImageUrl())
            );
        }
        return projectService.updateProject(id, projectDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProject(@PathVariable Long id) {
        boolean deleted = projectService.deleteProject(id);
        return deleted ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }
}