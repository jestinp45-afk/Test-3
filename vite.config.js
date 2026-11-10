import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// base './' is required so the built app loads correctly inside the Android WebView.
export default defineConfig({ base: './', plugins: [react()] });
