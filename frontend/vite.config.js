import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',  // Replace with your backend's port
        changeOrigin: true,
        secure: false, // Set to false if you're using HTTP
      },
    },
  },
});
