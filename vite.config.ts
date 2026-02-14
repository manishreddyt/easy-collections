import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import Terminal from 'vite-plugin-terminal';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [
    react(),
    ...(command === 'serve'
      ? [Terminal({ output: ['terminal', 'console'], console: 'terminal' })]
      : []),
  ],
}));
