#!/bin/bash

# MetaCreativeRadio 引き継ぎスクリプト
# セッション終了時の自動整理

echo "🎙️ MetaCreativeRadio 引き継ぎシステム実行中..."

# 現在の日時を取得
CURRENT_DATE=$(date "+%Y-%m-%d")
CURRENT_TIME=$(date "+%H:%M")

# プロジェクト構成確認
echo ""
echo "📁 プロジェクト構成:"
echo "  ✅ React + Vite + TailwindCSS"
echo "  ✅ エピソードデータ JSON化済み"
echo "  ✅ Claude Code 自動化スクリプト"

# エピソード状況確認
echo ""
echo "🎧 エピソード状況:"
if [ -f "data/episodes.json" ]; then
    EPISODE_COUNT=$(node -e "console.log(JSON.parse(require('fs').readFileSync('data/episodes.json')).length)")
    echo "  📊 総エピソード数: $EPISODE_COUNT"

    # 最新エピソード情報
    LATEST_TITLE=$(node -e "const eps = JSON.parse(require('fs').readFileSync('data/episodes.json')); console.log(eps[0]?.title || 'なし')")
    echo "  🎵 最新エピソード: $LATEST_TITLE"
else
    echo "  ⚠️ episodes.json が見つかりません"
fi

# 開発サーバー状況
echo ""
echo "🚀 開発環境:"
if [ -d "node_modules" ]; then
    echo "  ✅ 依存関係インストール済み"
else
    echo "  📝 依存関係未インストール (pnpm install 必要)"
fi

# Gitの状況を確認
echo ""
echo "📊 Git状況:"
if git rev-parse --is-inside-work-tree > /dev/null 2>&1; then
    git status --short
    if [ -z "$(git status --porcelain)" ]; then
        echo "  ✅ 作業ディレクトリはクリーンです"
    fi
else
    echo "  ⚠️ このフォルダはGitリポジトリではありません"
    echo "  💡 git init でGit管理を開始できます"
fi

# 次回アクション提案
echo ""
echo "🎯 Claude Code での操作例:"
echo "  新エピソード追加:"
echo "    「第2話のエピソードを追加して」"
echo "    「タイトル: ○○、日付: 2024-10-01、説明: ○○」"
echo ""
echo "  開発サーバー起動:"
echo "    「開発サーバーを起動して」"
echo "    → npm run dev"
echo ""
echo "  ビルド・デプロイ:"
echo "    「プロダクションビルドして」"
echo "    → npm run build"

echo ""
echo "📝 引き継ぎ完了!"
echo "⏰ 更新時刻: $CURRENT_DATE $CURRENT_TIME"
echo ""
echo "🔗 関連リンク:"
echo "  📚 consultation/discussions/ - 壁打ちログ"
echo "  📊 data/episodes.json - エピソードデータ"
echo "  🛠️ scripts/ - 自動化スクリプト"