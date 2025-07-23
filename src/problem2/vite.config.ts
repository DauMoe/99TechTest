import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import path from 'path';

// https://vite.dev/config/
const config = {
  plugins: [svelte()],
  resolve: {
    alias: {
      '@lib': path.resolve(__dirname, 'src', 'lib'),
      '@styles': path.resolve(__dirname, 'src', 'styles'),
      "@utils": path.resolve(__dirname, 'src', 'utils.ts'),
      "@assets": path.resolve(__dirname, 'src', 'assets'),
    },
  },
};

export default defineConfig(config);
