package com.portfolio.api.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "tech_stack")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TechStack {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tech_id")
    private Long id;
    
    @Column(name = "tech_name", nullable = false)
    private String name;
    
    @Column(name = "tech_type")
    private String category;
    
    @Column(name = "icon_url")
    private String iconUrl;
}