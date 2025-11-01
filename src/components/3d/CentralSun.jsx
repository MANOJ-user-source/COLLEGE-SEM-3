import React, { useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { MeshDistortMaterial, Sphere, Text, Html } from '@react-three/drei'
import * as THREE from 'three'

function CentralSun({ onClick }) {
  const sunRef = useRef()
  const glowRef = useRef()
  const textRef = useRef()
  const [hovered, setHovered] = useState(false)
  const { camera } = useThree()

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

    // Billboard effect for text
    if (textRef.current) {
      textRef.current.lookAt(camera.position)
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

      {/* Label below the sun */}
      <group ref={textRef} position={[0, -3.5, 0]}>
        {/* Background panel */}
        <mesh position={[0, 0, -0.05]}>
          <planeGeometry args={[3.5, 0.6]} />
          <meshBasicMaterial
            color="#000000"
            transparent
            opacity={0.8}
            depthWrite={false}
          />
        </mesh>

        {/* Glow effect */}
        <mesh position={[0, 0, -0.06]}>
          <planeGeometry args={[3.7, 0.75]} />
          <meshBasicMaterial
            color="#ff9500"
            transparent
            opacity={0.4}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>

        {/* Text */}
        <Text
          fontSize={0.35}
          color="white"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.015}
          outlineColor="#ff9500"
          fontWeight="bold"
          letterSpacing={0.05}
        >
          STUDENT INFO
        </Text>
      </group>

      {/* Tooltip on hover */}
      {hovered && (
        <Html
          distanceFactor={10}
          position={[0, 4.5, 0]}
          center
          style={{
            pointerEvents: 'none',
            userSelect: 'none',
            transform: 'translateX(-50%)'
          }}
          occlude
        >
          <div
            className="bg-gradient-to-br from-orange-900/95 to-yellow-900/95 backdrop-blur-md px-5 py-3 rounded-xl border-2 shadow-2xl animate-fadeIn"
            style={{
              borderColor: '#ff9500',
              minWidth: '200px',
              textAlign: 'center'
            }}
          >
            <p className="text-white font-bold text-base whitespace-nowrap tracking-wide">
              ☀️ View Student Profile
            </p>
            <p className="text-orange-200 text-xs mt-1 font-medium">
              Click to learn more →
            </p>
          </div>
        </Html>
      )}
    </group>
  )
}

export default CentralSun
