# メタクリラジオ 文字起こし・知見抽出システム セットアップガイド

## 📁 ディレクトリ構造

```
MetaCreativeRadioWeb/
├── audio/              # 音声ファイル格納
│   ├── episode-01.m4a
│   ├── episode-02.m4a
│   └── episode-06.m4a  ← 第6話をここに配置
├── transcripts/        # 文字起こしテキスト
│   ├── episode-01.txt
│   └── episode-06.txt
├── knowledge/          # メタクリエイティブ知見
│   ├── episode-01.md
│   └── meta-index.md
├── insights/           # 論構文・深掘り分析
│   └── episode-01-論構文.txt
├── prompts/            # プロンプトテンプレート
│   └── 論構文生成.md   ← 論構文プロンプトをここに保存
└── scripts/
    ├── transcribe.py   # 文字起こしスクリプト
    └── analyze.py      # 知見抽出スクリプト
```

## 🚀 セットアップ手順

### ステップ1: 音声ファイルを配置

第6話の音声ファイルを以下の場所に保存してください:
```
audio/episode-06.m4a
```
（拡張子は .mp3 や .wav でも可）

### ステップ2: 論構文プロンプトを保存

お持ちの論構文生成プロンプトを以下のファイルに保存してください:
```
prompts/論構文生成.md
```

### ステップ3: Whisperインストール（無料の文字起こしツール）

以下のコマンドを実行してください:

```bash
# Whisperインストール
pip3 install openai-whisper

# 必要な依存関係（ffmpegがない場合）
# macOSの場合
brew install ffmpeg

# インストール確認
whisper --help
```

### ステップ4: 第6話の文字起こし実行

音声ファイルを配置後、以下のコマンドで文字起こしを実行します:

```bash
# 第6話の文字起こし
whisper audio/episode-06.m4a \
  --language Japanese \
  --model medium \
  --output_dir transcripts \
  --output_format txt

# 完了後、transcripts/episode-06.txt が生成されます
```

**処理時間の目安**: 40分の音声で約5-10分程度（PCスペックによる）

## 📋 次のステップ

文字起こしが完了したら:
1. 過去5話のタイトル・キーワードフォーマットを提供
2. Claude Codeで第6話のタイトル・キーワードを自動生成
3. 知見抽出・論構文生成を実行

## ❓ トラブルシューティング

### pip3コマンドが見つからない場合
```bash
# pipのインストール確認
python3 -m pip --version

# なければインストール
python3 -m ensurepip --upgrade
```

### ffmpegがない場合
```bash
# Homebrewがインストールされていない場合
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# その後
brew install ffmpeg
```

## 📞 サポート

不明点があれば Claude Code に質問してください！
