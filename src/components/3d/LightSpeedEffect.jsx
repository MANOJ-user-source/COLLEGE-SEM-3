import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function LightSpeedEffect({ isActive }) {
  const particlesRef = useRef()
  const lineGroupRef = useRef()

  // Create MANY more particles for intense effect
  const particles = useMemo(() => {
    const count = 8000
    const positions = new Float32Array(count * 3)
    const velocities = new Float32Array(count)
    const sizes = new Float32Array(count)
    const colors = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      // Start particles behind camera in a cylinder shape
      const angle = Math.random() * Math.PI * 2
      const radius = 5 + Math.random() * 40

      positions[i * 3] = Math.cos(angle) * radius
      positions[i * 3 + 1] = Math.sin(angle) * radius
      positions[i * 3 + 2] = -200 - Math.random() * 100 // Start far behind

      velocities[i] = 3 + Math.random() * 5 // Much faster!
      sizes[i] = 1 + Math.random() * 3

      // Random bright colors
      const color = new THREE.Color()
      color.setHSL(Math.random(), 0.8, 0.7)
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }

    return { positions, velocities, sizes, colors, count }
  }, [])

  useFrame((state, delta) => {
    if (!particlesRef.current || !isActive) return

    const positions = particlesRef.current.geometry.attributes.position.array
    const velocities = particles.velocities
    const sizes = particlesRef.current.geometry.attributes.size.array

    for (let i = 0; i < particles.count; i++) {
      // FAST movement toward camera - light speed!
      const speed = velocities[i] * 300 // MUCH FASTER
      positions[i * 3 + 2] += speed * delta

      // Make particles stretch as they move faster (motion blur effect)
      sizes[i] = 2 + Math.abs(speed) * 0.05

      // Reset particle if it goes past camera
      if (positions[i * 3 + 2] > 20) {
        const angle = Math.random() * Math.PI * 2
        const radius = 5 + Math.random() * 40

        positions[i * 3] = Math.cos(angle) * radius
        positions[i * 3 + 1] = Math.sin(angle) * radius
        positions[i * 3 + 2] = -300 - Math.random() * 100
      }
    }

    particlesRef.current.geometry.attributes.position.needsUpdate = true
    particlesRef.current.geometry.attributes.size.needsUpdate = true

    // Rotate the entire effect for tunnel feeling
    if (lineGroupRef.current) {
      lineGroupRef.current.rotation.z += delta * 3
    }
  })

  if (!isActive) return null

  return (
    <group>
      {/* Intense star streaking particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particles.count}
            array={particles.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-size"
            count={particles.count}
            array={particles.sizes}
            itemSize={1}
          />
          <bufferAttribute
            attach="attributes-color"
            count={particles.count}
            array={particles.colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={3}
          vertexColors
          transparent
          opacity={0.9}
          sizeAttenuation={true}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Rotating speed lines tunnel */}
      <group ref={lineGroupRef}>
        {[...Array(50)].map((_, i) => {
          const angle = (i / 50) * Math.PI * 2
          const radius = 8 + (i % 3) * 5
          return (
            <mesh key={i} position={[Math.cos(angle) * radius, Math.sin(angle) * radius, 0]}>
              <boxGeometry args={[0.3, 0.3, 400]} />
              <meshBasicMaterial
                color={new THREE.Color().setHSL((i / 50), 1, 0.5)}
                transparent
                opacity={0.6}
                blending={THREE.AdditiveBlending}
              />
            </mesh>
          )
        })}
      </group>
    </group>
  )
}

export default LightSpeedEffect
