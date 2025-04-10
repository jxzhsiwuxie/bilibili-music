/*
 * @Author: siwuxie
 * @Date: 2025-04-06 21:41:01
 * @LastEditors: siwuxie
 * @LastEditTime: 2025-04-06 22:12:15
 * @FilePath: \bilibili-music\src\utils\wbi-sign.js
 * @Description: Bilibili wbi 签名
 * 详细参考 https://github.com/SocialSisterYi/bilibili-API-collect/blob/master/docs/misc/sign/wbi.md
 *
 * Copyright (c) 2025 by siwuxue, All Rights Reserved.
 */
import MD5 from 'crypto-js/md5'

const mixinKeyEncTab = [
  46, 47, 18, 2, 53, 8, 23, 32, 15, 50, 10, 31, 58, 3, 45, 35, 27, 43, 5, 49, 33, 9, 42, 19, 29, 28,
  14, 39, 12, 38, 41, 13, 37, 48, 7, 16, 24, 55, 40, 61, 26, 17, 0, 1, 60, 51, 30, 4, 22, 25, 54,
  21, 56, 59, 6, 63, 57, 62, 11, 36, 20, 34, 44, 52,
]

// 对 imgKey 和 subKey 进行字符顺序打乱编码
const getMixinKey = (orig) =>
  mixinKeyEncTab
    .map((n) => orig[n])
    .join('')
    .slice(0, 32)

// 为请求参数进行 wbi 签名
function encWbi(params, img_key, sub_key) {
  const mixin_key = getMixinKey(img_key + sub_key),
    curr_time = Math.round(Date.now() / 1000),
    chr_filter = /[!'()*]/g

  Object.assign(params, { wts: curr_time }) // 添加 wts 字段
  // 按照 key 重排参数
  const query = Object.keys(params)
    .sort()
    .map((key) => {
      // 过滤 value 中的 "!'()*" 字符
      const value = params[key].toString().replace(chr_filter, '')
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    })
    .join('&')

  const wbi_sign = MD5(query + mixin_key).toString() // 计算 w_rid

  return query + '&w_rid=' + wbi_sign
}

// 通过 https://api.bilibili.com/x/web-interface/nav
// 获取最新的 img_key 和 sub_key
// 也就是响应参数中 res.data.wbi_img.img_url 和 res.data.wbi_img.sub_url 这两个字段
async function getWbiKeys(navRes) {
  const {
    wbi_img: { img_url, sub_url },
  } = navRes

  return {
    img_key: img_url.slice(img_url.lastIndexOf('/') + 1, img_url.lastIndexOf('.')),
    sub_key: sub_url.slice(sub_url.lastIndexOf('/') + 1, sub_url.lastIndexOf('.')),
  }
}

/**
 * @description: 获取 wbi 签名
 * @param {Object} navRes -  接口 x/web-interface/nav 的响应参数
 * @param {Object} params - 原本的请求参数
 * @returns {Promise} Promise
 */
export default async (navRes, params) => {
  const web_keys = await getWbiKeys(navRes)
  const img_key = web_keys.img_key
  const sub_key = web_keys.sub_key
  const query = encWbi(params, img_key, sub_key)
  return query
}
