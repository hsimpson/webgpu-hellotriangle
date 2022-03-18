// vite.config.ts
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 8081,
  },
  build: {
    minify: true,
  },
  base: '',
});
