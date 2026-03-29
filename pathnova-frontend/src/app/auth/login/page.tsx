"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { loginUser } from "@/service/authService"
import { saveTokens } from "@/app/utils/tokenManager"

export default function LoginPage(){

const router = useRouter()

const [email,setEmail] = useState("")
const [password,setPassword] = useState("")
const [error,setError] = useState("")
const [loading,setLoading] = useState(false)

const handleSubmit = async (e:any) => {

e.preventDefault()

setError("")
setLoading(true)

try{

const res = await loginUser({
email,
password
})

/* local storage save */
saveTokens(res.accessToken,res.refreshToken)

/* cookie save (middleware check karega) */
document.cookie = `token=${res.accessToken}; path=/`

/* dashboard redirect */
router.push("/dashboard")

}catch(err){

setError("Invalid email or password")

}finally{

setLoading(false)

}

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
required
/>

<input
type="password"
placeholder="Password"
className="w-full border p-2 rounded mb-4"
value={password}
onChange={(e)=>setPassword(e.target.value)}
required
/>

<button
type="submit"
disabled={loading}
className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
>

{loading ? "Logging in..." : "Login"}

</button>

{error && (

<p className="text-red-500 text-center mt-4">
{error}
</p>

)}

</form>

</div>

)

}