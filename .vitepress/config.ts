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

export default defineConfig({
  title: "Manami's Recipe Kit",
  description: '自炊レシピ・週次献立・買い物リスト',
  lang: 'ja-JP',
  base: process.env.BASE_PATH || '/',
  cleanUrls: true,
  lastUpdated: true,
  ignoreDeadLinks: true,
  srcExclude: ['CLAUDE.md', 'README.md', 'SETUP.md', '**/node_modules/**'],

  themeConfig: {
    nav: [
      { text: 'レシピ', link: '/recipes/' },
      { text: '献立', link: '/meal-plans/' },
      { text: '買い物リスト', link: '/shopping-lists/' },
    ],

    sidebar: [
      {
        text: '🍳 レシピ',
        collapsed: false,
        items: listMarkdown('recipes'),
      },
      {
        text: '📅 週次献立',
        collapsed: false,
        items: listMarkdown('meal-plans'),
      },
      {
        text: '🛒 買い物リスト',
        collapsed: false,
        items: listMarkdown('shopping-lists'),
      },
      {
        text: '📚 参考レシピ',
        collapsed: true,
        items: listMarkdown('references'),
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
