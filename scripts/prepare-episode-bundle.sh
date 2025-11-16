#!/bin/bash

# エピソード番号を引数から取得
if [ -z "$1" ]; then
  echo "❌ エラー: エピソード番号を指定してください"
  echo "使用方法: npm run prepare-bundle [エピソード番号]"
  echo "例: npm run prepare-bundle 9"
  exit 1
fi

EPISODE_NUM=$1

echo "🎙️ 第${EPISODE_NUM}回のメタクリドキュメント準備を開始..."
echo ""

# Step 1: 音声ファイルとトランスクリプトの存在確認
echo "📁 Step 1: ファイルの存在確認"

AUDIO_PATTERN="audio/*第${EPISODE_NUM}*.*"
TRANSCRIPT_FILE="transcripts/episode$(printf "%02d" $EPISODE_NUM).txt"

# 音声ファイル検索
AUDIO_FILE=$(ls $AUDIO_PATTERN 2>/dev/null | head -n 1)

if [ -z "$AUDIO_FILE" ]; then
  echo "❌ エラー: 音声ファイルが見つかりません"
  echo "   パターン: $AUDIO_PATTERN"
  exit 1
fi

if [ ! -f "$TRANSCRIPT_FILE" ]; then
  echo "❌ エラー: トランスクリプトファイルが見つかりません"
  echo "   ファイル: $TRANSCRIPT_FILE"
  exit 1
fi

echo "✅ 音声ファイル: $AUDIO_FILE"
echo "✅ トランスクリプト: $TRANSCRIPT_FILE"
echo ""

# Step 2: トランスクリプト分析（手動で実施したことを表示）
echo "📊 Step 2: トランスクリプト分析とスピーカープロフィール更新"
echo "   ⚠️  この作業は既に Claude Code で実施済みであることを確認してください："
echo "   - speakers/opi.md の第${EPISODE_NUM}話セクション追加"
echo "   - speakers/tamkai.md の第${EPISODE_NUM}話セクション追加"
echo ""

read -p "スピーカープロフィール更新済みですか？ (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  echo "❌ 中止: 先にスピーカープロフィールを更新してください"
  exit 1
fi

echo "✅ スピーカープロフィール更新確認済み"
echo ""

# Step 3: バンドルファイル生成
echo "📝 Step 3: バンドルファイル生成"
bash scripts/prepare-essay.sh $EPISODE_NUM

if [ $? -ne 0 ]; then
  echo "❌ エラー: バンドルファイル生成に失敗しました"
  exit 1
fi

echo ""
echo "🎉 第${EPISODE_NUM}回のメタクリドキュメント準備完了！"
echo ""
echo "📌 次のステップ:"
echo "1. essay-input/episode$(printf "%02d" $EPISODE_NUM)-bundle.md をWeb版Claude（Sonnet 4.5）にコピペ"
echo "2. メタクリドキュメント生成"
echo "3. npm run save-essay ${EPISODE_NUM} で保存"
echo ""
