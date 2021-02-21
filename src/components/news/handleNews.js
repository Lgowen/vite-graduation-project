import { reactive } from 'vue'
import { getNews } from 'utils/api'
import { formatDate } from 'utils/utils'

export function handleNews() {
  const page = reactive({
    newsList: [],
    total: 0,
    query: {},
    pageSizes: [10, 20, 30, 40],
  })

  async function handleCurrentChange(val) {
    const newsList = await handleGetNews({page: val, limit: page.query.pageSize})
    page.query.currentPage = val
    page.newsList = newsList.datas
  }

  async function handleSizeChange(val) {
    const newsList = await handleGetNews({page: page.query.currentPage, limit: val})
    page.query.pageSize = val
    page.newsList = newsList.datas
  }

  async function handleGetNews(query = page.query) {
    let { data: newsList } = await getNews(query)
    newsList.datas.forEach((news) => (news.pubDate = formatDate(news.pubDate)))
    return newsList
  }

  return { page, handleCurrentChange, handleSizeChange, handleGetNews }
}
