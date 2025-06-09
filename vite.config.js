import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from "vite-plugin-pwa";
import path from 'path';

const manifestForPlugIn = {
  includeAssests:['favicon.ico', "apple-touch-icon.png", "favicon.svg"],
  manifest: false
}
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugIn)],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@hooks/*': path.resolve(__dirname, 'src/hooks/*'),
      '@components/*': path.resolve(__dirname, 'src/components/*'),
      '@mixins': path.resolve(__dirname, 'src/styles/globals/mixins.js'),
      '@mui/styled-engine': '@mui/styled-engine-sc',
    }
  },
  server: {
    historyApiFallback: true, 
  },
})