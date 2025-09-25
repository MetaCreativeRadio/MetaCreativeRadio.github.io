# タムカイ、おぴたんのメタクリエイティブラジオ | 公式サイト

## プロジェクト概要
PodcastサイトをGitHub管理に移行し、複数人での協働運営を実現するプロジェクト

## 技術スタック
- 静的HTML/CSS/JavaScript
- GitHub Pages (予定)
- Claude Code による運用支援

## フォルダ構成
```
├── src/
│   ├── index.html           # トップページ
│   ├── episodes/            # 各エピソードページ
│   └── assets/              # CSS/JS/画像
├── templates/               # Claude Code用テンプレート
├── docs/                    # 運用マニュアル
└── README.md               # このファイル
```

## 運用フロー
1. **新エピソード追加**: Claude Codeに「第○話のページ作成」を依頼
2. **Git管理**: プルリクエスト→レビュー→マージ
3. **自動デプロイ**: GitHub Actions (予定)

## 管理者
- tamkai (技術担当)
- おぴたん
- [もう1名]

## 次のステップ
- [ ] Manusサイトからのデータ移行
- [ ] エピソードページテンプレート作成
- [ ] GitHub Actions設定
- [ ] 運用マニュアル作成

---
作成日: 2025-09-21
作成者: tamkai + Claude Code