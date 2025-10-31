import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars, Float } from '@react-three/drei'
import SubjectSphere from './SubjectSphere'
import ParticleField from './ParticleField'

const subjects = [
  {
    name: 'OS',
    fullName: 'Operating Systems',
    position: [-4, 2, 0],
    color: '#60a5fa',
    icon: '⚙️'
  },
  {
    name: 'OOP',
    fullName: 'Object-Oriented Programming',
    position: [4, 2, 0],
    color: '#f472b6',
    icon: '🧩'
  },
  {
    name: 'CN',
    fullName: 'Computer Networks',
    position: [0, 3, -3],
    color: '#34d399',
    icon: '🌐'
  },
  {
    name: 'MATHS AI',
    fullName: 'Mathematics for AI',
    position: [-3, -2, -2],
    color: '#fbbf24',
    icon: '📐'
  },
  {
    name: 'WDP',
    fullName: 'Web Design & Programming',
    position: [3, -2, -2],
    color: '#a78bfa',
    icon: '💻'
  },
  {
    name: 'VC',
    fullName: 'Version Control',
    position: [0, -3, 0],
    color: '#fb923c',
    icon: '🔀'
  },
  {
    name: 'DTI',
    fullName: 'Digital Transformation',
    position: [0, 0, 2],
    color: '#ec4899',
    icon: '🚀'
  },
]

function Scene3D() {
  return (
    <div className="w-full h-screen">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 60 }}
        className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"
      >
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#60a5fa" />
        <spotLight
          position={[0, 10, 0]}
          angle={0.3}
          penumbra={1}
          intensity={1}
          castShadow
        />

        {/* Stars background */}
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />

        {/* Particle field */}
        <ParticleField count={800} />

        {/* Subject spheres */}
        {subjects.map((subject, index) => (
          <Float
            key={subject.name}
            speed={2}
            rotationIntensity={1}
            floatIntensity={2}
          >
            <SubjectSphere
              position={subject.position}
              color={subject.color}
              name={subject.name}
              fullName={subject.fullName}
              icon={subject.icon}
            />
          </Float>
        ))}

        {/* Camera controls */}
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={8}
          maxDistance={20}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  )
}

export default Scene3D
