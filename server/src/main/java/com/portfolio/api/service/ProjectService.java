package com.portfolio.api.service;

import com.portfolio.api.dto.ProjectDTO;
import com.portfolio.api.entity.Project;
import com.portfolio.api.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProjectService {
    
    private final ProjectRepository projectRepository;
    
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
                    return convertToDTO(projectRepository.save(project));
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
            project.getCreatedAt(),
            project.getUpdatedAt()
        );
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