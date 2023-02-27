import { resolve } from 'path'
import { defineConfig } from 'vite'

console.log()
export default defineConfig({
  build: {
    outDir: './dist',
    minify: process.env.NODE_ENV === 'development' ? false : 'esbuild',
    lib: {
      entry: resolve(__dirname, 'src/app.js'),
      name: 'app',
    },
    rollupOptions: {
      output: {
        entryFileNames: `[name].js`,
        chunkFileNames: `[name].js`,
        assetFileNames: `[name].[ext]`,
      },
    },
  },
})
