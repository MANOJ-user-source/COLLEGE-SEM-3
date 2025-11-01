import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float, MeshDistortMaterial, Sphere, Box, Torus, Environment, Stars, Text3D, Center } from '@react-three/drei'
import { AnimatePresence, motion } from 'framer-motion'
import * as THREE from 'three'
import wdpProjects from '../data/wdp/projects'

// Animated Laptop/Monitor
function AnimatedMonitor({ position, color }) {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.3
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={2}>
      <Box ref={meshRef} position={position} args={[1.5, 1, 0.1]}>
        <meshStandardMaterial
          color={color}
          metalness={0.8}
          roughness={0.2}
          emissive={color}
          emissiveIntensity={0.5}
        />
      </Box>
    </Float>
  )
}

// Animated Code Brackets
function CodeBracket({ position, rotation, color }) {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z += 0.01
    }
  })

  return (
    <Float speed={3} rotationIntensity={2} floatIntensity={3}>
      <Torus ref={meshRef} position={position} rotation={rotation} args={[0.5, 0.1, 16, 100]}>
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
function WDPScene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={2} color="#3b82f6" />
      <pointLight position={[-10, -10, -10]} intensity={1.5} color="#8b5cf6" />
      <spotLight position={[0, 15, 0]} angle={0.3} penumbra={1} intensity={2} color="#06b6d4" />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <Environment preset="night" />

      {/* Central monitors */}
      <AnimatedMonitor position={[0, 1, 0]} color="#3b82f6" />
      <AnimatedMonitor position={[-3, 0, -2]} color="#8b5cf6" />
      <AnimatedMonitor position={[3, 0, -2]} color="#06b6d4" />

      {/* Code brackets */}
      <CodeBracket position={[-4, 2, 0]} rotation={[0, 0, 0]} color="#10b981" />
      <CodeBracket position={[4, 2, 0]} rotation={[0, 0, Math.PI]} color="#f59e0b" />
      <CodeBracket position={[0, -2, 1]} rotation={[Math.PI / 2, 0, 0]} color="#ef4444" />

      {/* Floating spheres */}
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <Sphere position={[-5, -1, -3]} args={[0.5, 32, 32]}>
          <MeshDistortMaterial
            color="#f59e0b"
            distort={0.4}
            speed={2}
            roughness={0.2}
            metalness={0.8}
          />
        </Sphere>
      </Float>

      <Float speed={2.5} rotationIntensity={1} floatIntensity={2}>
        <Sphere position={[5, -1, -3]} args={[0.5, 32, 32]}>
          <MeshDistortMaterial
            color="#ec4899"
            distort={0.4}
            speed={2}
            roughness={0.2}
            metalness={0.8}
          />
        </Sphere>
      </Float>

      <OrbitControls
        enableZoom={true}
        enablePan={true}
        minDistance={8}
        maxDistance={25}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </>
  )
}

// Project Card Component
function ProjectCard({ project, index }) {
  const navigate = useNavigate()

  const techIcons = {
    'HTML': '🌐',
    'CSS': '🎨',
    'JavaScript': '⚡',
    'Flexbox': '📦',
    'Grid': '🔲',
    'DOM': '🔗',
    'Responsive': '📱'
  }

  const difficultyColors = {
    'Beginner': 'from-green-500 to-emerald-500',
    'Intermediate': 'from-yellow-500 to-orange-500',
    'Advanced': 'from-red-500 to-pink-500'
  }

  const gradients = [
    'from-blue-500 to-cyan-500',
    'from-purple-500 to-pink-500',
    'from-green-500 to-teal-500',
    'from-orange-500 to-red-500',
    'from-indigo-500 to-purple-500',
    'from-pink-500 to-rose-500'
  ]

  const gradient = gradients[index % gradients.length]

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group relative"
    >
      <div className={`absolute inset-0 bg-gradient-to-r ${gradient}/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all`} />
      <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/50 group-hover:border-blue-500/50 transition-all hover:scale-[1.02] transform duration-300">
        {/* Project Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-5xl">{project.icon}</span>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-blue-400 font-bold text-lg">Project #{project.id}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${difficultyColors[project.difficulty]} text-white`}>
                    {project.difficulty}
                  </span>
                </div>
                <h3 className={`text-2xl md:text-3xl font-bold bg-gradient-to-r ${gradient} text-transparent bg-clip-text`}>
                  {project.title}
                </h3>
              </div>
            </div>
            <p className="text-slate-300 text-base leading-relaxed mb-4">
              {project.shortDescription || project.description}
            </p>

            {/* Technologies */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-slate-800/80 text-slate-200 border border-slate-700 flex items-center gap-1"
                >
                  <span>{techIcons[tech] || '💻'}</span>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div className="mb-6 bg-blue-500/10 border border-blue-500/30 rounded-xl p-5">
          <h4 className="text-blue-300 font-bold mb-3 text-lg flex items-center gap-2">
            <span className="text-2xl">🎯</span> Key Learning Objectives
          </h4>
          <ul className="space-y-2">
            {project.objectives.map((obj, i) => (
              <li key={i} className="text-slate-300 text-sm flex items-start gap-2">
                <span className="text-blue-400 mt-1">•</span>
                <span>{obj}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* View Project Button */}
        <button
          onClick={() => {
            console.log('Navigating to:', `/wdp/${project.slug}`)
            navigate(`/wdp/${project.slug}`)
          }}
          className={`w-full bg-gradient-to-r ${gradient} hover:shadow-xl hover:scale-105 text-white font-bold py-4 rounded-xl transition-all shadow-lg`}
        >
          🚀 View Full Project & Live Demo
        </button>
      </div>
    </motion.div>
  )
}

// Main WDP Page Component
function WDP() {
  const navigate = useNavigate()

  const projects = wdpProjects

  // Legacy data kept for reference (can be removed)
  const oldProjects = [
    {
      id: 1,
      title: 'Personal Portfolio Website',
      icon: '👨‍💻',
      difficulty: 'Beginner',
      description: 'Create a professional personal portfolio webpage using semantic HTML5. Learn document structure, proper use of headings, sections, and accessibility best practices.',
      technologies: ['HTML', 'Semantic Tags'],
      objectives: [
        'Understand HTML document structure and DOCTYPE',
        'Use semantic tags like header, nav, main, section, article, footer',
        'Implement proper heading hierarchy (h1-h6)',
        'Add images, links, and lists effectively',
        'Create a contact form with proper input types'
      ],
      steps: [
        'Set up basic HTML5 structure with DOCTYPE and meta tags',
        'Create a header with your name and navigation menu',
        'Build an "About Me" section with your bio and photo',
        'Add a "Skills" section using unordered lists',
        'Create a "Projects" showcase with images and descriptions',
        'Implement a contact form with name, email, and message fields',
        'Add a footer with social media links',
        'Validate your HTML using W3C validator'
      ],
      challenges: [
        'Add a downloadable resume link',
        'Include a timeline of your education/experience',
        'Create a responsive image gallery',
        'Add video or audio elements'
      ],
      resources: [
        'MDN Web Docs - HTML Basics',
        'W3Schools HTML Tutorial',
        'HTML Semantic Elements Guide',
        'Spoken Tutorial - HTML Resources'
      ]
    },
    {
      id: 2,
      title: 'Product Showcase Page',
      icon: '🛍️',
      difficulty: 'Beginner',
      description: 'Design and style a beautiful product showcase page using CSS. Master selectors, the box model, typography, colors, and visual hierarchy.',
      technologies: ['HTML', 'CSS', 'Box Model'],
      objectives: [
        'Apply inline, internal, and external CSS effectively',
        'Master CSS selectors (element, class, ID, attribute)',
        'Understand and implement the box model',
        'Use colors, backgrounds, and gradients',
        'Style typography for readability and visual appeal'
      ],
      steps: [
        'Create HTML structure for product cards',
        'Set up external CSS file and link it properly',
        'Apply a color scheme using CSS variables',
        'Style product cards with borders, shadows, and rounded corners',
        'Implement hover effects for interactive feedback',
        'Use Google Fonts or custom typography',
        'Add background images or gradients',
        'Style buttons with transitions and hover states',
        'Create consistent spacing using margins and padding'
      ],
      challenges: [
        'Implement a dark mode toggle',
        'Add CSS animations on card hover',
        'Create a pricing table with different tiers',
        'Use pseudo-elements (::before, ::after) for decorative effects'
      ],
      resources: [
        'CSS Tricks - Box Model Guide',
        'Google Fonts Library',
        'Color Palette Generators (Coolors, Adobe Color)',
        'Spoken Tutorial - CSS Resources'
      ]
    },
    {
      id: 3,
      title: 'Responsive Multi-Column Layout',
      icon: '📱',
      difficulty: 'Intermediate',
      description: 'Build a fully responsive multi-column webpage using modern CSS layout techniques. Master Flexbox and CSS Grid for professional layouts.',
      technologies: ['HTML', 'CSS', 'Flexbox', 'Grid', 'Responsive'],
      objectives: [
        'Implement Flexbox for one-dimensional layouts',
        'Use CSS Grid for two-dimensional layouts',
        'Create responsive designs with media queries',
        'Understand mobile-first design approach',
        'Handle different screen sizes effectively'
      ],
      steps: [
        'Design a layout sketch for desktop, tablet, and mobile',
        'Create HTML structure with semantic containers',
        'Implement CSS Grid for overall page layout',
        'Use Flexbox for navigation bar and card layouts',
        'Add media queries for tablet (768px) and mobile (480px)',
        'Implement mobile-first approach starting with smallest screen',
        'Test responsiveness using browser dev tools',
        'Ensure images are responsive with max-width: 100%',
        'Use relative units (%, em, rem) instead of fixed pixels'
      ],
      challenges: [
        'Create a responsive hamburger menu for mobile',
        'Implement CSS Grid areas for complex layouts',
        'Add smooth transitions when resizing',
        'Use CSS clamp() for fluid typography'
      ],
      resources: [
        'CSS Tricks - Complete Guide to Flexbox',
        'CSS Tricks - Complete Guide to Grid',
        'MDN - Responsive Design',
        'Can I Use - Browser compatibility checker'
      ]
    },
    {
      id: 4,
      title: 'JavaScript Calculator & Form Validator',
      icon: '🧮',
      difficulty: 'Intermediate',
      description: 'Build interactive applications using JavaScript fundamentals. Create a functional calculator and implement client-side form validation.',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      objectives: [
        'Understand JavaScript variables, data types, and operators',
        'Implement control structures (if/else, loops)',
        'Write reusable functions',
        'Handle user input and perform calculations',
        'Validate form data before submission'
      ],
      steps: [
        'Create calculator HTML with buttons for digits and operators',
        'Set up JavaScript file and link with defer attribute',
        'Declare variables for storing operands and operator',
        'Write functions for add, subtract, multiply, divide',
        'Implement event listeners for button clicks',
        'Display results in calculator screen',
        'Create a form with various input types',
        'Write validation functions for email, phone, password',
        'Display error messages dynamically',
        'Prevent form submission if validation fails'
      ],
      challenges: [
        'Add keyboard support for calculator',
        'Implement decimal point and clear functions',
        'Add password strength indicator',
        'Create real-time validation (on blur or input)',
        'Handle edge cases (division by zero, empty inputs)'
      ],
      resources: [
        'MDN - JavaScript Basics',
        'JavaScript.info - The Modern Tutorial',
        'W3Schools JavaScript Tutorial',
        'Eloquent JavaScript (free online book)'
      ]
    },
    {
      id: 5,
      title: 'Dynamic Content Manipulator',
      icon: '🔄',
      difficulty: 'Intermediate',
      description: 'Master the Document Object Model (DOM) by dynamically creating, modifying, and removing elements. Build an interactive to-do list or content manager.',
      technologies: ['HTML', 'CSS', 'JavaScript', 'DOM'],
      objectives: [
        'Understand the DOM tree structure',
        'Select elements using querySelector and getElementById',
        'Create and append new elements dynamically',
        'Modify element properties, attributes, and styles',
        'Handle user events (click, input, submit)'
      ],
      steps: [
        'Create base HTML structure with input field and container',
        'Select DOM elements using JavaScript',
        'Write function to create new list items',
        'Add event listener for form submission or button click',
        'Use createElement() and appendChild() to add items',
        'Implement delete functionality for each item',
        'Add edit functionality to modify existing items',
        'Store data in arrays and sync with DOM',
        'Add local storage to persist data on page reload',
        'Implement filter or search functionality'
      ],
      challenges: [
        'Add drag-and-drop reordering',
        'Implement categories or tags for items',
        'Add due dates and sort by date',
        'Create animations when adding/removing items',
        'Export data as JSON or CSV'
      ],
      resources: [
        'MDN - Introduction to the DOM',
        'JavaScript.info - Document and DOM',
        'DOM Manipulation Crash Course',
        'LocalStorage API Documentation'
      ]
    },
    {
      id: 6,
      title: 'Full-Stack Mini Project',
      icon: '🚀',
      difficulty: 'Advanced',
      description: 'Combine HTML, CSS, and JavaScript to build a complete web application. This is your capstone project showcasing all skills learned throughout the course.',
      technologies: ['HTML', 'CSS', 'JavaScript', 'Flexbox', 'Grid', 'DOM', 'Responsive'],
      objectives: [
        'Integrate HTML structure, CSS styling, and JavaScript interactivity',
        'Plan and design a complete web application',
        'Implement responsive design for all devices',
        'Handle complex user interactions and state management',
        'Present and document your project professionally'
      ],
      steps: [
        'Choose project idea (e.g., blog, e-commerce, dashboard, game)',
        'Create wireframes and design mockups',
        'Set up project structure with organized folders',
        'Build semantic HTML structure',
        'Implement responsive CSS with Flexbox/Grid',
        'Add JavaScript for interactivity and dynamic content',
        'Test across different browsers and devices',
        'Optimize performance (minify CSS/JS, optimize images)',
        'Deploy using GitHub Pages or Netlify',
        'Create project documentation and README'
      ],
      challenges: [
        'Implement user authentication (frontend only with localStorage)',
        'Add dark/light theme toggle',
        'Create animated transitions and micro-interactions',
        'Implement search and filter functionality',
        'Add accessibility features (ARIA labels, keyboard navigation)',
        'Use Git for version control throughout development'
      ],
      resources: [
        'Project Ideas: Portfolio, Blog, Weather App, Quiz Game, Recipe Finder',
        'GitHub Pages Deployment Guide',
        'Web Performance Optimization Tips',
        'Web Accessibility Guidelines (WCAG)',
        'Git and GitHub Desktop Tutorial'
      ]
    }
  ]

  return (
    <div className="relative min-h-screen bg-slate-950 overflow-hidden">
      {/* 3D Background Scene */}
      <div className="fixed inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
          <WDPScene />
        </Canvas>
      </div>

      {/* Gradient Overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-blue-950/40 via-transparent to-slate-950/60 z-10 pointer-events-none" />

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
                <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400">
                  💻 Web Development Projects
                </h1>
                <p className="text-slate-300 mt-2 text-base md:text-lg">
                  Hands-on Projects to Master HTML, CSS & JavaScript
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Build Real Projects
              </h2>
              <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
                Learn web development through practical, hands-on projects. Each project is designed to build your skills progressively from HTML basics to full-stack applications.
              </p>
            </motion.div>
          </div>

          {/* Course Info Banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 backdrop-blur-xl rounded-3xl p-8 border border-blue-500/30 mb-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-2">📚</div>
                <div className="text-2xl font-bold text-blue-300">BC03001051</div>
                <div className="text-slate-400 text-sm">Course Code</div>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">🎓</div>
                <div className="text-2xl font-bold text-cyan-300">Semester 3</div>
                <div className="text-slate-400 text-sm">BCA Program</div>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">⚡</div>
                <div className="text-2xl font-bold text-purple-300">60 Hours</div>
                <div className="text-slate-400 text-sm">Lab Practice</div>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">🚀</div>
                <div className="text-2xl font-bold text-green-300">{projects.length} Projects</div>
                <div className="text-slate-400 text-sm">Progressive Learning</div>
              </div>
            </div>
          </motion.div>

          {/* Course Outcomes */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="bg-slate-900/60 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/50 mb-12"
          >
            <h3 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-4xl">🎯</span>
              What You'll Learn
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                'Create structured web pages using HTML elements',
                'Style and layout web pages using CSS',
                'Add interactivity to web pages using JavaScript',
                'Understand and manipulate the DOM',
                'Develop complete web applications'
              ].map((outcome, i) => (
                <div key={i} className="flex items-start gap-3 bg-slate-800/50 rounded-xl p-4 border border-slate-700/30">
                  <div className="text-2xl">✓</div>
                  <p className="text-slate-300">{outcome}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Projects Section */}
          <div className="mb-12">
            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-4xl font-bold text-white mb-8 flex items-center gap-3"
            >
              <span className="text-5xl">🛠️</span>
              Suggested Project List
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-slate-400 text-lg mb-8"
            >
              Work through these projects progressively to build a strong foundation in web development. Each project includes detailed implementation guides and bonus challenges.
            </motion.p>
          </div>

          {/* Project Cards */}
          <div className="space-y-8">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>

          {/* Footer CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-16 text-center bg-gradient-to-r from-blue-900/40 to-purple-900/40 backdrop-blur-xl rounded-3xl p-12 border border-blue-500/30"
          >
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-3xl font-bold text-white mb-4">
              Ready to Start Building?
            </h3>
            <p className="text-slate-300 text-lg mb-6 max-w-2xl mx-auto">
              Start with Project #1 and work your way up. Remember, the best way to learn web development is by building real projects!
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/30 text-lg"
              >
                Back to Top ↑
              </button>
              <button
                onClick={() => navigate('/')}
                className="px-8 py-4 bg-slate-700/50 hover:bg-slate-600/50 text-white font-bold rounded-xl transition-all border border-slate-600 text-lg"
              >
                Home
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default WDP
