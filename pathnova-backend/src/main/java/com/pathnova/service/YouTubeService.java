package com.pathnova.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.pathnova.config.ApiConfig;
import com.pathnova.entity.Roadmap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

@Service
public class YouTubeService {

    @Autowired
    private ApiConfig config;

    private final WebClient webClient = WebClient.create();
    private final ObjectMapper mapper = new ObjectMapper();

    // =========================
    // 🔥 FETCH ONLY 2–3 BEST VIDEOS
    // =========================
    public List<Roadmap.Video> fetchVideos(String careerTitle) {

        List<Roadmap.Video> videos = new ArrayList<>();

        try {

            String apiKey = config.getYoutubeKey();

            // 🔥 CLEAN QUERY (NO RANDOM)
            String query = careerTitle.trim() + " complete course tutorial";

            String encodedQuery = URLEncoder.encode(query, StandardCharsets.UTF_8);

            String url = "https://www.googleapis.com/youtube/v3/search"
                    + "?part=snippet"
                    + "&q=" + encodedQuery
                    + "&type=video"
                    + "&maxResults=6" // 🔥 fetch more → filter best
                    + "&order=viewCount"
                    + "&videoDuration=medium"
                    + "&videoDefinition=high"
                    + "&relevanceLanguage=en"
                    + "&key=" + apiKey;

            System.out.println("📺 YOUTUBE URL = " + url);

            String response = webClient.get()
                    .uri(url)
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();

            if (response == null) {
                return videos;
            }

            JsonNode root = mapper.readTree(response);
            JsonNode items = root.get("items");

            if (items != null && items.isArray()) {
                for (JsonNode item : items) {

                    if (item.get("id") == null || item.get("snippet") == null) continue;

                    String videoId = item.get("id").get("videoId").asText();
                    String title = item.get("snippet").get("title").asText();

                    String lower = title.toLowerCase();

                    // 🔥 STRONG FILTER (faltu hata)
                    if (lower.contains("shorts")) continue;
                    if (lower.contains("trailer")) continue;
                    if (lower.contains("clip")) continue;
                    if (lower.contains("movie")) continue;
                    if (lower.contains("status")) continue;

                    Roadmap.Video video = new Roadmap.Video();
                    video.setTitle(title);
                    video.setUrl("https://www.youtube.com/watch?v=" + videoId);

                    videos.add(video);

                    // ✅ ONLY 3 VIDEOS MAX
                    if (videos.size() >= 3) break;
                }
            }

        } catch (Exception e) {
            System.out.println("❌ YouTube API ERROR: " + e.getMessage());
        }

        return videos;
    }
}