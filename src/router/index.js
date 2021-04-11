import { createRouter, createWebHistory } from 'vue-router'
import { startLoading, endLoading } from 'utils/loading'
import store from '../store'
import { ElMessage } from 'element-plus'
import algorithm from 'markdown/algorithm.md'
// import array from 'markdown/array.md'
// import day from 'markdown/day.md'



// 1. 定义路由组件， 注意，这里一定要使用 文件的全名（包含文件后缀名）
import { h } from 'vue'
import Markdown from 'comps/MarkDown.vue'
const md = (string) => h(Markdown, { content: string, key: string })


const routes = [
  {
    path: '/',
    component: () => import('../views/index.vue'), // 路由懒加载
  },
  {
    path: '/login',
    component: () => import('comps/login/login.vue'), // 路由懒加载
  },
  {
    path: '/register',
    component: () => import('comps/register/register.vue'), // 路由懒加载
  },
  {
    path: '/update',
    component: () => import('../views/resetPassword.vue')
  },
  {
    path: '/music',
    component: () => import('../views/music.vue')
  },
  {
    path: '/news',
    component: () => import('comps/news/news.vue'), // 路由懒加载
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
    path: "/gallery",
    component: () => import('../views/gallery.vue')
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
    path: "/code",
    component: () => import('../views/code.vue')
  },
  {
    path: "/demo",
    component: () => import('../views/demo.vue')
  },
  {
    path: "/article",
    component: () => import('../views/article.vue'),
    children: [
      { path: "algorithm", component: () => md(import('markdown/algorithm.md')) }
      // { path: "array", component: () => import('markdown/array.md') },
      // { path: "day", component: () => import('markdown/day.md') }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})


router.beforeEach((to, from) => {
  const { isLogin } = store.state
  console.log(isLogin)
  if (to.path === '/message') {
    console.log(isLogin)
    if (!isLogin) {
      ElMessage.error("请先登录")
      router.push('/login')
    }
  }
  startLoading() // 结束 Progress
})

router.afterEach(() => {
  endLoading() // 结束 Progress
})


export default router

