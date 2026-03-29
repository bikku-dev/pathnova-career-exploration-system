package com.pathnova.dto.response;


import lombok.Data;
import java.util.List;

@Data
public class RoadmapResponseDTO {

    private String career;
    private List<StageDTO> stages;

    @Data
    public static class StageDTO {
        private String title;
        private List<String> topics;
        private List<String> tasks;
        private List<VideoDTO> videos;
    }

    @Data
    public static class VideoDTO {
        private String title;
        private String url;
    }
}