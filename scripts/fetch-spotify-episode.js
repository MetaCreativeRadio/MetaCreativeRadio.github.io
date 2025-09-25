#!/usr/bin/env node

/**
 * Spotify Episode Data Fetcher
 * Spotify エピソードURLから情報を自動取得し、episodes.jsonを更新
 */

import fs from 'fs'
import path from 'path'

// Spotify URLからエピソードIDを抽出
const extractEpisodeId = (spotifyUrl) => {
  const match = spotifyUrl.match(/episode\/([a-zA-Z0-9]+)/)
  return match ? match[1] : null
}

// Spotify Web API経由でエピソード情報を取得
const fetchSpotifyEpisodeData = async (episodeId, accessToken) => {
  try {
    const response = await fetch(`https://api.spotify.com/v1/episodes/${episodeId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })

    if (!response.ok) {
      throw new Error(`Spotify API Error: ${response.status}`)
    }

    const data = await response.json()
    return {
      title: data.name,
      description: data.description,
      releaseDate: data.release_date,
      duration: formatDuration(data.duration_ms),
      thumbnail: data.images[0]?.url || null,
      spotifyUrl: data.external_urls.spotify
    }
  } catch (error) {
    console.error('Spotify API fetch failed:', error)
    return null
  }
}

// ウェブスクレイピングでのフォールバック取得（API不要）
const scrapeSpotifyEpisodeData = async (spotifyUrl) => {
  try {
    // Note: 実際の実装ではpuppeteerやcheerioを使用
    // 今回はモックデータを返すプレースホルダー
    console.log('⚠️  Spotify APIアクセストークンが必要です')
    console.log('📝 手動でエピソード情報を入力してください')

    return {
      title: "手動入力が必要",
      description: "エピソードの説明を入力してください",
      releaseDate: new Date().toISOString().split('T')[0],
      duration: "35:00",
      thumbnail: "/src/assets/episode_thumbnail_sample.png",
      spotifyUrl: spotifyUrl
    }
  } catch (error) {
    console.error('Scraping failed:', error)
    return null
  }
}

// 継続時間をフォーマット（ミリ秒 → MM:SS）
const formatDuration = (durationMs) => {
  const minutes = Math.floor(durationMs / 60000)
  const seconds = Math.floor((durationMs % 60000) / 1000)
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

// episodes.jsonを更新
const updateEpisodesData = (episodeData) => {
  const dataPath = path.join(process.cwd(), 'public/data/episodes.json')

  // 既存データを読み込み
  let episodes = []
  if (fs.existsSync(dataPath)) {
    episodes = JSON.parse(fs.readFileSync(dataPath, 'utf8'))
  }

  // 新しいエピソードを作成
  const newEpisode = {
    id: episodes.length + 1,
    title: episodeData.title,
    date: episodeData.releaseDate,
    description: episodeData.description,
    duration: episodeData.duration,
    thumbnail: episodeData.thumbnail || "/src/assets/episode_thumbnail_sample.png",
    links: {
      apple: "", // 手動入力
      spotify: episodeData.spotifyUrl,
      youtube: "" // 手動入力
    },
    status: "published"
  }

  // 最新エピソードを配列の先頭に追加
  episodes.unshift(newEpisode)

  // ファイルに保存
  fs.writeFileSync(dataPath, JSON.stringify(episodes, null, 2))

  console.log(`✅ 新しいエピソードを追加しました:`)
  console.log(`   📺 タイトル: ${newEpisode.title}`)
  console.log(`   📅 配信日: ${newEpisode.date}`)
  console.log(`   ⏱️  長さ: ${newEpisode.duration}`)
  console.log(`   🔗 Spotify: ${newEpisode.links.spotify}`)

  return newEpisode
}

// メイン実行関数
const main = async (spotifyUrl, accessToken = null) => {
  console.log('🎵 Spotify エピソードデータを取得中...')
  console.log(`🔗 URL: ${spotifyUrl}`)

  const episodeId = extractEpisodeId(spotifyUrl)
  if (!episodeId) {
    console.error('❌ 無効なSpotify URLです')
    return null
  }

  let episodeData = null

  // Spotify API使用を試行
  if (accessToken) {
    episodeData = await fetchSpotifyEpisodeData(episodeId, accessToken)
    console.log('✅ Spotify APIからデータを取得しました')
  } else {
    // フォールバック: スクレイピングまたは手動入力
    episodeData = await scrapeSpotifyEpisodeData(spotifyUrl)
    console.log('⚠️  フォールバック: 手動データ入力モード')
  }

  if (!episodeData) {
    console.error('❌ エピソードデータの取得に失敗しました')
    return null
  }

  // episodes.jsonを更新
  const newEpisode = updateEpisodesData(episodeData)

  console.log('\n🎉 エピソード追加完了！')
  console.log('💡 次の作業:')
  console.log('   1. Apple Podcast、YouTube リンクを手動で追加')
  console.log('   2. 説明文の調整（必要に応じて）')
  console.log('   3. サムネイル画像の差し替え（必要に応じて）')

  return newEpisode
}

// CLI実行時
if (import.meta.url === `file://${process.argv[1]}`) {
  const [spotifyUrl, accessToken] = process.argv.slice(2)

  if (!spotifyUrl) {
    console.log('📖 使用法:')
    console.log('  node scripts/fetch-spotify-episode.js "Spotify URL" [アクセストークン]')
    console.log('')
    console.log('📝 例:')
    console.log('  node scripts/fetch-spotify-episode.js "https://open.spotify.com/episode/abc123"')
    process.exit(1)
  }

  main(spotifyUrl, accessToken)
    .then(result => {
      if (result) {
        process.exit(0)
      } else {
        process.exit(1)
      }
    })
    .catch(error => {
      console.error('💥 予期しないエラー:', error)
      process.exit(1)
    })
}

export { main as fetchSpotifyEpisode, updateEpisodesData }