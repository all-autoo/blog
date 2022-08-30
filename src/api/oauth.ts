import service from '@/utils/request'

export const useCaptchaApi = () => {
	return service.get('/sys/oauth/captcha')
}

export const useLoginApi = (data: any) => {
	return service({
    url: '/api/login',
    method: 'post',
    data: data
  })
}

export const useLogoutApi = () => {
	return service.get('/api/auth/logout')
}
