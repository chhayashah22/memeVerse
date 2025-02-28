import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    https: true,
    host: "0.0.0.0",
    port: process.env.PORT || 10000},
  plugins: [react()],
})
