"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { X } from "lucide-react"

export default function Sidebar(){

  const path = usePathname()
  const [open,setOpen] = useState(false)

  // 🔥 LISTEN EVENT FROM NAVBAR
  useEffect(() => {
    const openSidebar = () => setOpen(true)
    window.addEventListener("openSidebar", openSidebar)

    return () => window.removeEventListener("openSidebar", openSidebar)
  }, [])

  const links = [
    {label:"Home",href:"/dashboard"},
    {label:"Career Exploration",href:"/dashboard/explore"},
    {label:"4-Year Roadmap",href:"/dashboard/roadmap"},
    {label:"Skill Dashboard",href:"/dashboard/skills"},
    {label:"Industry Demand",href:"/dashboard/demand"},
    {label:"Projects",href:"/dashboard/projects"},
    {label:"Student Mistakes",href:"/dashboard/mistakes"},
    {label:"AI Mentor",href:"/dashboard/ai-mentor"}
  ]

  return(
    <>

      {/* 🔥 OVERLAY */}
      {open && (
        <div
          onClick={()=>setOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* 🔥 SIDEBAR */}
      <div className={`
        fixed top-0 left-0 h-full w-64 
        bg-white border-r p-6 z-50
        transform transition-transform duration-300 ease-in-out

        ${open ? "translate-x-0" : "-translate-x-full"}

        lg:translate-x-0 lg:static lg:block
      `}>

        {/* 🔥 MOBILE HEADER */}
        <div className="flex justify-between items-center mb-8 lg:hidden">

          <h2 className="text-xl font-bold text-indigo-600">
            pathNova
          </h2>

          <button onClick={()=>setOpen(false)}>
            <X size={26}/>
          </button>

        </div>

        {/* 🔥 DESKTOP LOGO */}
        <h2 className="text-xl font-bold text-indigo-600 mb-8 hidden lg:block">
          pathNova
        </h2>

        {/* 🔥 LINKS */}
        <div className="space-y-2 overflow-y-auto">

          {links.map((link)=>{

            const isActive = path === link.href

            return(
              <Link
                key={link.href}
                href={link.href}
                onClick={()=>setOpen(false)}
                className={`
                  block px-4 py-2 rounded-lg text-sm transition-all

                  ${isActive
                    ? "bg-indigo-500 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                  }
                `}
              >
                {link.label}
              </Link>
            )
          })}

        </div>

      </div>

    </>
  )
}