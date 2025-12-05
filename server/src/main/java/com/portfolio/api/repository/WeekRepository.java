package com.portfolio.api.repository;

import com.portfolio.api.entity.Week;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface WeekRepository extends JpaRepository<Week, Long> {
    
    @Query("SELECT DISTINCT w FROM Week w LEFT JOIN FETCH w.topics ORDER BY w.startDate ASC")
    List<Week> findAllOrderByStartDate();
    
    List<Week> findByDifficulty(Week.Difficulty difficulty);
    
    @Query("SELECT w FROM Week w WHERE w.startDate <= :date AND w.endDate >= :date")
    List<Week> findCurrentWeeks(LocalDate date);
    
    @Query("SELECT w FROM Week w WHERE w.startDate > :date")
    List<Week> findUpcomingWeeks(LocalDate date);
}