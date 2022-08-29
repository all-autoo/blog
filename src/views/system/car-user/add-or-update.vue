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
        <el-input v-model="dataForm.passWord" type="password" show-password auto-complete="new-password" :placeholder="dataForm.id?'默认为空不修改密码':'请输入密码'"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="dataForm.mobile" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item label="账号" prop="userAcct">
        <el-input v-model="dataForm.userAcct" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item prop="branchId" label="所属机构">
				<el-tree-select
					v-model="dataForm.branchId"
          check-strictly
					:data="orgList"
					value-key="id"
					:props="{ label: 'name', children: 'childBranch' }"
					style="width: 100%"
				/>
			</el-form-item>
      <el-form-item label="角色" prop="roleIds" v-if="!dataForm.id">
        <el-select v-model="dataForm.roleIds" placeholder="请选择角色" multiple clearable>
          <el-option v-for="item in roleList" :key="item.roleId" :label="item.roleName" :value="item.roleId">
          </el-option>
        </el-select>
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
import { useUserApi, parkUserSubmitApi } from '@/api/user'
import store from '@/store'
import { useRoleListApi } from '@/api/role'
import { useOrgListApi } from '@/api/orgs'
interface dataFormType {
  id?: string
	realName: string
  nickName: string
  passWord?: string
  mobile: string
  userAcct: string
  roleIds?: any[]
  branchId: string
  remark: string
}

const emit = defineEmits(['refreshDataList'])

const visible = ref(false)
const roleList = ref<any[]>([])
const orgList = ref([])
const dataFormRef = ref()

const dataForm: dataFormType = reactive({
	id: '',
	realName: '',
  nickName: '',
  passWord: '',
  mobile: '',
  userAcct: '',
  roleIds: [],
  branchId: '',
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
  getOrgList()
}

const userId = computed(() => store.userStore?.user.userId)

// 获取角色列表
const getRoleList = () => {
	useRoleListApi({queryUserId: userId.value}).then(res => {
		roleList.value = res.data.userRoles
	})
}

// 获取机构列表
const getOrgList = () => {
	useOrgListApi().then(res => {
		orgList.value = res.data
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
	branchId: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	roleIds: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
})

// 表单提交
const submitHandle = () => {
	dataFormRef.value.validate((valid: boolean) => {
		if (!valid) {
			return false
		}
		parkUserSubmitApi(dataForm).then(() => {
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
