#!/usr/bin/env node

/**
 * Note RSS Debug Tool
 * Note.comのRSS Feed構造を分析して記事情報抽出方法を調査
 */

import RSSParser from 'rss-parser'

const parser = new RSSParser()
const NOTE_RSS_URL = 'https://note.com/tamkai/m/mdf69d53c8c1d/rss'

const debugNoteRSS = async () => {
  try {
    console.log('🔍 Note RSS Feed詳細分析中...')
    console.log(`📡 URL: ${NOTE_RSS_URL}\n`)

    const feed = await parser.parseURL(NOTE_RSS_URL)

    console.log('📊 Feed情報:')
    console.log(`   タイトル: ${feed.title}`)
    console.log(`   リンク: ${feed.link}`)
    console.log(`   説明: ${feed.description?.substring(0, 200)}...`)
    console.log(`   記事数: ${feed.items.length}\n`)

    // 最新記事の詳細分析
    if (feed.items.length > 0) {
      console.log('📝 記事詳細分析:')

      feed.items.slice(0, 3).forEach((article, index) => {
        console.log(`\n--- 記事 ${index + 1} ---`)
        console.log(`   タイトル: ${article.title}`)
        console.log(`   URL: ${article.link}`)
        console.log(`   投稿日: ${article.pubDate}`)
        console.log(`   GUID: ${article.guid}`)

        // コンテンツ情報
        if (article.contentSnippet) {
          console.log(`   冒頭文: ${article.contentSnippet.substring(0, 150)}...`)
        }

        // 追加のメタデータ
        console.log('\n   🔧 Raw記事情報:')
        const articleKeys = Object.keys(article)
        articleKeys.forEach(key => {
          if (!['content', 'contentSnippet'].includes(key)) {
            const value = article[key]
            if (typeof value === 'string' && value.length < 200) {
              console.log(`      ${key}: ${value}`)
            } else if (typeof value === 'object' && value !== null) {
              console.log(`      ${key}: [Object] ${JSON.stringify(value).substring(0, 100)}...`)
            }
          }
        })

        // 画像情報の検索
        const fullText = JSON.stringify(article)
        const imageMatches = fullText.match(/https:\/\/[^\s"]*\.(jpg|jpeg|png|gif|webp)[^\s"]*/gi)
        if (imageMatches) {
          console.log(`   🖼️ 発見された画像:`)
          imageMatches.slice(0, 2).forEach((img, i) => {
            console.log(`      ${i + 1}. ${img}`)
          })
        }
      })

      // Note特有のパターン検索
      console.log('\n🔍 Note特有パターン検索:')
      const firstArticle = feed.items[0]
      const fullArticleText = JSON.stringify(firstArticle, null, 2)

      // Note URLパターン
      const noteUrlMatches = fullArticleText.match(/https:\/\/note\.com\/[^\s"]*/g)
      if (noteUrlMatches) {
        console.log('   📍 Note URL:')
        noteUrlMatches.forEach((url, index) => {
          console.log(`      ${index + 1}. ${url}`)
        })
      }

      // 日付フォーマット
      if (firstArticle.pubDate) {
        const pubDate = new Date(firstArticle.pubDate)
        console.log(`   📅 日付変換: ${pubDate.toISOString().split('T')[0]}`)
      }
    }

  } catch (error) {
    console.error('❌ Note RSS Feed分析エラー:', error.message)
  }
}

// CLI実行
debugNoteRSS()