 /** 
         * 取一条cookie 
         * * @param {string} key 要取的cookie的名称 
         **/
  export const getCookie = key => {
    let str = document.cookie // 获取cookie
    let arr = str.split(';') // ['key1=value1', 'key2=value2']
    let obj = {} // 存放每一个key、value
    arr.forEach(item => {
        let itemArr = item.split('=')
        obj[itemArr[0]] = decodeURIComponent(itemArr[1]) // 防止低版本浏览器中文字符报错
    })
    return obj[key]
}