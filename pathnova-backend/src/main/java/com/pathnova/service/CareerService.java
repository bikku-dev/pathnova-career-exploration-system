package com.pathnova.service;

import com.pathnova.dto.request.CareerRequest;
import com.pathnova.dto.response.CareerResponse;

import java.util.List;

public interface CareerService {

    CareerResponse createCareer(CareerRequest request);

    CareerResponse updateCareer(Long id,CareerRequest request);

    void deleteCareer(Long id);

    List<CareerResponse> getAllCareers();

    CareerResponse getCareerById(Long id);
}