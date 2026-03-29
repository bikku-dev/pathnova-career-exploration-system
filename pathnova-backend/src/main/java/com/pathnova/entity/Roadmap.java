package com.pathnova.entity;

import lombok.Data;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class Roadmap {

    private String career;
    private List<Stage> stages;

    @Data
    public static class Stage {
        private String title;
        private List<String> topics;
        private List<String> tasks;
        private List<Video> videos; // 🔥 add here
    }

    @Data
    public static class Video {
        private String title;
        private String url;
    }
}