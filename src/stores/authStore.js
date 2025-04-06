/*
 * @Author: siwuxie
 * @Date: 2025-04-05 20:13:12
 * @LastEditors: siwuxie
 * @LastEditTime: 2025-04-06 01:50:38
 * @FilePath: \bilibili-music\src\stores\authStore.js
 * @Description: Bilibili 用户认证状态管理
 *
 * Copyright (c) 2025 by siwuxue, All Rights Reserved.
 */
import { defineStore } from 'pinia'
import { ref } from 'vue'

/**
 * 解析登录鉴权信息
 * 入参示例：
 * https://passport.biligame.com/x/passport-login/web/crossDomain?DedeUserID=3546881900677957\u0026DedeUserID__ckMd5=329da8731c69eda0\u0026Expires=1759418388\u0026SESSDATA=d0e5bf82,1759418388,47191*42CjCrHhtWL1OZzF5YFLo7WYKVz5-ot4zP3kVJ1b7zIlQ5kI6Js_I80PAcb9yehD4_qTASVnBkcERHb0NrYmYxZUwwQ28zTElxb2NDaEVDc1VmRUFsZWZSZnQzV2loNjJkblF1a0hiOXNudzJCMVZPMlhnSnpQbnZzZEJKWW1HRTZ2aTdQZy1wRzZBIIEC\u0026bili_jct=b0bc25d67baf622287dc0489acc76ca2\u0026gourl=https%3A%2F%2Fwww.bilibili.com\u0026first_domain=.bilibili.com
 * @param {String} url 登录成功后返回的 URL
 * @returns
 */
function parseUrl(url) {
  const urlObj = new URL(url)
  const params = Object.fromEntries(urlObj.searchParams.entries())
  return {
    DedeUserID: params.DedeUserID,
    DedeUserID__ckMd5: params.DedeUserID__ckMd5,
    Expires: params.Expires,
    SESSDATA: params.SESSDATA,
    bili_jct: params.bili_jct,
  }
}

export const useAuthStore = defineStore('auth', () => {
  const userInfo = ref(null)
  const isLoggedIn = ref(false)

  // 保存登录信息，直接结构
  function saveAuthData(data) {
    const url = data.url
    const parsedData = parseUrl(url)
    const refreshToken = data.refresh_token

    const bilibiliAuth = {
      ...parsedData,
      refresh_token: refreshToken,
    }

    localStorage.setItem('bilibili_auth', JSON.stringify(bilibiliAuth))
  }

  function getAuthData() {
    const saved = localStorage.getItem('bilibili_auth')
    if (saved) {
      const parsedData = JSON.parse(saved)
      return parsedData
    } else {
      return null
    }
  }

  function clearAuthData() {
    localStorage.removeItem('bilibili_auth')
    userInfo.value = null
    isLoggedIn.value = false
  }

  // 初始化时检查本地存储
  function initialize() {
    const saved = localStorage.getItem('bilibili_auth')
    if (saved) {
      // TODO   // 解析数据
      // userInfo.value = JSON.parse(saved)
      // isLoggedIn.value = true
    }
  }

  return { userInfo, isLoggedIn, saveAuthData, initialize, getAuthData, clearAuthData }
})
