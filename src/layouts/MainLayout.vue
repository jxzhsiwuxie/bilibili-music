<!--
 * @Author: siwuxie
 * @Date: 2025-04-05 11:22:52
 * @LastEditors: siwuxie
 * @LastEditTime: 2025-04-06 16:45:20
 * @FilePath: \bilibili-music\src\layouts\MainLayout.vue
 * @Description: 主布局
 *
 * Copyright (c) 2025 by siwuxue, All Rights Reserved.
-->
<template>
  <div class="main-layout">
    <!-- 遮罩层 -->
    <div class="layout-mask" v-if="isMobile && !isCollapsed" @click="maskClick"></div>
    <!-- 主布局 -->
    <el-container class="out-container">
      <!-- 响应式侧边栏 -->
      <el-aside
        :class="[
          'sidebar-container',
          { 'sidebar-container-collapsed': isCollapsed },
          { 'sidebar-container-mobile': isMobile },
        ]"
      >
        <div class="sidebar-menu">
          <p title="发现音乐" class="sidebar-menu-item" @click="() => menuItemClick('home')">
            <el-icon><HomeFilled /></el-icon>
            <span>发现音乐</span>
          </p>
          <p title="我的收藏" class="sidebar-menu-item" @click="() => menuItemClick('collection')">
            <el-icon><Star /></el-icon>
            <span>我的收藏</span>
          </p>
          <p title="每日推荐" class="sidebar-menu-item" @click="() => menuItemClick('recommend')">
            <el-icon><Calendar /></el-icon>
            <span>每日推荐</span>
          </p>
          <p title="我的歌单" class="sidebar-menu-item" @click="() => menuItemClick('playlist')">
            <el-icon><List /></el-icon>
            <span>我的歌单</span>
          </p>
          <p title="推出登录" class="sidebar-menu-item" @click="handleLogout">
            <el-icon><List /></el-icon>
            <span>推出登录</span>
          </p>
        </div>
      </el-aside>

      <el-container
        :class="[
          'main-container',
          { 'main-container-collapsed': isCollapsed },
          { 'main-container-mobile': isMobile },
        ]"
      >
        <el-header class="header">
          <!-- 导航控制按钮 -->
          <div class="collapse-btn" @click="toggleCollapse">
            <el-icon :size="20">
              <component :is="isCollapsed ? Expand : Fold" />
            </el-icon>
          </div>
          <div class="logo">Bilibili Music</div>
          <!-- 主题切换按钮 -->
          <el-icon :size="20" :class="['theme-toggle', { dark: isDark }]" @click="toggleTheme">
            <component :is="isDark ? Sunny : Moon" />
          </el-icon>
          <!-- 用户信息 -->
          <div class="user-info">
            <img class="user-avatar" :src="circleUrl" :alt="userName" />
            <span class="user-name">{{ userName }}</span>
          </div>
        </el-header>
        <!-- 主内容区域 -->
        <el-main :class="{ 'content-collapsed': isCollapsed }">
          <router-view />
          <music-player />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, watchEffect } from 'vue'
import { useWindowSize } from '@vueuse/core'
import {
  HomeFilled,
  Star,
  Calendar,
  List,
  Fold,
  Expand,
  Sunny,
  Moon,
} from '@element-plus/icons-vue'
import MusicPlayer from '@/components/MusicPlayer.vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useLayoutStore } from '@/stores/layout'
import { getAvatarBase64 } from '@/api/bilibili'

// 主题切换
const isDark = ref(localStorage.getItem('theme') === 'dark')
const toggleTheme = () => {
  isDark.value = !isDark.value
  document.body.classList.toggle('dark-mode', isDark.value)
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}
watchEffect(() => {
  document.body.classList.toggle('dark-mode', isDark.value)
})

// 用户信息
const circleUrl = ref('')
const userName = ref('')
const userStore = useUserStore()

// 退出登录
const router = useRouter()
const handleLogout = () => {
  userStore.logout()
  router.push({ name: 'login' })
}

const layoutStore = useLayoutStore()
// 根据屏幕宽度判断是否为移动端
const { width: windowWidth } = useWindowSize()
const isMobile = computed(() => windowWidth.value < 768)
watch(isMobile, (newValue) => {
  console.log('isMobile changed')
  layoutStore.isMobile = newValue
})

// 侧边栏是否折叠
const isCollapsed = ref(false)

onMounted(() => {
  isCollapsed.value = isMobile.value
  userName.value = userStore.userName

  // 获取用户头像
  getAvatarBase64(new URL(userStore.userAvatar).pathname)
    .then((res) => {
      console.log('获取头像成功', res)
      const uint8Array = new Uint8Array(res)
      // 将Uint8Array转换为Base64字符串
      const base64String = btoa(
        uint8Array.reduce((data, byte) => data + String.fromCharCode(byte), ''),
      )
      // 设置图片的Base64源
      circleUrl.value = `data:image/*;base64,${base64String}`
    })
    .catch((error) => {
      console.error('获取头像失败', error)
    })
})

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value
  layoutStore.toggleSidebar()
}

const maskClick = () => {
  toggleCollapse()
}

const menuItemClick = (routeName) => {
  router.push({ name: routeName })
  toggleCollapse()
}
</script>

<style lang="scss" scoped>
$mask-index: 10000;
$collapse-time: 0.6s;
$sidebar-width: 160px;

.main-layout {
  position: relative;
  height: 100vh;
  width: 100vw;

  .layout-mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: $mask-index;
  }

  .out-container {
    position: absolute;
    height: 100%;
    width: 100%;
  }

  .sidebar-container {
    position: absolute;
    height: 100vh;
    width: $sidebar-width;
    transition: width $collapse-time ease;
    z-index: calc($mask-index + 10);
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.32);

    &.sidebar-container-collapsed {
      width: 0 !important;
    }

    &.sidebar-container-mobile {
      width: $sidebar-width;
    }

    .sidebar-menu {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      background-color: #f5f5f5;

      .sidebar-menu-item {
        width: $sidebar-width;
        height: 48px;
        display: flex;
        overflow-x: hidden;
        align-items: center;
        justify-content: flex-start;
        padding: 8px 16px;
        cursor: pointer;
        color: #333;
        font-size: 16px;
        border-radius: 12px;

        &:hover {
          background-color: #077fa7;
          color: #f5f5f5;
        }

        span {
          margin-left: 10px;
        }
      }
    }
  }

  .main-container {
    position: absolute;
    z-index: calc($mask-index - 10);
    top: 0;
    left: $sidebar-width;
    width: calc(100% - $sidebar-width);
    height: 100%;
    transition: left $collapse-time ease;

    &.main-container-collapsed {
      left: 0 !important;
      width: 100% !important;
    }

    &.main-container-mobile {
      left: 0px;
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;

      .user-info {
        display: flex;
        align-items: center;
        cursor: pointer;

        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
          transition: all 0.3s ease;
        }

        .user-name {
          margin-left: 10px;
          font-size: 16px;
          color: #333;
          width: 10em;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>
