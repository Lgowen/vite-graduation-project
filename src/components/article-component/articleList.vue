<template>
  <div class="left clearfix">
    <h3 v-if="params.tag_id"
        class="left-title">{{tag_name}} 相关的文章：</h3>
    <ul class="articles-list"
        id="list">
      <transition-group name="el-fade-in">
        <li @click="articleDetail(article._id)"
            v-for="(article) in articlesList"
            :key="article._id"
            class="item">
          <a :href="href + article._id"
             target="_blank">
            <img class="wrap-img img-blur-done"
                 :data-src="article.img_url"
                 data-has-lazy-src="false"
                 src="../assets/bg.jpg"
                 alt="文章封面" />
            <div class="content">
              <h4 class="title">{{article.title}}</h4>
              <p class="abstract">{{article.desc}}</p>
              <div class="meta">
                <span>查看 {{article.meta.views}}</span>
                <span>评论 {{article.meta.comments}}</span>
                <span>赞 {{article.meta.likes}}</span>
                <span v-if="article.create_time"
                      class="time">
                  {{formatTime(article.create_time)}}
                </span>
              </div>
            </div>
          </a>
        </li>
      </transition-group>
    </ul>
    <LoadingCustom v-if="isLoading"></LoadingCustom>
    <LoadEnd v-if="isLoadEnd"></LoadEnd>
  </div>
</template>

<script>
import { ref, reactive, onMounted, onUnmounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { loadFn, destroyFn } from '../../utils/utils'
export default {
  name: 'articleList',
  setup() {
    
  }
}
function getArticleList(){
    



    return articleList
}
</script>
<style lang='scss' scoped>
</style>
