"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getCareerById } from "@/service/careerService";
import { getAIRoadmap } from "@/service/aiService";

export default function RoadmapPage() {
  const params = useParams();
  const id = params?.id ? Number(params.id) : null;

  const [careerName, setCareerName] = useState("");
  const [roadmap, setRoadmap] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id && !isNaN(id)) load(id);
    else setLoading(false);
  }, [id]);

  const getVideoId = (url: string) => {
    try {
      const u = new URL(url);
      if (u.hostname.includes("youtube.com")) return u.searchParams.get("v") || "";
      if (u.hostname.includes("youtu.be")) return u.pathname.replace("/", "");
    } catch {}
    return "";
  };

  const load = async (careerId: number) => {
    try {
      const career = await getCareerById(careerId);
      if (!career?.title) return;

      const title = career.title.trim();
      setCareerName(title);

      const ai = await getAIRoadmap(title);
      console.log("AI RESPONSE:", ai);
      if (!ai?.stages) return;

      setRoadmap(ai);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-xl font-semibold bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        🚀 Generating your roadmap...
      </div>
    );
  }

  if (!roadmap) {
    return (
      <div className="h-screen flex items-center justify-center text-red-500 text-xl">
        No roadmap found ❌
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">

      {/* 🔥 HEADER */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <h1 className="text-3xl md:text-4xl font-bold">
            🚀 {careerName} Roadmap
          </h1>
          <p className="text-sm opacity-90 mt-1">
            Step-by-step guide to master this career
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* 🔥 DESCRIPTION */}
        <div className="bg-white p-6 rounded-2xl shadow-lg mb-10 border-l-4 border-blue-500">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">
            📘 What is {careerName}?
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {roadmap.description}
          </p>
        </div>

        {/* 🔥 STEPS */}
        <div className="space-y-10">

          {roadmap.stages.map((stage: any, index: number) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition border"
            >
              {/* Header */}
              <div className="flex items-center gap-4 mb-5">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold">
                  {index + 1}
                </div>
                <h2 className="text-lg md:text-xl font-semibold text-gray-800">
                  {stage.title}
                </h2>
              </div>

              {/* Grid layout */}
              <div className="grid md:grid-cols-2 gap-6">

                {/* Topics */}
                <div>
                  <h3 className="font-medium text-blue-600 mb-2">
                    📚 What to Learn
                  </h3>
                  <ul className="list-disc ml-5 text-gray-600 text-sm space-y-1">
                    {stage?.topics?.map((t: string, i: number) => (
                      <li key={i}>{t}</li>
                    ))}
                  </ul>
                </div>

                {/* Tasks */}
                <div>
                  <h3 className="font-medium text-purple-600 mb-2">
                    🛠 Practice / Tasks
                  </h3>
                  <ul className="list-disc ml-5 text-gray-600 text-sm space-y-1">
                    {stage?.tasks?.map((t: string, i: number) => (
                      <li key={i}>{t}</li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Tip */}
              <div className="mt-4 bg-gradient-to-r from-blue-100 to-purple-100 p-3 rounded-lg text-sm text-gray-700">
                💡 Pro Tip: Build real-world projects from this step to stand out in interviews.
              </div>
            </div>
          ))}

        </div>

        {/* 🔥 VIDEOS */}
        <div className="mt-14">
          <h2 className="text-2xl font-semibold mb-5 text-gray-800">
            🎥 Learn with Videos
          </h2>

          <div className="flex gap-5 overflow-x-auto pb-3">

            {roadmap.stages.flatMap((stage: any) =>
              stage?.videos?.map((video: any, i: number) => {
                const vid = getVideoId(video.url);
                if (!vid) return null;

                return (
                  <div
                    key={i}
                    className="min-w-[300px] bg-white rounded-xl shadow-md p-2"
                  >
                    <iframe
                      src={`https://www.youtube.com/embed/${vid}`}
                      className="w-full h-[170px] rounded-lg"
                      allowFullScreen
                    />
                  </div>
                );
              })
            )}

          </div>
        </div>

      </div>
    </div>
  );
}