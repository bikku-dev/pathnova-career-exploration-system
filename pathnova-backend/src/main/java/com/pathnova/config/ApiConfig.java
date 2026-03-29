package com.pathnova.config;

import org.springframework.stereotype.Component;

@Component
public class ApiConfig {

    public String getYoutubeKey() {
        return System.getenv("YOUTUBE_API_KEY");
    }

    public String getGroqKey() {
        return System.getenv("GROQ_API_KEY");
    }
}