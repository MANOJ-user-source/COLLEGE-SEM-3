import { useState } from 'react'
import { motion } from 'framer-motion'

/**
 * LiveDemo Component
 * Displays live output of HTML/CSS/JS code
 * Can show as iframe, embedded component, or side-by-side view
 */
function LiveDemo({
  html = '',
  css = '',
  js = '',
  title = 'Live Demo',
  mode = 'iframe', // 'iframe', 'split', 'fullscreen'
  height = '500px'
}) {
  const [view, setView] = useState(mode)
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Combine HTML, CSS, and JS into a single document
  const generateHTML = () => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    ${css}
  </style>
</head>
<body>
  ${html}
  <script>
    ${js}
  </script>
</body>
</html>
    `.trim()
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  return (
    <div className={`relative ${isFullscreen ? 'fixed inset-0 z-50 bg-slate-950' : ''}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`bg-slate-900/80 backdrop-blur-xl rounded-3xl overflow-hidden border border-slate-700/50 ${isFullscreen ? 'h-full m-4' : ''}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-500">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🖥️</span>
            <h3 className="text-white font-bold text-lg">{title}</h3>
          </div>
          <div className="flex items-center gap-2">
            {/* View Mode Buttons */}
            {!isFullscreen && (
              <div className="flex gap-1 bg-white/20 rounded-lg p-1">
                <button
                  onClick={() => setView('iframe')}
                  className={`px-3 py-1 rounded text-sm font-semibold transition-all ${
                    view === 'iframe'
                      ? 'bg-white text-green-600'
                      : 'text-white hover:bg-white/10'
                  }`}
                  title="Output Only"
                >
                  Output
                </button>
                <button
                  onClick={() => setView('split')}
                  className={`px-3 py-1 rounded text-sm font-semibold transition-all ${
                    view === 'split'
                      ? 'bg-white text-green-600'
                      : 'text-white hover:bg-white/10'
                  }`}
                  title="Side by Side"
                >
                  Split
                </button>
              </div>
            )}

            {/* Fullscreen Button */}
            <button
              onClick={toggleFullscreen}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all"
              title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            >
              {isFullscreen ? '✕' : '⛶'}
            </button>
          </div>
        </div>

        {/* Demo Content */}
        <div className={`${isFullscreen ? 'h-[calc(100%-4rem)]' : ''}`}>
          {view === 'iframe' && (
            <div style={{ height: isFullscreen ? '100%' : height }} className="bg-white">
              <iframe
                srcDoc={generateHTML()}
                title={title}
                className="w-full h-full border-0"
                sandbox="allow-scripts"
              />
            </div>
          )}

          {view === 'split' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4" style={{ height: isFullscreen ? '100%' : height }}>
              {/* Code Preview */}
              <div className="bg-slate-950 rounded-xl p-4 overflow-auto">
                <div className="text-slate-400 text-sm font-mono mb-2">HTML</div>
                <pre className="text-slate-300 text-sm font-mono whitespace-pre-wrap">
                  <code>{html || '// No HTML code provided'}</code>
                </pre>

                {css && (
                  <>
                    <div className="text-slate-400 text-sm font-mono mt-4 mb-2">CSS</div>
                    <pre className="text-slate-300 text-sm font-mono whitespace-pre-wrap">
                      <code>{css}</code>
                    </pre>
                  </>
                )}

                {js && (
                  <>
                    <div className="text-slate-400 text-sm font-mono mt-4 mb-2">JavaScript</div>
                    <pre className="text-slate-300 text-sm font-mono whitespace-pre-wrap">
                      <code>{js}</code>
                    </pre>
                  </>
                )}
              </div>

              {/* Live Output */}
              <div className="bg-white rounded-xl overflow-hidden">
                <div className="bg-slate-800 px-4 py-2 text-slate-300 text-sm font-semibold">
                  Output Preview
                </div>
                <iframe
                  srcDoc={generateHTML()}
                  title={`${title} - Output`}
                  className="w-full h-[calc(100%-2.5rem)] border-0"
                  sandbox="allow-scripts"
                />
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

export default LiveDemo
