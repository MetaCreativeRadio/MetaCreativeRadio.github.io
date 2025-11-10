#!/bin/bash

# Obsidian Vault クローン & セットアップスクリプト
# Opiたんがリポジトリを作成した後に実行

set -e

echo "🎯 Obsidian Vault セットアップ開始"
echo ""

# ===== 設定 =====
REPO_URL=""  # Opiたんから教えてもらったURL
VAULT_DIR="$HOME/Documents/MetaCreativeDialogues"

# ===== URLチェック =====
if [ -z "$REPO_URL" ]; then
  echo "❌ REPO_URLが設定されていません"
  echo ""
  echo "このスクリプトの冒頭で REPO_URL を設定してください:"
  echo "  REPO_URL=\"git@github.com:opi/MetaCreativeDialogues.git\""
  echo ""
  echo "または、コマンドライン引数で指定:"
  echo "  ./setup-obsidian-vault.sh git@github.com:opi/MetaCreativeDialogues.git"
  exit 1
fi

# コマンドライン引数があれば優先
if [ -n "$1" ]; then
  REPO_URL="$1"
fi

echo "📦 リポジトリ: $REPO_URL"
echo "📁 クローン先: $VAULT_DIR"
echo ""

# ===== 既存チェック =====
if [ -d "$VAULT_DIR" ]; then
  echo "⚠️  $VAULT_DIR が既に存在します"
  read -p "削除して再クローンしますか？ (y/N): " -n 1 -r
  echo
  if [[ $REPLY =~ ^[Yy]$ ]]; then
    rm -rf "$VAULT_DIR"
    echo "✅ 削除しました"
  else
    echo "❌ 中断しました"
    exit 1
  fi
fi

# ===== クローン =====
echo ""
echo "📥 クローン中..."
git clone "$REPO_URL" "$VAULT_DIR"

if [ $? -ne 0 ]; then
  echo "❌ クローンに失敗しました"
  echo ""
  echo "考えられる原因:"
  echo "  1. SSH鍵が設定されていない"
  echo "  2. Collaboratorに追加されていない"
  echo "  3. リポジトリURLが間違っている"
  exit 1
fi

echo "✅ クローン完了"

# ===== Obsidianチェック =====
echo ""
if [ -d "/Applications/Obsidian.app" ]; then
  echo "✅ Obsidianがインストールされています"
else
  echo "⚠️  Obsidianがインストールされていません"
  echo "   https://obsidian.md/ からダウンロードしてください"
fi

# ===== 完了 =====
echo ""
echo "🎉 セットアップ完了！"
echo ""
echo "次のステップ:"
echo "  1. Obsidianを起動"
echo "  2. 'Open folder as vault' を選択"
echo "  3. $VAULT_DIR を選択"
echo ""
echo "おすすめプラグイン:"
echo "  - Obsidian Git (自動コミット・プッシュ)"
echo "  - Dataview (データベースクエリ)"
echo ""
echo "操作方法は以下を参照:"
echo "  $HOME/product/MetaCreativeRadioWeb/docs/OBSIDIAN-GIT-COLLABORATION.md"
