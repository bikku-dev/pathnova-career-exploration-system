"use client"

import Link from "next/link"

export default function Navbar(){

return(

<nav className="w-full border-b bg-white">

<div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-5">

<h1 className="text-xl font-bold text-indigo-600">
pathNova
</h1>

<div className="flex gap-8 text-gray-600">

<Link href="/explore">Career Exploration</Link>
<Link href="/roadmap">4-Year Roadmap</Link>
<Link href="/dashboard">Skill Dashboard</Link>
<Link href="/demand">Industry Demand</Link>
<Link href="/projects">Projects</Link>
<Link href="/mistakes">Student Mistakes</Link>
<Link href="/mentor">AI Mentor</Link>

</div>

<Link
href="/auth/register"
className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
>

Get Started

</Link>

</div>

</nav>

)

}