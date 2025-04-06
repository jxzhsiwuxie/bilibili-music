/*
 * @Author: siwuxie
 * @Date: 2025-04-05 15:36:41
 * @LastEditors: siwuxie
 * @LastEditTime: 2025-04-05 17:22:35
 * @FilePath: \bilibili-music\src\stores\layout.js
 * @Description: 布局状态管理，包含主题和尺寸以及侧边栏状态
 *
 * Copyright (c) 2025 by siwuxue, All Rights Reserved.
 */
import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useLayoutStore = defineStore('layout', () => {
  const isDark = ref(false)
  const isSidebarCollapsed = ref(false)
  const isMobile = ref(false)

  function toggleTheme() {
    isDark.value = !isDark.value
  }

  // 展开侧边栏
  function expandSidebar() {
    isSidebarCollapsed.value = false
  }
  // 收起侧边栏
  function collapseSidebar() {
    isSidebarCollapsed.value = true
  }
  // 切换侧边栏状态
  function toggleSidebar() {
    isSidebarCollapsed.value = !isSidebarCollapsed.value
  }

  return {
    isDark,
    isMobile,
    isSidebarCollapsed,
    toggleTheme,
    expandSidebar,
    collapseSidebar,
    toggleSidebar,
  }
})
