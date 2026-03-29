"use client"

import { usePathname } from "next/navigation"
import Sidebar from "@/components/layout/Sidebar"

export default function DashboardLayout({ children }: any) {

const pathname = usePathname()

const showSidebar = pathname !== "/dashboard"

return (

<div className="flex min-h-screen">

{showSidebar && <Sidebar />}

<div className="flex-1">

{children}

</div>

</div>

)

}