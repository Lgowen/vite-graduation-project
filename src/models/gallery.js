import { reactive } from 'vue'
import { getRandomPic } from 'utils/utils.js'

export function handlePhotos() {

    function initSources(cols, initCount){
        const sources = []
        while (cols--) {
          let count = initCount
          const col = []
          while (count--) col.push(getRandomPic())
          sources.push(col)
        }
        return sources
    }



    const sources = reactive(initSources(3, 10))

    return { sources }
}