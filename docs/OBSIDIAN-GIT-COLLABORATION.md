# Obsidian + Git 共同運用ガイド

## 概要

Obsidian VaultをGitで管理し、タムカイ・Opiで共同編集する。

**推奨構成**: mainブランチのみの運用（シンプル・堅牢）

## セットアップ（初回のみ）

### 1. タムカイ側（リポジトリ作成者）

```bash
# Obsidian Vault用ディレクトリ作成
mkdir -p ~/Documents/MetaCreativeRadio-Knowledge
cd ~/Documents/MetaCreativeRadio-Knowledge

# ディレクトリ構造作成
mkdir -p 00-Index 01-Theories 02-Concepts 03-Annotations 04-People 05-Episodes 99-Templates

# README作成
cat > README.md << 'EOF'
# メタクリエイティブラジオ 知識ベース

Obsidian Vaultとして管理される、メタクリラジオの理論・概念データベース

## ディレクトリ構造

- `00-Index/`: 索引・概念マップ
- `01-Theories/`: 理論（メタ認知、文化資本など）
- `02-Concepts/`: 概念（ライブ性、創造性など）
- `03-Annotations/`: 注釈データベース
- `04-People/`: 人物（ゴフマン、ブルデューなど）
- `05-Episodes/`: エピソード別索引
- `99-Templates/`: テンプレート

## 運用ルール

### 基本フロー
1. 作業前に `git pull` で最新を取得
2. Obsidianで編集
3. `git add . && git commit -m "説明" && git push`

### コミットメッセージ例
- `Add 第7話の注釈5件追加`
- `Update メタ認知の説明を補足`
- `Fix タイポ修正`

### コンフリクトしたら
- 落ち着いて両方の内容を確認
- 必要なら両方残す、または統合
- わからなければチャットで相談

## Obsidian設定

### おすすめプラグイン
- **Obsidian Git**: 自動コミット・プッシュ
- **Dataview**: データベースクエリ
- **Templater**: 高度なテンプレート

### Obsidian Git設定
- 自動コミット間隔: 10分
- 自動プッシュ: 有効
- プル間隔: 5分（Obsidian起動時）
EOF

# .gitignore作成
cat > .gitignore << 'EOF'
# Obsidian workspace (個人設定なので除外)
.obsidian/workspace.json
.obsidian/workspace-mobile.json

# プラグインのローカル設定
.obsidian/plugins/*/data.json

# Mac
.DS_Store

# その他
.trash/
EOF

# Git初期化
git init
git add .
git commit -m "Initial commit: Obsidian Vault setup"

# GitHubにプッシュ（リポジトリは事前作成）
# オプション1: 新規リポジトリ作成
gh repo create MetaCreativeRadio-Knowledge --private --source=. --remote=origin --push

# オプション2: 既存リポジトリに接続
# git remote add origin git@github.com:tamkai/MetaCreativeRadio-Knowledge.git
# git push -u origin main
```

### 2. Opi側（クローン）

```bash
# リポジトリをクローン
cd ~/Documents
git clone git@github.com:tamkai/MetaCreativeRadio-Knowledge.git
# または
git clone https://github.com/tamkai/MetaCreativeRadio-Knowledge.git

# Obsidianで開く
# Obsidian起動 → "Open folder as vault" → MetaCreativeRadio-Knowledgeを選択
```

## 日常運用

### 作業開始時

```bash
cd ~/Documents/MetaCreativeRadio-Knowledge
git pull  # 最新を取得
```

または、**Obsidian Gitプラグイン**を使用している場合:
- Obsidian起動時に自動でpull
- 何もしなくてOK

### 編集中

- Obsidianで普通に編集
- ファイル作成・削除も自由に
- 自動保存されるので安心

### 作業終了時

**方法A: コマンドライン**
```bash
cd ~/Documents/MetaCreativeRadio-Knowledge
git add .
git commit -m "Add 第7話の注釈: ライブ性、即興性など"
git push
```

**方法B: Obsidian Gitプラグイン**
- Cmd+P (Mac) / Ctrl+P (Windows) → "Obsidian Git: Commit all changes"
- コミットメッセージ入力
- 自動でpush（設定による）

### コンフリクト発生時

```bash
# pullした時にコンフリクト発生
git pull
# Auto-merging 03-Annotations/メタ認知.md
# CONFLICT (content): Merge conflict in 03-Annotations/メタ認知.md

# 1. Obsidianまたはエディタでファイルを開く
# 2. コンフリクトマーカーを確認
<<<<<<< HEAD
タムカイが追加した内容:
- 新しい視点
=======
Opiが追加した内容:
- 別の視点
>>>>>>> origin/main

# 3. 統合または選択
タムカイが追加した内容:
- 新しい視点

Opiが追加した内容:
- 別の視点

# 4. マーカーを削除して保存

# 5. コミット
git add .
git commit -m "Merge: メタ認知の説明を統合"
git push
```

## Obsidian Gitプラグインの設定

### インストール

1. Obsidian設定 → Community plugins → Browse
2. "Obsidian Git"を検索 → Install → Enable

### 推奨設定

```
Settings → Obsidian Git

【Automatic】
✅ Auto pull on startup: enabled
   Pull interval: 5 (minutes)

✅ Auto save: enabled
   Vault backup interval: 10 (minutes)

✅ Auto push: enabled

【Commit Message】
Commit message: "vault backup: {{date}}"
```

これで**10分おきに自動コミット&プッシュ**される。

### 手動操作（コマンドパレット）

- `Cmd+P` → `Obsidian Git: Commit all changes`
- `Cmd+P` → `Obsidian Git: Push`
- `Cmd+P` → `Obsidian Git: Pull`

## ベストプラクティス

### ✅ やるべきこと

1. **作業前にpull**: 最新の状態で作業開始
2. **こまめにcommit**: 大きな変更は小分けに
3. **わかりやすいコミットメッセージ**: 何をしたか明確に
4. **コンフリクトは落ち着いて対処**: 両方の内容を尊重

### ❌ 避けるべきこと

1. **長期間pullしない**: コンフリクトの原因に
2. **大量の変更を一度にcommit**: レビューしづらい
3. **コミットメッセージが不明瞭**: "update"だけとか
4. **コンフリクトを無視**: 一方の変更が消える可能性

## トラブルシューティング

### Q: プッシュできない（リモートの方が新しい）

```bash
git pull
# コンフリクトあれば解決
git push
```

### Q: 間違えてcommitした

```bash
# 直前のコミットを取り消し（ファイルはそのまま）
git reset --soft HEAD~1

# やり直し
git add .
git commit -m "正しいメッセージ"
git push
```

### Q: ファイルを削除したい

```bash
# Obsidianでファイル削除 → 自動的にgitに反映
# または
git rm path/to/file.md
git commit -m "Remove 不要なファイル"
git push
```

### Q: .obsidianフォルダは共有すべき？

**推奨**: 一部は共有、一部は除外

**共有すべき**:
- `.obsidian/plugins/` (プラグインリスト)
- `.obsidian/themes/` (テーマ)
- `.obsidian/snippets/` (CSSスニペット)

**除外すべき**:
- `.obsidian/workspace.json` (個人のウィンドウ配置)
- `.obsidian/plugins/*/data.json` (プラグインの個人設定)

→ `.gitignore`で調整済み

## まとめ

- **mainブランチのみ運用**: シンプルで十分
- **Obsidian Gitプラグイン**: 自動化で楽々
- **コンフリクトは稀**: Markdownなので解決も簡単
- **Claude Codeと相性抜群**: Git操作も自動化可能

---

**次のステップ**:
1. タムカイがリポジトリ作成
2. Opiを招待（Collaborator追加）
3. 両者でクローン → Obsidian Gitプラグイン設定
4. 実際に編集してみてワークフロー確認
