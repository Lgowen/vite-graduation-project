<template>
  <div class="photo-list">
    <Photo v-for="(src,index) in sources"
           :key="index"
           :src="src" />
  </div>
</template>

<script>
import Photo from './Photo.vue'

export default {
  props: {
    sources: Array
  },
  components: {
    Photo
  },
  setup () {

  }
}
</script>

<style lang="scss" scoped>
.photo-list {
  width: 400px;
}
</style>