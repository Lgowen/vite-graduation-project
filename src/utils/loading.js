import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

//配置进度条参数
NProgress.configure({ showSpinner: false, minimum: 0.2, easeing: 'swing', speed: 1000, trickleRate: 0.2 })

//防止多次请求进度条重复加载
let loadingNum = 0
export const startLoading = function () {
    if (loadingNum == 0) {
        NProgress.start()
      }
      loadingNum++
}

export const endLoading = function () {
    loadingNum--
  if (loadingNum <= 0) {
    NProgress.done()
  }
}

