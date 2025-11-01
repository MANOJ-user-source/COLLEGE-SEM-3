// WDP Project Data Structure
export const wdpProjects = [
  {
    id: 1,
    slug: 'portfolio-website',
    title: 'Personal Portfolio Website',
    icon: '👨‍💻',
    difficulty: 'Beginner',
    category: 'HTML',

    // Display info
    shortDescription: 'Create a professional personal portfolio webpage using semantic HTML5. Learn document structure, proper use of headings, sections, and accessibility best practices.',
    colorTheme: {
      primary: '#3b82f6',
      secondary: '#60a5fa',
      gradient: 'from-blue-500 to-cyan-500'
    },

    // Project metadata
    completedDate: 'September 2025',
    duration: '2 weeks',
    linesOfCode: 450,

    // Links (you can add your actual links later)
    liveDemo: null, // e.g., 'https://your-portfolio.netlify.app'
    githubRepo: null, // e.g., 'https://github.com/yourusername/portfolio'

    // Technologies
    technologies: ['HTML', 'Semantic Tags'],

    // Learning objectives
    objectives: [
      'Understand HTML document structure and DOCTYPE',
      'Use semantic tags like header, nav, main, section, article, footer',
      'Implement proper heading hierarchy (h1-h6)',
      'Add images, links, and lists effectively',
      'Create a contact form with proper input types'
    ],

    // Implementation steps
    steps: [
      'Set up basic HTML5 structure with DOCTYPE and meta tags',
      'Create a header with your name and navigation menu',
      'Build an "About Me" section with your bio and photo',
      'Add a "Skills" section using unordered lists',
      'Create a "Projects" showcase with images and descriptions',
      'Implement a contact form with name, email, and message fields',
      'Add a footer with social media links',
      'Validate your HTML using W3C validator'
    ],

    // Challenges
    challenges: [
      'Add a downloadable resume link',
      'Include a timeline of your education/experience',
      'Create a responsive image gallery',
      'Add video or audio elements'
    ],

    // Resources
    resources: [
      'MDN Web Docs - HTML Basics',
      'W3Schools HTML Tutorial',
      'HTML Semantic Elements Guide',
      'Spoken Tutorial - HTML Resources'
    ]
  },

  {
    id: 2,
    slug: 'product-showcase',
    title: 'Product Showcase Page',
    icon: '🛍️',
    difficulty: 'Beginner',
    category: 'CSS',

    shortDescription: 'Design and style a beautiful product showcase page using CSS. Master selectors, the box model, typography, colors, and visual hierarchy.',
    colorTheme: {
      primary: '#8b5cf6',
      secondary: '#ec4899',
      gradient: 'from-purple-500 to-pink-500'
    },

    completedDate: 'October 2025',
    duration: '2 weeks',
    linesOfCode: 650,

    liveDemo: null,
    githubRepo: null,

    technologies: ['HTML', 'CSS', 'Box Model'],

    objectives: [
      'Apply inline, internal, and external CSS effectively',
      'Master CSS selectors (element, class, ID, attribute)',
      'Understand and implement the box model',
      'Use colors, backgrounds, and gradients',
      'Style typography for readability and visual appeal'
    ],

    steps: [
      'Create HTML structure for product cards',
      'Set up external CSS file and link it properly',
      'Apply a color scheme using CSS variables',
      'Style product cards with borders, shadows, and rounded corners',
      'Implement hover effects for interactive feedback',
      'Use Google Fonts or custom typography',
      'Add background images or gradients',
      'Style buttons with transitions and hover states',
      'Create consistent spacing using margins and padding'
    ],

    challenges: [
      'Implement a dark mode toggle',
      'Add CSS animations on card hover',
      'Create a pricing table with different tiers',
      'Use pseudo-elements (::before, ::after) for decorative effects'
    ],

    resources: [
      'CSS Tricks - Box Model Guide',
      'Google Fonts Library',
      'Color Palette Generators (Coolors, Adobe Color)',
      'Spoken Tutorial - CSS Resources'
    ]
  },

  {
    id: 3,
    slug: 'responsive-layout',
    title: 'Responsive Multi-Column Layout',
    icon: '📱',
    difficulty: 'Intermediate',
    category: 'CSS Layout',

    shortDescription: 'Build a fully responsive multi-column webpage using modern CSS layout techniques. Master Flexbox and CSS Grid for professional layouts.',
    colorTheme: {
      primary: '#10b981',
      secondary: '#14b8a6',
      gradient: 'from-green-500 to-teal-500'
    },

    completedDate: 'October 2025',
    duration: '3 weeks',
    linesOfCode: 800,

    liveDemo: null,
    githubRepo: null,

    technologies: ['HTML', 'CSS', 'Flexbox', 'Grid', 'Responsive'],

    objectives: [
      'Implement Flexbox for one-dimensional layouts',
      'Use CSS Grid for two-dimensional layouts',
      'Create responsive designs with media queries',
      'Understand mobile-first design approach',
      'Handle different screen sizes effectively'
    ],

    steps: [
      'Design a layout sketch for desktop, tablet, and mobile',
      'Create HTML structure with semantic containers',
      'Implement CSS Grid for overall page layout',
      'Use Flexbox for navigation bar and card layouts',
      'Add media queries for tablet (768px) and mobile (480px)',
      'Implement mobile-first approach starting with smallest screen',
      'Test responsiveness using browser dev tools',
      'Ensure images are responsive with max-width: 100%',
      'Use relative units (%, em, rem) instead of fixed pixels'
    ],

    challenges: [
      'Create a responsive hamburger menu for mobile',
      'Implement CSS Grid areas for complex layouts',
      'Add smooth transitions when resizing',
      'Use CSS clamp() for fluid typography'
    ],

    resources: [
      'CSS Tricks - Complete Guide to Flexbox',
      'CSS Tricks - Complete Guide to Grid',
      'MDN - Responsive Design',
      'Can I Use - Browser compatibility checker'
    ]
  },

  {
    id: 4,
    slug: 'calculator-validator',
    title: 'JavaScript Calculator & Form Validator',
    icon: '🧮',
    difficulty: 'Intermediate',
    category: 'JavaScript',

    shortDescription: 'Build interactive applications using JavaScript fundamentals. Create a functional calculator and implement client-side form validation.',
    colorTheme: {
      primary: '#f59e0b',
      secondary: '#ef4444',
      gradient: 'from-orange-500 to-red-500'
    },

    completedDate: 'November 2025',
    duration: '3 weeks',
    linesOfCode: 950,

    liveDemo: null,
    githubRepo: null,

    technologies: ['HTML', 'CSS', 'JavaScript'],

    objectives: [
      'Understand JavaScript variables, data types, and operators',
      'Implement control structures (if/else, loops)',
      'Write reusable functions',
      'Handle user input and perform calculations',
      'Validate form data before submission'
    ],

    steps: [
      'Create calculator HTML with buttons for digits and operators',
      'Set up JavaScript file and link with defer attribute',
      'Declare variables for storing operands and operator',
      'Write functions for add, subtract, multiply, divide',
      'Implement event listeners for button clicks',
      'Display results in calculator screen',
      'Create a form with various input types',
      'Write validation functions for email, phone, password',
      'Display error messages dynamically',
      'Prevent form submission if validation fails'
    ],

    challenges: [
      'Add keyboard support for calculator',
      'Implement decimal point and clear functions',
      'Add password strength indicator',
      'Create real-time validation (on blur or input)',
      'Handle edge cases (division by zero, empty inputs)'
    ],

    resources: [
      'MDN - JavaScript Basics',
      'JavaScript.info - The Modern Tutorial',
      'W3Schools JavaScript Tutorial',
      'Eloquent JavaScript (free online book)'
    ]
  },

  {
    id: 5,
    slug: 'dom-manipulator',
    title: 'Dynamic Content Manipulator',
    icon: '🔄',
    difficulty: 'Intermediate',
    category: 'DOM Manipulation',

    shortDescription: 'Master the Document Object Model (DOM) by dynamically creating, modifying, and removing elements. Build an interactive to-do list or content manager.',
    colorTheme: {
      primary: '#ef4444',
      secondary: '#ec4899',
      gradient: 'from-red-500 to-pink-500'
    },

    completedDate: 'November 2025',
    duration: '3 weeks',
    linesOfCode: 1100,

    liveDemo: null,
    githubRepo: null,

    technologies: ['HTML', 'CSS', 'JavaScript', 'DOM'],

    objectives: [
      'Understand the DOM tree structure',
      'Select elements using querySelector and getElementById',
      'Create and append new elements dynamically',
      'Modify element properties, attributes, and styles',
      'Handle user events (click, input, submit)'
    ],

    steps: [
      'Create base HTML structure with input field and container',
      'Select DOM elements using JavaScript',
      'Write function to create new list items',
      'Add event listener for form submission or button click',
      'Use createElement() and appendChild() to add items',
      'Implement delete functionality for each item',
      'Add edit functionality to modify existing items',
      'Store data in arrays and sync with DOM',
      'Add local storage to persist data on page reload',
      'Implement filter or search functionality'
    ],

    challenges: [
      'Add drag-and-drop reordering',
      'Implement categories or tags for items',
      'Add due dates and sort by date',
      'Create animations when adding/removing items',
      'Export data as JSON or CSV'
    ],

    resources: [
      'MDN - Introduction to the DOM',
      'JavaScript.info - Document and DOM',
      'DOM Manipulation Crash Course',
      'LocalStorage API Documentation'
    ]
  },

  {
    id: 6,
    slug: 'fullstack-project',
    title: 'Full-Stack Mini Project',
    icon: '🚀',
    difficulty: 'Advanced',
    category: 'Full-Stack',

    shortDescription: 'Combine HTML, CSS, and JavaScript to build a complete web application. This is your capstone project showcasing all skills learned throughout the course.',
    colorTheme: {
      primary: '#6366f1',
      secondary: '#8b5cf6',
      gradient: 'from-indigo-500 to-purple-500'
    },

    completedDate: 'December 2025',
    duration: '4 weeks',
    linesOfCode: 2000,

    liveDemo: null,
    githubRepo: null,

    technologies: ['HTML', 'CSS', 'JavaScript', 'Flexbox', 'Grid', 'DOM', 'Responsive'],

    objectives: [
      'Integrate HTML structure, CSS styling, and JavaScript interactivity',
      'Plan and design a complete web application',
      'Implement responsive design for all devices',
      'Handle complex user interactions and state management',
      'Present and document your project professionally'
    ],

    steps: [
      'Choose project idea (e.g., blog, e-commerce, dashboard, game)',
      'Create wireframes and design mockups',
      'Set up project structure with organized folders',
      'Build semantic HTML structure',
      'Implement responsive CSS with Flexbox/Grid',
      'Add JavaScript for interactivity and dynamic content',
      'Test across different browsers and devices',
      'Optimize performance (minify CSS/JS, optimize images)',
      'Deploy using GitHub Pages or Netlify',
      'Create project documentation and README'
    ],

    challenges: [
      'Implement user authentication (frontend only with localStorage)',
      'Add dark/light theme toggle',
      'Create animated transitions and micro-interactions',
      'Implement search and filter functionality',
      'Add accessibility features (ARIA labels, keyboard navigation)',
      'Use Git for version control throughout development'
    ],

    resources: [
      'Project Ideas: Portfolio, Blog, Weather App, Quiz Game, Recipe Finder',
      'GitHub Pages Deployment Guide',
      'Web Performance Optimization Tips',
      'Web Accessibility Guidelines (WCAG)',
      'Git and GitHub Desktop Tutorial'
    ]
  }
];

export default wdpProjects;
