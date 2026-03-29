"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function AuthWrapper({children}:any){

const router = useRouter()

useEffect(()=>{

const token = localStorage.getItem("token")

if(!token){
router.push("/auth/login")
}

},[])

return children

}