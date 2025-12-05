package com.portfolio.api.repository;

import com.portfolio.api.entity.TechStack;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TechStackRepository extends JpaRepository<TechStack, Long> {
    List<TechStack> findByCategory(String category);
    List<TechStack> findByNameContainingIgnoreCase(String name);
}