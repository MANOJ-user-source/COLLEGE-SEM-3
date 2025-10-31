import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, MeshDistortMaterial, Html } from '@react-three/drei'
import * as THREE from 'three'

function SubjectSphere({ position, color, name, fullName, icon }) {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)

  // Animate on hover
  useFrame((state) => {
    if (meshRef.current) {
      // Gentle rotation
      meshRef.current.rotation.x += 0.002
      meshRef.current.rotation.y += 0.003

      // Pulse effect on hover
      if (hovered) {
        meshRef.current.scale.lerp(new THREE.Vector3(1.3, 1.3, 1.3), 0.1)
      } else {
        meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1)
      }
    }
  })

  const handleClick = () => {
    setClicked(true)
    // TODO: Navigate to subject page
    console.log(`Navigating to ${name}`)
    setTimeout(() => setClicked(false), 300)
  }

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.3}
          speed={2}
          roughness={0.2}
          metalness={0.8}
          emissive={color}
          emissiveIntensity={hovered ? 0.6 : 0.2}
        />
      </mesh>

      {/* Label */}
      <Text
        position={[0, -1.8, 0]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter-bold.woff"
      >
        {name}
      </Text>

      {/* Tooltip on hover */}
      {hovered && (
        <Html distanceFactor={10} position={[0, 2, 0]} center>
          <div className="bg-slate-900/90 backdrop-blur-md px-4 py-2 rounded-lg border border-slate-700 shadow-xl">
            <p className="text-white font-semibold text-sm whitespace-nowrap">
              {icon} {fullName}
            </p>
            <p className="text-slate-400 text-xs mt-1">Click to explore</p>
          </div>
        </Html>
      )}

      {/* Ring effect on hover */}
      {hovered && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.5, 0.02, 16, 100]} />
          <meshBasicMaterial color={color} transparent opacity={0.5} />
        </mesh>
      )}
    </group>
  )
}

export default SubjectSphere
