import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import os from 'os'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  // cache fuera de OneDrive/Documentos para evitar EPERM
  cacheDir: path.join(os.tmpdir(), 'vite-cache-tiquetes'),
  server: { port: 5173, strictPort: true }
})
