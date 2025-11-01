import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CodeSnippet from './CodeSnippet'

/**
 * CollapsibleCode Component
 * Expandable/collapsible code section with smooth animation
 */
function CollapsibleCode({ title, description, code, language, fileName, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="mb-6">
      {/* Clickable Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-slate-800/50 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50 hover:bg-slate-800/70 transition-all group"
      >
        <div className="flex items-center justify-between">
          <div className="text-left flex-1">
            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
              {title}
            </h3>
            {description && (
              <p className="text-slate-300 text-sm">{description}</p>
            )}
          </div>
          <div className="ml-4 flex-shrink-0">
            <motion.svg
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="w-6 h-6 text-blue-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </motion.svg>
          </div>
        </div>
      </button>

      {/* Collapsible Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="pt-4">
              <CodeSnippet code={code} language={language} title={fileName} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default CollapsibleCode
