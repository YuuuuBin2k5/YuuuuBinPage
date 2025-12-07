package com.portfolio.api.repository;

import com.portfolio.api.entity.ProjectImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProjectImageRepository extends JpaRepository<ProjectImage, Long> {
    List<ProjectImage> findByProjectIdOrderByDisplayOrder(Long projectId);
    void deleteByProjectId(Long projectId);
}
