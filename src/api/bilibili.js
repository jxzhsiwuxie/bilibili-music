/*
 * @Author: siwuxie
 * @Date: 2025-04-05 20:17:09
 * @LastEditors: siwuxie
 * @LastEditTime: 2025-04-06 16:41:56
 * @FilePath: \bilibili-music\src\api\bilibili.js
 * @Description: Bilibili 请求接口
 *
 * Copyright (c) 2025 by siwuxue, All Rights Reserved.
 */
import request from './request'

// 登录鉴权的前缀
const BILIBILI_PASSPORT = '/bilibili-passport'
// 换取信息的前缀
const BILIBILI_API = '/bilibili-api'
// 图片资源的前缀
const BILIBILI_BFS = '/bilibili-bfs'

/**
 * 获取登录二维码
 * 请求成功示例响应
{
    "code": 0,
    "message": "0",
    "ttl": 1,
    "data": {
        "url": "https://passport.bilibili.com/h5-app/passport/login/scan?navhide=1\u0026qrcode_key=8587cf8106a0b863c46d6bab913537f6\u0026from=",
        "qrcode_key": "8587cf8106a0b863c46d6bab913537f6"
    }
}
 * @returns {Promise} Promise
 */
export const generateLoginQrCode = () =>
  request({
    url: `${BILIBILI_PASSPORT}/x/passport-login/web/qrcode/generate`,
    method: 'get',
  })

/**
 * 检查登录二维码状态
 * 请求成功示例响应
 {
    "code": 0,
    "message": "0",
    "ttl": 1,
    "data": {
        "url": "https://passport.biligame.com/x/passport-login/web/crossDomain?DedeUserID=3546881900677957\u0026DedeUserID__ckMd5=329da8731c69eda0\u0026Expires=1759418388\u0026SESSDATA=d0e5bf82,1759418388,47191*42CjCrHhtWL1OZzF5YFLo7WYKVz5-ot4zP3kVJ1b7zIlQ5kI6Js_I80PAcb9yehD4_qTASVnBkcERHb0NrYmYxZUwwQ28zTElxb2NDaEVDc1VmRUFsZWZSZnQzV2loNjJkblF1a0hiOXNudzJCMVZPMlhnSnpQbnZzZEJKWW1HRTZ2aTdQZy1wRzZBIIEC\u0026bili_jct=b0bc25d67baf622287dc0489acc76ca2\u0026gourl=https%3A%2F%2Fwww.bilibili.com\u0026first_domain=.bilibili.com",
        "refresh_token": "4ff32b34a46503e10c68fe627810aa42",
        "timestamp": 1743866388315,
        "code": 0,
        "message": ""
    }
  }
 * @returns {Promise} Promise
 */
export const checkLoginQrCodeStatus = (qrKey) =>
  request({
    url: `${BILIBILI_PASSPORT}/x/passport-login/web/qrcode/poll`,
    method: 'get',
    params: {
      qrcode_key: qrKey,
    },
  })

/**
 * 获取登录用户信息
 * @returns {Promise} Promise
 */
export const getLoginInfo = () => {
  return request({
    url: `${BILIBILI_API}/x/web-interface/nav`,
    method: 'get',
  })
}

/**
 * 获取登录用户的头像
 * @param {String} avatarPath 头像路径
 * @returns
 */
export const getAvatarBase64 = (avatarPath) => {
  return request({
    url: `${BILIBILI_BFS}${avatarPath}`,
    method: 'get',
    responseType: 'arraybuffer',
  })
}
