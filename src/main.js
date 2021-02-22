import { createApp } from 'vue'
import App from '@/App.vue'
import router from "router"
import store from "store"
// import './assets/css/reset.css'
import 'assets/css/vue.scss'
// 图标文件
import 'element-plus/lib/theme-chalk/index.css'
import 'assets/iconfont/iconfont.css'
import 'assets/iconfont2/iconfont.css'
import 'assets/iconfont3/iconfont.css'
import 'assets/iconfont4/iconfont.css'
import 'assets/iconfont5/iconfont.css'
// import 'github-markdown-css'
// import './assets/css/vue.css'
// import 'vite-plugin-vuedoc/style.css'
import { ElButton, ElRow, ElCol, ElMenu, ElMenuItem, ElForm, ElInput, ElFormItem, ElRadioGroup, ElRadio, ElMessage, ElPagination, ElImage } from 'element-plus'


const vue = createApp(App)

//还是在main.js中注册你想注册的东西比如：
// vue.config.globalProperties.hello = () => {
//     console.log("hello,world")
// }
//然后在vue文件中通过getCurrentInstance解构出appContext进行获取比如：
// let {appContext} = getCurrentInstance()
// let {hello} = appContext.config.globalProperties
// hello()
//这样在开发环境下和生产环境下都打印出了hello,world

vue.use(ElButton)
.use(ElRow).use(ElCol)
.use(ElMenu).use(ElMenuItem)
.use(ElForm).use(ElInput)
.use(ElFormItem).use(ElRadioGroup)
.use(ElRadio).use(ElMessage)
.use(ElPagination).use(ElImage)
vue.use(router).use(store).mount("#app")

