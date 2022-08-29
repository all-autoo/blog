<template>
		<el-table v-loading="state.dataListLoading" :data="state.dataList" border style="width: 100%" @selection-change="selectionChangeHandle">
			<el-table-column prop="mobile" label="订单号" align="center"></el-table-column>
			<el-table-column prop="nickName" label="车牌" align="center"></el-table-column>
			<el-table-column prop="realName" :label="activeName === 0 ? '入场时间' : '延期时间'" align="center"></el-table-column>
			<el-table-column prop="status" label="停车时长" align="center"></el-table-column>
			<el-table-column prop="status" label="金额/元" align="center"></el-table-column>
			<el-table-column prop="status" label="支付状态" align="center"></el-table-column>
			<el-table-column prop="status" label="支付时间" align="center"></el-table-column>
		</el-table>
		<el-pagination
			:current-page="state.current"
			:page-sizes="state.pageSizes"
			:page-size="state.size"
			:total="state.total"
			layout="total, sizes, prev, pager, next, jumper"
			@size-change="sizeChangeHandle"
			@current-change="currentChangeHandle"
		>
		</el-pagination>
</template>

<script setup lang="ts">
import { useCrud } from '@/hooks'
import { reactive, ref, watch } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { IHooksOptions } from '@/hooks/interface'
import { listUser, updateStatus } from '@/api/user'

const activeName = ref<number>(0)

const state: IHooksOptions = reactive({
	apiList: listUser,
	apiDelete: updateStatus
})



const { getDataList, selectionChangeHandle, sizeChangeHandle, currentChangeHandle } = useCrud(state)
</script>
