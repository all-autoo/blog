import type { App, Plugin } from 'vue'

// 把路径转换成驼峰命名
export const pathToCamel = (path: string): string => {
	return path.replace(/\/(\w)/g, (all, letter) => letter.toUpperCase())
}

// 获取svg图标(id)列表
export const getIconList = (): string[] => {
	const rs: string[] = []
	const list = document.querySelectorAll('svg symbol')
  console.log(list);
  
	for (let i = 0; i < list.length; i++) {
		rs.push(list[i].id)
	}
	return rs
}

// 获取字典Label
export const getDictLabel = (dictList: any[], dictType: string, dictValue: string) => {
	const type = dictList.find((element: any) => element.dictType === dictType)
	if (type) {
		const val = type.dataList.find((element: any) => element.dictValue === dictValue + '')
		if (val) {
			return val.dictLabel
		} else {
			return dictValue
		}
	} else {
		return dictValue
	}
}

// 获取字典数据列表
export function getDictDataList(dictList: any[], dictType: string) {
	const type = dictList.find((element: any) => element.dictType === dictType)
	if (type) {
		return type.dataList
	} else {
		return []
	}
}

// 全局组件安装
export const withInstall = <T>(component: T, alias?: string) => {
	const comp = component as any
	comp.install = (app: App) => {
		app.component(comp.name || comp.displayName, component)
		if (alias) {
			app.config.globalProperties[alias] = component
		}
	}
	return component as T & Plugin
}

// 权限树处理
export const treeHandler = (data: any[]) => {
  const newData = data.filter(item => !item.parentId)
  data.forEach(item => {
    if (item.parentId) {
      const itemParent = newData.find(f => f.id === item.parentId)
      if (itemParent.children) {
        itemParent.children.push(item)
      } else {
        itemParent.children = [item]
      }
    }
  })
  return newData
}

 
//根据常量value获取常量label
/**
 * 获取label值
 * @param {string} str
 * @param {Array} data
 * @param {string} label
 * @param {string | number} value
 */
 export const getLabel = (key: string, data: any[], label: string = 'label', value: string|number = 'value') => {
  if (!String(key)) return ''
  const newObj = data.find(item => String(item[value]) === String(key))
  const returnValue = newObj ? newObj[label] : ''
  return returnValue
}