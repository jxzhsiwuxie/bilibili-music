<!--
 * @Author: siwuxie
 * @Date: 2025-04-05 13:27:26
 * @LastEditors: siwuxie
 * @LastEditTime: 2025-04-05 14:07:25
 * @FilePath: \bilibili-music\src\components\MusicPlayer.vue
 * @Description: 音乐播放器组件
 *
 * Copyright (c) 2025 by siwuxue, All Rights Reserved.
-->
<template>
  <div class="music-player" v-show="currentSong">
    <audio ref="audioRef" @timeupdate="updateProgress"></audio>

    <!-- 播放控制 -->
    <div class="controls">
      <el-button circle @click="playPrev">
        <el-icon><Back /></el-icon>
      </el-button>

      <el-button circle type="primary" @click="togglePlay">
        <el-icon :size="20">{{ isPlaying ? 'VideoPause' : 'VideoPlay' }}</el-icon>
      </el-button>

      <el-button circle @click="playNext">
        <el-icon><Right /></el-icon>
      </el-button>
    </div>

    <!-- 进度条 -->
    <div class="progress">
      <span>{{ currentTime }}</span>
      <el-slider v-model="progress" :step="0.1" @change="seek" />
      <span>{{ duration }}</span>
    </div>

    <!-- 歌词面板 -->
    <div class="lyrics" v-if="currentLyrics">
      <div
        v-for="(line, index) in currentLyrics"
        :key="index"
        :class="{ active: currentLine === index }"
      >
        {{ line.text }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { parseLyric } from '@/utils/lyric-parser'
import { Back, Right, VideoPlay, VideoPause } from '@element-plus/icons-vue'
import { usePlayerStore } from '@/stores/player'

const playerStore = usePlayerStore()
const audioRef = ref(null)
const progress = ref(0)
const currentLine = ref(0)
const currentTime = ref(0)
const duration = ref(0)

const currentSong = computed(() => playerStore.currentSong)
const isPlaying = computed(() => playerStore.isPlaying)
const currentLyrics = computed(() => (currentSong.value ? parseLyric(currentSong.value.lyric) : []))
const playPrev = () => {
  console.log('Play previous song')
}
const playNext = () => {
  console.log('Play playNext song')
}
const seek = () => {
  console.log('seek song')
}

// 播放控制逻辑
watch(currentSong, (newVal) => {
  if (newVal) {
    audioRef.value.src = newVal.url
    audioRef.value.play()
    playerStore.setPlaying(true)
  }
})

const togglePlay = () => {
  playerStore.togglePlay()
  if (isPlaying.value) {
    audioRef.value.play()
  } else {
    audioRef.value.pause()
  }
}

// 完整实现需包含播放列表管理和歌词同步逻辑
</script>

<style>
.music-player {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--current-bg);
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  padding: 15px;
}

.controls {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 15px;
}

.progress {
  display: flex;
  align-items: center;
  gap: 10px;
}

.lyrics {
  max-height: 200px;
  overflow-y: auto;
  text-align: center;
  margin-top: 15px;
}

.lyrics .active {
  color: var(--primary-color);
  font-weight: bold;
}
</style>
