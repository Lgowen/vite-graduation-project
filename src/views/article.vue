<template>
  <div class="markdown">
    <!-- <router-view></router-view> -->
    <div class="content" v-html="state.content"></div>
  </div>
</template>

<script>
import { ref, reactive, onMounted, defineComponent } from "vue"
import { getMarkDown } from "utils/api"
export default defineComponent ({
  name: "article",
  setup() {
    const state = reactive({
      content: null
    })
     onMounted(async () => {
      const { data } = await getMarkDown()
      // console.log(contents)
      state.content = data[0]
      console.log(state.content)
     })

     return { state }
  },
  components: {},
})
</script>

<style lang="scss" scoped>
// .content {
//   >:first-child {
//     width: 1080px;
//     margin: 0 auto;
//   }
// }
</style>
