# 帰宅後セットアップ手順

外出中にローカルのVitePressサイト構築まで完了済み。残りは「GitHub Pagesに乗せる」と「試運転」だけ。所要時間 約30分。

---

## ✅ 既に完了している作業（外出中に実施）

- [x] `recipes-kit` を `~/projects/life/food` に移動
- [x] `git init` + 初回コミット（ローカルのみ）
- [x] VitePress 導入（`package.json` + `.vitepress/config.ts`）
- [x] サイドバー・トップページ・カテゴリindex.md設定
- [x] ローカルビルド確認（`npm run build` 成功）
- [x] GitHub Actions デプロイワークフロー設置（`.github/workflows/deploy.yml`）

---

## 1. GitHub repo作成 + push（10分）

### 1-1. GitHub CLIで作成（推奨）

```bash
cd ~/projects/life/food

# GitHub CLI 未インストールなら
brew install gh

# 認証（ブラウザ開く）
gh auth login
# → GitHub.com / HTTPS / Login with web browser を選択

# repo作成 + push（publicでOKと言ってたのでpublic）
gh repo create food --public --source=. --remote=origin --push
```

### 1-2. もしくはWebで手動

1. https://github.com/new で新規リポジトリ作成
   - Repository name: `food`
   - Public
   - **READMEなどは追加しない**（既にローカルにあるため）
2. ローカルから push:
   ```bash
   cd ~/projects/life/food
   git remote add origin https://github.com/<YOUR_USERNAME>/food.git
   git push -u origin main
   ```

---

## 2. GitHub Pages有効化 + base pathの設定（5分）

### 2-1. Pagesを有効化

1. GitHub上で `food` リポジトリ → **Settings** → **Pages**
2. Source を **GitHub Actions** に変更（"Deploy from a branch" ではない）

### 2-2. リポジトリ名がデフォルト URL のサブパスになるので、`BASE_PATH` を設定

GitHub Actions 上で `BASE_PATH=/food/` を環境変数として渡す必要がある。

1. リポジトリ → **Settings** → **Secrets and variables** → **Actions**
2. **Variables** タブ → **New repository variable**
3. Name: `BASE_PATH`、Value: `/food/`（前後のスラッシュ忘れずに）
4. Save

> **note**: リポジトリ名を `food` 以外にする場合は `/<repo-name>/` に合わせる。

### 2-3. 再デプロイ

```bash
# 何か小さい変更してpush（例: README更新）でもいいし、
# Actionsタブから "Deploy VitePress site to Pages" を手動実行 (workflow_dispatch) でもOK
gh workflow run deploy.yml
```

完了後、`https://<YOUR_USERNAME>.github.io/food/` にサイトが公開される。
スマホでブックマークしておく。

---

## 3. スマホからの利用準備（5分）

### 3-1. Claude AppでGitHub Connector有効化

1. iOS/AndroidのClaudeアプリ → 設定 → Connectors
2. GitHub を有効化
3. リポジトリアクセス：`food` リポジトリにアクセス許可

### 3-2. 試しに話しかけてみる

スマホClaudeアプリで：
- 「`food` リポジトリの recipes/トマトとピーマンのキーマ.md 見せて」
- 「冷蔵庫になす・ピーマン・ひき肉あるんだけど何作れる？」

> **書き込み（コミット）対応の確認**：上記が動いたら、次に
> 「川本家風つけそうめんに『豚バラ＋オイスターで作ると神』ってメモ追記して、コミットまでして」
> を試す。**書き込み権限が無いと "コミットできません" 系のエラーが出る**。その場合は読み取り専用運用となり、書き込みはPC側で行う形になる。

---

## 4. 試運転：W19献立生成（10分）

PC で：

```bash
cd ~/projects/life/food
claude
```

Claudeに：
> 「今週の献立組んで」

期待される動き（CLAUDE.md通りに動けば）：
1. **食数を聞いてくる**（平日夜・平日昼・休日それぞれ）
2. 食数を答えると、recipes/から候補を選びつつ食材使い切り重視で組む
3. `meal-plans/2026-W19.md` と `shopping-lists/2026-W19.md` を生成
4. コミット&push（GitHub Actionsが自動デプロイ）

期待通り動かない場合は CLAUDE.md のルール文面を直す。

---

## トラブルシュート

### `npm install` が EPERM エラー
キャッシュ権限問題。代替キャッシュで回避：
```bash
npm install --cache "$TMPDIR/npm-cache"
```
恒久対応するなら：
```bash
sudo chown -R $(id -u):$(id -g) ~/.npm
```

### GitHub Pages のサイトでCSS/JSが404
`BASE_PATH` 設定漏れ。Settings → Variables で確認。

### サイドバーに新しいレシピが出ない
ビルドが古い。pushすると自動デプロイ走る。手動なら：
```bash
npm run build
```

---

## メンテ

- レシピ追加：`recipes/<料理名>.md` を作って push（CLAUDE.mdのフォーマット参照）
- 献立作成：「今週の献立組んで」とClaude（PC/スマホ）に話しかける
- 不要なら：`gh repo delete food` で消せる
