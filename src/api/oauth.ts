import service from '@/utils/request'

export const useCaptchaApi = () => {
	return service.get('/sys/oauth/captcha')
}

export const useLoginApi = (data: any) => {
	return service({
    url: '/api/auth/login',
    method: 'post',
    data: { acctOrMobile: data.username, password: data.password ,type:1}
  })
}

export const useLogoutApi = () => {
	return service.get('/api/auth/logout')
}
