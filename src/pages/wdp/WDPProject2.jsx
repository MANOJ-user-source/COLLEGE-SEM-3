import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import ProjectHero from '../../components/wdp/ProjectHero'
import CollapsibleCode from '../../components/wdp/CollapsibleCode'
import LiveDemo from '../../components/wdp/LiveDemo'
import ProjectNavigation from '../../components/wdp/ProjectNavigation'
import wdpProjects from '../../data/wdp/projects'

/**
 * WDP Project 2: Product Showcase Page
 * Focus: CSS Styling & Box Model
 */
function WDPProject2() {
  const project = wdpProjects.find(p => p.id === 2)

  // Sample HTML code for product showcase
  const productHTML = `<div class="container">
  <header class="header">
    <h1>Premium Products</h1>
    <p>Discover our amazing collection</p>
  </header>

  <div class="product-grid">
    <div class="product-card">
      <div class="product-image">
        <div class="badge">New</div>
        <div class="image-placeholder">📱</div>
      </div>
      <div class="product-info">
        <h3>Smartphone Pro</h3>
        <p class="description">Latest technology with amazing features</p>
        <div class="price">$999</div>
        <button class="btn">Add to Cart</button>
      </div>
    </div>

    <div class="product-card">
      <div class="product-image">
        <div class="badge sale">Sale</div>
        <div class="image-placeholder">💻</div>
      </div>
      <div class="product-info">
        <h3>Laptop Ultra</h3>
        <p class="description">Powerful performance for professionals</p>
        <div class="price">
          <span class="old-price">$1499</span>
          $1299
        </div>
        <button class="btn">Add to Cart</button>
      </div>
    </div>

    <div class="product-card">
      <div class="product-image">
        <div class="image-placeholder">🎧</div>
      </div>
      <div class="product-info">
        <h3>Wireless Headphones</h3>
        <p class="description">Premium sound quality</p>
        <div class="price">$299</div>
        <button class="btn">Add to Cart</button>
      </div>
    </div>
  </div>
</div>`

  // CSS styling with box model, colors, and effects
  const productCSS = `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  padding: 2rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  text-align: center;
  color: white;
  margin-bottom: 3rem;
  animation: fadeInDown 0.8s ease;
}

.header h1 {
  font-size: 3rem;
  margin-bottom: 0.5rem;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

.header p {
  font-size: 1.2rem;
  opacity: 0.9;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.product-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  animation: fadeInUp 0.8s ease;
}

.product-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.4);
}

.product-image {
  position: relative;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-placeholder {
  font-size: 5rem;
  animation: bounce 2s infinite;
}

.badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: #10b981;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-weight: bold;
  font-size: 0.85rem;
  text-transform: uppercase;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
}

.badge.sale {
  background: #ef4444;
}

.product-info {
  padding: 1.5rem;
}

.product-info h3 {
  font-size: 1.5rem;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.description {
  color: #6b7280;
  margin-bottom: 1rem;
  line-height: 1.6;
}

.price {
  font-size: 2rem;
  font-weight: bold;
  color: #667eea;
  margin-bottom: 1rem;
}

.old-price {
  font-size: 1.2rem;
  color: #9ca3af;
  text-decoration: line-through;
  margin-right: 0.5rem;
}

.btn {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.btn:hover {
  transform: scale(1.05);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

.btn:active {
  transform: scale(0.98);
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

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

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}`

  // Simple JavaScript for interactivity
  const productJS = `// Add interactivity to buttons
document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', function() {
    const productName = this.closest('.product-card')
      .querySelector('h3').textContent;

    // Change button text temporarily
    const originalText = this.textContent;
    this.textContent = '✓ Added!';
    this.style.background = '#10b981';

    // Show alert
    setTimeout(() => {
      alert(productName + ' has been added to your cart!');
      this.textContent = originalText;
      this.style.background = '';
    }, 500);
  });
});

// Add hover effect to product cards
document.querySelectorAll('.product-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.borderLeft = '5px solid #667eea';
  });

  card.addEventListener('mouseleave', function() {
    this.style.borderLeft = 'none';
  });
});`

  return (
    <div className="relative min-h-screen bg-slate-950 overflow-hidden">
      {/* 3D Background */}
      <div className="fixed inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 10] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} color="#8b5cf6" />
          <pointLight position={[-10, -10, -10]} color="#ec4899" />
          <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.3} />
        </Canvas>
      </div>

      {/* Gradient Overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-purple-950/40 via-transparent to-slate-950/60 z-10 pointer-events-none" />

      {/* Content */}
      <div className="relative z-20">
        {/* Hero Section */}
        <ProjectHero project={project} />

        {/* Main Content */}
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
                In this project, you'll learn CSS styling fundamentals by creating a beautiful product showcase page.
                Master the CSS box model, colors, typography, shadows, and transitions to make your products stand out!
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="bg-purple-900/20 border border-purple-500/30 rounded-xl p-6">
                  <div className="text-3xl mb-2">🎯</div>
                  <h4 className="text-purple-300 font-bold mb-2">Goal</h4>
                  <p className="text-slate-300 text-sm">
                    Create an attractive product showcase using advanced CSS styling techniques
                  </p>
                </div>
                <div className="bg-pink-900/20 border border-pink-500/30 rounded-xl p-6">
                  <div className="text-3xl mb-2">💡</div>
                  <h4 className="text-pink-300 font-bold mb-2">Key Concept</h4>
                  <p className="text-slate-300 text-sm">
                    Understanding the box model, selectors, and visual hierarchy
                  </p>
                </div>
                <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-6">
                  <div className="text-3xl mb-2">⚡</div>
                  <h4 className="text-blue-300 font-bold mb-2">Difficulty</h4>
                  <p className="text-slate-300 text-sm">
                    Beginner-friendly with focus on CSS fundamentals
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
              Live Demo
            </h2>
            <LiveDemo
              html={productHTML}
              css={productCSS}
              js={productJS}
              title="Product Showcase Page"
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
                description="The HTML creates a product grid with individual product cards. Each card contains an image area, product info, pricing, and an action button."
                code={productHTML}
                language="html"
                fileName="index.html"
              />

              <CollapsibleCode
                title="CSS Styling"
                description="Advanced CSS featuring: CSS Grid layout, gradients, shadows, transitions, hover effects, and animations. Notice the box model properties (padding, margin, border) in action!"
                code={productCSS}
                language="css"
                fileName="styles.css"
              />

              <CollapsibleCode
                title="JavaScript Interactivity"
                description="Add dynamic behavior: button clicks show confirmations and cards respond to mouse events."
                code={productJS}
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
                    <span className="flex-shrink-0 w-8 h-8 bg-purple-500/20 text-purple-300 rounded-full flex items-center justify-center font-bold text-sm border border-purple-500/50">
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
            <div className="bg-pink-900/20 rounded-3xl p-8 border border-pink-500/30">
              <p className="text-pink-200 mb-6">
                Take your CSS skills to the next level with these challenges:
              </p>
              <ul className="space-y-3">
                {project.challenges.map((challenge, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-pink-400 text-xl">★</span>
                    <span className="text-slate-300">{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.section>

          {/* Project Navigation */}
          <ProjectNavigation currentProjectId={project.id} />
        </div>
      </div>
    </div>
  )
}

export default WDPProject2
