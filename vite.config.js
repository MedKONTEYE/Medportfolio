import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base './' : le site fonctionne aussi bien sur Vercel que sur GitHub Pages.
export default defineConfig({
  base: './',
  plugins: [react()],
})
