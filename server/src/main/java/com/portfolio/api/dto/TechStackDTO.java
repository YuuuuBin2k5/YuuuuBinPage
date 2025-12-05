package com.portfolio.api.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TechStackDTO {
    private Long id;
    private String name;
    private String category;
    private String iconUrl;
}