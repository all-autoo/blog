import service from '@/utils/request'

export const useRoleMenuApi = () => {
	return service.get('/sys/role/menu')
}

export const useRoleApi = (id: number) => {
	return service.get('/api/role/queryRoleById?id=' + id)
}

export const roleListApi = (data: any) => {
	// 查询菜单列表
  return service({
    url: '/api/role/queryRoles',
    method: 'post',
    data
  })
}

export const updateRoleStatus = (data: any) => {
	// 查询菜单列表
  return service({
    url: '/api/role/updateRoleStatus',
    method: 'put',
    data
  })
}

export const useRoleListApi = (data: any) => {
	// 查询个人权限列表
  return service({
    url: '/api/role/queryUserRoles',
    method: 'get',
    params: data
  })
}

export const queryLoginUserPermission = (data: any) => {
  return service({
    url: '/api/permission/queryLoginUserPermission',
    method: 'get',
    params: data
  })
}

export const updateRolePermissions = (data: any) => {
  return service({
    url: '/api/role/updateRolePermissions',
    method: 'post',
    data
  })
}

export const useRoleSubmitApi = (dataForm: any) => {
	if (dataForm.id) {
		return service.post('/api/role/updateRole', dataForm)
	} else {
		return service.post('/api/role/saveRole', dataForm)
	}
}
