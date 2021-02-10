<template>
   <div class="container">
      <Nav v-if="isHomePage"></Nav>
      <router-view></router-view>
   </div>
</template>

<script>
import Nav from "./components/nav-component/nav.vue";
import Index from "./views/index.vue"
import { ref, reactive, computed, watch } from "vue"
import { useRoute, useRouter } from 'vue-router'
import { useStore, mapState } from "vuex"
// import removeStudent from '../src/student/removeStu'
// import addStudent from '../src/student/addStu'

export default {
  name: "App",
  // // 组合API的入口函数
  setup() {
    // ref函数只适用于简单数据类型
    // reactive适用于复杂数据类型
    // let {state, deleteStu} = removeStudent()
    // let {state2, addStu} = addStudent(state)
    const store = useStore()
    const ruote = useRoute()
    const isHomePage = computed( () => store.state.isHomePage )
    // console.log(store.state.isHomePage)
    // isHomePage = computed( () => store.state.isHomePage )

    const changeHomePage = isHomePage => store.commit('changeHomePage', isHomePage)
    watch(ruote, ( { path } ) => {
        path === '/' ? changeHomePage(false) : changeHomePage(true)
    })
    // console.log(isHomePage)
    return { isHomePage }
  },
  components: {
    Index,
    Nav,
  },
};

// 抽取学生数据和相关业务逻辑
</script>

<style lang="scss">
    .container{
      min-width: 1200px;
      height: 100%;
      margin: 0 auto
    }
</style>
