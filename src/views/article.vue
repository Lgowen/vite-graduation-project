<template>
  <div class="markdown">
    <!-- <router-view></router-view> -->
    <el-upload
      class="upload-demo"
      drag
      action="https://jsonplaceholder.typicode.com/posts/"
      multiple
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <template #tip>
        <div class="el-upload__tip">只能上传 jpg/png 文件，且不超过 500kb</div>
      </template>
    </el-upload>
    <!-- <div class="content" v-html="state.content"></div> -->
  </div>
</template>

<script>
import { ref, reactive, onMounted, defineComponent } from "vue";
import { getMarkDown } from "utils/api";
export default defineComponent({
  name: "article",
  setup() {
    const state = reactive({
      content: null,
    });
    onMounted(async () => {
      const { data } = await getMarkDown();
      // console.log(contents)
      state.content = data[0];
      console.log(state.content);
    });

    return { state };
  },
  components: {},
});
</script>

<style lang="scss" scoped>
// .content {
//   >:first-child {
//     width: 1080px;
//     margin: 0 auto;
//   }
// }
</style>
