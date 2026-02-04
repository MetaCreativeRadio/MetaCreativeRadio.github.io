# エピソード管理システム 使用ガイド

## 概要
RSS Feedを監視して自動的にエピソード情報を取得し、サイトの「Latest Episode」エリアとエピソード一覧を自動更新するシステムです。
追加でSpotify URLからの個別取得もサポートしています。

## 基本的な使用方法

### 🚀 方法1: RSS Feed監視（推奨）

```bash
# 【初回のみ】RSS Feed URLを設定
npm run setup-feed "https://anchor.fm/s/your-podcast-id/podcast/rss"

# 【毎回】最新エピソードを自動取得・更新
npm run update-episodes
```

### 📱 方法2: 個別Spotify URL

```bash
# Spotify URLを使用してエピソード情報を取得
npm run fetch-episode "https://open.spotify.com/episode/YOUR_EPISODE_ID"
```

### 2. 実行後の流れ

1. **自動処理**:
   - Spotify URLからエピソード情報を取得
   - `public/data/episodes.json` を自動更新
   - トップページの「Latest Episode」が最新情報に更新
   - エピソード一覧ページに新しいエピソードが追加

2. **手動作業**（必要に応じて）:
   - Apple Podcast、YouTube リンクの追加
   - エピソード説明文の調整
   - サムネイル画像の差し替え

## 取得される情報

- ✅ **エピソードタイトル** (自動取得)
- ✅ **配信日** (自動取得)
- ✅ **エピソード説明** (自動取得)
- ✅ **再生時間** (自動取得)
- ✅ **Spotify URL** (自動設定)
- ❌ **Apple Podcast URL** (手動追加)
- ❌ **YouTube URL** (手動追加)

## データ構造

`public/data/episodes.json` に以下の形式でデータが保存されます：

```json
[
  {
    "id": 1,
    "title": "エピソードタイトル",
    "date": "2024-09-24",
    "description": "エピソードの説明文",
    "duration": "35:42",
    "thumbnail": "/src/assets/episode_thumbnail_sample.png",
    "links": {
      "apple": "https://podcasts.apple.com/...",
      "spotify": "https://open.spotify.com/episode/...",
      "youtube": "https://youtube.com/..."
    },
    "status": "published"
  }
]
```

## トラブルシューティング

### Spotify API エラーの場合
現在はSpotify API認証なしで動作するため、一部の情報は手動入力モードになります：

```bash
⚠️  Spotify APIアクセストークンが必要です
📝 手動でエピソード情報を入力してください
```

### 手動でエピソード情報を入力する場合

```bash
# 従来の方法でも追加可能
npm run add-episode "エピソードタイトル" "2024-09-24" "エピソード説明"
```

## 実行例

```bash
# 実際のSpotify URLを使用
npm run fetch-episode "https://open.spotify.com/episode/4rOoJ6Egrf8K2IrywzwOMk"

# 実行後の出力例
🎵 Spotify エピソードデータを取得中...
🔗 URL: https://open.spotify.com/episode/4rOoJ6Egrf8K2IrywzwOMk
⚠️  フォールバック: 手動データ入力モード
✅ 新しいエピソードを追加しました:
   📺 タイトル: 手動入力が必要
   📅 配信日: 2024-09-24
   ⏱️  長さ: 35:00
   🔗 Spotify: https://open.spotify.com/episode/4rOoJ6Egrf8K2IrywzwOMk

🎉 エピソード追加完了！
💡 次の作業:
   1. Apple Podcast、YouTube リンクを手動で追加
   2. 説明文の調整（必要に応じて）
   3. サムネイル画像の差し替え（必要に応じて）
```

## サイト更新の確認

1. **トップページ**: http://localhost:5173/ の「Latest Episode」エリア
2. **エピソード一覧**: http://localhost:5173/episodes で全エピソード確認

## 今後の改善予定

- [ ] Spotify API 認証による完全自動化
- [ ] Apple Podcast API 連携
- [ ] YouTube API 連携
- [ ] サムネイル画像の自動取得
- [ ] エピソード編集機能

---
**更新日**: 2024-09-24
**作成者**: tamkai + Claude Code