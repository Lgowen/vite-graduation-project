<template>
  <div>
    <div class="container"
         ref="container">
      <photo-list v-for="(source,index) in sources"
                  :key="index"
                  :sources="source" />
    </div>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import PhotoList from '../components/PhotoList.vue'
import { getRandomPic, getScrollTop } from '../utils/utils.js'

const initSources = (cols, initCount) => {
  const sources = []
  while (cols--) {
    let count = initCount
    const col = []
    while (count--) col.push(getRandomPic())
    sources.push(col)
  }
  return sources
}


export default {
  components: {
    PhotoList
  },
  setup () {
    const sources = reactive({})
    window.addEventListener('scroll', evt => {
      const scrollTop = getScrollTop(window)

      console.log(scrollTop);
      console.log(document.querySelector('.photo-list').clientHeight);
    })

    return {
      sources: initSources(3, 10)
    }
  },
  unmounted () {

  },
  methods: {
    sources () {
      const sources = []
      let count = 10
      while (count--) sources.push(getRandomPic())
      return sources
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: fit-content;
  margin: 10px auto;
  display: flex;
  & > * {
    margin: 0 5px;
  }
}
</style>