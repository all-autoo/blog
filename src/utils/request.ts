import axios from 'axios'
import { ElMessage, ElMessageBox, ElLoading } from 'element-plus'
import store from '@/store'
import cache from '@/utils/cache'

export const baseURL = import.meta.env.VITE_API_URL as any
// axios实例
const service = axios.create({
	baseURL: baseURL,
	timeout: 60000,
})

let loadingInstance:any

// 请求拦截器
service.interceptors.request.use(
	(config: any) => {
    console.log(config);
    
    loadingInstance = ElLoading.service({
      lock: true,
      text: 'Loading',
      background: 'rgba(255, 255, 255, 0.3)',
    })

    const token = cache.getToken()
		if (token) {
			config.headers.Authorization = token
		}

		config.headers['Accept-Language'] = cache.getLanguage()

		// 追加时间戳，防止GET请求缓存
		if (config.method?.toUpperCase() === 'GET') {
			config.params = { ...config.params, t: new Date().getTime() }
		}
		if (config.method?.toUpperCase() === 'PUT') {
			config.params = { ...config.data, t: new Date().getTime() }
      config.data = null
		}

		return config
	},
	error => {
		return Promise.reject(error)
	}
)

// 响应拦截器
service.interceptors.response.use(
	response => {
    setTimeout(() => {
      loadingInstance.close()
    }, 200)

		if (response.status !== 200) {
			return Promise.reject(new Error(response.statusText || 'Error'))
		}

		const res = response.data
		// 响应成功
		if (res.code === 200) {
			return res
		}

		// 错误提示
		ElMessage.error(res.msg)

		// 没有权限，如：未登录、登录过期等，需要跳转到登录页
		// if (res.code === 401) {
		// 	store.userStore?.setToken('')
		// 	location.reload()
		// }

    if (res.code === 10020 || res.code === 10021 || res.code === 10022 || res.code === 10023) {
      ElMessageBox.confirm(
        '登录信息已过期，请重新登录',
        '提示',
        {
          confirmButtonText: '确定',
          type: 'warning',
        }
      ).then(() => {
        store.userStore?.setToken(null)
        location.reload()
      })
    }

		return Promise.reject(new Error(res.msg || 'Error'))
	},
	error => {
    setTimeout(() => {
      loadingInstance.close()
    }, 200)
    if (error?.response.status === 401) {
      ElMessage.error('登录信息已过期')
      ElMessageBox.confirm(
        '登录信息已过期，请重新登录',
        '提示',
        {
          confirmButtonText: '确定',
          type: 'warning',
          showCancelButton: false
        },
      ).then(() => {
        store.userStore?.setToken(null)
        location.reload()
      })
    } else {
      ElMessage.error('系统异常，请联系管理员！')
    }
		return Promise.reject(error)
	}
)

// 导出 axios 实例
export default service
