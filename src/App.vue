<!--
 * @Author: siwuxie
 * @Date: 2025-04-05 10:59:39
 * @LastEditors: siwuxie
 * @LastEditTime: 2025-04-05 13:00:51
 * @FilePath: \bilibili-music\src\App.vue
 * @Description: 主应用程序
 *
 * Copyright (c) 2025 by siwuxue, All Rights Reserved.
-->
<template>
  <div id="app">
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </div>
</template>

<style>
#app {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
