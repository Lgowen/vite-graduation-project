<template>
  <div>
    <!-- <img class="photo-img"
         :src="src"
         alt=""> -->
    <el-image class="photo-img" :src="photoInfo.url" alt="" lazy>
      <template #placeholder>
        <div class="square" :style="style">
            <div class="loading-css"></div>
        </div>
      </template>
    </el-image>
  </div>
</template>

<script>
import { computed } from 'vue'
export default {
  props: {
    photoInfo: Object
  },
  setup(props) {
    const style = computed( () => {
      return {
        width: '400px',
        height: ( 400 / props.photoInfo.width ) * props.photoInfo.height + 'px'
      }
    })

    return { style }
  }
};
</script>

<style lang="scss" scoped>
@keyframes loading-360 {
    0% {
        transform: rotate(0deg); /*动画起始的时候旋转了0度*/
    }
    100% {
        transform: rotate(360deg); /*动画结束的时候旋转了360度*/
    }
}
.photo-img {
  width: 100%;
}
.square {
  display: flex;
  justify-content: center;
  align-items: center;
  .loading-css {
    width: 50px;
    height: 50px;
    display: inline-block; /*将loading区域变成行内元素，防止旋转的时候，100%宽度都在旋转*/
    border: 3px solid #f3f3f3; /*设置四周边框大小，并将颜色设置为浅白色*/
    border-top: 3px solid red; /*将上边框颜色设置为红色高亮，以便旋转的时候能够看到旋转的效果*/
    border-radius: 50%; /*将边框和内容区域都变成圆形*/
    animation: loading-360 0.8s infinite linear; /*给圆环添加旋转360度的动画，并且是无限次*/
  }
}
</style>
