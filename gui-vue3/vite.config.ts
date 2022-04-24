import { fileURLToPath, URL } from 'url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// export default ({ mode }) => {
//   process.env = {
//     ...process.env,
//     ...loadEnv(mode, process.cwd()),
//   };

//   return defineConfig({
//     plugins: [vue()],
//     resolve: {
//       alias: {
//         '@': fileURLToPath(new URL('./src', import.meta.url))
//       }
//     },
//     server: {
//       port: process.env.VITE_PORT,
//     },
//   });
// }


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: true,
    // port: 8080,
    port: parseInt(<string>process.env.VITE_PORT) || 8080,
  },
})
