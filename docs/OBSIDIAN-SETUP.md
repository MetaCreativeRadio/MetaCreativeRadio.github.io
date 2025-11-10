# Obsidian知識ベースセットアップガイド

## 1. インストール

1. https://obsidian.md/ からダウンロード
2. インストール後、「Open folder as vault」を選択
3. 以下のフォルダ構造を作成:

```
/Users/tamkai/Documents/MetaCreativeRadio-Knowledge/
├── 00-Index/
│   ├── エピソード一覧.md
│   └── 概念マップ.md
├── 01-Theories/           # 理論・思想
│   ├── メタ認知.md
│   ├── 文化資本.md
│   └── ...
├── 02-Concepts/          # 概念
│   ├── ライブ性.md
│   ├── 創造性.md
│   └── ...
├── 03-Annotations/       # 注釈データベース
│   ├── デザインフェロー.md
│   ├── 印象操作.md
│   └── ...
├── 04-People/           # 人物
│   ├── ハイデガー.md
│   ├── ゴフマン.md
│   └── ...
├── 05-Episodes/         # エピソード別索引
│   ├── 第1話.md
│   ├── 第2話.md
│   └── ...
└── 99-Templates/        # テンプレート
    ├── 理論テンプレート.md
    ├── 注釈テンプレート.md
    └── エピソード索引テンプレート.md
```

## 2. 基本的な使い方

### リンクの作り方
```markdown
[[メタ認知]] という概念は、[[第1話]]と[[第3話]]で登場する。
[[ゴフマン]]の[[印象操作]]理論と関連している。
```

### タグの使い方
```markdown
#理論 #社会学 #第1話
```

### バックリンク
各ノートの右サイドバーに、そのノートにリンクしている他のノートが自動表示される。

### グラフビュー
- Cmd+G (Mac) / Ctrl+G (Windows) でグラフビューを表示
- ノード間の関係性が可視化される

## 3. おすすめプラグイン

### コアプラグイン（標準搭載）
- **Daily notes**: 日々の思考メモ
- **Templates**: テンプレート機能
- **Graph view**: 関係性の可視化
- **Backlinks**: 双方向リンク表示
- **Tags pane**: タグ一覧

### コミュニティプラグイン（インストール推奨）
1. **Dataview**: データベースクエリ
2. **Excalidraw**: 手書き図解
3. **Obsidian Git**: Git連携（バックアップ）

## 4. テンプレート例

### 注釈テンプレート
```markdown
---
type: annotation
episode:
category:
tags:
---

# {{title}}

## 定義
[簡潔な定義]

## 詳細説明
[詳しい説明]

## 登場エピソード
- [[第○話]]: [文脈]

## 関連概念
- [[概念1]]
- [[概念2]]

## 参考文献
-

## メモ
```

### 理論テンプレート
```markdown
---
type: theory
thinker:
year:
tags:
---

# {{title}}

## 概要
[理論の概要]

## 提唱者
[[人物名]] (生年-没年)

## 主要概念
- [[概念1]]
- [[概念2]]

## 登場エピソード
- [[第○話]]: [どのように語られたか]

## 関連理論
- [[理論1]]
- [[理論2]]

## 引用
> [重要な引用]

## メモ
```

## 5. ワークフロー

### 新しいエピソードが追加されたら

1. `05-Episodes/第○話.md` を作成
2. 論構文を読みながら登場する概念・理論・人物をリストアップ
3. 新しい概念があれば対応するノートを作成
4. 既存の概念ノートに[[第○話]]へのリンクを追加
5. グラフビューで関係性を確認

### 注釈を追加する時

1. `03-Annotations/[用語名].md` を作成
2. テンプレートを使用
3. 関連する理論・概念にリンク
4. エピソード索引にも追加

## 6. 検索のコツ

### クイック検索
- Cmd+O (Mac) / Ctrl+O (Windows): ファイル名で検索
- Cmd+Shift+F (Mac) / Ctrl+Shift+F (Windows): 全文検索

### Dataviewクエリ例
```dataview
TABLE episode, category
FROM "03-Annotations"
WHERE contains(episode, "第1話")
SORT file.name ASC
```

## 7. バックアップ

### Git連携（推奨）
```bash
cd /Users/tamkai/Documents/MetaCreativeRadio-Knowledge
git init
git add .
git commit -m "Initial commit"
```

Obsidian Gitプラグインで自動コミット・プッシュ設定可能。

---

**次のステップ**: まずは第1話の注釈を手動で入力してみて、ワークフローに慣れる
