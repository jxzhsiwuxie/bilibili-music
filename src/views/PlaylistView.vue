<!--
 * @Author: siwuxie
 * @Date: 2025-04-05 13:24:29
 * @LastEditors: siwuxie
 * @LastEditTime: 2025-04-05 13:24:55
 * @FilePath: \bilibili-music\src\views\PlaylistView.vue
 * @Description: 我的歌单
 *
 * Copyright (c) 2025 by siwuxue, All Rights Reserved.
-->
<template>
  <div class="page-container">
    <h2>我的歌单</h2>
    <div class="playlist-grid">
      <div v-for="item in playlists" :key="item.id" class="playlist-card">
        <img :src="item.cover" />
        <div class="info">
          <h3>{{ item.name }}</h3>
          <span>{{ item.count }}首</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const playlists = ref([
  {
    id: 1,
    name: '最爱歌单',
    cover: 'https://picsum.photos/200',
    count: 12,
  },
])
</script>

<style>
.playlist-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.playlist-card img {
  width: 100%;
  border-radius: 8px;
}
</style>
