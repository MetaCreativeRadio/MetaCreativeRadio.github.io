# Session Handover - 2026-02-04 17:08

## Summary
メタクリドキュメントのHTML化に向けて、既存HTMLサンプル6本を徹底分析し、2種類のテンプレート（Type A: リッチ版 / Type B: フル版）の設計仕様を策定した。計画ファイルが承認済みで、次セッションからType Bテンプレートの実装に着手する。

## What We Accomplished

### HTMLサンプル分析（6ファイル完了）
- **protopia_v0.html**（ダーク版）: 2,176行/95KB。チャットバブル対話、折りたたみ註釈、ハンバーガーナビ、プログレスバー。Zen Kaku Gothic New + Noto Serif JP。コンテンツ~70%。第5章あり
- **protopia.html（v1）**: 1,794行/85KB。ライトテーマ、エディトリアル誌風。Noto Sans/Serif JP + Outfit。コンテンツ~75%。第5章（ライフセントリックデザイン）欠落
- **protopia_v2.html**: 2,562行/89KB。v1+絵文字装飾。コンテンツはv1と同一。PROTOPIA六原則の円環図に表示崩れあり
- **metacre-ep19.html**: 1,366行/67KB。ベージュ/セージ/サーモン、Shippori Mincho。コンテンツ~60%。**台湾まぜそば問題**:セクション3.3が本文から消えたがタイトル・はじめに・おわりにに言及が残存
- **Ep12 bricolage.html**: 920行/70KB。システムフォント、JS無し、印刷対応。コンテンツ**100%**
- **Ep13 ressentiment.html**: 957行/84KB。Ep12と同一テンプレート。コンテンツ**100%**

### 重要な発見
1. **コンテンツ脱落パターン**: Web版Claudeでの生成では60-80%のカバー率が限界。「長くなってもOKです」の指示がないとep19レベル（~60%）に
2. **タイトル/はじめに不整合問題**: コンテンツをカットしてもタイトルやはじめにが元Markdownのまま残り、本文に存在しない内容への言及が残る（台湾まぜそば問題）
3. **protopia_v0.htmlとprotopia.htmlは完全に別ファイル**。初回分析時にv0が未差し替えで同一だったが、後にユーザーが正しいv0をセット

### テンプレート方針の確定
- **HTML版の位置づけ**: メタクリドキュメントの完全再現ではなく「別の成果物」
- **2種類のSkill**: リッチ版（公開向け入口）+ フル版（深掘り・アーカイブ）
- **カラー**: サイトカラーベース（#E8DCC6 / #FFD700 / #E74C3C）を読み物向けに調整
- **フォント**: Noto Sans JP（本文）+ Noto Serif JP（見出し/引用）

### 計画ファイル作成
`.claude/plans/functional-fluttering-moth.md` に詳細な実装計画を記述（ユーザー承認済み）

## Key Decisions

| Decision | Rationale |
|----------|-----------|
| 2種類のHTML（リッチ版+フル版）を作る | 公開サイトでは興味を引く入口、会員向けには深掘り用フル版。役割が異なる |
| Type Aのタイトル/はじめに/おわりにをHTML用に再生成する | ep19で発覚した台湾まぜそば問題（カットした内容がタイトルに残る）の根本解決 |
| Type Aでも章構成は100%維持する | 章の欠落（protopia v1の第5章消失）は読者の信頼を損なう |
| フォントはNoto Sans JP + Noto Serif JP | 明朝体全面（ep19のShippori Mincho）は長文で重い。sans本文+serif見出しが最適バランス |
| カラーはサイトの#FFD700→#C4A057に落ち着かせる | ゴールドは目立つがドキュメント読了には強すぎる |
| Type Bから先に実装する | 仕様が明確（100%コンテンツ）。フル版の完成がリッチ版の差分定義にも役立つ |
| Google Fontsを両方で使用する | Type Bもシステムフォントのみでは品質不足。fallbackで自己完結性は維持 |

## Current State
- ブランチ: `main`、working tree clean（.claude/のuntracked以外）、リモートと同期済み
- コミット `26f1c89`: 前セッションのバックエンド整理（変更なし）
- `html-samples/` に6つのHTMLサンプル + 1つのソースMarkdownが配置済み
- `.claude/plans/functional-fluttering-moth.md` に実装計画ファイルが存在（承認済み）
- 前セッションの `.claude/plans/mutable-baking-yeti.md`（自動変換計画）は方針変更により実行しない

## Key Files Modified
- `.claude/plans/functional-fluttering-moth.md` — 新規作成。2種類のテンプレート実装計画

## Lessons Learned
- **HTMLサンプル分析にサブエージェント並列実行が非常に効果的だった**: 4ファイル同時分析で待ち時間を大幅短縮
- **ユーザーとの段階的な対話で方針が明確化した**: 「フル版とは何か」の定義は分析結果を見せながら議論することで自然に導かれた
- **Web版Claudeのポン出し限界をSkillで解消するのがプロジェクトの本質**: テンプレート仕様を固定すれば出力品質が安定する
- **v0ファイルの差し替えに注意**: 初回分析時にv0とv1が同一だったのはユーザーの差し替え前だった。入力確認は重要

## Next Steps
- [ ] **Step 1: Type B テンプレートHTML作成** — Ep12ベースにサイドバーTOC・カラー刷新・フォント変更・オーディオリンク・JS（TOC追従）を追加。Ep12のMarkdownで検証
- [ ] **Step 2: Type B Skill作成** — `~/.claude/skills/metacre-html-full/SKILL.md` を作成。Markdown→HTML変換ロジックを定義
- [ ] **Step 3: Type A テンプレートHTML作成** — ヒーロー・スクロールアニメーション・ダーク註釈・オーディオCTA。Ep19のMarkdownで検証（台湾まぜそば問題の解消確認）
- [ ] **Step 4: Type A Skill作成** — `~/.claude/skills/metacre-html-rich/SKILL.md` を作成。コンテンツ選出ルール・タイトル再生成ロジックを定義

## Blockers / Open Questions
- **フォントの最終確認**: Noto Sans JP + Noto Serif JPで仮決定だが、実物を見てShippori Mincho（引用のみ）への変更もありうる
- **Type Aのアクセントカラー**: セージ(#8B9A7D)/サーモン(#E8A598)をep19から引き継ぐか、サイトのゴールド/レッド系に統一するか。実物を見て判断
- **UI機能の範囲**: 折りたたみ註釈、プログレスバーは「別途検討」のまま。Step 3で判断
- **プロトピアHTMLの扱い**: イベントカラーに合わせた個別対応なので汎用テンプレートとは別。別途Skillが必要か、手動対応でよいか未確定

## User Preferences Noted
- **メタクリドキュメントのHTML化は「完全再現」ではなく「別の成果物」** — Markdownが原典、HTMLは入口や深掘りの手段
- **Markdownは原典として限定メンバー（タムカイ・Opi）のみ参照** — HTML版との突合は制作者だけ
- **HTML版の読者は初見の人が中心** — 俯瞰→音声→深掘りの動線が理想
- **ライト系テーマ、カラーはep19ベースをブラッシュアップ** — ダーク系はプロトピア個別対応のみ
- **明朝体（Shippori Mincho）が本当にいいかは検討中** — 実物を見て判断したい
- **UI部分（折りたたみ、プログレスバー等）は別検討** — テンプレート仕様の中で段階的に決める
- **Web版Claudeのポン出しからSkill化できることにワクワクしている** — 品質の安定化への期待
- **ステップごとにじっくり検討しながら進めたい** — 一気に実装するのではなく段階的に
