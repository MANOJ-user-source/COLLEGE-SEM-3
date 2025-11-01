import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function CosmicDust({ count = 500 }) {
  const cloudsRef = useRef()

  // Create cosmic dust clouds
  const [positions, colors, sizes, velocities] = useMemo(() => {
    const positions = []
    const colors = []
    const sizes = []
    const velocities = []

    // Nebula color palette
    const nebulaColors = [
      new THREE.Color('#ff6ec7').multiplyScalar(0.5), // Soft pink
      new THREE.Color('#c77dff').multiplyScalar(0.5), // Soft purple
      new THREE.Color('#a78bfa').multiplyScalar(0.5), // Lavender
      new THREE.Color('#ec4899').multiplyScalar(0.4), // Rose
      new THREE.Color('#60a5fa').multiplyScalar(0.3), // Soft blue
    ]

    for (let i = 0; i < count; i++) {
      // Spread dust clouds in a wider area
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI * 2
      const radius = 15 + Math.random() * 35

      const x = radius * Math.sin(theta) * Math.cos(phi)
      const y = radius * Math.sin(theta) * Math.sin(phi)
      const z = radius * Math.cos(theta)

      positions.push(x, y, z)

      // Random colors from nebula palette
      const color = nebulaColors[Math.floor(Math.random() * nebulaColors.length)]
      colors.push(color.r, color.g, color.b)

      // Larger, softer particles for dust effect
      sizes.push(Math.random() * 2 + 0.5)

      // Slow drift velocities
      velocities.push(
        (Math.random() - 0.5) * 0.01,
        (Math.random() - 0.5) * 0.01,
        (Math.random() - 0.5) * 0.01
      )
    }

    return [
      new Float32Array(positions),
      new Float32Array(colors),
      new Float32Array(sizes),
      velocities
    ]
  }, [count])

  // Animate dust clouds with slow drift
  useFrame((state) => {
    if (cloudsRef.current && cloudsRef.current.geometry.attributes.position) {
      const posArray = cloudsRef.current.geometry.attributes.position.array

      for (let i = 0; i < count; i++) {
        const i3 = i * 3

        // Apply drift
        posArray[i3] += velocities[i3]
        posArray[i3 + 1] += velocities[i3 + 1]
        posArray[i3 + 2] += velocities[i3 + 2]

        // Boundary check and wrap around
        if (Math.abs(posArray[i3]) > 50) posArray[i3] *= -0.9
        if (Math.abs(posArray[i3 + 1]) > 50) posArray[i3 + 1] *= -0.9
        if (Math.abs(posArray[i3 + 2]) > 50) posArray[i3 + 2] *= -0.9
      }

      cloudsRef.current.geometry.attributes.position.needsUpdate = true

      // Gentle pulsing opacity
      if (cloudsRef.current.material) {
        cloudsRef.current.material.opacity = 0.15 + Math.sin(state.clock.elapsedTime * 0.3) * 0.05
      }
    }
  })

  return (
    <points ref={cloudsRef}>
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
        size={1}
        vertexColors
        transparent
        opacity={0.15}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        map={createCircleTexture()}
      />
    </points>
  )
}

// Create soft circular texture for dust particles
function createCircleTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 64
  canvas.height = 64

  const ctx = canvas.getContext('2d')
  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
  gradient.addColorStop(0, 'rgba(255,255,255,1)')
  gradient.addColorStop(0.4, 'rgba(255,255,255,0.5)')
  gradient.addColorStop(1, 'rgba(255,255,255,0)')

  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, 64, 64)

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

export default CosmicDust
