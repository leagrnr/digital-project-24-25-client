import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        "short_name": "Kit it",
        "name": "Kit it",
        "icons": [
          {
            "src": "./src/assets/favicon/web-app-manifest-192x192.png",
            "sizes": "192x192",
            "type": "image/png"
          },
          {
            "src": "./src/assets/favicon/web-app-manifest-512x512.png",
            "sizes": "512x512",
            "type": "image/png"
          }
        ],
        "start_url": ".",
        "display": "standalone",
        "theme_color": "#000000",
        "background_color": "#ffffff"
      }
    })
  ]
})
