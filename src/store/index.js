// import { createStore } from 'vuex'

// const files = require.context('./modules', false, /\.js$/),
//     modules = {}

// files.keys().forEach((key) => {
//     modules[key.replace(/\.\/|\.js/g, '')] = files(key).default
// })
// // 导入所有 vuex 模块，自动加入namespaced:true，用于解决vuex命名冲突
// Object.keys(modules).forEach(key => {
//     modules[key]['namespaced'] = true
// })

// export default createStore({
//     modules
// })

import { createStore } from 'vuex'

export default createStore({
    state: {
        isHomePage: false,
        userInfo: null,
        isLogin: false
    },
    getters: {
        isHomePage: state => state.isHomePage,
        isLogin: state => state.isLogin
    },
    mutations: {
        changeHomePage(state, isHomePage){ // 判断是否主页
            state.isHomePage = isHomePage
        },
        changeLoginStatus(state, isLogin) {
            state.isLogin = isLogin
        }
    },
    actions: {
        
    }
})