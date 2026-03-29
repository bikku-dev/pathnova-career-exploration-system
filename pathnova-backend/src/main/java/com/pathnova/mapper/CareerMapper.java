package com.pathnova.mapper;

import com.pathnova.entity.Career;
import com.pathnova.dto.request.CareerRequest;

public class CareerMapper {

    public static Career toEntity(CareerRequest request){

        return Career.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .category(request.getCategory())
                .salaryMin(request.getSalaryMin())
                .salaryMax(request.getSalaryMax())
                .demandLevel(request.getDemandLevel())
                .difficulty(request.getDifficulty())
                .build();
    }

}