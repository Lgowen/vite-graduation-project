<template>
  <div class="markdown">
    <!-- <router-view></router-view> -->
    <el-upload
      class="upload-demo"
      drag
      action="http://localhost:9527/api/img"
      multiple
      name="test"
      :on-success="uploadSuccess"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <template #tip>
        <div class="el-upload__tip">只能上传md文件</div>
      </template>
    </el-upload>
    <el-card class="box-card" style="box-shadow: 0 4px 12px 12px rgb(7 17 27 / 15%)">
      <template #header style="min-height: 1334px">
        <div class="card-header">
          <span>文章列表</span>
        </div>
      </template>
      <el-collapse v-model="activeNames" @change="handleChange" accordion>
        <el-collapse-item
          :title="item.title"
          :name="index + ''"
          v-for="(item, index) in state.newData"
          :key="item"
          v-loading="state.loading"
        >
          <div
            class="content"
            v-html="item.content"
            :key="item.content"
            style="background-color: #f4f5f5"
          ></div>
        </el-collapse-item>
      </el-collapse>
    </el-card>

    <!-- <Info :articlesList="state.newData" /> -->
  </div>
</template>

<script>
import { ref, reactive, onMounted, defineComponent } from "vue";
import { getMarkDown } from "utils/api";
import Info from "../components/article-component/articleList.vue";
export default defineComponent({
  name: "article",
  setup() {
    const state = reactive({
      content: null,
      newData: null,
      loading: false,
    });

    function uploadSuccess(response, file, fileList) {
      console.log("上传成功");
      getMd();
    }

    async function getMd() {
      state.loading = true;
      const { data } = await getMarkDown();
      state.loading = false;
      // console.log(contents)
      state.content = data;
      const newData = data.map((item) => {
        const start = item.indexOf('"') + 1;
        const end = item.indexOf('"', start);
        const str = item.substring(start, end);
        console.log(start, end, str);
        const content = item;
        return (item = {
          title: str,
          content,
        });
      });
      state.newData = newData;
      console.log(newData);
      const card = document.getElementsByClassName("el-card")[0];
      console.log(card);
      card.style.minHeight = "657px";
    }
    onMounted(() => {
      getMd();
    });

    return { state, uploadSuccess };
  },
  data() {
    return {
      activeNames: "",
    };
  },
  methods: {
    handleChange(val) {
      console.log(val);
    },
  },
  components: {
    Info,
  },
});
</script>

<style lang="scss" scoped>
.upload-demo {
  width: 1000px;
  text-align: center;
  margin: 0 auto;
}
.box-card {
  margin-top: 1px;
  width: 100%;
  font-weight: bold;
  .el-card {
    min-height: 657px;
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
}

.el-collapse-item__header {
  font-weight: bold;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}
</style>
