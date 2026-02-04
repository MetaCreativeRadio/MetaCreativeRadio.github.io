# MetaCreativeRadio Web - Claude Code 引き継ぎドキュメント

## プロジェクト概要
タムカイ、おぴたんのメタクリエイティブラジオ公式サイト

- **プロジェクト名**: MetaCreativeRadio Web
- **技術スタック**: React 19 + Vite + Tailwind CSS + shadcn/ui
- **目標**: GitHub管理→複数人運営→AI時代のクリエーター発Webサービス
- **運用体制**: 3人協働（tamkai + おぴたん + 大里P）
- **公開サイト**: https://metacreativeradio.github.io/
- **GitHub**: https://github.com/MetaCreativeRadio/MetaCreativeRadio.github.io

## Claude Code 開発ベストプラクティス

### サブエージェント活用ルール

**CRITICAL**: このプロジェクトでは、Claude Codeのサブエージェント機能を最大限活用し、効率的な分散並列開発を実施すること。

#### 1. タスク分散の原則

**並列実行が可能なタスク**:
- 複数ファイルの読み取り・調査
- 独立した機能の実装
- 複数エピソードの処理
- コードベース探索と分析

**実行方法**:
```
単一メッセージで複数のTask toolを同時に呼び出す
依存関係のないタスクは必ず並列実行する
```

#### 2. 探索にはExploreエージェント活用

**thoroughnessレベル**:
- `quick`: 基本的な検索（軽量・高速）
- `medium`: 中程度の探索（推奨）
- `very thorough`: 包括的分析（複雑な調査時）

#### 3. Definition of Done (DoD)

各フェーズ完了時の必須チェックリスト:
1. ESLint/型チェックエラーなし
2. `npm run build` 成功
3. 動作確認（PC/モバイル）
4. Git push

#### 4. エージェント選択ガイド

| タスク種別 | 推奨エージェント |
|----------|----------------|
| コードベース探索 | Explore (medium) |
| 複数ファイル処理 | general-purpose（並列） |
| UI実装 | general-purpose |
| バグ調査 | Explore (thorough) |

## 現在の実装状況（2026-02-04時点）

### 公開済みコンテンツ
- **エピソード**: 19話（全てSpotify / Apple Podcasts 対応）
- **メタクリドキュメント**: 19本完成（`essays/` フォルダ）
- **文字起こし**: 19本完了（`transcripts/` フォルダ）
- **編集後記**: 7本（大里Pのnote.com連携）
- **スピーカープロフィール**: Opi / Tamkai（`speakers/` フォルダ）

### サイト機能
- トップページ（最新エピソード・編集後記の動的表示）
- Episodes一覧ページ（全エピソード表示）
- Producer Notesページ（編集後記一覧）
- お問い合わせフォーム（Formspree統合）
- レスポンシブデザイン対応

### 自動化システム
- **エピソード更新**: 毎週月曜 9:30 JST（Spotify RSS + Apple Podcasts自動取得）
- **編集後記更新**: 毎日 12:00 JST
- GitHub Actions自動デプロイ（mainへのpush時）

## ファイル構成

```
MetaCreativeRadioWeb/
├── src/
│   ├── HomePage.jsx          # メインページ
│   ├── App.jsx               # ルートコンポーネント
│   ├── Router.jsx            # カスタムルーター
│   ├── pages/
│   │   ├── Episodes.jsx      # エピソード一覧
│   │   └── ProducerNotes.jsx # 編集後記一覧
│   ├── components/
│   │   ├── Navigation.jsx    # ナビゲーション
│   │   ├── ContactForm.jsx   # お問い合わせフォーム
│   │   └── ui/               # shadcn/uiコンポーネント
│   └── assets/               # 画像・リソース
├── public/data/
│   ├── episodes.json         # エピソードデータ（19話）
│   └── editorial-notes.json  # 編集後記データ
├── config/
│   ├── rss-config.json       # Spotify RSS設定
│   └── editorial-rss-config.json # 編集後記RSS設定
├── scripts/
│   ├── rss-episode-updater.js    # RSS自動更新（GitHub Actions使用）
│   ├── apple-podcast-updater.js  # Apple Podcasts URL自動取得
│   ├── editorial-rss-updater.js  # 編集後記RSS更新
│   ├── handover.sh               # セッション引き継ぎ
│   ├── convert-to-mp3.sh         # 音声変換（メンテナンス用）
│   ├── add-episode.js            # 手動エピソード追加
│   ├── fetch-spotify-episode.js  # 単発Spotify取得
│   ├── debug-rss.js              # RSSデバッグ
│   ├── debug-note-rss.js         # 編集後記RSSデバッグ
│   └── spotify-id-converter.js   # Spotify ID変換
├── essays/                    # メタクリドキュメント（19本）
├── transcripts/               # 文字起こし（19本）
├── speakers/                  # スピーカープロフィール
├── audio/                     # 音声ファイル（.gitignore対象）
├── prompts/
│   └── タイトル・キーワード生成.md
├── docs/
│   ├── episode-management.md  # エピソード管理ガイド
│   └── CHANGELOG-2025.md      # 開発ログアーカイブ
└── .github/workflows/
    ├── deploy.yml             # GitHub Pagesデプロイ
    └── rss-update.yml         # RSS自動更新
```

## 開発コマンド

```bash
# 開発
npm run dev              # 開発サーバー起動
npm run build            # プロダクションビルド
npm run lint             # ESLint

# RSS更新（通常はGitHub Actionsが自動実行）
npm run update-episodes  # エピソード更新
npm run update-apple-urls # Apple Podcasts URL更新
npm run update-editorial # 編集後記更新

# メンテナンス
npm run convert-to-mp3   # WAV→MP3変換
npm run handover         # セッション引き継ぎ
```

## 技術スタック

- **React 19**: メインフレームワーク
- **Vite**: ビルドツール
- **Tailwind CSS**: スタイリング
- **shadcn/ui**: UIコンポーネント
- **Lucide React**: アイコン
- **Framer Motion**: アニメーション
- **date-fns**: 日付処理
- **rss-parser**: RSS取得（スクリプト用）

## メタクリドキュメント生成ワークフロー

メタクリドキュメントの生成はClaude Code Skills を使用:

| ワークフロー | Skill | 説明 |
|------------|-------|------|
| ラジオから | `/metacre-radio` | エピソード文字起こしから生成 |
| 実対話から | `/metacre-transcript` | 実際の対話トランスクリプトから生成 |
| リサーチから | `/metacre-research` | リサーチレポートから対話を創作して生成 |

**メタクリドキュメントの三層構造**:
1. **対話引用層**: ラジオの実際の会話を抽出
2. **導の文**: メタ認知的な解説・問いかけ
3. **註釈層**: 深い分析と概念的な洞察

## エッセイファイル命名規則

```
YYYYMMDD_メタクリラジオEpNN_タイトル_メタクリドキュメント.md
```

## 自動化スケジュール

| 処理 | スケジュール | 方法 |
|-----|------------|------|
| エピソード更新 | 毎週月曜 9:30 JST | GitHub Actions（Spotify RSS + iTunes API） |
| 編集後記更新 | 毎日 12:00 JST | GitHub Actions（note RSS） |
| サイトデプロイ | mainへのpush時 | GitHub Actions |

**注意**: GitHub Actions無料プランではcron実行が保証されない。動作しない場合は手動実行:
```bash
npm run update-episodes && npm run update-apple-urls
git add . && git commit -m "Manual episode update" && git push
```

---
**更新日**: 2026-02-04
**作成者**: tamkai + Claude Code
**開発ログアーカイブ**: [docs/CHANGELOG-2025.md](docs/CHANGELOG-2025.md)
