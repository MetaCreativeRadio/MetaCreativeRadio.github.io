#!/bin/bash

# WAV to MP3 変換スクリプト
# 使い方: npm run convert-to-mp3

echo "🎵 WAVファイルをMP3に変換します"
echo ""

# audioフォルダのWAVファイルを検索
WAV_FILES=$(find audio -name "*.wav" -o -name "*.WAV")

if [ -z "$WAV_FILES" ]; then
  echo "❌ audioフォルダにWAVファイルが見つかりません"
  exit 0
fi

# 変換するファイル数をカウント
FILE_COUNT=$(echo "$WAV_FILES" | wc -l | tr -d ' ')
echo "📁 ${FILE_COUNT}個のWAVファイルが見つかりました"
echo ""

# 各ファイルをリスト表示
echo "変換対象:"
echo "$WAV_FILES" | while read file; do
  SIZE=$(du -h "$file" | cut -f1)
  echo "  - $(basename "$file") (${SIZE})"
done
echo ""

# 確認プロンプト
read -p "これらのファイルをMP3に変換して、元のWAVファイルを削除しますか? (yes/no): " CONFIRM

if [ "$CONFIRM" != "yes" ]; then
  echo "❌ キャンセルしました"
  exit 0
fi

echo ""
echo "🔄 変換を開始します..."
echo ""

# 変換カウンター
CONVERTED=0
FAILED=0

# 各WAVファイルを変換
echo "$WAV_FILES" | while read wav_file; do
  if [ ! -f "$wav_file" ]; then
    continue
  fi

  # 出力ファイル名（拡張子を.mp3に変更）
  mp3_file="${wav_file%.*}.mp3"

  echo "🎵 変換中: $(basename "$wav_file")"

  # ffmpegで変換（192kbps、高品質）
  if ffmpeg -i "$wav_file" -codec:a libmp3lame -b:a 192k -y "$mp3_file" -loglevel error; then
    # 変換成功
    ORIGINAL_SIZE=$(du -h "$wav_file" | cut -f1)
    NEW_SIZE=$(du -h "$mp3_file" | cut -f1)

    echo "   ✅ 完了: ${ORIGINAL_SIZE} → ${NEW_SIZE}"

    # 元のWAVファイルを削除
    rm "$wav_file"
    echo "   🗑️  元のWAVファイルを削除しました"

    CONVERTED=$((CONVERTED + 1))
  else
    echo "   ❌ 変換失敗: $(basename "$wav_file")"
    FAILED=$((FAILED + 1))
  fi

  echo ""
done

echo "✨ 変換完了!"
echo "   成功: ${CONVERTED}個"
if [ $FAILED -gt 0 ]; then
  echo "   失敗: ${FAILED}個"
fi
echo ""

# 変換後の容量を表示
TOTAL_SIZE=$(du -sh audio/ | cut -f1)
echo "📊 audioフォルダの合計サイズ: ${TOTAL_SIZE}"
