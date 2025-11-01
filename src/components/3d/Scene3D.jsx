import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import { useRef, useState } from 'react'
import * as THREE from 'three'
import OrbitingPlanet from './OrbitingPlanet'
import CentralSun from './CentralSun'
import ParticleField from './ParticleField'
import GalaxyBackground from './GalaxyBackground'
import CosmicDust from './CosmicDust'
import AuroraGlow from './AuroraGlow'
import CinematicTransition from './CinematicTransition'
import StudentInfoSpace from './StudentInfoSpace'
import HyperSpaceJump from './HyperSpaceJump'

// Cinematic Camera Animation - smooth, flowing tour of the solar system
function CameraAnimation({ onComplete }) {
  const { camera } = useThree()
  const controlsRef = useRef()
  const [isAnimating, setIsAnimating] = useState(true)
  const [animationProgress, setAnimationProgress] = useState(0)
  const rotationDuration = 5 // Optimized for faster load

  // Smooth easing functions
  const easeInOutQuart = (t) => {
    return t < 0.5
      ? 8 * t * t * t * t
      : 1 - Math.pow(-2 * t + 2, 4) / 2
  }

  const easeInOutSine = (t) => {
    return -(Math.cos(Math.PI * t) - 1) / 2
  }

  useFrame((state, delta) => {
    if (isAnimating && animationProgress < 1) {
      // Update progress based on time
      const newProgress = Math.min(animationProgress + delta / rotationDuration, 1)
      setAnimationProgress(newProgress)

      // Apply global smooth easing for entire animation
      const smoothProgress = easeInOutSine(newProgress)

      // Calculate continuous smooth values using sine/cosine waves
      // Complete rotation around the system
      const totalRotation = smoothProgress * Math.PI * 2.5 // 450 degrees total

      // Smooth vertical movement - goes below, rises, goes above, settles
      const heightWave = Math.sin(smoothProgress * Math.PI * 2) // Creates wave pattern
      const heightOffset = Math.cos(smoothProgress * Math.PI * 1.5) // Additional variation
      const height = 5 + (heightWave * 8) + (heightOffset * 4) // Ranges from ~-7 to ~17

      // Smooth distance variation - starts far, comes closer, backs out slightly
      const distanceCurve = easeInOutQuart(smoothProgress)
      const distanceWave = Math.sin(smoothProgress * Math.PI * 1.5) * 2
      const distance = 40 - (distanceCurve * 12) + distanceWave // Ranges from ~26 to ~40

      // Calculate camera position with spherical coordinates
      const x = Math.sin(totalRotation) * distance
      const z = Math.cos(totalRotation) * distance

      // Smooth camera movement with interpolation
      camera.position.x = x
      camera.position.y = height
      camera.position.z = z

      // Always look at the sun (center of solar system)
      camera.lookAt(0, 0, 0)

      // When animation completes
      if (newProgress >= 1) {
        setIsAnimating(false)
        onComplete()
      }
    }
  })

  return (
    <OrbitControls
      ref={controlsRef}
      enabled={!isAnimating}
      enableZoom={true}
      enablePan={true}
      minDistance={8}
      maxDistance={45}
      autoRotate={!isAnimating}
      autoRotateSpeed={0.3}
    />
  )
}

// Solar system configuration - planets orbiting at different radii and speeds
const solarSystemPlanets = [
  // Inner planets (faster orbits, closer to sun)
  {
    subject: {
      name: 'DTI',
      fullName: 'Design Thinking & Innovation',
      color: '#8b5cf6',
      icon: '💡'
    },
    orbitRadius: 6,
    orbitSpeed: 0.8,
    initialAngle: 0
  },
  {
    subject: {
      name: 'OOP',
      fullName: 'Object-Oriented Programming',
      color: '#f472b6',
      icon: '🧩'
    },
    orbitRadius: 9,
    orbitSpeed: 0.6,
    initialAngle: Math.PI / 3
  },
  // Middle planets
  {
    subject: {
      name: 'OS',
      fullName: 'Operating Systems',
      color: '#60a5fa',
      icon: '⚙️'
    },
    orbitRadius: 12,
    orbitSpeed: 0.45,
    initialAngle: Math.PI
  },
  {
    subject: {
      name: 'CN',
      fullName: 'Computer Networks',
      color: '#34d399',
      icon: '🌐'
    },
    orbitRadius: 15,
    orbitSpeed: 0.35,
    initialAngle: Math.PI / 2
  },
  // Outer planets (slower orbits, further from sun)
  {
    subject: {
      name: 'WDP',
      fullName: 'Web Development Project',
      color: '#3b82f6',
      icon: '💻'
    },
    orbitRadius: 18,
    orbitSpeed: 0.25,
    initialAngle: Math.PI * 1.5
  },
  {
    subject: {
      name: 'MATHS AI',
      fullName: 'Mathematics for AI',
      color: '#fbbf24',
      icon: '📐'
    },
    orbitRadius: 21,
    orbitSpeed: 0.18,
    initialAngle: Math.PI / 4
  },
  {
    subject: {
      name: 'VC',
      fullName: 'Version Control',
      color: '#fb923c',
      icon: '🔀'
    },
    orbitRadius: 24,
    orbitSpeed: 0.12,
    initialAngle: Math.PI * 1.2
  },
]

// Camera reset component for returning to solar system
function CameraReset({ onComplete }) {
  const { camera } = useThree()
  const [isResetting, setIsResetting] = useState(true)
  const progressRef = useRef(0)

  useFrame((state, delta) => {
    if (!isResetting) return

    progressRef.current += delta / 1.5 // 1.5 second reset
    const progress = Math.min(progressRef.current, 1)

    // Smooth easing
    const eased = -(Math.cos(Math.PI * progress) - 1) / 2

    // Reset to default solar system view
    const targetPos = new THREE.Vector3(0, 8, 25)
    camera.position.lerp(targetPos, eased)
    camera.lookAt(0, 0, 0)
    camera.rotation.z = 0

    if (progress >= 1) {
      setIsResetting(false)
      onComplete()
    }
  })

  return null
}

function Scene3D() {
  const [hasPlayedAnimation, setHasPlayedAnimation] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [showStudentSpace, setShowStudentSpace] = useState(false)
  const [isReturningToSolarSystem, setIsReturningToSolarSystem] = useState(false)

  // Animation plays on every refresh - no session storage check

  const handleAnimationComplete = () => {
    // Animation completed, enable user controls
    setHasPlayedAnimation(true)
  }

  const handleSunClick = (e) => {
    e.stopPropagation()
    // Start cinematic transition
    setIsTransitioning(true)
  }

  const handleTransitionComplete = () => {
    setIsTransitioning(false)
    setShowStudentSpace(true)
  }

  const handleBackToSolarSystem = () => {
    setShowStudentSpace(false)
    setIsReturningToSolarSystem(true)
  }

  const handleCameraResetComplete = () => {
    setIsReturningToSolarSystem(false)
  }

  return (
    <>
      <div className="w-full h-screen">
        <Canvas
          camera={{ position: [0, 8, 25], fov: 70 }}
          className="bg-gradient-to-br from-black via-purple-950 to-black"
        >
        {/* Solar system lighting - warm sun-centric theme */}
        <ambientLight intensity={0.15} />

        {/* Main sun illumination is handled by CentralSun component */}

        {/* Distant starlight - cooler tones */}
        <pointLight position={[30, 20, 20]} intensity={0.3} color="#b8c5ff" />
        <pointLight position={[-30, -20, -20]} intensity={0.25} color="#ffc8b8" />

        {/* Nebula glow from distance */}
        <pointLight position={[0, 30, -30]} intensity={0.35} color="#c77dff" />
        <pointLight position={[0, -30, 30]} intensity={0.3} color="#60a5fa" />

        {/* Rim lighting for outer planets */}
        <pointLight position={[25, 0, 0]} intensity={0.25} color="#34d399" />
        <pointLight position={[-25, 0, 0]} intensity={0.25} color="#fbbf24" />

        {/* Top-down illumination */}
        <spotLight
          position={[0, 40, 0]}
          angle={0.8}
          penumbra={1}
          intensity={0.5}
          color="#d4d4ff"
          castShadow
        />

        {/* Milky way galaxy background */}
        {!showStudentSpace && <GalaxyBackground />}

        {/* Aurora glow atmosphere */}
        {!showStudentSpace && <AuroraGlow />}

        {/* Distant stars - reduced for cleaner look */}
        {!showStudentSpace && <Stars
          radius={200}
          depth={80}
          count={5000}
          factor={5}
          saturation={0.7}
          fade
          speed={0.3}
        />}

        {/* Cosmic particle field for depth - optimized */}
        {!showStudentSpace && <ParticleField count={300} />}

        {/* Nebula clouds in the background - optimized */}
        {!showStudentSpace && <CosmicDust count={60} />}

        {/* Central Sun - Clickable to show student info */}
        {!showStudentSpace && <CentralSun onClick={handleSunClick} />}

        {/* Orbiting Planet Spheres - Hide during transition */}
        {!showStudentSpace && solarSystemPlanets.map((planet, index) => (
          <OrbitingPlanet
            key={planet.subject.name}
            subject={planet.subject}
            orbitRadius={planet.orbitRadius}
            orbitSpeed={planet.orbitSpeed}
            initialAngle={planet.initialAngle}
          />
        ))}

        {/* Hyperspace Jump Effect - Smooth cinematic star streaks */}
        <HyperSpaceJump isActive={isTransitioning} />

        {/* Cinematic Transition Animation */}
        <CinematicTransition
          isActive={isTransitioning}
          onComplete={handleTransitionComplete}
        />

        {/* Student Info Space - New dimension */}
        <StudentInfoSpace isVisible={showStudentSpace} onBack={handleBackToSolarSystem} />

        {/* Camera reset when returning to solar system */}
        {isReturningToSolarSystem && <CameraReset onComplete={handleCameraResetComplete} />}

        {/* Camera controls - animated on first load, normal afterwards */}
        {!hasPlayedAnimation ? (
          <CameraAnimation onComplete={handleAnimationComplete} />
        ) : showStudentSpace ? (
          <OrbitControls
            enableZoom={true}
            enablePan={true}
            minDistance={15}
            maxDistance={35}
            target={[0, 0, 0]}
          />
        ) : !isReturningToSolarSystem ? (
          <OrbitControls
            enableZoom={true}
            enablePan={true}
            minDistance={8}
            maxDistance={45}
            autoRotate
            autoRotateSpeed={0.3}
          />
        ) : null}
      </Canvas>
    </div>
  </>
  )
}

export default Scene3D
