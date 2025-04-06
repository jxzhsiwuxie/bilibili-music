/*
 * @Author: siwuxie
 * @Date: 2025-04-05 10:59:39
 * @LastEditors: siwuxie
 * @LastEditTime: 2025-04-06 12:18:59
 * @FilePath: \bilibili-music\vite.config.js
 * @Description: Vite 配置文件
 *
 * Copyright (c) 2025 by siwuxue, All Rights Reserved.
 */
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    //  vueDevTools()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 65432,
    open: false,
    host: '0.0.0.0',
    proxy: {
      '/bilibili-music/': {
        target: 'http://localhost:18080',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
