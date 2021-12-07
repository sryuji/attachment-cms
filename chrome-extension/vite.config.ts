import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from './src/utils/file'
import copy from 'rollup-plugin-copy'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    copy({
      verbose: true,
      hook: 'writeBundle',
      targets: [
        {
          src: 'public/*',
          dest: 'dist/public',
        },
        {
          src: '*.html',
          dest: 'dist',
        },
      ],
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        background: resolve('src/background.ts'),
        inject: resolve('src/web-accessible-resources/inject.ts'),
        'content-script': resolve('src/content-scripts/content-script.ts'),
      },
      output: {
        entryFileNames: 'js/[name].js',
      },
    },
  },
})
