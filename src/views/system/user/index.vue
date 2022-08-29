<template>
	<el-card>
		<el-form :inline="true" :model="state.queryForm" @keyup.enter="getDataList()">
			<el-form-item>
				<el-input v-model="state.queryForm.nickName" placeholder="昵称" clearable></el-input>
			</el-form-item>
			<el-form-item>
				<el-input v-model="state.queryForm.realName" placeholder="真实姓名" clearable></el-input>
			</el-form-item>
			<el-form-item>
				<el-input v-model="state.queryForm.mobile" placeholder="手机号" clearable></el-input>
			</el-form-item>
			<el-form-item>
				<el-button :icon="Search" @click="getDataList()">查询</el-button>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="addOrUpdateHandle()">新增</el-button>
			</el-form-item>
		</el-form>
		<el-table v-loading="state.dataListLoading" :data="state.dataList" border style="width: 100%" @selection-change="selectionChangeHandle">
			<el-table-column type="selection" align="center" width="50"></el-table-column>
			<el-table-column prop="userAcct" label="账号" align="center"></el-table-column>
			<el-table-column prop="nickName" label="昵称" align="center"></el-table-column>
			<el-table-column prop="realName" label="真实名称" align="center"></el-table-column>
			<el-table-column prop="mobile" label="手机号" align="center"></el-table-column>
			<el-table-column prop="status" label="状态" align="center">
        <template #default="{ row }">{{$getLabel(row.status, userStatus)}}</template>
      </el-table-column>
			<el-table-column prop="createTime" label="创建时间" align="center" width="180"></el-table-column>
			<el-table-column label="操作" fixed="right" align="center" width="250">
				<template #default="scope">
					<el-button type="primary" link @click="addOrUpdateHandle(scope.row.id)">修改</el-button>
					<el-button type="primary" link @click="deleteHandle({userId: scope.row.id, status: 1}, '冻结')" v-if="scope.row.status === 0">冻结</el-button>
					<el-button type="primary" link @click="deleteHandle({userId: scope.row.id, status: 0}, '解冻')" v-if="scope.row.status === 1">解冻</el-button>
					<el-button type="primary" link @click="deleteHandle({userId: scope.row.id, status: 2})">删除</el-button>
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

		<!-- 弹窗, 新增 / 修改 -->
		<add-or-update ref="addOrUpdateRef" @refreshDataList="getDataList"></add-or-update>
		<role ref="setRoleRef" @refreshDataList="getDataList"></role>
	</el-card>
</template>

<script setup lang="ts">
import { useCrud } from '@/hooks'
import { reactive, ref } from 'vue'
import AddOrUpdate from './add-or-update.vue'
import { Search } from '@element-plus/icons-vue'
import role from './role.vue'
import { IHooksOptions } from '@/hooks/interface'
import { listUser, updateStatus } from '@/api/user'
import { userStatus } from '@/utils/common'

const state: IHooksOptions = reactive({
	apiList: listUser,
	apiDelete: updateStatus,
	queryForm: {
		nickName: '',
		mobile: '',
		realName: '',
    userType: 0
	}
})

const addOrUpdateRef = ref()
const addOrUpdateHandle = (id?: string) => {
	addOrUpdateRef.value.init(id)
}


const setRoleRef = ref()
const setRole = (id?: string) => {
	setRoleRef.value.init(id)
}

const { getDataList, selectionChangeHandle, sizeChangeHandle, currentChangeHandle, deleteHandle } = useCrud(state)
</script>
