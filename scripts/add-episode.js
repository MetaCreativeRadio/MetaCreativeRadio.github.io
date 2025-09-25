#!/usr/bin/env node

// エピソード追加用スクリプト
// Claude Codeから「第○話のエピソードを追加」で呼び出される

import fs from 'fs'
import path from 'path'

const addEpisode = (episodeData) => {
  const dataPath = path.join(process.cwd(), 'public/data/episodes.json')

  // 既存エピソードを読み込み
  const episodes = JSON.parse(fs.readFileSync(dataPath, 'utf8'))

  // 新しいエピソードを追加
  const newEpisode = {
    id: episodes.length + 1,
    ...episodeData,
    status: 'published'
  }

  episodes.unshift(newEpisode) // 最新を先頭に

  // ファイルに保存
  fs.writeFileSync(dataPath, JSON.stringify(episodes, null, 2))

  console.log(`✅ 第${newEpisode.id}話を追加しました: ${newEpisode.title}`)
  return newEpisode
}

// CLI実行時
if (import.meta.url === `file://${process.argv[1]}`) {
  const [title, date, description] = process.argv.slice(2)

  if (!title || !date || !description) {
    console.log('使用法: node scripts/add-episode.js "タイトル" "YYYY-MM-DD" "説明"')
    process.exit(1)
  }

  addEpisode({
    title,
    date,
    description,
    duration: "35:00", // デフォルト
    thumbnail: "/src/assets/episode_thumbnail_sample.png",
    links: {
      apple: "",
      spotify: "",
      youtube: ""
    }
  })
}

export default addEpisode