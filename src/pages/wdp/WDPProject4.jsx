import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import ProjectHero from '../../components/wdp/ProjectHero'
import CollapsibleCode from '../../components/wdp/CollapsibleCode'
import LiveDemo from '../../components/wdp/LiveDemo'
import ProjectNavigation from '../../components/wdp/ProjectNavigation'
import wdpProjects from '../../data/wdp/projects'

/**
 * WDP Project 4: JavaScript Calculator & Form Validator
 * Focus: JavaScript Fundamentals & Event Handling
 */
function WDPProject4() {
  const project = wdpProjects.find(p => p.id === 4)

  // Calculator and Form HTML
  const calculatorHTML = `<div class="container">
  <div class="app-grid">
    <!-- Calculator Section -->
    <div class="app-section">
      <h2>🧮 Calculator</h2>
      <div class="calculator">
        <div class="display" id="display">0</div>
        <div class="buttons">
          <button class="btn btn-clear" onclick="clearDisplay()">C</button>
          <button class="btn btn-operator" onclick="appendOperator('/')">/</button>
          <button class="btn btn-operator" onclick="appendOperator('*')">×</button>
          <button class="btn btn-operator" onclick="deleteChar()">⌫</button>

          <button class="btn" onclick="appendNumber('7')">7</button>
          <button class="btn" onclick="appendNumber('8')">8</button>
          <button class="btn" onclick="appendNumber('9')">9</button>
          <button class="btn btn-operator" onclick="appendOperator('-')">-</button>

          <button class="btn" onclick="appendNumber('4')">4</button>
          <button class="btn" onclick="appendNumber('5')">5</button>
          <button class="btn" onclick="appendNumber('6')">6</button>
          <button class="btn btn-operator" onclick="appendOperator('+')">+</button>

          <button class="btn" onclick="appendNumber('1')">1</button>
          <button class="btn" onclick="appendNumber('2')">2</button>
          <button class="btn" onclick="appendNumber('3')">3</button>
          <button class="btn btn-equals" onclick="calculate()" style="grid-row: span 2">=</button>

          <button class="btn" style="grid-column: span 2" onclick="appendNumber('0')">0</button>
          <button class="btn" onclick="appendNumber('.')">.</button>
        </div>
      </div>
    </div>

    <!-- Form Validator Section -->
    <div class="app-section">
      <h2>✓ Form Validator</h2>
      <form class="validator-form" id="validatorForm">
        <div class="form-group">
          <label for="name">Full Name</label>
          <input type="text" id="name" placeholder="John Doe" />
          <span class="error" id="nameError"></span>
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" placeholder="john@example.com" />
          <span class="error" id="emailError"></span>
        </div>

        <div class="form-group">
          <label for="phone">Phone</label>
          <input type="tel" id="phone" placeholder="+1 234 567 8900" />
          <span class="error" id="phoneError"></span>
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" placeholder="Enter password" />
          <span class="error" id="passwordError"></span>
          <div class="password-strength" id="strengthBar"></div>
        </div>

        <button type="submit" class="btn-submit">Submit Form</button>
        <div class="success" id="successMsg"></div>
      </form>
    </div>
  </div>
</div>`

  // Styling
  const calculatorCSS = `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  padding: 2rem;
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.app-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
}

.app-section {
  background: white;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
}

.app-section h2 {
  color: #667eea;
  margin-bottom: 1.5rem;
  text-align: center;
  font-size: 1.8rem;
}

/* Calculator Styles */
.calculator {
  background: #1f2937;
  padding: 1.5rem;
  border-radius: 15px;
}

.display {
  background: #374151;
  color: white;
  font-size: 2.5rem;
  padding: 1.5rem;
  border-radius: 10px;
  text-align: right;
  margin-bottom: 1rem;
  min-height: 80px;
  word-wrap: break-word;
  font-weight: bold;
}

.buttons {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.75rem;
}

.btn {
  background: #4b5563;
  color: white;
  border: none;
  padding: 1.5rem;
  font-size: 1.3rem;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: bold;
}

.btn:hover {
  background: #6b7280;
  transform: scale(1.05);
}

.btn:active {
  transform: scale(0.95);
}

.btn-clear {
  background: #ef4444;
}

.btn-clear:hover {
  background: #dc2626;
}

.btn-operator {
  background: #f59e0b;
}

.btn-operator:hover {
  background: #d97706;
}

.btn-equals {
  background: #10b981;
}

.btn-equals:hover {
  background: #059669;
}

/* Form Validator Styles */
.validator-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  color: #374151;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.form-group input {
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.form-group input:focus {
  outline: none;
  border-color: #667eea;
}

.form-group input.valid {
  border-color: #10b981;
}

.form-group input.invalid {
  border-color: #ef4444;
}

.error {
  color: #ef4444;
  font-size: 0.85rem;
  margin-top: 0.25rem;
  min-height: 1.2rem;
}

.password-strength {
  height: 5px;
  border-radius: 5px;
  margin-top: 0.5rem;
  transition: all 0.3s;
}

.btn-submit {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 1rem;
  font-size: 1.1rem;
  font-weight: bold;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.2s;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.btn-submit:hover {
  transform: scale(1.05);
}

.btn-submit:active {
  transform: scale(0.98);
}

.success {
  color: #10b981;
  font-weight: bold;
  text-align: center;
  min-height: 1.5rem;
}`

  // JavaScript functionality
  const calculatorJS = `// Calculator Logic
let currentInput = '0';
let operator = null;
let previousInput = null;

function updateDisplay() {
  document.getElementById('display').textContent = currentInput;
}

function appendNumber(num) {
  if (currentInput === '0' || currentInput === 'Error') {
    currentInput = num;
  } else {
    currentInput += num;
  }
  updateDisplay();
}

function appendOperator(op) {
  if (previousInput === null) {
    previousInput = currentInput;
    operator = op;
    currentInput = '0';
  } else {
    calculate();
    operator = op;
  }
}

function calculate() {
  if (previousInput === null || operator === null) return;

  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);
  let result;

  switch(operator) {
    case '+': result = prev + current; break;
    case '-': result = prev - current; break;
    case '*': result = prev * current; break;
    case '/':
      result = current === 0 ? 'Error' : prev / current;
      break;
    default: return;
  }

  currentInput = result.toString();
  operator = null;
  previousInput = null;
  updateDisplay();
}

function clearDisplay() {
  currentInput = '0';
  operator = null;
  previousInput = null;
  updateDisplay();
}

function deleteChar() {
  currentInput = currentInput.length > 1 ?
    currentInput.slice(0, -1) : '0';
  updateDisplay();
}

// Form Validation Logic
const form = document.getElementById('validatorForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const passwordInput = document.getElementById('password');

function validateName() {
  const name = nameInput.value.trim();
  const error = document.getElementById('nameError');

  if (name.length < 2) {
    error.textContent = 'Name must be at least 2 characters';
    nameInput.classList.add('invalid');
    nameInput.classList.remove('valid');
    return false;
  }

  error.textContent = '';
  nameInput.classList.add('valid');
  nameInput.classList.remove('invalid');
  return true;
}

function validateEmail() {
  const email = emailInput.value.trim();
  const error = document.getElementById('emailError');
  const regex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;

  if (!regex.test(email)) {
    error.textContent = 'Please enter a valid email';
    emailInput.classList.add('invalid');
    emailInput.classList.remove('valid');
    return false;
  }

  error.textContent = '';
  emailInput.classList.add('valid');
  emailInput.classList.remove('invalid');
  return true;
}

function validatePhone() {
  const phone = phoneInput.value.trim();
  const error = document.getElementById('phoneError');
  const regex = /^[\\d\\s+-]+$/;

  if (!regex.test(phone) || phone.length < 10) {
    error.textContent = 'Please enter a valid phone number';
    phoneInput.classList.add('invalid');
    phoneInput.classList.remove('valid');
    return false;
  }

  error.textContent = '';
  phoneInput.classList.add('valid');
  phoneInput.classList.remove('invalid');
  return true;
}

function validatePassword() {
  const password = passwordInput.value;
  const error = document.getElementById('passwordError');
  const strengthBar = document.getElementById('strengthBar');

  let strength = 0;
  if (password.length >= 8) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^a-zA-Z0-9]/.test(password)) strength++;

  const colors = ['#ef4444', '#f59e0b', '#eab308', '#84cc16', '#10b981'];
  const widths = ['20%', '40%', '60%', '80%', '100%'];

  strengthBar.style.width = widths[strength - 1] || '0';
  strengthBar.style.backgroundColor = colors[strength - 1] || 'transparent';

  if (password.length < 8) {
    error.textContent = 'Password must be at least 8 characters';
    passwordInput.classList.add('invalid');
    passwordInput.classList.remove('valid');
    return false;
  }

  error.textContent = '';
  passwordInput.classList.add('valid');
  passwordInput.classList.remove('invalid');
  return true;
}

// Real-time validation
nameInput.addEventListener('blur', validateName);
emailInput.addEventListener('blur', validateEmail);
phoneInput.addEventListener('blur', validatePhone);
passwordInput.addEventListener('input', validatePassword);

// Form submission
form.addEventListener('submit', function(e) {
  e.preventDefault();

  const isNameValid = validateName();
  const isEmailValid = validateEmail();
  const isPhoneValid = validatePhone();
  const isPasswordValid = validatePassword();

  if (isNameValid && isEmailValid && isPhoneValid && isPasswordValid) {
    document.getElementById('successMsg').textContent =
      '✓ Form submitted successfully!';
    setTimeout(() => {
      form.reset();
      document.getElementById('successMsg').textContent = '';
      document.querySelectorAll('.valid, .invalid').forEach(el => {
        el.classList.remove('valid', 'invalid');
      });
      document.getElementById('strengthBar').style.width = '0';
    }, 2000);
  }
});`

  return (
    <div className="relative min-h-screen bg-slate-950 overflow-hidden">
      {/* 3D Background */}
      <div className="fixed inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 10] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} color="#f59e0b" />
          <pointLight position={[-10, -10, -10]} color="#ef4444" />
          <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.3} />
        </Canvas>
      </div>

      <div className="fixed inset-0 bg-gradient-to-b from-orange-950/40 via-transparent to-slate-950/60 z-10 pointer-events-none" />

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
                Learn JavaScript fundamentals by building two interactive applications: a fully functional calculator
                and a smart form validator. Master variables, functions, operators, control structures, and DOM manipulation!
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="bg-orange-900/20 border border-orange-500/30 rounded-xl p-6">
                  <div className="text-3xl mb-2">🎯</div>
                  <h4 className="text-orange-300 font-bold mb-2">Goal</h4>
                  <p className="text-slate-300 text-sm">
                    Build interactive applications using core JavaScript concepts
                  </p>
                </div>
                <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-6">
                  <div className="text-3xl mb-2">💡</div>
                  <h4 className="text-red-300 font-bold mb-2">Key Concept</h4>
                  <p className="text-slate-300 text-sm">
                    Functions, event handling, and input validation
                  </p>
                </div>
                <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-xl p-6">
                  <div className="text-3xl mb-2">⚡</div>
                  <h4 className="text-yellow-300 font-bold mb-2">Difficulty</h4>
                  <p className="text-slate-300 text-sm">
                    Intermediate - introduces JavaScript programming
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
              Live Demo - Try It Out!
            </h2>
            <div className="bg-orange-900/20 border border-orange-500/30 rounded-xl p-4 mb-4">
              <p className="text-orange-200 text-sm">
                💡 <strong>Try it:</strong> Use the calculator to perform calculations and fill out the form to see
                real-time validation in action!
              </p>
            </div>
            <LiveDemo
              html={calculatorHTML}
              css={calculatorCSS}
              js={calculatorJS}
              title="Calculator & Form Validator"
              mode="iframe"
              height="800px"
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
                description="Calculator and form validator HTML with semantic structure and accessibility features."
                code={calculatorHTML}
                language="html"
                fileName="index.html"
              />

              <CollapsibleCode
                title="CSS Styling"
                description="Modern styling with CSS Grid for calculator layout, custom form inputs, and responsive design."
                code={calculatorCSS}
                language="css"
                fileName="styles.css"
              />

              <CollapsibleCode
                title="JavaScript Logic"
                description="Features calculator operations, form validation with regex, real-time feedback, and password strength indicator."
                code={calculatorJS}
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
                    <span className="flex-shrink-0 w-8 h-8 bg-orange-500/20 text-orange-300 rounded-full flex items-center justify-center font-bold text-sm border border-orange-500/50">
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
            <div className="bg-red-900/20 rounded-3xl p-8 border border-red-500/30">
              <ul className="space-y-3">
                {project.challenges.map((challenge, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-red-400 text-xl">★</span>
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

export default WDPProject4
