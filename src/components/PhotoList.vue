<template>
  <div class="photo-list">
    <Photo v-for="(photoInfo,index) in photoList"
           :key="index"
           :photoInfo="photoInfo" />
  </div>
</template>

<script>
import Photo from './Photo.vue'

export default {
  props: {
    photoList: Array
  },
  components: {
    Photo
  }
}
</script>

<style lang="scss" scoped>
.photo-list {
  width: 400px;
}
</style>