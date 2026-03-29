package com.pathnova.ai;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pathnova.config.ApiConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Map;

@Component
public class AIClient {

    private final WebClient webClient;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Autowired
    private ApiConfig config;

    public AIClient(WebClient.Builder builder) {
        this.webClient = builder
                .baseUrl("https://api.groq.com/openai/v1")
                .build();
    }
    // =========================
// 🔥 GENERATE TECHNOLOGIES + SKILLS
// =========================
    public String generateCareerSkills(String career) {

        try {
            String apiKey = config.getGroqKey();

            String c = career.trim();

            String prompt = """
You are an expert software engineer and career mentor.

Give response in STRICT JSON format only.

Career: %s

Task:
List ALL technologies and ALL skills required to become this role.

IMPORTANT RULES:
- Do NOT limit to few items
- Give COMPLETE list (15–30 technologies)
- Cover beginner to advanced
- Include real-world tools

Return format:
{
  "technologies": ["tech1", "tech2", "..."],
  "skills": ["skill1", "skill2", "..."]
}
""".formatted(c);

            Map<String, Object> requestBody = Map.of(
                    "model", "llama-3.3-70b-versatile",
                    "temperature", 0.2,
                    "messages", List.of(
                            Map.of("role", "user", "content", prompt)
                    )
            );

            Map response = webClient.post()
                    .uri("/chat/completions")
                    .header("Authorization", "Bearer " + apiKey)
                    .header("Content-Type", "application/json")
                    .bodyValue(requestBody)
                    .retrieve()
                    .bodyToMono(Map.class)
                    .block();

            return extractJson(response);

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("AI Skills API failed");
        }
    }
    // =========================
    // 🔥 GENERATE ROADMAP
    // =========================
    public String generateRoadmap(String career) {

        try {
            String apiKey = config.getGroqKey();

            String c = career.trim();

            String prompt = """
You are an expert career mentor and teacher who explains things in a very simple, beginner-friendly way.

Create a COMPLETE and EASY-TO-UNDERSTAND roadmap for becoming a %s.

🎯 GOAL:
- A total beginner (fresher) should understand everything clearly
- Use simple English (no complex jargon)
- Make it practical and real-world focused

----------------------------

📌 FIRST: DESCRIPTION (VERY IMPORTANT)

You MUST generate a "description" field.

The description MUST include:

1. What is %s? (in very simple words)
2. What does a %s actually do in real life?
3. How this role works in real-world systems
4. One real-world example (like Amazon, Instagram, etc.)
5. Why this career is important

👉 Write like teaching a beginner student  
👉 Keep it simple, clear, and practical  

❗ IMPORTANT:
- "description" field is MANDATORY
- If description is missing, the response is INVALID

----------------------------

📌 SECOND: ROADMAP STAGES

- Create 5 to 7 stages (not more)
- Each stage must be practical and industry-relevant
- Avoid generic names like "Basics" or "Advanced"

Each stage must include:

- "title" → clear and specific
- "topics" → what to learn
- "tasks" → what to DO (real practice)

👉 Tasks must be ACTION-based (build, create, implement)

----------------------------

📌 RULES:

- Keep everything simple and beginner-friendly
- Focus on real-world skills used in jobs
- Do NOT skip any field
- Do NOT return incomplete JSON

----------------------------

📌 OUTPUT FORMAT (STRICT JSON ONLY):

{
  "career": "%s",
  "description": "MANDATORY: Explain clearly what this career is, how it works in real world, and give one real-life example",
  "stages": [
    {
      "title": "Stage title",
      "topics": ["topic1", "topic2"],
      "tasks": ["task1", "task2"]
    }
  ]
}
""".formatted(c, c, c, c);
            Map<String, Object> requestBody = Map.of(
                    "model", "llama-3.3-70b-versatile",
                    "temperature", 0.3,
                    "messages", List.of(
                            Map.of("role", "user", "content", prompt)
                    )
            );

            Map response = webClient.post()
                    .uri("/chat/completions")
                    .header("Authorization", "Bearer " + apiKey)
                    .header("Content-Type", "application/json")
                    .bodyValue(requestBody)
                    .retrieve()
                    .bodyToMono(Map.class)
                    .block();

            System.out.println("🔥 RAW AI RESPONSE = " + response);

            String json = extractJson(response);

            System.out.println("✅ CLEAN JSON = " + json);

            return json;

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("AI Roadmap API failed");
        }
    }

    // =========================
    // 🔥 JSON EXTRACT (SAFE)
    // =========================
    private String extractJson(Map response) {

        try {
            if (response == null) {
                throw new RuntimeException("AI response is null");
            }

            List<?> choices = (List<?>) response.get("choices");

            if (choices == null || choices.isEmpty()) {
                throw new RuntimeException("No choices in AI response");
            }

            Map<?, ?> choice = (Map<?, ?>) choices.get(0);
            Map<?, ?> message = (Map<?, ?>) choice.get("message");

            if (message == null) {
                throw new RuntimeException("No message in AI response");
            }

            String content = (String) message.get("content");

            if (content == null || content.isEmpty()) {
                throw new RuntimeException("Empty AI content");
            }

            int start = content.indexOf("{");
            int end = content.lastIndexOf("}");

            if (start == -1 || end == -1) {
                throw new RuntimeException("Invalid JSON format from AI");
            }

            return content.substring(start, end + 1);

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("JSON extraction failed");
        }
    }
}