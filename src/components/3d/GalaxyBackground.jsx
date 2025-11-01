import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function GalaxyBackground() {
  const meshRef = useRef()

  // Create milky way nebula effect using shaders
  const [geometry, material] = useMemo(() => {
    // Optimized geometry for better performance while keeping quality
    const geometry = new THREE.IcosahedronGeometry(100, 20)

    // Custom shader for milky way effect
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        resolution: { value: new THREE.Vector2() },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        void main() {
          vUv = uv;
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        varying vec2 vUv;
        varying vec3 vPosition;

        // 3D random function
        float random(vec3 st) {
          return fract(sin(dot(st.xyz, vec3(12.9898, 78.233, 45.164))) * 43758.5453123);
        }

        // 3D noise function - eliminates seams
        float noise(vec3 st) {
          vec3 i = floor(st);
          vec3 f = fract(st);

          // 8 corners of a cube
          float a = random(i);
          float b = random(i + vec3(1.0, 0.0, 0.0));
          float c = random(i + vec3(0.0, 1.0, 0.0));
          float d = random(i + vec3(1.0, 1.0, 0.0));
          float e = random(i + vec3(0.0, 0.0, 1.0));
          float f2 = random(i + vec3(1.0, 0.0, 1.0));
          float g = random(i + vec3(0.0, 1.0, 1.0));
          float h = random(i + vec3(1.0, 1.0, 1.0));

          vec3 u = smoothstep(0.0, 1.0, f);

          // Trilinear interpolation
          return mix(
            mix(mix(a, b, u.x), mix(c, d, u.x), u.y),
            mix(mix(e, f2, u.x), mix(g, h, u.x), u.y),
            u.z
          );
        }

        // Optimized FBM - balanced quality and performance
        float fbm(vec3 st) {
          float value = 0.0;
          float amplitude = 0.5;
          for(int i = 0; i < 5; i++) {
            value += amplitude * noise(st);
            st *= 2.1;
            amplitude *= 0.5;
          }
          return value;
        }

        // Optimized turbulence - fewer iterations
        float turbulence(vec3 st) {
          float value = 0.0;
          float amplitude = 1.0;
          for(int i = 0; i < 4; i++) {
            value += amplitude * abs(noise(st) - 0.5);
            st *= 2.0;
            amplitude *= 0.5;
          }
          return value;
        }

        // 2D random for stars (separate from 3D noise)
        float random2D(vec2 st) {
          return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
        }

        // 3D Star field - seamless across entire sphere
        float stars3D(vec3 p, float density, float threshold) {
          vec3 i = floor(p * density);
          float r = random(i);
          if(r > threshold) {
            vec3 f = fract(p * density);
            float d = length(f - vec3(0.5));
            float brightness = random(i + vec3(1.0, 1.0, 1.0));
            float size = random(i + vec3(2.0, 2.0, 2.0));
            float radius = mix(0.02, 0.08, size);
            return smoothstep(radius, 0.0, d) * brightness;
          }
          return 0.0;
        }

        // Bright focal stars in 3D
        float brightStars3D(vec3 p, float density) {
          vec3 i = floor(p * density);
          float r = random(i);
          if(r > 0.985) {
            vec3 f = fract(p * density);
            float d = length(f - vec3(0.5));
            float brightness = random(i + vec3(1.0, 1.0, 1.0)) * 1.5;

            // Multi-layer glow
            float core = smoothstep(0.04, 0.0, d) * brightness;
            float glow1 = smoothstep(0.12, 0.0, d) * brightness * 0.3;
            float glow2 = smoothstep(0.2, 0.0, d) * brightness * 0.15;

            return core + glow1 + glow2;
          }
          return 0.0;
        }

        void main() {
          vec2 st = vUv;
          vec2 centered = st - 0.5;

          // Use 3D position for seamless noise
          vec3 pos = normalize(vPosition) * 0.5;

          // Slow time for subtle animation
          float t = time * 0.03;

          // Multiple layers of nebula clouds with different scales using 3D coordinates
          vec3 nebulaCoord1 = pos * 2.0 + vec3(t * 0.1, t * 0.05, 0.0);
          vec3 nebulaCoord2 = pos * 3.5 + vec3(-t * 0.08, t * 0.12, t * 0.06);
          vec3 nebulaCoord3 = pos * 1.5 + vec3(t * 0.06, -t * 0.04, -t * 0.03);

          float nebula1 = fbm(nebulaCoord1);
          float nebula2 = fbm(nebulaCoord2);
          float nebula3 = turbulence(nebulaCoord3);

          // Combine nebula layers for depth
          float nebulaPattern = nebula1 * 0.5 + nebula2 * 0.3 + nebula3 * 0.2;

          // Add some wispy details
          float wisps = turbulence(pos * 4.0 + vec3(t * 0.15, -t * 0.1, t * 0.08)) * 0.3;
          nebulaPattern = mix(nebulaPattern, wisps, 0.4);

          // Create brighter central glow region (still use 2D for this)
          float centerDist = length(centered);
          float centerGlow = exp(-centerDist * 1.5) * 0.6;
          nebulaPattern += centerGlow;

          // Enhanced color palette matching the reference image more closely
          vec3 deepSpace = vec3(0.01, 0.01, 0.05);      // Darker space background
          vec3 veryDarkPurple = vec3(0.08, 0.02, 0.15); // Very dark purple regions
          vec3 darkPurple = vec3(0.18, 0.08, 0.28);     // Dark purple
          vec3 purple = vec3(0.45, 0.20, 0.60);         // Rich purple
          vec3 brightPurple = vec3(0.70, 0.35, 0.85);   // Bright purple/magenta
          vec3 magenta = vec3(0.85, 0.45, 0.90);        // Bright magenta
          vec3 pink = vec3(0.95, 0.55, 0.85);           // Soft pink
          vec3 darkBlue = vec3(0.15, 0.20, 0.45);       // Dark blue
          vec3 blue = vec3(0.35, 0.45, 0.80);           // Mid blue
          vec3 lightBlue = vec3(0.55, 0.70, 1.0);       // Light blue
          vec3 white = vec3(1.0, 0.98, 1.0);            // Bright white

          // Build color from multiple layers with better contrast
          vec3 color = deepSpace;

          // Create dark regions for contrast (very important for depth)
          float darkRegions = 1.0 - smoothstep(0.15, 0.35, nebulaPattern);
          color = mix(color, veryDarkPurple, darkRegions * 0.7);

          // Dark purple base layer
          color = mix(color, darkPurple, smoothstep(0.25, 0.45, nebulaPattern));

          // Purple nebula clouds - main body
          color = mix(color, purple, smoothstep(0.35, 0.65, nebulaPattern));

          // Bright purple/magenta regions
          color = mix(color, brightPurple, smoothstep(0.55, 0.78, nebulaPattern));

          // Intense magenta highlights
          color = mix(color, magenta, smoothstep(0.68, 0.85, nebulaPattern) * nebula2);

          // Pink highlights in brightest areas
          color = mix(color, pink, smoothstep(0.75, 0.90, nebulaPattern) * nebula1);

          // Blue regions with better blending (using 3D noise)
          float blueRegion = fbm(pos * 2.2 + vec3(t * 0.05, -t * 0.06, t * 0.04));
          float bluePattern = smoothstep(0.4, 0.7, blueRegion);

          // Dark blue base
          color = mix(color, darkBlue, bluePattern * 0.5 * (1.0 - darkRegions));

          // Mid and light blue highlights
          color = mix(color, blue, smoothstep(0.5, 0.75, blueRegion) * 0.6);
          color = mix(color, lightBlue, smoothstep(0.7, 0.88, blueRegion) * 0.45);

          // Bright central glow with white core
          float centralHighlight = centerGlow * smoothstep(0.75, 1.0, nebulaPattern);
          color = mix(color, white, centralHighlight);

          // Multiple 3D star layers - completely seamless!
          float starField1 = stars3D(pos, 30.0, 0.96);                              // Small stars
          float starField2 = stars3D(pos + vec3(0.5, 0.3, 0.2), 50.0, 0.975);      // Tiny stars
          float starField3 = stars3D(pos + vec3(0.2, 0.8, 0.4), 70.0, 0.98);       // Very tiny stars
          float starField4 = stars3D(pos + vec3(0.7, 0.1, 0.6), 25.0, 0.94);       // Medium stars

          // Add bright focal stars
          float brightStarField1 = brightStars3D(pos, 15.0);
          float brightStarField2 = brightStars3D(pos + vec3(0.3, 0.6, 0.8), 12.0);

          // Combine star layers
          float allStars = starField1 + starField2 * 0.6 + starField3 * 0.4 + starField4 * 0.8;
          float allBrightStars = brightStarField1 + brightStarField2 * 0.8;

          // Subtle twinkling effect using 3D position
          float twinkle = sin(time * 1.5 + random(pos * 10.0) * 6.28) * 0.2 + 0.8;
          float brightTwinkle = sin(time * 1.8 + random(pos * 15.0 + vec3(1.0)) * 6.28) * 0.25 + 0.75;

          allStars *= twinkle;
          allBrightStars *= brightTwinkle;

          // Add regular stars with subtle blue tint
          color += vec3(allStars) * vec3(0.95, 0.97, 1.0);

          // Add bright stars with warmer glow
          color += vec3(allBrightStars) * vec3(1.0, 0.98, 1.0);

          // Add subtle bright points in dense nebula regions
          float brightSpots = smoothstep(0.82, 0.94, nebulaPattern) * 0.35;
          color += vec3(brightSpots) * magenta * 0.8;

          // Slight overall brightness boost
          color *= 1.15;

          // Vignette effect for depth
          float vignette = 1.0 - centerDist * 0.4;
          color *= vignette;

          gl_FragColor = vec4(color, 1.0);
        }
      `,
      side: THREE.BackSide,
      depthWrite: false,
      depthTest: true,
    })

    return [geometry, material]
  }, [])

  // Animate the shader
  useFrame((state) => {
    if (material.uniforms) {
      material.uniforms.time.value = state.clock.elapsedTime
    }
    if (meshRef.current) {
      // Very slow rotation for subtle movement
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.008
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.003) * 0.05
    }
  })

  return (
    <mesh ref={meshRef} geometry={geometry} material={material} position={[0, 0, 0]} />
  )
}

export default GalaxyBackground
