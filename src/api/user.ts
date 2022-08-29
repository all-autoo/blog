import service from '@/utils/request'

export const useUserInfoApi = () => {
	return service({
    url: '/api/user/getLoginUserInfo',
    method: 'get'
  })
}

export const updatePasswordApi = (data: any) => {
	return service.put('/sys/user/password', data)
}

export const useUserApi = (id: string) => {
	return service.get('/api/user/queryUserNameById?id=' + id)
}

export const useUserSubmitApi = (dataForm: any) => {
	if (dataForm.id) {
		return service.post('/api/user/updateUser', dataForm)
	} else {
		return service.post('/api/user/saveUser', dataForm)
	}
}

// 新增停车场用户
export const parkUserSubmitApi = (dataForm: any) => {
	if (dataForm.id) {
		return service.post('/api/user/updateUser', dataForm)
	} else {
		return service.post('/api/user/saveParkUser', dataForm)
	}
}


// 查询用户列表
export const listUser = (query: any) => {
  return service({
    url: '/api/user/queryUserList',
    method: 'post',
    data: query
  })
}

// 删除用户
export const updateStatus = (data: any) => {
  return service({
    url: '/api/user/updateUserStatus',
    method: 'put',
    data
  })
}

// 设置用户角色
export const bindUserRole = (data: any) => {
  return service({
    url: '/api/user/bindUserRole',
    method: 'POST',
    data
  })
}
