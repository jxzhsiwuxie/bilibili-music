/*
 * @Author: siwuxie
 * @Date: 2025-04-05 13:28:19
 * @LastEditors: siwuxie
 * @LastEditTime: 2025-04-05 13:28:40
 * @FilePath: \bilibili-music\src\stores\player.js
 * @Description: 音乐播放器状态管理
 *
 * Copyright (c) 2025 by siwuxue, All Rights Reserved.
 */
import { defineStore } from 'pinia'

export const usePlayerStore = defineStore('player', {
  state: () => ({
    currentSong: null,
    isPlaying: false,
    playlist: [],
  }),
  actions: {
    setCurrentSong(song) {
      this.currentSong = song
      this.isPlaying = true
    },
    togglePlay() {
      this.isPlaying = !this.isPlaying
    },
    playNext() {
      // 实现播放列表逻辑
    },
  },
})
