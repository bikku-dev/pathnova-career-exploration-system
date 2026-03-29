import axiosInstance from "@/app/utils/axiosInstance";

// 🔥 AI Career Explanation
export const generateCareerExplanation = async (title: string) => {
  try {
    if (!title) {
      console.warn("⚠️ Empty title passed to AI");
      return { what: [], daily: [], growth: [] };
    }

    const res = await axiosInstance.post("/ai/career", {
      careerTitle: title.trim(),
    });

    return res.data;
  } catch (error: any) {
    console.error("❌ AI CAREER ERROR:", error?.response?.data || error.message);
    return {
      what: [],
      daily: [],
      growth: [],
    };
  }
};

// 🔥 AI Roadmap
export const getAIRoadmap = async (title: string) => {
  try {
    if (!title) {
      console.warn("⚠️ No title provided for roadmap");
      return null;
    }

    const cleanTitle = title.trim();
    console.log("📌 ORIGINAL TITLE:", cleanTitle);

    const encoded = encodeURIComponent(cleanTitle);
    console.log("📌 ENCODED TITLE:", encoded);

    const url = `/roadmap/${encoded}`;
    console.log("📌 API URL:", url);
    

    const res = await axiosInstance.get(url);

    console.log("📌 API RESPONSE:", res.data);

    const data = res.data;

    if (!data || !Array.isArray(data.stages)) {
      console.error("❌ Invalid AI response structure:", data);
      return null;
    }

    return data;
  } catch (error: any) {
    console.error("❌ AI ROADMAP ERROR:", error?.response?.data || error.message);
    return null;
  }
};