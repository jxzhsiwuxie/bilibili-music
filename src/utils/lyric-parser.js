/*
 * @Author: siwuxie
 * @Date: 2025-04-05 13:29:15
 * @LastEditors: siwuxie
 * @LastEditTime: 2025-04-05 13:29:29
 * @FilePath: \bilibili-music\src\utils\lyric-parser.js
 * @Description: 歌词解析器
 *
 * Copyright (c) 2025 by siwuxue, All Rights Reserved.
 */
export function parseLyric(lrc) {
  const lines = lrc.split('\n')
  return lines
    .map((line) => {
      const timeMatch = line.match(/\[(\d{2}):(\d{2}).(\d{2,3})\]/)
      if (!timeMatch) return null
      const minutes = parseInt(timeMatch[1])
      const seconds = parseInt(timeMatch[2])
      const milliseconds = parseInt(timeMatch[3])
      const time = minutes * 60 + seconds + milliseconds / 1000
      const text = line.replace(timeMatch[0], '').trim()
      return { time, text }
    })
    .filter(Boolean)
}
