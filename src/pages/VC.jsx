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

        {/* Detailed Explanation */}
        {session.explanation && (
          <div className="mb-4 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl p-4">
            <h4 className="text-cyan-300 font-bold mb-3 text-sm flex items-center gap-2">
              <span>📘</span> Detailed Explanation
            </h4>
            <div className="text-slate-300 text-sm space-y-2">
              {session.explanation.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
        )}

        {/* Visual Diagram */}
        {session.diagram && (
          <div className="mb-4 bg-slate-950/60 border border-emerald-500/30 rounded-xl p-4">
            <h4 className="text-emerald-300 font-bold mb-3 text-sm flex items-center gap-2">
              <span>📊</span> Visual Diagram
            </h4>
            <pre className="text-emerald-300 text-xs font-mono overflow-x-auto whitespace-pre">
              {session.diagram}
            </pre>
          </div>
        )}

        {/* Real-world Use Case */}
        {session.useCase && (
          <div className="mb-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-4">
            <h4 className="text-purple-300 font-bold mb-3 text-sm flex items-center gap-2">
              <span>🌍</span> Real-World Use Case
            </h4>
            <p className="text-slate-300 text-sm">{session.useCase}</p>
          </div>
        )}

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

        {/* Common Mistakes */}
        {session.commonMistakes && session.commonMistakes.length > 0 && (
          <div className="mb-4 bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-xl p-4">
            <h4 className="text-red-300 font-bold mb-3 text-sm flex items-center gap-2">
              <span>⚠️</span> Common Mistakes to Avoid
            </h4>
            <ul className="space-y-2">
              {session.commonMistakes.map((mistake, i) => (
                <li key={i} className="text-slate-300 text-sm flex items-start gap-2">
                  <span className="text-red-400 mt-0.5">✗</span>
                  <span>{mistake}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Best Practices */}
        {session.bestPractices && session.bestPractices.length > 0 && (
          <div className="mb-4 bg-gradient-to-br from-green-500/10 to-teal-500/10 border border-green-500/30 rounded-xl p-4">
            <h4 className="text-green-300 font-bold mb-3 text-sm flex items-center gap-2">
              <span>✨</span> Best Practices
            </h4>
            <ul className="space-y-2">
              {session.bestPractices.map((practice, i) => (
                <li key={i} className="text-slate-300 text-sm flex items-start gap-2">
                  <span className="text-green-400 mt-0.5">✓</span>
                  <span>{practice}</span>
                </li>
              ))}
            </ul>
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
      explanation: [
        'Version Control Systems (VCS) are tools that help track changes to files over time. They allow you to revert to previous versions, compare changes, and collaborate with others without overwriting each other\'s work.',
        'Centralized VCS (like SVN) store all version history on a central server. Distributed VCS (like Git) allow every developer to have a complete copy of the repository, enabling offline work and better collaboration.',
        'Git is a distributed version control system created by Linus Torvalds. It\'s fast, efficient, and has become the industry standard for modern software development.'
      ],
      diagram: `
   Centralized VCS              Distributed VCS (Git)

   ┌──────────┐                 ┌──────────┐
   │ Developer│                 │Developer │
   │    A     │◄────┐           │    A     │
   └──────────┘     │           └──────────┘
                    │           ▲    │    ▲
   ┌──────────┐     │           │    ▼    │
   │ Developer│     │     ┌─────┴────────┴─────┐
   │    B     │◄────┼────►│  Central Server    │
   └──────────┘     │     │   (GitHub/GitLab)  │
                    │     └─────┬────────┬─────┘
   ┌──────────┐     │           │    ▲    │
   │ Developer│     │           │    │    ▼
   │    C     │◄────┘           ▼    │    ▼
   └──────────┘                 ┌──────────┐
                                │Developer │
        ▲                       │    B     │
        │                       └──────────┘
   Single Point
   of Failure                   Full Repository
                                on Each Machine`,
      useCase: 'Imagine working on a group project where multiple students edit the same document. Without version control, you might accidentally overwrite each other\'s changes or lose previous versions. Git allows everyone to work simultaneously and merge changes systematically.',
      concepts: ['Version Control Systems', 'Centralized vs Distributed VCS', 'Git Setup', 'Configuration'],
      commands: ['git init', 'git status', 'git config'],
      commonMistakes: [
        'Forgetting to configure username and email before first commit',
        'Initializing Git in the wrong directory (like home folder)',
        'Not understanding the difference between local and remote repositories'
      ],
      bestPractices: [
        'Always configure Git with your real name and email',
        'Use git config --global for settings you want across all projects',
        'Verify your configuration with git config --list',
        'Initialize Git at the root of your project directory'
      ],
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
      explanation: [
        'Git uses a three-stage architecture: the Working Directory (where you edit files), the Staging Area (where you prepare changes for commit), and the Local Repository (where committed changes are permanently stored).',
        'The staging area acts as a buffer zone, allowing you to carefully curate what changes go into each commit. This is unique to Git and provides fine-grained control over your version history.',
        'A commit is a snapshot of your project at a specific point in time. Each commit has a unique SHA-1 hash, author information, timestamp, and a commit message describing the changes.'
      ],
      diagram: `
   Git's Three-Stage Architecture

   ┌─────────────────┐
   │    Working      │  ← You edit files here
   │   Directory     │
   └────────┬────────┘
            │ git add
            ▼
   ┌─────────────────┐
   │   Staging Area  │  ← Files ready to commit
   │    (Index)      │
   └────────┬────────┘
            │ git commit
            ▼
   ┌─────────────────┐
   │     Local       │  ← Permanent history
   │   Repository    │
   └─────────────────┘

   Commit Structure:
   ┌────────────────────────────┐
   │ Commit: a1b2c3d            │
   │ Author: John Doe           │
   │ Date: 2024-01-15           │
   │ Message: "Add login page"  │
   │                            │
   │ Changes:                   │
   │  + login.html (new)        │
   │  ~ styles.css (modified)   │
   └────────────────────────────┘`,
      useCase: 'When building a web application, you might add a new feature that involves changes to multiple files. Using the staging area, you can commit related changes together (like HTML + CSS for a new component) while keeping unrelated changes (like a bug fix) in a separate commit. This creates a clean, logical history.',
      concepts: ['Working Directory', 'Staging Area', 'Local Repository', 'Commit History'],
      commands: ['git add', 'git commit', 'git log', 'git show'],
      commonMistakes: [
        'Committing without staging files first (git add)',
        'Writing vague commit messages like "updated files" or "changes"',
        'Committing too many unrelated changes in a single commit',
        'Forgetting to check git status before committing'
      ],
      bestPractices: [
        'Write clear, descriptive commit messages in present tense',
        'Make small, focused commits that address one logical change',
        'Review staged changes with "git diff --staged" before committing',
        'Use "git log --oneline" for a quick overview of commit history',
        'Follow commit message format: Brief summary (50 chars), blank line, detailed description if needed'
      ],
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
      explanation: [
        'GitHub is a cloud-based hosting service for Git repositories. It provides a centralized place to store code, collaborate with others, and showcase your projects. Remote repositories are versions of your project hosted on the internet or network.',
        'HTTPS authentication uses username and personal access token, while SSH uses cryptographic keys. SSH is more secure and convenient once set up, as you don\'t need to enter credentials repeatedly.',
        'Pushing sends your local commits to the remote repository, making them available to collaborators. This synchronizes your local work with the team\'s shared codebase.'
      ],
      diagram: `
   Local to Remote Workflow

   ┌───────────────────┐
   │  Your Computer    │
   │                   │
   │  ┌─────────────┐  │
   │  │   Local     │  │
   │  │  Repository │  │
   │  └──────┬──────┘  │
   │         │         │
   └─────────┼─────────┘
             │ git push origin main
             │
             ▼
   ┌───────────────────────┐
   │      GitHub.com       │
   │  ┌─────────────────┐  │
   │  │     Remote      │  │
   │  │   Repository    │  │
   │  └─────────────────┘  │
   │                       │
   │  Features:            │
   │  ✓ Backup             │
   │  ✓ Collaboration      │
   │  ✓ Portfolio          │
   └───────────────────────┘

   Authentication Methods:

   HTTPS: https://github.com/user/repo.git
   ├─ Uses: Username + Token
   └─ Good for: Quick setup

   SSH: git@github.com:user/repo.git
   ├─ Uses: SSH Key Pair
   └─ Good for: Long-term use`,
      useCase: 'A software development team working across different locations uses GitHub as the central repository. Each developer works on their local machine, commits changes locally, and pushes to GitHub. This allows the team to share code, review each other\'s work, and maintain a backup of the entire project history.',
      concepts: ['Remote Repositories', 'SSH vs HTTPS', 'Push/Pull', 'GitHub Account'],
      commands: ['git remote', 'git push', 'git clone'],
      commonMistakes: [
        'Pushing before committing local changes',
        'Using the wrong remote URL (HTTPS vs SSH)',
        'Not setting up authentication properly (SSH keys or tokens)',
        'Trying to push to a repository you don\'t have permission to modify'
      ],
      bestPractices: [
        'Set up SSH keys for seamless authentication',
        'Use "git remote -v" to verify remote connections',
        'Always pull before pushing to avoid conflicts',
        'Add a README.md to describe your project',
        'Keep sensitive data (passwords, API keys) out of your repository'
      ],
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
      explanation: [
        'Git clone creates a complete copy of a remote repository on your local machine, including all files, branches, and commit history. This is typically the first step when joining an existing project or contributing to open-source software.',
        'git fetch downloads changes from the remote repository but doesn\'t merge them into your local branch. git pull does both - it fetches AND merges changes in one command. Understanding the difference helps you control when changes are integrated.',
        'Effective collaboration requires regularly syncing with the remote repository. Pull before you start working, commit your changes, pull again to get any new updates, resolve conflicts if needed, then push your changes.'
      ],
      diagram: `
   Clone Workflow

   Remote Repository (GitHub)
   ┌────────────────────────┐
   │  github.com/org/repo   │
   │  • All commits         │
   │  • All branches        │
   │  • Full history        │
   └───────────┬────────────┘
               │ git clone https://github.com/org/repo.git
               ▼
   Local Repository (Your Computer)
   ┌────────────────────────┐
   │  Exact copy created    │
   │  • All commits         │
   │  • All branches        │
   │  • Full history        │
   └────────────────────────┘


   Fetch vs Pull

   git fetch:
   Remote     A───B───C───D
                       ↓
   Local      A───B───C   origin/main (updated)
                       ↓
              main (unchanged, manual merge needed)

   git pull (fetch + merge):
   Remote     A───B───C───D
                           ↓
   Local      A───B───C───D  (automatically merged)
                           ↓
                         main


   Collaboration Workflow:

   Developer A                Developer B
   ┌──────────┐              ┌──────────┐
   │ git pull │              │ git pull │
   └─────┬────┘              └─────┬────┘
         │                         │
   ┌─────▼─────┐            ┌──────▼────┐
   │ Make      │            │ Make      │
   │ changes   │            │ changes   │
   └─────┬─────┘            └──────┬────┘
         │                         │
   ┌─────▼─────┐            ┌──────▼────┐
   │ git       │            │ git       │
   │ commit    │            │ commit    │
   └─────┬─────┘            └──────┬────┘
         │                         │
   ┌─────▼─────┐            ┌──────▼────┐
   │ git pull  │            │ git pull  │
   │ (sync)    │            │ (sync)    │
   └─────┬─────┘            └──────┬────┘
         │                         │
   ┌─────▼─────┐            ┌──────▼────┐
   │ git push  │            │ git push  │
   └─────┬─────┘            └──────┬────┘
         └──────────┬───────────────┘
                    ▼
         ┌────────────────────┐
         │ Remote Repository  │
         │    (Updated)       │
         └────────────────────┘`,
      useCase: 'A student joins a group project already in progress. They clone the repository to get all existing code. As they work on their assigned feature, teammates are also making changes. They regularly pull to get the latest updates, avoiding large conflicts later. Before pushing their completed feature, they pull one final time to ensure their code integrates smoothly with recent changes.',
      concepts: ['Cloning', 'Pulling Changes', 'Fetch vs Pull', 'Collaboration'],
      commands: ['git clone', 'git pull', 'git fetch'],
      commonMistakes: [
        'Forgetting to pull before starting work, leading to merge conflicts later',
        'Using git pull when you want to review changes first (use git fetch)',
        'Cloning with HTTPS and not setting up credentials properly',
        'Not understanding that clone only needs to be done once per machine',
        'Pushing without pulling first when remote has new changes'
      ],
      bestPractices: [
        'Always git pull before starting work on a shared branch',
        'Use git fetch + git merge for more control over what gets merged',
        'Pull again right before pushing to minimize conflicts',
        'Communicate with team about major changes before pushing',
        'Set up SSH keys for easier authentication when cloning',
        'Use git pull --rebase for a cleaner history (advanced)',
        'Check git status and git log after pulling to see what changed'
      ],
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
      explanation: [
        'Branches in Git allow you to diverge from the main line of development and work independently without affecting the main codebase. Each branch is a pointer to a specific commit, making branch creation extremely lightweight and fast.',
        'Feature branching is a workflow where each new feature is developed in a dedicated branch. This isolates work-in-progress code from the stable main branch and enables parallel development.',
        'A fast-forward merge occurs when there are no diverging changes between branches. Git simply moves the pointer forward. A three-way merge creates a new merge commit when branches have diverged.'
      ],
      diagram: `
   Branch Workflow

   main      A─────B─────C─────────G (merged)
                    \\             /
   feature           D─────E─────F


   Creating and Working with Branches:

   ┌─────────────────────────────────┐
   │ git branch feature-login        │ Create branch
   │ git checkout feature-login      │ Switch to branch
   │ # or                            │
   │ git checkout -b feature-login   │ Create + Switch
   └─────────────────────────────────┘

   Fast-Forward Merge:

   Before:                After:
   main    A───B         main    A───B───C───D
                \\
   feature      C───D    feature

   Three-Way Merge:

   Before:                After:
   main    A───B───C      main    A───B───C───M
                \\                          \\   /
   feature       D───E    feature          D───E

   Branch States:

   * main (current branch, HEAD points here)
     feature-login
     bugfix-header
     develop`,
      useCase: 'A web development team is building an e-commerce site. One developer works on the payment integration in a "feature-payment" branch, while another fixes bugs in a "bugfix-cart" branch. The main branch stays stable and deployable. Once features are complete and tested, they\'re merged back into main.',
      concepts: ['Feature Branching', 'Branch Management', 'Fast-forward Merge', 'Branch Workflow'],
      commands: ['git branch', 'git checkout', 'git switch', 'git merge'],
      commonMistakes: [
        'Making changes directly on the main branch instead of creating a feature branch',
        'Forgetting which branch you\'re on before making commits',
        'Not pulling latest changes before creating a new branch',
        'Creating branches with unclear or generic names like "test" or "new"',
        'Forgetting to delete merged branches, cluttering the repository'
      ],
      bestPractices: [
        'Use descriptive branch names: feature/user-auth, bugfix/login-error',
        'Keep branches short-lived and merge frequently',
        'Always create branches from an up-to-date main branch',
        'Use "git branch -d" to delete merged branches',
        'Review changes before merging with "git diff main..feature-branch"',
        'Never commit directly to main in team projects'
      ],
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
      explanation: [
        'Merge conflicts occur when Git cannot automatically resolve differences between two commits. This typically happens when two branches modify the same lines in a file, or when one branch deletes a file that another branch modifies.',
        'Git marks conflicts with special markers (<<<<<<, =======, >>>>>>>) showing both versions of the conflicting code. You must manually decide which changes to keep, or combine both changes appropriately.',
        'Resolving conflicts is a normal part of collaborative development. Understanding how to handle them efficiently is crucial for team productivity.'
      ],
      diagram: `
   How Conflicts Occur

   main      A───B───C
                  \\
   feature        D───E

   File: index.html
   Commit B: <h1>Hello World</h1>
   Commit D: <h1>Welcome</h1>  ← Same line modified!

   When merging feature into main:

   ┌──────────────────────────────┐
   │ <<<<<<< HEAD (main)          │
   │ <h1>Hello World</h1>         │
   │ =======                      │
   │ <h1>Welcome</h1>             │
   │ >>>>>>> feature              │
   └──────────────────────────────┘

   Conflict Markers Explained:

   <<<<<<< HEAD
   Your current branch's version
   =======
   The incoming branch's version
   >>>>>>> branch-name

   Resolution Steps:

   1. git status              (identify conflicted files)
   2. Open conflicted file
   3. Find conflict markers
   4. Edit to keep desired changes
   5. Remove conflict markers
   6. git add <file>         (mark as resolved)
   7. git commit             (complete the merge)`,
      useCase: 'Two developers are working on a website. Developer A updates the homepage title to "Welcome to Our Store" in the main branch. Meanwhile, Developer B changes it to "Shop Now" in their feature branch. When they try to merge, Git cannot decide which title to keep, creating a conflict that must be manually resolved.',
      concepts: ['Merge Conflicts', 'Conflict Markers', 'Resolution Strategies', 'Diff Tools'],
      commands: ['git diff', 'git mergetool', 'git merge --abort'],
      commonMistakes: [
        'Accidentally committing conflict markers (<<<<<<, =======, >>>>>>>) in the code',
        'Choosing one version without understanding what both changes do',
        'Not testing the code after resolving conflicts',
        'Panicking and running "git reset --hard" which loses all changes',
        'Resolving conflicts but forgetting to git add and commit'
      ],
      bestPractices: [
        'Communicate with team members before resolving conflicts affecting their code',
        'Pull frequently to minimize the chance of large conflicts',
        'Make small, focused commits to reduce conflict complexity',
        'Use "git merge --abort" to cancel a merge if you need to reconsider',
        'Test thoroughly after resolving conflicts',
        'Use visual diff tools (VS Code, GitKraken) for complex conflicts',
        'Keep both changes when unsure and discuss with the team'
      ],
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
      explanation: [
        'A Pull Request (PR) is a GitHub feature that lets you notify others about changes you\'ve pushed to a repository. It provides a discussion forum for proposed changes before they\'re merged into the main codebase.',
        'Forking creates a personal copy of someone else\'s repository under your GitHub account. This allows you to freely experiment without affecting the original project. It\'s commonly used in open-source contributions.',
        'Code review through PRs is a quality assurance practice where team members examine each other\'s code before merging. This catches bugs early, shares knowledge, and maintains code quality standards.'
      ],
      diagram: `
   Pull Request Workflow

   Original Repo (upstream)
   ┌─────────────────────────┐
   │  github.com/org/project │
   └─────────┬───────────────┘
             │ fork
             ▼
   Your Fork (origin)
   ┌─────────────────────────┐
   │ github.com/you/project  │
   └─────────┬───────────────┘
             │ clone
             ▼
   Local Repository
   ┌─────────────────────────┐
   │  Your Computer          │
   │  1. git checkout -b fix │
   │  2. Make changes        │
   │  3. git commit          │
   │  4. git push origin fix │
   └─────────────────────────┘
             │
             ▼
   Create Pull Request
   ┌─────────────────────────┐
   │ Title: Fix login bug    │
   │ Description: ...        │
   │ Changes: 3 files        │
   │ [Create PR Button]      │
   └─────────────────────────┘
             │
             ▼
   Code Review & Discussion
   ┌─────────────────────────┐
   │ Reviewer comments       │
   │ Request changes         │
   │ Approve                 │
   └─────────┬───────────────┘
             │
             ▼
   Merge to Main Branch`,
      useCase: 'An open-source project has hundreds of contributors. A developer finds a bug, forks the repository, fixes the bug in their fork, and creates a Pull Request. The project maintainers review the fix, suggest improvements, and once approved, merge it into the main project. This workflow maintains code quality while welcoming contributions.',
      concepts: ['Forking', 'Pull Requests', 'Code Review', 'PR Workflow'],
      commands: ['fork (GitHub UI)', 'PR creation', 'PR review'],
      commonMistakes: [
        'Creating PRs from the main branch instead of a feature branch',
        'Making PRs too large with unrelated changes',
        'Not providing a clear description of what the PR does',
        'Pushing additional commits while PR is under review without communication',
        'Taking code review feedback personally instead of professionally'
      ],
      bestPractices: [
        'Write clear PR titles and descriptions explaining what and why',
        'Keep PRs small and focused on one feature or fix',
        'Link related issues in the PR description (e.g., "Fixes #123")',
        'Respond to review comments promptly and professionally',
        'Test your changes thoroughly before creating the PR',
        'Use PR templates if provided by the project',
        'Request specific reviewers who are familiar with the code area'
      ],
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
      explanation: [
        'Git provides multiple ways to undo changes, each suited for different scenarios. Understanding when to use each method is crucial for safe and effective version control.',
        'git restore/checkout are for discarding uncommitted changes in your working directory. git reset moves the HEAD pointer and can rewrite history. git revert creates a new commit that undoes previous changes without rewriting history.',
        'The key difference: reset rewrites history (dangerous for shared branches), while revert preserves history by adding a new commit (safe for shared branches).'
      ],
      diagram: `
   Undoing Changes - Decision Tree

   Need to undo?
   │
   ├─ Uncommitted changes in working directory
   │  └─ git restore <file>  or  git checkout -- <file>
   │
   ├─ Changes in staging area (after git add)
   │  └─ git restore --staged <file>  or  git reset HEAD <file>
   │
   ├─ Last commit (not pushed, local only)
   │  └─ git reset --soft HEAD~1  (keep changes)
   │     git reset --mixed HEAD~1 (unstage changes)
   │     git reset --hard HEAD~1  (⚠️ delete changes)
   │
   └─ Commit already pushed to remote
      └─ git revert <commit-hash>  (safe, creates new commit)


   Reset Modes Visualization:

   Original: A ← B ← C ← HEAD

   --soft:    A ← B ← HEAD
              (C's changes staged)

   --mixed:   A ← B ← HEAD
              (C's changes unstaged)

   --hard:    A ← B ← HEAD
              (C's changes deleted ⚠️)


   Revert vs Reset:

   Reset (rewrites history):
   Before: A───B───C
   After:  A───B

   Revert (preserves history):
   Before: A───B───C
   After:  A───B───C───C' (C' undoes C)`,
      useCase: 'You accidentally committed sensitive API keys to your local repository (not yet pushed). Use "git reset --soft HEAD~1" to undo the commit while keeping the changes, remove the API keys from the files, then commit again properly. If you had already pushed, you would use "git revert" instead to safely undo the commit without rewriting shared history.',
      concepts: ['Reset', 'Revert', 'Checkout', 'Restore', 'Recovery'],
      commands: ['git reset', 'git revert', 'git checkout', 'git restore'],
      commonMistakes: [
        'Using "git reset --hard" and permanently losing work',
        'Resetting commits that have already been pushed to shared branches',
        'Confusing reset with revert and rewriting shared history',
        'Not creating a backup branch before performing risky operations',
        'Using checkout for too many purposes (Git now has restore and switch)'
      ],
      bestPractices: [
        'NEVER use git reset --hard on commits pushed to shared branches',
        'Use git revert for undoing public commits (already pushed)',
        'Create a backup branch before major undo operations: git branch backup',
        'Use --soft reset to undo commits but keep changes',
        'Check git reflog to recover "lost" commits',
        'Prefer git restore over git checkout for discarding file changes',
        'Always verify what you\'re undoing with git log before reset/revert'
      ],
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
      explanation: [
        'Tags in Git are references to specific points in your repository\'s history, typically used to mark release versions (v1.0, v2.0, etc.). Unlike branches, tags don\'t move - they permanently point to a specific commit.',
        'Lightweight tags are simple pointers to a commit. Annotated tags are stored as full objects containing tagger name, email, date, message, and can be signed with GPG. Always use annotated tags for releases.',
        'GitHub Releases build on top of Git tags, adding release notes, binary attachments, and a user-friendly interface for downloading specific versions of your software.'
      ],
      diagram: `
   Git Tags and Versioning

   Commit History:
   A───B───C───D───E───F───G───H
       ↑       ↑           ↑
     v1.0    v1.1        v2.0


   Semantic Versioning (SemVer):

   v1.2.3
    │ │ │
    │ │ └─ PATCH: Bug fixes (backward compatible)
    │ └─── MINOR: New features (backward compatible)
    └───── MAJOR: Breaking changes (not backward compatible)

   Examples:
   v1.0.0 → v1.0.1  (Bug fix)
   v1.0.1 → v1.1.0  (New feature added)
   v1.1.0 → v2.0.0  (Breaking change)


   Tag Types:

   Lightweight Tag:
   ┌─────────────────┐
   │  v1.0           │ ──→ Points to commit
   └─────────────────┘

   Annotated Tag:
   ┌─────────────────────────┐
   │  v1.0                   │
   │  Tagger: John Doe       │
   │  Date: 2024-01-15       │
   │  Message: "Release 1.0" │
   │  GPG Signature: ...     │
   └───────┬─────────────────┘
           └──→ Points to commit


   Creating and Using Tags:

   # Create annotated tag
   $ git tag -a v1.0 -m "Release version 1.0"

   # Create lightweight tag
   $ git tag v1.0

   # Tag specific commit
   $ git tag -a v1.0 a1b2c3d -m "Message"

   # Push tags to remote
   $ git push origin --tags

   # Checkout specific version
   $ git checkout v1.0`,
      useCase: 'A software company releases their web application in versions. When version 1.0 is ready for production, they create an annotated tag "v1.0.0" and a GitHub Release with downloadable binaries and changelog. Users can report "bug in v1.0.0" instead of vague version descriptions. The team can easily checkout v1.0.0 to reproduce bugs reported by users.',
      concepts: ['Tagging', 'Annotated Tags', 'Lightweight Tags', 'Releases', 'Versioning'],
      commands: ['git tag', 'git tag -a', 'git push --tags'],
      commonMistakes: [
        'Using lightweight tags for releases instead of annotated tags',
        'Forgetting to push tags with git push --tags',
        'Tagging without following semantic versioning conventions',
        'Creating tags on local branches before merging to main',
        'Not documenting what changed in each version'
      ],
      bestPractices: [
        'Always use annotated tags for releases: git tag -a v1.0 -m "..."',
        'Follow Semantic Versioning (SemVer): MAJOR.MINOR.PATCH',
        'Write meaningful tag messages describing what\'s new',
        'Create GitHub Releases with detailed changelogs',
        'Tag only stable, tested commits on main/production branch',
        'Use git describe to see latest tag from current commit',
        'Keep a CHANGELOG.md file documenting changes between versions'
      ],
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
      explanation: [
        'Git log shows the commit history of your repository. Understanding how to filter and format log output is essential for investigating bugs, understanding code changes, and tracking project evolution over time.',
        'git blame shows which commit and author last modified each line of a file. It\'s invaluable for understanding why code was written a certain way - you can find the commit message explaining the reasoning.',
        'git bisect uses binary search to find which specific commit introduced a bug. It\'s incredibly efficient - if you have 1000 commits, bisect will find the bug in just 10 steps!'
      ],
      diagram: `
   Git Log Options

   Basic log:
   $ git log
   commit a1b2c3d (HEAD -> main)
   Author: John Doe <john@example.com>
   Date: Mon Jan 15 10:30:00 2024
       Add user authentication

   One-line log:
   $ git log --oneline
   a1b2c3d Add user authentication
   e4f5g6h Fix login bug
   i7j8k9l Update README

   Graph view:
   $ git log --graph --oneline --all
   * a1b2c3d (HEAD -> main) Merge feature-auth
   |\\
   | * e4f5g6h (feature-auth) Add password validation
   | * i7j8k9l Add login form
   |/
   * m1n2o3p Update dependencies


   Git Blame Example

   $ git blame app.js
   a1b2c3d (John  2024-01-15 10) function login(user) {
   a1b2c3d (John  2024-01-15 11)   if (!user) return;
   e4f5g6h (Sarah 2024-01-20 08)   validatePassword(user);
   e4f5g6h (Sarah 2024-01-20 09)   authenticateUser(user);
   a1b2c3d (John  2024-01-15 12) }

   Line 3 was changed by Sarah in commit e4f5g6h


   Git Bisect - Binary Search for Bugs

   Good commit ───────────────────────── Bad commit
   A     B     C     D     E     F     G
   ✓     ?     ?     ?     ?     ?     ✗

   Step 1: Test D (middle)
   A     B     C     D     E     F     G
   ✓     ?     ?     ✗     ?     ?     ✗

   Step 2: Test B
   A     B     C     D     E     F     G
   ✓     ✓     ?     ✗     ?     ?     ✗

   Step 3: Test C → Found bug!
   A     B     C     D     E     F     G
   ✓     ✓     ✗←BUG


   Useful Log Filters:

   # Last 5 commits
   $ git log -5

   # Commits by author
   $ git log --author="John"

   # Commits since date
   $ git log --since="2024-01-01"

   # Commits affecting specific file
   $ git log -- app.js

   # Search commit messages
   $ git log --grep="bug fix"`,
      useCase: 'A production bug appears but you don\'t know when it was introduced. Use git bisect: mark the current (buggy) commit as bad and a commit from 3 months ago as good. Git will check out the middle commit. Test if the bug exists, mark as good/bad, and repeat. In ~10 steps, you\'ll find the exact commit that introduced the bug, even if there are thousands of commits. The commit message explains why that change was made.',
      concepts: ['Commit History', 'Blame', 'Bisect', 'History Navigation', 'Debugging'],
      commands: ['git log', 'gitk', 'git blame', 'git bisect'],
      commonMistakes: [
        'Not using git log filtering options and being overwhelmed by output',
        'Using blame to point fingers instead of understanding code history',
        'Not understanding that git bisect requires a reproducible bug',
        'Forgetting to run "git bisect reset" after finding the bug',
        'Not reading commit messages when investigating history'
      ],
      bestPractices: [
        'Use git log --oneline --graph for quick visual overview',
        'Combine log filters: git log --author="John" --since="1 week ago"',
        'Use git show <commit> to see full details of a specific commit',
        'Use git blame -L 10,20 file.js to blame specific line ranges',
        'Write clear commit messages - your future self will thank you',
        'Use git log -p to see actual code changes in commits',
        'Create aliases for commonly used log commands'
      ],
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
      explanation: [
        'A .gitignore file specifies which files and directories Git should ignore and not track. This is essential for excluding temporary files, build artifacts, dependencies, and sensitive information from version control.',
        'Patterns in .gitignore use glob syntax: * matches any characters, ** matches directories recursively, ! negates a pattern, and # creates comments. Files already tracked by Git won\'t be ignored until you run "git rm --cached".',
        'Global .gitignore applies to all repositories on your system, useful for OS-specific files like .DS_Store (macOS) or Thumbs.db (Windows). .gitattributes controls how Git handles line endings, diffs, and merges for specific file types.'
      ],
      diagram: `
   .gitignore Pattern Examples

   # Comment in .gitignore
   *.log                  # Ignore all .log files
   /temp/                 # Ignore temp folder in root
   build/*                # Ignore everything in build
   !build/README.md       # But track this file
   **/*.class             # Ignore .class files everywhere
   node_modules/          # Ignore dependencies
   .env                   # Ignore environment variables

   Pattern Matching:

   *.txt         →  file.txt, data.txt, any.txt
   docs/*.pdf    →  docs/guide.pdf (not docs/sub/file.pdf)
   docs/**/*.pdf →  docs/guide.pdf AND docs/sub/file.pdf
   !important.*  →  Exception: DO track this pattern


   Common .gitignore Structure:

   # Operating System
   .DS_Store
   Thumbs.db

   # IDE
   .vscode/
   .idea/
   *.swp

   # Language-specific
   node_modules/        # JavaScript
   __pycache__/        # Python
   *.class             # Java
   target/             # Maven

   # Secrets
   .env
   config/secrets.yml
   *.key

   # Build artifacts
   dist/
   build/
   *.exe`,
      useCase: 'A Python web application project has .pyc compiled files, a virtual environment folder (venv/), and a .env file with database credentials. The .gitignore includes these patterns to prevent tracking unnecessary files and accidentally exposing secrets. Only source code and configuration templates are tracked.',
      concepts: ['Gitignore Patterns', 'Global Gitignore', 'Git Attributes', 'File Exclusion'],
      commands: ['.gitignore', '.gitattributes', 'git rm --cached'],
      commonMistakes: [
        'Committing .gitignore after files are already tracked (must use git rm --cached)',
        'Adding .gitignore to .gitignore file itself',
        'Using absolute paths instead of patterns',
        'Accidentally ignoring important configuration files',
        'Not using GitHub\'s gitignore templates for common project types',
        'Committing sensitive files before adding them to .gitignore'
      ],
      bestPractices: [
        'Create .gitignore before first commit to avoid tracking unwanted files',
        'Use gitignore.io or GitHub templates for your tech stack',
        'Commit .gitignore file itself to share ignore rules with team',
        'Use git status to verify nothing sensitive is staged',
        'Document unusual ignore patterns with comments in .gitignore',
        'Set up global .gitignore for OS-specific files: git config --global core.excludesfile',
        'Review .gitignore in code reviews to ensure proper exclusions'
      ],
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
      explanation: [
        'Git GUI tools provide visual interfaces for Git operations, making complex concepts like branching and merging easier to understand. They\'re especially helpful for beginners and for visualizing repository structure.',
        'GitHub Desktop is a free, simple GUI ideal for beginners. GitKraken offers advanced features like visual merge conflict resolution and interactive rebase. VS Code has built-in Git integration perfect for coding workflows.',
        'While GUI tools are convenient, understanding command-line Git is still essential. GUIs may hide important details, and command-line is often necessary for troubleshooting or working on remote servers.'
      ],
      diagram: `
   Popular Git GUI Tools

   ┌────────────────────────────────────┐
   │      GitHub Desktop                │
   │  • Free, simple interface          │
   │  • Great for beginners             │
   │  • Limited features                │
   │  • Perfect for GitHub workflows    │
   └────────────────────────────────────┘

   ┌────────────────────────────────────┐
   │      GitKraken                     │
   │  • Professional-grade GUI          │
   │  • Visual commit graph             │
   │  • Built-in merge tool             │
   │  • Integrations with Jira, etc.    │
   └────────────────────────────────────┘

   ┌────────────────────────────────────┐
   │      VS Code Git Integration       │
   │  • Built into code editor          │
   │  • Source Control panel            │
   │  • Inline diff viewing             │
   │  • GitLens extension               │
   └────────────────────────────────────┘


   VS Code Git Workflow

   ┌─────────────────────────────────┐
   │  File Explorer     Changes (3)  │
   │  ├─ src/           ────────────┐│
   │  │  └─ app.js (M)             ││
   │  ├─ styles/        Message:    ││
   │  │  └─ main.css (M) [Add feat] ││
   │  └─ README.md (U)              ││
   │                    [Commit ✓]  ││
   │  Branch: main ▼   [Push ↑]    ││
   └─────────────────────────────────┘

   M = Modified, U = Untracked


   Benefits of GUI vs Command Line:

   GUI Tools:
   ✓ Visual representation of branches
   ✓ Easy conflict resolution
   ✓ Point-and-click operations
   ✓ No need to memorize commands
   ✗ May hide important details
   ✗ Not available on remote servers

   Command Line:
   ✓ Full control and flexibility
   ✓ Works everywhere (servers, CI/CD)
   ✓ Scriptable and automatable
   ✓ Faster for experienced users
   ✗ Steeper learning curve
   ✗ Harder to visualize branches`,
      useCase: 'A designer joining a development team isn\'t comfortable with command-line tools. They use GitHub Desktop to clone repositories, create branches, commit changes, and create pull requests - all through a visual interface. Meanwhile, the senior developer uses VS Code\'s Git integration for quick commits and GitKraken for complex branch management and merge conflicts.',
      concepts: ['GitHub Desktop', 'GitKraken', 'VS Code Git', 'GUI Workflow'],
      commands: ['GUI operations', 'Visual commits', 'Branch visualization'],
      commonMistakes: [
        'Relying entirely on GUI without learning command-line basics',
        'Not understanding what the GUI is doing behind the scenes',
        'Using GUI for everything when command-line would be faster',
        'Not checking what changes are being committed in GUI',
        'Ignoring error messages in GUI tools'
      ],
      bestPractices: [
        'Learn command-line Git first, then use GUI as a productivity tool',
        'Use GUI for visualization, command-line for complex operations',
        'Understand that GUI tools run Git commands for you',
        'Enable Git CLI access even when using GUI primarily',
        'Use VS Code integration for day-to-day commits',
        'Use GitKraken/GitHub Desktop for branch visualization',
        'Keep GUI tools updated for latest Git features'
      ],
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
      explanation: [
        'Real-world projects require coordinated teamwork. This session applies all Git concepts learned so far to a collaborative team project, simulating professional software development environments.',
        'Branch protection rules prevent direct commits to main branch, enforce code reviews, and require status checks to pass. This maintains code quality and prevents accidental breaking changes.',
        'GitHub Issues and Project Boards organize work, track bugs, and manage feature requests. They integrate with commits and PRs, creating a complete project management workflow.'
      ],
      diagram: `
   Team Collaboration Setup

   ┌─────────────────────────────────┐
   │  GitHub Organization/Repo       │
   │  • Main branch (protected)      │
   │  • Issue tracking enabled       │
   │  • Project board created        │
   │  • Team members added           │
   └────────┬────────────────────────┘
            │
   ┌────────▼─────────────────────────┐
   │  Branch Protection Rules         │
   │  ✓ Require PR before merging     │
   │  ✓ Require 1+ review approvals   │
   │  ✓ Dismiss stale reviews         │
   │  ✓ Require status checks         │
   │  ✗ Allow force push              │
   └──────────────────────────────────┘

   Project Board Workflow:

   ┌─────────┐  ┌────────────┐  ┌──────────┐  ┌──────┐
   │ Backlog │→ │ In Progress│→ │ In Review│→ │ Done │
   └─────────┘  └────────────┘  └──────────┘  └──────┘
   │ Issue #1 │  │ Issue #2   │  │ PR #5    │  │ #4   │
   │ Issue #3 │  │ Issue #6   │  │ PR #7    │  │ #8   │
   └─────────┘  └────────────┘  └──────────┘  └──────┘


   Team Git Workflow:

   Developer A              Developer B
   ┌──────────────┐        ┌──────────────┐
   │ Issue #5     │        │ Issue #6     │
   │ "Add login"  │        │ "Add navbar" │
   └──────┬───────┘        └──────┬───────┘
          │                       │
   ┌──────▼──────────┐    ┌───────▼──────────┐
   │ feature/login   │    │ feature/navbar   │
   │ (local branch)  │    │ (local branch)   │
   └──────┬──────────┘    └───────┬──────────┘
          │                       │
   ┌──────▼──────────┐    ┌───────▼──────────┐
   │ Push to origin  │    │ Push to origin   │
   └──────┬──────────┘    └───────┬──────────┘
          │                       │
   ┌──────▼────────────────────────▼─────────┐
   │        Create Pull Requests             │
   │        (reference Issue #5, #6)         │
   └──────┬────────────────────────┬─────────┘
          │                       │
   ┌──────▼──────────┐    ┌───────▼──────────┐
   │ Code Review     │◄──►│ Code Review      │
   │ by teammate     │    │ by teammate      │
   └──────┬──────────┘    └───────┬──────────┘
          │                       │
   ┌──────▼────────────────────────▼─────────┐
   │         Merge to main branch            │
   │         (Issues automatically closed)   │
   └─────────────────────────────────────────┘`,
      useCase: 'A team of 4 students builds a web application. They create a GitHub repository with a project board showing "To Do", "In Progress", "Review", and "Done" columns. Each feature is tracked as an Issue. Team members create branches, link commits to issues, create PRs, review each other\'s code, and merge when approved. The main branch is always stable and deployable.',
      concepts: ['Team Workflow', 'Project Setup', 'Issue Tracking', 'Collaboration'],
      commands: ['All previous commands', 'GitHub Issues', 'Project boards'],
      commonMistakes: [
        'Not setting up branch protection, allowing direct commits to main',
        'Creating vague issues without clear acceptance criteria',
        'Not linking commits/PRs to issues',
        'Skipping code reviews to save time',
        'Not communicating with team about major changes'
      ],
      bestPractices: [
        'Set up branch protection on main from day one',
        'Write detailed issue descriptions with acceptance criteria',
        'Reference issues in commit messages: "Fix login bug (#42)"',
        'Review PRs promptly to avoid blocking teammates',
        'Use project board to visualize team progress',
        'Hold daily standups to sync on Git workflow',
        'Document team Git conventions in CONTRIBUTING.md'
      ],
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
      explanation: [
        'This session focuses on the real challenges of team collaboration: reviewing code constructively, resolving merge conflicts diplomatically, and maintaining project documentation as the codebase evolves.',
        'Code review is not about finding faults - it\'s about sharing knowledge, catching bugs early, and maintaining consistent code quality. Good reviews are specific, kind, and actionable.',
        'Merge conflicts are inevitable in team projects. The key is to resolve them quickly, test thoroughly after resolution, and communicate with teammates whose code was affected.'
      ],
      diagram: `
   Code Review Process

   ┌─────────────────────────────────┐
   │  Pull Request Created           │
   │  Title: "Add user authentication"│
   │  Files: 5 changed               │
   │  Commits: 3                     │
   └────────┬────────────────────────┘
            │
   ┌────────▼────────────────────────┐
   │  Automated Checks               │
   │  ✓ Tests pass (10/10)           │
   │  ✓ Linter passes                │
   │  ✓ Build successful             │
   └────────┬────────────────────────┘
            │
   ┌────────▼────────────────────────┐
   │  Reviewer Comments              │
   │  💬 "Good use of async/await"   │
   │  ❗ "Add error handling here"   │
   │  💡 "Consider extracting this"  │
   └────────┬────────────────────────┘
            │
   ┌────────▼────────────────────────┐
   │  Author Responds & Updates      │
   │  • Addresses feedback           │
   │  • Pushes new commits           │
   │  • Explains decisions           │
   └────────┬────────────────────────┘
            │
   ┌────────▼────────────────────────┐
   │  Approval & Merge               │
   │  ✓ Approved by 2 reviewers      │
   │  ✓ All checks passed            │
   │  → Merge to main                │
   └─────────────────────────────────┘


   Handling Merge Conflicts in Teams:

   Scenario:
   Developer A: Modified login.js (lines 10-20)
   Developer B: Modified login.js (lines 15-25)
   ← Conflict! ←

   Resolution Steps:
   1. Developer B pulls latest from main
   2. Git shows conflict in login.js
   3. Developer B reviews both changes
   4. Developer B talks to Developer A
   5. Agree on which changes to keep
   6. Test the merged code
   7. Commit the resolution
   8. Push and merge PR


   Documentation Updates:

   As features are added:
   ┌─────────────────────────────────┐
   │  README.md    (Updated)         │
   │  • Installation steps           │
   │  • New feature documented       │
   └─────────────────────────────────┘
   ┌─────────────────────────────────┐
   │  API.md       (Updated)         │
   │  • New endpoints listed         │
   │  • Example requests added       │
   └─────────────────────────────────┘
   ┌─────────────────────────────────┐
   │  CHANGELOG.md (Updated)         │
   │  • Version 1.1.0                │
   │  • Features/fixes listed        │
   └─────────────────────────────────┘`,
      useCase: 'Two developers modify the same authentication file simultaneously. When the second developer tries to merge, Git flags a conflict. They discuss via Slack, decide to keep parts of both implementations, test the merged code locally, then commit the resolution. They update the API documentation to reflect the new authentication flow and add an entry to CHANGELOG.md.',
      concepts: ['Code Review', 'Conflict Resolution', 'Feature Development', 'Documentation'],
      commands: ['PR workflow', 'Code review', 'Merge strategies'],
      commonMistakes: [
        'Approving PRs without actually reviewing the code',
        'Being overly critical or personal in code reviews',
        'Resolving conflicts by simply accepting all your changes',
        'Not testing code after resolving merge conflicts',
        'Forgetting to update documentation when adding features'
      ],
      bestPractices: [
        'Use PR templates to ensure all info is provided',
        'Review code within 24 hours to avoid blocking teammates',
        'Give constructive feedback: suggest solutions, not just problems',
        'Communicate before resolving complex conflicts',
        'Test thoroughly after every merge conflict resolution',
        'Keep PRs small (< 400 lines) for easier review',
        'Update docs in the same PR as code changes'
      ],
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
      explanation: [
        'This final session consolidates everything learned, introduces advanced techniques like rebase for cleaner history, and covers industry-standard conventions used in professional teams.',
        'Conventional Commits (e.g., "feat:", "fix:", "docs:") create consistent, parseable commit messages. They enable automated changelog generation and semantic versioning.',
        'git rebase rewrites commit history to create a linear, cleaner log. It\'s powerful but dangerous on shared branches. Use it for cleaning up local commits before pushing.'
      ],
      diagram: `
   Conventional Commit Format:

   <type>(<scope>): <subject>

   <body>

   <footer>

   Examples:
   feat(auth): add two-factor authentication
   fix(ui): resolve navbar z-index issue
   docs(api): update endpoint documentation
   chore(deps): update React to 18.2


   Branch Naming Conventions:

   feature/<description>    e.g., feature/user-auth
   bugfix/<description>     e.g., bugfix/login-error
   hotfix/<description>     e.g., hotfix/security-patch
   release/<version>        e.g., release/v1.2.0


   Git Rebase vs Merge:

   Merge (preserves history):
   main     A───B───C───────M
                 \\         /
   feature        D───E───F

   Rebase (linear history):
   main     A───B───C───D'──E'──F'
                     ↑
              (feature rebased)


   Industry Best Practices Summary:

   ✓ Commit often, push regularly
   ✓ Write clear commit messages
   ✓ Keep commits atomic (one logical change)
   ✓ Review before merging
   ✓ Protect main/master branch
   ✓ Use .gitignore properly
   ✓ Tag releases with versions
   ✓ Document in README
   ✓ Keep PR size manageable
   ✓ Test before committing


   Git Reflog (Recovery):

   $ git reflog
   a1b2c3d HEAD@{0}: commit: Add feature
   e4f5g6h HEAD@{1}: commit: Fix bug
   i7j8k9l HEAD@{2}: reset: moving to HEAD~1
   m1n2o3p HEAD@{3}: commit: Deleted file

   Recover deleted commit:
   $ git checkout m1n2o3p


   Performance Tips:

   # Shallow clone (faster for large repos)
   $ git clone --depth 1 <url>

   # Clean up unnecessary files
   $ git gc

   # Fetch only specific branch
   $ git fetch origin main

   # Prune deleted remote branches
   $ git remote prune origin`,
      useCase: 'A professional development team follows strict Git conventions: all commits follow Conventional Commits format, branches are named consistently, and rebase is used to clean up feature branch history before merging. When a junior developer accidentally deletes important work, a senior dev uses git reflog to recover it in seconds. The team\'s clean Git history makes debugging and maintenance much easier.',
      concepts: ['Best Practices', 'Commit Conventions', 'Branch Naming', 'Rebase', 'Code Review'],
      commands: ['git rebase', 'git commit --amend', 'git reflog'],
      commonMistakes: [
        'Rebasing commits that have been pushed to shared branches',
        'Not following team commit message conventions',
        'Forgetting to test after rebase',
        'Using --force push without --force-with-lease',
        'Not documenting team Git workflow'
      ],
      bestPractices: [
        'NEVER rebase commits that others have based work on',
        'Use Conventional Commits for consistent message format',
        'Use git rebase -i for interactive cleanup of local commits',
        'Use --force-with-lease instead of --force for safer force push',
        'Document your team\'s Git workflow in CONTRIBUTING.md',
        'Use git reflog as your safety net for recovery',
        'Automate enforcement with commit message linters (commitlint)',
        'Create Git aliases for commonly used complex commands'
      ],
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

          {/* Git Fundamentals Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12 bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50"
          >
            <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-purple-400 mb-6 text-center">
              Understanding Git Workflow
            </h3>
            <div className="bg-slate-950/80 rounded-xl p-6 border border-orange-500/30 mb-6">
              <pre className="text-green-300 text-xs md:text-sm font-mono overflow-x-auto whitespace-pre">
{`
   Complete Git Workflow Visualization

   ┌─────────────────────────────────────────────────────────────────────────┐
   │                          YOUR LOCAL MACHINE                             │
   │                                                                         │
   │  ┌──────────────┐     ┌──────────────┐     ┌──────────────────────┐   │
   │  │   Working    │     │   Staging    │     │   Local Repository   │   │
   │  │  Directory   │────▶│     Area     │────▶│    (.git folder)     │   │
   │  │              │     │   (Index)    │     │                      │   │
   │  │  Edit files  │     │  git add     │     │    git commit        │   │
   │  └──────────────┘     └──────────────┘     └──────────┬───────────┘   │
   │        ▲                                               │               │
   │        │                                               │               │
   │        │ git restore/checkout                          │ git push      │
   │        │                                               │               │
   └────────┼───────────────────────────────────────────────┼───────────────┘
            │                                               │
            │                                               ▼
            │                                    ┌────────────────────┐
            │                                    │  Remote Repository │
            │ git pull/fetch                     │   (GitHub/GitLab)  │
            └────────────────────────────────────│                    │
                                                 │  Team Collaboration│
                                                 └────────────────────┘

   Key Git Commands by Stage:

   Working Directory → Staging:
   • git add <file>              Add specific file
   • git add .                   Add all changes
   • git status                  Check what's changed

   Staging → Repository:
   • git commit -m "message"     Commit with message
   • git commit -am "message"    Add & commit tracked files

   Local ↔ Remote:
   • git push origin main        Upload to remote
   • git pull origin main        Download from remote
   • git clone <url>             Copy remote repository

   Branching:
   • git branch <name>           Create branch
   • git checkout <branch>       Switch branch
   • git merge <branch>          Merge branches
`}
              </pre>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl p-4 border border-blue-500/30">
                <h4 className="text-blue-300 font-bold mb-2 flex items-center gap-2">
                  <span>💻</span> Working Directory
                </h4>
                <p className="text-slate-300 text-sm">
                  Your project files where you make changes. Untracked changes exist here before being staged.
                </p>
              </div>
              <div className="bg-gradient-to-br from-orange-500/20 to-yellow-500/20 rounded-xl p-4 border border-orange-500/30">
                <h4 className="text-orange-300 font-bold mb-2 flex items-center gap-2">
                  <span>📦</span> Staging Area
                </h4>
                <p className="text-slate-300 text-sm">
                  A holding area for changes you want to commit. Lets you craft meaningful commits with related changes.
                </p>
              </div>
              <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl p-4 border border-purple-500/30">
                <h4 className="text-purple-300 font-bold mb-2 flex items-center gap-2">
                  <span>🗄️</span> Repository
                </h4>
                <p className="text-slate-300 text-sm">
                  Permanent storage of your project history. Each commit is a snapshot you can return to anytime.
                </p>
              </div>
            </div>
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
