/**
 * @Author: siwuxie
 * @Date: 2025-04-05 11:22:52
 * @LastEditors: siwuxie
 * @LastEditTime: 2025-04-05 11:54:57
 * @FilePath: \bilibili-music\src\stores\user.js
 * @Description: 用户状态管理
 *
 * Copyright (c) 2025 by siwuxue, All Rights Reserved.
 */
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: localStorage.getItem('music_token') || '',
    profile: JSON.parse(localStorage.getItem('music_profile') || '{}'),
  }),
  actions: {
    login(form) {
      // 模拟登录逻辑
      this.token = 'mock_token'
      this.profile = { username: form.username }
      localStorage.setItem('music_token', this.token)
      localStorage.setItem('music_profile', JSON.stringify(this.profile))
    },
    logout() {
      this.token = ''
      this.profile = {}
      localStorage.removeItem('music_token')
      localStorage.removeItem('music_profile')
    },
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
  },
})
