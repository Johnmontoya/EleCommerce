import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),],
  server: {
    allowedHosts: [
      "https://elecommerce-production.up.railway.app",
      "https://report-ele-com.vercel.app",
      //"unstuffed-jodi-invigoratedly.ngrok-free.dev"
    ]
  }
})
