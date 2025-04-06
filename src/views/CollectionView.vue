<!--
 * @Author: siwuxie
 * @Date: 2025-04-05 10:59:39
 * @LastEditors: siwuxie
 * @LastEditTime: 2025-04-05 13:02:37
 * @FilePath: \bilibili-music\src\views\CollectionView.vue
 * @Description: 我的收藏
 *
 * Copyright (c) 2025 by siwuxue, All Rights Reserved.
-->
<template>
  <div class="page-container">
    <h2>我的收藏</h2>
    <music-list :data="favoriteList" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import MusicList from '@/components/MusicList.vue'

const favoriteList = ref([
  // 示例数据
  { id: 1, title: '歌曲1', artist: '歌手A', album: '专辑X' },
  { id: 2, title: '歌曲2', artist: '歌手B', album: '专辑Y' },
])
</script>
