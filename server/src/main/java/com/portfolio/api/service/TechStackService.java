package com.portfolio.api.service;

import com.portfolio.api.dto.TechStackDTO;
import com.portfolio.api.entity.TechStack;
import com.portfolio.api.repository.TechStackRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TechStackService {
    
    private final TechStackRepository techStackRepository;
    
    public List<TechStackDTO> getAllTechStacks() {
        return techStackRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public Optional<TechStackDTO> getTechStackById(Long id) {
        return techStackRepository.findById(id)
                .map(this::convertToDTO);
    }
    
    public List<TechStackDTO> getTechStacksByCategory(String category) {
        return techStackRepository.findByCategory(category)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    @Transactional
    public TechStackDTO createTechStack(TechStackDTO techStackDTO) {
        TechStack techStack = convertToEntity(techStackDTO);
        TechStack savedTechStack = techStackRepository.save(techStack);
        return convertToDTO(savedTechStack);
    }
    
    @Transactional
    public Optional<TechStackDTO> updateTechStack(Long id, TechStackDTO techStackDTO) {
        return techStackRepository.findById(id)
                .map(techStack -> {
                    techStack.setName(techStackDTO.getName());
                    techStack.setCategory(techStackDTO.getCategory());
                    techStack.setIconUrl(techStackDTO.getIconUrl());
                    return convertToDTO(techStackRepository.save(techStack));
                });
    }
    
    @Transactional
    public boolean deleteTechStack(Long id) {
        if (techStackRepository.existsById(id)) {
            techStackRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
    private TechStackDTO convertToDTO(TechStack techStack) {
        return new TechStackDTO(
            techStack.getId(),
            techStack.getName(),
            techStack.getCategory(),
            techStack.getIconUrl()
        );
    }
    
    private TechStack convertToEntity(TechStackDTO dto) {
        TechStack techStack = new TechStack();
        techStack.setName(dto.getName());
        techStack.setCategory(dto.getCategory());
        techStack.setIconUrl(dto.getIconUrl());
        return techStack;
    }
}