#!/usr/bin/env node

/**
 * Editorial Notes RSS Updater
 * Note RSS Feedから編集後記を自動取得し、editorial-notes.jsonを更新
 */

import RSSParser from 'rss-parser'
import fs from 'fs'
import path from 'path'

const parser = new RSSParser()

// 設定ファイルのパス
const EDITORIAL_RSS_CONFIG_PATH = path.join(process.cwd(), 'data/editorial-rss-config.json')
const EDITORIAL_NOTES_PATH = path.join(process.cwd(), 'public/data/editorial-notes.json')

// 編集後記RSS設定を読み込み
const loadEditorialRSSConfig = () => {
  if (!fs.existsSync(EDITORIAL_RSS_CONFIG_PATH)) {
    console.error('❌ 編集後記RSS設定ファイルが見つかりません。setup-editorial-feedコマンドを先に実行してください。')
    return null
  }
  return JSON.parse(fs.readFileSync(EDITORIAL_RSS_CONFIG_PATH, 'utf8'))
}

// 編集後記RSS設定を保存
const saveEditorialRSSConfig = (config) => {
  fs.writeFileSync(EDITORIAL_RSS_CONFIG_PATH, JSON.stringify(config, null, 2))
}

// 既存編集後記データを読み込み
const loadEditorialNotesData = () => {
  if (!fs.existsSync(EDITORIAL_NOTES_PATH)) {
    return []
  }
  return JSON.parse(fs.readFileSync(EDITORIAL_NOTES_PATH, 'utf8'))
}

// 編集後記データを保存
const saveEditorialNotesData = (notes) => {
  fs.writeFileSync(EDITORIAL_NOTES_PATH, JSON.stringify(notes, null, 2))
}

// RSS記事を編集後記オブジェクトに変換
const convertRSSItemToEditorialNote = (item, noteId) => {
  const pubDate = new Date(item.pubDate || item.isoDate)

  // 冒頭文の抽出・クリーンアップ
  let excerpt = item.contentSnippet || item.content || item.description || ''

  // 「続きをみる」などの不要な文言を除去
  excerpt = excerpt.replace(/続きをみる\.{3}?/g, '').trim()

  // 改行を適切に処理
  excerpt = excerpt.replace(/\n+/g, ' ').trim()

  // 指定文字数で切り取り
  const excerptLength = 200
  if (excerpt.length > excerptLength) {
    excerpt = excerpt.substring(0, excerptLength) + '...'
  }

  return {
    id: noteId,
    title: item.title?.trim() || '無題の記事',
    date: pubDate.toISOString().split('T')[0], // YYYY-MM-DD形式
    excerpt: excerpt,
    url: item.link || '',
    noteId: item.guid || item.link || '', // Note固有ID
    publishedAt: pubDate.toISOString(),
    status: "published"
  }
}

// RSS Feedを解析して記事を取得
const fetchEditorialRSSArticles = async (feedUrl) => {
  console.log('📡 編集後記RSS Feedを取得中...')
  console.log(`🔗 URL: ${feedUrl}`)

  try {
    const feed = await parser.parseURL(feedUrl)

    console.log(`✅ Note情報を取得しました:`)
    console.log(`   📝 タイトル: ${feed.title}`)
    console.log(`   📄 説明: ${feed.description?.substring(0, 100)}...`)
    console.log(`   📊 記事数: ${feed.items.length}`)

    return {
      noteInfo: {
        title: feed.title,
        description: feed.description,
        link: feed.link,
        author: "大里P"
      },
      articles: feed.items
    }
  } catch (error) {
    console.error('❌ 編集後記RSS Feed取得エラー:', error.message)
    return null
  }
}

// 新しい記事のみを抽出（差分検出）
const findNewEditorialArticles = (rssArticles, existingNotes) => {
  const existingNoteIds = new Set(existingNotes.map(note => note.noteId).filter(Boolean))
  const existingTitles = new Set(existingNotes.map(note => note.title))

  return rssArticles.filter(item => {
    const noteId = item.guid || item.link || ''
    const title = item.title?.trim()

    // Note ID または タイトルで重複チェック
    return !existingNoteIds.has(noteId) && !existingTitles.has(title)
  })
}

// 編集後記Feed URLを設定
const setupEditorialFeed = (feedUrl) => {
  console.log('⚙️  編集後記RSS Feed設定中...')

  const config = {
    feedUrl: feedUrl,
    lastUpdated: null,
    noteInfo: {
      title: "",
      description: "",
      link: "",
      author: "大里P"
    },
    settings: {
      autoUpdate: true,
      checkInterval: 3600000, // 1時間
      maxArticlesPerUpdate: 10,
      excerptLength: 200
    }
  }

  saveEditorialRSSConfig(config)
  console.log(`✅ 編集後記RSS Feed URLを設定しました: ${feedUrl}`)
  console.log('💡 次に "npm run update-editorial" を実行して記事を取得してください。')
}

// 編集後記を更新
const updateEditorialNotes = async () => {
  console.log('🔄 編集後記更新を開始...')

  const config = loadEditorialRSSConfig()
  if (!config) return false

  if (!config.feedUrl) {
    console.error('❌ 編集後記RSS Feed URLが設定されていません。setup-editorial-feedコマンドを実行してください。')
    return false
  }

  const feedData = await fetchEditorialRSSArticles(config.feedUrl)
  if (!feedData) return false

  // 既存記事を読み込み
  const existingNotes = loadEditorialNotesData()

  // 新しい記事のみ抽出
  const newRSSArticles = findNewEditorialArticles(feedData.articles, existingNotes)

  if (newRSSArticles.length === 0) {
    console.log('ℹ️  新しい編集後記はありませんでした。')
    return true
  }

  console.log(`🆕 ${newRSSArticles.length}個の新しい編集後記を発見`)

  // 最大更新数を制限
  const maxUpdates = config.settings.maxArticlesPerUpdate || 10
  const articlesToAdd = newRSSArticles.slice(0, maxUpdates)

  // 新しい記事をオブジェクトに変換
  const newNotes = articlesToAdd.map((item, index) => {
    const noteId = existingNotes.length + index + 1
    return convertRSSItemToEditorialNote(item, noteId)
  })

  // 新しい記事を既存リストの先頭に追加（最新順）
  const updatedNotes = [...newNotes, ...existingNotes]

  // データを保存
  saveEditorialNotesData(updatedNotes)

  // 設定を更新
  config.lastUpdated = new Date().toISOString()
  config.noteInfo = feedData.noteInfo
  saveEditorialRSSConfig(config)

  console.log('✅ 編集後記更新完了!')

  newNotes.forEach((note, index) => {
    console.log(`   ${index + 1}. 📝 ${note.title}`)
    console.log(`      📅 ${note.date}`)
    console.log(`      📄 ${note.excerpt.substring(0, 80)}...`)
    console.log('')
  })

  console.log('🎉 編集後記が自動更新されました!')

  return true
}

// CLI実行時
if (import.meta.url === `file://${process.argv[1]}`) {
  const command = process.argv[2]
  const argument = process.argv[3]

  if (command === 'setup-editorial-feed') {
    if (!argument) {
      console.log('📖 使用法:')
      console.log('  node scripts/editorial-rss-updater.js setup-editorial-feed "NOTE_RSS_FEED_URL"')
      console.log('')
      console.log('📝 例:')
      console.log('  node scripts/editorial-rss-updater.js setup-editorial-feed "https://note.com/username/m/magazine_id/rss"')
      process.exit(1)
    }
    setupEditorialFeed(argument)
  } else if (command === 'update' || !command) {
    updateEditorialNotes()
      .then(success => {
        process.exit(success ? 0 : 1)
      })
      .catch(error => {
        console.error('💥 予期しないエラー:', error)
        process.exit(1)
      })
  } else {
    console.log('❌ 無効なコマンドです。')
    console.log('利用可能コマンド: setup-editorial-feed, update')
    process.exit(1)
  }
}

export { setupEditorialFeed, updateEditorialNotes }