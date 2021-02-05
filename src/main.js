import { createApp } from 'vue'
import App from '@/App.vue'
import router from "@/router"
import store from "@/store"
import './assets/css/reset.css'
// 图标文件
import './assets/iconfont/iconfont.css'
import './assets/iconfont2/iconfont.css'
import './assets/iconfont3/iconfont.css'
import './assets/iconfont4/iconfont.css'
import './assets/iconfont5/iconfont.css'
import 'vite-plugin-vuedoc/style.css'
import { ElButton, ElRow, ElCol, ElMenu, ElMenuItem } from 'element-plus'


const vue = createApp(App)
vue.use(router).use(store).mount("#app")

