import request from '@/utils/request'

export const useMenuNavApi = () => {
	return request.get('/api/user/queryUserMenus')
}

export const useAuthorityListApi = (data: any) => {
	return request({
    url: '/api/user/queryUserMenuButtons',
    method: 'get',
    params: data
  })
}

export const useMenuListApi = (type: Number) => {
	// 菜单类型 0：菜单  1：按钮  2：接口
	const menuType = type === 2 ? 2 : 0

	return request.get('/sys/menu/list?type=' + menuType)
}

// export const useMenuApi = (id: Number) => {
// 	return request.get('/sys/menu/' + id)
// }


// 查询菜单按钮权限树
export const queryMenuPermissionTree = () => {
  return request({
    url: '/api/permission/queryMenuPermissionTree',
    method: 'get'
  })
}

// 查询菜单列表
export const listMenu = (data: any) => {
  return request({
    url: '/api/permission/queryPermissions',
    method: 'get',
    params: data
  })
}

// 查询菜单列表
export const useMenuApi = (data: any) => {
  return request({
    url: '/api/permission/queryPermissionById',
    method: 'get',
    params: data
  })
}

// 新增菜单
export const addMenu = (data: any) => {
  return request({
    url: '/api/permission/savePermission',
    method: 'post',
    data: data
  })
}

// 修改菜单
export const updateMenu = (data: any) => {
  return request({
    url: '/api/permission/updatePermission',
    method: 'post',
    data: data
  })
}

// 删除菜单
export const delMenu = (data: any) => {
  return request({
    url: '/api/permission/deletePermission',
    method: 'put',
    data
  })
}