package com.portfolio.api.service;

import com.portfolio.api.dto.WeekDTO;
import com.portfolio.api.entity.Week;
import com.portfolio.api.repository.WeekRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class WeekService {
    
    private final WeekRepository weekRepository;
    
    @Cacheable(value = "weeks", key = "'all'")
    public List<WeekDTO> getAllWeeks() {
        List<Week> weeks = weekRepository.findAllOrderByStartDate();
        return weeks.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public Optional<WeekDTO> getWeekById(Long id) {
        return weekRepository.findById(id)
                .map(this::convertToDTO);
    }
    
    public List<WeekDTO> getCurrentWeeks() {
        LocalDate today = LocalDate.now();
        List<Week> weeks = weekRepository.findCurrentWeeks(today);
        return weeks.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public List<WeekDTO> getUpcomingWeeks() {
        LocalDate today = LocalDate.now();
        List<Week> weeks = weekRepository.findUpcomingWeeks(today);
        return weeks.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    @Transactional
    @CacheEvict(value = "weeks", allEntries = true)
    public WeekDTO createWeek(WeekDTO weekDTO) {
        Week week = convertToEntity(weekDTO);
        Week savedWeek = weekRepository.save(week);
        return convertToDTO(savedWeek);
    }
    
    @Transactional
    @CacheEvict(value = "weeks", allEntries = true)
    public Optional<WeekDTO> updateWeek(Long id, WeekDTO weekDTO) {
        return weekRepository.findById(id)
                .map(existingWeek -> {
                    existingWeek.setTitle(weekDTO.getTitle());
                    existingWeek.setDescription(weekDTO.getDescription());
                    existingWeek.setStartDate(weekDTO.getStartDate());
                    existingWeek.setEndDate(weekDTO.getEndDate());
                    existingWeek.setDifficulty(Week.Difficulty.valueOf(weekDTO.getDifficulty().toUpperCase()));
                    existingWeek.setColor(weekDTO.getColor());
                    existingWeek.setTopics(weekDTO.getTopics());
                    
                    Week savedWeek = weekRepository.save(existingWeek);
                    return convertToDTO(savedWeek);
                });
    }
    
    @Transactional
    @CacheEvict(value = "weeks", allEntries = true)
    public boolean deleteWeek(Long id) {
        if (weekRepository.existsById(id)) {
            weekRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
    private WeekDTO convertToDTO(Week week) {
        WeekDTO dto = new WeekDTO();
        dto.setId(week.getId());
        dto.setTitle(week.getTitle());
        dto.setDescription(week.getDescription());
        dto.setStartDate(week.getStartDate());
        dto.setEndDate(week.getEndDate());
        dto.setDifficulty(week.getDifficulty().name());
        dto.setColor(week.getColor());
        dto.setTopics(week.getTopics());
        // Note: Exercises will be loaded separately to avoid circular reference
        return dto;
    }
    
    private Week convertToEntity(WeekDTO dto) {
        Week week = new Week();
        week.setId(dto.getId());
        week.setTitle(dto.getTitle());
        week.setDescription(dto.getDescription());
        week.setStartDate(dto.getStartDate());
        week.setEndDate(dto.getEndDate());
        week.setDifficulty(Week.Difficulty.valueOf(dto.getDifficulty().toUpperCase()));
        week.setColor(dto.getColor());
        week.setTopics(dto.getTopics());
        return week;
    }
}