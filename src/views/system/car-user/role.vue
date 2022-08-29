<template>
	<el-dialog v-model="visible" title="设置用户角色" :close-on-click-modal="false">
		<el-form ref="dataFormRef" :model="dataForm" :rules="dataRules" label-width="120px" @keyup.enter="submitHandle()">
      <el-form-item label="角色" prop="roleIds">
        <el-select v-model="dataForm.roleIds" placeholder="请选择角色" multiple clearable>
          <el-option v-for="item in roleList" :key="item.roleId" :label="item.roleName" :value="item.roleId">
          </el-option>
        </el-select>
      </el-form-item>
		</el-form>
		<template #footer>
			<el-button @click="visible = false">取消</el-button>
			<el-button type="primary" @click="submitHandle()">确定</el-button>
		</template>
	</el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import { ElMessage } from 'element-plus/es'
import { bindUserRole } from '@/api/user'
import store from '@/store'
import { useRoleListApi } from '@/api/role'

const emit = defineEmits(['refreshDataList'])

const visible = ref(false)
const roleList = ref<any[]>([])
const dataFormRef = ref()

const dataForm = reactive({
	userId: '',
  roleIds: [],

})

const userId = computed(() => store.userStore?.user.userId)


const init = (id: string) => {
	visible.value = true
	dataForm.userId = id

	// 重置表单数据
	if (dataFormRef.value) {
		dataFormRef.value.resetFields()
	}
  getRoleList()
}


// 获取角色列表
const getRoleList = () => {
	return useRoleListApi({queryUserId: userId.value}).then(res => {
		roleList.value = res.data.userRoles
	})
}



const dataRules = ref({
	roleIds: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
})

// 表单提交
const submitHandle = () => {
	dataFormRef.value.validate((valid: boolean) => {
		if (!valid) {
			return false
		}
		bindUserRole(dataForm).then(() => {
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
