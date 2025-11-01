import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

function CinematicTransition({ isActive, onComplete }) {
  const { gl } = useThree()
  const rigRef = useRef(new THREE.Group())
  const progressRef = useRef(0)
  const clockRef = useRef(new THREE.Clock())

  // Cached objects to avoid per-frame GC churn
  const tmpVec2 = new THREE.Vector3()
  const finalPos = new THREE.Vector3(0, 0, 12)
  const targetQuaternion = new THREE.Quaternion()

  useEffect(() => {
    if (isActive) {
      progressRef.current = 0
      clockRef.current.start()
    } else {
      clockRef.current.stop()
    }
  }, [isActive])

  useFrame(() => {
    if (!isActive || progressRef.current >= 1) return

    const delta = clockRef.current.getDelta()
    progressRef.current = Math.min(progressRef.current + delta * 0.5, 1) // SLOWER - 0.5 instead of 0.8
    const progress = progressRef.current

    const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
    const easeOutQuad = (t) => 1 - (1 - t) * (1 - t)

    const rig = rigRef.current
    if (!rig) return

    // PHASE 1: Start space journey - fade out solar system (0-0.2)
    if (progress < 0.2) {
      const t = progress / 0.2
      const smoothT = easeInOutCubic(t)

      // Just start moving forward - NO sun zoom
      rig.position.z = THREE.MathUtils.lerp(0, -5, smoothT)

      // Gentle rotation start
      rig.rotation.z = smoothT * Math.PI * 0.3
    }

    // PHASE 2: High-speed space travel with stars (0.2-0.8)
    else if (progress < 0.8) {
      const t = (progress - 0.2) / 0.6
      const smoothT = easeInOutCubic(t)

      // Fast forward motion through space
      rig.position.z = THREE.MathUtils.lerp(-5, -40, smoothT)

      // Gentle barrel roll for drama
      rig.rotation.z = Math.PI * 0.3 + (smoothT * Math.PI * 2)

      // Very subtle drift
      const drift = Math.sin(smoothT * Math.PI * 2) * 0.3
      rig.position.x = drift
      rig.position.y = drift * 0.5

      // Slightly brighter during travel
      gl.toneMappingExposure = THREE.MathUtils.lerp(1, 1.5, smoothT * (1 - smoothT) * 4)
    }

    // PHASE 3: Arrive at destination (0.8-1)
    else {
      const t = (progress - 0.8) / 0.2
      const smoothT = easeOutQuad(t)

      // Smooth arrival
      rig.position.z = THREE.MathUtils.lerp(-40, finalPos.z, smoothT)
      rig.position.x = THREE.MathUtils.lerp(rig.position.x, 0, smoothT)
      rig.position.y = THREE.MathUtils.lerp(rig.position.y, 0, smoothT)

      // Stop rotation smoothly
      rig.rotation.z *= 1 - smoothT

      // Back to normal exposure
      gl.toneMappingExposure = THREE.MathUtils.lerp(1.5, 1, smoothT)

      // Look forward
      tmpVec2.set(0, 0, 0)
      targetQuaternion.setFromRotationMatrix(
        new THREE.Matrix4().lookAt(rig.position, tmpVec2, rig.up)
      )
      rig.quaternion.slerp(targetQuaternion, 0.1)

      if (progress >= 0.99 && onComplete) onComplete()
    }
  })

  // Attach the camera to the rig
  return <primitive object={rigRef.current} attach="parent" />
}

export default CinematicTransition
