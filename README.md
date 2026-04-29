# 🍳 Manami's Recipe Kit

Manamiの個人レシピ管理リポジトリ。Claude（PC・スマホ両方）と連携して、レシピ追加・更新・週次献立生成を行う。

## クイックスタート

### スマホから使う
ClaudeアプリでGitHub Connector有効化済みなら、以下のように話しかけるだけ：

- 「このURLのレシピ整形してrecipesに保存して: [URL]」
- 「つけそうめんに『豚バラ＋オイスターで作ると神』ってメモ追記して」
- 「今週の献立組んで、買い物リストも」
- 「冷蔵庫になす・ピーマン・ひき肉あるんだけど何作れる？」

### PCから使う（Claude Code）
```bash
cd ~/projects/recipes-kit  # またはclone先
claude
```
あとはチャット同様。

## ディレクトリ

- `recipes/` - 完成レシピ
- `meal-plans/` - 週ごとの献立
- `shopping-lists/` - 週ごとの買い物リスト
- `inbox/` - URL投げ込み用
- `references/` - 参考レシピメモ

詳細な運用ルールは `CLAUDE.md` 参照。
