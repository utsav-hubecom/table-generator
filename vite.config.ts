import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      include: ['src'],
    }),
  ],
  resolve: {
    dedupe: ['react', 'react-dom'],
    alias: {
      '@Components': path.resolve(__dirname, './src/Components'),
      '@Modules': path.resolve(__dirname, './src/Modules'),
      '@Config': path.resolve(__dirname, './src/config'),
      '@Hooks': path.resolve(__dirname, './src/hooks'),
      '@Images': path.resolve(__dirname, './src/images'),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.tsx'),
      name: 'ReactTableGenerator',
      fileName: (format) => `react-tablegenerator.${format === 'es' ? 'js' : 'cjs'}`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', '@apollo/client','react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          '@apollo/client': 'ApolloClient',
        },
      },
    },
  },
});
