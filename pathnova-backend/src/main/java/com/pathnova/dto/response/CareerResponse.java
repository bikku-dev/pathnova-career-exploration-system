package com.pathnova.dto.response;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CareerResponse {

    private Long id;

    private String title;

    private String description;

    private String category;

    private Integer salaryMin;

    private Integer salaryMax;

    private String demandLevel;

    private String difficulty;

    private List<String> technologies;

    private List<String> skills;

}