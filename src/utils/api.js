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
   * 注销
   */
export async function loginOut() {
    document.cookie = "token=; max-age=-1";
    location.href = "/login.html";
  }
  
  /**
   * 获取当前登录的用户信息
   * 如果当前没有登录的用户，返回null
   */
  async function whoAmI() {
    const resp = await request("/api/user/whoami");
    const result = await resp.json();
    if (result.err) {
      // 之前没有登录
      return null;
    }
    return result;
  }
  
  /**
   * 进入个人中心页面时运行的函数
   */
  async function personal() {
    // A. 输出在服务器
    // B. 输出在浏览器
    // C. 不会输出
    console.log("123")
  }
  