<template>
	<el-card>
		<el-form :inline="true" :model="state.queryForm" @keyup.enter="getDataList()">
			<el-form-item>
				<el-input v-model="state.queryForm.nickName" placeholder="停车场名称" clearable></el-input>
			</el-form-item>
			<el-form-item>
				<el-button :icon="Search" @click="getDataList()">查询</el-button>
			</el-form-item>
		</el-form>
		<el-table v-loading="state.dataListLoading" :data="state.dataList" border style="width: 100%" @selection-change="selectionChangeHandle">
			<el-table-column prop="mobile" label="停车名称" align="center"></el-table-column>
			<el-table-column prop="nickName" label="停车场收费标准" align="center"></el-table-column>
			<el-table-column prop="realName" label="每日临停" align="center"></el-table-column>
			<el-table-column prop="status" label="月卡总数" align="center"></el-table-column>
			<el-table-column label="操作" fixed="right" align="center" width="250">
				<template #default="scope">
					<el-button type="primary" link @click="detail(scope.row.id)">详情</el-button>
				</template>
			</el-table-column>
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
	</el-card>
</template>

<script setup lang="ts">
import { useCrud } from '@/hooks'
import { reactive, ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { IHooksOptions } from '@/hooks/interface'
import { listUser, updateStatus } from '@/api/user'
import { router } from '@/router'

const state: IHooksOptions = reactive({
	apiList: listUser,
	apiDelete: updateStatus,
	queryForm: {
		nickName: ''
	}
})

const detail = (id: string) => {
  router.push({
    path: '/user/detail',
    params: {
      id
    }
  })
}

const { getDataList, selectionChangeHandle, sizeChangeHandle, currentChangeHandle } = useCrud(state)
</script>
