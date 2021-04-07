import request from './request'

/**
 * 获取新闻
 * @param {*} query 地址栏参数
 * @returns { datas: [...], total: xxx}
 */
export function getNews(query) {
    // const url = `/news?page=${query.page}&limit=${query.limit}`;
    // const resp = await request(url);
    // const result = await resp.json();
    // return result
    return request({
        method: 'get',
        url: `/news?page=${query.page}&limit=${query.limit}`
    })
  }
  
  /**
   * 注册用户
   * @param {*} regInfo
   * @returns 当注册成功时，不需要返回；当注册失败时，返回错误消息
   */
export function reg(regInfo) {
    return request({
        method: 'post',
        url: '/user/reg',
        data: regInfo
    })
  }
  
  /**
   * 登录
   * @param {*} loginInfo {loginId:"账号", loginPwd:"密码"}
   * @returns 当登录成功时，不需要返回；当登录失败时，返回错误消息
   */
  
export function login(loginInfo) {
    return request({
        method: 'post',
        url: '/user/login',
        data: loginInfo
    })
  }
  
/**
   * 获取md文件
   * @returns 
   */

export function getMarkDown() {
  return request({
    method: 'get',
    url: '/articles'
  })
}

export function getComments () {
  return request({
    method: 'get',
    url: '/comment'
  })
}


export function addComment(comment) {
  return request({
    method: 'post',
    url: '/comment/addComment',
    data: comment
  })
}

export function updatePwd (userInfo) {
  return request({
    method: 'post',
    url: '/user/update',
    data: userInfo
  })
}