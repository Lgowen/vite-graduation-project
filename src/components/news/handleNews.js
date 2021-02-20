import { ref, reactive, computed } from 'vue'
import { getNews } from 'utils/api'

export function handleNews() {

    async function getNewsList(ctx) {
        try {
            const query = {
                page: 1,
                limit: 10
            }
            let { data: newsList } = await getNews(query)
            // console.log(newsList)
            // formatDate(newsList.datas)
            // console.log(newsList)
            newsList.datas.forEach(news => news.pubDate = new Date(news.pubDate).toLocaleDateString())
            console.log(newsList.datas)
            return newsList.datas
        } catch(error) {
            console.log(error)
        }
    }

    return { getNewsList }
}