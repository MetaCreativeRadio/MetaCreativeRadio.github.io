# Opiたん向け: Obsidian Vault初期セットアップ依頼

## お願いしたいこと

Obsidian Vaultの初期設定をお願いできますか？🙏

タムカイは後から `git clone` して参加する形を想定しています。

---

## 1. リポジトリ作成

### リポジトリ名（案）
```
MetaCreativeDialogues
```

または
```
TamkaiOpi-Knowledge
```

お好きな名前でOKです！

### 設定
- **Visibility**: Private（推奨）
- **README**: 作成しない（後で追加）
- **Collaborators**:
  - Opiたん（Owner）
  - タムカイを招待（Username: `tamkai` または GitHubのユーザー名）

---

## 2. ローカルでVault作成

### ディレクトリ作成
```bash
mkdir -p ~/Documents/MetaCreativeDialogues
cd ~/Documents/MetaCreativeDialogues
```

### フォルダ構造
最低限これだけあればOK（後から追加可能）:

```
MetaCreativeDialogues/
├── 00-Index/
│   └── README.md
├── 01-Projects/
│   └── MetaCreativeRadio/
├── 02-Theories/
├── 03-Concepts/
├── 04-People/
└── 99-Templates/
```

コマンドで一括作成:
```bash
mkdir -p 00-Index 01-Projects/MetaCreativeRadio 02-Theories 03-Concepts 04-People 99-Templates
```

### README.md作成
```bash
cat > 00-Index/README.md << 'EOF'
# MetaCreativeDialogues Knowledge Base

タムカイ×Opiの対話・論考の知識ベース

## プロジェクト
- MetaCreativeRadio: ポッドキャスト
- その他の対話ログから生成した論構文

## 構造
- `00-Index/`: 索引
- `01-Projects/`: プロジェクトごとのフォルダ
- `02-Theories/`: 理論（全プロジェクト共通）
- `03-Concepts/`: 概念（全プロジェクト共通）
- `04-People/`: 人物（全プロジェクト共通）
- `99-Templates/`: テンプレート
EOF
```

---

## 3. .gitignore作成

```bash
cat > .gitignore << 'EOF'
# Obsidian workspace (個人設定なので除外)
.obsidian/workspace.json
.obsidian/workspace-mobile.json

# Mac
.DS_Store

# その他
.trash/
EOF
```

---

## 4. Git初期化 & プッシュ

```bash
# Git初期化
git init
git add .
git commit -m "Initial commit: Obsidian Vault setup"

# リモート接続（GitHubでリポジトリ作成後）
git remote add origin git@github.com:[ユーザー名]/MetaCreativeDialogues.git
git branch -M main
git push -u origin main
```

または `gh` コマンドで一発:
```bash
gh repo create MetaCreativeDialogues --private --source=. --remote=origin --push
```

---

## 5. タムカイをCollaboratorに招待

### GitHub Web UIで
1. リポジトリページ → Settings → Collaborators
2. "Add people" → `tamkai`（GitHubユーザー名）を検索
3. "Add [username] to this repository"

### または `gh` コマンドで
```bash
gh repo edit --add-collaborator tamkai
```

---

## 6. Obsidianで開く

1. Obsidianを起動
2. "Open folder as vault" を選択
3. `~/Documents/MetaCreativeDialogues` を選択

---

## 7. おすすめプラグインのインストール（オプション）

Obsidian内で:

1. Settings → Community plugins → Browse
2. 以下をインストール & 有効化:
   - **Obsidian Git**: 自動コミット・プッシュ
   - **Dataview**: データベースクエリ（後で便利）

### Obsidian Git設定
Settings → Obsidian Git:
- ✅ Auto pull on startup: enabled (起動時に自動pull)
- ✅ Auto save: enabled (10分おきに自動コミット)
- ✅ Auto push: enabled (コミット後に自動プッシュ)

これで**ほぼ自動化**されます！

---

## 8. 動作確認

### テストファイル作成
Obsidian内で適当なノートを作成:
```markdown
# テスト

これはテストです。
```

### Gitで確認
```bash
cd ~/Documents/MetaCreativeDialogues
git status
# → 新しいファイルが表示されるはず

git add .
git commit -m "Test: 動作確認"
git push
```

---

## 完了したらタムカイに連絡

「リポジトリ作ったよ！」と連絡いただければ、タムカイ側で:
```bash
git clone git@github.com:[Opiのユーザー名]/MetaCreativeDialogues.git ~/Documents/MetaCreativeDialogues
```

でクローンして参加します！

---

## 参考資料

詳細は以下のドキュメントを参照:
- `/Users/tamkai/product/MetaCreativeRadioWeb/docs/OBSIDIAN-SETUP.md`
- `/Users/tamkai/product/MetaCreativeRadioWeb/docs/OBSIDIAN-GIT-COLLABORATION.md`
- `/Users/tamkai/product/MetaCreativeRadioWeb/docs/KNOWLEDGE-BASE-STRUCTURE.md`

もし質問があれば、タムカイに聞いてください（Claude Codeが答えます笑）

---

**ありがとうございます！🙏**
