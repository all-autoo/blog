import { IHooksOptions } from '@/hooks/interface'
import service from '@/utils/request'
import { onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

export const useCrud = (options: IHooksOptions) => {
	const defaultOptions: IHooksOptions = {
		createdIsNeed: true,
		dataListUrl: '',
		isPage: true,
		deleteUrl: '',
		primaryKey: 'id',
		exportUrl: '',
		queryForm: {},
		dataList: [],
		order: '',
		asc: false,
		current: 1,
		size: 10,
		total: 0,
		pageSizes: [1, 10, 20, 50, 100, 200],
		dataListLoading: false,
		dataListSelections: [],
    apiDelete: null,
    apiList: null
	}

	const mergeDefaultOptions = (options: any, props: any): IHooksOptions => {
		for (const key in options) {
			if (!Object.getOwnPropertyDescriptor(props, key)) {
				props[key] = options[key]
			}
		}
		return props
	}

	// 覆盖默认值
	const state = mergeDefaultOptions(defaultOptions, options)

	onMounted(() => {
		if (state.createdIsNeed) {
			query()
		}
	})

	const query = () => {
		if (!state.apiList) {
			return
		}

		state.dataListLoading = true

		state.apiList({...state.queryForm, size: state.size, current: state.current}).then((res: any) => {
      console.log(res);
      
				state.dataList = state.isPage ? res.data.list : res.data
				state.total = state.isPage ? res.data.total : 0
        
			})

		state.dataListLoading = false
	}

	const getDataList = () => {
		state.current = 1
		query()
	}

	const sizeChangeHandle = (val: number) => {
		state.current = 1
		state.size = val
		query()
	}

	const currentChangeHandle = (val: number) => {
		state.current = val
		query()
	}

	// 多选
	const selectionChangeHandle = (selections: any[]) => {
		state.dataListSelections = selections.map((item: any) => state.primaryKey && item[state.primaryKey])
	}

	// 排序
	const sortChangeHandle = (data: any) => {
		const { prop, order } = data

		if (prop && order) {
			state.order = prop
			state.asc = order === 'ascending'
		} else {
			state.order = ''
		}

		query()
	}

	const deleteHandle = (data: any, title: string = '删除') => {    
		ElMessageBox.confirm(`确定进行${title}操作?`, '提示', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'warning'
		})
			.then(() => {
        state.apiDelete(data).then(() => {
					ElMessage.success(`${title}成功`)

					query()
				})
			})
			.catch(() => {})
	}

	const deleteBatchHandle = (key?: number | string) => {
		let data: any[] = []
		if (key) {
			data = [key]
		} else {
			data = state.dataListSelections ? state.dataListSelections : []

			if (data.length === 0) {
				ElMessage.warning('请选择删除记录')
				return
			}
		}

		ElMessageBox.confirm('确定进行删除操作?', '提示', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'warning'
		})
			.then(() => {
				if (state.deleteUrl) {
					service.delete(state.deleteUrl, { data }).then(() => {
						ElMessage.success('删除成功')

						query()
					})
				}
			})
			.catch(() => {})
	}

	return { getDataList, sizeChangeHandle, currentChangeHandle, selectionChangeHandle, sortChangeHandle, deleteHandle, deleteBatchHandle }
}
