import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'
// import qs from 'qs';
import { getCookieToken } from '@/util/auth'
import { ElMessage } from 'element-plus'
export class Request {
  public static axiosInstance: AxiosInstance;
  public static init() {
    // 创建axios实例
    this.axiosInstance = axios.create({
      baseURL: '',
      timeout: 6000,
      withCredentials:true
  });
    // 初始化拦截器
    this.initInterceptors();
    return axios;
  }
  // 初始化拦截器
  public static initInterceptors() {
    // 设置post请求头
    this.axiosInstance.defaults.headers.post['Content-Type'] = 'application/json';
    this.axiosInstance.defaults.headers.get['Content-Type'] = 'application/json';
    /**
     * 请求拦截器
     * 每次请求前，如果存在token则在请求头中携带token
     */
    this.axiosInstance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        // 如果查询字符串中没有 notToken字段代表需要传token ，有的话就不用传token
        if(config.params && config.params.notToken){
          return config;
          }else{
            const token = getCookieToken()
            if (token) {
              if (config.headers) {
                config.headers['Authorization'] = token
              }
              return config;
            }
          }

        // 登录流程控制中，根据本地是否存在token判断用户的登录情况
        // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token
        // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码
      },
      (error: any) => {
        console.log(error);
      },
    );

    // 响应拦截器
    this.axiosInstance.interceptors.response.use(
      // 请求成功
      (response: AxiosResponse) => {
        // if (res.headers.authorization) {
        //     localStorage.setItem('id_token', res.headers.authorization);
        // } else {
        //     if (res.data && res.data.token) {
        //         localStorage.setItem('id_token', res.data.token);
        //     }
        // }
        if (response.status === 200) {
          return Promise.resolve(response.data);
        } else {
          Request.errorHandle(response);
          return Promise.reject(response.data);
        }
      },

      // 请求失败
      (error: any) => {
        const {response} = error;
        if (response) {
          // 请求已发出，但是不在2xx的范围
          Request.errorHandle(response);
          return Promise.reject(response.data);
        } else {
          // 处理断网的情况
          // eg:请求超时或断网时，更新state的network状态
          // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
          // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
          // message.warn('网络连接异常,请稍后再试!');
        }
      });
  }
  /**
   * http握手错误
   * @param res 响应回调,根据不同响应进行不同操作
   */
  private static errorHandle(res: any) {
    // 状态码判断
    switch (res.status) {
      case 401:
        const router = useRouter()
        const route = useRoute()
        ElMessage({type:'error',message:'登录已失效，请重新登录'})
        router.replace({path:'/login'})
        break;
      case 403:
        break;
      case 404:
        // message.warn('请求的资源不存在');
        break;
      default:
      // message.warn('连接错误');
    }
  }
}
