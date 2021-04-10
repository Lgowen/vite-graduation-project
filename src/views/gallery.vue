<template>
  <div>
    <el-form :model="state.initData" ref="ininForm" label-width="80px" class="top">
      <span>行：</span
      ><el-input
        v-model.number="state.initData.col"
        class="init"
        @keyup.enter="init"
      ></el-input>
      <span>列：</span
      ><el-input
        v-model.number="state.initData.row"
        class="init"
        @keyup.enter="init"
      ></el-input>
      <el-button type="primary" @click="init" style="margin-top: 10px; margin-left: 10px"
        >修改</el-button
      >
    </el-form>
    <div class="container" ref="container">
      <photo-list
        v-for="(source, index) in state.sources"
        :key="index"
        :photoList="source"
      />
    </div>
  </div>
</template>

<script>
import { handlePhotos } from "models/gallery";
import PhotoList from "../components/PhotoList.vue";
import { getScrollTop } from "../utils/utils.js";
import { reactive, onMounted } from "vue";

export default {
  components: {
    PhotoList,
  },
  setup() {
    // const sources = reactive(initSources(3, 10))

    const { initSources } = handlePhotos();

    onMounted(() => {
      console.log(111);
      state.sources = initSources(3, 10);
    });

    const state = reactive({
      initData: {
        col: 3,
        row: 10,
      },
      sources: [],
    });

    function init() {
      state.sources = initSources(state.initData.col, state.initData.row);
    }

    window.addEventListener("scroll", (evt) => {
      const scrollTop = getScrollTop(window);

      // console.log(scrollTop);
      // console.log(document.querySelector('.photo-list').clientHeight);
    });

    return {
      state,
      init,
    };
  },
  unmounted() {},
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.top {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .init {
    width: 200px;
    margin-top: 10px;
  }
}
.container {
  width: fit-content;
  margin: 10px auto;
  display: flex;
  & > * {
    margin: 0 5px;
  }
}
</style>
