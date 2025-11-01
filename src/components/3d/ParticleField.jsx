import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function ParticleField({ count = 1000 }) {
  const points = useRef()

  // Generate galaxy-like particle distribution with colors
  const [positions, colors, sizes] = useMemo(() => {
    const positions = []
    const colors = []
    const sizes = []

    // Define neon vibrant color palette
    const colorPalette = [
      new THREE.Color('#ff00ff'), // Neon magenta
      new THREE.Color('#ff0099'), // Neon pink
      new THREE.Color('#9900ff'), // Neon purple
      new THREE.Color('#cc00ff'), // Neon violet
      new THREE.Color('#00ffff'), // Neon cyan
      new THREE.Color('#ff66ff'), // Bright pink
      new THREE.Color('#aa00ff'), // Electric purple
      new THREE.Color('#ff33cc'), // Hot magenta
    ]

    for (let i = 0; i < count; i++) {
      // Create spiral galaxy distribution - weighted towards outer space
      const radius = 15 + Math.random() * 35 // Start from 15 units away from center
      const spinAngle = radius * 0.3
      const branchAngle = ((i % 3) / 3) * Math.PI * 2

      const randomX = Math.pow(Math.random(), 2) * (Math.random() < 0.5 ? 1 : -1) * 3
      const randomY = Math.pow(Math.random(), 2) * (Math.random() < 0.5 ? 1 : -1) * 3
      const randomZ = Math.pow(Math.random(), 2) * (Math.random() < 0.5 ? 1 : -1) * 3

      const x = Math.cos(branchAngle + spinAngle) * radius + randomX
      const y = randomY
      const z = Math.sin(branchAngle + spinAngle) * radius + randomZ

      positions.push(x, y, z)

      // Color - keep neon vibrant in outer space
      const mixedColor = colorPalette[Math.floor(Math.random() * colorPalette.length)].clone()
      const centerDistance = Math.sqrt(x * x + y * y + z * z)
      // Higher intensity for outer space (0.7-1.0 range)
      const colorIntensity = Math.max(0.7, 1 - centerDistance / 80)
      mixedColor.multiplyScalar(colorIntensity)

      colors.push(mixedColor.r, mixedColor.g, mixedColor.b)

      // Slightly larger particles for better visibility
      sizes.push(Math.random() * 0.2 + 0.08)
    }

    return [
      new Float32Array(positions),
      new Float32Array(colors),
      new Float32Array(sizes)
    ]
  }, [count])

  // Animate with slow rotation and pulsing effect
  useFrame((state) => {
    if (points.current) {
      points.current.rotation.x = state.clock.elapsedTime * 0.02
      points.current.rotation.y = state.clock.elapsedTime * 0.03

      // Pulsing effect on material
      if (points.current.material) {
        points.current.material.opacity = 0.6 + Math.sin(state.clock.elapsedTime * 0.5) * 0.2
      }
    }
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={sizes.length}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

export default ParticleField
