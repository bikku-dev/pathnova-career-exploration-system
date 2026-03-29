package com.pathnova.service.Impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pathnova.ai.AIClient;
import com.pathnova.dto.response.RoadmapResponseDTO;
import com.pathnova.entity.Roadmap;
import com.pathnova.mapper.RoadmapMapper;
import com.pathnova.service.YouTubeService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoadmapServiceImpl {

    private final ObjectMapper objectMapper = new ObjectMapper();
    private final YouTubeService youTubeService;
    private final AIClient aiClient;

    public RoadmapServiceImpl(YouTubeService youTubeService, AIClient aiClient) {
        this.youTubeService = youTubeService;
        this.aiClient = aiClient;
    }

    public RoadmapResponseDTO generateRoadmap(String career) {

        try {

            // 🔥 1. AI CALL
            String content = aiClient.generateRoadmap(career);

            // 🔥 2. JSON → ENTITY
            Roadmap roadmap = objectMapper.readValue(content, Roadmap.class);
            roadmap.setCareer(career);

            // 🔥 3. YOUTUBE CALL ONLY ONCE (IMPORTANT)
            List<Roadmap.Video> videos = youTubeService.fetchVideos(career);

            // 👉 Sirf first stage me videos daal
            if (roadmap.getStages() != null && !roadmap.getStages().isEmpty()) {
                roadmap.getStages().get(0).setVideos(videos);
            }

            // 🔥 4. ENTITY → DTO
            return RoadmapMapper.toDTO(roadmap);

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("AI roadmap generation failed");
        }
    }
}