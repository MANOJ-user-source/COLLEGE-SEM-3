import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float, MeshDistortMaterial, Sphere, Text3D, Center, Environment, Stars } from '@react-three/drei'
import { AnimatePresence, motion } from 'framer-motion'

// Animated Brain Shape (for Design Thinking)
function AnimatedBrain({ position, color }) {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
    }
  })

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} position={position} args={[1.2, 32, 32]}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.5}
          speed={2}
          roughness={0.2}
          metalness={0.8}
          emissive={color}
          emissiveIntensity={0.4}
        />
      </Sphere>
    </Float>
  )
}

// Lightbulb Idea Component
function IdeaBulb({ position }) {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.02
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1
      meshRef.current.scale.set(scale, scale, scale)
    }
  })

  return (
    <Float speed={3} rotationIntensity={2} floatIntensity={3}>
      <Sphere ref={meshRef} position={position} args={[0.8, 16, 16]}>
        <meshStandardMaterial
          color="#fbbf24"
          metalness={0.5}
          roughness={0.3}
          emissive="#fbbf24"
          emissiveIntensity={0.8}
        />
      </Sphere>
    </Float>
  )
}

// 3D Scene Component
function DTIScene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={2} color="#8b5cf6" />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#ec4899" />
      <spotLight position={[0, 15, 0]} angle={0.3} penumbra={1} intensity={2} color="#a78bfa" />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <Environment preset="sunset" />

      {/* Central Brain */}
      <AnimatedBrain position={[0, 1, 0]} color="#8b5cf6" />

      {/* Surrounding Ideas */}
      <IdeaBulb position={[-3, 2, 0]} />
      <IdeaBulb position={[3, 2, 0]} />
      <IdeaBulb position={[0, 3.5, -2]} />
      <IdeaBulb position={[-2, -1, 1]} />
      <IdeaBulb position={[2, -1, 1]} />

      {/* Additional spheres */}
      <AnimatedBrain position={[-4, 0, -3]} color="#ec4899" />
      <AnimatedBrain position={[4, 0, -3]} color="#06b6d4" />

      <OrbitControls
        enableZoom={true}
        enablePan={true}
        minDistance={8}
        maxDistance={25}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </>
  )
}

// Activity Card Component
function ActivityCard({ activity, index }) {
  const [isExpanded, setIsExpanded] = useState(false)

  const iconMap = {
    'Empathy Mapping': '🧠',
    'Interviews': '🎤',
    'Observation': '👁️',
    'Persona Creation': '👤',
    'Role Playing': '🎭',
    'Idea Generation': '💡',
    'Brainstorming': '🌪️',
    'Mind Mapping': '🗺️',
    'Lateral Thinking': '🔀',
    'Six Thinking Hats': '🎩'
  }

  const colorSchemes = [
    'from-purple-500 to-pink-500',
    'from-blue-500 to-cyan-500',
    'from-green-500 to-emerald-500',
    'from-yellow-500 to-orange-500',
    'from-pink-500 to-rose-500',
    'from-indigo-500 to-purple-500'
  ]

  const colorScheme = colorSchemes[index % colorSchemes.length]

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group relative"
    >
      <div className={`absolute inset-0 bg-gradient-to-r ${colorScheme}/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all`} />
      <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/50 group-hover:border-purple-500/50 transition-all hover:scale-105 transform duration-300">
        <div className="flex items-start gap-4">
          <div className={`text-6xl group-hover:scale-110 transition-transform duration-300`}>
            {iconMap[activity.title] || '✨'}
          </div>
          <div className="flex-1">
            <h3 className={`text-2xl font-bold bg-gradient-to-r ${colorScheme} text-transparent bg-clip-text mb-3`}>
              {activity.title}
            </h3>
            <p className="text-slate-300 text-base mb-4 leading-relaxed">
              {activity.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {activity.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800/80 text-slate-300 border border-slate-700"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Expand Button */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className={`px-4 py-2 rounded-xl bg-gradient-to-r ${colorScheme} text-white font-semibold text-sm hover:shadow-lg transition-all`}
            >
              {isExpanded ? '📖 Show Less' : '📚 Learn More'}
            </button>

            {/* Expanded Details */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 pt-4 border-t border-slate-700/50"
                >
                  <h4 className="text-purple-300 font-bold mb-2 flex items-center gap-2">
                    <span>🎯</span> Key Objectives:
                  </h4>
                  <ul className="space-y-2 mb-4">
                    {activity.objectives.map((obj, i) => (
                      <li key={i} className="text-slate-300 text-sm flex items-start gap-2">
                        <span className="text-purple-400 mt-1">•</span>
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>

                  <h4 className="text-cyan-300 font-bold mb-2 flex items-center gap-2">
                    <span>📝</span> How to Practice:
                  </h4>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {activity.howTo}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Main DTI Page Component
function DTI() {
  const navigate = useNavigate()

  const suggestedActivities = [
    {
      title: 'Empathy Mapping',
      description: 'Understand users deeply by mapping what they say, think, feel, and do. Create visual representations of user experiences to identify pain points and opportunities.',
      tags: ['User Research', 'Empathy', 'Visualization'],
      objectives: [
        'Develop deep understanding of user needs and motivations',
        'Identify gaps between what users say and what they do',
        'Create actionable insights from user research data',
        'Build empathy within your team for end users'
      ],
      howTo: 'Start by interviewing 3-5 users from your target audience. Document their responses and create a four-quadrant map with Says, Thinks, Does, and Feels. Look for patterns and contradictions. Use sticky notes to organize insights and identify the most critical user needs.'
    },
    {
      title: 'Interviews',
      description: 'Conduct structured conversations with users to gather qualitative insights. Learn to ask open-ended questions and practice active listening techniques.',
      tags: ['Communication', 'User Research', 'Data Collection'],
      objectives: [
        'Master the art of asking open-ended questions',
        'Practice active listening and note-taking skills',
        'Uncover hidden user needs and pain points',
        'Build rapport with interviewees for authentic responses'
      ],
      howTo: 'Prepare 8-10 open-ended questions starting with "How", "Why", or "Tell me about". Record the interview (with permission) and take notes on both verbal and non-verbal cues. Follow up on interesting responses with probing questions. Analyze transcripts to identify recurring themes.'
    },
    {
      title: 'Observation',
      description: 'Watch users in their natural environment to understand behavior patterns, workflows, and context. Notice what users do vs. what they say they do.',
      tags: ['Ethnography', 'Behavioral Research', 'Context'],
      objectives: [
        'Observe users in their natural environment without interference',
        'Document behavioral patterns and workflows',
        'Identify unspoken needs and workarounds',
        'Understand the context of product/service usage'
      ],
      howTo: 'Spend 1-2 hours observing users in their natural environment. Take detailed notes or photos (with permission). Look for workarounds, pain points, and moments of delight. Avoid asking questions during observation - just watch. Debrief afterwards to discuss findings.'
    },
    {
      title: 'Persona Creation',
      description: 'Build detailed fictional characters representing your target user segments. Include demographics, goals, frustrations, and behavioral patterns.',
      tags: ['User Modeling', 'Segmentation', 'Empathy'],
      objectives: [
        'Synthesize research data into actionable user archetypes',
        'Create shared understanding of target users across team',
        'Guide design decisions with user-centered perspective',
        'Prioritize features based on persona needs'
      ],
      howTo: 'Analyze your research data to identify 2-4 distinct user patterns. For each persona, create a profile with name, photo, background, goals, frustrations, tech proficiency, and a quote. Make them feel real and specific. Reference personas in all design discussions.'
    },
    {
      title: 'Role Playing',
      description: 'Step into your users\' shoes by acting out scenarios and experiences. Gain firsthand understanding of user challenges and emotions.',
      tags: ['Experiential Learning', 'Empathy Building', 'Team Activity'],
      objectives: [
        'Experience user challenges and emotions firsthand',
        'Identify gaps in current user experience',
        'Build team empathy through shared experience',
        'Generate ideas for improvements from user perspective'
      ],
      howTo: 'Assign team members different user personas. Act out key scenarios from start to finish, including all touchpoints and interactions. Use props and simulate real conditions. Discuss emotions and frustrations experienced. Document insights and improvement opportunities.'
    },
    {
      title: 'Idea Generation',
      description: 'Generate a large quantity of diverse ideas without judgment. Focus on divergent thinking to explore all possibilities before converging on solutions.',
      tags: ['Creativity', 'Innovation', 'Problem Solving'],
      objectives: [
        'Generate high volume of diverse ideas quickly',
        'Defer judgment to encourage creative thinking',
        'Build on others\' ideas collaboratively',
        'Explore unconventional solutions'
      ],
      howTo: 'Set a timer for 15-20 minutes. Use "How Might We" questions as prompts. Everyone writes ideas on sticky notes individually. Share ideas without critique. Aim for 50+ ideas. Group similar concepts. Vote on most promising directions. Remember: quantity breeds quality!'
    },
    {
      title: 'Brainstorming',
      description: 'Collaborative group ideation session following structured rules: defer judgment, encourage wild ideas, build on others\' ideas, stay focused on topic.',
      tags: ['Team Collaboration', 'Ideation', 'Creative Thinking'],
      objectives: [
        'Generate creative solutions through team collaboration',
        'Create safe space for sharing unconventional ideas',
        'Build momentum through "yes, and" thinking',
        'Leverage diverse perspectives for innovation'
      ],
      howTo: 'Set ground rules: no criticism, wild ideas welcome, build on ideas, one conversation at a time. Use a whiteboard or digital tool. Start with warm-up exercises. Frame the challenge clearly. Set 20-minute timebox. Capture all ideas. Cluster and vote at the end.'
    },
    {
      title: 'Mind Mapping',
      description: 'Create visual diagrams connecting ideas, concepts, and information radiating from a central theme. Leverage non-linear thinking for problem exploration.',
      tags: ['Visual Thinking', 'Organization', 'Ideation'],
      objectives: [
        'Visualize complex relationships between concepts',
        'Organize thoughts in non-linear, creative way',
        'Identify connections and patterns',
        'Generate new ideas through association'
      ],
      howTo: 'Start with central concept in the middle. Draw branches for main themes. Add sub-branches for related ideas. Use colors, icons, and images. Don\'t self-edit - let ideas flow. Look for unexpected connections between branches. Use mind map to guide deeper exploration.'
    },
    {
      title: 'Lateral Thinking',
      description: 'Approach problems from unexpected angles using techniques like random word association, provocation, and challenging assumptions.',
      tags: ['Creative Thinking', 'Problem Solving', 'Innovation'],
      objectives: [
        'Break free from traditional problem-solving patterns',
        'Challenge assumptions and reframe problems',
        'Generate unexpected and innovative solutions',
        'Develop cognitive flexibility and creativity'
      ],
      howTo: 'Use provocations like "What if we did the opposite?" or "What if money was no object?" Try random word technique: pick a random word and force connections to your problem. Challenge every assumption about the problem. Ask "Why?" five times to uncover root issues.'
    },
    {
      title: 'Six Thinking Hats',
      description: 'Use Edward de Bono\'s parallel thinking method: White (facts), Red (emotions), Black (caution), Yellow (benefits), Green (creativity), Blue (process).',
      tags: ['Structured Thinking', 'Decision Making', 'Team Process'],
      objectives: [
        'Examine problems from multiple perspectives systematically',
        'Separate emotion from logic in decision making',
        'Ensure all angles are considered before deciding',
        'Reduce conflict by aligning team on thinking mode'
      ],
      howTo: 'Assign each team member a colored "hat" representing a thinking mode. Discuss the problem from each perspective in sequence. White: What facts do we know? Red: How do we feel? Black: What are risks? Yellow: What are benefits? Green: What creative ideas emerge? Blue: What\'s our process?'
    }
  ]

  return (
    <div className="relative min-h-screen bg-slate-950 overflow-hidden">
      {/* 3D Background Scene */}
      <div className="fixed inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
          <DTIScene />
        </Canvas>
      </div>

      {/* Gradient Overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-purple-950/40 via-transparent to-slate-950/60 z-10 pointer-events-none" />

      {/* Scrollable Content */}
      <div className="relative z-20 min-h-screen">
        {/* Header */}
        <header className="bg-slate-900/30 backdrop-blur-xl border-b border-purple-500/20 sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/')}
                className="p-3 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 transition-all border border-purple-500/50 backdrop-blur-sm hover:scale-110"
              >
                <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
                  💡 Design Thinking & Innovation
                </h1>
                <p className="text-slate-300 mt-2 text-base md:text-lg">
                  Suggested Activities for Creative Problem Solving
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Innovate. Empathize. Create.
              </h2>
              <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
                Explore hands-on activities from the GTU syllabus designed to develop your design thinking skills through empathy mapping, ideation techniques, and creative problem-solving.
              </p>
            </motion.div>
          </div>

          {/* Course Info Banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 backdrop-blur-xl rounded-3xl p-8 border border-purple-500/30 mb-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-2">📚</div>
                <div className="text-2xl font-bold text-purple-300">BC03001071</div>
                <div className="text-slate-400 text-sm">Course Code</div>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">🎓</div>
                <div className="text-2xl font-bold text-pink-300">Semester 3</div>
                <div className="text-slate-400 text-sm">BCA Program</div>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">⭐</div>
                <div className="text-2xl font-bold text-cyan-300">2 Credits</div>
                <div className="text-slate-400 text-sm">Value Added Course</div>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">🎯</div>
                <div className="text-2xl font-bold text-green-300">{suggestedActivities.length} Activities</div>
                <div className="text-slate-400 text-sm">Practical Learning</div>
              </div>
            </div>
          </motion.div>

          {/* Course Outcomes Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="bg-slate-900/60 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/50 mb-12"
          >
            <h3 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-4xl">🎯</span>
              Course Outcomes
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                'Explain the foundational principles of Design Thinking',
                'Understand the significance of empathy and user research',
                'Identify and define problems for innovative solution development',
                'Apply methods for idea generation and creativity',
                'Discuss the role of prototyping and iterative design'
              ].map((outcome, i) => (
                <div key={i} className="flex items-start gap-3 bg-slate-800/50 rounded-xl p-4 border border-slate-700/30">
                  <div className="text-2xl">{i + 1}.</div>
                  <p className="text-slate-300">{outcome}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Activities Section */}
          <div className="mb-12">
            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-4xl font-bold text-white mb-8 flex items-center gap-3"
            >
              <span className="text-5xl">✨</span>
              Suggested Practical Activities
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-slate-400 text-lg mb-8"
            >
              These hands-on activities are recommended by GTU to help you master design thinking principles through experiential learning.
            </motion.p>
          </div>

          {/* Activity Cards Grid */}
          <div className="space-y-8">
            {suggestedActivities.map((activity, index) => (
              <ActivityCard key={index} activity={activity} index={index} />
            ))}
          </div>

          {/* Footer Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-16 text-center bg-gradient-to-r from-purple-900/40 to-pink-900/40 backdrop-blur-xl rounded-3xl p-12 border border-purple-500/30"
          >
            <div className="text-6xl mb-4">🚀</div>
            <h3 className="text-3xl font-bold text-white mb-4">
              Ready to Start Your Design Thinking Journey?
            </h3>
            <p className="text-slate-300 text-lg mb-6 max-w-2xl mx-auto">
              Pick an activity above and start practicing today. Remember: design thinking is best learned by doing!
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-purple-500/30 text-lg"
              >
                Back to Top ↑
              </button>
              <button
                onClick={() => navigate('/')}
                className="px-8 py-4 bg-slate-700/50 hover:bg-slate-600/50 text-white font-bold rounded-xl transition-all border border-slate-600 text-lg"
              >
                Home
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default DTI
