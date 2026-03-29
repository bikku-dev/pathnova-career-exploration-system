package com.pathnova.service.Impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pathnova.ai.AIClient;
import com.pathnova.cache.CareerCacheService;
import com.pathnova.dto.request.CareerRequest;
import com.pathnova.dto.response.CareerResponse;
import com.pathnova.entity.Career;
import com.pathnova.mapper.CareerMapper;
import com.pathnova.repository.CareerRepository;
import com.pathnova.service.CareerService;

import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CareerServiceImpl implements CareerService {

    private final CareerRepository repository;
    private final CareerCacheService cache;
    private final AIClient aiClient;

    public CareerServiceImpl(
            CareerRepository repository,
            CareerCacheService cache,
            AIClient aiClient
    ) {
        this.repository = repository;
        this.cache = cache;
        this.aiClient = aiClient;
    }

    // =========================
    // CREATE
    // =========================
    @Override
    public CareerResponse createCareer(CareerRequest request) {

        Career career = CareerMapper.toEntity(request);

        repository.save(career);

        cache.delete("careers");

        return buildResponse(career);
    }

    // =========================
    // GET ALL
    // =========================
    @Override
    public List<CareerResponse> getAllCareers() {

        List<CareerResponse> cached = (List<CareerResponse>) cache.get("careers");

        if (cached != null) {
            return cached;
        }

        List<Career> careers = repository.findAll();

        List<CareerResponse> responses = careers.stream()
                .map(this::buildResponse)
                .toList();

        cache.set("careers", responses);

        return responses;
    }

    // =========================
    // GET BY ID
    // =========================
    @Override
    public CareerResponse getCareerById(Long id) {

        Career career = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Career not found with id: " + id));

        return buildResponse(career);
    }

    // =========================
    // UPDATE
    // =========================
    @Override
    public CareerResponse updateCareer(Long id, CareerRequest request) {

        Career career = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Career not found with id: " + id));

        career.setTitle(request.getTitle());
        career.setDescription(request.getDescription());
        career.setCategory(request.getCategory());
        career.setSalaryMin(request.getSalaryMin());
        career.setSalaryMax(request.getSalaryMax());
        career.setDemandLevel(request.getDemandLevel());
        career.setDifficulty(request.getDifficulty());

        repository.save(career);

        cache.delete("careers");

        return buildResponse(career);
    }

    // =========================
    // DELETE
    // =========================
    @Override
    public void deleteCareer(Long id) {

        if (!repository.existsById(id)) {
            throw new RuntimeException("Career not found with id: " + id);
        }

        repository.deleteById(id);

        cache.delete("careers");
    }

    // =========================
    // 🔥 JSON → List
    // =========================
    private List<String> jsonToList(String json) {
        try {
            if (json == null || json.isEmpty()) return new ArrayList<>();
            ObjectMapper mapper = new ObjectMapper();
            return mapper.readValue(json, List.class);
        } catch (Exception e) {
            return new ArrayList<>();
        }
    }

    // =========================
    // 🔥 List → JSON
    // =========================
    private String listToJson(List<String> list) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            return mapper.writeValueAsString(list);
        } catch (Exception e) {
            return "[]";
        }
    }

    // =========================
    // 🔥 AI CALL
    // =========================
    private Map<String, List<String>> getSkillsFromAI(String title) {

        try {

            String json = aiClient.generateCareerSkills(title);

            ObjectMapper mapper = new ObjectMapper();

            Map<String, Object> result = mapper.readValue(json, Map.class);

            List<String> technologies = (List<String>) result.get("technologies");
            List<String> skills = (List<String>) result.get("skills");

            return Map.of(
                    "technologies", technologies,
                    "skills", skills
            );

        } catch (Exception e) {
            return Map.of(
                    "technologies", List.of("Git", "Basic Programming"),
                    "skills", List.of("Problem Solving")
            );
        }
    }

    // =========================
    // 🔥 BUILD RESPONSE (FINAL)
    // =========================
    private CareerResponse buildResponse(Career career) {

        List<String> technologies = jsonToList(career.getTechnologies());
        List<String> skills = jsonToList(career.getSkills());

        // 🔥 AI call only if empty
        if (technologies.isEmpty() || skills.isEmpty()) {

            Map<String, List<String>> aiData = getSkillsFromAI(career.getTitle());

            technologies = aiData.get("technologies");
            skills = aiData.get("skills");

            // 🔥 save in DB
            career.setTechnologies(listToJson(technologies));
            career.setSkills(listToJson(skills));

            repository.save(career);
        }

        return CareerResponse.builder()
                .id(career.getId())
                .title(career.getTitle())
                .description(career.getDescription())
                .category(career.getCategory())
                .salaryMin(career.getSalaryMin())
                .salaryMax(career.getSalaryMax())
                .demandLevel(career.getDemandLevel())
                .difficulty(career.getDifficulty())
                .technologies(technologies)
                .skills(skills)
                .build();
    }
}