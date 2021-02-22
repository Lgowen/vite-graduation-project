<template>
  <div>
    <div class="container"
         ref="container">
      <photo-list v-for="(source,index) in sources"
                  :key="index"
                  :photoList="source" />
    </div>
  </div>
</template>

<script>
import { handlePhotos } from "models/gallery"
import PhotoList from '../components/PhotoList.vue'
import { getScrollTop } from '../utils/utils.js'

export default {
  components: {
    PhotoList
  },
  setup () {
    // const sources = reactive(initSources(3, 10))

    const { sources } = handlePhotos()

    window.addEventListener('scroll', evt => {
      const scrollTop = getScrollTop(window)

      // console.log(scrollTop);
      // console.log(document.querySelector('.photo-list').clientHeight);
    })

    return {
      sources
    }
  },
  unmounted () {

  },
  methods: {
    // sources () {
    //   const sources = []
    //   let count = 10
    //   while (count--) sources.push(getRandomPic())
    //   return sources
    // }
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