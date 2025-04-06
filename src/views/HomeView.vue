<!--
 * @Author: siwuxie
 * @Date: 2025-04-05 10:59:39
 * @LastEditors: siwuxie
 * @LastEditTime: 2025-04-05 13:02:37
 * @FilePath: \bilibili-music\src\views\HomeView.vue
 * @Description: 首页
 *
 * Copyright (c) 2025 by siwuxue, All Rights Reserved.
-->
<template>
  <div class="home-container">
    <!-- 搜索区域 -->
    <div class="search-section">
      <el-input
        v-model="searchKey"
        placeholder="搜索音乐"
        class="search-input"
        @keyup.enter="handleSearch"
      >
        <template #prefix>
          <el-icon><Search /></el-icon>
        </template>
      </el-input>
    </div>

    <!-- 内容区块 -->
    <div class="content-sections">
      <!-- 推荐歌单 -->
      <section class="recommend-section">
        <h3>推荐歌单</h3>
        <div class="playlist-grid">
          <div v-for="item in playlists" class="playlist-card">
            <img :src="item.cover" />
            <div class="info">
              <h4>{{ item.name }}</h4>
              <span>{{ item.count }}首</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 热门歌曲 -->
      <section class="hot-section">
        <h3>热门歌曲</h3>
        <music-list :data="hotSongs" />
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, shallowRef } from 'vue'
import { Search } from '@element-plus/icons-vue'
import MusicList from '@/components/MusicList.vue'

// 选项卡组件
// const RecommendTab = { template: '<div>推荐歌单内容</div>' }
// const HotTab = { template: '<div>热门歌曲内容</div>' }

// const currentTab = ref('recommend')
const searchKey = ref('')
// const currentTabComponent = shallowRef(RecommendTab)
const playlists = ref([]) // 推荐歌单数据
const hotSongs = ref([]) // 热门歌曲数据

// const switchTab = (tab) => {
//   currentTab.value = tab
//   currentTabComponent.value = tab === 'recommend' ? RecommendTab : HotTab
// }

const handleSearch = () => {
  console.log('执行搜索:', searchKey.value)
}
</script>

<style scoped>
.home-container {
  padding: 20px;
}

.pc-nav {
  display: flex;
  align-items: center;
  gap: 30px;
  margin-bottom: 30px;
}

.search-input {
  width: 300px;
}

.nav-tabs {
  flex: 1;
  display: flex;
  gap: 20px;
}

.mobile-nav {
  display: none;
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
}

.content {
  margin-top: 20px;
}

@media (max-width: 768px) {
  .pc-nav {
    display: none;
  }

  .mobile-nav {
    display: block;
  }

  .search-input {
    width: 100%;
  }
}
</style>
