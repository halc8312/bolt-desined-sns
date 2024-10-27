import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    strictPort: false, // ポートが使用中の場合は別のポートを試行
    host: true,
    hmr: {
      port: 443,
      clientPort: 443,
      host: 'localhost'
    },
    watch: {
      usePolling: false, // WebContainerでは不要
    }
  },
  preview: {
    port: 3000,
    strictPort: false,
    host: true
  }
})
