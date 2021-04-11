<template>
  <div class="left clearfix">
    <h3 class="left-title">{{ tag_name }} 相关的文章：</h3>
    <ul class="articles-list" id="list">
      <transition-group name="el-fade-in">
        <li v-for="article in articlesList" :key="article._id" class="item">
          <a :href="href + article._id" target="_blank">
            <img
              class="wrap-img img-blur-done"
              :data-src="article.img_url"
              data-has-lazy-src="false"
              src="../../assets/images/logo.jpg"
              alt="文章封面"
            />
            <div class="content">
              <h4 class="title">{{ article.title }}</h4>
              <p class="abstract">{{ article.desc }}</p>
              <!-- <div class="meta">
                <span>查看 {{ article.meta.views }}</span>
                <span>评论 {{ article.meta.comments }}</span>
                <span>赞 {{ article.meta.likes }}</span>
                <span v-if="article.create_time" class="time">
                  {{ formatTime(article.create_time) }}
                </span>
              </div> -->
            </div>
          </a>
        </li>
      </transition-group>
    </ul>
  </div>
</template>

<script>
import { ref, reactive, onMounted, onUnmounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import { loadFn, destroyFn } from "../../utils/utils";
export default {
  name: "articleList",
  setup() {},
  props: ["articlesList"],
  mounted() {
    console.log(this.articlesList);
  },
};
</script>
<style lang="scss" scoped>
.left {
  .articles-list {
    margin: 0;
    padding: 0;
    list-style: none;
    .title {
      color: #333;
      margin: 7px 0 4px;
      display: inherit;
      font-size: 18px;
      font-weight: 700;
      line-height: 1.5;
    }
    .item > div {
      padding-right: 140px;
    }
    .item .wrap-img {
      position: absolute;
      top: 50%;
      margin-top: -50px;
      right: 0;
      width: 125px;
      height: 100px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 4px;
        border: 1px solid #f0f0f0;
      }
    }
    li {
      line-height: 20px;
      position: relative;
      // width: 100%;
      padding: 15px 0px;
      padding-right: 150px;
      border-bottom: 1px solid #f0f0f0;
      word-wrap: break-word;
      cursor: pointer;
      &:hover {
        .title {
          color: #000;
        }
      }
      .abstract {
        min-height: 30px;
        margin: 0 0 8px;
        font-size: 13px;
        line-height: 24px;
        color: #555;
      }
      .meta {
        padding-right: 0 !important;
        font-size: 12px;
        font-weight: 400;
        line-height: 20px;
        a {
          margin-right: 10px;
          color: #b4b4b4;
          &::hover {
            transition: 0.1s ease-in;
            -webkit-transition: 0.1s ease-in;
            -moz-transition: 0.1s ease-in;
            -o-transition: 0.1s ease-in;
            -ms-transition: 0.1s ease-in;
          }
        }
        span {
          margin-right: 10px;
          color: #666;
        }
      }
    }
  }
}
</style>
