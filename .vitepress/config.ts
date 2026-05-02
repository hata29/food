import { defineConfig } from 'vitepress'
import { readdirSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const projectRoot = resolve(__dirname, '..')

function listMarkdown(dir: string) {
  const fullPath = resolve(projectRoot, dir)
  if (!existsSync(fullPath)) return []
  return readdirSync(fullPath)
    .filter((f) => f.endsWith('.md') && f.toLowerCase() !== 'index.md')
    .sort((a, b) => b.localeCompare(a, 'ja'))
    .map((f) => ({
      text: f.replace(/\.md$/, ''),
      link: `/${dir}/${f.replace(/\.md$/, '')}`,
    }))
}

function listMarkdownTree(dir: string) {
  const fullPath = resolve(projectRoot, dir)
  if (!existsSync(fullPath)) return []
  const entries = readdirSync(fullPath, { withFileTypes: true })
  const groups = entries
    .filter((e) => e.isDirectory())
    .sort((a, b) => a.name.localeCompare(b.name, 'ja'))
    .map((e) => ({
      text: e.name,
      collapsed: false,
      items: listMarkdown(`${dir}/${e.name}`),
    }))
    .filter((g) => g.items.length > 0)
  const flat = listMarkdown(dir)
  return [...groups, ...flat]
}

function restaurantsSection() {
  const tree = listMarkdownTree('restaurants')
  return tree.length > 0
    ? { text: '🍜 外食リスト', collapsed: false, items: tree }
    : { text: '🍜 外食リスト', link: '/restaurants/' }
}

export default defineConfig({
  title: "Manami's Recipe Kit",
  description: '自炊レシピ・週次メニュー（献立＋買い物リスト統合）',
  lang: 'ja-JP',
  base: process.env.BASE_PATH || '/',
  cleanUrls: true,
  lastUpdated: true,
  ignoreDeadLinks: true,
  srcExclude: ['CLAUDE.md', 'README.md', 'SETUP.md', '.handover.md', '**/node_modules/**'],

  themeConfig: {
    nav: [
      { text: 'レシピ', link: '/recipes/' },
      { text: '外食', link: '/restaurants/' },
      { text: '週次', link: '/weekly/' },
    ],

    sidebar: [
      {
        text: '🍳 レシピ',
        collapsed: false,
        items: listMarkdown('recipes'),
      },
      restaurantsSection(),
      {
        text: '📅 週次メニュー',
        collapsed: false,
        items: listMarkdown('weekly'),
      },
      {
        text: '📚 参考レシピ',
        collapsed: true,
        items: listMarkdown('references'),
      },
      {
        text: '📥 メモ・アイデア',
        collapsed: true,
        items: listMarkdown('inbox'),
      },
    ],

    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: { buttonText: '検索', buttonAriaLabel: '検索' },
              modal: {
                noResultsText: '見つかりませんでした',
                resetButtonTitle: 'クリア',
                footer: {
                  selectText: '選択',
                  navigateText: '移動',
                  closeText: '閉じる',
                },
              },
            },
          },
        },
      },
    },

    outline: { label: '目次', level: [2, 3] },
    docFooter: { prev: '前のページ', next: '次のページ' },
    lastUpdatedText: '最終更新',
  },
})
