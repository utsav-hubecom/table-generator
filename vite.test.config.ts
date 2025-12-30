import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Configuration specifically for running the implementation in the /test folder
export default defineConfig({
  plugins: [react()],
  root: 'test', // Set the root to the test folder
  server: {
    port: 5170, 
    open: true, // Open browser automatically
  },
  resolve: {
    alias: {
      // We need to alias src so the test app can import from ../src
      // Since root is 'test', we need to go up one level
      '@Components': path.resolve(__dirname, './src/Components'),
      '@Modules': path.resolve(__dirname, './src/Modules'),
      '@Config': path.resolve(__dirname, './src/config'),
      '@Hooks': path.resolve(__dirname, './src/hooks'),
      '@Images': path.resolve(__dirname, './src/images'),
      // Fix imports that look for "src" relative to root
      '/src': path.resolve(__dirname, './src'),
    },
  },
});
