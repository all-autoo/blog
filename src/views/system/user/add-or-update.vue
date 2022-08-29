<template>
	<el-dialog v-model="visible" :title="!dataForm.id ? '新增' : '修改'" :close-on-click-modal="false">
		<el-form ref="dataFormRef" :model="dataForm" :rules="dataRules" label-width="120px" @keyup.enter="submitHandle()">
			<el-form-item label="真实姓名" prop="realName">
        <el-input v-model="dataForm.realName" placeholder="真实姓名" maxlength="16"></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="nickName">
        <el-input v-model="dataForm.nickName" placeholder="请输入昵称" maxlength="16"></el-input>
      </el-form-item>
      <el-form-item label="密码" :prop="dataForm.id?'':'passWord'">
        <el-input v-model="dataForm.passWord" type="password" maxlength="16" show-password auto-complete="new-password" :placeholder="dataForm.id?'默认为空不修改密码':'请输入密码'"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="dataForm.mobile" placeholder="请输入手机号" maxlength="11"></el-input>
      </el-form-item>
      <el-form-item label="账号" prop="userAcct">
        <el-input v-model="dataForm.userAcct" placeholder="请输入账号" maxlength="16"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input type="textarea" v-model="dataForm.remark" maxlength="128" placeholder="请输入备注"></el-input>
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
import { useUserApi, useUserSubmitApi } from '@/api/user'
import store from '@/store'
import { useRoleListApi } from '@/api/role'
interface dataFormType {
  id?: string
	realName: string
  nickName: string
  passWord?: string
  mobile: string
  userAcct: string
  roleIds?: any[]
  remark: string
}

const emit = defineEmits(['refreshDataList'])

const visible = ref(false)
const roleList = ref<any[]>([])
const dataFormRef = ref()

const dataForm: dataFormType = reactive({
	id: '',
	realName: '',
  nickName: '',
  passWord: '',
  mobile: '',
  userAcct: '',
  roleIds: [],
  remark: '',
})

const init = (id?: string) => {
	visible.value = true
	dataForm.id = ''

	// 重置表单数据
	if (dataFormRef.value) {
		dataFormRef.value.resetFields()
	}

	// id 存在则为修改
	if (id) {
		getUser(id)
	} else {
    getRoleList()
  }
}

const userId = computed(() => store.userStore?.user.userId)

// 获取角色列表
const getRoleList = () => {
	return useRoleListApi({queryUserId: userId.value}).then(res => {
		roleList.value = res.data.userRoles
	})
}


// 获取信息
const getUser = (id: string) => {
	useUserApi(id).then(res => {
		Object.assign(dataForm, res.data)
    delete dataForm.passWord
    delete dataForm.roleIds
	})
}

const dataRules = ref({
	realName: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	nickName: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	passWord: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	mobile: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	userAcct: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	roleIds: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
})

// 表单提交
const submitHandle = () => {
	dataFormRef.value.validate((valid: boolean) => {
		if (!valid) {
			return false
		}
		useUserSubmitApi(dataForm).then(() => {
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
