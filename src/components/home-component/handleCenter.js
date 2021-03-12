import { reactive } from 'vue'

export function handleCenter() {

    const navgation = reactive([
        { name: 'Login', icon: 'iconfont icon-touxiang', path: '/login'},
       {
         name: 'Article-List',
         icon: 'iconfont icon-wenzhang',
         path: '/article',
       },
       { name: 'Demo', icon: 'iconfont icon-anli', path: '/demo'},
       {
         name: 'LeaveMessage',
         icon: 'iconfont icon-liuyan2',
         path: '/message',
       },
       { name: 'Photos', icon: 'iconfont icon-xiangce', path: '/gallery'},
       {
         name: 'Github',
         icon: 'iconfont icon-GitHub',
         path: 'https://github.com/Lgowen',
       },
     ])

     const triggerPage = (path, router) => {
       path === 'https://github.com/Lgowen' ? window.open(path) : router.push(path)
     }

     return { navgation, triggerPage }
}