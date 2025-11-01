import { motion } from 'framer-motion'

function HomeOverlay() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Top header */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute top-0 left-0 right-0 p-8 z-10"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              Semester 3
            </h1>
            <p className="text-slate-300 text-sm md:text-base">
              Interactive 3D Learning Experience
            </p>
          </div>
        </div>
      </motion.div>

      {/* Center title */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-0"
      >
        <h2 className="text-6xl md:text-8xl font-black text-white/5 select-none">
          EXPLORE
        </h2>
      </motion.div>

      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-transparent to-slate-950/50 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/30 via-transparent to-slate-950/30 pointer-events-none" />
    </div>
  )
}

export default HomeOverlay
