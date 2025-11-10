#!/bin/bash

# リサーチ論構文保存スクリプト
# Usage: npm run save-research <research_name>

RESEARCH_NAME=$1

if [ -z "$RESEARCH_NAME" ]; then
  echo "エラー: リサーチ資料名を指定してください"
  echo "使用例: npm run save-research \"U理論\""
  exit 1
fi

# パス設定
PROJECT_ROOT="/Users/tamkai/product/MetaCreativeRadioWeb"
OUTPUT_FILE="$PROJECT_ROOT/essays/research-${RESEARCH_NAME}.md"

echo "📝 「${RESEARCH_NAME}」のリサーチ論構文を保存します"
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
echo "2. Gitコミット: git add . && git commit -m \"📝 リサーチ論構文追加: ${RESEARCH_NAME}\""
echo ""
