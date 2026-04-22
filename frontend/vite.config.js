import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('@fortawesome')) return 'fontawesome';
          if (id.includes('react-dom') || id.includes('react/')) return 'vendor';
        }
      }
    }
  }
})