import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, RoundedBox, Html } from '@react-three/drei'
import * as THREE from 'three'

function StudentInfo3D({ isVisible, onClose }) {
  const groupRef = useRef()
  const [scale, setScale] = useState(0)

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Smooth scale animation
      const targetScale = isVisible ? 1 : 0
      const newScale = THREE.MathUtils.lerp(scale, targetScale, delta * 5)
      setScale(newScale)
      groupRef.current.scale.setScalar(newScale)

      // Gentle floating animation
      if (isVisible) {
        groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
        groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05
      }
    }
  })

  if (!isVisible && scale < 0.01) return null

  return (
    <group ref={groupRef} position={[0, 0, 8]}>
      {/* Main holographic panel */}
      <RoundedBox args={[8, 10, 0.2]} radius={0.2} smoothness={4}>
        {/* eslint-disable-next-line react/no-unknown-property */}
        <meshPhysicalMaterial
          color="#1a0a3a"
          transparent
          opacity={0.85}
          metalness={0.3}
          roughness={0.2}
          clearcoat={1}
          clearcoatRoughness={0.1}
          transmission={0.1}
          thickness={0.5}
        />
      </RoundedBox>

      {/* Holographic border glow */}
      <RoundedBox args={[8.1, 10.1, 0.15]} radius={0.2} smoothness={4}>
        <meshBasicMaterial
          color="#8b5cf6"
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
        />
      </RoundedBox>

      {/* Outer glow */}
      <RoundedBox args={[8.3, 10.3, 0.1]} radius={0.2} smoothness={4}>
        <meshBasicMaterial
          color="#c77dff"
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
        />
      </RoundedBox>

      {/* Corner accent lights */}
      {[
        [-3.8, 4.8, 0.2],
        [3.8, 4.8, 0.2],
        [-3.8, -4.8, 0.2],
        [3.8, -4.8, 0.2],
      ].map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshBasicMaterial
            color="#fbbf24"
            transparent
            opacity={0.8}
            blending={THREE.AdditiveBlending}
          />
          <pointLight intensity={1} distance={2} color="#fbbf24" />
        </mesh>
      ))}

      {/* Sun icon at top */}
      <mesh position={[0, 4, 0.15]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial
          color="#ffaa00"
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Sun glow */}
      <mesh position={[0, 4, 0.15]} scale={1.5}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial
          color="#ff6600"
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Title */}
      <Text
        position={[0, 3, 0.15]}
        fontSize={0.5}
        color="#fbbf24"
        anchorX="center"
        anchorY="middle"
        font="/fonts/Inter-Bold.woff"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        STUDENT INFORMATION
      </Text>

      {/* Subtitle */}
      <Text
        position={[0, 2.3, 0.15]}
        fontSize={0.2}
        color="#a78bfa"
        anchorX="center"
        anchorY="middle"
      >
        The Center of This Solar System
      </Text>

      {/* Divider line */}
      <mesh position={[0, 1.9, 0.15]}>
        <boxGeometry args={[6, 0.02, 0.01]} />
        <meshBasicMaterial
          color="#8b5cf6"
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Student details */}
      <InfoLine3D position={[0, 1.3, 0.15]} label="Name" value="MANOJ TIWARI RAMCHANDRA" />
      <InfoLine3D position={[0, 0.6, 0.15]} label="Institute" value="Ahmedabad Institute of Technology" />
      <InfoLine3D position={[0, -0.1, 0.15]} label="Course" value="BCA-B - Semester 3" />
      <InfoLine3D position={[0, -0.8, 0.15]} label="Enrollment" value="24303060119" />
      <InfoLine3D position={[0, -1.5, 0.15]} label="Email" value="manoj.r.tiwari17@gmail.com" />
      <InfoLine3D position={[0, -2.2, 0.15]} label="Contact" value="+91 9016938856" />

      {/* Bottom divider */}
      <mesh position={[0, -3, 0.15]}>
        <boxGeometry args={[6, 0.02, 0.01]} />
        <meshBasicMaterial
          color="#8b5cf6"
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Footer text */}
      <Text
        position={[0, -3.5, 0.15]}
        fontSize={0.18}
        color="#94a3b8"
        anchorX="center"
        anchorY="middle"
      >
        Interactive 3D Website Project
      </Text>
      <Text
        position={[0, -3.9, 0.15]}
        fontSize={0.18}
        color="#94a3b8"
        anchorX="center"
        anchorY="middle"
      >
        Semester 3 Assignment
      </Text>

      {/* Close button - 3D interactive */}
      <group position={[3.5, 4.5, 0.15]} onClick={onClose}>
        <mesh>
          <circleGeometry args={[0.3, 32]} />
          <meshBasicMaterial
            color="#ef4444"
            transparent
            opacity={0.8}
          />
        </mesh>
        {/* X mark */}
        <Text
          position={[0, 0, 0.05]}
          fontSize={0.35}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          ✕
        </Text>
      </group>

      {/* Ambient lighting for the panel */}
      <pointLight position={[0, 0, 2]} intensity={2} color="#8b5cf6" distance={10} />
    </group>
  )
}

function InfoLine3D({ position, label, value }) {
  return (
    <group position={position}>
      {/* Background bar */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[6.5, 0.4, 0.05]} />
        <meshPhysicalMaterial
          color="#1e293b"
          transparent
          opacity={0.6}
          metalness={0.2}
          roughness={0.8}
        />
      </mesh>

      {/* Accent line */}
      <mesh position={[-3, 0, 0.03]}>
        <boxGeometry args={[0.3, 0.4, 0.01]} />
        <meshBasicMaterial
          color="#8b5cf6"
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Label */}
      <Text
        position={[-2.5, 0, 0.05]}
        fontSize={0.18}
        color="#c084fc"
        anchorX="left"
        anchorY="middle"
        maxWidth={2}
      >
        {label}:
      </Text>

      {/* Value */}
      <Text
        position={[-0.5, 0, 0.05]}
        fontSize={0.16}
        color="#ffffff"
        anchorX="left"
        anchorY="middle"
        maxWidth={4}
      >
        {value}
      </Text>
    </group>
  )
}

export default StudentInfo3D
