"use client"

import Navbar from "@/components/layout/DashboardNavbar"
import Hero3D from "@/components/three/Hero3D"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function Home(){

const router = useRouter()

useEffect(()=>{

gsap.utils.toArray(".reveal").forEach((el:any)=>{

gsap.fromTo(el,
{opacity:0,y:60},
{
opacity:1,
y:0,
duration:1,
scrollTrigger:{
trigger:el,
start:"top 85%"
}
})

})

},[])

return(

<div className="bg-gradient-to-b from-indigo-50 via-purple-50 to-white overflow-hidden">

<Navbar/>

{/* HERO */}

<section className="max-w-7xl mx-auto px-6 pt-28 grid md:grid-cols-2 gap-12 items-center">

<div>

<h1 className="text-5xl md:text-6xl font-extrabold leading-tight">

Visualize Your

<span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
 Entire Career
</span>

<br/>Before It's Too Late

</h1>

<p className="text-gray-600 mt-6 text-lg max-w-xl">

The Career GPS for engineering students.
Discover career paths, track skills and follow a roadmap to your dream job.

</p>

<div className="flex gap-4 mt-8 flex-wrap">

<button
onClick={()=>router.push("/dashboard/explore")}
className="bg-indigo-600 text-white px-6 py-3 rounded-xl shadow-lg hover:scale-105 transition"
>

Start Career Exploration →

</button>

<button className="border px-6 py-3 rounded-xl hover:bg-gray-50">

Take Career Discovery Test

</button>

</div>

<div className="flex gap-12 mt-10">

<div>

<h3 className="text-3xl font-bold text-indigo-600">
20+
</h3>

<p className="text-gray-500 text-sm">
Career Paths
</p>

</div>

<div>

<h3 className="text-3xl font-bold text-purple-600">
4 Year
</h3>

<p className="text-gray-500 text-sm">
Career Roadmap
</p>

</div>

<div>

<h3 className="text-3xl font-bold text-pink-600">
100+
</h3>

<p className="text-gray-500 text-sm">
Skill Milestones
</p>

</div>

</div>

</div>

<div className="h-[420px] w-full">

<Hero3D/>

</div>

</section>

{/* CAREER PATHS */}

<section className="py-28 bg-white reveal">

<div className="max-w-6xl mx-auto text-center">

<h2 className="text-4xl font-bold">

Explore Tech Career Paths

</h2>

<p className="text-gray-600 mt-4">

Discover different domains in technology.

</p>

</div>

<div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto mt-16 px-6">

{[
"Frontend Developer",
"Backend Developer",
"Data Scientist",
"Machine Learning Engineer",
"Cloud Engineer",
"DevOps Engineer",
"Cyber Security",
"Product Manager"
].map((item,i)=>(

<div
key={i}
onClick={()=>router.push("/dashboard/explore")}
className="bg-white p-8 rounded-xl shadow hover:shadow-xl transition hover:-translate-y-2 cursor-pointer"
>

<h3 className="text-lg font-semibold">

{item}

</h3>

<p className="text-gray-500 mt-2">

Skills, salary, roadmap and future demand.

</p>

</div>

))}

</div>

</section>

{/* ROADMAP */}

<section className="py-28 bg-gradient-to-b from-indigo-50 to-white reveal">

<div className="max-w-6xl mx-auto text-center">

<h2 className="text-4xl font-bold">

4 Year Career Roadmap

</h2>

</div>

<div className="grid md:grid-cols-4 gap-8 mt-16 max-w-6xl mx-auto px-6">

{[
{year:"Year 1",title:"Programming Basics"},
{year:"Year 2",title:"Core Development Skills"},
{year:"Year 3",title:"Projects + Internships"},
{year:"Year 4",title:"System Design + Interviews"}
].map((item,i)=>(

<div
key={i}
className="bg-gradient-to-br from-indigo-500 to-purple-500 text-white p-8 rounded-xl shadow-lg"
>

<h3 className="text-xl font-bold">

{item.year}

</h3>

<p className="mt-2">

{item.title}

</p>

</div>

))}

</div>

</section>

{/* INDUSTRY */}

<section className="py-28 reveal">

<div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 px-6 items-center">

<img
src="https://images.unsplash.com/photo-1519389950473-47ba0277781c"
className="rounded-2xl shadow-lg"
/>

<div>

<h2 className="text-4xl font-bold">

Understand Industry Expectations

</h2>

<ul className="mt-6 space-y-4 text-gray-600">

<li>Real-world skills companies expect</li>
<li>Salary and growth insights</li>
<li>Industry demand trends</li>
<li>Interview preparation roadmap</li>

</ul>

<button
onClick={()=>router.push("/dashboard/explore")}
className="mt-6 bg-indigo-600 text-white px-6 py-3 rounded-xl"
>

Explore Careers →

</button>

</div>

</div>

</section>

{/* FEATURES */}

<section className="py-28 bg-gray-50 reveal">

<div className="max-w-7xl mx-auto px-6">

<h2 className="text-4xl font-bold text-center">

Everything you need

</h2>

<div className="grid md:grid-cols-3 gap-12 mt-20">

{[
"Career Exploration",
"Industry Demand Insights",
"AI Career Mentor",
"Project Recommendations",
"Skill Dashboard",
"Learning Roadmaps"
].map((f,i)=>(

<div
key={i}
className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-xl transition"
>

<h3 className="text-xl font-semibold">

{f}

</h3>

<p className="text-gray-500 mt-3">

Navigate your tech career smarter.

</p>

</div>

))}

</div>

</div>

</section>

{/* CTA */}

<section className="py-28 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center reveal">

<h2 className="text-4xl font-bold">

Start your career journey today

</h2>

<p className="mt-4 opacity-90">

Join thousands of students exploring their future careers.

</p>

<div className="flex justify-center gap-6 mt-8 flex-wrap">

<button
onClick={()=>router.push("/dashboard/explore")}
className="bg-white text-indigo-600 px-6 py-3 rounded-xl"
>

Start Career Exploration

</button>

<button className="border px-6 py-3 rounded-xl">

Talk to AI Mentor

</button>

</div>

</section>

<footer className="bg-gray-900 text-white py-10 text-center">

<p>© 2026 PathNova — Career GPS Platform</p>

</footer>

</div>

)

}