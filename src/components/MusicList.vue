<!--
 * @Author: siwuxie
 * @Date: 2025-04-05 13:26:42
 * @LastEditors: siwuxie
 * @LastEditTime: 2025-04-05 13:26:54
 * @FilePath: \bilibili-music\src\components\MusicList.vue
 * @Description: 音乐列表组件
 *
 * Copyright (c) 2025 by siwuxue, All Rights Reserved.
-->
<template>
  <div class="music-list">
    <div v-for="item in data" :key="item.id" class="music-item">
      <div class="main-info" @click="play(item)">
        <span class="title">{{ item.title }}</span>
        <span class="artist" @click.stop="gotoArtist(item.artist)">
          {{ item.artist }}
        </span>
      </div>
      <span class="album" @click.stop="gotoAlbum(item.album)">
        {{ item.album }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { usePlayerStore } from '@/stores/player'

const props = defineProps(['data'])
const router = useRouter()
const playerStore = usePlayerStore()

const play = (item) => {
  playerStore.setCurrentSong(item)
}

const gotoArtist = (name) => {
  router.push({ name: 'artist', params: { name } })
}

const gotoAlbum = (name) => {
  router.push({ name: 'album', params: { name } })
}
</script>

<style>
.music-list {
  border-radius: 8px;
  background: var(--current-secondary);
}

.music-item {
  display: flex;
  justify-content: space-between;
  padding: 12px;
  cursor: pointer;
  transition: background 0.3s;
}

.music-item:hover {
  background: rgba(0, 0, 0, 0.05);
}

.main-info {
  flex: 1;
}

.title {
  font-weight: 500;
  margin-right: 15px;
}

.artist,
.album {
  color: var(--primary-color);
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
}
</style>
