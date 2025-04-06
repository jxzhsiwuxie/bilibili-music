/*
 * @Author: siwuxie
 * @Date: 2025-04-05 19:58:31
 * @LastEditors: siwuxie
 * @LastEditTime: 2025-04-06 10:21:42
 * @FilePath: \bilibili-music\src\api\request.js
 * @Description: 请求封装
 *
 * Copyright (c) 2025 by siwuxue, All Rights Reserved.
 */
import axios from 'axios'
import { useUserStore } from '@/stores/user'

const service = axios.create({
  baseURL: '/bilibili-music', // 配置Vite代理
  timeout: 10000, // 请求超时10秒
})

// 请求拦截器
service.interceptors.request.use((config) => {
  const store = useUserStore()
  if (store.token) {
    // config.headers['X-Token'] = store.token
    console.log('Token:', store.token)
  }
  // // 检查请求地址是否包含 /bilibili-api，如果包含则修改请求头信息
  // if (config.url && config.url.includes('/bilibili-api')) {
  //   config.headers['Origin'] = 'https://www.bilibili.com'
  //   config.headers['Referer'] = 'https://www.bilibili.com/'
  //   config.headers['User-Agent'] =
  //     'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36'
  //   config.withCredentials = true // 允许携带凭证
  // }
  return config
})

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    console.error('API Error:', error)
    return Promise.reject(error)
  },
)

export default service
