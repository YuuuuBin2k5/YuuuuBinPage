package com.portfolio.api.repository;

import com.portfolio.api.entity.ProjectImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProjectImageRepository extends JpaRepository<ProjectImage, Long> {
    List<ProjectImage> findByProjectIdOrderByDisplayOrder(Long projectId);
    
    @Modifying
    @Query("DELETE FROM ProjectImage pi WHERE pi.projectId = :projectId")
    void deleteByProjectId(@Param("projectId") Long projectId);
}
