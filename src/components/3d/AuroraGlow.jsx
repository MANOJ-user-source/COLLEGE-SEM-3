import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function AuroraGlow() {
  const glowRef = useRef()

  // Create aurora-like glowing waves
  const geometry = useMemo(() => {
    return new THREE.SphereGeometry(60, 64, 64)
  }, [])

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        colorA: { value: new THREE.Color('#ff6ec7') },
        colorB: { value: new THREE.Color('#c77dff') },
        colorC: { value: new THREE.Color('#60a5fa') },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;

        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 colorA;
        uniform vec3 colorB;
        uniform vec3 colorC;
        varying vec3 vNormal;
        varying vec3 vPosition;

        void main() {
          // Create aurora wave effect
          float wave1 = sin(vPosition.y * 0.1 + time * 0.5) * 0.5 + 0.5;
          float wave2 = sin(vPosition.x * 0.1 - time * 0.3) * 0.5 + 0.5;
          float wave3 = sin(vPosition.z * 0.1 + time * 0.4) * 0.5 + 0.5;

          // Mix colors based on waves
          vec3 color = mix(colorA, colorB, wave1);
          color = mix(color, colorC, wave2);

          // Fresnel effect for glow edges
          float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.0);

          // Combine effects
          float alpha = fresnel * wave3 * 0.08;

          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
  }, [])

  useFrame((state) => {
    if (material.uniforms) {
      material.uniforms.time.value = state.clock.elapsedTime
    }
    if (glowRef.current) {
      glowRef.current.rotation.y = state.clock.elapsedTime * 0.05
      glowRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
    }
  })

  return (
    <mesh ref={glowRef} geometry={geometry} material={material} />
  )
}

export default AuroraGlow
