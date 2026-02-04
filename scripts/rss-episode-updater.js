#!/usr/bin/env node

/**
 * RSS Feed Episode Updater
 * RSS Feedから最新エピソード情報を自動取得し、episodes.jsonを更新
 */

import RSSParser from 'rss-parser'
import fs from 'fs'
import path from 'path'

const parser = new RSSParser()

// 設定ファイルのパス
const RSS_CONFIG_PATH = path.join(process.cwd(), 'config/rss-config.json')
const EPISODES_PATH = path.join(process.cwd(), 'public/data/episodes.json')

// RSS設定を読み込み
const loadRSSConfig = () => {
  if (!fs.existsSync(RSS_CONFIG_PATH)) {
    console.error('❌ RSS設定ファイルが見つかりません。setup-feedコマンドを先に実行してください。')
    return null
  }
  return JSON.parse(fs.readFileSync(RSS_CONFIG_PATH, 'utf8'))
}

// RSS設定を保存
const saveRSSConfig = (config) => {
  fs.writeFileSync(RSS_CONFIG_PATH, JSON.stringify(config, null, 2))
}

// 既存エピソードデータを読み込み
const loadEpisodesData = () => {
  if (!fs.existsSync(EPISODES_PATH)) {
    return []
  }
  return JSON.parse(fs.readFileSync(EPISODES_PATH, 'utf8'))
}

// エピソードデータを保存
const saveEpisodesData = (episodes) => {
  fs.writeFileSync(EPISODES_PATH, JSON.stringify(episodes, null, 2))
}

// GUIDからSpotify Episode IDへの変換マッピング
const GUID_TO_SPOTIFY_ID = {
  '0d95e25e-a5cc-43fc-ac75-83acb9f186ca': '1RZpNgFirisOtCtvHiva7k', // 第1回エピソード
  '976ed734-129f-4fb5-a876-30e083887a20': '3orQalYHsoCW2534jdJUnb'  // 第2回エピソード
}

// RSS FeedからSpotify URLを推定（メタデータやリンクから）
const extractSpotifyUrl = (item) => {
  const guid = item.guid
  const podcastersUrl = item.link || ''
  const fullText = JSON.stringify(item)

  console.log(`   🔍 Spotify URL抽出: ${item.title}`)

  // 1. 既に一般向けSpotify URLがある場合
  const publicSpotifyPattern = /https:\/\/open\.spotify\.com\/episode\/[a-zA-Z0-9]+/
  const publicMatch = fullText.match(publicSpotifyPattern)
  if (publicMatch) {
    console.log(`   ✅ 公開Spotify URL発見: ${publicMatch[0]}`)
    return publicMatch[0]
  }

  // 2. GUIDからSpotify Episode IDに変換
  if (guid && GUID_TO_SPOTIFY_ID[guid]) {
    const spotifyId = GUID_TO_SPOTIFY_ID[guid]
    const spotifyUrl = `https://open.spotify.com/episode/${spotifyId}`
    console.log(`   ✅ GUID変換成功: ${spotifyUrl}`)
    return spotifyUrl
  }

  // 3. Spotify Podcaster URLを発見した場合
  const podcasterPattern = /https:\/\/podcasters\.spotify\.com\/pod\/show\/([^\/]+)\/episodes\/([^\/\s"]+)/
  const podcasterMatch = fullText.match(podcasterPattern)

  if (podcasterMatch) {
    const showName = podcasterMatch[1]
    const episodeSlug = podcasterMatch[2]
    console.log(`   💡 Podcaster URL発見: ${showName}/episodes/${episodeSlug}`)
    console.log(`   ⚠️  個別エピソードIDが不明のため、番組URLを使用`)
    return `https://open.spotify.com/show/3tFQXyb09WD5WQMxFWKn0U`
  }

  console.log(`   ❌ Spotify URLが見つかりませんでした`)
  return ''
}

// RSS FeedからApple Podcast URLを推定
const extractAppleUrl = (item) => {
  const links = item.link || ''
  const applePattern = /https:\/\/podcasts\.apple\.com\/[^\\s]+/
  const appleMatch = links.match(applePattern)

  return appleMatch ? appleMatch[0] : ''
}

// エピソード継続時間をフォーマット
const formatDuration = (durationStr) => {
  if (!durationStr) return "35:00" // デフォルト値

  // HH:MM:SS → MM:SS or MM:SS → MM:SS
  const parts = durationStr.split(':')
  if (parts.length === 3) {
    // HH:MM:SS → MM:SS (時間を分に変換)
    const hours = parseInt(parts[0])
    const minutes = parseInt(parts[1]) + (hours * 60)
    const seconds = parts[2]
    return `${minutes}:${seconds.padStart(2, '0')}`
  } else if (parts.length === 2) {
    // MM:SS
    return durationStr
  }

  return "35:00"
}

// RSSアイテムをエピソードオブジェクトに変換
const convertRSSItemToEpisode = (item, episodeId) => {
  const pubDate = new Date(item.pubDate || item.isoDate)

  return {
    id: episodeId,
    title: item.title?.trim() || '無題のエピソード',
    date: pubDate.toISOString().split('T')[0], // YYYY-MM-DD形式
    description: item.contentSnippet || item.content || item.description || '',
    duration: formatDuration(item.itunes?.duration || item.duration),
    thumbnail: item.itunes?.image || item.image?.url || "/src/assets/episode_thumbnail_sample.png",
    links: {
      apple: extractAppleUrl(item),
      spotify: extractSpotifyUrl(item),
      youtube: "" // 手動入力
    },
    status: "published",
    rssGuid: item.guid || item.link || '', // 重複チェック用
    publishedAt: pubDate.toISOString()
  }
}

// RSS Feedを解析してエピソードを取得
const fetchRSSEpisodes = async (feedUrl) => {
  console.log('📡 RSS Feedを取得中...')
  console.log(`🔗 URL: ${feedUrl}`)

  try {
    const feed = await parser.parseURL(feedUrl)

    console.log(`✅ Podcast情報を取得しました:`)
    console.log(`   📺 タイトル: ${feed.title}`)
    console.log(`   📝 説明: ${feed.description?.substring(0, 100)}...`)
    console.log(`   📊 エピソード数: ${feed.items.length}`)

    return {
      podcastInfo: {
        title: feed.title,
        description: feed.description,
        link: feed.link,
        language: feed.language || 'ja'
      },
      episodes: feed.items
    }
  } catch (error) {
    console.error('❌ RSS Feed取得エラー:', error.message)
    return null
  }
}

// 新しいエピソードのみを抽出（差分検出）
const findNewEpisodes = (rssEpisodes, existingEpisodes) => {
  const existingGuids = new Set(existingEpisodes.map(ep => ep.rssGuid).filter(Boolean))
  const existingTitles = new Set(existingEpisodes.map(ep => ep.title))

  return rssEpisodes.filter(item => {
    const guid = item.guid || item.link || ''
    const title = item.title?.trim()

    // GUID または タイトルで重複チェック
    return !existingGuids.has(guid) && !existingTitles.has(title)
  })
}

// RSS Feed URLを設定
const setupFeed = (feedUrl) => {
  console.log('⚙️  RSS Feed設定中...')

  const config = {
    feedUrl: feedUrl,
    lastUpdated: null,
    podcastInfo: {
      title: "",
      description: "",
      link: "",
      language: "ja"
    },
    settings: {
      autoUpdate: true,
      checkInterval: 3600000, // 1時間
      maxEpisodesPerUpdate: 10
    }
  }

  saveRSSConfig(config)
  console.log(`✅ RSS Feed URLを設定しました: ${feedUrl}`)
  console.log('💡 次に "npm run update-episodes" を実行してエピソードを取得してください。')
}

// エピソードを更新
const updateEpisodes = async () => {
  console.log('🔄 エピソード更新を開始...')

  const config = loadRSSConfig()
  if (!config) return false

  if (!config.feedUrl) {
    console.error('❌ RSS Feed URLが設定されていません。setup-feedコマンドを実行してください。')
    return false
  }

  const feedData = await fetchRSSEpisodes(config.feedUrl)
  if (!feedData) return false

  // 既存エピソードを読み込み
  const existingEpisodes = loadEpisodesData()

  // 新しいエピソードのみ抽出
  const newRSSEpisodes = findNewEpisodes(feedData.episodes, existingEpisodes)

  if (newRSSEpisodes.length === 0) {
    console.log('ℹ️  新しいエピソードはありませんでした。')
    return true
  }

  console.log(`🆕 ${newRSSEpisodes.length}個の新しいエピソードを発見`)

  // 最大更新数を制限
  const maxUpdates = config.settings.maxEpisodesPerUpdate || 10
  const episodesToAdd = newRSSEpisodes.slice(0, maxUpdates)

  // 新しいエピソードをオブジェクトに変換
  const newEpisodes = episodesToAdd.map((item, index) => {
    const episodeId = existingEpisodes.length + index + 1
    return convertRSSItemToEpisode(item, episodeId)
  })

  // 新しいエピソードを既存リストの先頭に追加（最新順）
  const updatedEpisodes = [...newEpisodes, ...existingEpisodes]

  // データを保存
  saveEpisodesData(updatedEpisodes)

  // 設定を更新
  config.lastUpdated = new Date().toISOString()
  config.podcastInfo = feedData.podcastInfo
  saveRSSConfig(config)

  console.log('✅ エピソード更新完了!')

  newEpisodes.forEach((episode, index) => {
    console.log(`   ${index + 1}. 📺 ${episode.title}`)
    console.log(`      📅 ${episode.date}`)
    console.log(`      ⏱️  ${episode.duration}`)
    console.log('')
  })

  console.log('🎉 サイトが自動更新されました!')
  console.log('💡 追加作業:')
  console.log('   - Apple Podcast / YouTube リンクの追加（必要に応じて）')
  console.log('   - 説明文の調整（必要に応じて）')

  return true
}

// CLI実行時
if (import.meta.url === `file://${process.argv[1]}`) {
  const command = process.argv[2]
  const argument = process.argv[3]

  if (command === 'setup-feed') {
    if (!argument) {
      console.log('📖 使用法:')
      console.log('  node scripts/rss-episode-updater.js setup-feed "RSS_FEED_URL"')
      console.log('')
      console.log('📝 例:')
      console.log('  node scripts/rss-episode-updater.js setup-feed "https://anchor.fm/s/your-id/podcast/rss"')
      process.exit(1)
    }
    setupFeed(argument)
  } else if (command === 'update' || !command) {
    updateEpisodes()
      .then(success => {
        process.exit(success ? 0 : 1)
      })
      .catch(error => {
        console.error('💥 予期しないエラー:', error)
        process.exit(1)
      })
  } else {
    console.log('❌ 無効なコマンドです。')
    console.log('利用可能コマンド: setup-feed, update')
    process.exit(1)
  }
}

export { setupFeed, updateEpisodes }