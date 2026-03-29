"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Float, OrbitControls, Stars } from "@react-three/drei"
import { useRef } from "react"
import { Group } from "three"



/* =========================
   ROCKET MODEL
========================= */

function Rocket(){

const rocketRef = useRef<Group>(null!)

useFrame(({clock})=>{

if(!rocketRef.current) return

rocketRef.current.rotation.y += 0.01

rocketRef.current.position.y =
Math.sin(clock.elapsedTime)*0.15

})

return(

<Float speed={1.4} floatIntensity={1.2} rotationIntensity={0.6}>

<group ref={rocketRef}>


{/* rocket body */}

<mesh>

<cylinderGeometry args={[0.35,0.45,2.2,32]} />

<meshStandardMaterial
color="#6366f1"
metalness={0.6}
roughness={0.2}
/>

</mesh>


{/* rocket top */}

<mesh position={[0,1.4,0]}>

<coneGeometry args={[0.35,0.9,32]} />

<meshStandardMaterial color="#8b5cf6"/>

</mesh>


{/* left wing */}

<mesh position={[-0.4,-0.4,0]} rotation={[0,0,0.4]}>

<boxGeometry args={[0.15,0.6,0.4]} />

<meshStandardMaterial color="#4338ca"/>

</mesh>


{/* right wing */}

<mesh position={[0.4,-0.4,0]} rotation={[0,0,-0.4]}>

<boxGeometry args={[0.15,0.6,0.4]} />

<meshStandardMaterial color="#4338ca"/>

</mesh>


{/* rocket window */}

<mesh position={[0,0.3,0.45]}>

<sphereGeometry args={[0.18,32,32]} />

<meshStandardMaterial
color="#38bdf8"
emissive="#38bdf8"
emissiveIntensity={0.7}
/>

</mesh>


</group>

</Float>

)

}



/* =========================
   ORBIT RING
========================= */

function OrbitRing({radius}:{radius:number}){

return(

<Float speed={2} floatIntensity={0.8} rotationIntensity={0.5}>

<mesh rotation={[Math.PI/2,0,0]}>

<torusGeometry args={[radius,0.03,32,200]} />

<meshStandardMaterial
color="#8b5cf6"
emissive="#6366f1"
emissiveIntensity={0.4}
/>

</mesh>

</Float>

)

}



/* =========================
   HERO SCENE
========================= */

export default function Hero3D(){

return(

<div className="w-full h-[420px] translate-x-16 -translate-y-6">

<Canvas camera={{position:[0,0,6]}}>


{/* stars */}

<Stars
radius={80}
depth={60}
count={3000}
factor={4}
fade
/>


{/* lighting */}

<ambientLight intensity={0.7} />

<directionalLight
position={[3,3,3]}
intensity={1.4}
/>

<pointLight
position={[-3,-3,-3]}
intensity={1}
/>


{/* rocket */}

<Rocket/>


{/* orbit rings */}

<OrbitRing radius={2}/>
<OrbitRing radius={3.2}/>


{/* controls */}

<OrbitControls
enableZoom={false}
autoRotate
autoRotateSpeed={0.3}
/>

</Canvas>

</div>

)

}