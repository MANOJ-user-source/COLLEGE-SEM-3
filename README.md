# Interactive 3D College Website - Semester 3

An immersive, interactive 3D website showcasing all 7 Semester-3 college subjects with dynamic visualizations and engaging user experiences.

## Live Demo

Coming soon! Will be deployed to GitHub Pages.

## Features

- **3D Interactive Homepage**: Navigate between subjects using interactive 3D objects
- **7 Subject Pages**: Dedicated pages for OS, OOP, CN, MATHS AI, WDP, VC, and DTI
- **Dynamic Animations**: Smooth transitions and engaging visual effects
- **Responsive Design**: Works seamlessly across desktop, tablet, and mobile devices
- **Modern Tech Stack**: Built with React, Three.js, and Tailwind CSS

## Tech Stack

- **React** - UI library
- **Vite** - Build tool and dev server
- **Three.js** - 3D graphics library
- **React Three Fiber** - React renderer for Three.js
- **@react-three/drei** - Helper components for R3F
- **Framer Motion** - Animation library
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing

## Project Structure

```
interactive-3d-website/
├── src/
│   ├── components/
│   │   ├── 3d/         # 3D components
│   │   └── ui/         # UI components
│   ├── pages/          # Page components
│   ├── assets/         # Images, models, etc.
│   ├── utils/          # Utility functions
│   ├── App.jsx         # Main app component
│   └── main.jsx        # Entry point
├── public/             # Static assets
├── docs/               # Project documentation
└── package.json
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (or npm/yarn)

### Installation

1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd interactive-3d-website
```

2. Install dependencies
```bash
pnpm install
```

3. Start development server
```bash
pnpm dev
```

4. Open browser and navigate to `http://localhost:5173`

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build locally
- `pnpm deploy` - Deploy to GitHub Pages (after setup)

## Subjects Covered

1. **Operating Systems (OS)** - Process management, memory, file systems
2. **Object-Oriented Programming (OOP)** - Classes, inheritance, polymorphism
3. **Computer Networks (CN)** - Protocols, OSI model, network topology
4. **Mathematics for AI** - Linear algebra, calculus, optimization
5. **Web Design & Programming (WDP)** - HTML, CSS, JavaScript
6. **Version Control (VC)** - Git, branching, collaboration
7. **Digital Transformation & Innovation (DTI)** - Digital evolution, innovation frameworks

## Development

### Building 3D Components

3D components are located in `src/components/3d/`. Use React Three Fiber for creating 3D scenes:

```jsx
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

function Scene() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <OrbitControls />
      {/* Your 3D objects here */}
    </Canvas>
  )
}
```

### Adding New Pages

Create page components in `src/pages/` and add routes in `App.jsx`.

## Deployment

This project is configured for GitHub Pages deployment. See the [deployment guide](../docs/deployment-guide.md) for detailed instructions.

Quick deploy:
```bash
pnpm run deploy
```

## Documentation

Detailed documentation is available in the `docs/` folder:
- [Project Summary](../docs/project-summary.md)
- [Tech Stack Details](../docs/tech-stack.md)
- [Features & Roadmap](../docs/features.md)
- [Deployment Guide](../docs/deployment-guide.md)
- [Work Log](../docs/work-log.md)

## Contributing

This is a college project, but suggestions and feedback are welcome!

## License

This project is created for educational purposes.

## Author

College Semester-3 Project

---

Built with React, Three.js, and passion for learning!
