import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          fontawesome: ["@fortawesome/react-fontawesome", "@fortawesome/free-solid-svg-icons", "@fortawesome/free-brands-svg-icons"],
          vendor: ["react", "react-dom"],
        }
      }
    }
  }
})