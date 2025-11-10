# 知識ベース全体構造設計

## コンセプト

**1つのObsidian Vaultに全プロジェクトを統合**

- メタクリエイティブラジオ
- タムカイ×Opiの対話ログ論構文
- その他の対話・論考

理由: 概念の横断検索・グラフビュー・知識の有機的成長を最大化

---

## ディレクトリ構造

```
MetaCreativeDialogues/  (Vault名)
├── .obsidian/
│   ├── plugins/
│   └── ...
│
├── 00-Index/
│   ├── README.md                    # Vault全体の説明
│   ├── プロジェクト一覧.md          # 全プロジェクトの索引
│   ├── 最近の更新.md                # ダッシュボード
│   └── 概念マップ.md                # 主要概念の関係図
│
├── 01-Projects/
│   ├── MetaCreativeRadio/
│   │   ├── _index.md                # プロジェクト説明
│   │   ├── episodes/
│   │   │   ├── 第1話_索引.md
│   │   │   ├── 第2話_索引.md
│   │   │   └── ...
│   │   ├── essays/
│   │   │   ├── 第1話_論構文.md     # 実際の論構文
│   │   │   └── ...
│   │   └── annotations/
│   │       ├── デザインフェロー.md  # プロジェクト固有の注釈
│   │       └── ...
│   │
│   ├── Dialogue-2025-01-タムカイOpi/
│   │   ├── _index.md
│   │   ├── 原文_2025-01-15.md      # 元の対話ログ
│   │   ├── 論構文_2025-01-15.md    # 生成された論構文
│   │   └── annotations/
│   │       └── ...
│   │
│   ├── Dialogue-2025-02-タムカイOpi/
│   │   └── ...
│   │
│   └── _template-project/           # 新規プロジェクト用テンプレート
│       ├── _index.md
│       ├── 原文.md
│       ├── 論構文.md
│       └── annotations/
│
├── 02-Theories/                     # 理論（全プロジェクト共通）
│   ├── メタ認知.md
│   ├── 文化資本.md
│   ├── 印象操作.md
│   ├── ライブ性の三層構造.md
│   └── ...
│
├── 03-Concepts/                     # 概念（全プロジェクト共通）
│   ├── ライブ性.md
│   ├── 創造性.md
│   ├── 覚悟.md
│   ├── 味わうこと.md
│   └── ...
│
├── 04-People/                       # 人物（全プロジェクト共通）
│   ├── ゴフマン.md
│   ├── ブルデュー.md
│   ├── ハイデガー.md
│   └── ...
│
├── 05-Themes/                       # テーマ別索引
│   ├── 音楽とメディア.md
│   ├── AIと創造性.md
│   ├── 自己紹介と実存.md
│   └── ...
│
└── 99-Templates/                    # テンプレート
    ├── 理論テンプレート.md
    ├── 概念テンプレート.md
    ├── 注釈テンプレート.md
    ├── エピソード索引テンプレート.md
    └── 対話論構文テンプレート.md
```

---

## ファイル命名規則

### プロジェクト名
- `MetaCreativeRadio` - ラジオプロジェクト
- `Dialogue-YYYY-MM-誰と誰` - 対話プロジェクト
- 例: `Dialogue-2025-01-タムカイOpi`
- 例: `Dialogue-2025-03-タムカイ大里P`

### ファイル名
- **論構文**: `論構文_タイトル.md` or `第N話_論構文.md`
- **原文**: `原文_日付.md` or `transcript_日付.md`
- **索引**: `第N話_索引.md` or `_index.md`
- **注釈**: `用語名.md`（シンプルに）

### 日付フォーマット
- `YYYY-MM-DD` 形式（例: `2025-01-15`）
- ファイル名に含める場合: `原文_2025-01-15.md`

---

## リンクの作り方

### 基本的なリンク
```markdown
[[メタ認知]] について [[ゴフマン]] は...
```

### プロジェクト固有のリンク
```markdown
[[01-Projects/MetaCreativeRadio/episodes/第1話_索引|第1話]] では...
```

### エイリアス（別名）
```markdown
[[ライブ性|ライブ感]] が重要だ
[[メタ認知|メタ的視点]] を持つこと
```

### セクションリンク
```markdown
[[メタ認知#定義]] を参照
[[第1話_索引#主要概念]] を見る
```

---

## タグ戦略

### プロジェクトタグ
- `#MetaCreativeRadio`
- `#Dialogue-2025-01`
- `#Dialogue-2025-02`

### カテゴリタグ
- `#理論` `#概念` `#人物` `#注釈`

### 内容タグ
- `#創造性` `#メディア論` `#自己認識` `#哲学`
- `#心理学` `#社会学` `#音楽` `#AI`

### 話者タグ
- `#タムカイ` `#Opi` `#大里P`

### 使用例
```markdown
---
tags:
  - MetaCreativeRadio
  - 創造性
  - 心理学
  - 第1話
---
```

---

## Dataviewクエリ例

### 特定プロジェクトの全ファイル
```dataview
LIST
FROM "01-Projects/MetaCreativeRadio"
SORT file.name ASC
```

### タグで絞り込み
```dataview
TABLE file.tags as "タグ"
FROM #創造性
SORT file.name
```

### 最近更新されたファイル
```dataview
TABLE file.mtime as "更新日時"
FROM ""
SORT file.mtime DESC
LIMIT 10
```

### 特定の概念が登場するプロジェクト
```dataview
LIST
FROM [[メタ認知]]
WHERE contains(file.path, "Projects")
```

---

## 新規プロジェクト追加フロー

### 1. プロジェクトフォルダ作成
```bash
cd 01-Projects
mkdir Dialogue-2025-03-タムカイOpi
cd Dialogue-2025-03-タムカイOpi
```

### 2. テンプレートからコピー
```bash
cp -r ../_template-project/* .
```

### 3. _index.md を編集
```markdown
---
project: Dialogue-2025-03
participants: タムカイ, Opi
date: 2025-03-10
tags:
  - Dialogue-2025-03
  - タムカイ
  - Opi
---

# Dialogue 2025-03: タムカイ×Opi

## 概要
[対話のテーマ・背景]

## 日時
2025年3月10日

## 主要トピック
- トピック1
- トピック2

## 生成された論構文
- [[論構文_2025-03-10]]

## 関連概念
- [[概念1]]
- [[概念2]]
```

### 4. 原文・論構文を追加

### 5. 注釈を抽出して追加
- プロジェクト固有: `annotations/` 内
- 共通概念: `02-Theories/` or `03-Concepts/` へ

### 6. Git コミット
```bash
git add .
git commit -m "[Dialogue-2025-03] 新規プロジェクト追加"
git push
```

---

## メンテナンス

### 定期的に行うこと

1. **孤立ファイルチェック**
   - グラフビューで孤立したノードを確認
   - 適切なリンクを追加

2. **重複概念の統合**
   - 似た概念が複数ある場合は統合
   - エイリアス機能を活用

3. **タグの整理**
   - 使われていないタグを削除
   - タグの粒度を調整

4. **テンプレートの更新**
   - 運用しながら改善点が見つかったら更新

---

## Git運用

### コミットメッセージ規約
```bash
# 新規追加
git commit -m "[MetaCreativeRadio] Add 第7話の注釈5件"
git commit -m "[Dialogue-2025-03] Add 論構文・原文"

# 更新
git commit -m "[Theory] Update メタ認知の定義を拡充"
git commit -m "[Concept] Update ライブ性に第7話の言及を追加"

# 修正
git commit -m "[Fix] タイポ修正"
git commit -m "[Refactor] ファイル構造を整理"

# 全体
git commit -m "[Index] Update プロジェクト一覧"
```

### プレフィックス
- `[MetaCreativeRadio]` - ラジオ関連
- `[Dialogue-YYYY-MM]` - 対話プロジェクト
- `[Theory]` - 理論
- `[Concept]` - 概念
- `[People]` - 人物
- `[Index]` - 索引・全体
- `[Fix]` - 修正
- `[Refactor]` - 構造変更

---

## よくある質問

### Q: プロジェクトが増えすぎて遅くならない？
A: Obsidianは数万ファイルでも高速。問題なし。

### Q: プロジェクトごとにVault分けた方が管理しやすいのでは？
A: 短期的にはそうだが、長期的には統合の方が強力。横断検索とグラフビューの価値は絶大。

### Q: 共通概念と個別プロジェクトの境界は？
A: 基本ルール:
- **2つ以上のプロジェクトで登場** → `02-Theories/` or `03-Concepts/` へ
- **1つのプロジェクトのみ** → `01-Projects/[project]/annotations/` に

### Q: Gitのコンフリクトが心配
A: Markdownなので解決は簡単。実際にはほとんど起きない。

---

## まとめ

- ✅ **1つのVaultに全プロジェクト統合**
- ✅ **横断検索・グラフビュー・知識の有機的成長**
- ✅ **Git管理で履歴完全保存**
- ✅ **プロジェクトが増えても構造は同じ**
- ✅ **Claude Codeで自動化も可能**

**次のステップ**:
1. Vault作成
2. MetaCreativeRadioの内容を移行
3. 最初の対話プロジェクト追加
4. ワークフロー確認・調整
