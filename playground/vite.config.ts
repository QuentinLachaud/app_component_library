import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  root: resolve(__dirname),
  publicDir: resolve(__dirname, '../public'),
  resolve: {
    alias: {
      // Alias the library package name to the source entry for HMR
      '@quentinlachaud/app-component-library': resolve(__dirname, '../src/index.ts'),
    },
  },
  server: {
    port: 5173,
    open: true,
  },
})
