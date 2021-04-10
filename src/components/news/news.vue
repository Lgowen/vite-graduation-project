<template>
  <div class="newslist" v-loading="loading">
    <div class="container">
      <div
        class="news-item-normal"
        v-for="newsItem in page.newsList"
        :key="newsItem.title"
      >
        <div class="words">
          <h2 class="title">
            <a :href="newsItem.link" target="_blank">{{ newsItem.title }}</a>
          </h2>
          <div class="aside">
            <span>{{ newsItem.channel }}</span>
            <span>发布日期:{{ newsItem.pubDate }}</span>
          </div>
          <div class="content">{{ newsItem.content }}</div>
        </div>
      </div>
    </div>
    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.query.currentPage"
        :page-sizes="page.pageSizes"
        :page-size="page.query.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { handleNews } from "./handleNews";
import { defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  name: "news",
  setup() {
    const { page, handleCurrentChange, handleSizeChange, handleGetNews } = handleNews();
    let loading = ref(false);
    onMounted(async () => {
      loading.value = true;
      console.log(loading);
      const { datas, total } = await handleGetNews();
      loading.value = false;
      console.log(loading);
      page.newsList = datas;
      page.total = total;
    });

    return { loading, page, handleCurrentChange, handleSizeChange };
  },
});
</script>

<style lang="scss" scoped>
.newslist {
  width: 1080px;
  margin: 0 auto;
  overflow: hidden;
  .container {
    min-height: 1000px;
    .news-item-normal {
      border-bottom: 1px solid #ccc;
      overflow: hidden;
      padding: 20px 0;
      .title {
        font-size: 1.5em;
      }
      .aside {
        font-size: 14px;
        color: #888;
        span {
          margin-right: 15px;
        }
      }
      .content {
        max-height: 100px;
        overflow: hidden;
        line-height: 2;
        font-size: 16px;
      }
    }
  }
  .pagination {
    text-align: center;
    margin-top: 30px;
  }
}
</style>
