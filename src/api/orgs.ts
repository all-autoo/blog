import service from '@/utils/request'

export const useOrgListApi = () => {
	return service.get('/api/branch/getList')
}

export const deleteBranch = (data: any) => {
	return service({url: '/api/branch/deleteBranch', params: data, method: 'delete' })
}

export const useOrgApi = (id: Number) => {
	return service.get('/api/branch/getInfo?id=' + id)
}

export const useOrgSubmitApi = (dataForm: any) => {
	if (dataForm.id) {
		return service.post('/api/branch/updateBranch', dataForm)
	} else {
		return service.post('/api/branch/saveBranch', dataForm)
	}
}
