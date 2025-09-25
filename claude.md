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

3. **基本ページ構成**
   - トップページ（HomePage.jsx）
   - Producer Notesページ
   - 基本レイアウトコンポーネント

### 🚧 実装予定
1. **エピソード管理システム**
   - 動的エピソードデータの実装
   - エピソード追加スクリプトの活用
   - 各話ページの自動生成

2. **GitHub運用**
   - GitHub Pages デプロイ設定
   - 協働ワークフローの確立
   - 運用マニュアル作成

3. **コンテンツ拡充**
   - Manusからのデータ移行
   - エピソードページテンプレート

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
- 現行サイト: https://j6h5i7cg8op1.manus.space/
- GitHub: [未設定]
- デプロイURL: [未設定]

## 検証済み機能
✅ React アプリケーション動作
✅ Tailwind CSS スタイリング
✅ React Router ナビゲーション
✅ レスポンシブデザイン
✅ プロフィール画像表示
✅ Producer's Note レイアウト

---
**更新日**: 2025-09-24
**最終更新**: claude.md作成・プロジェクト状況整理
**作成者**: tamkai + Claude Code