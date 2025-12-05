package com.portfolio.api.controller;

import com.portfolio.api.dto.TechStackDTO;
import com.portfolio.api.service.TechStackService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tech-stacks")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
@RequiredArgsConstructor
public class TechStackController {
    
    private final TechStackService techStackService;
    
    @GetMapping
    public ResponseEntity<List<TechStackDTO>> getAllTechStacks() {
        List<TechStackDTO> techStacks = techStackService.getAllTechStacks();
        return ResponseEntity.ok(techStacks);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<TechStackDTO> getTechStackById(@PathVariable Long id) {
        return techStackService.getTechStackById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/category/{category}")
    public ResponseEntity<List<TechStackDTO>> getTechStacksByCategory(@PathVariable String category) {
        List<TechStackDTO> techStacks = techStackService.getTechStacksByCategory(category);
        return ResponseEntity.ok(techStacks);
    }
    
    @PostMapping
    public ResponseEntity<TechStackDTO> createTechStack(@RequestBody TechStackDTO techStackDTO) {
        TechStackDTO createdTechStack = techStackService.createTechStack(techStackDTO);
        return ResponseEntity.ok(createdTechStack);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<TechStackDTO> updateTechStack(@PathVariable Long id, @RequestBody TechStackDTO techStackDTO) {
        return techStackService.updateTechStack(id, techStackDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTechStack(@PathVariable Long id) {
        boolean deleted = techStackService.deleteTechStack(id);
        return deleted ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }
}