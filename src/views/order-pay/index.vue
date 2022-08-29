<template>
	<el-card>
		<el-form :inline="true" :model="state.queryForm" @keyup.enter="getDataList()">
			<el-form-item>
				<el-input v-model="state.queryForm.nickName" placeholder="车牌号" clearable></el-input>
			</el-form-item>
			<el-form-item>
        <el-date-picker
          v-model="state.queryForm.time"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          value-format="YYYY-MM-DD HH:mm:ss"
        />
			</el-form-item>
			<el-form-item>
				<el-button :icon="Search" @click="getDataList()">查询</el-button>
			</el-form-item>
		</el-form>
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="临时停车缴费" :name="0"></el-tab-pane>
      <el-tab-pane label="月卡车缴费" :name="1"></el-tab-pane>
    </el-tabs>
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
	</el-card>
</template>

<script setup lang="ts">
import { useCrud } from '@/hooks'
import { reactive, ref, watch } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { IHooksOptions } from '@/hooks/interface'
import { listUser, updateStatus } from '@/api/user'
import type { TabsPaneContext } from 'element-plus'

const activeName = ref<number>(0)

const state: IHooksOptions = reactive({
	apiList: listUser,
	apiDelete: updateStatus,
	queryForm: {
		nickName: '',
		time: []
	}
})

const handleClick = (tab: TabsPaneContext, event: Event) => {
  currentChangeHandle(1)
}

watch(() => state.queryForm.time, (n) => {
  console.log(n);
  state.queryForm.startTime = n ? n[0] : ''
  state.queryForm.endTime = n ? n[1] : ''
  console.log(state);
  
})

const { getDataList, selectionChangeHandle, sizeChangeHandle, currentChangeHandle } = useCrud(state)
</script>
