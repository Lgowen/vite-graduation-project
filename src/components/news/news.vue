<template>
  <div class="newslist">
      <div class="news-item-normal" v-for="newsItem in newsList" :key="newsItem.title">
          <div class="words">
              <h2 class="title">
                  <a :href="newsItem.link" target="_blank">{{newsItem.title}}</a>
              </h2>
              <div class="aside">
                  <span>{{newsItem.channel}}</span>
                  <span>发布日期:{{newsItem.pubDate}}</span>
              </div>
              <div class="content">{{newsItem.content}}</div>
          </div>
      </div>
  </div>
</template>

<script>
// import { handleNews } from './handleNews'
import { getNews } from 'utils/api'
import { toRefs, reactive, defineComponent, onMounted } from 'vue'
export default defineComponent({
  name: 'news',
  setup() {
    const state = reactive({
        newsList: []
    })

    onMounted( async () => {

        let { data: newsList } = await getNews({page: 1, limit: 10})
        console.log(newsList)
        newsList.datas.forEach(news => news.pubDate = new Date(news.pubDate).toLocaleDateString())
        console.log(newsList.datas)
        state.newsList = newsList.datas

    })
    
    return state
  }
  
  
  
})
</script>

<style lang="scss" scoped>

.newslist {
  width: 1080px;
  margin: 0 auto;
  overflow: hidden;
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
// .news-item-normal {
//   border-bottom: 1px solid #ccc;
//   overflow: hidden;
//   padding: 20px 0;
// }
// .image {
//   width: 150px;
//   height: 150px;
//   border: 1px solid #ccc;
//   border-radius: 4px;
//   float: left;
//   margin-right: 20px;
// }
// .image img {
//   width: 100%;
//   height: 100%;
//   object-fit: contain;
// }
// .title {
//   font-size: 1.5em;
// }
// .aside {
//   font-size: 14px;
//   color: #888;
// }
// .aside span {
//   margin-right: 15px;
// }

// .content {
//   max-height: 100px;
//   overflow: hidden;
//   line-height: 2;
// }
</style>
