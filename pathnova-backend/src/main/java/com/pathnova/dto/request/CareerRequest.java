package com.pathnova.dto.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CareerRequest {

    private String title;

    private String description;

    private String category;

    private Integer salaryMin;

    private Integer salaryMax;

    private String demandLevel;

    private String difficulty;
}