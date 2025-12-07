package com.portfolio.api.service;

import com.portfolio.api.dto.ProjectDTO;
import com.portfolio.api.dto.TechStackDTO;
import com.portfolio.api.entity.Project;
import com.portfolio.api.entity.ProjectImage;
import com.portfolio.api.repository.ProjectRepository;
import com.portfolio.api.repository.ProjectImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProjectService {
    
    private final ProjectRepository projectRepository;
    private final ProjectImageRepository projectImageRepository;
    
    @Cacheable(value = "projects", key = "'all'")
    public List<ProjectDTO> getAllProjects() {
        return projectRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public Optional<ProjectDTO> getProjectById(Long id) {
        return projectRepository.findById(id)
                .map(this::convertToDTO);
    }
    
    @Cacheable(value = "projectsByCategory", key = "#category")
    public List<ProjectDTO> getProjectsByCategory(String category) {
        return projectRepository.findByCategory(category)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    @Transactional
    @Caching(evict = {
        @CacheEvict(value = "projects", allEntries = true),
        @CacheEvict(value = "projectsByCategory", allEntries = true)
    })
    public ProjectDTO createProject(ProjectDTO projectDTO) {
        Project project = convertToEntity(projectDTO);
        Project savedProject = projectRepository.save(project);
        
        // Save images if provided
        if (projectDTO.getImages() != null && !projectDTO.getImages().isEmpty()) {
            saveProjectImages(savedProject.getId(), projectDTO.getImages());
        }
        
        return convertToDTO(savedProject);
    }
    
    @Transactional
    @Caching(evict = {
        @CacheEvict(value = "projects", allEntries = true),
        @CacheEvict(value = "projectsByCategory", allEntries = true)
    })
    public Optional<ProjectDTO> updateProject(Long id, ProjectDTO projectDTO) {
        System.out.println("Service: Looking for project with ID: " + id);
        Optional<Project> projectOpt = projectRepository.findById(id);
        if (projectOpt.isEmpty()) {
            System.out.println("Service: Project not found with ID: " + id);
            return Optional.empty();
        }
        return projectOpt.map(project -> {
                    project.setTitle(projectDTO.getName());
                    project.setDescription(projectDTO.getDescription());
                    project.setCategory(projectDTO.getCategory());
                    project.setStatus(projectDTO.getStatus());
                    project.setStartDate(projectDTO.getStartDate());
                    project.setEndDate(projectDTO.getEndDate());
                    project.setDemoUrl(projectDTO.getDemoUrl());
                    project.setGithubUrl(projectDTO.getGithubUrl());
                    project.setCoverImage(projectDTO.getCoverImage());
                    
                    Project savedProject = projectRepository.save(project);
                    
                    // Update images if provided
                    if (projectDTO.getImages() != null) {
                        projectImageRepository.deleteByProjectId(id);
                        if (!projectDTO.getImages().isEmpty()) {
                            saveProjectImages(id, projectDTO.getImages());
                        }
                    }
                    
                    return convertToDTO(savedProject);
                });
    }
    
    @Transactional
    @Caching(evict = {
        @CacheEvict(value = "projects", allEntries = true),
        @CacheEvict(value = "projectsByCategory", allEntries = true)
    })
    public boolean deleteProject(Long id) {
        if (projectRepository.existsById(id)) {
            projectRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
    private ProjectDTO convertToDTO(Project project) {
        List<TechStackDTO> techStackDTOs = project.getTechStacks() != null 
            ? project.getTechStacks().stream()
                .map(tech -> new TechStackDTO(
                    tech.getId(),
                    tech.getName(),
                    tech.getCategory(),
                    tech.getIconUrl()
                ))
                .collect(java.util.stream.Collectors.toList())
            : new java.util.ArrayList<>();
        
        // Load images
        System.out.println("=== LOADING IMAGES FOR PROJECT ===");
        System.out.println("Project ID: " + project.getId());
        List<ProjectDTO.ImageDTO> imageDTOs;
        try {
            List<ProjectImage> images = projectImageRepository.findByProjectIdOrderByDisplayOrder(project.getId());
            System.out.println("Found " + images.size() + " images in database");
            
            imageDTOs = images.stream()
                    .map(img -> {
                        System.out.println("  - Image: " + img.getImageUrl() + " (order: " + img.getDisplayOrder() + ")");
                        return new ProjectDTO.ImageDTO(img.getId(), img.getImageUrl(), img.getDisplayOrder(), img.getCaption());
                    })
                    .collect(Collectors.toList());
            
            System.out.println("Set " + imageDTOs.size() + " images to DTO");
        } catch (Exception e) {
            System.err.println("ERROR loading images: " + e.getMessage());
            e.printStackTrace();
            imageDTOs = new ArrayList<>();
        }
            
        return new ProjectDTO(
            project.getId(),
            project.getTitle(),
            project.getDescription(),
            project.getCategory(),
            project.getStatus(),
            project.getStartDate(),
            project.getEndDate(),
            project.getDemoUrl(),
            project.getGithubUrl(),
            project.getCoverImage(),
            imageDTOs,
            techStackDTOs,
            project.getCreatedAt(),
            project.getUpdatedAt()
        );
    }
    
    private void saveProjectImages(Long projectId, List<ProjectDTO.ImageDTO> imageDTOs) {
        System.out.println("=== SAVING PROJECT IMAGES ===");
        System.out.println("Project ID: " + projectId);
        System.out.println("Number of images to save: " + imageDTOs.size());
        
        List<ProjectImage> images = new ArrayList<>();
        for (int i = 0; i < imageDTOs.size(); i++) {
            ProjectDTO.ImageDTO imgDTO = imageDTOs.get(i);
            ProjectImage img = new ProjectImage();
            img.setProjectId(projectId);
            img.setImageUrl(imgDTO.getImageUrl());
            img.setDisplayOrder(imgDTO.getDisplayOrder() != null ? imgDTO.getDisplayOrder() : i);
            img.setCaption(imgDTO.getCaption());
            images.add(img);
            System.out.println("  Image " + (i+1) + ": " + imgDTO.getImageUrl() + " (order: " + img.getDisplayOrder() + ")");
        }
        
        List<ProjectImage> savedImages = projectImageRepository.saveAll(images);
        System.out.println("Successfully saved " + savedImages.size() + " images to database");
    }
    
    private Project convertToEntity(ProjectDTO dto) {
        Project project = new Project();
        project.setTitle(dto.getName());
        project.setDescription(dto.getDescription());
        project.setCategory(dto.getCategory());
        project.setStatus(dto.getStatus());
        project.setStartDate(dto.getStartDate());
        project.setEndDate(dto.getEndDate());
        project.setDemoUrl(dto.getDemoUrl());
        project.setGithubUrl(dto.getGithubUrl());
        project.setCoverImage(dto.getCoverImage());
        return project;
    }
}