import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist', 'src/pages/OS.jsx']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      react.configs.flat.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'no-unused-vars': ['error', {
        varsIgnorePattern: '^[A-Z_]',
        ignoreRestSiblings: true,
        args: 'none'
      }],
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/no-unescaped-entities': 'off',
      'react/no-unknown-property': ['error', { ignore: [
        'attach', 'args', 'position', 'rotation', 'scale', 'castShadow', 'receiveShadow',
        'geometry', 'material', 'intensity', 'color', 'penumbra', 'angle', 'distance',
        'decay', 'target', 'shadow', 'side', 'vertexColors', 'transparent', 'opacity',
        'blending', 'depthWrite', 'depthTest', 'sizeAttenuation', 'size', 'map',
        'alphaMap', 'envMap', 'roughness', 'metalness', 'normalMap', 'displacementMap',
        'emissive', 'emissiveIntensity', 'wireframe', 'flatShading', 'visible',
        'count', 'array', 'itemSize', 'normalized', 'usage', 'object'
      ]}],
    },
  },
])
