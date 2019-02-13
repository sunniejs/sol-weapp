export let isDev = true; 
/** 基地址 */
export let baseURL = (() => {
  if (isDev) {
    return 'https://www.easy-mock.com/mock/5b584a8f4a49cd0f18b398ac/api'
  }else{
    return 'https://www.easy-mock.com/mock/5b584a8f4a49cd0f18b398ac/api'
  }
  return '';
})();