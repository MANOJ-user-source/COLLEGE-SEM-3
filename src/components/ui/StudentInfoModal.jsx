import { motion, AnimatePresence } from 'framer-motion'

function StudentInfoModal({ isOpen, onClose }) {
  if (!isOpen) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900 rounded-2xl p-8 max-w-2xl w-full border border-purple-500/30 shadow-2xl shadow-purple-500/20"
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Header */}
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                  className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 flex items-center justify-center shadow-lg shadow-orange-500/50"
                >
                  <span className="text-5xl">☀️</span>
                </motion.div>
                <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 mb-2">
                  Student Information
                </h2>
                <p className="text-slate-400 text-sm">The Center of This Solar System</p>
              </div>

              {/* Student Details */}
              <div className="space-y-4">
                <InfoRow label="Name" value="MANOJ TIWARI RAMCHANDRA" />
                <InfoRow label="Institute" value="Ahmedabad Institute of Technology" />
                <InfoRow label="Course" value="BCA-B - Semester 3" />
                <InfoRow label="Enrollment No" value="24303060119" />
                <InfoRow label="Email" value="manoj.r.tiwari17@gmail.com" />
                <InfoRow label="Contact" value="+91 9016938856" />
              </div>

              {/* Footer */}
              <div className="mt-8 pt-6 border-t border-purple-500/30 text-center">
                <p className="text-slate-400 text-sm">
                  Interactive 3D Website Project • Semester 3 Assignment
                </p>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

function InfoRow({ label, value }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700/50 hover:border-purple-500/50 transition-colors"
    >
      <span className="text-purple-400 font-semibold min-w-[140px]">{label}:</span>
      <span className="text-white font-medium">{value}</span>
    </motion.div>
  )
}

export default StudentInfoModal
