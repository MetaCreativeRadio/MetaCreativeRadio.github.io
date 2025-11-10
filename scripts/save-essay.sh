#!/bin/bash

# 論構文保存スクリプト
# Usage: npm run save-essay <episode_number>

EPISODE_NUM=$1

if [ -z "$EPISODE_NUM" ]; then
  echo "エラー: エピソード番号を指定してください"
  echo "使用例: npm run save-essay 6"
  exit 1
fi

# パス設定
PROJECT_ROOT="/Users/tamkai/product/MetaCreativeRadioWeb"
OUTPUT_FILE="$PROJECT_ROOT/essays/episode0${EPISODE_NUM}.md"

echo "📝 第${EPISODE_NUM}話の論構文を保存します"
echo ""
echo "以下にWeb版Claudeで生成された論構文を貼り付けてください。"
echo "（入力が完了したら Ctrl+D を押してください）"
echo ""
echo "---"

# 標準入力から論構文を受け取る
cat > "$OUTPUT_FILE"

echo ""
echo "---"
echo ""
echo "✅ 論構文を保存しました: $OUTPUT_FILE"
echo ""
echo "📌 次のステップ:"
echo "1. 内容を確認: cat $OUTPUT_FILE"
echo "2. Gitコミット: git add . && git commit -m \"📝 第${EPISODE_NUM}話の論構文追加\""
echo ""
