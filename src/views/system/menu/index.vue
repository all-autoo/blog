<template>
	<el-card class="mod__menu">
		<el-form :inline="true" :model="state.queryForm" @keyup.enter="getDataList()">
      <el-form-item>
				<el-input v-model="state.queryForm.permissionName" placeholder="菜单名称" clearable></el-input>
			</el-form-item>
      <el-form-item>
				<el-button :icon="Search" @click="getDataList()">查询</el-button>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="addOrUpdateHandle()">新增</el-button>
			</el-form-item>
		</el-form>
		<el-table v-loading="state.dataListLoading" :data="state.data" row-key="id" border style="width: 100%">
			<el-table-column prop="permissionName" label="菜单名称" header-align="center" min-width="150"></el-table-column>
			<el-table-column prop="menuLogo" label="图标" header-align="center" align="center">
				<template #default="scope">
					<svg-icon :icon="scope.row.menuLogo"></svg-icon>
				</template>
			</el-table-column>
			<el-table-column prop="permissionType" label="类型" header-align="center" align="center">
				<template #default="scope">
					<el-tag v-if="scope.row.permissionType === 0" type="info">菜单</el-tag>
					<el-tag v-if="scope.row.permissionType === 1" type="success">按钮</el-tag>
					<el-tag v-if="scope.row.permissionType === 2" type="warning">接口</el-tag>
				</template>
			</el-table-column>
			<el-table-column prop="orderNum" label="排序" header-align="center" align="center"></el-table-column>
			<el-table-column prop="url" label="路由地址" header-align="center" align="center" width="150" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" header-align="center" align="center"></el-table-column>
			<el-table-column label="操作" fixed="right" header-align="center" align="center" width="150">
				<template #default="scope">
					<el-button type="primary" link @click="addOrUpdateHandle(scope.row.id)">修改</el-button>
					<el-button type="primary" link @click="deleteHandle({id: scope.row.id})">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<add-or-update ref="addOrUpdateRef" @refreshDataList="getDataList"></add-or-update>
	</el-card>
</template>

<script setup lang="ts">
import { useCrud } from '@/hooks'
import { reactive, ref, watch } from 'vue'
import { Search } from '@element-plus/icons-vue'
import AddOrUpdate from './add-or-update.vue'
import { IHooksOptions } from '@/hooks/interface'
import { listMenu, delMenu } from '@/api/menu'
import { treeHandler } from '@/utils/tool'

const state: IHooksOptions = reactive({
  apiList: listMenu,
  apiDelete: delMenu,
  dataList: [],
  data: [],
  size: 10000,
  queryForm: {}
})

const addOrUpdateRef = ref()
const addOrUpdateHandle = (id?: number) => {
	addOrUpdateRef.value.init(id)
}

watch(() => state.dataList, (newValue) => {
  if (state.queryForm?.permissionName) {
    state.data = newValue
  } else if (newValue) {
    state.data = treeHandler(newValue)
  }
})

const { getDataList, deleteHandle } = useCrud(state)
</script>
