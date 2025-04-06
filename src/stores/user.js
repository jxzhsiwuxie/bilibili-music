/*
 * @Author: siwuxie
 * @Date: 2025-04-06 11:44:23
 * @LastEditors: siwuxie
 * @LastEditTime: 2025-04-06 15:35:51
 * @FilePath: \bilibili-music\src\stores\user.js
 * @Description: 用户状态管理
 *
 * Copyright (c) 2025 by siwuxue, All Rights Reserved.
 */
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    _isLogin: localStorage.getItem('isLogin') || false,
    _profile: JSON.parse(localStorage.getItem('profile') || '{}'),
    _avatarBase64: localStorage.getItem('avatarBase64') || '',
  }),

  actions: {
    login(userInfo) {
      const isLogin = userInfo.isLogin
      const profile = userInfo
      localStorage.setItem('isLogin', isLogin)
      localStorage.setItem('profile', JSON.stringify(profile))
    },
    setAvatarBase64(base64) {
      localStorage.setItem('avatarBase64', base64)
    },
    logout() {
      localStorage.removeItem('isLogin')
      localStorage.removeItem('profile')
    },
  },

  getters: {
    isLogin: (state) => !!state._isLogin,
    profile: (state) => state._profile,
    userName: (state) => state._profile.uname || '',
    userAvatar: (state) => state._profile.face || '',
    avatarBase64: (state) => state._avatarBase64 || '',
  },
})
