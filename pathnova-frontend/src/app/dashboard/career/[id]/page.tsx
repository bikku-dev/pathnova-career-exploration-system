"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { getCareerById } from "@/service/careerService";

export default function CareerDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [career, setCareer] = useState<any>(null);
  const [explanation, setExplanation] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) fetchCareer();
  }, [id]);

  const fetchCareer = async () => {
    try {
      setLoading(true);

      const data = await getCareerById(Number(id));
      console.log("CAREER:", data);

      if (!data) return;

      setCareer(data);
      generateContent(data.title);
    } catch (error) {
      console.error("FETCH ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  const generateContent = (title: string) => {
    const contentMap: any = {
      "Frontend Developer": {
        what: [
          "Build modern responsive interfaces using React and modern frameworks",
          "Convert Figma designs into pixel-perfect UI",
          "Optimize website performance and user experience",
          "Ensure cross-browser compatibility",
        ],
        daily: [
          "Develop UI features",
          "Fix styling and interaction bugs",
          "Work with backend APIs",
          "Improve accessibility and responsiveness",
        ],
        growth: [
          "Frontend Intern",
          "Junior Frontend Developer",
          "Frontend Engineer",
          "Senior Frontend Engineer",
          "Frontend Architect",
        ],
      },

      "Backend Developer": {
        what: [
          "Design server-side architecture",
          "Develop REST APIs and microservices",
          "Manage databases and security",
          "Optimize performance and scalability",
        ],
        daily: [
          "Write APIs",
          "Fix server issues",
          "Improve database queries",
          "Deploy backend systems",
        ],
        growth: [
          "Backend Intern",
          "Junior Backend Developer",
          "Backend Engineer",
          "Senior Backend Engineer",
          "System Architect",
        ],
      },

      "Machine Learning Engineer": {
        what: [
          "Build ML models",
          "Deploy models in production",
          "Work with large datasets",
          "Optimize model performance",
        ],
        daily: [
          "Train models",
          "Analyze datasets",
          "Deploy ML pipelines",
          "Improve model accuracy",
        ],
        growth: [
          "ML Intern",
          "Junior ML Engineer",
          "Machine Learning Engineer",
          "Senior ML Engineer",
          "AI Architect",
        ],
      },
    };

    setExplanation(
      contentMap[title] || {
        what: [
          "Build scalable systems",
          "Collaborate with teams",
          "Write maintainable code",
          "Solve engineering problems",
        ],
        daily: [
          "Attend standups",
          "Develop features",
          "Fix bugs",
          "Review code",
        ],
        growth: [
          "Intern",
          "Junior Developer",
          "Mid-Level Engineer",
          "Senior Engineer",
          "Architect",
        ],
      }
    );
  };

  // 🔥 Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg">Loading career details...</p>
      </div>
    );
  }

  // ❌ Safety check
  if (!career) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg">Career not found ❌</p>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      {/* BACK BUTTON */}
      <button
        onClick={() => router.push("/dashboard/explore")}
        className="mb-6 text-indigo-600 hover:underline"
      >
        ← Back to Exploration
      </button>

      {/* HERO SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white p-8 md:p-10 rounded-2xl shadow-xl mb-10 flex flex-col md:flex-row justify-between gap-6"
      >
        <div>
          <h1 className="text-4xl font-bold mb-2">{career.title}</h1>
          <p className="max-w-xl opacity-90">{career.description}</p>

          <div className="flex gap-3 mt-4">
            <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
              🔥 High Demand
            </span>
            <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
              🚀 Tech Career
            </span>
          </div>
        </div>

        <div className="text-left md:text-right">
          <p className="text-sm opacity-80">Avg Salary</p>
          <h2 className="text-3xl font-bold">
            ₹{career.salaryMax?.toLocaleString()}
          </h2>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* LEFT CONTENT */}
        <div className="lg:col-span-2 space-y-8">
          {/* WHAT */}
          <div className="bg-white p-6 rounded-xl border shadow-sm">
            <h2 className="font-semibold text-lg mb-4">
              💼 What {career.title}s Do
            </h2>
            <ul className="space-y-2 text-gray-600">
              {explanation?.what.map((item: string, i: number) => (
                <li key={i}>• {item}</li>
              ))}
            </ul>
          </div>

          {/* DAILY */}
          <div className="bg-white p-6 rounded-xl border shadow-sm">
            <h2 className="font-semibold text-lg mb-4">
              ⚙ Daily Work in Companies
            </h2>
            <ul className="space-y-2 text-gray-600">
              {explanation?.daily.map((item: string, i: number) => (
                <li key={i}>• {item}</li>
              ))}
            </ul>
          </div>

          {/* GROWTH */}
          <div className="bg-white p-6 rounded-xl border shadow-sm">
            <h2 className="font-semibold text-lg mb-4">
              📈 Career Growth Ladder
            </h2>
            <div className="space-y-3">
              {explanation?.growth.map((step: string, i: number) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center text-sm">
                    {i + 1}
                  </div>
                  <p className="text-gray-700">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-6">
          {/* STATS */}
          <div className="bg-white p-6 rounded-xl border shadow-sm">
            <h2 className="font-semibold mb-4">📊 Quick Stats</h2>
            <div className="space-y-2 text-sm">
              <p>Difficulty: {career.difficulty}</p>
              <p>Demand: {career.demandLevel}</p>
              <p>Min Salary: ₹{career.salaryMin}</p>
              <p>Max Salary: ₹{career.salaryMax}</p>
            </div>
          </div>

          {/* SKILLS */}
          <div className="bg-white p-6 rounded-xl border shadow-sm">
            <h2 className="font-semibold mb-4">🧠 Required Skills</h2>
            <div className="flex flex-wrap gap-2">
              {career.technologies?.map((tech: string, i: number) => (
                <span
                  key={i}
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm shadow"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* 🔥 FINAL ROADMAP BUTTON */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-xl shadow">
            <h3 className="font-semibold mb-2">🚀 Ready to start?</h3>

            <p className="text-sm mb-4">
              See your personalized roadmap for becoming a {career.title}
            </p>

<button
  onClick={() => {
    if (!id) {
      console.warn("❌ Invalid career ID:", id);
      return;
    }

    const safeId = Number(id);
    console.log("📌 CAREER ID:", safeId);

    router.push(`/roadmap1/${id}`);
  }}
  className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-medium hover:scale-105 transition active:scale-95"
>
  View Roadmap →
</button>
          </div>
        </div>
      </div>
    </div>
  );
}