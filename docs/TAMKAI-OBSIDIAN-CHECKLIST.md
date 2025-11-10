# タムカイ用 Obsidianセットアップ チェックリスト

## 📋 Opiたんがセットアップする前にやること

### ✅ 1. Obsidianをインストール

```bash
# ダウンロードページを開く
open https://obsidian.md/

# または Homebrewで
brew install --cask obsidian
```

### ✅ 2. SSH鍵の確認

```bash
# SSH鍵があるか確認
ls -la ~/.ssh/id_*.pub

# なければ作成
ssh-keygen -t ed25519 -C "your_email@example.com"

# 公開鍵をコピー
cat ~/.ssh/id_ed25519.pub | pbcopy

# GitHubに登録
open https://github.com/settings/keys
# → "New SSH key" → ペースト → "Add SSH key"
```

### ✅ 3. GitHubのユーザー名を確認

```bash
# 自分のGitHubユーザー名
gh api user --jq .login

# または
open https://github.com
# → 右上のアイコンクリック → "Signed in as [username]"
```

**ユーザー名をOpiたんに伝える**（Collaboratorに追加してもらう）

---

## 📋 Opiたんがセットアップした後にやること

### ✅ 1. 招待を承認

GitHub から「You've been invited to collaborate on [repo]」というメールが届く
→ "View invitation" → "Accept invitation"

### ✅ 2. リポジトリURLを確認

Opiたんから教えてもらったURL（例）:
```
git@github.com:opi/MetaCreativeDialogues.git
```

### ✅ 3. クローン実行

**方法A: 自動スクリプト（推奨）**
```bash
cd ~/product/MetaCreativeRadioWeb

# URLを指定して実行
npm run setup-obsidian git@github.com:opi/MetaCreativeDialogues.git
```

**方法B: 手動**
```bash
git clone git@github.com:opi/MetaCreativeDialogues.git ~/Documents/MetaCreativeDialogues
```

### ✅ 4. Obsidianで開く

1. Obsidianを起動
2. **"Open folder as vault"** を選択（"Create new vault"ではない！）
3. `~/Documents/MetaCreativeDialogues` を選択
4. "Trust author and enable plugins" を選択（Opiたんを信頼）

### ✅ 5. Obsidian Gitプラグインを設定

#### インストール（まだなら）
1. Settings（⚙️） → Community plugins
2. "Turn on community plugins" （初回のみ）
3. Browse → "Obsidian Git" を検索 → Install → Enable

#### 設定
Settings → Obsidian Git:

**Automatic**:
- ✅ Auto pull on startup: **enabled**
  - Pull interval: **5** (minutes)
- ✅ Auto save: **enabled**
  - Vault backup interval: **10** (minutes)
- ✅ Auto push: **enabled**

**Commit Message**:
- Commit message: `vault backup: {{date}}`

これで**10分おきに自動コミット&プッシュ**されます！

### ✅ 6. 動作確認

#### テストファイル作成
1. Obsidian内で `Cmd+N` で新しいノート作成
2. タイトル: `テスト_タムカイ`
3. 内容:
```markdown
# テスト

タムカイのテストです。
```

#### 自動コミット確認
- 10分待つ（またはCmd+P → "Obsidian Git: Commit all changes"で手動実行）
- Opiたんに「テストファイル見える？」と確認

#### Opiたんの更新を取得
- Obsidian再起動（自動でpull）
- または Cmd+P → "Obsidian Git: Pull"

---

## 📋 日常の使い方

### 作業開始時
- Obsidianを起動するだけ（自動でpull）

### 編集中
- 普通に編集
- 10分おきに自動保存・コミット・プッシュ

### 作業終了時
- Obsidianを閉じるだけ（自動で同期済み）

### 手動でコミット・プッシュしたい時
```
Cmd+P → "Obsidian Git: Commit all changes"
→ コミットメッセージ入力
```

---

## 🆘 トラブルシューティング

### Q: クローンできない

**エラー**: `Permission denied (publickey)`

**解決**:
```bash
# SSH鍵がGitHubに登録されているか確認
ssh -T git@github.com
# → "Hi [username]! You've successfully authenticated"

# ダメなら SSH鍵を再登録
cat ~/.ssh/id_ed25519.pub | pbcopy
open https://github.com/settings/keys
```

### Q: Collaboratorに追加されてない

**エラー**: `Repository not found`

**解決**:
- Opiたんに「Collaboratorに追加してもらえますか？」と依頼
- GitHubユーザー名を再度伝える

### Q: プッシュできない

**エラー**: `rejected ... fetch first`

**解決**:
```
Cmd+P → "Obsidian Git: Pull"
→ コンフリクトあれば解決
→ Cmd+P → "Obsidian Git: Push"
```

### Q: コンフリクトが起きた

**現象**: 同じファイルを同時編集

**解決**:
1. Obsidianでファイルを開く
2. コンフリクトマーカーを確認:
```markdown
<<<<<<< HEAD
タムカイの内容
=======
Opiの内容
>>>>>>> origin/main
```
3. 両方とも良ければ両方残す
4. マーカー（`<<<<<<<`など）を削除
5. 保存
6. Cmd+P → "Obsidian Git: Commit all changes"

---

## 📚 参考資料

- 詳細ガイド: `docs/OBSIDIAN-GIT-COLLABORATION.md`
- 全体構造: `docs/KNOWLEDGE-BASE-STRUCTURE.md`
- 基本操作: `docs/OBSIDIAN-SETUP.md`

---

## ✅ 完了チェック

- [ ] Obsidianインストール済み
- [ ] SSH鍵GitHub登録済み
- [ ] GitHubユーザー名をOpiたんに伝えた
- [ ] 招待を承認した
- [ ] リポジトリをクローンした
- [ ] Obsidianで開いた
- [ ] Obsidian Gitプラグイン設定した
- [ ] テストファイル作成・同期確認した

**全部チェックできたら準備完了！🎉**
