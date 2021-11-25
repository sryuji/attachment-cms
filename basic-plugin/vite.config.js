import * as path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    assetsDir: './',
    rollupOptions: {
      input: {
        plugin: path.resolve(__dirname, 'src/plugin/main.ts'),
        'chrome-extension': path.resolve(__dirname, 'src/chrome-extension/main.ts'),
      },
      output: {
        dir: 'dist',
      },
    },
  },
})
