import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import wdpProjects from '../../data/wdp/projects'

/**
 * ProjectNavigation Component
 * Navigation between projects (Previous/Next)
 */
function ProjectNavigation({ currentProjectId }) {
  const navigate = useNavigate()
  const currentIndex = wdpProjects.findIndex(p => p.id === currentProjectId)

  const previousProject = currentIndex > 0 ? wdpProjects[currentIndex - 1] : null
  const nextProject = currentIndex < wdpProjects.length - 1 ? wdpProjects[currentIndex + 1] : null

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16"
    >
      {/* Previous Project */}
      {previousProject ? (
        <button
          onClick={() => navigate(`/wdp/${previousProject.slug}`)}
          className={`group relative bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 hover:border-${previousProject.colorTheme.primary}/50 transition-all text-left overflow-hidden`}
        >
          {/* Background Gradient */}
          <div className={`absolute inset-0 bg-gradient-to-r ${previousProject.colorTheme.gradient} opacity-0 group-hover:opacity-10 transition-opacity`} />

          <div className="relative">
            <div className="text-slate-400 text-sm mb-2 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>Previous Project</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-4xl">{previousProject.icon}</span>
              <div>
                <h4 className="text-white font-bold text-lg group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-cyan-400 transition-all">
                  {previousProject.title}
                </h4>
                <p className="text-slate-400 text-sm">{previousProject.category}</p>
              </div>
            </div>
          </div>
        </button>
      ) : (
        <div className="bg-slate-900/40 rounded-2xl p-6 border border-slate-800/50 text-slate-600 text-center">
          No previous project
        </div>
      )}

      {/* Next Project */}
      {nextProject ? (
        <button
          onClick={() => navigate(`/wdp/${nextProject.slug}`)}
          className={`group relative bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 hover:border-${nextProject.colorTheme.primary}/50 transition-all text-right overflow-hidden`}
        >
          {/* Background Gradient */}
          <div className={`absolute inset-0 bg-gradient-to-r ${nextProject.colorTheme.gradient} opacity-0 group-hover:opacity-10 transition-opacity`} />

          <div className="relative">
            <div className="text-slate-400 text-sm mb-2 flex items-center justify-end gap-2">
              <span>Next Project</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <div className="flex items-center justify-end gap-3">
              <div>
                <h4 className="text-white font-bold text-lg group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all">
                  {nextProject.title}
                </h4>
                <p className="text-slate-400 text-sm">{nextProject.category}</p>
              </div>
              <span className="text-4xl">{nextProject.icon}</span>
            </div>
          </div>
        </button>
      ) : (
        <div className="bg-slate-900/40 rounded-2xl p-6 border border-slate-800/50 text-slate-600 text-center">
          No next project
        </div>
      )}
    </motion.div>
  )
}

export default ProjectNavigation
