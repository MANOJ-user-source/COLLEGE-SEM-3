import { useRef, useState, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Text, RoundedBox, Float, Stars } from '@react-three/drei'
import * as THREE from 'three'
import GalaxyBackground from './GalaxyBackground'
import ParticleField from './ParticleField'
import CosmicDust from './CosmicDust'
import AuroraGlow from './AuroraGlow'

function StudentInfoSpace({ isVisible, onBack }) {
  const { camera } = useThree()
  const groupRef = useRef()
  const cardRef = useRef()
  const [animationPhase, setAnimationPhase] = useState(0) // 0: entrance, 1: reveal, 2: interactive
  const [cardVisible, setCardVisible] = useState(false)
  const timeRef = useRef(0)

  // Student information data
  const studentData = {
    name: 'MANOJ TIWARI RAMCHANDRA',
    institute: 'Ahmedabad Institute of Technology',
    course: 'BCA-B - Semester 3',
    enrollment: '24303060119',
    email: 'manoj.r.tiwari17@gmail.com',
    contact: '+91 9016938856'
  }

  // Social media links
  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/MANOJ-user-source', icon: '💻', color: '#c026d3' },
    { name: 'X (Twitter)', url: 'https://twitter.com/Manoj_tiwari7', icon: '𝕏', color: '#ffffff' },
    { name: 'Instagram', url: 'https://instagram.com/manoj_tiwarri', icon: '📷', color: '#E1306C' },
    { name: 'Facebook', url: 'https://www.facebook.com/share/1K1K41tVVt/', icon: '👥', color: '#1877F2' },
  ]

  // Reset animation when visibility changes
  useEffect(() => {
    if (isVisible) {
      setAnimationPhase(0)
      setCardVisible(false)
      timeRef.current = 0
    }
  }, [isVisible])

  // Cinematic camera animation
  useFrame((state, delta) => {
    if (!isVisible) return

    timeRef.current += delta

    // PHASE 0: Cinematic entrance (0-3s)
    if (animationPhase === 0 && timeRef.current < 3) {
      const progress = timeRef.current / 3
      const eased = easeInOutCubic(progress)

      // Dramatic camera sweep - starts from far back and above, sweeps down
      const startPos = new THREE.Vector3(-15, 20, 30)
      const endPos = new THREE.Vector3(0, 3, 18)

      camera.position.lerpVectors(startPos, endPos, eased)
      camera.lookAt(0, 0, 0)

      // Rotate camera slightly for cinematic feel
      camera.rotation.z = Math.sin(progress * Math.PI) * 0.1

    }
    // Transition to reveal phase
    else if (animationPhase === 0 && timeRef.current >= 3) {
      setAnimationPhase(1)
      timeRef.current = 0
    }

    // PHASE 1: Reveal card (3-5s)
    if (animationPhase === 1) {
      // Show card immediately
      if (!cardVisible) {
        setCardVisible(true)
      }

      // Camera gently moves back to give full view
      const progress = Math.min(timeRef.current / 1.5, 1)
      const eased = easeOutCubic(progress)
      camera.position.z = THREE.MathUtils.lerp(18, 20, eased)
      camera.position.y = THREE.MathUtils.lerp(3, 1, eased)
      camera.lookAt(0, 0, 0)

      // Transition to interactive phase
      if (timeRef.current > 1.5) {
        setAnimationPhase(2)
      }
    }

    // PHASE 2: Interactive - gentle floating
    if (animationPhase === 2 && groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.15
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.02
    }
  })

  if (!isVisible) return null

  return (
    <group ref={groupRef}>
      {/* Galaxy background - same as home */}
      <GalaxyBackground />

      {/* Aurora glow atmosphere */}
      <AuroraGlow />

      {/* Distant stars */}
      <Stars
        radius={200}
        depth={80}
        count={20000}
        factor={7}
        saturation={0.9}
        fade
        speed={0.4}
      />

      {/* Cosmic particle field */}
      <ParticleField count={1500} />

      {/* Nebula clouds */}
      <CosmicDust count={200} />

      {/* Single information card */}
      <InfoCard3D
        data={studentData}
        socialLinks={socialLinks}
        isVisible={cardVisible}
      />

      {/* Dramatic lighting */}
      <pointLight position={[0, 8, 3]} intensity={3} color="#fbbf24" distance={15} />
      <pointLight position={[-10, 0, 5]} intensity={2} color="#8b5cf6" distance={20} />
      <pointLight position={[10, 0, 5]} intensity={2} color="#3b82f6" distance={20} />
      <spotLight
        position={[0, 15, 10]}
        angle={0.5}
        penumbra={1}
        intensity={2}
        color="#ffffff"
        castShadow
      />

      {/* Back button - appears in interactive phase */}
      {animationPhase === 2 && (
        <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
          <group position={[0, -8, 0]} onClick={onBack}>
            <RoundedBox args={[4, 1, 0.2]} radius={0.1} smoothness={4}>
              <meshPhysicalMaterial
                color="#1a1a2e"
                metalness={0.8}
                roughness={0.2}
                emissive="#3b82f6"
                emissiveIntensity={0.5}
                transparent
                opacity={0.9}
              />
            </RoundedBox>

            {/* Button glow */}
            <RoundedBox args={[4.2, 1.2, 0.15]} radius={0.1} smoothness={4}>
              <meshBasicMaterial
                color="#3b82f6"
                transparent
                opacity={0.3}
                blending={THREE.AdditiveBlending}
              />
            </RoundedBox>

            <Text
              position={[0, 0, 0.15]}
              fontSize={0.35}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
            >
              BACK TO SOLAR SYSTEM
            </Text>

            <pointLight position={[0, 0, 1]} intensity={1.5} distance={3} color="#3b82f6" />
          </group>
        </Float>
      )}

      {/* Ambient environment light */}
      <ambientLight intensity={0.3} />
      {/* eslint-disable-next-line react/no-unknown-property */}
      <hemisphereLight intensity={0.5} color="#ffffff" groundColor="#1a0a3a" />
    </group>
  )
}

// Single unified info card component
function InfoCard3D({ data, socialLinks, isVisible }) {
  const cardRef = useRef()
  const [scale, setScale] = useState(0)
  const [hoveredSocial, setHoveredSocial] = useState(null)

  useFrame((state, delta) => {
    if (cardRef.current) {
      // Smooth entrance animation
      const targetScale = isVisible ? 1 : 0
      const newScale = THREE.MathUtils.lerp(scale, targetScale, delta * 6)
      setScale(newScale)
      cardRef.current.scale.setScalar(newScale)

      // Gentle floating when visible
      if (isVisible && scale > 0.9) {
        cardRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
        cardRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05
      }
    }
  })

  if (!isVisible && scale < 0.01) return null

  const infoFields = [
    { label: 'Name', value: data.name, icon: '👤', color: '#8b5cf6' },
    { label: 'Institute', value: data.institute, icon: '🏫', color: '#3b82f6' },
    { label: 'Course', value: data.course, icon: '📚', color: '#06b6d4' },
    { label: 'Enrollment', value: data.enrollment, icon: '🎓', color: '#10b981' },
    { label: 'Email', value: data.email, icon: '📧', color: '#f59e0b' },
    { label: 'Contact', value: data.contact, icon: '📞', color: '#ef4444' },
  ]

  const handleSocialClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
      <group ref={cardRef} position={[0, 0, 0]}>
        {/* Main card background */}
        <RoundedBox args={[10, 10.5, 0.2]} radius={0.2} smoothness={4}>
          <meshPhysicalMaterial
            color="#0a0a1f"
            transparent
            opacity={0.9}
            metalness={0.6}
            roughness={0.2}
          />
        </RoundedBox>

        {/* Card glow effect */}
        <RoundedBox args={[10.2, 10.7, 0.15]} radius={0.2} smoothness={4}>
          <meshBasicMaterial
            color="#8b5cf6"
            transparent
            opacity={0.15}
            blending={THREE.AdditiveBlending}
          />
        </RoundedBox>

        {/* Top accent bar */}
        <mesh position={[0, 5.1, 0.12]}>
          <boxGeometry args={[10, 0.3, 0.02]} />
          <meshBasicMaterial
            color="#8b5cf6"
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* Card header */}
        <Text
          position={[0, 4.45, 0.12]}
          fontSize={0.5}
          color="#fbbf24"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.1}
          outlineWidth={0.02}
          outlineColor="#000000"
        >
          STUDENT PROFILE
        </Text>

        {/* Information fields */}
        {infoFields.map((field, index) => {
          const yPos = 3.45 - index * 0.9

          return (
            <group key={index} position={[0, yPos, 0.12]}>
              {/* Field background */}
              <RoundedBox args={[9, 0.7, 0.05]} radius={0.05} smoothness={4} position={[0, 0, -0.05]}>
                <meshPhysicalMaterial
                  color="#12121f"
                  transparent
                  opacity={0.6}
                  metalness={0.3}
                  roughness={0.4}
                />
              </RoundedBox>

              {/* Colored accent */}
              <mesh position={[-4.3, 0, 0]}>
                <boxGeometry args={[0.15, 0.7, 0.02]} />
                <meshBasicMaterial
                  color={field.color}
                  blending={THREE.AdditiveBlending}
                />
              </mesh>

              {/* Icon */}
              <Text
                position={[-3.8, 0, 0]}
                fontSize={0.35}
                anchorX="center"
                anchorY="middle"
              >
                {field.icon}
              </Text>

              {/* Label */}
              <Text
                position={[-3.2, 0, 0]}
                fontSize={0.28}
                color={field.color}
                anchorX="left"
                anchorY="middle"
                fontWeight="bold"
              >
                {field.label}
              </Text>

              {/* Value */}
              <Text
                position={[-1.2, 0, 0]}
                fontSize={0.25}
                color="#ffffff"
                anchorX="left"
                anchorY="middle"
                maxWidth={6}
              >
                {field.value}
              </Text>
            </group>
          )
        })}

        {/* Social media section */}
        <group position={[0, -3.5, 0.12]}>
          {/* Section divider */}
          <mesh position={[0, 0.8, 0]}>
            <boxGeometry args={[9, 0.02, 0.02]} />
            <meshBasicMaterial
              color="#8b5cf6"
              transparent
              opacity={0.5}
            />
          </mesh>

          {/* Section title */}
          <Text
            position={[0, 0.5, 0]}
            fontSize={0.3}
            color="#a78bfa"
            anchorX="center"
            anchorY="middle"
            letterSpacing={0.05}
          >
            CONNECT WITH ME
          </Text>

          {/* Social buttons */}
          {socialLinks.map((social, index) => {
            const spacing = 2.2
            const totalWidth = (socialLinks.length - 1) * spacing
            const xPos = -totalWidth / 2 + index * spacing
            const isHovered = hoveredSocial === index

            return (
              <group
                key={index}
                position={[xPos, -0.3, 0]}
                onPointerOver={() => setHoveredSocial(index)}
                onPointerOut={() => setHoveredSocial(null)}
                onClick={(e) => {
                  e.stopPropagation()
                  handleSocialClick(social.url)
                }}
              >
                {/* Button background */}
                <RoundedBox
                  args={[1.8, 0.8, 0.1]}
                  radius={0.1}
                  smoothness={4}
                  scale={isHovered ? 1.1 : 1}
                >
                  <meshPhysicalMaterial
                    color={isHovered ? social.color : '#12121f'}
                    transparent
                    opacity={0.8}
                    metalness={0.5}
                    roughness={0.3}
                  />
                </RoundedBox>

                {/* Button glow on hover */}
                {isHovered && (
                  <RoundedBox args={[1.9, 0.9, 0.08]} radius={0.1} smoothness={4}>
                    <meshBasicMaterial
                      color={social.color}
                      transparent
                      opacity={0.3}
                      blending={THREE.AdditiveBlending}
                    />
                  </RoundedBox>
                )}

                {/* Icon */}
                <Text
                  position={[-0.5, 0, 0.06]}
                  fontSize={0.3}
                  anchorX="center"
                  anchorY="middle"
                >
                  {social.icon}
                </Text>

                {/* Label */}
                <Text
                  position={[0.2, 0, 0.06]}
                  fontSize={0.2}
                  color={isHovered ? '#ffffff' : social.color}
                  anchorX="left"
                  anchorY="middle"
                  fontWeight="bold"
                >
                  {social.name}
                </Text>

                {/* Subtle light */}
                {isHovered && (
                  <pointLight position={[0, 0, 0.3]} intensity={0.8} distance={1.5} color={social.color} />
                )}
              </group>
            )
          })}
        </group>

        {/* Corner decorative elements */}
        {[
          [4.8, 5.05],
          [-4.8, 5.05],
          [4.8, -5.05],
          [-4.8, -5.05],
        ].map((pos, i) => (
          <mesh key={i} position={[pos[0], pos[1], 0.12]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshBasicMaterial
              color="#8b5cf6"
              transparent
              opacity={0.6}
              blending={THREE.AdditiveBlending}
            />
            <pointLight intensity={0.5} distance={2} color="#8b5cf6" />
          </mesh>
        ))}

        {/* Card edge lighting */}
        <pointLight position={[0, 0, 1]} intensity={1.5} distance={8} color="#8b5cf6" />
      </group>
    </Float>
  )
}

// Easing functions
function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3)
}

export default StudentInfoSpace
