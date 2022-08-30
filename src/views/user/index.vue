<template>
	<el-card>
		<el-form :inline="true" :model="state.queryForm" @keyup.enter="getDataList()">
			<el-form-item>
				<el-input v-model="state.queryForm.name" placeholder="姓名" clearable ></el-input>
			</el-form-item>
			<el-form-item>
				<el-button :icon="Search" @click="getDataList()">查询</el-button>
			</el-form-item>
		</el-form>
		<el-table v-loading="state.dataListLoading" :data="state.dataList" border style="width: 100%" @selection-change="selectionChangeHandle">
			<el-table-column prop="id" label="id" align="center"></el-table-column>
			<el-table-column prop="name" label="姓名" align="center"></el-table-column>
			<el-table-column prop="date" label="时间" align="center"></el-table-column>
			<el-table-column prop="image" label="头像" align="center">
        <template #default="{ row }">
          <el-image
            style="width: 50px; height: 50px;border-radius: 50%;"
            :src="row.image"
            :preview-src-list="[row.image]"
            preview-teleported
          />
        </template>
      </el-table-column>
			<el-table-column prop="status" label="状态" align="center">
        <template #default="{ row }">{{$getLabel(row.status, monthCardStatus)}}</template>
      </el-table-column>
			<!-- <el-table-column label="操作" fixed="right" align="center" width="250"> -->
				<!-- <template #default="scope"> -->
					<!-- <el-button type="primary" link @click="detail(scope.row.id)">详情</el-button> -->
					<!-- <el-button type="primary" link @click="deleteHandle({userId: scope.row.id, status: 2})">删除</el-button> -->
				<!-- </template> -->
			<!-- </el-table-column> -->
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
import { monthCardStatus } from '@/utils/common'
import { router } from '@/router'

const state: IHooksOptions = reactive({
	apiList: listUser,
	apiDelete: updateStatus,
	queryForm: {
    name: ''
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

const { getDataList, selectionChangeHandle, sizeChangeHandle, currentChangeHandle, deleteHandle } = useCrud(state)
</script>
