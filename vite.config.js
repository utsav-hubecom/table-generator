import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    open: "/test/index.html",
  },
  build: {
    lib: {
      entry: "index.js", // Entry point of your library
      name: "react-tablegenerator", // Name of your library (accessible in global scope)
    },
    rollupOptions: {
      external: ["react", "react-dom"], // Specifies React and ReactDOM as external
      output: {
        minify: false, // Disable minification
        sourcemap: false,
        globals: {
          react: "React", // Assumes 'React' is available globally
          "react-dom": "ReactDOM", // Assumes 'ReactDOM' is available globally
        },
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@Root", replacement: path.resolve(__dirname, "./src") },
      {
        find: "@Components",
        replacement: path.resolve(__dirname, "./src/Components"),
      },
      { find: "@Api", replacement: path.resolve(__dirname, "./src/Api") },
      { find: "@Config", replacement: path.resolve(__dirname, "./src/config") },
      {
        find: "@Modules",
        replacement: path.resolve(__dirname, "./src/modules"),
      },
      { find: "@Redux", replacement: path.resolve(__dirname, "./src/Redux") },
      {
        find: "@Layouts",
        replacement: path.resolve(__dirname, "./src/Layouts"),
      },
      { find: "@Hooks", replacement: path.resolve(__dirname, "./src/hooks") },
      { find: "@Images", replacement: path.resolve(__dirname, "./src/images") },
    ],
  },
});
