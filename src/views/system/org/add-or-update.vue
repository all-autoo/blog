<template>
	<el-dialog v-model="visible" :title="!dataForm.id ? '新增' : '修改'" :close-on-click-modal="false">
		<el-form ref="dataFormRef" :model="dataForm" :rules="dataRules" label-width="120px" @keyup.enter="submitHandle()">
			<el-form-item prop="name" label="名称">
				<el-input v-model="dataForm.name" placeholder="名称"></el-input>
			</el-form-item>
			<el-form-item prop="parentName" label="上级机构" class="org-list">
				<el-popover
					ref="orgListPopover"
					v-model:visible="orgListVisible"
					placement="bottom-start"
					trigger="click"
					:width="400"
					popper-class="popover-pop"
				>
					<template #reference>
						<el-input v-model="dataForm.parentName" :readonly="true" placeholder="上级机构" @click="orgListVisible = true">
							<template #suffix>
								<svg-icon v-if="dataForm.parentId !== ''" icon="icon-close-circle" @click.stop="treeSetDefaultHandle()"></svg-icon>
							</template>
						</el-input>
					</template>
					<div class="popover-pop-body">
						<el-tree
							ref="orgListTree"
							:data="orgList"
							:props="{ label: 'name', children: 'childBranch' }"
							node-key="id"
							:highlight-current="true"
							:expand-on-click-node="false"
							accordion
							@current-change="treeCurrentChange"
						>
						</el-tree>
					</div>
					<el-row justify="end">
						<el-button type="primary" link style="margin-right: 15px" @click="orgListVisible = false">关闭</el-button>
					</el-row>
				</el-popover>
			</el-form-item>
			<el-form-item prop="orderNum" label="排序">
				<el-input-number v-model="dataForm.orderNum" controls-position="right" :min="0" label="排序"></el-input-number>
			</el-form-item>
		</el-form>
		<template #footer>
			<el-button @click="visible = false">取消</el-button>
			<el-button type="primary" @click="submitHandle()">确定</el-button>
		</template>
	</el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus/es'
import { useOrgApi, useOrgListApi, useOrgSubmitApi } from '@/api/orgs'

const emit = defineEmits(['refreshDataList'])

const visible = ref(false)
const orgListVisible = ref(false)
const orgList = ref([])
const orgListTree = ref()
const dataFormRef = ref()

const dataForm = reactive({
	id: '',
	name: '',
	parentId: '',
	parentName: '',
	orderNum: 0
})

const init = (id?: number) => {
	visible.value = true
	dataForm.id = ''

	// 重置表单数据
	if (dataFormRef.value) {
		dataFormRef.value.resetFields()
	}

	// id 存在则为修改
	if (id) {
		getOrg(id)
	} else {
		treeSetDefaultHandle()
	}

	// 机构列表
	getOrgList()
}

// 获取机构列表
const getOrgList = () => {
	return useOrgListApi().then(res => {
		orgList.value = res.data
	})
}

// 获取信息
const getOrg = (id: number) => {
	useOrgApi(id).then(res => {
		Object.assign(dataForm, res.data)

		if (dataForm.parentId == '') {
			return treeSetDefaultHandle()
		}

		orgListTree.value.setCurrentKey(dataForm.parentId)
	})
}

// 上级机构树, 设置默认值
const treeSetDefaultHandle = () => {
	dataForm.parentId = ''
	dataForm.parentName = ''
}

const treeCurrentChange = (data: any) => {
	dataForm.parentId = data.id
	dataForm.parentName = data.name
	orgListVisible.value = false
}

const dataRules = ref({
	name: [{ required: true, message: '必填项不能为空', trigger: 'blur' }]
})

// 表单提交
const submitHandle = () => {
	dataFormRef.value.validate((valid: boolean) => {
		if (!valid) {
			return false
		}

		useOrgSubmitApi(dataForm).then(() => {
			ElMessage.success({
				message: '操作成功',
				duration: 500,
				onClose: () => {
					visible.value = false
					emit('refreshDataList')
				}
			})
		})
	})
}

defineExpose({
	init
})
</script>

<style lang="scss" scoped>
.org-list {
	::v-deep(.el-input__inner) {
		cursor: pointer;
	}
	::v-deep(.el-input__suffix) {
		cursor: pointer;
	}
}
</style>
