"use client"

import Link from "next/link"
import { motion } from "framer-motion"

export default function Home() {

return(

<div className="min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600 text-white">

{/* Navbar */}

<nav className="flex justify-between items-center px-10 py-6">

<h1 className="text-3xl font-bold">
PathNova
</h1>

<div className="flex gap-6">

<Link href="/auth/login" className="hover:underline">
Login
</Link>

<Link 
href="/auth/register"
className="bg-white text-black px-4 py-2 rounded-lg"
>
Register
</Link>

</div>

</nav>

{/* Hero Section */}

<div className="flex flex-col items-center justify-center text-center mt-32 px-6">

<motion.h1
initial={{opacity:0,y:-40}}
animate={{opacity:1,y:0}}
transition={{duration:0.6}}
className="text-5xl font-bold mb-6"
>

AI Career Guidance Platform

</motion.h1>

<motion.p
initial={{opacity:0}}
animate={{opacity:1}}
transition={{delay:0.3}}
className="max-w-xl text-lg mb-10"
>

Discover your ideal career path with AI-powered
recommendations, skill analysis and personalized
roadmaps.

</motion.p>

<motion.div
initial={{opacity:0,y:40}}
animate={{opacity:1,y:0}}
transition={{delay:0.5}}
className="flex gap-6"
>

<Link
href="/auth/register"
className="bg-white text-black px-6 py-3 rounded-lg font-semibold"
>
Get Started
</Link>

<Link
href="/auth/login"
className="border border-white px-6 py-3 rounded-lg"
>
Login
</Link>

</motion.div>

</div>

</div>

)

}