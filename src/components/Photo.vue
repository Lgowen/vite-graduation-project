<template>
  <div>
    <img class="photo-img"
         :src="src"
         alt="">
  </div>
</template>

<script>
export default {
  props: {
    src: String
  }
}
</script>

<style lang="scss" scoped>
.photo-img {
  width: 100%;
}
</style>