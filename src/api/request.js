/*
 * @Author: siwuxie
 * @Date: 2025-04-05 19:58:31
 * @LastEditors: siwuxie
 * @LastEditTime: 2025-04-06 14:41:30
 * @FilePath: \bilibili-music\src\api\request.js
 * @Description: 请求封装
 *
 * Copyright (c) 2025 by siwuxue, All Rights Reserved.
 */
import axios from 'axios'
import { useUserStore } from '@/stores/user'

const service = axios.create({
  baseURL: '/bilibili-music', // 配置请求同意前缀代理
  timeout: 10000, // 请求超时10秒
})

// 请求拦截器
service.interceptors.request.use((config) => {
  const store = useUserStore()

  if (store.token) {
    // config.headers['X-Token'] = store.token
    console.log('Token:', store.token)
  }
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
