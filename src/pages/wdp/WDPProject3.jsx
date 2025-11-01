import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import ProjectHero from '../../components/wdp/ProjectHero'
import CollapsibleCode from '../../components/wdp/CollapsibleCode'
import LiveDemo from '../../components/wdp/LiveDemo'
import ProjectNavigation from '../../components/wdp/ProjectNavigation'
import wdpProjects from '../../data/wdp/projects'

/**
 * WDP Project 3: Responsive Multi-Column Layout
 * Focus: Flexbox, CSS Grid & Responsive Design
 */
function WDPProject3() {
  const project = wdpProjects.find(p => p.id === 3)

  // Responsive layout HTML
  const responsiveHTML = `<div class="page">
  <header class="header">
    <div class="logo">MyBrand</div>
    <nav class="nav">
      <a href="#home">Home</a>
      <a href="#about">About</a>
      <a href="#services">Services</a>
      <a href="#contact">Contact</a>
    </nav>
    <button class="menu-toggle">☰</button>
  </header>

  <main class="main-content">
    <aside class="sidebar">
      <h3>Categories</h3>
      <ul>
        <li>🎨 Design</li>
        <li>💻 Development</li>
        <li>📱 Mobile</li>
        <li>🚀 Marketing</li>
      </ul>
    </aside>

    <section class="content">
      <h1>Responsive Web Design</h1>
      <p>Learn how to create layouts that work on all devices</p>

      <div class="card-grid">
        <div class="card">
          <h3>📱 Mobile First</h3>
          <p>Start with mobile design and scale up</p>
        </div>
        <div class="card">
          <h3>🎯 Flexible Grids</h3>
          <p>Use CSS Grid and Flexbox</p>
        </div>
        <div class="card">
          <h3>🖼️ Fluid Images</h3>
          <p>Images that scale properly</p>
        </div>
        <div class="card">
          <h3>📐 Media Queries</h3>
          <p>Adapt to different screen sizes</p>
        </div>
      </div>
    </section>

    <aside class="widgets">
      <div class="widget">
        <h4>Popular Posts</h4>
        <ul>
          <li>CSS Grid Tutorial</li>
          <li>Flexbox Guide</li>
          <li>Responsive Images</li>
        </ul>
      </div>
    </aside>
  </main>

  <footer class="footer">
    <p>&copy; 2025 MyBrand. All rights reserved.</p>
  </footer>
</div>`

  // Responsive CSS with Flexbox and Grid
  const responsiveCSS = `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Arial', sans-serif;
  line-height: 1.6;
  color: #333;
}

/* Header with Flexbox */
.header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
}

.nav {
  display: flex;
  gap: 2rem;
}

.nav a {
  color: white;
  text-decoration: none;
  transition: opacity 0.3s;
}

.nav a:hover {
  opacity: 0.8;
}

.menu-toggle {
  display: none;
  background: none;
  border: 2px solid white;
  color: white;
  padding: 0.5rem 1rem;
  font-size: 1.2rem;
  cursor: pointer;
  border-radius: 5px;
}

/* Main Layout with CSS Grid */
.main-content {
  display: grid;
  grid-template-columns: 250px 1fr 300px;
  gap: 2rem;
  max-width: 1400px;
  margin: 2rem auto;
  padding: 0 2rem;
}

.sidebar {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 10px;
  height: fit-content;
}

.sidebar h3 {
  color: #667eea;
  margin-bottom: 1rem;
}

.sidebar ul {
  list-style: none;
}

.sidebar li {
  padding: 0.5rem;
  margin: 0.5rem 0;
  background: white;
  border-radius: 5px;
  cursor: pointer;
  transition: transform 0.2s;
}

.sidebar li:hover {
  transform: translateX(5px);
}

.content {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

.content h1 {
  color: #667eea;
  margin-bottom: 1rem;
}

/* Card Grid with Flexbox */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.card {
  background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%);
  padding: 1.5rem;
  border-radius: 10px;
  border: 2px solid #667eea20;
  transition: transform 0.3s, box-shadow 0.3s;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(102, 126, 234, 0.2);
}

.card h3 {
  color: #667eea;
  margin-bottom: 0.5rem;
}

.widgets {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 10px;
  height: fit-content;
}

.widget {
  margin-bottom: 1.5rem;
}

.widget h4 {
  color: #667eea;
  margin-bottom: 0.5rem;
}

.widget ul {
  list-style: none;
}

.widget li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #ddd;
}

.footer {
  background: #333;
  color: white;
  text-align: center;
  padding: 2rem;
  margin-top: 3rem;
}

/* Tablet: 768px and below */
@media (max-width: 768px) {
  .main-content {
    grid-template-columns: 1fr;
  }

  .sidebar,
  .widgets {
    display: none;
  }

  .nav {
    display: none;
  }

  .menu-toggle {
    display: block;
  }

  .card-grid {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }
}

/* Mobile: 480px and below */
@media (max-width: 480px) {
  .header {
    padding: 1rem;
  }

  .logo {
    font-size: 1.2rem;
  }

  .card-grid {
    grid-template-columns: 1fr;
  }

  .main-content {
    padding: 0 1rem;
  }

  .content {
    padding: 1rem;
  }
}`

  // JavaScript for menu toggle
  const responsiveJS = `// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

let menuOpen = false;

menuToggle.addEventListener('click', function() {
  menuOpen = !menuOpen;

  if (menuOpen) {
    nav.style.display = 'flex';
    nav.style.flexDirection = 'column';
    nav.style.position = 'absolute';
    nav.style.top = '60px';
    nav.style.right = '20px';
    nav.style.background = '#667eea';
    nav.style.padding = '1rem';
    nav.style.borderRadius = '10px';
    this.textContent = '✕';
  } else {
    nav.style.display = 'none';
    this.textContent = '☰';
  }
});

// Responsive behavior on window resize
window.addEventListener('resize', function() {
  if (window.innerWidth > 768) {
    nav.style.display = 'flex';
    nav.style.flexDirection = 'row';
    nav.style.position = 'static';
    nav.style.background = 'none';
    nav.style.padding = '0';
    menuToggle.textContent = '☰';
    menuOpen = false;
  } else {
    if (!menuOpen) {
      nav.style.display = 'none';
    }
  }
});`

  return (
    <div className="relative min-h-screen bg-slate-950 overflow-hidden">
      {/* 3D Background */}
      <div className="fixed inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 10] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} color="#10b981" />
          <pointLight position={[-10, -10, -10]} color="#14b8a6" />
          <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.3} />
        </Canvas>
      </div>

      {/* Gradient Overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-green-950/40 via-transparent to-slate-950/60 z-10 pointer-events-none" />

      {/* Content */}
      <div className="relative z-20">
        <ProjectHero project={project} />

        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Project Overview */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-5xl">📖</span>
              Project Overview
            </h2>
            <div className="bg-slate-900/60 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/50">
              <p className="text-slate-300 text-lg leading-relaxed mb-6">
                Master responsive web design! Learn to use CSS Grid for two-dimensional layouts and Flexbox for
                one-dimensional layouts. Implement media queries to make your site look perfect on desktop, tablet, and mobile.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="bg-green-900/20 border border-green-500/30 rounded-xl p-6">
                  <div className="text-3xl mb-2">🎯</div>
                  <h4 className="text-green-300 font-bold mb-2">Goal</h4>
                  <p className="text-slate-300 text-sm">
                    Build a fully responsive layout that adapts to all screen sizes
                  </p>
                </div>
                <div className="bg-teal-900/20 border border-teal-500/30 rounded-xl p-6">
                  <div className="text-3xl mb-2">💡</div>
                  <h4 className="text-teal-300 font-bold mb-2">Key Concept</h4>
                  <p className="text-slate-300 text-sm">
                    CSS Grid, Flexbox, and media queries working together
                  </p>
                </div>
                <div className="bg-cyan-900/20 border border-cyan-500/30 rounded-xl p-6">
                  <div className="text-3xl mb-2">⚡</div>
                  <h4 className="text-cyan-300 font-bold mb-2">Difficulty</h4>
                  <p className="text-slate-300 text-sm">
                    Intermediate - requires understanding of modern CSS
                  </p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Live Demo */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-5xl">🖥️</span>
              Live Demo - Try Resizing!
            </h2>
            <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-4 mb-4">
              <p className="text-blue-200 text-sm">
                💡 <strong>Tip:</strong> Use the browser's responsive mode (F12 → Toggle device toolbar) or resize your
                browser window to see how the layout adapts to different screen sizes!
              </p>
            </div>
            <LiveDemo
              html={responsiveHTML}
              css={responsiveCSS}
              js={responsiveJS}
              title="Responsive Multi-Column Layout"
              mode="iframe"
              height="700px"
            />
          </motion.section>

          {/* Code Breakdown */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-5xl">💻</span>
              Code Breakdown
            </h2>

            <div className="space-y-8">
              <CollapsibleCode
                title="HTML Structure"
                description="Semantic HTML with header, main content area (using CSS Grid for 3-column layout), and footer."
                code={responsiveHTML}
                language="html"
                fileName="index.html"
              />

              <CollapsibleCode
                title="Responsive CSS"
                description="Features CSS Grid for the main layout, Flexbox for the header navigation, and media queries for tablet (768px) and mobile (480px) breakpoints."
                code={responsiveCSS}
                language="css"
                fileName="styles.css"
              />

              <CollapsibleCode
                title="Mobile Menu JavaScript"
                description="Toggle mobile menu and handle window resize events for responsive behavior."
                code={responsiveJS}
                language="javascript"
                fileName="script.js"
              />
            </div>
          </motion.section>

          {/* Learning Outcomes */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-5xl">🎓</span>
              What You'll Learn
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.objectives.map((objective, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                  className="bg-slate-900/60 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50 flex items-start gap-3"
                >
                  <div className="text-2xl flex-shrink-0">✓</div>
                  <p className="text-slate-300">{objective}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Implementation Steps */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-5xl">📝</span>
              Implementation Steps
            </h2>
            <div className="bg-slate-900/60 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/50">
              <ol className="space-y-4">
                {project.steps.map((step, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-green-500/20 text-green-300 rounded-full flex items-center justify-center font-bold text-sm border border-green-500/50">
                      {i + 1}
                    </span>
                    <span className="text-slate-300 pt-1">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </motion.section>

          {/* Bonus Challenges */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-5xl">🏆</span>
              Bonus Challenges
            </h2>
            <div className="bg-teal-900/20 rounded-3xl p-8 border border-teal-500/30">
              <p className="text-teal-200 mb-6">
                Push your responsive design skills further:
              </p>
              <ul className="space-y-3">
                {project.challenges.map((challenge, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-teal-400 text-xl">★</span>
                    <span className="text-slate-300">{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.section>

          <ProjectNavigation currentProjectId={project.id} />
        </div>
      </div>
    </div>
  )
}

export default WDPProject3
