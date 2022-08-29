<template>
	<el-card>
		<el-form :inline="true" :model="state.queryForm" @keyup.enter="getDataList()">
			<el-form-item>
				<el-input v-model="state.queryForm.roleName" placeholder="名称" clearable></el-input>
			</el-form-item>
			<el-form-item>
				<el-button :icon="Search" @click="getDataList()">查询</el-button>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="addOrUpdateHandle()">新增</el-button>
			</el-form-item>
		</el-form>
		<el-table v-loading="state.dataListLoading" :data="state.dataList" border style="width: 100%">
			<el-table-column prop="roleName" label="名称" header-align="center" align="center"></el-table-column>
			<el-table-column prop="remark" label="备注" header-align="center" align="center"></el-table-column>
			<el-table-column prop="createTime" label="创建时间" header-align="center" align="center" width="280"></el-table-column>
			<el-table-column label="操作" fixed="right" header-align="center" align="center" width="250">
				<template #default="scope">
					<el-button type="primary" link @click="addOrUpdateHandle(scope.row.id)">修改</el-button>
					<el-button type="primary" link @click="setRole(scope.row.id)">角色权限</el-button>
          <el-button type="primary" link @click="deleteHandle({roleId: scope.row.id, status: 1}, '冻结')" v-if="scope.row.status === 0">冻结</el-button>
					<el-button type="primary" link @click="deleteHandle({roleId: scope.row.id, status: 0}, '解冻')" v-if="scope.row.status === 1">解冻</el-button>
					<el-button type="primary" link @click="deleteHandle({roleId: scope.row.id, status: 2})">删除</el-button>
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
		<role ref="roleRef" @refreshDataList="getDataList"></role>
	</el-card>
</template>

<script setup lang="ts">
import { useCrud } from '@/hooks'
import { reactive, ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import AddOrUpdate from './add-or-update.vue'
import role from './role.vue'
import { IHooksOptions } from '@/hooks/interface'
import { roleListApi, updateRoleStatus } from '@/api/role'

const state: IHooksOptions = reactive({
	apiList: roleListApi,
  apiDelete: updateRoleStatus,
	queryForm: {
		roleName: ''
	}
})

const addOrUpdateRef = ref()
const addOrUpdateHandle = (id?: number) => {
	addOrUpdateRef.value.init(id)
}

const roleRef = ref()
const setRole = (id?: number) => {
	roleRef.value.init(id)
}

const { getDataList, sizeChangeHandle, currentChangeHandle, deleteHandle } = useCrud(state)
</script>
