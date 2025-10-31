import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Base path for GitHub Pages deployment
  // Update this to match your repository name: '/your-repo-name/'
  // For example: base: '/sem3-interactive-website/',
  base: '/',
})
