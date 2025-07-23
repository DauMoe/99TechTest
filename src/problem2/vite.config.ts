import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vite.dev/config/
export default defineConfig({
  base: './', // ensures relative paths in build output
  plugins: [svelte()],
  resolve: {
    alias: {
      '@lib': '/src/lib',
      '@styles': '/src/styles',
      '@utils': '/src/utils.ts',
      '@assets': '/src/assets',
      '@pages': '/src/pages',
      '@handler': '/src/handler',
    },
  },
});
