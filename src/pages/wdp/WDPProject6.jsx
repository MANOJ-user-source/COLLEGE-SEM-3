import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import ProjectHero from '../../components/wdp/ProjectHero'
import CollapsibleCode from '../../components/wdp/CollapsibleCode'
import LiveDemo from '../../components/wdp/LiveDemo'
import ProjectNavigation from '../../components/wdp/ProjectNavigation'
import wdpProjects from '../../data/wdp/projects'

/**
 * WDP Project 6: Full-Stack Mini Project
 * Capstone project combining all learned skills
 */
function WDPProject6() {
  const project = wdpProjects.find(p => p.id === 6)

  const projectHTML = `<div class="app-container">
  <!-- Navigation -->
  <nav class="navbar">
    <div class="nav-brand">🚀 MyApp</div>
    <ul class="nav-menu">
      <li><a href="#home" class="nav-link active">Home</a></li>
      <li><a href="#features" class="nav-link">Features</a></li>
      <li><a href="#about" class="nav-link">About</a></li>
    </ul>
    <button class="theme-toggle" onclick="toggleTheme()">🌓</button>
  </nav>

  <!-- Hero Section -->
  <section id="home" class="hero">
    <div class="hero-content">
      <h1 class="hero-title">Welcome to Your Mini Project</h1>
      <p class="hero-subtitle">A full-stack web application showcasing your skills</p>
      <button class="btn-primary" onclick="scrollToFeatures()">Explore Features</button>
    </div>
    <div class="hero-image">
      <div class="floating-card">
        <div class="card-icon">💻</div>
        <h3>Interactive</h3>
      </div>
    </div>
  </section>

  <!-- Features Section -->
  <section id="features" class="features">
    <h2 class="section-title">Amazing Features</h2>
    <div class="feature-grid">
      <div class="feature-card">
        <div class="feature-icon">🎨</div>
        <h3>Beautiful Design</h3>
        <p>Modern and responsive UI</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">⚡</div>
        <h3>Fast Performance</h3>
        <p>Optimized and efficient code</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">📱</div>
        <h3>Mobile Friendly</h3>
        <p>Works on all devices</p>
      </div>
      <div class="feature-card">
        <div class="feature-icon">🔒</div>
        <h3>Secure</h3>
        <p>Built with best practices</p>
      </div>
    </div>
  </section>

  <!-- Interactive Dashboard -->
  <section class="dashboard">
    <h2 class="section-title">Your Dashboard</h2>
    <div class="dashboard-grid">
      <div class="stat-card">
        <div class="stat-value" id="userCount">0</div>
        <div class="stat-label">Users</div>
      </div>
      <div class="stat-card">
        <div class="stat-value" id="projectCount">0</div>
        <div class="stat-label">Projects</div>
      </div>
      <div class="stat-card">
        <div class="stat-value" id="taskCount">0</div>
        <div class="stat-label">Tasks</div>
      </div>
    </div>

    <div class="activity-feed">
      <h3>Recent Activity</h3>
      <ul id="activityList"></ul>
    </div>
  </section>

  <!-- Footer -->
  <footer class="footer">
    <p>&copy; 2025 MyApp. Built with HTML, CSS & JavaScript</p>
    <div class="social-links">
      <a href="#">GitHub</a>
      <a href="#">LinkedIn</a>
      <a href="#">Twitter</a>
    </div>
  </footer>
</div>`

  const projectCSS = `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --primary: #667eea;
  --secondary: #764ba2;
  --bg-primary: #ffffff;
  --bg-secondary: #f9fafb;
  --text-primary: #1f2937;
  --text-secondary: #6b7280;
  --border: #e5e7eb;
}

.dark-theme {
  --primary: #818cf8;
  --secondary: #a78bfa;
  --bg-primary: #1f2937;
  --bg-secondary: #111827;
  --text-primary: #f9fafb;
  --text-secondary: #d1d5db;
  --border: #374151;
}

body {
  font-family: 'Segoe UI', system-ui, sans-serif;
  background: var(--bg-primary);
  color: var(--text-primary);
  transition: all 0.3s ease;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 5%;
  background: var(--bg-primary);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(10px);
}

.nav-brand {
  font-size: 1.5rem;
  font-weight: bold;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.nav-menu {
  display: flex;
  list-style: none;
  gap: 2rem;
}

.nav-link {
  color: var(--text-secondary);
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s;
}

.nav-link:hover,
.nav-link.active {
  color: var(--primary);
}

.theme-toggle {
  background: var(--bg-secondary);
  border: none;
  padding: 0.75rem;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.5rem;
  transition: transform 0.3s;
}

.theme-toggle:hover {
  transform: scale(1.1);
}

.hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  padding: 6rem 5%;
  min-height: 80vh;
  align-items: center;
}

.hero-content {
  animation: fadeInLeft 0.8s ease;
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.hero-title {
  font-size: 3.5rem;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-subtitle {
  font-size: 1.5rem;
  color: var(--text-secondary);
  margin-bottom: 2rem;
}

.btn-primary {
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: white;
  border: none;
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  font-weight: bold;
  border-radius: 50px;
  cursor: pointer;
  transition: transform 0.3s;
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
}

.btn-primary:hover {
  transform: translateY(-3px);
}

.hero-image {
  display: flex;
  justify-content: center;
  align-items: center;
}

.floating-card {
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: white;
  padding: 3rem;
  border-radius: 30px;
  box-shadow: 0 30px 60px rgba(0,0,0,0.2);
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

.card-icon {
  font-size: 5rem;
  text-align: center;
  margin-bottom: 1rem;
}

.features {
  padding: 6rem 5%;
  background: var(--bg-secondary);
}

.section-title {
  text-align: center;
  font-size: 3rem;
  margin-bottom: 3rem;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.feature-card {
  background: var(--bg-primary);
  padding: 2rem;
  border-radius: 20px;
  text-align: center;
  border: 2px solid var(--border);
  transition: transform 0.3s;
}

.feature-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.dashboard {
  padding: 6rem 5%;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.stat-card {
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: white;
  padding: 2rem;
  border-radius: 20px;
  text-align: center;
}

.stat-value {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.activity-feed {
  background: var(--bg-secondary);
  padding: 2rem;
  border-radius: 20px;
}

.activity-feed ul {
  list-style: none;
  padding: 1rem 0;
}

.activity-feed li {
  padding: 1rem;
  margin: 0.5rem 0;
  background: var(--bg-primary);
  border-radius: 10px;
  border-left: 4px solid var(--primary);
}

.footer {
  background: var(--text-primary);
  color: var(--bg-primary);
  padding: 3rem 5%;
  text-align: center;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 1rem;
}

.social-links a {
  color: var(--bg-primary);
  text-decoration: none;
  transition: opacity 0.3s;
}

.social-links a:hover {
  opacity: 0.7;
}`

  const projectJS = `// Theme Toggle
let isDarkTheme = false;

function toggleTheme() {
  isDarkTheme = !isDarkTheme;
  document.body.classList.toggle('dark-theme');
  localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
}

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  toggleTheme();
}

// Smooth Scroll
function scrollToFeatures() {
  document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
}

// Active Navigation
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    this.classList.add('active');

    const targetId = this.getAttribute('href').substring(1);
    document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
  });
});

// Animated Counter
function animateCounter(id, target) {
  const element = document.getElementById(id);
  let current = 0;
  const increment = target / 50;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 30);
}

// Initialize counters
animateCounter('userCount', 1234);
animateCounter('projectCount', 56);
animateCounter('taskCount', 789);

// Activity Feed
const activities = [
  '🎉 New user registered',
  '✅ Task completed: Design Review',
  '📁 Project created: Mobile App',
  '👥 Team meeting scheduled',
  '🚀 Feature deployed to production'
];

const activityList = document.getElementById('activityList');
activities.forEach((activity, index) => {
  setTimeout(() => {
    const li = document.createElement('li');
    li.textContent = activity;
    li.style.animation = 'fadeInUp 0.5s ease';
    activityList.appendChild(li);
  }, index * 200);
});

// Scroll Animation
const observerOptions = {
  threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeInUp 0.8s ease';
    }
  });
}, observerOptions);

document.querySelectorAll('.feature-card, .stat-card').forEach(el => {
  observer.observe(el);
});

// Add fadeInUp animation
const style = document.createElement('style');
style.textContent = \`
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
\`;
document.head.appendChild(style);`

  return (
    <div className="relative min-h-screen bg-slate-950 overflow-hidden">
      <div className="fixed inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 10] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} color="#6366f1" />
          <pointLight position={[-10, -10, -10]} color="#8b5cf6" />
          <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.3} />
        </Canvas>
      </div>

      <div className="fixed inset-0 bg-gradient-to-b from-indigo-950/40 via-transparent to-slate-950/60 z-10 pointer-events-none" />

      <div className="relative z-20">
        <ProjectHero project={project} />

        <div className="max-w-7xl mx-auto px-6 py-12">
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
                This is your capstone project! Combine everything you've learned to build a complete mini web application.
                Features include responsive design, dark mode, animated counters, smooth scrolling, and more!
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="bg-indigo-900/20 border border-indigo-500/30 rounded-xl p-6">
                  <div className="text-3xl mb-2">🎯</div>
                  <h4 className="text-indigo-300 font-bold mb-2">Goal</h4>
                  <p className="text-slate-300 text-sm">
                    Demonstrate mastery of HTML, CSS, and JavaScript
                  </p>
                </div>
                <div className="bg-purple-900/20 border border-purple-500/30 rounded-xl p-6">
                  <div className="text-3xl mb-2">💡</div>
                  <h4 className="text-purple-300 font-bold mb-2">Key Concept</h4>
                  <p className="text-slate-300 text-sm">
                    Integration of all skills learned throughout the course
                  </p>
                </div>
                <div className="bg-violet-900/20 border border-violet-500/30 rounded-xl p-6">
                  <div className="text-3xl mb-2">⚡</div>
                  <h4 className="text-violet-300 font-bold mb-2">Difficulty</h4>
                  <p className="text-slate-300 text-sm">
                    Advanced - comprehensive project
                  </p>
                </div>
              </div>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-5xl">🖥️</span>
              Live Demo - Full Application
            </h2>
            <div className="bg-indigo-900/20 border border-indigo-500/30 rounded-xl p-4 mb-4">
              <p className="text-indigo-200 text-sm">
                💡 <strong>Explore:</strong> Try the dark mode toggle, scroll through sections, and interact with all features!
              </p>
            </div>
            <LiveDemo
              html={projectHTML}
              css={projectCSS}
              js={projectJS}
              title="Full-Stack Mini Project"
              mode="iframe"
              height="800px"
            />
          </motion.section>

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
                description="Complete application structure with navigation, hero, features, dashboard, and footer sections."
                code={projectHTML}
                language="html"
                fileName="index.html"
              />

              <CollapsibleCode
                title="CSS Styling & Theming"
                description="Advanced CSS with CSS variables for theming, Grid & Flexbox layouts, animations, and responsive design."
                code={projectCSS}
                language="css"
                fileName="styles.css"
              />

              <CollapsibleCode
                title="JavaScript Features"
                description="Complete interactivity: theme toggle, smooth scrolling, animated counters, Intersection Observer API, and more!"
                code={projectJS}
                language="javascript"
                fileName="script.js"
              />
            </div>
          </motion.section>

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
                    <span className="flex-shrink-0 w-8 h-8 bg-indigo-500/20 text-indigo-300 rounded-full flex items-center justify-center font-bold text-sm border border-indigo-500/50">
                      {i + 1}
                    </span>
                    <span className="text-slate-300 pt-1">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </motion.section>

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
            <div className="bg-purple-900/20 rounded-3xl p-8 border border-purple-500/30">
              <p className="text-purple-200 mb-6">
                Take your project to the next level:
              </p>
              <ul className="space-y-3">
                {project.challenges.map((challenge, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-purple-400 text-xl">★</span>
                    <span className="text-slate-300">{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.section>

          {/* Congratulations Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mb-16"
          >
            <div className="bg-gradient-to-r from-indigo-900/40 to-purple-900/40 backdrop-blur-xl rounded-3xl p-12 border border-indigo-500/30 text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-4xl font-bold text-white mb-4">
                Congratulations!
              </h2>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                You've completed all 6 Web Development Projects! You now have the skills to build complete web
                applications. Keep building, keep learning, and keep growing!
              </p>
            </div>
          </motion.section>

          <ProjectNavigation currentProjectId={project.id} />
        </div>
      </div>
    </div>
  )
}

export default WDPProject6
