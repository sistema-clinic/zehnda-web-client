import { defineConfig } from 'vite'
//import { compression } from 'vite-plugin-compression2'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve:{
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
      { find: '@components', replacement: path.resolve(__dirname, 'src/components') },
      { find: '@modules', replacement: path.resolve(__dirname, 'src/modules') },
      { find: '@utils', replacement: path.resolve(__dirname, 'src/utils') },
      { find: '@redux', replacement: path.resolve(__dirname, 'src/global/redux') },
      { find: '@locale', replacement: path.resolve(__dirname, 'src/global/locale') },
      { find: '@clients', replacement: path.resolve(__dirname, 'src/utils/database') },
      { find: '@firebaseapi', replacement: path.resolve(__dirname, 'src/utils/firebaseapi') },
      { find: '@providers', replacement: path.resolve(__dirname, 'src/contexts') },
      { find: '@assets', replacement: path.resolve(__dirname, 'src/assets') },
      { find: '@layout', replacement: path.resolve(__dirname, 'src/layout') },
      { find: '@hooks', replacement: path.resolve(__dirname, 'src/hooks') },
    ]
  },
  server: {
    allowedHosts : ['839c-181-32-94-163.ngrok-free.app']
  }

})
