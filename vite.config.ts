import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/NUMBERO-challenge/',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        fallback: '404.html'
      }
    }
  }
})