# MetaCreativeRadio Web - Claude Code 引き継ぎドキュメント

## プロジェクト概要
タムカイ、おぴたんのメタクリエイティブラジオ公式サイト

- **プロジェクト名**: MetaCreativeRadio Web
- **技術スタック**: React + Vite + Tailwind CSS + shadcn/ui
- **目標**: GitHub管理→複数人運営→AI時代のクリエーター発Webサービス
- **運用体制**: 3人協働（tamkai + おぴたん + 1名）

## 現在の実装状況

### ✅ 完了済み機能
1. **基本サイト構築**
   - React + Vite環境構築
   - shadcn/uiコンポーネント導入
   - Tailwind CSS設定
   - ルーティング設定（React Router）

2. **UI/UX改善（2025/09/21完了）**
   - 大里P表記統一（「大里プロデューサー」→「大里P」）
   - プロフィール画像追加・レイアウト改善
   - Producer's Noteセクションのグリッドレイアウト
   - 視認性向上（コントラスト改善）

3. **GitHub Organization & 公開サイト（2025/09/25完了）**
   - GitHub Organization「MetaCreativeRadio」作成
   - リポジトリ移管完了
   - GitHub Pages自動デプロイ設定
   - 公開サイト稼働中: https://metacreativeradio.github.io/
   - RSS エピソード管理システム実装
   - 編集後記システム実装

4. **RSS自動化システム**
   - エピソードRSS自動取得・更新機能
   - 編集後記RSS自動取得・更新機能
   - Spotify個別エピソードURL自動抽出
   - 差分更新機能（重複防止）

5. **基本ページ構成**
   - トップページ（HomePage.jsx）- 最新コンテンツ動的表示
   - Episodes一覧ページ - RSS連携
   - Producer Notesページ - 編集後記一覧
   - 基本レイアウトコンポーネント

### 🚧 次回実装予定
1. **チーム管理体制**
   - おぴたん・大里PをOrganizationに招待
   - 権限設定・役割分担
   - チーム作業フローの確立

2. **大里PのRSS連携**
   - 専用RSS Feed準備完了後の実装
   - 自動更新機能の本格運用

3. **運用マニュアル整備**
   - Claude Code活用チーム運用ガイド
   - エラー対応マニュアル

### 📁 重要なファイル構成
```
MetaCreativeRadioWeb/
├── src/
│   ├── HomePage.jsx          # メインページ
│   ├── pages/                # 各ページコンポーネント
│   ├── components/           # 共通コンポーネント
│   ├── assets/              # 画像・リソース
│   └── App.jsx              # ルートコンポーネント
├── scripts/
│   ├── add-episode.js       # エピソード追加スクリプト
│   └── handover.sh         # 引き継ぎスクリプト
├── templates/               # Claude Code用テンプレート
└── docs/                   # 運用マニュアル
```

## 開発コマンド
```bash
# 開発サーバー起動
npm run dev

# エピソード追加
npm run add-episode

# ビルド
npm run build

# 引き継ぎ
npm run handover
```

## 技術仕様

### 使用技術
- **React 19**: メインフレームワーク
- **Vite**: ビルドツール・開発サーバー
- **Tailwind CSS**: スタイリング
- **shadcn/ui**: UIコンポーネントライブラリ
- **React Router**: ルーティング
- **Lucide React**: アイコン

### 重要な依存関係
- Radix UI（アクセシビリティ対応コンポーネント）
- Framer Motion（アニメーション）
- date-fns（日付処理）

## 運用フロー

### エピソード追加フロー（予定）
1. **コンテンツ準備**: 音声・テキスト・画像
2. **スクリプト実行**: `npm run add-episode`
3. **内容確認**: ローカル環境でプレビュー
4. **Git作業**: コミット→プッシュ→プルリクエスト
5. **自動デプロイ**: GitHub Actions（予定）

### 協働開発フロー
1. **Issue作成**: 作業内容の明確化
2. **ブランチ作成**: feature/episode-xx形式
3. **Claude Code活用**: 「第○話のページ作成」
4. **レビュー**: プルリクエストでコードレビュー
5. **マージ**: main ブランチへ統合

## 現在の課題・制限事項

### 解決済み課題
- ✅ UI/UXの基本改善完了
- ✅ 開発環境の安定化
- ✅ コンポーネント設計の確立

### 未解決課題
- ❌ エピソードデータの動的管理
- ❌ GitHub Pages デプロイ設定
- ❌ 協働ワークフローの運用テスト
- ❌ Manusサイトからのデータ移行

## 次回セッションの優先タスク

### High Priority
1. **エピソード管理システム**: 動的データ実装
2. **add-episodeスクリプト**: 動作確認・改善
3. **GitHub設定**: デプロイ・協働環境準備

### Medium Priority
- Manusデータ移行
- 運用マニュアル作成
- エピソードページテンプレート改善

### Low Priority
- パフォーマンス最適化
- SEO対応
- PWA化検討

## 開発環境

### ローカル開発
- **URL**: http://localhost:5173/
- **ホットリロード**: 有効
- **開発者ツール**: React DevTools推奨

### 必要な環境
- Node.js (最新LTS)
- npm/yarn/pnpm (pnpm推奨)

## 関連リソース

### ディスカッション記録
- [2025/09/21 - UI改善完了](../consultation/discussions/2025-09/21-metacreativeradio-ui-improvements.md)
- [2025/09/21 - GitHub移行戦略](../consultation/discussions/2025-09/21-podcast-github-migration.md)

### 外部リンク
- 公式サイト: https://metacreativeradio.github.io/
- GitHub Organization: https://github.com/MetaCreativeRadio
- GitHub Repository: https://github.com/MetaCreativeRadio/MetaCreativeRadio.github.io
- 旧Manusサイト: https://j6h5i7cg8op1.manus.space/

## 検証済み機能
✅ React アプリケーション動作
✅ Tailwind CSS スタイリング
✅ React Router ナビゲーション
✅ レスポンシブデザイン
✅ プロフィール画像表示
✅ Producer's Note レイアウト

## 📊 自動化スケジュール

### RSS自動更新
- **エピソード更新**: 毎週月曜 9:30 JST（Spotify RSS + Apple Podcasts URL自動取得）
- **編集後記更新**: 毎日 12:00 JST
- **手動実行**: GitHub Actions画面からワンクリック実行可能

### 次回自動実行予定
- **次回エピソード更新**: 2025年10月13日（月）9:30
- **次回編集後記チェック**: 2025年10月7日（火）12:00

## 🔧 重要なコマンド

### 手動更新（緊急時）
```bash
# エピソードのみ更新
npm run update-episodes

# Apple Podcasts URL更新
npm run update-apple-urls

# 編集後記のみ更新
npm run update-editorial

# サイトに反映
git add . && git commit -m "Manual update" && git push
```

### 開発・運用
```bash
# 開発サーバー起動
npm run dev

# ビルド
npm run build

# 引き継ぎスクリプト
npm run handover
```

---
**更新日**: 2025-10-16
**最終更新**: 第4話追加（Spotify/Apple/Amazon全対応）・自動化システム安定稼働確認
**作成者**: tamkai + Claude Code

## 🎯 本日完了した追加機能（2025-09-29）

### ✅ RSS自動更新システム完成
1. **GitHub Actions自動化**
   - 毎週月曜9:15 JST：エピソード自動更新
   - 毎日12:00 JST：編集後記自動チェック
   - 手動実行も可能（GitHub Actions画面から）

2. **第2話完全対応**
   - タイトル：「つくる」を振り返ってみつけた、速さと楽しさの変化
   - Apple Podcasts URL追加
   - Amazon Music URL追加
   - 全プラットフォーム対応完了

### ✅ UI/UX改善
1. **質問・リクエストフォーム最適化**
   - hover bounce効果削除（テキスト入力しやすく）
   - Formspree統合完了（Form ID: movkeevv）
   - 完全機能するお問い合わせシステム

2. **Host Profiles強化**
   - opiのTwitter/Xリンク追加（https://x.com/opi）
   - tamkaiのTwitter/Xリンク追加（https://x.com/tamkai）
   - クリックで新しいタブで開く

### 🎯 次回セッションでやること

### High Priority（必須）
1. **チームメンバー招待**
   - おぴたん・大里PをGitHub Organizationに招待
   - 権限設定（Admin/Write権限）
   - 初回チーム作業テスト

2. **運用マニュアル作成**
   - Claude Code活用ガイド作成
   - よくあるエラー対応集
   - 日常的な更新手順（自動化完了により簡素化）

### Medium Priority（推奨）
- サイトデザイン調整・改善
- SEO対策検討
- YouTube動画対応検討

## 🎯 本日完了した作業（2025-10-02）

### ✅ 大里P情報更新
- **経歴説明の修正**: 「元大手出版社から大手SaaS」→「出版社・デジタルエージェンシーを経て事業会社」
- **表記統一**: 「NOTE」→「note」に修正
- **ファイル**: src/HomePage.jsx:247

### ✅ RSS自動更新バグ修正 🐛
**問題**: 毎日12時のRSS自動更新が動作せず、編集後記が自動反映されない

**修正内容**:
1. GitHub Actionsワークフロー修正
   - `git add data/` → `git add data/ public/data/`
   - update-rssジョブに`outputs`定義を追加
2. 編集後記第2話を手動取得・追加
   - タイトル: 「【メタクリラジオ編集後記】2.「つくる」を振り返ってみつけた、速さと楽しさの変化」
   - 公開日: 2025-10-01

**結果**: 次回から自動更新が正常動作

### 🎉 2025-09-29 追加完了機能
- ✅ **RSS完全自動化**: GitHub Actions週次・日次スケジュール実装
- ✅ **第2話完全対応**: 全プラットフォームURL設定完了
- ✅ **Formspree統合**: 完全機能するお問い合わせフォーム
- ✅ **Host Profiles強化**: Twitter/X直接リンク機能
- ✅ **UI改善**: テキスト入力最適化（hover効果削除）

### 累積完了機能 🎉
- ✅ GitHub Organization「MetaCreativeRadio」設立
- ✅ 公開サイト完成: https://metacreativeradio.github.io/
- ✅ RSS自動化システム完成
- ✅ GitHub Actions自動デプロイ成功
- ✅ チーム協働体制の土台完成
- ✅ モバイル表示最適化完了
- ✅ Favicon設定・表示問題解決
- ✅ Apple Podcasts URL追加（第1話）
- ✅ Spotifyボタン優先表示
- ✅ 大里P公式RSS Feed運用開始
- ✅ **レスポンシブ対応**: スマホ横スクロール問題解決、PC表示維持
- ✅ **Favicon完全対応**: ブラウザ互換性向上、GitHub Pages表示確認
- ✅ **プラットフォーム最適化**: Spotify優先、Apple Podcasts追加
- ✅ **RSS完全自動化**: 大里P編集後記の自動更新システム稼働

**🚀 完全自動運用体制が整いました！チーム協働＋完全自動化完了！**

## 🎯 本日完了した作業（2025-10-06）

### ✅ 第3話追加＋RSS更新時刻変更
**問題**: 月曜9:15の自動更新時にRSSがまだ第3話を反映していなかった

**解決**:
1. ✅ 第3話を手動追加
   - タイトル: 「3.「味わい方」が変わってもそこにある、覚悟と不安とエトセトラ」
   - 公開日: 2025-10-06
   - 長さ: 44:14
2. ✅ RSS自動更新時刻を変更
   - 旧: 毎週月曜 9:15 JST
   - 新: **毎週月曜 9:30 JST**（配信後の余裕を確保）

### ✅ Apple Podcasts URL自動取得機能実装 🍎

**新機能**: iTunes Lookup APIを使用した完全自動化

**実装内容**:
1. **新スクリプト**: `scripts/apple-podcast-updater.js`
   - iTunes Lookup APIでエピソード情報取得
   - タイトルマッチングで自動URL追加
   - 正規化処理で確実にマッチング

2. **自動化フロー**（毎週月曜9:30）:
   ```
   ① Spotify RSSから新エピソード取得
   ② Apple Podcasts APIでURL自動取得・追加
   ③ GitHub Pagesに自動デプロイ
   ```

3. **新コマンド**: `npm run update-apple-urls`

4. **既存エピソード対応完了**:
   - 第1話～第3話すべてにApple Podcasts URL自動追加済み

### ✅ Amazon Music URL追加（第3話）
- 手動追加: 第3話にAmazon Music URL設定完了
- **制限事項**: Amazon MusicはAPI制約により手動追加が必要

### 📊 現在の自動化状況

| プラットフォーム | 自動化状況 | 備考 |
|---------------|----------|------|
| Spotify | ✅ 完全自動 | RSS経由で自動取得 |
| Apple Podcasts | ✅ 完全自動 | iTunes API経由で自動取得 |
| Amazon Music | ⚠️ 手動追加 | API制約により手動対応 |
| YouTube | 📝 未対応 | 将来対応予定 |

### 🎉 完了した改善
- ✅ RSS更新タイミング最適化（9:15→9:30）
- ✅ Apple Podcasts完全自動化
- ✅ 第3話全プラットフォーム対応完了
- ✅ エピソード更新プロセスの完全自動化

**🚀 次回から月曜9:30に Spotify + Apple Podcasts が完全自動で追加されます！**

## 🎯 本日完了した作業（2025-10-16）

### ✅ 第4話追加（全プラットフォーム対応完了）

**エピソード情報**:
- **タイトル**: 4.「生活」の中にもある、創造性の発露
- **公開日**: 2025-10-13
- **長さ**: 39:16
- **内容**: 始まったら終わるだけ／お手紙みたいな編集後記／PTAの広報誌／「スマホでGoogleスライド」は厳しい／役割分担と権限委譲／運動会は島を挙げた祭り／「餅まきの餅」の失敗できなさ／検索能力の差／AIを使いこなすには日本語を操る能力が重要／書き直せない手紙のよさ／子育てと創造性の発揮／子どもの性格形成／「生活の中でいちいち本気にならないで」／いいコピー用紙が大量に入っている引き出し／終わらせ方ってむずかしい

**追加したURL**:
1. ✅ **Spotify**: 自動取得済み（RSS経由）
2. ✅ **Apple Podcasts**: 自動取得済み（iTunes API経由）
3. ✅ **Amazon Music**: 手動追加完了
   - URL: https://music.amazon.co.jp/podcasts/0b61adb0-4ff9-40d5-9bd9-88b834536c04/episodes/0c9d8df8-fc82-4fd9-ac1c-206d88e17ae3/4生活の中にもある創造性の発露

### 📊 現在の状況

**公開済みエピソード**: 4話
- 第1話: 全プラットフォーム対応済み ✅
- 第2話: 全プラットフォーム対応済み ✅
- 第3話: 全プラットフォーム対応済み ✅
- 第4話: 全プラットフォーム対応済み ✅（NEW!）

**自動化の動作確認**:
- ✅ Spotify RSS自動取得: 正常動作
- ✅ Apple Podcasts URL自動追加: 正常動作
- ✅ Amazon Music: 手動追加フロー確立

### 🔄 次回更新予定
- **次回エピソード更新**: 2025年10月21日（月）9:30
  - Spotify + Apple Podcasts が完全自動追加
  - Amazon Musicは手動追加が必要

**🎉 完全自動化システムが安定稼働中です！**

## 🎯 本日完了した作業（2025-10-21）

### ⚠️ GitHub Actions自動更新の問題と対応

**問題**: 2025-10-21（月）9:30のGitHub Actions自動実行が動作せず、第5話が自動反映されなかった

**原因分析**:
- GitHub Actionsのcronスケジュールは保証された実行時刻ではない
- 負荷が高い時は遅延・スキップされることがある（特に無料プラン）
- cronスケジュール設定自体は正しい（`30 0 * * 1` = 毎週月曜9:30 JST）
- Spotify RSSには第5話が存在していたが、自動取得されなかった

**実施した対応**:
1. ✅ **第5話を手動追加**
   - タイトル: 5.「ゲーム」なのか人生なのか、嗜好と視点の違い
   - 公開日: 2025-10-20
   - 長さ: 37:40
   - 内容: ヘッドホンへの戸惑い／デスストは本格派おつかいゲー／絶景で流れる音楽がたまらん／「爆笑」のコンテクスト／エンタの神様のほどよいつまらなさ／任天堂育ちはオープンワールドで狼藉の限りを尽くす？／マリオカートは速くなくていい／生理的欲求に忠実すぎる？／理性のゲームと本能のゲーム／スキルの成長を確認するための縛りプレイ／言語によって視点が変わる／BGM選びは難しい／フリー音源の曲紹介やってみた

2. ✅ **全プラットフォームURL追加完了**
   - Spotify: 自動取得済み（RSS経由）
   - Apple Podcasts: 自動取得済み（iTunes API経由）
   - Amazon Music: 手動追加完了

3. ✅ **UI改善: 過去の配信リンクボタン追加**
   - トップページのLatest Episodeセクション下に「過去の配信を見る」ボタンを追加
   - Episodesページへのナビゲーションを改善
   - ファイル: src/HomePage.jsx:147-154

### 📊 更新後の状況

**公開済みエピソード**: 5話（全て全プラットフォーム対応済み）
- 第1話〜第5話: Spotify ✅ / Apple Podcasts ✅ / Amazon Music ✅

### 🔧 今後の推奨運用フロー

**毎週月曜9:45頃の確認作業**:
1. サイトで第○話が表示されているか確認
2. 表示されていない場合は手動実行:
   ```bash
   npm run update-episodes
   npm run update-apple-urls
   git add . && git commit -m "Manual episode update" && git push
   ```
3. Amazon Music URLは常に手動追加が必要

**GitHub Actions実行履歴の確認**:
- URL: https://github.com/MetaCreativeRadio/MetaCreativeRadio.github.io/actions
- スケジュール実行が失敗していないか定期確認

### 💡 将来の改善案（オプション）

1. **通知システム導入**: GitHub Actions失敗時のメール/Slack通知
2. **複数時刻での再試行**: 9:30失敗時、10:00に再実行するバックアップスケジュール
3. **有料プランへのアップグレード**: より確実なスケジュール実行保証

### 🔄 次回更新予定
- **次回エピソード更新**: 2025年10月28日（月）9:30
  - 自動更新の動作を確認
  - 動作しない場合は上記の手動フロー実行

## 🎯 本日完了した作業（2025-10-27）

### ✅ 文字起こし・ナレッジ抽出システムの基盤構築

**プロジェクトの新しい目標**:
1. エピソード音声を文字起こし（transcription）
2. 文字起こしから「メタ的創造性」に関するナレッジを抽出
3. 文字起こしからタイトル・キーワードを生成（Spotify向け詳細文）
4. 論構文（argumentative essays）の生成

### ✅ 実装完了機能

#### 1. **ディレクトリ構造構築**
```
MetaCreativeRadioWeb/
├── audio/              # 音声ファイル（WAV→MP3変換済み）
├── transcripts/        # 文字起こしテキスト
├── knowledge/          # 抽出されたナレッジ（未実装）
├── insights/           # インサイト分析（未実装）
└── prompts/           # プロンプトテンプレート
```

#### 2. **OpenAI Whisper導入（文字起こしシステム）**
- **インストール完了**: `openai-whisper` + `ffmpeg`
- **設定**: 日本語・baseモデル・テキスト出力
- **実績**: 第6話の文字起こし完了（683MB WAV → 1,691行テキスト）
- **コマンド**: `npm run transcribe [エピソード番号]`（※未実装）

#### 3. **タイトル・キーワード生成プロンプト**
- **ファイル**: [prompts/タイトル・キーワード生成.md](prompts/タイトル・キーワード生成.md)
- **内容**:
  - タイトル生成ルール（導入的・問いかけ的な表現、1つのキーワードを「」で囲む）
  - キーワード生成ルール（12〜15個、「／」区切り）
  - 既存5エピソードの参考例
- **実績**: 第6話のタイトル・キーワード生成完了
  - タイトル: 6.主語と視点と言語化と、そして「純子の朝」
  - キーワード: 今週のポエム／大喜利の「おもしろい」と「興味深い」／視点／ヘッドホン／自分視点／客観視点／レンズの効果／FPS／TPS／日本語の主語／「私は」と「僕は」／グラレコ／シウマイ弁当／純子の朝

#### 4. **ストレージ最適化システム（WAV→MP3変換）**
- **問題認識**: 6エピソード（WAV）= 4.2GB → 100エピソードで70GB超
- **解決策実装**: 自動MP3変換スクリプト
  - **スクリプト**: [scripts/convert-to-mp3.sh](scripts/convert-to-mp3.sh)
  - **コマンド**: `npm run convert-to-mp3`
  - **安全設計**: 確認プロンプト付き（誤削除防止）
  - **設定**: 192kbps高品質MP3、自動WAV削除
- **実績**: 全6エピソード変換完了
  - 変換前: 4.2GB（WAV）
  - 変換後: 339MB（MP3）
  - **削減率**: 92%（約12分の1）

### 📊 現在の状況

**音声ファイル管理**:
| エピソード | 形式 | サイズ | ステータス |
|----------|------|--------|----------|
| 第1話 | MP3 | 56MB | ✅ 変換完了 |
| 第2話 | MP3 | 59MB | ✅ 変換完了 |
| 第3話 | MP3 | 61MB | ✅ 変換完了 |
| 第4話 | MP3 | 54MB | ✅ 変換完了 |
| 第5話 | MP3 | 52MB | ✅ 変換完了 |
| 第6話 | MP3 | 57MB | ✅ 変換完了 |

**文字起こし状況**:
- 第6話: ✅ 完了（transcripts/メタクリラジオ_第六回_ver2.txt）
- 第1〜5話: 📝 未実施

**タイトル・キーワード生成**:
- 第6話: ✅ 完了
- 第1〜5話: ✅ 既存（参考例として保存済み）

### 📁 新規作成ファイル

1. **prompts/タイトル・キーワード生成.md**
   - 完全なプロンプトテンプレート
   - 既存5エピソードの参考例

2. **scripts/convert-to-mp3.sh**
   - WAV→MP3自動変換スクリプト
   - 確認プロンプト付き安全設計

3. **audio/MP3_CONVERSION_GUIDE.md**
   - 変換システム使用方法ガイド
   - 容量比較表・トラブルシューティング

4. **transcripts/メタクリラジオ_第六回_ver2.txt**
   - 第6話完全文字起こし（1,691行）

### 🔧 更新されたファイル

1. **package.json**
   - 追加コマンド: `"convert-to-mp3": "bash scripts/convert-to-mp3.sh"`

### 🚧 次回実装予定

1. **文字起こし自動化**
   - 残り5エピソード（第1〜5話）の文字起こし
   - `npm run transcribe [N]` コマンド実装

2. **論構文プロンプト**
   - ユーザーから提供予定のプロンプトテンプレート受領
   - 論構文生成システム実装

3. **ナレッジ抽出システム**
   - 文字起こしから「メタ的創造性」のナレッジを抽出
   - `knowledge/` フォルダへの自動保存

4. **インサイト分析システム**
   - 複数エピソードからの横断的分析
   - `insights/` フォルダへの保存

### 💡 技術的知見

**Whisper使用時の注意点**:
- `ffmpeg` が必須依存関係（`brew install ffmpeg`）
- 日本語の場合は `--language Japanese` 必須
- `--fp16 False` で互換性向上（M1/M2 Macでも動作）
- baseモデルで十分な精度（無料）

**ストレージ最適化**:
- WAV（700MB/episode）→ MP3（55MB/episode）
- 192kbpsで音質と容量のバランス良好
- 100エピソード想定: 70GB → 5.5GB（93%削減）

### 🎯 システム完成時の想定フロー

```
① 音声ファイル配置（audio/フォルダ）
② npm run convert-to-mp3（WAV→MP3変換）
③ npm run transcribe [N]（文字起こし）
④ npm run generate-title [N]（タイトル・キーワード生成）
⑤ npm run extract-knowledge [N]（ナレッジ抽出）
⑥ npm run generate-essay [N]（論構文生成）
```

## 🎯 本日完了した作業（2025-10-28）

### ✅ 論構文作成システム完成

1. **ラジオエピソードからの論構文作成ワークフロー**
   - プロンプト: `prompts/論構文作成プロジェクト指示.txt`
   - スピーカープロフィール完成（Opi & タムカイ）
     - 全6エピソード文字起こし分析完了
     - パーソナリティ分析・話し方・思考パターン抽出
   - バンドル生成: `npm run prepare-essay [N]`
   - 論構文保存: `npm run save-essay [N]`
   - **完成**: 第1話、第2話、第6話のバンドルファイル

2. **リサーチ資料からの論構文作成ワークフロー（NEW!）**
   - プロンプト: `prompts/リサーチ論構文作成指示.txt`
   - 対話篇形式: Opi（理論家役）× タムカイ（実践家役）
   - 完全創作された対話で理論と実践を架橋
   - バンドル生成: `npm run prepare-research "[概念名]"`
   - 論構文保存: `npm run save-research "[概念名]"`
   - **サンプル**: 二重過程理論のリサーチ資料 & バンドル作成完了

### 📁 新規ディレクトリ・ファイル

```
research/                           # リサーチ資料
├── README.md
└── 二重過程理論.md                # サンプル

essay-input/                        # バンドルファイル
├── episode01-bundle.md             # 第1話
├── episode02-bundle.md             # 第2話
├── episode06-bundle.md             # 第6話
└── research-二重過程理論-bundle.md  # リサーチ版

docs/
└── リサーチ論構文作成ガイド.md     # 完全ガイド

prompts/
├── 論構文作成プロジェクト指示.txt          # ラジオ版
└── リサーチ論構文作成指示.txt              # リサーチ版

scripts/
├── prepare-essay.sh                 # ラジオ版バンドル生成
├── save-essay.sh                    # ラジオ版保存
├── prepare-research-essay.sh        # リサーチ版バンドル生成
└── save-research-essay.sh           # リサーチ版保存
```

### 🎯 論構文作成の2つのワークフロー

#### 1. ラジオエピソードから（実際の対話ベース）

```bash
# バンドル準備
npm run prepare-essay 1

# Web版Claudeで生成後、保存
npm run save-essay 1
```

#### 2. リサーチ資料から（対話を創作）

```bash
# リサーチ資料作成
vim research/[概念名].md

# バンドル準備
npm run prepare-research "[概念名]"

# Web版Claudeで生成後、保存
npm run save-research "[概念名]"
```

### 📚 詳細ドキュメント

- [リサーチ論構文作成ガイド](docs/リサーチ論構文作成ガイド.md)
- [research/README.md](research/README.md)

---
**更新日**: 2025-10-28
**最終更新**: 論構文作成システム完成（ラジオ版 + リサーチ版）・スピーカープロフィール完全分析完了
**作成者**: tamkai + Claude Code