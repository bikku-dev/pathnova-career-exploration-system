package com.pathnova.controller;

import com.pathnova.dto.response.RoadmapResponseDTO;
import com.pathnova.service.Impl.RoadmapServiceImpl;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/roadmap")
@CrossOrigin(origins = "http://localhost:3000")
public class RoadmapController {

    private final RoadmapServiceImpl roadmapService;

    // 🔥 constructor injection
    public RoadmapController(RoadmapServiceImpl roadmapService) {
        this.roadmapService = roadmapService;
    }

    // 🚀 API ENDPOINT
    @GetMapping("/{career}")
    public RoadmapResponseDTO generate(@PathVariable String career) {
        return roadmapService.generateRoadmap(career);
    }
}