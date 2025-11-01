import React, { useRef, useState, useMemo, useCallback, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Text, MeshDistortMaterial, Html } from '@react-three/drei'
import { useNavigate } from 'react-router-dom'
import * as THREE from 'three'

// Configuration constants
const SPHERE_CONFIG = {
  rotation: { x: 0.002, y: 0.003 },
  scale: { normal: 1, hovered: 1.3 },
  lerpSpeed: 0.1,
  distortSpeed: 1.5,
  distortAmount: 0.4,
  emissive: { normal: 0.3, hovered: 0.8 }
}

const ROUTE_MAP = {
  'OOP': '/oop',
  'OS': '/os',
  'CN': '/cn',
  'MATHS AI': '/maths',
  'WDP': '/wdp',
  'VC': '/vc',
  'DTI': '/dti'
}

// Reusable geometries (created once)
const sharedGeometries = {
  icosahedron: new THREE.IcosahedronGeometry(1, 2),
  icosahedronLow: new THREE.IcosahedronGeometry(1, 1),
  torus: new THREE.TorusGeometry(1.3, 0.015, 16, 100),
  torusHover: new THREE.TorusGeometry(1.6, 0.025, 16, 100),
  torusHover2: new THREE.TorusGeometry(1.8, 0.02, 16, 100),
  sphere: new THREE.SphereGeometry(0.08),
  plane: (width, height) => new THREE.PlaneGeometry(width, height)
}

function SubjectSphere({ position, color, name, fullName, icon }) {
  const navigate = useNavigate()
  const meshRef = useRef()
  const textRef = useRef()
  const groupRef = useRef()
  const hoverGroupRef = useRef()
  const [hovered, setHovered] = useState(false)
  const [isNavigating, setIsNavigating] = useState(false)
  const { camera } = useThree()
  
  // Temporary vector for performance
  const tempVector = useMemo(() => new THREE.Vector3(), [])
  
  // Calculate text background width more accurately
  const textWidth = useMemo(() => {
    return Math.max(name.length * 0.18 + 0.8, 2)
  }, [name])

  // Memoized materials
  const materials = useMemo(() => {
    const hoverRing1 = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    })
    hoverRing1.userData.baseOpacity = 0.6

    const hoverRing2 = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending
    })
    hoverRing2.userData.baseOpacity = 0.4

    return {
      innerGlow: new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.2,
        blending: THREE.AdditiveBlending
      }),
      textBg: new THREE.MeshBasicMaterial({
        color: '#000000',
        transparent: true,
        opacity: 0.8,
        depthWrite: false
      }),
      textGlow: new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.4,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      }),
      ring: new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.3
      }),
      particle: new THREE.MeshBasicMaterial({
        color,
        blending: THREE.AdditiveBlending
      }),
      hoverRing1,
      hoverRing2
    }
  }, [color])

  // Optimized animation loop
  useFrame((state, delta) => {
    if (!meshRef.current) return

    // Frame-independent rotation
    meshRef.current.rotation.x += SPHERE_CONFIG.rotation.x * delta * 60
    meshRef.current.rotation.y += SPHERE_CONFIG.rotation.y * delta * 60

    // Smooth scale animation
    const targetScale = hovered ? SPHERE_CONFIG.scale.hovered : SPHERE_CONFIG.scale.normal
    meshRef.current.scale.lerp(
      tempVector.setScalar(targetScale),
      SPHERE_CONFIG.lerpSpeed
    )

    // Billboard effect for text
    if (textRef.current) {
      textRef.current.lookAt(camera.position)
    }

    // Animate hover effects
    if (hoverGroupRef.current) {
      hoverGroupRef.current.rotation.z += 0.01 * delta * 60
      // Smooth fade in/out
      const targetOpacity = hovered ? 1 : 0
      hoverGroupRef.current.traverse((child) => {
        if (child.material && child.material.transparent) {
          child.material.opacity = THREE.MathUtils.lerp(
            child.material.opacity,
            targetOpacity * (child.material.userData.baseOpacity || 0.4),
            0.1
          )
        }
      })
    }
  })

  // Optimized click handler
  const handleClick = useCallback(async () => {
    if (isNavigating) return
    
    const route = ROUTE_MAP[name]
    if (!route) return

    setIsNavigating(true)
    
    // Add a small delay for visual feedback
    await new Promise(resolve => setTimeout(resolve, 300))
    navigate(route)
    
    setIsNavigating(false)
  }, [name, navigate, isNavigating])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // Dispose of material resources if needed
      Object.values(materials).forEach(material => {
        if (material.dispose) material.dispose()
      })
    }
  }, [materials])

  return (
    <group ref={groupRef} position={position}>
      {/* Main sphere */}
      <mesh
        ref={meshRef}
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        geometry={sharedGeometries.icosahedron}
      >
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={SPHERE_CONFIG.distortAmount}
          speed={SPHERE_CONFIG.distortSpeed}
          roughness={0.05}
          metalness={0.95}
          emissive={color}
          emissiveIntensity={hovered ? SPHERE_CONFIG.emissive.hovered : SPHERE_CONFIG.emissive.normal}
          clearcoat={1.0}
          clearcoatRoughness={0.05}
          envMapIntensity={1.5}
          reflectivity={1}
          transmission={0.1}
          thickness={0.5}
          ior={2.4}
        />
      </mesh>

      {/* Inner glow sphere - Enhanced with fresnel effect */}
      <mesh
        scale={0.95}
        geometry={sharedGeometries.icosahedron}
        material={materials.innerGlow}
      />

      {/* Fresnel rim light */}
      <mesh
        scale={1.02}
        geometry={sharedGeometries.icosahedronLow}
      >
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Always-facing label with background */}
      <group ref={textRef} position={[0, -1.5, 0]}>
        {/* Background panel */}
        <mesh position={[0, 0, -0.05]}>
          <planeGeometry args={[textWidth, 0.5]} />
          <primitive object={materials.textBg} />
        </mesh>

        {/* Glow effect */}
        <mesh position={[0, 0, -0.06]}>
          <planeGeometry args={[textWidth + 0.2, 0.65]} />
          <primitive object={materials.textGlow} />
        </mesh>

        {/* Text */}
        <Text
          fontSize={0.3}
          color="white"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.015}
          outlineColor={color}
          fontWeight="bold"
          letterSpacing={0.05}
        >
          {name}
        </Text>
      </group>

      {/* Tooltip on hover */}
      {hovered && (
        <Html 
          distanceFactor={10} 
          position={[0, 2.5, 0]} 
          center
          style={{
            pointerEvents: 'none',
            userSelect: 'none',
            transform: 'translateX(-50%)'
          }}
          occlude
        >
          <div 
            className="bg-gradient-to-br from-purple-900/95 to-pink-900/95 backdrop-blur-md px-5 py-3 rounded-xl border-2 shadow-2xl animate-fadeIn"
            style={{ 
              borderColor: color,
              minWidth: '200px',
              textAlign: 'center'
            }}
          >
            <p className="text-white font-bold text-base whitespace-nowrap tracking-wide">
              {icon} {fullName}
            </p>
            <p className="text-purple-200 text-xs mt-1 font-medium">
              {isNavigating ? 'Loading...' : 'Click to explore →'}
            </p>
          </div>
        </Html>
      )}

      {/* Permanent outer ring */}
      <mesh 
        rotation={[Math.PI / 2, 0, 0]}
        geometry={sharedGeometries.torus}
        material={materials.ring}
      />

      {/* Hover effects group - always rendered but visibility controlled */}
      <group ref={hoverGroupRef} visible={hovered}>
        {/* Additional rings */}
        <mesh
          rotation={[Math.PI / 2, 0, 0]}
          geometry={sharedGeometries.torusHover}
          material={materials.hoverRing1}
        />

        <mesh
          rotation={[Math.PI / 3, 0, 0]}
          geometry={sharedGeometries.torusHover2}
          material={materials.hoverRing2}
        />

        {/* Orbiting particles */}
        <group>
          {[
            [2.2, 0, 0],
            [-2.2, 0, 0],
            [0, 2.2, 0],
            [0, -2.2, 0]
          ].map((pos, index) => (
            <mesh 
              key={index}
              position={pos}
              geometry={sharedGeometries.sphere}
              material={materials.particle}
            />
          ))}
        </group>
      </group>
    </group>
  )
}

// Performance optimization: memoize the component
export default React.memo(SubjectSphere, (prevProps, nextProps) => {
  return (
    prevProps.position === nextProps.position &&
    prevProps.color === nextProps.color &&
    prevProps.name === nextProps.name &&
    prevProps.fullName === nextProps.fullName &&
    prevProps.icon === nextProps.icon
  )
})