"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { registerUser } from "@/service/authService"
import toast from "react-hot-toast"

export default function RegisterPage(){

const router = useRouter()

const [form,setForm] = useState({
name:"",
email:"",
password:"",
college:"",
yearOfStudy:1
})

const handleChange = (e:any)=>{

setForm({
...form,
[e.target.name]:e.target.value
})

}

const handleSubmit = async (e:any)=>{

e.preventDefault()

try{

await registerUser(form)

toast.success("Registration Successful 🎉")

// Redirect to Home Page
setTimeout(()=>{
router.push("/")
},1500)

}catch(err){

toast.error("Registration failed ❌")

}

}

return(

<div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4">

<div className="bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md transition-all duration-300 hover:scale-[1.02]">

<h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
Create Account
</h2>

<form onSubmit={handleSubmit} className="space-y-4">

<input
type="text"
name="name"
placeholder="Full Name"
className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500"
value={form.name}
onChange={handleChange}
required
/>

<input
type="email"
name="email"
placeholder="Email Address"
className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500"
value={form.email}
onChange={handleChange}
required
/>

<input
type="password"
name="password"
placeholder="Password"
className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500"
value={form.password}
onChange={handleChange}
required
/>

<input
type="text"
name="college"
placeholder="College Name"
className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500"
value={form.college}
onChange={handleChange}
required
/>

<select
name="yearOfStudy"
className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500"
value={form.yearOfStudy}
onChange={handleChange}
>

<option value={1}>1st Year</option>
<option value={2}>2nd Year</option>
<option value={3}>3rd Year</option>
<option value={4}>4th Year</option>

</select>

<button
type="submit"
className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300"
>
Register
</button>

</form>

<p className="text-center text-sm mt-4 text-gray-600">
Already have an account? 
<span 
onClick={()=>router.push("/auth/login")}
className="text-indigo-600 cursor-pointer ml-1 font-semibold"
>
Login
</span>
</p>

</div>

</div>

)

}