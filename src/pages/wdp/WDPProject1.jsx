import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import ProjectHero from '../../components/wdp/ProjectHero'
import CollapsibleCode from '../../components/wdp/CollapsibleCode'
import LiveDemo from '../../components/wdp/LiveDemo'
import ProjectNavigation from '../../components/wdp/ProjectNavigation'
import wdpProjects from '../../data/wdp/projects'

/**
 * WDP Project 1: Personal Portfolio Website
 * Focus: HTML Structure & Semantic Tags
 */
function WDPProject1() {
  const project = wdpProjects.find(p => p.id === 1)

  // Sample HTML code for the portfolio
  const portfolioHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Portfolio</title>
</head>
<body>
  <header>
    <h1>John Doe</h1>
    <nav>
      <ul>
        <li><a href="#about">About</a></li>
        <li><a href="#skills">Skills</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <section id="about">
      <h2>About Me</h2>
      <img src="profile.jpg" alt="Profile Picture">
      <p>I'm a passionate web developer...</p>
    </section>

    <section id="skills">
      <h2>My Skills</h2>
      <ul>
        <li>HTML5</li>
        <li>CSS3</li>
        <li>JavaScript</li>
      </ul>
    </section>

    <section id="projects">
      <h2>My Projects</h2>
      <article>
        <h3>Project 1</h3>
        <p>Description of project...</p>
      </article>
    </section>

    <section id="contact">
      <h2>Contact Me</h2>
      <form>
        <label for="name">Name:</label>
        <input type="text" id="name" required>

        <label for="email">Email:</label>
        <input type="email" id="email" required>

        <label for="message">Message:</label>
        <textarea id="message" required></textarea>

        <button type="submit">Send</button>
      </form>
    </section>
  </main>

  <footer>
    <p>&copy; 2025 John Doe. All rights reserved.</p>
  </footer>
</body>
</html>`

  // Sample CSS for styling
  const portfolioCSS = `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  line-height: 1.6;
  color: #333;
}

header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem;
  text-align: center;
}

header h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

nav ul {
  list-style: none;
  display: flex;
  justify-content: center;
  gap: 2rem;
}

nav a {
  color: white;
  text-decoration: none;
  font-weight: bold;
  transition: opacity 0.3s;
}

nav a:hover {
  opacity: 0.8;
}

main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

section {
  margin: 3rem 0;
  padding: 2rem;
  background: #f4f4f4;
  border-radius: 10px;
}

section h2 {
  color: #667eea;
  margin-bottom: 1.5rem;
  font-size: 2rem;
}

img {
  max-width: 200px;
  border-radius: 50%;
  display: block;
  margin: 1rem auto;
}

#skills ul {
  list-style: none;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

#skills li {
  background: #667eea;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 5px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 500px;
}

form label {
  font-weight: bold;
  color: #667eea;
}

form input,
form textarea {
  padding: 0.75rem;
  border: 2px solid #ddd;
  border-radius: 5px;
  font-family: inherit;
}

form input:focus,
form textarea:focus {
  outline: none;
  border-color: #667eea;
}

button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s;
}

button:hover {
  transform: scale(1.05);
}

footer {
  background: #333;
  color: white;
  text-align: center;
  padding: 2rem;
  margin-top: 3rem;
}`

  // Simple JavaScript for form validation
  const portfolioJS = `document.querySelector('form').addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  if (name && email && message) {
    alert('Thank you for your message, ' + name + '! I will get back to you soon.');
    this.reset();
  }
});`

  return (
    <div className="relative min-h-screen bg-slate-950 overflow-hidden">
      {/* 3D Background */}
      <div className="fixed inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 10] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.3} />
        </Canvas>
      </div>

      {/* Gradient Overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-blue-950/40 via-transparent to-slate-950/60 z-10 pointer-events-none" />

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
                This is your first web development project! You'll create a personal portfolio website using pure HTML.
                Focus on using semantic HTML5 tags to structure your content properly. This project will teach you the
                foundation of web development - creating well-structured, accessible HTML documents.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-6">
                  <div className="text-3xl mb-2">🎯</div>
                  <h4 className="text-blue-300 font-bold mb-2">Goal</h4>
                  <p className="text-slate-300 text-sm">
                    Create a complete portfolio webpage with multiple sections using semantic HTML
                  </p>
                </div>
                <div className="bg-purple-900/20 border border-purple-500/30 rounded-xl p-6">
                  <div className="text-3xl mb-2">💡</div>
                  <h4 className="text-purple-300 font-bold mb-2">Key Concept</h4>
                  <p className="text-slate-300 text-sm">
                    Understanding HTML document structure and semantic tags
                  </p>
                </div>
                <div className="bg-green-900/20 border border-green-500/30 rounded-xl p-6">
                  <div className="text-3xl mb-2">⚡</div>
                  <h4 className="text-green-300 font-bold mb-2">Difficulty</h4>
                  <p className="text-slate-300 text-sm">
                    Beginner-friendly, perfect for starting your web dev journey
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
              html={portfolioHTML}
              css={portfolioCSS}
              js={portfolioJS}
              title="Personal Portfolio Website"
              mode="iframe"
              height="600px"
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
                description="The HTML defines the structure of the portfolio using semantic tags like <header>, <nav>, <main>, and <section>."
                code={portfolioHTML}
                language="html"
                fileName="index.html"
              />

              <CollapsibleCode
                title="CSS Styling"
                description="Basic CSS to make the portfolio look professional with colors, spacing, and a responsive form."
                code={portfolioCSS}
                language="css"
                fileName="styles.css"
              />

              <CollapsibleCode
                title="JavaScript Interactivity"
                description="Simple form validation using JavaScript to enhance user experience."
                code={portfolioJS}
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
                    <span className="flex-shrink-0 w-8 h-8 bg-blue-500/20 text-blue-300 rounded-full flex items-center justify-center font-bold text-sm border border-blue-500/50">
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
            <div className="bg-purple-900/20 rounded-3xl p-8 border border-purple-500/30">
              <p className="text-purple-200 mb-6">
                Once you've completed the basic portfolio, try these advanced features:
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

          {/* Project Navigation */}
          <ProjectNavigation currentProjectId={project.id} />
        </div>
      </div>
    </div>
  )
}

export default WDPProject1
