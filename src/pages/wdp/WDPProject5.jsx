import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import ProjectHero from '../../components/wdp/ProjectHero'
import CollapsibleCode from '../../components/wdp/CollapsibleCode'
import LiveDemo from '../../components/wdp/LiveDemo'
import ProjectNavigation from '../../components/wdp/ProjectNavigation'
import wdpProjects from '../../data/wdp/projects'

/**
 * WDP Project 5: Dynamic Content Manipulator (To-Do List)
 * Focus: DOM Manipulation & LocalStorage
 */
function WDPProject5() {
  const project = wdpProjects.find(p => p.id === 5)

  const todoHTML = `<div class="todo-app">
  <header class="todo-header">
    <h1>📝 To-Do List</h1>
    <p>Manage your tasks efficiently</p>
  </header>

  <div class="todo-input-section">
    <input type="text" id="todoInput" placeholder="Add a new task..." />
    <button onclick="addTodo()" class="btn-add">+ Add Task</button>
  </div>

  <div class="filter-buttons">
    <button onclick="filterTodos('all')" class="filter-btn active" id="filterAll">All</button>
    <button onclick="filterTodos('active')" class="filter-btn" id="filterActive">Active</button>
    <button onclick="filterTodos('completed')" class="filter-btn" id="filterCompleted">Completed</button>
  </div>

  <ul class="todo-list" id="todoList">
    <!-- Todos will be dynamically added here -->
  </ul>

  <div class="todo-stats">
    <span id="totalTasks">0 tasks</span>
    <button onclick="clearCompleted()" class="btn-clear-completed">Clear Completed</button>
  </div>
</div>`

  const todoCSS = `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}

.todo-app {
  background: white;
  width: 100%;
  max-width: 600px;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
  overflow: hidden;
}

.todo-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem;
  text-align: center;
}

.todo-header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.todo-input-section {
  padding: 2rem;
  display: flex;
  gap: 1rem;
}

#todoInput {
  flex: 1;
  padding: 1rem;
  font-size: 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  transition: border-color 0.3s;
}

#todoInput:focus {
  outline: none;
  border-color: #667eea;
}

.btn-add {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.2s;
}

.btn-add:hover {
  transform: scale(1.05);
}

.filter-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  padding: 0 2rem 1rem 2rem;
}

.filter-btn {
  background: #f3f4f6;
  border: none;
  padding: 0.5rem 1.5rem;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: 600;
}

.filter-btn.active {
  background: #667eea;
  color: white;
}

.todo-list {
  list-style: none;
  padding: 0 2rem;
  max-height: 400px;
  overflow-y: auto;
}

.todo-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  margin-bottom: 0.5rem;
  background: #f9fafb;
  border-radius: 10px;
  transition: all 0.3s;
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.todo-item:hover {
  background: #f3f4f6;
  transform: translateX(5px);
}

.todo-item.completed {
  opacity: 0.6;
}

.todo-checkbox {
  width: 24px;
  height: 24px;
  cursor: pointer;
  accent-color: #667eea;
}

.todo-text {
  flex: 1;
  font-size: 1rem;
}

.todo-item.completed .todo-text {
  text-decoration: line-through;
  color: #9ca3af;
}

.todo-actions {
  display: flex;
  gap: 0.5rem;
}

.btn-edit,
.btn-delete {
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  font-size: 1.2rem;
  transition: transform 0.2s;
  border-radius: 5px;
}

.btn-edit {
  color: #3b82f6;
}

.btn-delete {
  color: #ef4444;
}

.btn-edit:hover,
.btn-delete:hover {
  transform: scale(1.2);
  background: #f3f4f6;
}

.todo-stats {
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #e5e7eb;
  font-size: 0.9rem;
  color: #6b7280;
}

.btn-clear-completed {
  background: none;
  border: none;
  color: #ef4444;
  cursor: pointer;
  font-weight: 600;
  transition: color 0.3s;
}

.btn-clear-completed:hover {
  color: #dc2626;
  text-decoration: underline;
}

.empty-state {
  text-align: center;
  padding: 3rem 2rem;
  color: #9ca3af;
}

.empty-state-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}`

  const todoJS = `// Todo app state
let todos = [];
let currentFilter = 'all';

// Load todos from localStorage on page load
function loadTodos() {
  const savedTodos = localStorage.getItem('todos');
  if (savedTodos) {
    todos = JSON.parse(savedTodos);
    renderTodos();
  }
}

// Save todos to localStorage
function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

// Add new todo
function addTodo() {
  const input = document.getElementById('todoInput');
  const text = input.value.trim();

  if (text === '') {
    alert('Please enter a task!');
    return;
  }

  const todo = {
    id: Date.now(),
    text: text,
    completed: false,
    createdAt: new Date().toISOString()
  };

  todos.unshift(todo);
  input.value = '';
  saveTodos();
  renderTodos();
}

// Delete todo
function deleteTodo(id) {
  if (confirm('Are you sure you want to delete this task?')) {
    todos = todos.filter(todo => todo.id !== id);
    saveTodos();
    renderTodos();
  }
}

// Toggle todo completion
function toggleTodo(id) {
  const todo = todos.find(t => t.id === id);
  if (todo) {
    todo.completed = !todo.completed;
    saveTodos();
    renderTodos();
  }
}

// Edit todo
function editTodo(id) {
  const todo = todos.find(t => t.id === id);
  if (todo) {
    const newText = prompt('Edit task:', todo.text);
    if (newText !== null && newText.trim() !== '') {
      todo.text = newText.trim();
      saveTodos();
      renderTodos();
    }
  }
}

// Filter todos
function filterTodos(filter) {
  currentFilter = filter;

  // Update active button
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  document.getElementById('filter' + filter.charAt(0).toUpperCase() +
    filter.slice(1)).classList.add('active');

  renderTodos();
}

// Clear completed todos
function clearCompleted() {
  const completedCount = todos.filter(t => t.completed).length;
  if (completedCount === 0) {
    alert('No completed tasks to clear!');
    return;
  }

  if (confirm(\`Clear \${completedCount} completed task(s)?\`)) {
    todos = todos.filter(t => !t.completed);
    saveTodos();
    renderTodos();
  }
}

// Render todos to DOM
function renderTodos() {
  const todoList = document.getElementById('todoList');
  const totalTasks = document.getElementById('totalTasks');

  // Filter todos based on current filter
  let filteredTodos = todos;
  if (currentFilter === 'active') {
    filteredTodos = todos.filter(t => !t.completed);
  } else if (currentFilter === 'completed') {
    filteredTodos = todos.filter(t => t.completed);
  }

  // Update stats
  const activeCount = todos.filter(t => !t.completed).length;
  totalTasks.textContent = \`\${activeCount} active task\${activeCount !== 1 ? 's' : ''}\`;

  // Render todos
  if (filteredTodos.length === 0) {
    todoList.innerHTML = \`
      <div class="empty-state">
        <div class="empty-state-icon">📭</div>
        <p>No tasks found!</p>
      </div>
    \`;
    return;
  }

  todoList.innerHTML = filteredTodos.map(todo => \`
    <li class="todo-item \${todo.completed ? 'completed' : ''}">
      <input
        type="checkbox"
        class="todo-checkbox"
        \${todo.completed ? 'checked' : ''}
        onchange="toggleTodo(\${todo.id})"
      />
      <span class="todo-text">\${todo.text}</span>
      <div class="todo-actions">
        <button class="btn-edit" onclick="editTodo(\${todo.id})" title="Edit">✏️</button>
        <button class="btn-delete" onclick="deleteTodo(\${todo.id})" title="Delete">🗑️</button>
      </div>
    </li>
  \`).join('');
}

// Allow Enter key to add todo
document.addEventListener('DOMContentLoaded', function() {
  const input = document.getElementById('todoInput');
  input.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      addTodo();
    }
  });

  // Load todos on page load
  loadTodos();
});`

  return (
    <div className="relative min-h-screen bg-slate-950 overflow-hidden">
      <div className="fixed inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 10] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} color="#ef4444" />
          <pointLight position={[-10, -10, -10]} color="#ec4899" />
          <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.3} />
        </Canvas>
      </div>

      <div className="fixed inset-0 bg-gradient-to-b from-red-950/40 via-transparent to-slate-950/60 z-10 pointer-events-none" />

      <div className="relative z-20">
        <ProjectHero project={project} />

        <div className="max-w-7xl mx-auto px-6 py-12">
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
                Master DOM manipulation by building an interactive to-do list application! Learn to dynamically create,
                update, and delete elements, handle events, and persist data using LocalStorage.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-6">
                  <div className="text-3xl mb-2">🎯</div>
                  <h4 className="text-red-300 font-bold mb-2">Goal</h4>
                  <p className="text-slate-300 text-sm">
                    Build a fully functional to-do list with CRUD operations
                  </p>
                </div>
                <div className="bg-pink-900/20 border border-pink-500/30 rounded-xl p-6">
                  <div className="text-3xl mb-2">💡</div>
                  <h4 className="text-pink-300 font-bold mb-2">Key Concept</h4>
                  <p className="text-slate-300 text-sm">
                    DOM manipulation, event delegation, and data persistence
                  </p>
                </div>
                <div className="bg-rose-900/20 border border-rose-500/30 rounded-xl p-6">
                  <div className="text-3xl mb-2">⚡</div>
                  <h4 className="text-rose-300 font-bold mb-2">Difficulty</h4>
                  <p className="text-slate-300 text-sm">
                    Intermediate - advanced JavaScript concepts
                  </p>
                </div>
              </div>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-5xl">🖥️</span>
              Live Demo - Try Adding Tasks!
            </h2>
            <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-4 mb-4">
              <p className="text-red-200 text-sm">
                💡 <strong>Try it:</strong> Add tasks, mark them as complete, edit or delete them. Your data persists
                in LocalStorage!
              </p>
            </div>
            <LiveDemo
              html={todoHTML}
              css={todoCSS}
              js={todoJS}
              title="Dynamic To-Do List"
              mode="iframe"
              height="700px"
            />
          </motion.section>

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
                description="Simple and semantic HTML structure for a to-do list application with input form and task list container."
                code={todoHTML}
                language="html"
                fileName="index.html"
              />

              <CollapsibleCode
                title="CSS Styling"
                description="Modern styling with smooth animations, transitions, and visual feedback for user interactions."
                code={todoCSS}
                language="css"
                fileName="styles.css"
              />

              <CollapsibleCode
                title="JavaScript - DOM Manipulation"
                description="Complete CRUD functionality with createElement, appendChild, event listeners, and LocalStorage API."
                code={todoJS}
                language="javascript"
                fileName="script.js"
              />
            </div>
          </motion.section>

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
                    <span className="flex-shrink-0 w-8 h-8 bg-red-500/20 text-red-300 rounded-full flex items-center justify-center font-bold text-sm border border-red-500/50">
                      {i + 1}
                    </span>
                    <span className="text-slate-300 pt-1">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </motion.section>

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

          <ProjectNavigation currentProjectId={project.id} />
        </div>
      </div>
    </div>
  )
}

export default WDPProject5
