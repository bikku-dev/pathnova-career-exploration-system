import axiosInstance from "@/app/utils/axiosInstance";

export interface Career {
  id: number;
  title: string;
  description: string;
  category: string;
  salaryMin: number;
  salaryMax: number;
  difficulty?: string;
  demandLevel?: string;
  technologies?: string[];
}

// 🔥 Get all careers
export const getAllCareers = async (): Promise<Career[]> => {
  try {
    const response = await axiosInstance.get("/careers");

    if (!Array.isArray(response.data)) {
      console.error("❌ Invalid careers response:", response.data);
      return [];
    }

    return response.data;
  } catch (error: any) {
    console.error("❌ GET ALL CAREERS ERROR:", error?.response?.data || error.message);
    return [];
  }
};

// 🔥 Get career by ID
export const getCareerById = async (id: number): Promise<Career | null> => {
  try {
    if (!id || isNaN(id)) {
      console.warn("⚠️ Invalid career ID:", id);
      return null;
    }

    const response = await axiosInstance.get(`/careers/${id}`);

    if (!response.data || !response.data.title) {
      console.error("❌ Invalid career response:", response.data);
      return null;
    }

    return response.data;
  } catch (error: any) {
    console.error("❌ GET CAREER BY ID ERROR:", error?.response?.data || error.message);
    return null;
  }
};