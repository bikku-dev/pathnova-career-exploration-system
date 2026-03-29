package com.pathnova.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "careers")
public class Career {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(length = 2000)
    private String description;

    private String category;

    private Integer salaryMin;

    private Integer salaryMax;

    private String demandLevel;

    private String difficulty;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String technologies; // JSON stored

    @Lob
    @Column(columnDefinition = "TEXT")
    private String skills; // JSON stored
}