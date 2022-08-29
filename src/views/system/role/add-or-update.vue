<template>
	<el-dialog v-model="visible" :title="!dataForm.id ? '新增' : '修改'" :close-on-click-modal="false">
		<el-form ref="dataFormRef" :model="dataForm" :rules="dataRules" label-width="120px" @keyup.enter="submitHandle()">
			<el-form-item prop="roleName" label="名称">
				<el-input v-model="dataForm.roleName" placeholder="名称"></el-input>
			</el-form-item>
			<el-form-item prop="remark" label="备注">
				<el-input v-model="dataForm.remark" placeholder="备注"></el-input>
			</el-form-item>
      <el-form-item label="菜单权限" v-if="!dataForm.id">
        <el-checkbox v-model="allSelect" label="全选/全不选" @change="changeAll"/>
        <div class="form-tree">
          <el-tree ref="menuListTree" :data="menuList" :default-checked-keys="defaultKey" :props="{ label: 'permissionName', children: 'childs' }" node-key="id" accordion show-checkbox>
         </el-tree>
        </div>
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
import { useRoleApi, useRoleSubmitApi } from '@/api/role'
import { queryMenuPermissionTree } from '@/api/menu'

const emit = defineEmits(['refreshDataList'])

const visible = ref(false)
const menuList = ref([])
const defaultKey = ref([])
const menuListTree = ref()
const dataFormRef = ref()
const allSelect = ref(false)

const dataForm = reactive({
	id: '',
	roleName: '',
	permissionIds: [] as any[],
	remark: ''
})

const init = (id?: number) => {
	visible.value = true
	dataForm.id = ''

	// 重置表单数据
	if (dataFormRef.value) {
		dataFormRef.value.resetFields()
	}
	if (menuListTree.value) {
		menuListTree.value.setCheckedKeys([])
	}

	// id 存在则为修改
	if (id) {
		getRole(id)
	}

	// 菜单列表
	getMenuList()
}

// 默认选择首页
  const defaultHome = () => {
    menuList.value.forEach((item: any) => {
      if (item.permissionName === '系统首页') {
        item.disabled = true
        defaultKey.value = [item.id] as any
      }
    })
  }

// 获取菜单列表
const getMenuList = () => {
	queryMenuPermissionTree().then(res => {
		menuList.value = res.data
    defaultHome()
	})
}

// 获取信息
const getRole = (id: number) => {
	useRoleApi(id).then(res => {
		Object.assign(dataForm, res.data)

		dataForm.permissionIds.forEach(item => menuListTree.value.setChecked(item, true))
	})
}

const dataRules = ref({
	roleName: [{ required: true, message: '必填项不能为空', trigger: 'blur' }]
})

const changeAll = (e: boolean) => {
  menuListTree.value!.setCheckedKeys(e ? menuList.value.map((item: any) => item.id) : [])
  defaultHome()
}

// 表单提交
const submitHandle = () => {
	dataFormRef.value.validate((valid: boolean) => {
		if (!valid) {
			return false
		}
    if (!dataForm.id) {
      dataForm.permissionIds = [...menuListTree.value.getCheckedKeys()]
    }

		useRoleSubmitApi(dataForm).then(() => {
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
  .form-tree {
    width: 100%;
    margin-top: 5px;
    border: 1px solid #e5e6e7;
    background: #fff none;
    border-radius: 4px;
  }
</style>
