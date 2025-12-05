package com.portfolio.api.repository;

import com.portfolio.api.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findByCategory(String category);
    List<Project> findByStatus(String status);
    List<Project> findByTitleContainingIgnoreCase(String title);
}