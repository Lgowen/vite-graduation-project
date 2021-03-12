import { ref, reactive, computed } from "vue"
import { useStore } from "vuex"
import { removeLocalStorage } from "utils/storage"

// 控制路由切换显示激活当前item
export function controlRoute() {
    let activeId = ref('')
    const navListItem = reactive([
        {
          id: "1",
          path: "/",
          name: "首页",
        },
        {
          id: "2",
          path: "/article",
          name: "文章",
        },
        {
          id: "3",
          path: "/archive",
          name: "归档",
        },
        {
          id: "4",
          path: "/project",
          name: "项目",
        },
        {
          id: "5",
          path: "/gallery",
          name: "相册",
        },
        {
          id: "6",
          path: "/message",
          name: "留言",
        },
        {
          id: "7",
          path: "/about",
          name: "关于",
        },
        {
          id: "8",
          path: "/news",
          name: "新闻",
        }
      ])

    const store = useStore()
    const isLogin = computed(() => store.getters.isLogin)

    function routeChange(nowPath) {
        for(const item of navListItem){
            if( item.path === nowPath.path ){
                console.log(nowPath.path)
                activeId.value = item.id
            }
        }
    }

    function quitLogin () {
      removeLocalStorage('token') // 退出登录清除localStorage
      store.commit('changeUserInfo', null) // 清除个人信息
      store.commit('changeLoginStatus', false) // 清除登录状态
    }

    return { activeId, navListItem, isLogin, quitLogin, routeChange }
}