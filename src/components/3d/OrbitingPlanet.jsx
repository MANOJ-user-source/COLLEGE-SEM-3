import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import SubjectSphere from './SubjectSphere'
import * as THREE from 'three'

function OrbitingPlanet({ subject, orbitRadius, orbitSpeed, initialAngle = 0 }) {
  const orbitRef = useRef()
  const pathRef = useRef()

  useFrame((state, delta) => {
    if (orbitRef.current) {
      // Orbit around the sun
      orbitRef.current.rotation.y += orbitSpeed * delta
    }
  })

  return (
    <group ref={orbitRef} rotation={[0, initialAngle, 0]}>
      {/* Orbital path visualization */}
      <mesh rotation={[Math.PI / 2, 0, 0]} ref={pathRef}>
        <torusGeometry args={[orbitRadius, 0.01, 16, 100]} />
        <meshBasicMaterial
          color={subject.color}
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Planet positioned at orbital radius */}
      <group position={[orbitRadius, 0, 0]}>
        <Float
          speed={2}
          rotationIntensity={0.5}
          floatIntensity={0.3}
        >
          <SubjectSphere
            position={[0, 0, 0]}
            color={subject.color}
            name={subject.name}
            fullName={subject.fullName}
            icon={subject.icon}
          />
        </Float>
      </group>
    </group>
  )
}

export default OrbitingPlanet
