/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

const packages = ['firebase', 'draft-js'];
const manualChunks = (id: string) => {
  if (id.includes('node_modules')) {
    const index = packages.findIndex((p) => id.includes(p));
    if (index >= 0) {
      return `vendor-${packages[index]}`;
    }

    return 'vendor';
  }
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks,
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests/setup.ts',
    globalSetup: './src/tests/globalSetup.ts',
    css: false,
  },
  resolve: {
    alias: {
      '@test-utils': 'src/tests/utils',
    },
  },
});
