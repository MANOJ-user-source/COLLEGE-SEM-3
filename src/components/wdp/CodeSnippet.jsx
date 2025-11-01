import { useState } from 'react'
import { motion } from 'framer-motion'

/**
 * CodeSnippet Component
 * Displays syntax-highlighted code with copy functionality
 */
function CodeSnippet({ code, language = 'html', title, showLineNumbers = true }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const languageColors = {
    html: 'from-orange-500 to-red-500',
    css: 'from-blue-500 to-cyan-500',
    javascript: 'from-yellow-500 to-orange-500',
    js: 'from-yellow-500 to-orange-500'
  }

  const languageIcons = {
    html: '🌐',
    css: '🎨',
    javascript: '⚡',
    js: '⚡'
  }

  // Simple syntax highlighting (basic)
  const highlightCode = (code, lang) => {
    const lines = code.split('\n')

    return lines.map((line, index) => {
      let highlightedLine = line

      if (lang === 'html') {
        // Highlight HTML tags
        highlightedLine = highlightedLine
          .replace(/(&lt;[^&]*&gt;|<[^>]*>)/g, '<span class="text-blue-400">$1</span>')
          .replace(/(\w+)=/g, '<span class="text-purple-400">$1</span>=')
          .replace(/"([^"]*)"/g, '"<span class="text-green-400">$1</span>"')
      } else if (lang === 'css') {
        // Highlight CSS
        highlightedLine = highlightedLine
          .replace(/([.#][\w-]+)/g, '<span class="text-yellow-400">$1</span>')
          .replace(/([\w-]+):/g, '<span class="text-blue-400">$1</span>:')
          .replace(/:\s*([^;{]+)/g, ': <span class="text-green-400">$1</span>')
      } else if (lang === 'javascript' || lang === 'js') {
        // Highlight JavaScript
        highlightedLine = highlightedLine
          .replace(/\b(const|let|var|function|return|if|else|for|while)\b/g, '<span class="text-purple-400">$1</span>')
          .replace(/\b(true|false|null|undefined)\b/g, '<span class="text-orange-400">$1</span>')
          .replace(/"([^"]*)"/g, '"<span class="text-green-400">$1</span>"')
          .replace(/'([^']*)'/g, "'<span class=\"text-green-400\">$1</span>'")
          .replace(/\/\/(.*)/g, '<span class="text-gray-500">//$1</span>')
      }

      return (
        <div key={index} className="flex">
          {showLineNumbers && (
            <span className="select-none text-slate-600 pr-4 text-right w-12 flex-shrink-0">
              {index + 1}
            </span>
          )}
          <span dangerouslySetInnerHTML={{ __html: highlightedLine || ' ' }} />
        </div>
      )
    })
  }

  const gradient = languageColors[language.toLowerCase()] || 'from-gray-500 to-slate-500'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative group"
    >
      {/* Header */}
      <div className={`flex items-center justify-between px-6 py-3 bg-gradient-to-r ${gradient} rounded-t-xl`}>
        <div className="flex items-center gap-2">
          <span className="text-2xl">{languageIcons[language.toLowerCase()] || '💻'}</span>
          <div>
            {title && <h4 className="text-white font-bold">{title}</h4>}
            <span className="text-white/80 text-sm uppercase tracking-wider">{language}</span>
          </div>
        </div>
        <button
          onClick={handleCopy}
          className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all flex items-center gap-2 backdrop-blur-sm"
        >
          {copied ? (
            <>
              <span>✓</span>
              <span>Copied!</span>
            </>
          ) : (
            <>
              <span>📋</span>
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Block */}
      <div className="relative bg-slate-900 rounded-b-xl overflow-hidden">
        <pre className="p-6 overflow-x-auto text-sm font-mono leading-relaxed text-slate-300">
          <code>{highlightCode(code, language.toLowerCase())}</code>
        </pre>

        {/* Decorative gradient overlay */}
        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${gradient} opacity-5 blur-3xl pointer-events-none`} />
      </div>
    </motion.div>
  )
}

export default CodeSnippet
