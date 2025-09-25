#!/usr/bin/env node

/**
 * RSS Feed Debug Tool
 * RSS Feedの詳細構造を調査してSpotify URL抽出方法を見つける
 */

import RSSParser from 'rss-parser'

const parser = new RSSParser()
const FEED_URL = 'https://anchor.fm/s/1098f2014/podcast/rss'

const debugRSSFeed = async () => {
  try {
    console.log('🔍 RSS Feed詳細分析中...')
    console.log(`📡 URL: ${FEED_URL}\n`)

    const feed = await parser.parseURL(FEED_URL)

    console.log('📊 Feed情報:')
    console.log(`   タイトル: ${feed.title}`)
    console.log(`   リンク: ${feed.link}`)
    console.log(`   説明: ${feed.description?.substring(0, 100)}...`)
    console.log(`   エピソード数: ${feed.items.length}\n`)

    // 最新エピソードの詳細分析
    if (feed.items.length > 0) {
      const latestEpisode = feed.items[0]

      console.log('🎵 最新エピソード詳細分析:')
      console.log(`   タイトル: ${latestEpisode.title}`)
      console.log(`   GUID: ${latestEpisode.guid}`)
      console.log(`   Link: ${latestEpisode.link}`)
      console.log(`   PubDate: ${latestEpisode.pubDate}`)

      // Enclosure情報（音声ファイル情報）
      if (latestEpisode.enclosure) {
        console.log('\n📎 Enclosure情報:')
        console.log(`   URL: ${latestEpisode.enclosure.url}`)
        console.log(`   Type: ${latestEpisode.enclosure.type}`)
        console.log(`   Length: ${latestEpisode.enclosure.length}`)
      }

      // iTunes情報
      if (latestEpisode.itunes) {
        console.log('\n🎧 iTunes拡張情報:')
        Object.keys(latestEpisode.itunes).forEach(key => {
          console.log(`   ${key}: ${latestEpisode.itunes[key]}`)
        })
      }

      // Content情報
      console.log('\n📝 Content情報:')
      console.log(`   contentSnippet: ${latestEpisode.contentSnippet?.substring(0, 200)}...`)

      // 生のXML情報も確認
      console.log('\n🔧 Raw エピソード情報:')
      const episodeKeys = Object.keys(latestEpisode)
      episodeKeys.forEach(key => {
        if (!['content', 'contentSnippet', 'itunes'].includes(key)) {
          const value = latestEpisode[key]
          if (typeof value === 'string' && value.includes('spotify')) {
            console.log(`   🎯 [SPOTIFY検出] ${key}: ${value}`)
          } else if (typeof value === 'string' && value.length < 200) {
            console.log(`   ${key}: ${value}`)
          } else if (typeof value === 'object' && value !== null) {
            console.log(`   ${key}: [Object] ${JSON.stringify(value).substring(0, 100)}...`)
          }
        }
      })

      // Spotify URL パターンを全体検索
      console.log('\n🔍 Spotify URL検索:')
      const fullEpisodeText = JSON.stringify(latestEpisode, null, 2)
      const spotifyMatches = fullEpisodeText.match(/https:\/\/[^\s"]*spotify\.com[^\s"]*/g)

      if (spotifyMatches) {
        console.log('   📍 発見されたSpotify URL:')
        spotifyMatches.forEach((url, index) => {
          console.log(`      ${index + 1}. ${url}`)
        })
      } else {
        console.log('   ❌ Spotify URLが見つかりませんでした')
      }

      // Anchor FM特有の情報検索
      console.log('\n🎪 Anchor FM特有情報検索:')
      const anchorMatches = fullEpisodeText.match(/https:\/\/[^\s"]*anchor\.fm[^\s"]*/g)

      if (anchorMatches) {
        console.log('   📍 発見されたAnchor URL:')
        anchorMatches.forEach((url, index) => {
          console.log(`      ${index + 1}. ${url}`)
        })
      }
    }

  } catch (error) {
    console.error('❌ RSS Feed分析エラー:', error.message)
  }
}

// CLI実行
debugRSSFeed()