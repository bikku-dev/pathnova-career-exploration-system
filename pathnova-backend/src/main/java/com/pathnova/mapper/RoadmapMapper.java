package com.pathnova.mapper;

import com.pathnova.dto.response.RoadmapResponseDTO;
import com.pathnova.entity.Roadmap;

import java.util.stream.Collectors;

public class RoadmapMapper {

    public static RoadmapResponseDTO toDTO(Roadmap roadmap) {

        RoadmapResponseDTO dto = new RoadmapResponseDTO();
        dto.setCareer(roadmap.getCareer());

        dto.setStages(
                roadmap.getStages().stream().map(stage -> {

                    RoadmapResponseDTO.StageDTO s = new RoadmapResponseDTO.StageDTO();
                    s.setTitle(stage.getTitle());
                    s.setTopics(stage.getTopics());
                    s.setTasks(stage.getTasks());

                    if (stage.getVideos() != null) {
                        s.setVideos(
                                stage.getVideos().stream().map(v -> {
                                    RoadmapResponseDTO.VideoDTO vd = new RoadmapResponseDTO.VideoDTO();
                                    vd.setTitle(v.getTitle());
                                    vd.setUrl(v.getUrl());
                                    return vd;
                                }).collect(Collectors.toList())
                        );
                    }

                    return s;

                }).collect(Collectors.toList())
        );

        return dto;
    }
}