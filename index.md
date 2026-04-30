---
layout: home

hero:
  name: "Manami's Recipe Kit"
  tagline: 自炊レシピ・週次献立・買い物リスト
  actions:
    - theme: brand
      text: レシピ一覧
      link: /recipes/
    - theme: alt
      text: 今週の献立
      link: /meal-plans/

features:
  - icon: 🍳
    title: レシピ集
    details: ガツン系・りゅうじ系・15分以内が中心。作って美味しかった気づきを蓄積。
    link: /recipes/
  - icon: 📅
    title: 週次献立
    details: 食材使い切り最優先で組まれた1週間の献立。
    link: /meal-plans/
  - icon: 🛒
    title: 買い物リスト
    details: 週次献立に紐づく買い物リスト。半端食材は警告表示。
    link: /shopping-lists/
---

## 使い方

### スマホから
ClaudeアプリでGitHub Connector経由：

- 「URLのレシピ整形してrecipesに保存して」
- 「冷蔵庫になす・ピーマン・ひき肉あるんだけど何作れる？」
- 「今週の献立組んで」

### PCから
```bash
cd ~/projects/life/cook
claude
```

詳細な運用ルールは [CLAUDE.md](https://github.com/) 参照。
