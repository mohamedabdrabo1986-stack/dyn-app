import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// config عشان Vercel يبني صح
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext'
  }
})
