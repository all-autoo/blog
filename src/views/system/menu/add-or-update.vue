<template>
	<el-dialog v-model="visible" :title="!dataForm.id ? '新增' : '修改'" :close-on-click-modal="false">
		<el-form ref="dataFormRef" :model="dataForm" :rules="dataRules" label-width="120px" @keyup.enter="submitHandle()">
			<el-form-item prop="type" label="类型">
				<el-radio-group v-model="dataForm.permissionType" :disabled="!!dataForm.id" @change="menuTypeChange()">
					<el-radio :label="0">菜单</el-radio>
					<el-radio :label="1">按钮</el-radio>
					<el-radio :label="2">接口</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item prop="permissionName" label="菜单名称">
				<el-input v-model="dataForm.permissionName" placeholder="菜单名称"></el-input>
			</el-form-item>
			<el-form-item prop="parentId" label="上级菜单" class="popover-list">
				<el-popover ref="menuListPopover" v-model:visible="menuListVisible" placement="bottom-start" trigger="click" :width="400">
					<template #reference>
						<el-input v-model="dataForm.parentName" :readonly="true" placeholder="上级菜单" @click="menuListVisible = true">
							<template #suffix>
								<svg-icon v-if="dataForm.parentId !== '0'" icon="icon-close-circle" @click.stop="treeSetDefaultHandle()"></svg-icon>
							</template>
						</el-input>
					</template>
					<div>
						<el-tree
							ref="menuListTree"
							:data="menuList"
							:props="{ label: 'permissionName', children: 'children' }"
							node-key="id"
							:highlight-current="true"
							:expand-on-click-node="false"
							accordion
							@current-change="treeCurrentChange"
						>
						</el-tree>
					</div>
					<el-row justify="end">
						<el-button type="primary" link style="margin-right: 15px" @click="menuListVisible = false">关闭</el-button>
					</el-row>
				</el-popover>
			</el-form-item>
			<el-form-item v-if="dataForm.permissionType !== 1" prop="url" label="权限地址">
				<el-input v-model="dataForm.url" placeholder="请输入路由地址"></el-input>
			</el-form-item>
      <el-form-item v-if="dataForm.permissionType === 1" label="按钮类型" prop="buttonType">
        <el-select v-model="dataForm.buttonType" placeholder="请选择按钮类型">
          <el-option v-for="item in buttonTypeList" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
			<el-form-item prop="sort" label="排序">
				<el-input-number v-model="dataForm.orderNum" controls-position="right" :min="0" label="排序"></el-input-number>
			</el-form-item>
			<el-form-item v-if="dataForm.permissionType === 0" prop="icon" label="图标" class="popover-list">
				<el-popover
					ref="iconListPopover"
					v-model:visible="iconListVisible"
					placement="top-start"
					trigger="click"
					:width="450"
					popper-class="mod__menu-icon-popover"
				>
					<template #reference>
						<el-input v-model="dataForm.menuLogo" :readonly="true" placeholder="图标" @click="iconListVisible = true"> </el-input>
					</template>
					<div class="mod__menu-icon-inner">
						<div class="mod__menu-icon-list">
							<el-button v-for="(item, index) in iconList" :key="index" :class="{ 'is-active': dataForm.menuLogo === item }" @click="iconHandle(item)">
								<svg-icon :icon="item"></svg-icon>
							</el-button>
						</div>
					</div>
					<el-row justify="end">
						<el-button type="primary" link style="margin-right: 15px" @click="iconListVisible = false">关闭</el-button>
					</el-row>
				</el-popover>
			</el-form-item>
      <el-form-item v-if="dataForm.permissionType === 0" label="显示状态">
        <el-radio-group v-model="dataForm.hide">
          <el-radio v-for="dict in visibleOptions" :key="dict.value" :label="dict.value">{{dict.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="dataForm.remark" placeholder="请输入备注" maxlength="64" />
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
import { getIconList } from '@/utils/tool'
import { ElMessage } from 'element-plus/es'
import { useMenuApi, listMenu, addMenu, updateMenu } from '@/api/menu'
import { treeHandler } from '@/utils/tool'

const emit = defineEmits(['refreshDataList'])

const visible = ref(false)
const menuListVisible = ref(false)
const iconListVisible = ref(false)
const menuList = ref<any[]>([])
const iconList = ref<string[]>([])
const menuListTree = ref()
const dataFormRef = ref()

const dataForm = reactive({
	id: '',
	buttonType: "",
	hide: 0,
	menuLogo: "",
	orderNum: 0,
	parentId: "",
	parentName: "",
	permissionName: "",
	permissionType: 0,
	remark: "",
	url: ""
})

const buttonTypeList =  reactive([
    { value: "save", label: "新增" },
    { value: "update", label: "修改" },
    { value: "select", label: "查询" },
    { value: "delete", label: "删除" },
    { value: "up", label: "上传" },
    { value: "down", label: "下载" },
  ])

 const visibleOptions = reactive([
    { value: 0, label: "显示" },
    { value: 1, label: "隐藏" },
  ])

const init = (id?: number) => {
	visible.value = true
	dataForm.id = ''

	// 重置表单数据
	if (dataFormRef.value) {
		dataFormRef.value.resetFields()
	}

	// id 存在则为修改
	if (id) {
		getMenu(id)
	} else {
		treeSetDefaultHandle()
	}

	// 菜单列表
	getMenuList()

	// icon列表
	iconList.value = getIconList()
}

// 菜单类型改变
const menuTypeChange = () => {
	treeSetDefaultHandle()
}

// 获取菜单列表
const getMenuList = () => {
	listMenu({current: 1, size: 1000}).then(res => {
		const data = treeHandler(res.data.records)
    menuList.value = [{ id: "", permissionName: "主类目", children: data }]
	})
}

// 获取信息
const getMenu = (id: number) => {
	useMenuApi({id}).then(res => {
		Object.assign(dataForm, res.data)

		if (dataForm.parentId == '') {
			return treeSetDefaultHandle()
		}

		menuListTree.value.setCurrentKey(dataForm.parentId)
	})
}

// 上级菜单树, 设置默认值
const treeSetDefaultHandle = () => {
	dataForm.parentId = ''
	dataForm.parentName = '主类目'
}

const treeCurrentChange = (data: any) => {
	dataForm.parentId = data.id
	dataForm.parentName = data.permissionName
	menuListVisible.value = false
}

// 图标点击事件
const iconHandle = (icon: string) => {
	dataForm.menuLogo = icon
	iconListVisible.value = false
}

const dataRules = ref({
	permissionName: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
	url: [{ required: true, message: '必填项不能为空', trigger: 'blur' }],
})

// 表单提交
const submitHandle = () => {
	dataFormRef.value.validate((valid: boolean) => {
		if (!valid) {
			return false
		}
    let fn = dataForm.id ?  updateMenu : addMenu
		fn(dataForm).then(() => {
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
.mod__menu {
	::v-deep(.el-popover.el-popper) {
		overflow-x: hidden;
	}

	.popover-list {
		::v-deep(.el-input__inner) {
			cursor: pointer;
		}
		::v-deep(.el-input__suffix) {
			cursor: pointer;
		}
	}

	&-icon-inner {
		width: 100%;
		max-height: 260px;
		overflow-x: hidden;
		overflow-y: auto;
		// 滚动条的宽度
		&::-webkit-scrollbar {
			width: 8px;
			height: 8px;
			background: transparent;
		}
		// 滚动条的设置
		&::-webkit-scrollbar-thumb {
			background-color: #dddddd;
			background-clip: padding-box;
			min-height: 28px;
			border-radius: 4px;
		}
		&::-webkit-scrollbar-thumb:hover {
			background-color: #bbb;
		}
	}
	&-icon-list {
		width: 458px !important;
		padding: 0;
		margin: -8px 0 0 -8px;
		> .el-button {
			padding: 8px;
			margin: 18px 0 0 8px;
			> span {
				display: inline-block;
				vertical-align: middle;
				width: 18px;
				height: 18px;
				font-size: 18px;
			}
		}
	}
}
</style>
