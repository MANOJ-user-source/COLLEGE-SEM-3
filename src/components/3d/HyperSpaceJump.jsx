import { useRef, useMemo, useEffect } from 'react'
import { useFrame, useThree, extend } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'
import * as THREE from 'three'

// Custom shader for motion-blurred star streaks
const StarStreakMaterial = shaderMaterial(
  { time: 0, speed: 1.0 },
  // Vertex shader
  `
    attribute float size;
    attribute vec3 customColor;
    varying vec3 vColor;
    varying float vAlpha;

    void main() {
      vColor = customColor;
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);

      // Alpha based on distance for fade effect
      vAlpha = smoothstep(300.0, 50.0, abs(mvPosition.z));

      gl_PointSize = size * (300.0 / -mvPosition.z);
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  // Fragment shader - SHOOTING STAR STREAKS
  `
    varying vec3 vColor;
    varying float vAlpha;

    void main() {
      // Create elongated streak shape (not round)
      vec2 coord = gl_PointCoord - vec2(0.5);

      // Stretch vertically to create streak effect
      coord.y *= 4.0; // Make it 4x longer - streak!
      float dist = length(coord);

      // Bright core with long tail
      float alpha = 1.0 - smoothstep(0.0, 0.8, dist);
      alpha = pow(alpha, 1.5);
      alpha *= vAlpha * 0.8;

      gl_FragColor = vec4(vColor, alpha);
    }
  `
)

extend({ StarStreakMaterial })

function HyperSpaceJump({ isActive }) {
  const { camera } = useThree()
  const starsRef = useRef()
  const tunnelRef = useRef()
  const materialRef = useRef()
  const timeRef = useRef(0)
  const initialFOV = useRef(camera.fov)
  const initialPosition = useRef({ x: camera.position.x, y: camera.position.y, z: camera.position.z })

  // Transition effect when entering/exiting hyperspace
  useEffect(() => {
    if (isActive) {
      // Store initial camera state
      initialFOV.current = camera.fov
      initialPosition.current = { ...camera.position }
    } else {
      // Smoothly reset FOV when exiting
      const resetFOV = () => {
        if (Math.abs(camera.fov - initialFOV.current) > 0.5) {
          camera.fov += (initialFOV.current - camera.fov) * 0.1
          camera.updateProjectionMatrix()
          requestAnimationFrame(resetFOV)
        } else {
          camera.fov = initialFOV.current
          camera.updateProjectionMatrix()
        }
      }
      resetFOV()
    }
  }, [isActive, camera])

  // Create star field - DIM WHITE SHOOTING STARS passing BESIDE you
  const starField = useMemo(() => {
    const count = 1500
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    const speeds = new Float32Array(count)
    const initialZ = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      // Stars appear in a RING/TUBE around you - not in front
      const angle = Math.random() * Math.PI * 2
      const radius = 15 + Math.random() * 25 // Further from center - passing BESIDE
      const z = -300 + Math.random() * 600

      positions[i * 3] = Math.cos(angle) * radius
      positions[i * 3 + 1] = Math.sin(angle) * radius
      positions[i * 3 + 2] = z
      initialZ[i] = z

      // DIM WHITE STARS - like real stars in space
      const brightness = 0.6 + Math.random() * 0.3 // Dim white, not bright
      const color = new THREE.Color(brightness, brightness, brightness)

      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b

      sizes[i] = 2 + Math.random() * 4
      speeds[i] = 0.8 + Math.random() * 1.5
    }

    return { positions, colors, sizes, speeds, initialZ, count }
  }, [])

  useFrame((state, delta) => {
    if (!isActive) return

    timeRef.current += delta

    // DRAMATIC FOV SHIFT - increases over time for speed sensation
    const targetFOV = initialFOV.current + Math.min(timeRef.current * 5, 25) // Max +25 FOV
    camera.fov += (targetFOV - camera.fov) * delta * 2
    camera.updateProjectionMatrix()

    // CAMERA SHAKE for intensity (subtle but noticeable)
    const shakeIntensity = Math.min(timeRef.current * 0.02, 0.15)
    const shakeX = (Math.random() - 0.5) * shakeIntensity
    const shakeY = (Math.random() - 0.5) * shakeIntensity

    camera.position.x = initialPosition.current.x + shakeX
    camera.position.y = initialPosition.current.y + shakeY

    if (starsRef.current) {
      const positions = starsRef.current.geometry.attributes.position.array
      const speeds = starField.speeds

      // Stars FLOW PAST YOU - like looking out window
      // Speed increases over time for acceleration effect
      const speedMultiplier = 250 + Math.min(timeRef.current * 30, 150)

      for (let i = 0; i < starField.count; i++) {
        // Move stars BACKWARD past camera - shooting star effect
        positions[i * 3 + 2] += speeds[i] * delta * speedMultiplier

        // Reset stars that pass behind camera
        if (positions[i * 3 + 2] > 100) {
          const angle = Math.random() * Math.PI * 2
          const radius = 15 + Math.random() * 25
          positions[i * 3] = Math.cos(angle) * radius
          positions[i * 3 + 1] = Math.sin(angle) * radius
          positions[i * 3 + 2] = -300
        }
      }

      starsRef.current.geometry.attributes.position.needsUpdate = true
    }

    // Gentle rotation for depth (speeds up over time)
    if (tunnelRef.current) {
      const rotationSpeed = 0.2 + Math.min(timeRef.current * 0.05, 0.3)
      tunnelRef.current.rotation.z += delta * rotationSpeed
    }

    if (materialRef.current) {
      materialRef.current.time = timeRef.current
      materialRef.current.speed = 1.0 + Math.min(timeRef.current * 0.2, 1.5)
    }
  })

  if (!isActive) return null

  return (
    <group>
      {/* Star streak particles */}
      <points ref={starsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={starField.count}
            array={starField.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-customColor"
            count={starField.count}
            array={starField.colors}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-size"
            count={starField.count}
            array={starField.sizes}
            itemSize={1}
          />
        </bufferGeometry>
        <starStreakMaterial
          ref={materialRef}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Very subtle tunnel guide lines */}
      <group ref={tunnelRef}>
        {[...Array(8)].map((_, i) => {
          const angle = (i / 8) * Math.PI * 2
          const radius = 30
          return (
            <mesh
              key={i}
              position={[Math.cos(angle) * radius, Math.sin(angle) * radius, -250]}
            >
              <boxGeometry args={[0.15, 0.15, 500]} />
              <meshBasicMaterial
                color={new THREE.Color().setHSL(0.6 + (i / 8) * 0.2, 0.6, 0.3)}
                transparent
                opacity={0.15}
                blending={THREE.AdditiveBlending}
              />
            </mesh>
          )
        })}
      </group>

      {/* Subtle ambient glow - much less intense */}
      <pointLight position={[0, 0, 0]} intensity={0.5} color="#4466aa" distance={50} />
    </group>
  )
}

export default HyperSpaceJump
