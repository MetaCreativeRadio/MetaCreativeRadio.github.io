#!/usr/bin/env node

/**
 * Spotify Episode ID Converter
 * Anchor FM RSS GUIDからSpotify Episode IDへの変換を試行
 */

// GUIDからSpotify Episode IDへの変換を試行
const convertGuidToSpotifyId = (guid, episodeSlug) => {
  // 1. 直接的なマッピングの試行（メタクリエイティブラジオの例）
  const knownMappings = {
    '0d95e25e-a5cc-43fc-ac75-83acb9f186ca': '1RZpNgFirisOtCtvHiva7k'
  }

  if (knownMappings[guid]) {
    return knownMappings[guid]
  }

  // 2. Episode slugからのパターン推定を試行
  if (episodeSlug) {
    // episodeSlug: "1-e38fkth" のような形式
    // しかし、これを直接Spotify IDに変換する一般的な方法は存在しない
    console.log(`   🔧 Episode slug解析: ${episodeSlug}`)
  }

  return null
}

// RSS Feed情報からSpotify Episode URLを構築
const buildSpotifyEpisodeUrl = (item) => {
  const guid = item.guid
  const podcastersUrl = item.link || ''

  // Podcaster URLからepisode slugを抽出
  const podcasterPattern = /episodes\/([^\/\s"]+)/
  const slugMatch = podcastersUrl.match(podcasterPattern)
  const episodeSlug = slugMatch ? slugMatch[1] : null

  console.log(`🔍 変換試行:`)
  console.log(`   GUID: ${guid}`)
  console.log(`   Episode Slug: ${episodeSlug}`)

  // 既知のマッピングから変換を試行
  const spotifyId = convertGuidToSpotifyId(guid, episodeSlug)

  if (spotifyId) {
    const spotifyUrl = `https://open.spotify.com/episode/${spotifyId}`
    console.log(`   ✅ 変換成功: ${spotifyUrl}`)
    return spotifyUrl
  } else {
    console.log(`   ❌ 変換失敗: 個別エピソードURLが見つかりません`)
    console.log(`   💡 代替案: 番組URLを使用`)
    return 'https://open.spotify.com/show/3tFQXyb09WD5WQMxFWKn0U'
  }
}

// テスト実行
if (import.meta.url === `file://${process.argv[1]}`) {
  const testEpisode = {
    guid: '0d95e25e-a5cc-43fc-ac75-83acb9f186ca',
    link: 'https://podcasters.spotify.com/pod/show/metacreativeradio/episodes/1-e38fkth',
    title: '1.「自己紹介」について考えることから始めてみた'
  }

  console.log('🧪 Spotify ID変換テスト')
  console.log(`📺 エピソード: ${testEpisode.title}\n`)

  const result = buildSpotifyEpisodeUrl(testEpisode)
  console.log(`\n🎯 最終結果: ${result}`)
}

export { buildSpotifyEpisodeUrl, convertGuidToSpotifyId }