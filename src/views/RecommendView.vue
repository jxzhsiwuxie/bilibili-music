<!--
 * @Author: siwuxie
 * @Date: 2025-04-05 13:24:29
 * @LastEditors: siwuxie
 * @LastEditTime: 2025-04-05 13:24:55
 * @FilePath: \bilibili-music\src\views\RecommendView.vue
 * @Description: 每日推荐
 *
 * Copyright (c) 2025 by siwuxue, All Rights Reserved.
-->
<template>
  <div class="page-container">
    <h2>每日推荐</h2>
    <music-list :data="recommendList" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import MusicList from '@/components/MusicList.vue'

const recommendList = ref([
  // 示例数据
  { id: 3, title: '推荐歌曲1', artist: '歌手C', album: '专辑Z' },
])
</script>
