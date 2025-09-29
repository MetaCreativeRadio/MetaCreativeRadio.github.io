# MetaCreativeRadio Web - Claude Code 引き継ぎドキュメント

## プロジェクト概要
タムカイ、おぴたんのメタクリエイティブラジオ公式サイト

- **プロジェクト名**: MetaCreativeRadio Web
- **技術スタック**: React + Vite + Tailwind CSS + shadcn/ui
- **目標**: GitHub管理→複数人運営→AI時代のクリエーター発Webサービス
- **運用体制**: 3人協働（tamkai + おぴたん + 1名）

## 現在の実装状況

### ✅ 完了済み機能
1. **基本サイト構築**
   - React + Vite環境構築
   - shadcn/uiコンポーネント導入
   - Tailwind CSS設定
   - ルーティング設定（React Router）

2. **UI/UX改善（2025/09/21完了）**
   - 大里P表記統一（「大里プロデューサー」→「大里P」）
   - プロフィール画像追加・レイアウト改善
   - Producer's Noteセクションのグリッドレイアウト
   - 視認性向上（コントラスト改善）

3. **GitHub Organization & 公開サイト（2025/09/25完了）**
   - GitHub Organization「MetaCreativeRadio」作成
   - リポジトリ移管完了
   - GitHub Pages自動デプロイ設定
   - 公開サイト稼働中: https://metacreativeradio.github.io/
   - RSS エピソード管理システム実装
   - 編集後記システム実装

4. **RSS自動化システム**
   - エピソードRSS自動取得・更新機能
   - 編集後記RSS自動取得・更新機能
   - Spotify個別エピソードURL自動抽出
   - 差分更新機能（重複防止）

5. **基本ページ構成**
   - トップページ（HomePage.jsx）- 最新コンテンツ動的表示
   - Episodes一覧ページ - RSS連携
   - Producer Notesページ - 編集後記一覧
   - 基本レイアウトコンポーネント

### 🚧 次回実装予定
1. **チーム管理体制**
   - おぴたん・大里PをOrganizationに招待
   - 権限設定・役割分担
   - チーム作業フローの確立

2. **大里PのRSS連携**
   - 専用RSS Feed準備完了後の実装
   - 自動更新機能の本格運用

3. **運用マニュアル整備**
   - Claude Code活用チーム運用ガイド
   - エラー対応マニュアル

### 📁 重要なファイル構成
```
MetaCreativeRadioWeb/
├── src/
│   ├── HomePage.jsx          # メインページ
│   ├── pages/                # 各ページコンポーネント
│   ├── components/           # 共通コンポーネント
│   ├── assets/              # 画像・リソース
│   └── App.jsx              # ルートコンポーネント
├── scripts/
│   ├── add-episode.js       # エピソード追加スクリプト
│   └── handover.sh         # 引き継ぎスクリプト
├── templates/               # Claude Code用テンプレート
└── docs/                   # 運用マニュアル
```

## 開発コマンド
```bash
# 開発サーバー起動
npm run dev

# エピソード追加
npm run add-episode

# ビルド
npm run build

# 引き継ぎ
npm run handover
```

## 技術仕様

### 使用技術
- **React 19**: メインフレームワーク
- **Vite**: ビルドツール・開発サーバー
- **Tailwind CSS**: スタイリング
- **shadcn/ui**: UIコンポーネントライブラリ
- **React Router**: ルーティング
- **Lucide React**: アイコン

### 重要な依存関係
- Radix UI（アクセシビリティ対応コンポーネント）
- Framer Motion（アニメーション）
- date-fns（日付処理）

## 運用フロー

### エピソード追加フロー（予定）
1. **コンテンツ準備**: 音声・テキスト・画像
2. **スクリプト実行**: `npm run add-episode`
3. **内容確認**: ローカル環境でプレビュー
4. **Git作業**: コミット→プッシュ→プルリクエスト
5. **自動デプロイ**: GitHub Actions（予定）

### 協働開発フロー
1. **Issue作成**: 作業内容の明確化
2. **ブランチ作成**: feature/episode-xx形式
3. **Claude Code活用**: 「第○話のページ作成」
4. **レビュー**: プルリクエストでコードレビュー
5. **マージ**: main ブランチへ統合

## 現在の課題・制限事項

### 解決済み課題
- ✅ UI/UXの基本改善完了
- ✅ 開発環境の安定化
- ✅ コンポーネント設計の確立

### 未解決課題
- ❌ エピソードデータの動的管理
- ❌ GitHub Pages デプロイ設定
- ❌ 協働ワークフローの運用テスト
- ❌ Manusサイトからのデータ移行

## 次回セッションの優先タスク

### High Priority
1. **エピソード管理システム**: 動的データ実装
2. **add-episodeスクリプト**: 動作確認・改善
3. **GitHub設定**: デプロイ・協働環境準備

### Medium Priority
- Manusデータ移行
- 運用マニュアル作成
- エピソードページテンプレート改善

### Low Priority
- パフォーマンス最適化
- SEO対応
- PWA化検討

## 開発環境

### ローカル開発
- **URL**: http://localhost:5173/
- **ホットリロード**: 有効
- **開発者ツール**: React DevTools推奨

### 必要な環境
- Node.js (最新LTS)
- npm/yarn/pnpm (pnpm推奨)

## 関連リソース

### ディスカッション記録
- [2025/09/21 - UI改善完了](../consultation/discussions/2025-09/21-metacreativeradio-ui-improvements.md)
- [2025/09/21 - GitHub移行戦略](../consultation/discussions/2025-09/21-podcast-github-migration.md)

### 外部リンク
- 公式サイト: https://metacreativeradio.github.io/
- GitHub Organization: https://github.com/MetaCreativeRadio
- GitHub Repository: https://github.com/MetaCreativeRadio/MetaCreativeRadio.github.io
- 旧Manusサイト: https://j6h5i7cg8op1.manus.space/

## 検証済み機能
✅ React アプリケーション動作
✅ Tailwind CSS スタイリング
✅ React Router ナビゲーション
✅ レスポンシブデザイン
✅ プロフィール画像表示
✅ Producer's Note レイアウト

## 📊 自動化スケジュール

### RSS自動更新
- **エピソード更新**: 毎週月曜 9:15 JST
- **編集後記更新**: 毎日 12:00 JST
- **手動実行**: GitHub Actions画面からワンクリック実行可能

### 次回自動実行予定
- **次回エピソード更新**: 2025年10月6日（月）9:15
- **次回編集後記チェック**: 2025年9月30日（月）12:00

## 🔧 重要なコマンド

### 手動更新（緊急時）
```bash
# エピソードのみ更新
npm run update-episodes

# 編集後記のみ更新
npm run update-editorial

# サイトに反映
git add . && git commit -m "Manual update" && git push
```

### 開発・運用
```bash
# 開発サーバー起動
npm run dev

# ビルド
npm run build

# 引き継ぎスクリプト
npm run handover
```

---
**更新日**: 2025-09-29
**最終更新**: RSS完全自動化・Formspree統合・第2話対応・SNSリンク追加
**作成者**: tamkai + Claude Code

## 🎯 本日完了した追加機能（2025-09-29）

### ✅ RSS自動更新システム完成
1. **GitHub Actions自動化**
   - 毎週月曜9:15 JST：エピソード自動更新
   - 毎日12:00 JST：編集後記自動チェック
   - 手動実行も可能（GitHub Actions画面から）

2. **第2話完全対応**
   - タイトル：「つくる」を振り返ってみつけた、速さと楽しさの変化
   - Apple Podcasts URL追加
   - Amazon Music URL追加
   - 全プラットフォーム対応完了

### ✅ UI/UX改善
1. **質問・リクエストフォーム最適化**
   - hover bounce効果削除（テキスト入力しやすく）
   - Formspree統合完了（Form ID: movkeevv）
   - 完全機能するお問い合わせシステム

2. **Host Profiles強化**
   - opiのTwitter/Xリンク追加（https://x.com/opi）
   - tamkaiのTwitter/Xリンク追加（https://x.com/tamkai）
   - クリックで新しいタブで開く

### 🎯 次回セッションでやること

### High Priority（必須）
1. **チームメンバー招待**
   - おぴたん・大里PをGitHub Organizationに招待
   - 権限設定（Admin/Write権限）
   - 初回チーム作業テスト

2. **運用マニュアル作成**
   - Claude Code活用ガイド作成
   - よくあるエラー対応集
   - 日常的な更新手順（自動化完了により簡素化）

### Medium Priority（推奨）
- サイトデザイン調整・改善
- SEO対策検討
- YouTube動画対応検討

### 🎉 2025-09-29 追加完了機能
- ✅ **RSS完全自動化**: GitHub Actions週次・日次スケジュール実装
- ✅ **第2話完全対応**: 全プラットフォームURL設定完了
- ✅ **Formspree統合**: 完全機能するお問い合わせフォーム
- ✅ **Host Profiles強化**: Twitter/X直接リンク機能
- ✅ **UI改善**: テキスト入力最適化（hover効果削除）

### 累積完了機能 🎉
- ✅ GitHub Organization「MetaCreativeRadio」設立
- ✅ 公開サイト完成: https://metacreativeradio.github.io/
- ✅ RSS自動化システム完成
- ✅ GitHub Actions自動デプロイ成功
- ✅ チーム協働体制の土台完成
- ✅ モバイル表示最適化完了
- ✅ Favicon設定・表示問題解決
- ✅ Apple Podcasts URL追加（第1話）
- ✅ Spotifyボタン優先表示
- ✅ 大里P公式RSS Feed運用開始
- ✅ **レスポンシブ対応**: スマホ横スクロール問題解決、PC表示維持
- ✅ **Favicon完全対応**: ブラウザ互換性向上、GitHub Pages表示確認
- ✅ **プラットフォーム最適化**: Spotify優先、Apple Podcasts追加
- ✅ **RSS完全自動化**: 大里P編集後記の自動更新システム稼働

**🚀 完全自動運用体制が整いました！チーム協働＋完全自動化完了！**