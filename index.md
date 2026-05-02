---
layout: home

hero:
  name: "Manami's Recipe Kit"
  tagline: 自炊レシピ・週次メニュー
  actions:
    - theme: brand
      text: レシピ一覧
      link: /recipes/
    - theme: alt
      text: 今週のメニュー
      link: /weekly/

features:
  - icon: 🍳
    title: レシピ集
    details: ガツン系・りゅうじ系・15分以内が中心。作って美味しかった気づきを蓄積。
    link: /recipes/
  - icon: 📅
    title: 週次メニュー
    details: 1ページに献立・仕込み・買い物リスト・翌週繰越をまとめて掲載。
    link: /weekly/
  - icon: 🛒
    title: 食材使い切り
    details: 半端食材は警告表示。使い切れない分は翌週繰越に明示して持ち越す。
    link: /weekly/
---

## 使い方

### スマホから（閲覧・相談）
Claudeアプリ または スマホブラウザの claude.ai（GitHub Connector経由）：

- 「ペペロンのレシピ見せて」
- 「冷蔵庫に大葉・しらす・ベーコンあるけど何作れる？」
- 「今週の献立どうなってる？」

または、このVitePressサイトをホーム画面に追加してサクッと閲覧。

> 書き込み（追加・更新・コミット）はPC側で。ClaudeモバイルアプリとWeb版のGitHub Connectorは現状コミット未対応のため。

### PCから（書き込み全般）
```bash
cd ~/projects/life/food
claude
```

レシピ追加、メモ追記、献立組成、コミット&pushまで一気通貫。詳細な運用ルールは CLAUDE.md 参照。
