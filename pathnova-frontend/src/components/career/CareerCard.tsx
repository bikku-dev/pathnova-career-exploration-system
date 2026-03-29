"use client"

import { useRouter } from "next/navigation"
import { Career } from "@/types/career"

export default function CareerCard({ career }: { career: Career }) {

const router = useRouter()

const handleClick = () => {
router.push(`/dashboard/career/${career.id}`)
}

return (

<div
onClick={handleClick}
className="bg-white rounded-xl p-6 border shadow-sm hover:shadow-md transition cursor-pointer"
>

{/* header */}

<div className="flex justify-between items-center mb-3">

<h3 className="text-lg font-semibold">
{career.title}
</h3>

<span className="text-xs px-2 py-1 bg-indigo-100 text-indigo-600 rounded">
{career.demandLevel}
</span>

</div>

{/* description */}

<p className="text-gray-500 text-sm mb-4">
{career.description}
</p>

{/* tech stack */}

<div className="flex flex-wrap gap-2 mb-4">

{career.technologies?.map((tech, i) => (
<span
key={i}
className="text-xs bg-gray-200 px-2 py-1 rounded"
>
{tech}
</span>
))}

</div>

{/* footer */}

<div className="flex justify-between items-center">

<span className="text-green-600 text-sm font-medium">
${career.salaryMin} - ${career.salaryMax}
</span>

<span className="text-indigo-600 text-sm">
Explore →
</span>

</div>

</div>

)

}