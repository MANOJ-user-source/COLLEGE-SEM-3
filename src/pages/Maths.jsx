import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float, MeshDistortMaterial, Sphere, Box, Octahedron, Cone, Environment, Stars } from '@react-three/drei'

// Animated 3D Sphere
function AnimatedSphere({ position, color, scale = 1 }) {
  const meshRef = useRef()

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005
    }
  })

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} position={position} args={[scale, 32, 32]}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.4}
          speed={3}
          roughness={0.2}
          metalness={0.9}
          emissive={color}
          emissiveIntensity={0.3}
        />
      </Sphere>
    </Float>
  )
}

// Animated 3D Octahedron
function AnimatedOctahedron({ position, color }) {
  const meshRef = useRef()

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.008
      meshRef.current.rotation.y += 0.012
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.5}>
      <Octahedron ref={meshRef} position={position} args={[1.2]}>
        <MeshDistortMaterial
          color={color}
          distort={0.3}
          speed={2}
          roughness={0.1}
          metalness={0.8}
        />
      </Octahedron>
    </Float>
  )
}

// Animated Cone
function AnimatedCone({ position, color }) {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.2
    }
  })

  return (
    <Float speed={3} rotationIntensity={2} floatIntensity={1}>
      <Cone ref={meshRef} position={position} args={[0.8, 2, 16]}>
        <meshStandardMaterial
          color={color}
          metalness={0.9}
          roughness={0.1}
          emissive={color}
          emissiveIntensity={0.5}
        />
      </Cone>
    </Float>
  )
}

// 3D Scene Component
function MathsScene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#60a5fa" />
      <pointLight position={[-10, -10, -10]} intensity={0.8} color="#a78bfa" />
      <spotLight position={[0, 15, 0]} angle={0.3} penumbra={1} intensity={2} color="#3b82f6" />
      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
      <Environment preset="city" />
      <AnimatedSphere position={[0, 2, 0]} color="#60a5fa" scale={1.5} />
      <AnimatedSphere position={[-3, -1, 0]} color="#a78bfa" scale={1} />
      <AnimatedSphere position={[3, -1, 0]} color="#3b82f6" scale={1} />
      <AnimatedOctahedron position={[-5, 0, -3]} color="#34d399" />
      <AnimatedOctahedron position={[5, 0, -3]} color="#fbbf24" />
      <AnimatedOctahedron position={[0, 4, -2]} color="#f472b6" />
      <AnimatedCone position={[0, -3, 1]} color="#60a5fa" />
      <Float speed={2} rotationIntensity={1} floatIntensity={3}>
        <Box position={[-4, 3, -2]} args={[0.8, 0.8, 0.8]}>
          <meshStandardMaterial color="#fbbf24" metalness={0.9} roughness={0.1} />
        </Box>
      </Float>
      <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
        <Box position={[4, 3, -2]} args={[0.8, 0.8, 0.8]}>
          <meshStandardMaterial color="#fb923c" metalness={0.9} roughness={0.1} />
        </Box>
      </Float>
      <OrbitControls
        enableZoom={true}
        enablePan={true}
        minDistance={8}
        maxDistance={20}
        autoRotate
        autoRotateSpeed={0.4}
      />
    </>
  )
}

// Main Maths Page Component
function Maths() {
  const navigate = useNavigate()
  const [expandedUnit, setExpandedUnit] = useState(null)

  const courseInfo = {
    code: 'BC03001041',
    name: 'Mathematical Foundation for AI',
    semester: 3,
    credits: 4,
    totalMarks: 150
  }

  const marksBreakdown = [
    { label: 'Theory (ESE)', marks: 70, color: 'from-blue-500 to-cyan-500' },
    { label: 'Mid Term (PA/CA)', marks: 30, color: 'from-purple-500 to-pink-500' },
    { label: 'Internal (PA/CA)', marks: 20, color: 'from-green-500 to-emerald-500' },
    { label: 'Viva (ESE)', marks: 30, color: 'from-yellow-500 to-orange-500' }
  ]

  const units = [
    {
      id: 1,
      title: 'Linear Algebra for AI',
      weightage: 20,
      hours: 6,
      color: 'from-blue-500 to-cyan-500',
      icon: '📐',
      topics: [
        'Vectors and Vector Operations',
        'Matrices and Matrix Operations',
        'Eigenvalues and Eigenvectors',
        'Singular Value Decomposition (SVD)',
        'Applications in Data Representation'
      ],
      keyPoints: 'Linear algebra forms the foundation for representing and manipulating data in AI. Understanding matrices and transformations is crucial for neural networks and machine learning algorithms.'
    },
    {
      id: 2,
      title: 'Probability and Statistics',
      weightage: 20,
      hours: 6,
      color: 'from-purple-500 to-pink-500',
      icon: '📊',
      topics: [
        'Probability Theory Fundamentals',
        'Bayes Theorem',
        'Probability Distributions',
        'Expectation and Variance',
        'Law of Large Numbers'
      ],
      keyPoints: 'Probability and statistics are essential for modeling uncertainty in AI systems. These concepts are critical for probabilistic reasoning and machine learning.'
    },
    {
      id: 3,
      title: 'Calculus and Optimization',
      weightage: 20,
      hours: 6,
      color: 'from-green-500 to-emerald-500',
      icon: '📈',
      topics: [
        'Limits and Derivatives',
        'Partial Derivatives',
        'Gradient Descent Algorithm',
        'Convex Functions',
        'Lagrange Multipliers'
      ],
      keyPoints: 'Calculus powers the optimization algorithms that train AI models. Gradient descent and its variants are the backbone of modern deep learning.'
    },
    {
      id: 4,
      title: 'Discrete Mathematics and Logic',
      weightage: 20,
      hours: 6,
      color: 'from-yellow-500 to-orange-500',
      icon: '🔢',
      topics: [
        'Sets, Relations, and Functions',
        'Propositional Logic',
        'Predicate Logic',
        'Logical Inference',
        'Boolean Algebra'
      ],
      keyPoints: 'Logic and discrete math provide the formal foundation for reasoning in AI. These concepts are used in expert systems, knowledge representation, and automated reasoning.'
    },
    {
      id: 5,
      title: 'Applications and Case Studies',
      weightage: 20,
      hours: 6,
      color: 'from-red-500 to-pink-500',
      icon: '🤖',
      topics: [
        'Mathematical Modeling in AI',
        'Optimization in Neural Networks',
        'Probabilistic Reasoning in ML',
        'Real-world Problem Formulation',
        'Case Studies and Implementation'
      ],
      keyPoints: 'Applying mathematical concepts to real AI problems. Learn how all the theory comes together in practical machine learning and AI systems.'
    }
  ]

  const tutorials = [
    '🔹 Matrix operations, SVD, and eigen-decomposition using Python/NumPy',
    '🔹 Probability distributions and statistical computation tasks',
    '🔹 Implementation of gradient descent on a simple cost function',
    '🔹 Truth tables and logical inference problems',
    '🔹 Optimization exercises using real AI datasets'
  ]

  const assignments = [
    '📝 Case study: Optimization in logistic regression',
    '📝 Exploratory data analysis using statistical concepts',
    '📝 Mathematical logic puzzle solving and proof writing',
    '📝 Real-world AI problem formulation and mathematical modeling'
  ]

  const referenceBooks = [
    {
      title: 'Mathematics for Machine Learning',
      author: 'V. Kumar',
      publisher: 'Cambridge University Press'
    },
    {
      title: 'Introduction to Probability Models',
      author: 'Sheldon Ross',
      publisher: 'Academic Press'
    },
    {
      title: 'Linear Algebra and Its Applications',
      author: 'Gilbert Strang',
      publisher: 'Cengage Learning'
    },
    {
      title: 'Modern Control Systems',
      author: 'Richard C. Dorf and Robert H. Bishop',
      publisher: 'For optimization insight'
    },
    {
      title: 'Discrete Mathematics and Its Applications',
      author: 'Kenneth Rosen',
      publisher: 'McGraw Hill'
    },
    {
      title: 'Convex Optimization',
      author: 'Stephen Boyd and Lieven Vandenberghe',
      publisher: 'Cambridge University Press'
    }
  ]

  const courseOutcomes = [
    {
      id: 'CO1',
      description: 'Apply linear algebra concepts to represent data and model transformations',
      level: 'Application'
    },
    {
      id: 'CO2',
      description: 'Utilize calculus and optimization techniques for training AI models',
      level: 'Application'
    },
    {
      id: 'CO3',
      description: 'Explain use of probability theory and statistics for modeling uncertainty in AI',
      level: 'Understanding'
    },
    {
      id: 'CO4',
      description: 'Analyze AI algorithms using concepts of logic and set theory',
      level: 'Analysis'
    },
    {
      id: 'CO5',
      description: 'Evaluate mathematical approaches for real-world AI problems',
      level: 'Evaluation'
    }
  ]

  const examPattern = [
    { level: 'Remember', percentage: 10, color: 'bg-blue-500' },
    { level: 'Understanding', percentage: 20, color: 'bg-purple-500' },
    { level: 'Application', percentage: 30, color: 'bg-green-500' },
    { level: 'Analyze', percentage: 20, color: 'bg-yellow-500' },
    { level: 'Evaluate', percentage: 20, color: 'bg-red-500' }
  ]

  const toggleUnit = (unitId) => {
    setExpandedUnit(expandedUnit === unitId ? null : unitId)
  }

  return (
    <div className="relative min-h-screen bg-slate-950 overflow-hidden">
      {/* 3D Background Scene */}
      <div className="fixed inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
          <MathsScene />
        </Canvas>
      </div>

      {/* Gradient Overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-blue-950/30 via-transparent to-slate-950/60 z-10 pointer-events-none" />

      {/* Scrollable Content */}
      <div className="relative z-20 min-h-screen">
        {/* Header */}
        <header className="bg-slate-900/30 backdrop-blur-xl border-b border-blue-500/20 sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/')}
                className="p-3 rounded-xl bg-blue-500/20 hover:bg-blue-500/30 transition-all border border-blue-500/50 backdrop-blur-sm hover:scale-110"
              >
                <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-600">
                  📐 Mathematical Foundation for AI
                </h1>
                <p className="text-slate-300 mt-2 text-base md:text-lg">
                  Complete Course Reference & Study Guide
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Master the Mathematics Behind AI
            </h2>
            <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto">
              Everything you need to know about {courseInfo.code} - from course structure to exam preparation
            </p>
          </div>

          {/* Quick Course Info */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
            <div className="bg-slate-900/60 backdrop-blur-xl rounded-xl p-4 border border-slate-700/50 text-center">
              <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                {courseInfo.semester}
              </div>
              <div className="text-slate-400 text-sm">Semester</div>
            </div>
            <div className="bg-slate-900/60 backdrop-blur-xl rounded-xl p-4 border border-slate-700/50 text-center">
              <div className="text-3xl font-bold text-blue-400">
                {courseInfo.credits}
              </div>
              <div className="text-slate-400 text-sm">Credits</div>
            </div>
            <div className="bg-slate-900/60 backdrop-blur-xl rounded-xl p-4 border border-slate-700/50 text-center">
              <div className="text-3xl font-bold text-purple-400">
                {courseInfo.totalMarks}
              </div>
              <div className="text-slate-400 text-sm">Total Marks</div>
            </div>
            <div className="bg-slate-900/60 backdrop-blur-xl rounded-xl p-4 border border-slate-700/50 text-center">
              <div className="text-3xl font-bold text-green-400">
                {units.length}
              </div>
              <div className="text-slate-400 text-sm">Units</div>
            </div>
            <div className="bg-slate-900/60 backdrop-blur-xl rounded-xl p-4 border border-slate-700/50 text-center">
              <div className="text-3xl font-bold text-yellow-400">
                30
              </div>
              <div className="text-slate-400 text-sm">Hours</div>
            </div>
          </div>

          {/* Marks Breakdown */}
          <div className="mb-12">
            <h3 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-4xl">📊</span> Marks Distribution
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {marksBreakdown.map((item, index) => (
                <div key={index} className="group relative">
                  <div className={`absolute inset-0 bg-gradient-to-r ${item.color}/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all`} />
                  <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 group-hover:border-blue-500/50 transition-all text-center">
                    <div className={`text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${item.color} mb-2`}>
                      {item.marks}
                    </div>
                    <div className="text-slate-300 text-sm font-semibold">{item.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Units Section */}
          <div className="mb-12">
            <h3 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-4xl">📚</span> Course Units (20% each)
            </h3>
            <div className="space-y-4">
              {units.map((unit) => (
                <div key={unit.id} className="group relative">
                  <div className={`absolute inset-0 bg-gradient-to-r ${unit.color}/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all`} />
                  <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 group-hover:border-blue-500/50 transition-all">
                    <div
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => toggleUnit(unit.id)}
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <span className="text-4xl">{unit.icon}</span>
                        <div>
                          <h4 className="text-xl font-bold text-white mb-1">
                            Unit {unit.id}: {unit.title}
                          </h4>
                          <div className="flex gap-3 text-sm">
                            <span className="text-slate-400">{unit.hours} Hours</span>
                            <span className="text-blue-400 font-semibold">{unit.weightage}% Weightage</span>
                          </div>
                        </div>
                      </div>
                      <button className="p-2 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg transition-all">
                        <svg
                          className={`w-6 h-6 text-blue-400 transition-transform ${expandedUnit === unit.id ? 'rotate-180' : ''}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>

                    {expandedUnit === unit.id && (
                      <div className="mt-6 pt-6 border-t border-slate-700/50">
                        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 mb-4">
                          <p className="text-slate-300 text-sm leading-relaxed">{unit.keyPoints}</p>
                        </div>
                        <h5 className="text-white font-bold mb-3">Topics Covered:</h5>
                        <ul className="space-y-2">
                          {unit.topics.map((topic, index) => (
                            <li key={index} className="text-slate-300 text-sm flex items-start gap-2">
                              <span className="text-blue-400 mt-1">▸</span>
                              <span>{topic}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Exam Pattern */}
          <div className="mb-12">
            <h3 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-4xl">📝</span> Exam Pattern & Mark Distribution
            </h3>
            <div className="bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50">
              <div className="space-y-4">
                {examPattern.map((item, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-semibold">{item.level}</span>
                      <span className="text-slate-300">{item.percentage}%</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
                      <div
                        className={`${item.color} h-full rounded-full transition-all duration-500`}
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-slate-400 text-sm mt-6 italic">
                Focus most on Application (30%), followed by Understanding and Analysis (20% each)
              </p>
            </div>
          </div>

          {/* Course Outcomes */}
          <div className="mb-12">
            <h3 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-4xl">🎯</span> Course Outcomes (What You'll Learn)
            </h3>
            <div className="space-y-3">
              {courseOutcomes.map((outcome) => (
                <div key={outcome.id} className="bg-slate-900/80 backdrop-blur-xl rounded-xl p-5 border border-slate-700/50 hover:border-blue-500/50 transition-all">
                  <div className="flex items-start gap-4">
                    <span className="px-3 py-1 rounded-lg bg-blue-500/20 text-blue-300 font-bold text-sm border border-blue-500/50">
                      {outcome.id}
                    </span>
                    <div className="flex-1">
                      <p className="text-slate-300 mb-2">{outcome.description}</p>
                      <span className="text-xs text-slate-500 font-semibold">Level: {outcome.level}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tutorials */}
          <div className="mb-12">
            <h3 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-4xl">💻</span> Practical Tutorials
            </h3>
            <div className="bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50">
              <ul className="space-y-3">
                {tutorials.map((tutorial, index) => (
                  <li key={index} className="text-slate-300 text-sm md:text-base flex items-start gap-3">
                    <span className="text-green-400 text-lg">✓</span>
                    <span>{tutorial}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Assignments */}
          <div className="mb-12">
            <h3 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-4xl">✍️</span> Active Learning Assignments
            </h3>
            <div className="bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50">
              <ul className="space-y-3">
                {assignments.map((assignment, index) => (
                  <li key={index} className="text-slate-300 text-sm md:text-base flex items-start gap-3">
                    <span className="text-purple-400 text-lg">✦</span>
                    <span>{assignment}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Reference Books */}
          <div className="mb-12">
            <h3 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-4xl">📖</span> Reference Books
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {referenceBooks.map((book, index) => (
                <div key={index} className="bg-slate-900/80 backdrop-blur-xl rounded-xl p-5 border border-slate-700/50 hover:border-blue-500/50 transition-all">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">📚</span>
                    <div>
                      <h4 className="text-white font-bold mb-1">{book.title}</h4>
                      <p className="text-slate-400 text-sm mb-1">by {book.author}</p>
                      <p className="text-slate-500 text-xs">{book.publisher}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Study Tips */}
          <div className="mb-12">
            <h3 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-4xl">💡</span> Study Tips
            </h3>
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-2xl p-6">
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="text-yellow-400">★</span>
                  <span>Each unit carries equal weightage (20%) - give equal attention to all topics</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-yellow-400">★</span>
                  <span>Practice Python/NumPy implementations for better understanding</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-yellow-400">★</span>
                  <span>Focus on Application (30%) and Analysis (20%) level questions for higher marks</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-yellow-400">★</span>
                  <span>Connect mathematical concepts to real AI/ML applications</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-yellow-400">★</span>
                  <span>Theory exam is 70 marks - understand derivations and proofs thoroughly</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Maths
