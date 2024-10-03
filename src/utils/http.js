import axios from 'axios'
// 创建axios实例
 
const instance = axios.create({
  //基本url
  baseURL: 'http://localhost:8081',
  //超时时间
  timeout: 5000
})
 
// axios请求拦截器
instance.interceptors.request.use(config => {
  return config
}, e => Promise.reject(e))
 
// axios响应式拦截器
instance.interceptors.response.use(res => res.data, e => {
  return Promise.reject(e)
})
 
//导出实例
export default instance