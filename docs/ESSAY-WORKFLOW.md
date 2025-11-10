# 論構文作成ワークフロー

このドキュメントでは、メタクリラジオの対話ログから論構文を作成する完全なワークフローを説明します。

## 📋 概要

**目的**: ポッドキャストの対話ログから、哲学的・学術的な深みを持つ論考（論構文）を作成する

**関係者**:
- **Claude Code (Sonnet 4.5)**: 文字起こし、話者プロファイル抽出、素材準備
- **Web版Claude (Sonnet 4.5)**: 論構文の生成
- **ユーザー**: 手動コピペによる連携

---

## 🗂️ ディレクトリ構成

```
MetaCreativeRadioWeb/
├── audio/                    # 音声ファイル（MP3形式）
│   ├── episode01.mp3
│   ├── episode02.mp3
│   └── ...
├── transcripts/              # 文字起こしテキスト
│   ├── episode01.txt
│   ├── episode02.txt
│   └── ...
├── speakers/                 # 話者プロファイル
│   ├── opi.md               # Opi（おぴたん）
│   └── tamkai.md            # タムカイ
├── prompts/                  # プロンプトテンプレート
│   └── 論構文作成プロジェクト指示.txt
├── essay-input/              # Web版Claude用バンドルファイル
│   ├── episode01-bundle.md
│   └── ...
└── essays/                   # 完成した論構文
    ├── episode01.md
    └── ...
```

---

## 🔄 完全ワークフロー

### フェーズ1: 文字起こし（Claude Code）

#### 1-1. 音声ファイル準備
```bash
# WAVファイルをMP3に変換（ストレージ最適化）
npm run convert-to-mp3
```

#### 1-2. 文字起こし実行
```bash
# 英語ファイル名でWhisper mediumモデル実行
cd audio
cp メタクリラジオ_第N回_ver1.mp3 episode0N.mp3

cd ..
export PATH="$PATH:/Users/tamkai/Library/Python/3.9/bin"
whisper "audio/episode0N.mp3" \
  --language Japanese \
  --model medium \
  --output_dir transcripts \
  --output_format txt \
  --fp16 False
```

**所要時間**: 約10-15分/エピソード

---

### フェーズ2: 話者プロファイル抽出（Claude Code）

#### 2-1. Web情報の収集
```bash
# 各話者のTwitter/X、note、活動履歴を調査
# speakers/opi.md と speakers/tamkai.md を更新
```

#### 2-2. 対話ログからの抽出
各エピソードの文字起こしを分析し、以下を抽出：
- パーソナリティ（思考の特徴、関心領域、価値観）
- 話し方・口調（よく使う言い回し、語尾、発言例）
- 思考パターン（論理展開、比喩の使い方、問いかけスタイル）

**更新ファイル**: `speakers/opi.md`, `speakers/tamkai.md`

---

### フェーズ3: 論構文作成（Claude Code ⇄ Web版Claude連携）

#### 3-1. 素材バンドル生成（Claude Code）
```bash
# 第6話の例
npm run prepare-essay 6
```

**生成されるファイル**: `essay-input/episode06-bundle.md`

このファイルには以下が含まれます：
- 論構文作成プロンプト
- 話者プロファイル（Opi + タムカイ）
- 対話ログ（文字起こしテキスト）

#### 3-2. Web版Claudeで論構文生成

1. **essay-input/episode06-bundle.md** の内容をコピー
2. **Web版Claude (Sonnet 4.5)** に新規チャットを開く
3. コピーした内容を貼り付け
4. 論構文が生成されるまで待つ
5. 生成された論構文をコピー

#### 3-3. 論構文保存（Claude Code）
```bash
npm run save-essay 6
# 生成された論構文を貼り付け
# Ctrl+D で保存完了
```

**保存先**: `essays/episode06.md`

#### 3-4. バージョン管理
```bash
git add .
git commit -m "📝 第6話の論構文追加"
git push
```

---

## 🎯 論構文の品質基準

論構文作成プロンプトに従い、以下を満たすこと：

### 構成要素
- **リコンストラクション**: 時系列を無視し、論理とアイデアの連関で再構成
- **エンリッチメント**: 専門用語・哲学的キーワードに注釈を追加（元の3倍以上）
- **話者の文脈活用**: Web情報＋対話ログからの深い理解

### 出力形式
- **Markdown形式**
- **読み物としての自然さ**（口語→文語への洗練）
- **学術的・哲学的な深み**

---

## 📊 進捗管理

### 文字起こし状況
- [ ] 第1話
- [ ] 第2話
- [ ] 第3話
- [ ] 第4話
- [ ] 第5話
- [x] 第6話（mediumモデル）

### 話者プロファイル
- [ ] Opi（おぴたん）- Web情報収集完了
- [ ] Opi（おぴたん）- 全エピソード分析完了
- [ ] タムカイ - Web情報収集完了
- [ ] タムカイ - 全エピソード分析完了

### 論構文作成
- [ ] 第1話
- [ ] 第2話
- [ ] 第3話
- [ ] 第4話
- [ ] 第5話
- [ ] 第6話

---

## 💡 Tips

### Whisperの精度向上
- **baseモデル**: 速い・精度低い
- **mediumモデル**: バランス型（推奨）
- **largeモデル**: 最高精度・遅い

### ファイル名の注意
- ❌ 日本語ファイル名（処理が遅い）
- ✅ 英語ファイル名（episode0N.mp3）

### 話者分離について
- Whisperは話者分離不可
- 論構文作成時に「哲学的編集者」が文脈から判断

---

## 🔧 トラブルシューティング

### 文字起こしが進まない
```bash
# プロセス確認
ps aux | grep whisper

# 長時間（2時間以上）実行中の場合は停止
kill [プロセスID]

# ファイル名を英語に変更して再実行
```

### 論構文の品質が低い
- 話者プロファイルを充実させる
- 文字起こしの精度を確認（誤字修正）
- Web版Claudeのプロンプトを調整

---

**最終更新**: 2025-10-27
**作成者**: tamkai + Claude Code
