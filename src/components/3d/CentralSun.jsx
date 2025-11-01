import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Sphere } from '@react-three/drei'
import * as THREE from 'three'

function CentralSun({ onClick }) {
  const sunRef = useRef()
  const glowRef = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame((state, delta) => {
    if (sunRef.current) {
      sunRef.current.rotation.y += 0.001 * delta * 60
      sunRef.current.rotation.x += 0.0005 * delta * 60

      // Scale up slightly on hover
      const targetScale = hovered ? 1.1 : 1
      sunRef.current.scale.lerp({ x: targetScale, y: targetScale, z: targetScale }, 0.1)
    }

    // Pulsating glow effect
    if (glowRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.1 + 1
      const hoverBoost = hovered ? 0.2 : 0
      glowRef.current.scale.setScalar(pulse + hoverBoost)
    }

  })

  return (
    <group position={[0, 0, 0]}>
      {/* Main Sun */}
      <mesh
        ref={sunRef}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        style={{ cursor: hovered ? 'pointer' : 'auto' }}
      >
        <sphereGeometry args={[2, 128, 128]} />
        <MeshDistortMaterial
          color="#ff9500"
          attach="material"
          distort={0.15}
          speed={1.5}
          roughness={0.2}
          metalness={0}
          emissive="#ff4500"
          emissiveIntensity={hovered ? 3 : 2.2}
          clearcoat={0.8}
          clearcoatRoughness={0.3}
        />
      </mesh>

      {/* Inner Glow - Enhanced */}
      <mesh ref={glowRef} scale={1.15}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshBasicMaterial
          color="#ffdd44"
          transparent
          opacity={0.4}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Outer Glow Layers - Multi-layer atmosphere */}
      <mesh scale={1.3}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshBasicMaterial
          color="#ffaa33"
          transparent
          opacity={0.25}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </mesh>

      <mesh scale={1.5}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshBasicMaterial
          color="#ff7722"
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </mesh>

      <mesh scale={1.7}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshBasicMaterial
          color="#ff5511"
          transparent
          opacity={0.08}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </mesh>



      {/* Enhanced lighting with warmth */}
      <pointLight position={[0, 0, 0]} intensity={4} color="#ffbb33" distance={50} decay={1.5} />
      <pointLight position={[0, 0, 0]} intensity={2.5} color="#ff7722" distance={35} decay={2} />
      <pointLight position={[0, 0, 0]} intensity={1.5} color="#ff4411" distance={20} decay={2} />
    </group>
  )
}

export default CentralSun
