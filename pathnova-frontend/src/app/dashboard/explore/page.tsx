"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { getAllCareers } from "@/service/careerService"

export default function ExplorePage(){

const [careers,setCareers] = useState<any[]>([])
const [filtered,setFiltered] = useState<any[]>([])
const [search,setSearch] = useState("")
const router = useRouter()

useEffect(()=>{
fetchCareers()
},[])

const fetchCareers = async()=>{
const data = await getAllCareers()
setCareers(data)
setFiltered(data)
}

// 🔥 SEARCH
const handleSearch = (value:string)=>{
setSearch(value)

const result = careers.filter((c:any)=>
c.title.toLowerCase().includes(value.toLowerCase())
)

setFiltered(result)
}

// 🔥 ENTER → AI
const handleEnter = (e:any)=>{
if(e.key==="Enter"){
if(filtered.length===0 && search){
const slug = search.toLowerCase().replace(/\s+/g,"-")
router.push(`/dashboard/custom-career/${slug}`)
}
}
}

return(

<div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6">

{/* 🔥 HEADER */}

<motion.div
initial={{opacity:0,y:-20}}
animate={{opacity:1,y:0}}
className="mb-10 text-center"
>
<h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
Explore Careers 🚀
</h1>

<p className="text-gray-500 mt-2">
Discover your perfect tech career path
</p>
</motion.div>


{/* 🔥 SEARCH BAR */}

<motion.div
initial={{opacity:0,y:20}}
animate={{opacity:1,y:0}}
className="max-w-2xl mx-auto mb-10 flex gap-3"
>

<input
value={search}
onChange={(e)=>handleSearch(e.target.value)}
onKeyDown={handleEnter}
placeholder="Search careers (e.g. DevOps Engineer)"
className="flex-1 px-5 py-3 rounded-xl border border-gray-200 shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none"
/>

<button
onClick={()=>{
if(filtered.length===0 && search){
const slug = search.toLowerCase().replace(/\s+/g,"-")
router.push(`/dashboard/custom-career/${slug}`)
}
}}
className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium shadow hover:scale-105 transition"
>
Search
</button>

</motion.div>


{/* 🔥 NO RESULT (AI OPTION) */}

{filtered.length===0 && search && (

<motion.div
initial={{opacity:0}}
animate={{opacity:1}}
className="text-center mb-10"
>

<p className="text-gray-500 mb-4">
No match found for <span className="font-semibold">{search}</span>
</p>

<button
onClick={()=>{
const slug = search.toLowerCase().replace(/\s+/g,"-")
router.push(`/dashboard/custom-career/${slug}`)
}}
className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg shadow hover:scale-105 transition"
>
🔍 Generate with AI
</button>

</motion.div>

)}


{/* 🔥 CARDS */}

<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

{filtered.map((career:any,i:number)=>(

<motion.div
key={career.id}
initial={{opacity:0,y:30}}
animate={{opacity:1,y:0}}
transition={{delay:i*0.05}}
whileHover={{scale:1.05}}
onClick={()=>router.push(`/dashboard/career/${career.id}`)}
className="cursor-pointer p-6 rounded-2xl bg-white/70 backdrop-blur-lg border border-gray-200 shadow-lg hover:shadow-2xl transition"
>

<h2 className="text-xl font-semibold text-gray-800">
{career.title}
</h2>

<p className="text-gray-500 mt-3 text-sm">
{career.description}
</p>

<div className="mt-4 flex justify-between items-center">

<span className="text-xs bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full">
High Demand
</span>

<span className="text-indigo-600 font-medium text-sm">
Explore →
</span>

</div>

</motion.div>

))}

</div>

</div>
)
}