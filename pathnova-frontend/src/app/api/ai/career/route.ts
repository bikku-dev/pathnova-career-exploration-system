import { NextResponse } from "next/server"

export async function POST(req:Request){

const {careerTitle} = await req.json()

const prompt = `
Explain the career "${careerTitle}" for engineering students.

Give:

1. What they do
2. Daily work in companies
3. Required skills
4. Tools used
5. Career growth ladder
6. Future demand

Make it easy to understand.
`

const response = await fetch("https://api.groq.com/openai/v1/chat/completions",{
method:"POST",
headers:{
"Authorization":`Bearer ${process.env.GROQ_API_KEY}`,
"Content-Type":"application/json"
},
body:JSON.stringify({
model:"llama3-70b-8192",
messages:[
{role:"user",content:prompt}
]
})
})

const data = await response.json()

return NextResponse.json({
content:data.choices[0].message.content
})

}