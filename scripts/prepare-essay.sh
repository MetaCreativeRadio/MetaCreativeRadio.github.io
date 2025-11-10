#!/bin/bash

# 論構文作成用の素材バンドルスクリプト
# Usage: npm run prepare-essay <episode_number>

EPISODE_NUM=$1

if [ -z "$EPISODE_NUM" ]; then
  echo "エラー: エピソード番号を指定してください"
  echo "使用例: npm run prepare-essay 6"
  exit 1
fi

# パス設定
PROJECT_ROOT="/Users/tamkai/product/MetaCreativeRadioWeb"
TRANSCRIPT_FILE="$PROJECT_ROOT/transcripts/episode0${EPISODE_NUM}.txt"
OPI_PROFILE="$PROJECT_ROOT/speakers/opi.md"
TAMKAI_PROFILE="$PROJECT_ROOT/speakers/tamkai.md"
ESSAY_PROMPT="$PROJECT_ROOT/prompts/論構文作成プロジェクト指示.txt"
OUTPUT_FILE="$PROJECT_ROOT/essay-input/episode0${EPISODE_NUM}-bundle.md"

# ファイル存在確認
if [ ! -f "$TRANSCRIPT_FILE" ]; then
  echo "エラー: 文字起こしファイルが見つかりません: $TRANSCRIPT_FILE"
  exit 1
fi

# プロンプトファイルの確認（オプショナル）
PROMPT_SECTION=""
if [ -f "$ESSAY_PROMPT" ]; then
  PROMPT_CONTENT=$(cat "$ESSAY_PROMPT")
  PROMPT_SECTION="## 📋 指示プロンプト

以下のプロンプトに従って、論構文を作成してください。

\`\`\`
${PROMPT_CONTENT}
\`\`\`

---
"
else
  echo "⚠️  注意: 論構文プロンプトファイルが見つかりません（スキップ）"
  PROMPT_SECTION="## 📋 指示プロンプト

（プロンプトファイルなし - 話者情報と文字起こしから論構文を作成してください）

---

"
fi

# バンドルファイル生成
echo "📝 第${EPISODE_NUM}話の論構文作成用素材を準備中..."
echo ""

cat > "$OUTPUT_FILE" << EOF
# 第${EPISODE_NUM}話 論構文作成用素材バンドル

このファイルには、第${EPISODE_NUM}話の論構文を作成するために必要な全ての情報が含まれています。

---

${PROMPT_SECTION}

## 👥 話者情報

### Opi（おぴたん・大屋友紀雄）

\`\`\`markdown
$(cat "$OPI_PROFILE")
\`\`\`

### タムカイ（タムラカイ）

\`\`\`markdown
$(cat "$TAMKAI_PROFILE")
\`\`\`

---

## 🎙️ 対話ログ（文字起こし）

以下が第${EPISODE_NUM}話の対話内容です：

\`\`\`
$(cat "$TRANSCRIPT_FILE")
\`\`\`

---

## ✅ 確認事項

- **話者**: Opi（おぴたん）とタムカイ
- **ターゲット読者**: ビジネスパーソン
- **出力形式**: Markdown形式の論考

この素材をもとに、論構文を作成してください。
EOF

echo "✅ 素材バンドル作成完了: $OUTPUT_FILE"
echo ""
echo "📌 次のステップ:"
echo "1. $OUTPUT_FILE をWeb版Claude（Sonnet 4.5）にコピペ"
echo "2. 生成された論構文をコピー"
echo "3. npm run save-essay $EPISODE_NUM を実行して保存"
echo ""
