import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

/**
 * ProjectHero Component
 * Hero section for individual project detail pages
 */
function ProjectHero({ project }) {
  const navigate = useNavigate()

  const difficultyColors = {
    'Beginner': 'from-green-500 to-emerald-500',
    'Intermediate': 'from-yellow-500 to-orange-500',
    'Advanced': 'from-red-500 to-pink-500'
  }

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-slate-900/80 to-transparent backdrop-blur-xl border-b border-slate-700/50">
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute -top-1/2 -right-1/4 w-96 h-96 bg-gradient-to-br from-${project.colorTheme.primary} to-${project.colorTheme.secondary} opacity-10 blur-3xl rounded-full`}
        />
        <div
          className={`absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-gradient-to-tr from-${project.colorTheme.primary} to-${project.colorTheme.secondary} opacity-10 blur-3xl rounded-full`}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/wdp')}
          className="mb-8 flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800/50 hover:bg-slate-700/50 transition-all border border-slate-700/50 group"
        >
          <svg
            className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="text-slate-400 group-hover:text-white transition-colors">Back to Projects</span>
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left: Project Info */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {/* Project Number & Difficulty */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-blue-400 font-bold text-lg">Project #{project.id}</span>
                <span
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold bg-gradient-to-r ${
                    difficultyColors[project.difficulty]
                  } text-white`}
                >
                  {project.difficulty}
                </span>
                <span className="px-4 py-1.5 rounded-full text-sm font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                  {project.category}
                </span>
              </div>

              {/* Title */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-7xl">{project.icon}</span>
                <h1
                  className={`text-5xl md:text-6xl font-bold bg-gradient-to-r ${project.colorTheme.gradient} text-transparent bg-clip-text`}
                >
                  {project.title}
                </h1>
              </div>

              {/* Description */}
              <p className="text-xl text-slate-300 leading-relaxed mb-8">{project.shortDescription}</p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                {project.liveDemo && (
                  <a
                    href={project.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-8 py-4 bg-gradient-to-r ${project.colorTheme.gradient} hover:shadow-2xl hover:scale-105 text-white font-bold rounded-xl transition-all shadow-lg flex items-center gap-2`}
                  >
                    <span>🚀</span>
                    <span>View Live Demo</span>
                  </a>
                )}
                {project.githubRepo && (
                  <a
                    href={project.githubRepo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-all border border-slate-600 flex items-center gap-2"
                  >
                    <span>⚙️</span>
                    <span>View Code</span>
                  </a>
                )}
                {!project.liveDemo && !project.githubRepo && (
                  <div className="px-8 py-4 bg-slate-800/50 text-slate-400 font-semibold rounded-xl border border-slate-700/50">
                    💡 Project In Development
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Right: Project Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <div className={`bg-gradient-to-br ${project.colorTheme.gradient} p-6 rounded-2xl text-white`}>
              <h3 className="text-sm uppercase tracking-wider opacity-90 mb-2">Project Stats</h3>
              <div className="space-y-4 mt-4">
                <div>
                  <div className="text-sm opacity-80">Completed</div>
                  <div className="text-2xl font-bold">{project.completedDate || 'In Progress'}</div>
                </div>
                <div>
                  <div className="text-sm opacity-80">Duration</div>
                  <div className="text-2xl font-bold">{project.duration}</div>
                </div>
                <div>
                  <div className="text-sm opacity-80">Lines of Code</div>
                  <div className="text-2xl font-bold">{project.linesOfCode?.toLocaleString() || 'N/A'}</div>
                </div>
              </div>
            </div>

            {/* Technologies */}
            <div className="bg-slate-800/50 backdrop-blur-xl p-6 rounded-2xl border border-slate-700/50">
              <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                <span>💻</span>
                <span>Technologies Used</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 bg-slate-900 text-slate-300 rounded-lg text-sm font-semibold border border-slate-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default ProjectHero
