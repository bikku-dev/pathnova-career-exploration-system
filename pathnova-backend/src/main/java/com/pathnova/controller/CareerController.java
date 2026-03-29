package com.pathnova.controller;

import com.pathnova.dto.request.CareerRequest;
import com.pathnova.dto.response.CareerResponse;
import com.pathnova.service.CareerService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/careers")
@CrossOrigin(origins = "*")

public class CareerController {

    private final CareerService careerService;

    public CareerController(CareerService careerService) {
        this.careerService = careerService;
    }

    @PostMapping
    public CareerResponse create(@RequestBody CareerRequest request) {
        return careerService.createCareer(request);
    }

    @PutMapping("/{id}")
    public CareerResponse update(
            @PathVariable Long id,
            @RequestBody CareerRequest request
    ) {
        return careerService.updateCareer(id, request);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        careerService.deleteCareer(id);
    }

    @GetMapping
    public List<CareerResponse> getAll() {
        return careerService.getAllCareers();
    }

    @GetMapping("/{id}")
    public CareerResponse getOne(@PathVariable Long id) {
        return careerService.getCareerById(id);
    }

}