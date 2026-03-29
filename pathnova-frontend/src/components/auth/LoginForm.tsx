"use client"

import { useState } from "react"

export default function LoginPage(){

const [email,setEmail]=useState("")
const [password,setPassword]=useState("")

const handleSubmit=(e:any)=>{
e.preventDefault()
console.log(email,password)
}

return(

<div className="min-h-screen flex items-center justify-center bg-gray-100">

<form
onSubmit={handleSubmit}
className="bg-white p-8 rounded-xl shadow w-[350px]"
>

<h2 className="text-2xl font-bold mb-6 text-center">
Login
</h2>

<input
type="email"
placeholder="Email"
className="w-full border p-2 rounded mb-4"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>

<input
type="password"
placeholder="Password"
className="w-full border p-2 rounded mb-4"
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>

<button className="w-full bg-black text-white py-2 rounded">
Login
</button>

</form>

</div>

)

}