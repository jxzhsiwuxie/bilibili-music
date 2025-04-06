/**
 * @Author: siwuxie
 * @Date: 2025-04-05 11:22:52
 * @LastEditors: siwuxie
 * @LastEditTime: 2025-04-05 11:54:57
 * @FilePath: \bilibili-music\src\main.js
 * @Description: 入口逻辑
 *
 * Copyright (c) 2025 by siwuxue, All Rights Reserved.
 */
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(ElementPlus)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.mount('#app')
