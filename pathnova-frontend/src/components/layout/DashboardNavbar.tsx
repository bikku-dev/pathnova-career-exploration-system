"use client"

import { useRouter } from "next/navigation"

export default function DashboardNavbar(){

const router = useRouter()

const logout = () => {

localStorage.removeItem("token")

router.push("/auth/login")

}

return(

<nav className="flex items-center justify-between px-8 py-4 border-b bg-white">

<h2 className="text-xl font-bold text-indigo-600">
pathNova
</h2>

<div className="flex items-center gap-6">

<a href="/dashboard/explore">Career Exploration</a>
<a href="/dashboard/roadmap">4-Year Roadmap</a>
<a href="/dashboard/skills">Skill Dashboard</a>
<a href="/dashboard/demand">Industry Demand</a>
<a href="/dashboard/projects">Projects</a>
<a href="/dashboard/mistakes">Student Mistakes</a>
<a href="/dashboard/ai-mentor">AI Mentor</a>

</div>

<div className="flex items-center gap-4">

<button
onClick={()=>router.push("/dashboard/profile")}
className="px-4 py-2 border rounded-lg"
>

Profile

</button>

<button
onClick={logout}
className="bg-red-500 text-white px-4 py-2 rounded-lg"
>

Logout

</button>

</div>

</nav>

)

}