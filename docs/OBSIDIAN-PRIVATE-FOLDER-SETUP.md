# Obsidian: 共有Vault内に個人用フォルダを作る方法

## コンセプト

1つのVault内に**共有エリア**と**個人エリア**を共存させる。

- 共有エリア: Git管理 → Opiたんと同期
- 個人エリア: `.gitignore` → ローカルのみ、絶対に共有されない

**メリット**:
- リンク可能
- 横断検索可能
- グラフビュー統合
- でも安全

---

## ディレクトリ構造

```
MetaCreativeDialogues/
├── .git/
├── .gitignore                     # 重要！
├── .obsidian/
│   ├── workspace.json             # 個人設定（.gitignoreで除外済み）
│   └── ...
│
├── 00-Index/                      # [共有]
├── 01-Projects/                   # [共有]
├── 02-Theories/                   # [共有]
├── 03-Concepts/                   # [共有]
├── 04-People/                     # [共有]
├── 05-Themes/                     # [共有]
│
├── 90-Tamkai-Private/             # [個人] ← タムカイのみ
│   ├── README.md                  # 説明ファイル
│   ├── 仕事/
│   │   ├── プロジェクトA.md
│   │   └── ミーティングメモ/
│   ├── プライベート/
│   │   ├── 読書メモ/
│   │   └── 日記/
│   └── アイデア/
│
├── 91-Opi-Private/                # [個人] ← Opiのみ
│   └── ...
│
└── 99-Templates/                  # [共有]
```

---

## .gitignore 設定

Vaultのルートに `.gitignore` を作成（Opiたんが初期設定時に作成）:

```gitignore
# ===== 個人フォルダ（絶対に共有しない） =====
90-Tamkai-Private/
91-Opi-Private/
92-*-Private/

# ===== Obsidian個人設定 =====
.obsidian/workspace.json
.obsidian/workspace-mobile.json

# ===== その他 =====
.DS_Store
.trash/
```

**重要**: `90-Tamkai-Private/` が `.gitignore` に入っていれば、
このフォルダ内の**すべてのファイル**が Git 管理外になります。

---

## 安全性の確認

### テスト1: Gitステータス確認

```bash
cd ~/Documents/MetaCreativeDialogues

# 個人フォルダにテストファイル作成
mkdir -p 90-Tamkai-Private
echo "これは個人メモ" > 90-Tamkai-Private/test.md

# Git状態確認
git status

# 結果: 90-Tamkai-Private/test.md は表示されない
# → 成功！Git管理外になっている
```

### テスト2: コミット試行

```bash
git add .
git status

# 結果: 90-Tamkai-Private/ 内のファイルは含まれない
# → 安全！
```

### テスト3: 強制追加を試す

```bash
git add 90-Tamkai-Private/test.md
# エラー: The following paths are ignored by one of your .gitignore files

# → 完璧！強制的に追加しようとしてもブロックされる
```

---

## 個人フォルダの初期設定

### Opiたんがセットアップ完了後、タムカイ側で実行

```bash
cd ~/Documents/MetaCreativeDialogues

# 個人フォルダ作成
mkdir -p 90-Tamkai-Private/{仕事,プライベート,アイデア,読書メモ}

# README作成（自分用の説明）
cat > 90-Tamkai-Private/README.md << 'EOF'
# タムカイ個人用エリア

このフォルダは `.gitignore` で除外されており、Git管理外です。
Opiたんと共有されることは**絶対にありません**。

## フォルダ構成
- `仕事/`: 仕事関連のメモ
- `プライベート/`: プライベートなメモ
- `アイデア/`: 思いつきメモ
- `読書メモ/`: 本の感想など

## リンクの使い方
共有エリアの概念にリンク可能:
```markdown
[[02-Theories/メタ認知]] について、個人的に思うこと...
```

逆に、共有エリアから個人メモにもリンク可能:
```markdown
個人的な考察: [[90-Tamkai-Private/アイデア/メモ001]]
```
EOF

# Git状態確認（何も表示されないはず）
git status
```

---

## リンクの使い方

### 共有 → 個人へのリンク

共有エリアのファイル（例: `02-Theories/メタ認知.md`）から:

```markdown
# メタ認知

## タムカイの個人的考察
[[90-Tamkai-Private/アイデア/メタ認知について]] に詳細メモあり
```

**注意**: このリンクはOpiたんには表示されるが、リンク先は見えない（404）。
→ 問題なし。Opiたんは「タムカイが個人的に考えてるんだな」とわかるだけ。

### 個人 → 共有へのリンク

個人メモ（例: `90-Tamkai-Private/仕事/プロジェクトA.md`）から:

```markdown
# プロジェクトA

このプロジェクトでは [[02-Theories/メタ認知]] の概念が重要。

関連する対話:
- [[01-Projects/MetaCreativeRadio/episodes/第1話_索引]]
- [[01-Projects/Dialogue-2025-01/論構文_2025-01-15]]
```

→ これは完全に機能する！個人の思考と共有の知識がつながる。

---

## 検索の使い方

### Obsidian内検索

```
Cmd+Shift+F → "メタ認知" で検索
```

→ 共有エリア + 個人エリア 両方からヒット！

### 検索結果の絞り込み

**共有エリアのみ検索**:
```
path:01-Projects OR path:02-Theories メタ認知
```

**個人エリアのみ検索**:
```
path:90-Tamkai-Private メタ認知
```

---

## グラフビュー

### 全体表示
- `Cmd+G` でグラフビュー表示
- 共有の概念と個人メモがつながる様子が見える

### フィルタ

**個人メモを除外**:
```
Filters → Path: -90-Tamkai-Private
```

**個人メモのみ表示**:
```
Filters → Path: 90-Tamkai-Private
```

---

## よくある質問

### Q: うっかり個人フォルダをコミットしてしまわないか心配

A: `.gitignore` が正しく設定されていれば**絶対に不可能**です。

確認方法:
```bash
git add .
git status
# → 90-Tamkai-Private/ は表示されない
```

さらに安心したいなら:
```bash
# Git Hooksで二重チェック（上級者向け）
cat > .git/hooks/pre-commit << 'EOF'
#!/bin/bash
if git diff --cached --name-only | grep -q "90-Tamkai-Private/"; then
  echo "エラー: 個人フォルダがコミットされようとしています！"
  exit 1
fi
EOF
chmod +x .git/hooks/pre-commit
```

### Q: Opiたんから個人メモにリンクされたら見えちゃう？

A: いいえ。Opiたんの環境には `90-Tamkai-Private/` フォルダ自体が存在しないので、
リンクは404（リンク切れ）として表示されます。

### Q: 個人フォルダの容量が大きくなったらVaultが重くならない？

A: Obsidianは数万ファイルでも高速なので問題なし。
ただし、画像や動画を大量に入れる場合は別Vaultも検討。

### Q: 別Vaultにしたくなったら？

A: いつでも移行可能:
```bash
# 新規Vault作成
mkdir ~/Documents/TamkaiPersonal
mv ~/Documents/MetaCreativeDialogues/90-Tamkai-Private/* ~/Documents/TamkaiPersonal/
```

---

## Opiたん側の設定

Opiたんも同じように `91-Opi-Private/` を作成可能。

お互いの個人フォルダは:
- 見えない
- リンクできる（が、リンク先は404）
- 検索には出ない（相手の環境には存在しないため）

---

## まとめ

- ✅ **1つのVaultで共有+個人を管理可能**
- ✅ **`.gitignore` で完全に安全**
- ✅ **リンク・検索・グラフビューが統合**
- ✅ **いつでも別Vaultに移行可能**

**推奨**: まずこの方法で始めて、不便を感じたら別Vaultを検討。

---

**次のステップ**:
1. Opiたんに `.gitignore` に `90-Tamkai-Private/` を追加してもらう
2. タムカイ側でクローン後、個人フォルダを作成
3. テストして安全性を確認
