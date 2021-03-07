/** 
 * 获取 localStorage 的值 
 * @param {string} key localStorage key name 
 */ 
 export const getLocalStorage = (key) => { 
    return window.localStorage.getItem(key) 
    } 
      /** 
    * 设置 localStorage 的值 
    * @param {string} key localStorage key name 
    * @param {any} value 值 
    */ 
    export const setLocalStorage = (key, value) => { 
    return window.localStorage.setItem(key, value) 
    } 


    /** 
 * 获取 sessionStorage 的值 
 * @param {string} key sessionStorage key name 
 */ 
 export const getSessionStorage = (key) => { 
    return window.sessionStorage.getItem(key) 
    } 
      /** 
    * 设置 sessionStorage 的值 
    * @param {string} key sessionStorage key name 
    * @param {any} value 值 
    */ 
    export const setSessionStorage = (key, value) => { 
    return window.sessionStorage.setItem(key, value) 
    } 