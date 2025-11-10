import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float, MeshDistortMaterial, Sphere, Box, Torus, Environment, Stars } from '@react-three/drei'
import { AnimatePresence } from 'framer-motion'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import practicalTasks from '../data/practicalTasks.js'
import assignments from '../data/assignments.js'
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

// Animated 3D Cube
function AnimatedCube({ position, color }) {
  const meshRef = useRef()

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01
      meshRef.current.rotation.y += 0.01
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.5}>
      <Box ref={meshRef} position={position} args={[1.5, 1.5, 1.5]}>
        <MeshDistortMaterial
          color={color}
          distort={0.3}
          speed={2}
          roughness={0.1}
          metalness={0.8}
        />
      </Box>
    </Float>
  )
}

// Animated Ring
function AnimatedRing({ position, color }) {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2
    }
  })

  return (
    <Float speed={3} rotationIntensity={2} floatIntensity={1}>
      <Torus ref={meshRef} position={position} args={[2, 0.4, 16, 100]}>
        <meshStandardMaterial
          color={color}
          metalness={0.9}
          roughness={0.1}
          emissive={color}
          emissiveIntensity={0.5}
        />
      </Torus>
    </Float>
  )
}

// 3D Scene Component
function OOPScene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#f472b6" />
      <pointLight position={[-10, -10, -10]} intensity={0.8} color="#a78bfa" />
      <spotLight position={[0, 15, 0]} angle={0.3} penumbra={1} intensity={2} color="#ec4899" />
      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
      <Environment preset="city" />
      <AnimatedSphere position={[0, 2, 0]} color="#f472b6" scale={1.5} />
      <AnimatedSphere position={[-3, -1, 0]} color="#a78bfa" scale={1} />
      <AnimatedSphere position={[3, -1, 0]} color="#ec4899" scale={1} />
      <AnimatedCube position={[-5, 0, -3]} color="#60a5fa" />
      <AnimatedCube position={[5, 0, -3]} color="#34d399" />
      <AnimatedCube position={[0, 4, -2]} color="#fbbf24" />
      <AnimatedRing position={[0, -3, 1]} color="#f472b6" />
      <Float speed={2} rotationIntensity={1} floatIntensity={3}>
        <Torus position={[-4, 3, -2]} args={[0.6, 0.2, 16, 100]}>
          <meshStandardMaterial color="#fbbf24" metalness={0.9} roughness={0.1} />
        </Torus>
      </Float>
      <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
        <Torus position={[4, 3, -2]} args={[0.6, 0.2, 16, 100]}>
          <meshStandardMaterial color="#fb923c" metalness={0.9} roughness={0.1} />
        </Torus>
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

// Code Block Component with Copy functionality
function CodeBlock({ code, language = 'java' }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative group">
      <button
        onClick={handleCopy}
        className="absolute right-3 top-3 z-10 px-3 py-1 bg-pink-500/20 hover:bg-pink-500/30 text-pink-300 rounded-lg text-xs font-semibold border border-pink-500/50 transition-all"
      >
        {copied ? '✓ Copied!' : '📋 Copy'}
      </button>
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          borderRadius: '0.75rem',
          fontSize: '0.875rem',
          padding: '1.5rem',
          background: 'rgba(15, 23, 42, 0.95)',
          border: '1px solid rgba(148, 163, 184, 0.2)',
        }}
        showLineNumbers
      >
        {code}
      </SyntaxHighlighter>
    </div>
  )
}

// Markdown Answer Renderer Component
function MarkdownAnswer({ content }) {
  const [copied, setCopied] = useState({})

  const handleCopy = (code, index) => {
    navigator.clipboard.writeText(code)
    setCopied(prev => ({ ...prev, [index]: true }))
    setTimeout(() => setCopied(prev => ({ ...prev, [index]: false })), 2000)
  }

  const renderInlineMarkdown = (text) => {
    const parts = []
    let remaining = text
    let key = 0

    while (remaining) {
      // Bold text **text**
      const boldMatch = remaining.match(/\*\*(.*?)\*\*/)
      if (boldMatch && boldMatch.index === 0) {
        parts.push(<strong key={key++} className="text-pink-300 font-bold">{boldMatch[1]}</strong>)
        remaining = remaining.substring(boldMatch[0].length)
        continue
      }

      // Inline code `code`
      const codeMatch = remaining.match(/`([^`]+)`/)
      if (codeMatch && codeMatch.index === 0) {
        parts.push(<code key={key++} className="bg-pink-500/20 text-pink-300 px-2 py-0.5 rounded font-mono text-sm">{codeMatch[1]}</code>)
        remaining = remaining.substring(codeMatch[0].length)
        continue
      }

      // Find next special character
      const nextSpecial = remaining.search(/[*`]/)
      if (nextSpecial === -1) {
        parts.push(<span key={key++}>{remaining}</span>)
        break
      } else {
        parts.push(<span key={key++}>{remaining.substring(0, nextSpecial)}</span>)
        remaining = remaining.substring(nextSpecial)
      }
    }

    return parts
  }

  // Parse markdown content into React elements
  const parseMarkdown = (text) => {
    const lines = text.split('\n')
    const elements = []
    let i = 0
    let codeBlockIndex = 0

    while (i < lines.length) {
      const line = lines[i]

      // Skip empty lines but add spacing
      if (!line.trim()) {
        elements.push(<div key={`space-${i}`} className="h-2" />)
        i++
        continue
      }

      // Code blocks
      if (line.startsWith('```')) {
        const language = line.substring(3).trim() || 'text'
        const codeLines = []
        i++
        while (i < lines.length && !lines[i].startsWith('```')) {
          codeLines.push(lines[i])
          i++
        }
        const code = codeLines.join('\n')
        const currentIndex = codeBlockIndex++

        elements.push(
          <div key={`code-${currentIndex}`} className="relative group my-4">
            <button
              onClick={() => handleCopy(code, currentIndex)}
              className="absolute right-3 top-3 z-10 px-3 py-1 bg-pink-500/20 hover:bg-pink-500/30 text-pink-300 rounded-lg text-xs font-semibold border border-pink-500/50 transition-all"
            >
              {copied[currentIndex] ? '✓ Copied!' : '📋 Copy'}
            </button>
            <SyntaxHighlighter
              language={language}
              style={vscDarkPlus}
              customStyle={{
                margin: 0,
                borderRadius: '0.75rem',
                fontSize: '0.875rem',
                padding: '1.5rem',
                background: 'rgba(15, 23, 42, 0.95)',
                border: '1px solid rgba(148, 163, 184, 0.2)',
              }}
              showLineNumbers={language === 'java'}
            >
              {code}
            </SyntaxHighlighter>
          </div>
        )
        i++
        continue
      }

      // Headers
      if (line.startsWith('### ')) {
        elements.push(<h3 key={`h3-${i}`} className="text-xl font-bold text-pink-400 mt-6 mb-3">{line.substring(4)}</h3>)
        i++
        continue
      }
      if (line.startsWith('## ')) {
        elements.push(<h2 key={`h2-${i}`} className="text-2xl font-bold text-pink-400 mt-8 mb-4">{line.substring(3)}</h2>)
        i++
        continue
      }
      if (line.startsWith('# ')) {
        elements.push(<h1 key={`h1-${i}`} className="text-3xl font-bold text-pink-400 mt-8 mb-4">{line.substring(2)}</h1>)
        i++
        continue
      }

      // Horizontal rule
      if (line.trim() === '---') {
        elements.push(<hr key={`hr-${i}`} className="my-6 border-slate-700" />)
        i++
        continue
      }

      // Tables
      if (line.startsWith('|') && line.endsWith('|')) {
        const tableLines = []
        const startI = i
        while (i < lines.length && lines[i].startsWith('|')) {
          tableLines.push(lines[i])
          i++
        }

        const rows = tableLines
          .filter(l => !l.includes('---'))
          .map(l => l.split('|').map(c => c.trim()).filter(c => c))

        if (rows.length > 0) {
          elements.push(
            <div key={`table-${startI}`} className="overflow-x-auto my-4">
              <table className="w-full border border-slate-700 rounded-lg overflow-hidden">
                <thead className="bg-slate-800/50">
                  <tr>
                    {rows[0].map((cell, idx) => (
                      <th key={idx} className="py-2 px-3 text-left text-pink-300 font-semibold border-b border-slate-700">{cell}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.slice(1).map((row, rowIdx) => (
                    <tr key={rowIdx} className="border-b border-slate-800">
                      {row.map((cell, cellIdx) => (
                        <td key={cellIdx} className="py-2 px-3 text-slate-300">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        }
        continue
      }

      // Numbered lists with sub-items
      if (line.match(/^\d+\. /)) {
        const listItems = []
        const startI = i

        while (i < lines.length) {
          const currentLine = lines[i]

          // If it's a numbered item
          if (currentLine.match(/^\d+\. /)) {
            const itemContent = currentLine.replace(/^\d+\.\s*/, '')
            const subItems = []
            i++

            // Collect all sub-items (indented with spaces and dash)
            while (i < lines.length && lines[i].match(/^\s{2,}-\s/)) {
              subItems.push(lines[i].trim().substring(2))
              i++
            }

            listItems.push({ content: itemContent, subItems })
          } else if (currentLine.trim() === '') {
            // Empty line might separate list items, peek ahead
            if (i + 1 < lines.length && lines[i + 1].match(/^\d+\. /)) {
              i++
              continue
            } else {
              break
            }
          } else {
            break
          }
        }

        elements.push(
          <ol key={`ol-${startI}`} className="list-decimal ml-6 my-4 space-y-3">
            {listItems.map((item, idx) => (
              <li key={idx} className="text-slate-300 pl-2">
                <div className="inline">{renderInlineMarkdown(item.content)}</div>
                {item.subItems.length > 0 && (
                  <ul className="list-disc ml-5 mt-2 space-y-1">
                    {item.subItems.map((subItem, subIdx) => (
                      <li key={subIdx} className="text-slate-300">{renderInlineMarkdown(subItem)}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ol>
        )
        continue
      }

      // Simple bullet lists
      if (line.match(/^- /) && !line.match(/^\s{2,}-/)) {
        const listItems = []
        const startI = i
        while (i < lines.length && lines[i].match(/^- /)) {
          listItems.push(lines[i].substring(2))
          i++
        }
        elements.push(
          <ul key={`ul-${startI}`} className="list-disc ml-6 my-3 space-y-1">
            {listItems.map((item, idx) => (
              <li key={idx} className="text-slate-300">{renderInlineMarkdown(item)}</li>
            ))}
          </ul>
        )
        continue
      }

      // Regular paragraph
      elements.push(<p key={`p-${i}`} className="text-slate-300 my-2 leading-relaxed">{renderInlineMarkdown(line)}</p>)
      i++
    }

    return elements
  }

  return <div className="space-y-1">{parseMarkdown(content)}</div>
}

// Main OOP Page Component
function OOP() {
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState('practicals') // 'practicals' or 'assignments'
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showSolution, setShowSolution] = useState({})
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')
  const [editableCode, setEditableCode] = useState({})
  const [showAnswer, setShowAnswer] = useState({})
  const [assignmentSearchQuery, setAssignmentSearchQuery] = useState('')
  const [selectedAssignment, setSelectedAssignment] = useState('all')

  const toggleSolution = (taskId) => {
    setShowSolution(prev => ({ ...prev, [taskId]: !prev[taskId] }))
  }

  const toggleAnswer = (assignmentId) => {
    setShowAnswer(prev => ({ ...prev, [assignmentId]: !prev[assignmentId] }))
  }

  const handleCodeChange = (taskId, code) => {
    setEditableCode(prev => ({ ...prev, [taskId]: code }))
  }

  const resetCode = (taskId, originalCode) => {
    setEditableCode(prev => ({ ...prev, [taskId]: originalCode }))
  }




  const categories = ['all', 'Basics', 'Classes & Objects', 'Constructors', 'Inheritance', 'Interfaces', 'Polymorphism', 'Exception Handling', 'Multithreading', 'File Handling']

  const difficultyColors = {
    'Easy': 'bg-green-500/20 text-green-300 border-green-500/50',
    'Medium': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50',
    'Hard': 'bg-red-500/20 text-red-300 border-red-500/50'
  }

  const categoryColors = {
    'Basics': 'from-blue-500 to-cyan-500',
    'Classes & Objects': 'from-purple-500 to-pink-500',
    'Constructors': 'from-green-500 to-emerald-500',
    'Inheritance': 'from-pink-500 to-rose-500',
    'Interfaces': 'from-indigo-500 to-purple-500',
    'Polymorphism': 'from-yellow-500 to-orange-500',
    'Exception Handling': 'from-red-500 to-pink-500',
    'Multithreading': 'from-teal-500 to-cyan-500',
    'File Handling': 'from-orange-500 to-red-500'
  }

  const filteredTasks = practicalTasks.filter(task => {
    const matchesCategory = selectedCategory === 'all' || task.category === selectedCategory
    const matchesDifficulty = selectedDifficulty === 'all' || task.difficulty === selectedDifficulty
    const matchesSearch = searchQuery === '' ||
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.topics.some(topic => topic.toLowerCase().includes(searchQuery.toLowerCase()))

    return matchesCategory && matchesDifficulty && matchesSearch
  })

  // Get unique assignment numbers
  const assignmentNumbers = ['all', ...new Set(assignments.map(a => {
    // Determine assignment number based on id ranges
    if (a.id >= 1 && a.id <= 7) return 1
    if (a.id >= 8 && a.id <= 14) return 2
    if (a.id >= 15 && a.id <= 23) return 3
    if (a.id >= 24 && a.id <= 30) return 4
    return 1
  }))]

  const filteredAssignments = assignments.filter(assignment => {
    // Determine which assignment this belongs to
    let assignmentNum = 1
    if (assignment.id >= 1 && assignment.id <= 7) assignmentNum = 1
    else if (assignment.id >= 8 && assignment.id <= 14) assignmentNum = 2
    else if (assignment.id >= 15 && assignment.id <= 23) assignmentNum = 3
    else if (assignment.id >= 24 && assignment.id <= 30) assignmentNum = 4

    const matchesAssignment = selectedAssignment === 'all' || assignmentNum === selectedAssignment
    const matchesSearch = assignmentSearchQuery === '' ||
      assignment.title.toLowerCase().includes(assignmentSearchQuery.toLowerCase()) ||
      assignment.question.toLowerCase().includes(assignmentSearchQuery.toLowerCase()) ||
      assignment.description.toLowerCase().includes(assignmentSearchQuery.toLowerCase()) ||
      assignment.topics.some(topic => topic.toLowerCase().includes(assignmentSearchQuery.toLowerCase()))

    return matchesAssignment && matchesSearch
  })

  return (
    <div className="relative min-h-screen bg-slate-950 overflow-hidden">
      {/* 3D Background Scene */}
      <div className="fixed inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
          <OOPScene />
        </Canvas>
      </div>

      {/* Gradient Overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-pink-950/30 via-transparent to-slate-950/60 z-10 pointer-events-none" />

      {/* Scrollable Content */}
      <div className="relative z-20 min-h-screen">
        {/* Header */}
        <header className="bg-slate-900/30 backdrop-blur-xl border-b border-pink-500/20 sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/')}
                className="p-3 rounded-xl bg-pink-500/20 hover:bg-pink-500/30 transition-all border border-pink-500/50 backdrop-blur-sm hover:scale-110"
              >
                <svg className="w-6 h-6 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-pink-600">
                  🧩 Java OOP Practicals
                </h1>
                <p className="text-slate-300 mt-2 text-base md:text-lg">
                  Interactive Java Code Examples with Solutions
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
              Learn by Coding
            </h2>
            <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto">
              Complete Java solutions with syntax highlighting, copy functionality, and step-by-step explanations.
            </p>
          </div>

          {/* Section Tabs */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-slate-900/60 backdrop-blur-xl rounded-2xl p-2 border border-slate-700/50">
              <button
                onClick={() => setActiveSection('practicals')}
                className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeSection === 'practicals'
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg shadow-pink-500/50'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Practicals
              </button>
              <button
                onClick={() => setActiveSection('assignments')}
                className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeSection === 'assignments'
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg shadow-pink-500/50'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Assignments
              </button>
            </div>
          </div>

          {/* Search Bar (only for practicals) */}
          {activeSection === 'practicals' && (
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by title, description, or topic..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900/60 backdrop-blur-xl text-white px-6 py-4 pl-14 rounded-2xl border border-slate-700/50 focus:border-pink-500/50 focus:outline-none focus:ring-2 focus:ring-pink-500/20 transition-all text-base"
              />
              <svg className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
          )}

          {/* Filters Row (only for practicals) */}
          {activeSection === 'practicals' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {/* Category Filter */}
            <div className="bg-slate-900/60 backdrop-blur-xl rounded-2xl p-4 border border-slate-700/50">
              <h3 className="text-white font-semibold mb-3 text-sm">Category:</h3>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-slate-800/80 text-white px-4 py-2 rounded-lg border border-slate-700 focus:border-pink-500 focus:outline-none transition-all"
              >
                <option value="all">All Categories</option>
                {categories.filter(c => c !== 'all').map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Difficulty Filter */}
            <div className="bg-slate-900/60 backdrop-blur-xl rounded-2xl p-4 border border-slate-700/50">
              <h3 className="text-white font-semibold mb-3 text-sm">Difficulty:</h3>
              <div className="flex gap-2 flex-wrap">
                {['all', 'Easy', 'Medium', 'Hard'].map((difficulty) => (
                  <button
                    key={difficulty}
                    onClick={() => setSelectedDifficulty(difficulty)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedDifficulty === difficulty
                        ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/50'
                        : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border border-slate-700'
                    }`}
                  >
                    {difficulty === 'all' ? 'All' : difficulty}
                  </button>
                ))}
              </div>
            </div>
          </div>
          )}

          {/* Results Count (only for practicals) */}
          {activeSection === 'practicals' && searchQuery && (
            <div className="mb-6 text-center">
              <p className="text-slate-400">
                Found <span className="text-pink-400 font-bold">{filteredTasks.length}</span> {filteredTasks.length === 1 ? 'task' : 'tasks'} matching "{searchQuery}"
              </p>
            </div>
          )}

          {/* Stats (only for practicals) */}
          {activeSection === 'practicals' && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8">
            <div className="bg-slate-900/60 backdrop-blur-xl rounded-xl p-4 border border-slate-700/50 text-center">
              <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
                {filteredTasks.length}
              </div>
              <div className="text-slate-400 text-sm">Tasks</div>
            </div>
            <div className="bg-slate-900/60 backdrop-blur-xl rounded-xl p-4 border border-slate-700/50 text-center">
              <div className="text-3xl font-bold text-green-400">
                {filteredTasks.filter(t => t.difficulty === 'Easy').length}
              </div>
              <div className="text-slate-400 text-sm">Easy</div>
            </div>
            <div className="bg-slate-900/60 backdrop-blur-xl rounded-xl p-4 border border-slate-700/50 text-center">
              <div className="text-3xl font-bold text-yellow-400">
                {filteredTasks.filter(t => t.difficulty === 'Medium').length}
              </div>
              <div className="text-slate-400 text-sm">Medium</div>
            </div>
            <div className="bg-slate-900/60 backdrop-blur-xl rounded-xl p-4 border border-slate-700/50 text-center">
              <div className="text-3xl font-bold text-red-400">
                {filteredTasks.filter(t => t.difficulty === 'Hard').length}
              </div>
              <div className="text-slate-400 text-sm">Hard</div>
            </div>
          </div>
          )}

          {/* No Results Message (only for practicals) */}
          {activeSection === 'practicals' && filteredTasks.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-white mb-2">No tasks found</h3>
              <p className="text-slate-400 mb-6">Try adjusting your filters or search query</p>
              <button
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('all')
                  setSelectedDifficulty('all')
                }}
                className="px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-xl transition-all"
              >
                Clear All Filters
              </button>
            </div>
          )}

          {/* Task List with Code (only for practicals) */}
          {activeSection === 'practicals' && (
          <div className="space-y-6 md:space-y-8">
            <AnimatePresence mode="popLayout">
              {filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className="group relative"
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${categoryColors[task.category]}/20 rounded-2xl md:rounded-3xl blur-xl group-hover:blur-2xl transition-all`} />
                  <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-2xl md:rounded-3xl p-4 md:p-8 border border-slate-700/50 group-hover:border-pink-500/50 transition-all">
                    {/* Task Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-pink-400 font-bold text-lg">#{task.id}</span>
                          <span className={`px-3 py-1 rounded-lg text-xs font-semibold border ${difficultyColors[task.difficulty]}`}>
                            {task.difficulty}
                          </span>
                          <span className={`px-4 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${categoryColors[task.category]} text-white`}>
                            {task.category}
                          </span>
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-3">{task.title}</h3>
                        <p className="text-slate-300 text-sm md:text-base mb-3 md:mb-4">{task.description}</p>
                        <div className="flex flex-wrap gap-1.5 md:gap-2">
                          {task.topics.map((topic, i) => (
                            <span key={i} className="px-2 md:px-3 py-1 rounded-full text-xs bg-slate-800/80 text-slate-300 border border-slate-700">
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Key Concepts */}
                    {task.explanation && (
                      <div className="mb-6 bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                        <h4 className="text-blue-300 font-bold mb-2 text-base flex items-center gap-2">
                          <span className="text-xl">💡</span> Key Concepts
                        </h4>
                        <p className="text-slate-300 text-sm whitespace-pre-line leading-relaxed">{task.explanation}</p>
                      </div>
                    )}

                    {/* Interactive Code Playground */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-white font-bold text-base md:text-lg flex items-center gap-2">
                          <span className="text-xl md:text-2xl">🎮</span> <span className="hidden sm:inline">Interactive Code Playground</span><span className="sm:hidden">Playground</span>
                        </h4>
                        <button
                          onClick={() => resetCode(task.id, task.starterCode)}
                          className="px-3 py-1 bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 text-xs rounded-lg transition-all border border-slate-600"
                        >
                          Reset
                        </button>
                      </div>
                      <div className="relative">
                        <textarea
                          value={editableCode[task.id] !== undefined ? editableCode[task.id] : task.starterCode}
                          onChange={(e) => handleCodeChange(task.id, e.target.value)}
                          className="w-full bg-slate-950/95 text-green-400 font-mono text-xs md:text-sm p-4 rounded-xl border border-slate-700 focus:border-pink-500/50 focus:outline-none focus:ring-2 focus:ring-pink-500/20 min-h-[200px] md:min-h-[250px] resize-y transition-all"
                          spellCheck="false"
                        />
                        <div className="absolute top-2 right-2 bg-slate-800/80 px-2 py-1 rounded text-xs text-slate-400">
                          Editable
                        </div>
                      </div>
                      <p className="text-slate-400 text-xs mt-2">
                        💡 Try modifying the code above! Experiment with different values and logic.
                      </p>
                    </div>

                    {/* Solution Toggle */}
                    <div>
                      <button
                        onClick={() => toggleSolution(task.id)}
                        className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-2.5 md:py-3 rounded-xl transition-all shadow-lg shadow-pink-500/30 mb-4 text-sm md:text-base"
                      >
                        {showSolution[task.id] ? '🔒 Hide Solution' : '🔓 Show Solution'}
                      </button>

                      <AnimatePresence>
                        {showSolution[task.id] && (
                          <div>
                            <h4 className="text-white font-bold mb-3 text-base md:text-lg flex items-center gap-2">
                              <span className="text-xl md:text-2xl">✅</span> Complete Solution
                            </h4>
                            <div className="overflow-x-auto">
                              <CodeBlock code={task.solution} />
                            </div>

                            {task.output && (
                              <div className="mt-6">
                                <h4 className="text-white font-bold mb-3 text-base md:text-lg flex items-center gap-2">
                                  <span className="text-xl md:text-2xl">💻</span> Output
                                </h4>
                                <div className="bg-slate-950/95 rounded-xl p-3 md:p-4 border border-green-500/30 font-mono text-xs md:text-sm overflow-x-auto">
                                  <pre className="text-green-400 whitespace-pre-wrap break-words">{task.output}</pre>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              ))}
            </AnimatePresence>
          </div>
          )}

          {/* Assignments Section */}
          {activeSection === 'assignments' && (
            <div className="space-y-6">
              {/* Search Bar for Assignments */}
              <div className="mb-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search assignments by title, question, or topic..."
                    value={assignmentSearchQuery}
                    onChange={(e) => setAssignmentSearchQuery(e.target.value)}
                    className="w-full bg-slate-900/60 backdrop-blur-xl text-white px-6 py-4 pl-14 rounded-2xl border border-slate-700/50 focus:border-pink-500/50 focus:outline-none focus:ring-2 focus:ring-pink-500/20 transition-all text-base"
                  />
                  <svg className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  {assignmentSearchQuery && (
                    <button
                      onClick={() => setAssignmentSearchQuery('')}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>

              {/* Assignment Filter */}
              <div className="bg-slate-900/60 backdrop-blur-xl rounded-2xl p-4 border border-slate-700/50 mb-6">
                <h3 className="text-white font-semibold mb-3 text-sm">Filter by Assignment:</h3>
                <div className="flex gap-2 flex-wrap">
                  {assignmentNumbers.map((num) => (
                    <button
                      key={num}
                      onClick={() => setSelectedAssignment(num)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        selectedAssignment === num
                          ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/50'
                          : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border border-slate-700'
                      }`}
                    >
                      {num === 'all' ? 'All Assignments' : `Assignment ${num}`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Results Count */}
              {assignmentSearchQuery && (
                <div className="mb-6 text-center">
                  <p className="text-slate-400">
                    Found <span className="text-pink-400 font-bold">{filteredAssignments.length}</span> {filteredAssignments.length === 1 ? 'question' : 'questions'} matching "{assignmentSearchQuery}"
                  </p>
                </div>
              )}

              {/* Dynamic Header */}
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  {selectedAssignment === 'all' ? 'All Assignments' : `Assignment - ${selectedAssignment}`}
                </h2>
                <p className="text-slate-300">
                  {selectedAssignment === 1 && (
                    <>
                      <span className="font-semibold">Date of Assignment:</span> 18/08/2025 |
                      <span className="font-semibold ml-2">Date of Submission:</span> 25/08/2025
                    </>
                  )}
                  {selectedAssignment === 2 && (
                    <>
                      <span className="font-semibold">Date of Assignment:</span> 06/09/2025 |
                      <span className="font-semibold ml-2">Date of Submission:</span> 15/09/2025
                    </>
                  )}
                  {selectedAssignment === 3 && (
                    <>
                      <span className="font-semibold">Date of Assignment:</span> 06/10/2025 |
                      <span className="font-semibold ml-2">Date of Submission:</span> 29/10/2025
                    </>
                  )}
                  {selectedAssignment === 4 && (
                    <>
                      <span className="font-semibold">Date of Assignment:</span> 06/10/2025 |
                      <span className="font-semibold ml-2">Date of Submission:</span> 10/11/2025
                    </>
                  )}
                  {selectedAssignment === 'all' && (
                    <span className="text-slate-400">View all assignments or filter by assignment number</span>
                  )}
                </p>
              </div>

              <div className="grid gap-6">
                {filteredAssignments.map((assignment) => (
                  <div
                    key={assignment.id}
                    className="group relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
                    <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-slate-700/50 group-hover:border-pink-500/50 transition-all">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-pink-500/50">
                            {assignment.id}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                            {assignment.title}
                          </h3>
                          <div className="mb-4">
                            <p className="text-pink-300 font-semibold mb-2">Question:</p>
                            <p className="text-slate-300 text-base md:text-lg">
                              {assignment.question}
                            </p>
                          </div>

                          {assignment.subtopics && (
                            <div className="mb-4">
                              <p className="text-pink-300 font-semibold mb-2">Include the following:</p>
                              <ul className="list-disc list-inside space-y-1">
                                {assignment.subtopics.map((subtopic, idx) => (
                                  <li key={idx} className="text-slate-300 text-sm md:text-base">
                                    {subtopic}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          <div className="mb-4">
                            <p className="text-slate-400 text-sm">
                              {assignment.description}
                            </p>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {assignment.topics.map((topic, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 rounded-full text-xs bg-slate-800/80 text-slate-300 border border-slate-700"
                              >
                                {topic}
                              </span>
                            ))}
                          </div>

                          <div className="mt-4 pt-4 border-t border-slate-700">
                            <div className="flex items-center gap-2 text-sm">
                              <svg className="w-5 h-5 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              <span className="text-slate-300">
                                Due: <span className="text-pink-400 font-semibold">{assignment.dueDate}</span>
                              </span>
                            </div>
                          </div>

                          {/* View Answer Button and Answer Display */}
                          {assignment.answer && (
                            <div className="mt-6">
                              <button
                                onClick={() => toggleAnswer(assignment.id)}
                                className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-pink-500/30 text-sm md:text-base"
                              >
                                {showAnswer[assignment.id] ? '📖 Hide Answer' : '📝 View Detailed Answer'}
                              </button>

                              <AnimatePresence>
                                {showAnswer[assignment.id] && (
                                  <div className="mt-6 bg-slate-950/50 rounded-xl p-6 border border-pink-500/30">
                                    <div className="flex items-center gap-2 mb-4">
                                      <span className="text-2xl">✅</span>
                                      <h4 className="text-white font-bold text-lg">Detailed Answer</h4>
                                    </div>
                                    <div className="max-w-none">
                                      <MarkdownAnswer content={assignment.answer} />
                                    </div>
                                  </div>
                                )}
                              </AnimatePresence>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default OOP
