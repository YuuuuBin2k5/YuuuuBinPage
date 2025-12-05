package com.portfolio.api.controller;

import com.portfolio.api.dto.BaiTapDataDTO;
import com.portfolio.api.service.ExerciseService;
import com.portfolio.api.service.WeekService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/baitap")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
@RequiredArgsConstructor
public class BaiTapController {
    private final WeekService weekService;
    private final ExerciseService exerciseService;
    
    @GetMapping("/all")
    public ResponseEntity<BaiTapDataDTO> getAllBaiTapData() {
        BaiTapDataDTO data = new BaiTapDataDTO();
        data.setWeeks(weekService.getAllWeeks());
        data.setExercises(exerciseService.getAllExercises());
        return ResponseEntity.ok(data);
    }
}
