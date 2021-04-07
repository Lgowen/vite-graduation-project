<template>
  <div>
    <div class="container" ref="container">
      <photo-list v-for="(source, index) in sources" :key="index" :photoList="source" />
    </div>
  </div>
</template>

<script>
import { handlePhotos } from "models/gallery";
import PhotoList from "../components/PhotoList.vue";
import { getScrollTop } from "../utils/utils.js";

export default {
  components: {
    PhotoList,
  },
  setup() {
    // const sources = reactive(initSources(3, 10))

    const { sources } = handlePhotos();

    window.addEventListener("scroll", (evt) => {
      const scrollTop = getScrollTop(window);

      // console.log(scrollTop);
      // console.log(document.querySelector('.photo-list').clientHeight);
    });

    return {
      sources,
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
.container {
  width: fit-content;
  margin: 10px auto;
  display: flex;
  & > * {
    margin: 0 5px;
  }
}
</style>
