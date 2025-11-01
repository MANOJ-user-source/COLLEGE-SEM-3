import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float, MeshDistortMaterial, Sphere, Torus, Environment, Stars } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'

// Animated Git Sphere
function GitSphere({ position, color, scale = 1 }) {
  const meshRef = useRef()

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.008
      meshRef.current.rotation.x += 0.003
    }
  })

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} position={position} args={[scale, 32, 32]}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.5}
          speed={4}
          roughness={0.2}
          metalness={0.9}
          emissive={color}
          emissiveIntensity={0.4}
        />
      </Sphere>
    </Float>
  )
}

// Animated Rings (representing branches)
function BranchRing({ position, color, rotation = [0, 0, 0] }) {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01
      meshRef.current.rotation.z += 0.005
    }
  })

  return (
    <Float speed={3} rotationIntensity={2} floatIntensity={1}>
      <Torus ref={meshRef} position={position} rotation={rotation} args={[1.5, 0.3, 16, 100]}>
        <meshStandardMaterial
          color={color}
          metalness={0.9}
          roughness={0.1}
          emissive={color}
          emissiveIntensity={0.6}
        />
      </Torus>
    </Float>
  )
}

// 3D Scene Component
function VCScene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#f97316" />
      <pointLight position={[-10, -10, -10]} intensity={0.8} color="#8b5cf6" />
      <spotLight position={[0, 15, 0]} angle={0.3} penumbra={1} intensity={2} color="#f97316" />
      <Stars radius={100} depth={50} count={4000} factor={4} saturation={0} fade speed={1} />
      <Environment preset="night" />

      {/* Central Git sphere */}
      <GitSphere position={[0, 0, 0]} color="#f97316" scale={1.8} />

      {/* Orbiting spheres (commits) */}
      <GitSphere position={[-4, 2, 0]} color="#8b5cf6" scale={0.8} />
      <GitSphere position={[4, -2, 0]} color="#ec4899" scale={0.8} />
      <GitSphere position={[0, 3, -2]} color="#06b6d4" scale={0.9} />
      <GitSphere position={[-3, -2, 2]} color="#10b981" scale={0.7} />

      {/* Branch rings */}
      <BranchRing position={[0, 0, 0]} color="#f97316" />
      <BranchRing position={[0, 0, 0]} color="#8b5cf6" rotation={[Math.PI / 3, 0, 0]} />
      <BranchRing position={[0, 0, 0]} color="#ec4899" rotation={[0, Math.PI / 4, Math.PI / 4]} />

      <OrbitControls
        enableZoom={true}
        enablePan={true}
        minDistance={10}
        maxDistance={25}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </>
  )
}

// Session Card Component
function SessionCard({ session, index }) {
  const [isExpanded, setIsExpanded] = useState(false)

  const getDifficultyColor = (session) => {
    if (session <= 3) return 'from-green-500 to-emerald-500'
    if (session <= 8) return 'from-yellow-500 to-orange-500'
    return 'from-orange-500 to-red-500'
  }

  const getDifficultyLabel = (session) => {
    if (session <= 3) return 'Beginner'
    if (session <= 8) return 'Intermediate'
    return 'Advanced'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
    >
      <div className={`absolute inset-0 bg-gradient-to-r ${getDifficultyColor(session.id)}/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all`} />
      <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 group-hover:border-orange-500/50 transition-all">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-orange-400 font-bold text-lg">Session {session.id}</span>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${getDifficultyColor(session.id)} text-white`}>
                {getDifficultyLabel(session.id)}
              </span>
              <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-slate-800/80 text-slate-300 border border-slate-700">
                {session.duration}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">{session.title}</h3>
            <p className="text-slate-300 text-base mb-4">{session.description}</p>
          </div>
        </div>

        {/* Concepts */}
        {session.concepts && session.concepts.length > 0 && (
          <div className="mb-4">
            <h4 className="text-orange-300 font-bold mb-2 text-sm flex items-center gap-2">
              <span>💡</span> Key Concepts
            </h4>
            <div className="flex flex-wrap gap-2">
              {session.concepts.map((concept, i) => (
                <span key={i} className="px-3 py-1 rounded-full text-xs bg-orange-500/20 text-orange-300 border border-orange-500/30">
                  {concept}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Commands */}
        {session.commands && session.commands.length > 0 && (
          <div className="mb-4">
            <h4 className="text-purple-300 font-bold mb-2 text-sm flex items-center gap-2">
              <span>⌨️</span> Commands
            </h4>
            <div className="bg-slate-950/80 rounded-xl p-3 border border-purple-500/30">
              <div className="flex flex-wrap gap-2">
                {session.commands.map((cmd, i) => (
                  <code key={i} className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded font-mono text-xs">
                    {cmd}
                  </code>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Expand/Collapse for Hands-on */}
        {session.handsOn && session.handsOn.length > 0 && (
          <div>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full bg-gradient-to-r from-orange-500 to-purple-500 hover:from-orange-600 hover:to-purple-600 text-white font-bold py-2.5 rounded-xl transition-all shadow-lg shadow-orange-500/30 mb-3 text-sm flex items-center justify-center gap-2"
            >
              <span>{isExpanded ? '🔼' : '🔽'}</span>
              {isExpanded ? 'Hide' : 'Show'} Hands-on Practice
            </button>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                    <h4 className="text-blue-300 font-bold mb-3 text-sm flex items-center gap-2">
                      <span>🎯</span> Practice Tasks
                    </h4>
                    <ul className="space-y-2">
                      {session.handsOn.map((task, i) => (
                        <li key={i} className="text-slate-300 text-sm flex items-start gap-2">
                          <span className="text-blue-400 mt-0.5">▸</span>
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </motion.div>
  )
}

// Main VC Page Component
function VC() {
  const navigate = useNavigate()
  const [selectedLevel, setSelectedLevel] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Course Sessions Data (Sessions 1-15)
  const sessions = [
    {
      id: 1,
      title: 'Introduction to Version Control',
      description: 'Learn the fundamentals of version control systems, understand centralized vs distributed VCS, and set up Git.',
      duration: '4 hours',
      concepts: ['Version Control Systems', 'Centralized vs Distributed VCS', 'Git Setup', 'Configuration'],
      commands: ['git init', 'git status', 'git config'],
      handsOn: [
        'Install Git on your system',
        'Configure Git with username and email',
        'Create a project folder and initialize Git',
        'Track a simple text file and check status'
      ]
    },
    {
      id: 2,
      title: 'Git Basics - Adding and Committing',
      description: 'Understand the three stages in Git: working directory, staging area, and local repository. Learn to make commits.',
      duration: '4 hours',
      concepts: ['Working Directory', 'Staging Area', 'Local Repository', 'Commit History'],
      commands: ['git add', 'git commit', 'git log', 'git show'],
      handsOn: [
        'Create a sample project with multiple files',
        'Track file changes using git add',
        'Make multiple commits with meaningful messages',
        'View commit history with git log and git show',
        'Create a project logbook to track your progress'
      ]
    },
    {
      id: 3,
      title: 'Working with GitHub',
      description: 'Learn about remote repositories, connect local repo to GitHub, and push your first project to the cloud.',
      duration: '4 hours',
      concepts: ['Remote Repositories', 'SSH vs HTTPS', 'Push/Pull', 'GitHub Account'],
      commands: ['git remote', 'git push', 'git clone'],
      handsOn: [
        'Create a GitHub account',
        'Generate SSH keys or use HTTPS authentication',
        'Create a repository on GitHub',
        'Connect local repo to remote using git remote',
        'Push your project to GitHub'
      ]
    },
    {
      id: 4,
      title: 'Cloning and Collaboration',
      description: 'Learn to clone repositories, pull changes from remote, and sync team projects effectively.',
      duration: '4 hours',
      concepts: ['Cloning', 'Pulling Changes', 'Fetch vs Pull', 'Collaboration'],
      commands: ['git clone', 'git pull', 'git fetch'],
      handsOn: [
        'Clone a public GitHub repository',
        'Make local changes to the cloned project',
        'Push updates back to remote',
        'Practice syncing changes in a team project scenario'
      ]
    },
    {
      id: 5,
      title: 'Branching in Git',
      description: 'Master Git branching to work on features independently. Learn to create, switch, and merge branches.',
      duration: '4 hours',
      concepts: ['Feature Branching', 'Branch Management', 'Fast-forward Merge', 'Branch Workflow'],
      commands: ['git branch', 'git checkout', 'git switch', 'git merge'],
      handsOn: [
        'Create a new branch for a feature',
        'Switch between branches using checkout/switch',
        'Make commits on different branches',
        'Merge feature branch into main branch',
        'Handle fast-forward merges'
      ]
    },
    {
      id: 6,
      title: 'Conflict Resolution',
      description: 'Learn to identify and resolve merge conflicts using command line and GUI tools.',
      duration: '4 hours',
      concepts: ['Merge Conflicts', 'Conflict Markers', 'Resolution Strategies', 'Diff Tools'],
      commands: ['git diff', 'git mergetool', 'git merge --abort'],
      handsOn: [
        'Create deliberate conflict scenarios',
        'Identify conflict markers in files',
        'Resolve conflicts using text editor',
        'Use git mergetool for visual conflict resolution',
        'Complete conflict resolution exercise'
      ]
    },
    {
      id: 7,
      title: 'GitHub Collaboration – Pull Requests',
      description: 'Master the pull request workflow for code review and collaboration on GitHub.',
      duration: '4 hours',
      concepts: ['Forking', 'Pull Requests', 'Code Review', 'PR Workflow'],
      commands: ['fork (GitHub UI)', 'PR creation', 'PR review'],
      handsOn: [
        'Fork a repository on GitHub',
        'Create a branch and make changes',
        'Push changes to your fork',
        'Create a Pull Request',
        'Review and merge PR',
        'Complete mini collaborative project via GitHub PR'
      ]
    },
    {
      id: 8,
      title: 'Undoing Changes',
      description: 'Learn various methods to undo changes: reset, revert, checkout, and restore.',
      duration: '4 hours',
      concepts: ['Reset', 'Revert', 'Checkout', 'Restore', 'Recovery'],
      commands: ['git reset', 'git revert', 'git checkout', 'git restore'],
      handsOn: [
        'Undo local unstaged changes',
        'Discard staged files',
        'Revert a specific commit',
        'Use reset to move HEAD pointer',
        'Practice recovery scenarios'
      ]
    },
    {
      id: 9,
      title: 'Git Tags and Releases',
      description: 'Learn to tag commits for versioning and create releases on GitHub.',
      duration: '4 hours',
      concepts: ['Tagging', 'Annotated Tags', 'Lightweight Tags', 'Releases', 'Versioning'],
      commands: ['git tag', 'git tag -a', 'git push --tags'],
      handsOn: [
        'Create lightweight tags',
        'Create annotated tags with messages',
        'List and delete tags',
        'Push tags to remote repository',
        'Create GitHub releases with release notes'
      ]
    },
    {
      id: 10,
      title: 'Git Log and History Navigation',
      description: 'Master viewing and interpreting commit history for debugging and tracking changes.',
      duration: '4 hours',
      concepts: ['Commit History', 'Blame', 'Bisect', 'History Navigation', 'Debugging'],
      commands: ['git log', 'gitk', 'git blame', 'git bisect'],
      handsOn: [
        'Browse project history with various log options',
        'Use git log --graph for visual history',
        'Track changes with git blame',
        'Find bugs using git bisect',
        'Complete debugging exercise using commit history'
      ]
    },
    {
      id: 11,
      title: '.gitignore and Git Attributes',
      description: 'Learn to ignore files and customize Git behavior for different file types.',
      duration: '4 hours',
      concepts: ['Gitignore Patterns', 'Global Gitignore', 'Git Attributes', 'File Exclusion'],
      commands: ['.gitignore', '.gitattributes', 'git rm --cached'],
      handsOn: [
        'Create .gitignore for Python project',
        'Create .gitignore for Node.js project',
        'Set up global gitignore',
        'Explore .gitattributes for merge strategies',
        'Handle files that should not be tracked'
      ]
    },
    {
      id: 12,
      title: 'Working with GUI Tools',
      description: 'Learn to use graphical interfaces for Git operations to visualize workflows.',
      duration: '4 hours',
      concepts: ['GitHub Desktop', 'GitKraken', 'VS Code Git', 'GUI Workflow'],
      commands: ['GUI operations', 'Visual commits', 'Branch visualization'],
      handsOn: [
        'Install and set up GitHub Desktop',
        'Visualize repository structure with GitKraken',
        'Perform commits and merges using GUI',
        'Create pull requests from GUI',
        'Repeat earlier exercises using visual tools'
      ]
    },
    {
      id: 13,
      title: 'Project Work – Team Collaboration (Part 1)',
      description: 'Start a team project: set up repository, define workflow, and begin collaborative development.',
      duration: '4 hours',
      concepts: ['Team Workflow', 'Project Setup', 'Issue Tracking', 'Collaboration'],
      commands: ['All previous commands', 'GitHub Issues', 'Project boards'],
      handsOn: [
        'Form teams of 2-4 students',
        'Create team repository on GitHub',
        'Set up branch protection rules',
        'Create project board and issues',
        'Begin development with feature branches'
      ]
    },
    {
      id: 14,
      title: 'Project Work – Team Collaboration (Part 2)',
      description: 'Continue team project: implement features, handle conflicts, and practice code review.',
      duration: '4 hours',
      concepts: ['Code Review', 'Conflict Resolution', 'Feature Development', 'Documentation'],
      commands: ['PR workflow', 'Code review', 'Merge strategies'],
      handsOn: [
        'Implement assigned features in branches',
        'Create pull requests for review',
        'Review team members\' code',
        'Resolve merge conflicts',
        'Update project documentation'
      ]
    },
    {
      id: 15,
      title: 'Assessment and Best Practices',
      description: 'Review key concepts, learn industry best practices, and complete final assessment.',
      duration: '4 hours',
      concepts: ['Best Practices', 'Commit Conventions', 'Branch Naming', 'Rebase', 'Code Review'],
      commands: ['git rebase', 'git commit --amend', 'git reflog'],
      handsOn: [
        'Review Git fundamentals and common pitfalls',
        'Learn conventional commit message formats',
        'Practice branch naming strategies',
        'Clean commit history with rebase',
        'Complete practical test',
        'Present team project with Git workflow documentation'
      ]
    }
  ]

  // Course Overview Data
  const courseInfo = {
    code: 'BC03001061',
    name: 'Version Controlling',
    semester: 'Semester 3',
    credits: 2,
    category: 'Ability Enhancement Courses',
    totalHours: 60
  }

  const objectives = [
    'Introduce the fundamentals of version control and Git architecture',
    'Provide hands-on experience with local and remote Git workflows',
    'Develop collaborative coding skills using GitHub features',
    'Promote best practices in software project documentation',
    'Empower students to manage individual and team projects with professional standards'
  ]

  const outcomes = [
    'Discuss the importance of version control in software development',
    'Use appropriate Git commands for version control',
    'Manage repositories using GitHub effectively',
    'Collaborate on projects using Git workflows (branching, pull requests)',
    'Apply Git in real-world projects with industry best practices'
  ]

  const filteredSessions = sessions.filter(session => {
    const matchesLevel = selectedLevel === 'all' ||
      (selectedLevel === 'beginner' && session.id <= 3) ||
      (selectedLevel === 'intermediate' && session.id > 3 && session.id <= 8) ||
      (selectedLevel === 'advanced' && session.id > 8)

    const matchesSearch = searchQuery === '' ||
      session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.concepts?.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()))

    return matchesLevel && matchesSearch
  })

  return (
    <div className="relative min-h-screen bg-slate-950 overflow-hidden">
      {/* 3D Background Scene */}
      <div className="fixed inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 18], fov: 60 }}>
          <VCScene />
        </Canvas>
      </div>

      {/* Gradient Overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-orange-950/30 via-transparent to-slate-950/60 z-10 pointer-events-none" />

      {/* Scrollable Content */}
      <div className="relative z-20 min-h-screen">
        {/* Header */}
        <header className="bg-slate-900/30 backdrop-blur-xl border-b border-orange-500/20 sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/')}
                className="p-3 rounded-xl bg-orange-500/20 hover:bg-orange-500/30 transition-all border border-orange-500/50 backdrop-blur-sm hover:scale-110"
              >
                <svg className="w-6 h-6 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-purple-400 to-orange-600">
                  Version Controlling
                </h1>
                <p className="text-slate-300 mt-2 text-base md:text-lg">
                  Master Git & GitHub for Professional Development
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Learn Git & GitHub from Basics to Advanced
            </h2>
            <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-6">
              A comprehensive 14-session hands-on course to master version control, collaboration, and professional development workflows.
            </p>
          </motion.div>

          {/* Course Info Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="bg-slate-900/60 backdrop-blur-xl rounded-xl p-4 border border-slate-700/50 text-center">
              <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-purple-400">
                15
              </div>
              <div className="text-slate-400 text-sm">Sessions</div>
            </div>
            <div className="bg-slate-900/60 backdrop-blur-xl rounded-xl p-4 border border-slate-700/50 text-center">
              <div className="text-3xl font-bold text-orange-400">
                {courseInfo.totalHours}
              </div>
              <div className="text-slate-400 text-sm">Hours</div>
            </div>
            <div className="bg-slate-900/60 backdrop-blur-xl rounded-xl p-4 border border-slate-700/50 text-center">
              <div className="text-3xl font-bold text-purple-400">
                {courseInfo.credits}
              </div>
              <div className="text-slate-400 text-sm">Credits</div>
            </div>
            <div className="bg-slate-900/60 backdrop-blur-xl rounded-xl p-4 border border-slate-700/50 text-center">
              <div className="text-3xl font-bold text-pink-400">
                100%
              </div>
              <div className="text-slate-400 text-sm">Practical</div>
            </div>
          </div>

          {/* Course Objectives & Outcomes */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50"
            >
              <h3 className="text-2xl font-bold text-orange-400 mb-4 flex items-center gap-2">
                <span>🎯</span> Course Objectives
              </h3>
              <ul className="space-y-3">
                {objectives.map((obj, i) => (
                  <li key={i} className="text-slate-300 text-sm flex items-start gap-2">
                    <span className="text-orange-400 mt-1">▸</span>
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50"
            >
              <h3 className="text-2xl font-bold text-purple-400 mb-4 flex items-center gap-2">
                <span>✅</span> Learning Outcomes
              </h3>
              <ul className="space-y-3">
                {outcomes.map((outcome, i) => (
                  <li key={i} className="text-slate-300 text-sm flex items-start gap-2">
                    <span className="text-purple-400 mt-1">▸</span>
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Search and Filters */}
          <div className="mb-8">
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="Search sessions by title, description, or concepts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900/60 backdrop-blur-xl text-white px-6 py-4 pl-14 rounded-2xl border border-slate-700/50 focus:border-orange-500/50 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all text-base"
              />
              <svg className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <div className="bg-slate-900/60 backdrop-blur-xl rounded-2xl p-4 border border-slate-700/50">
              <h3 className="text-white font-semibold mb-3 text-sm">Difficulty Level:</h3>
              <div className="flex gap-2 flex-wrap">
                {['all', 'beginner', 'intermediate', 'advanced'].map((level) => (
                  <button
                    key={level}
                    onClick={() => setSelectedLevel(level)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
                      selectedLevel === level
                        ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/50'
                        : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border border-slate-700'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Sessions List */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <span>📚</span> Course Sessions
            </h2>
            {filteredSessions.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-white mb-2">No sessions found</h3>
                <p className="text-slate-400">Try adjusting your filters or search query</p>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredSessions.map((session, index) => (
                  <SessionCard key={session.id} session={session} index={index} />
                ))}
              </div>
            )}
          </div>

          {/* Resources Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-slate-700/50 mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <span>📖</span> Learning Resources
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-bold text-orange-400 mb-4">Official Documentation</h3>
                <ul className="space-y-3">
                  <li>
                    <a href="https://git-scm.com/book/en/v2" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2">
                      <span>🔗</span> Pro Git Book (Free Online)
                    </a>
                  </li>
                  <li>
                    <a href="https://git-scm.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2">
                      <span>🔗</span> Git Official Website
                    </a>
                  </li>
                  <li>
                    <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2">
                      <span>🔗</span> GitHub Platform
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-purple-400 mb-4">Tools & Resources</h3>
                <ul className="space-y-3">
                  <li>
                    <a href="https://desktop.github.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2">
                      <span>🔗</span> GitHub Desktop
                    </a>
                  </li>
                  <li>
                    <a href="https://spoken-tutorial.org/tutorial-search/?search_foss=Git&search_language=English" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2">
                      <span>🔗</span> Spoken Tutorial - Git
                    </a>
                  </li>
                  <li>
                    <a href="https://learngitbranching.js.org/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2">
                      <span>🔗</span> Interactive Git Tutorial
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Why Learn Version Control */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-gradient-to-br from-orange-500/20 to-purple-500/20 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-orange-500/30"
          >
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <span>⭐</span> Why Learn Version Control?
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-slate-900/60 rounded-xl p-4">
                <h4 className="text-orange-400 font-bold mb-2">Essential Skill</h4>
                <p className="text-slate-300 text-sm">Core skill demanded by employers across software engineering, web development, and data science industries.</p>
              </div>
              <div className="bg-slate-900/60 rounded-xl p-4">
                <h4 className="text-purple-400 font-bold mb-2">Team Collaboration</h4>
                <p className="text-slate-300 text-sm">Work seamlessly with teams, manage code reviews, and contribute to open-source projects worldwide.</p>
              </div>
              <div className="bg-slate-900/60 rounded-xl p-4">
                <h4 className="text-pink-400 font-bold mb-2">Career Growth</h4>
                <p className="text-slate-300 text-sm">Foundation for advanced practices like CI/CD, DevOps, and Agile workflows in professional environments.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default VC
