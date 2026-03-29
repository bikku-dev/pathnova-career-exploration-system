"use client"

import { useEffect, useState } from "react"
import { ChevronDown } from "lucide-react"

export default function RoadmapPage() {

  const [openYear, setOpenYear] = useState<number | null>(null)
  const [completedTasks, setCompletedTasks] = useState<string[]>([])
  const [overallProgress, setOverallProgress] = useState(0)

  // LOAD
  useEffect(() => {
    const saved = localStorage.getItem("progress")
    if (saved) setCompletedTasks(JSON.parse(saved))
  }, [])

  // SAVE
  useEffect(() => {
    localStorage.setItem("progress", JSON.stringify(completedTasks))
    calculateOverall()
  }, [completedTasks])

  // 🔥 UNIVERSAL ROADMAP (FOR ANY CAREER)
  const roadmap = [
    {
      year: 1,
      icon: "🌱",
      title: "Foundation",
      description: "Build strong basics",
      semesters: [
        {
          name: "Semester 1",
          tasks: [
            "Understand core fundamentals",
            "Start problem solving",
            "Learn tools (Git, IDE)",
            "Build 2 beginner projects"
          ]
        },
        {
          name: "Semester 2",
          tasks: [
            "Deepen core concepts",
            "Start structured learning",
            "Create portfolio website",
            "Solve 50+ practice problems"
          ]
        }
      ]
    },
    {
      year: 2,
      icon: "🛠",
      title: "Skill Building",
      description: "Develop real-world skills",
      semesters: [
        {
          name: "Semester 3",
          tasks: [
            "Choose specialization",
            "Learn frameworks/tools",
            "Build 2 intermediate projects",
            "Start collaboration (GitHub)"
          ]
        },
        {
          name: "Semester 4",
          tasks: [
            "Learn databases / advanced tools",
            "Build full project",
            "Deploy your project",
            "Start applying internships"
          ]
        }
      ]
    },
    {
      year: 3,
      icon: "🚀",
      title: "Experience",
      description: "Gain practical exposure",
      semesters: [
        {
          name: "Semester 5",
          tasks: [
            "Build advanced projects",
            "Learn system thinking",
            "Improve problem solving",
            "Contribute to open source"
          ]
        },
        {
          name: "Semester 6",
          tasks: [
            "Complete internship",
            "Work on real problems",
            "Optimize projects",
            "Prepare resume & portfolio"
          ]
        }
      ]
    },
    {
      year: 4,
      icon: "🎯",
      title: "Career Launch",
      description: "Get job ready",
      semesters: [
        {
          name: "Semester 7",
          tasks: [
            "Practice interviews",
            "Revise core concepts",
            "Apply for jobs",
            "Mock interviews"
          ]
        },
        {
          name: "Semester 8",
          tasks: [
            "Advanced interview prep",
            "Solve high-level problems",
            "Negotiate offers",
            "Finalize job 🎉"
          ]
        }
      ]
    }
  ]

  const toggleYear = (year: number) => {
    setOpenYear(openYear === year ? null : year)
  }

  const toggleTask = (task: string) => {
    if (completedTasks.includes(task)) {
      setCompletedTasks(completedTasks.filter(t => t !== task))
    } else {
      setCompletedTasks([...completedTasks, task])
    }
  }

  // PROGRESS
  const calculateYearProgress = (year: any) => {
    let total = 0, done = 0
    year.semesters.forEach((sem: any) => {
      sem.tasks.forEach((task: string) => {
        total++
        if (completedTasks.includes(task)) done++
      })
    })
    return Math.round((done / total) * 100)
  }

  const calculateOverall = () => {
    let total = 0, done = 0
    roadmap.forEach(year => {
      year.semesters.forEach(sem => {
        sem.tasks.forEach(task => {
          total++
          if (completedTasks.includes(task)) done++
        })
      })
    })
    setOverallProgress(Math.round((done / total) * 100))
  }

  // 🔥 AI SYSTEM
  const getWeakAreas = () => {
    return roadmap.flatMap(y =>
      y.semesters.flatMap(s =>
        s.tasks.filter(t => !completedTasks.includes(t))
      )
    )
  }

  const getPlan = () => {
    if (overallProgress < 30) return ["Focus on basics", "Practice daily", "Avoid distractions"]
    if (overallProgress < 70) return ["Build projects", "Improve skills", "Stay consistent"]
    return ["Mock interviews", "Apply jobs", "Revise concepts"]
  }

  const getLevel = () => {
    if (overallProgress < 30) return "Beginner"
    if (overallProgress < 70) return "Intermediate"
    return "Advanced"
  }

  const getDailyTasks = () => getWeakAreas().slice(0, 3)

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">

      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-2 text-gray-800">
        AI Career Roadmap 🚀
      </h1>

      {/* PROGRESS CARD */}
      <div className="bg-white shadow-lg rounded-xl p-6 mb-8">

        <div className="flex justify-between">
          <span className="font-medium">Overall Progress</span>
          <span>{overallProgress}%</span>
        </div>

        <div className="w-full h-3 bg-gray-200 rounded-full mt-2">
          <div
            className="h-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full transition-all"
            style={{ width: `${overallProgress}%` }}
          />
        </div>

        <p className="mt-3 text-indigo-600 font-medium">
          Level: {getLevel()}
        </p>
      </div>

      {/* AI PANEL */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">

        <div className="bg-indigo-50 p-4 rounded-lg shadow">
          <h3 className="font-semibold mb-2">🎯 Plan</h3>
          {getPlan().map((p, i) => <p key={i}>• {p}</p>)}
        </div>

        <div className="bg-red-50 p-4 rounded-lg shadow">
          <h3 className="font-semibold mb-2">⚠️ Weak Areas</h3>
          {getWeakAreas().slice(0, 5).map((w, i) => <p key={i}>• {w}</p>)}
        </div>

        <div className="bg-green-50 p-4 rounded-lg shadow">
          <h3 className="font-semibold mb-2">📅 Daily Tasks</h3>
          {getDailyTasks().map((d, i) => <p key={i}>• {d}</p>)}
        </div>

      </div>

      {/* TIMELINE */}
      <div className="flex items-center justify-between mb-12">

        {roadmap.map((item, i) => {
          const progress = calculateYearProgress(item)

          return (
            <div key={i} className="flex items-center flex-1">

              <div
                onClick={() => toggleYear(item.year)}
                className="flex flex-col items-center cursor-pointer"
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-xl shadow-md
                ${openYear === item.year
                    ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white scale-110"
                    : "bg-white"}
                `}>
                  {item.icon}
                </div>

                <span className="mt-2 text-sm font-medium">Year {item.year}</span>
                <span className="text-xs text-gray-500">{progress}%</span>
              </div>

              {i !== roadmap.length - 1 && (
                <div className="flex-1 h-[2px] bg-gray-300 mx-4" />
              )}

            </div>
          )
        })}

      </div>

      {/* DETAILS */}
      <div className="space-y-6">

        {roadmap.map((year, index) => (

          <div key={index} className="bg-white rounded-xl shadow">

            <div
              onClick={() => toggleYear(year.year)}
              className="flex justify-between p-5 cursor-pointer"
            >
              <h2 className="font-semibold">Year {year.year} - {year.title}</h2>
              <ChevronDown />
            </div>

            {openYear === year.year && (
              <div className="grid md:grid-cols-2 gap-6 p-5 bg-gray-50">

                {year.semesters.map((sem, i) => (
                  <div key={i} className="bg-white p-4 rounded-lg shadow-sm">

                    <h3 className="mb-3 font-medium">{sem.name}</h3>

                    {sem.tasks.map((task, j) => (
                      <div key={j} className="flex gap-2 mb-2">

                        <input
                          type="checkbox"
                          checked={completedTasks.includes(task)}
                          onChange={() => toggleTask(task)}
                        />

                        <span className={completedTasks.includes(task) ? "line-through text-gray-400" : ""}>
                          {task}
                        </span>

                      </div>
                    ))}

                  </div>
                ))}

              </div>
            )}

          </div>

        ))}

      </div>

    </div>
  )
}