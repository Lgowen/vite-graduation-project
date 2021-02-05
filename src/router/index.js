import { createRouter, createWebHashHistory } from 'vue-router'
import algorithm from 'markdown/algorithm.md'



// 1. 定义路由组件， 注意，这里一定要使用 文件的全名（包含文件后缀名）
import { h } from 'vue'
import Markdown from 'comps/MarkDown.vue'
const md = (string) => h(Markdown, { content: string, key: string })
// const md = path => h(
//   Markdown,
//   {
//     path, key: path
//   }
// )

const routes = [
  {
    path: '/',
    component: () => import('../views/index.vue'), // 路由懒加载
  },
  {
    path: "/archive",
    component: () => import('../views/archive.vue')
  },
  {
    path: "/project",
    component: () => import('../views/project.vue')
  },
  {
    path: "/timeline",
    component: () => import('../views/timeline.vue')
  },
  {
    path: "/message",
    component: () => import('../views/message.vue')
  },
  {
    path: "/about",
    component: () => import('../views/about.vue')
  },
  {
    path: "/article",
    component: () => import('../views/article.vue'),
    children: [
      { path: "algorithm", component: () => import('../markdown/algorithm.md') },
      { path: "array", component: () => import('../markdown/array.md') },
      { path: "day", component: () => import('../markdown/day.md') }
    ],
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

