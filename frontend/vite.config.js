import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // allow network access
    port: 5173, // your dev port
    allowedHosts: [
      'camden-unsandalled-alejandro.ngrok-free.dev', // your ngrok URL
      'localhost'
    ],
  },
  test: {
    globals: true,
    environment: 'jsdom',  // or 'node', depending on your testing environment
  }
})
