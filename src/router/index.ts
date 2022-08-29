import { createRouter, createWebHistory, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store'
import { i18n } from '@/i18n'
import { pathToCamel } from '@/utils/tool'

NProgress.configure({ showSpinner: false })

const constantRoutes: RouteRecordRaw[] = [
	{
		path: '/redirect',
		component: () => import('../layout/index.vue'),
		children: [
			{
				path: '/redirect/:path(.*)',
				component: () => import('../layout/components/Router/Redirect.vue')
			}
		]
	},
	{
		path: '/login',
		component: () => import('../views/login/login.vue')
	},
	{
		path: '/404',
		component: () => import('../views/404.vue')
	}
]

const asyncRoutes: RouteRecordRaw = {
	path: '/',
	component: () => import('../layout/index.vue'),
	redirect: '/home',
	children: [
		{
			path: '/home',
			name: 'Home',
			component: () => import('../views/home.vue'),
			meta: {
				title: i18n.global.t('router.home'),
				affix: true
			}
		},
		{
			path: '/profile/password',
			name: 'ProfilePassword',
			component: () => import('../views/profile/password.vue'),
			meta: {
				title: i18n.global.t('router.profilePassword'),
				cache: true
			}
		}
	]
}

// 配置常量菜单
export const constantMenu = [
  {
    name: '系统首页',
		url: '/home',
		path: '/home',
		icon: 'dashboard',
  },
  {
    name: '用户管理',
		url: null,
		path: '/user',
		icon: 'icon-user',
		children: [
      {
        name: '用户列表',
				url: '/user/index',
				path: '/user/index',
				icon: 'icon-user'
      },
      {
        name: '用户详情',
				url: '/user/detail',
				path: '/user/detail',
				icon: 'icon-user',
        hidden: true
      }
    ]
  },
  {
    name: '停车场管理',
		url: null,
		path: '/car-park',
		icon: 'icon-car',
		children: [
      {
        name: '停车场列表',
				url: '/car-park/index',
				path: '/car-park/index',
				icon: 'icon-car'
      },
      {
        name: '停车场详情',
				url: '/car-park/detail',
				path: '/car-park/detail',
				icon: 'icon-car',
        hidden: true
      }
    ]
  },
  {
    name: '订单缴费管理',
		url: null,
		path: '/order-pay',
		icon: 'icon-order',
		children: [
      {
        name: '订单缴费列表',
				url: '/order-pay/index',
				path: '/order-pay/index',
				icon: 'icon-order'
      }
    ]
  },
  {
    name: '发票管理',
		url: null,
		path: '/invoice',
		icon: 'icon-invoice',
		children: [
      {
        name: '发票列表',
				url: '/invoice/index',
				path: '/invoice/index',
				icon: 'icon-invoice'
      }
    ]
  },
  {
		name: '系统设置',
		url: null,
		path: '/system',
		icon: 'icon-windows',
		children: [
			{
				name: '用户管理',
				url: '/system/user/index',
				path: '/system/user/index',
				icon: 'icon-unorderedlist'
			},
			{
				name: '停车场用户',
				url: '/system/car-user/index',
				path: '/system/car-user/index',
				icon: 'icon-unorderedlist'
			},
			{
				name: '角色管理',
				url: '/system/role/index',
				path: '/system/role/index',
				icon: 'icon-unorderedlist'
			},
			{
				name: '机构管理',
				url: '/system/org/index',
				path: '/system/org/index',
				icon: 'icon-unorderedlist'
			},
			{
				name: '菜单管理',
				url: '/system/menu/index',
				path: '/system/menu/index',
				icon: 'icon-unorderedlist'
			}
    ]

  },
	// {
	// 	id: 1000,
	// 	name: 'Demo',
	// 	url: null,
	// 	path: '/demo',
	// 	openStyle: 0,
	// 	icon: 'icon-windows',
	// 	children: [
	// 		{
	// 			id: 1001,
	// 			name: 'Icon 图标',
	// 			url: '/demo/icons/index',
	// 			path: '/demo/icons/index',
	// 			openStyle: 0,
	// 			icon: 'icon-unorderedlist'
	// 		},
	// 		{
	// 			id: 1002,
	// 			name: '二维码生成',
	// 			url: '/demo/qrcode/index',
	// 			path: '/demo/qrcode/index',
	// 			openStyle: 0,
	// 			icon: 'icon-unorderedlist'
	// 		},
	// 		{
	// 			id: 1003,
	// 			name: '页面打印',
	// 			url: '/demo/printJs/index',
	// 			path: '/demo/printJs/index',
	// 			openStyle: 0,
	// 			icon: 'icon-unorderedlist'
	// 		},
	// 		{
	// 			id: 1004,
	// 			name: '图片裁剪',
	// 			url: '/demo/cropper/index',
	// 			path: '/demo/cropper/index',
	// 			openStyle: 0,
	// 			icon: 'icon-unorderedlist'
	// 		},
	// 		{
	// 			id: 1005,
	// 			name: '富文本编辑器',
	// 			url: '/demo/wangeditor/index',
	// 			path: '/demo/wangeditor/index',
	// 			openStyle: 0,
	// 			icon: 'icon-unorderedlist'
	// 		}
	// 	]
	// }
]

export const errorRoute: RouteRecordRaw = {
	path: '/:pathMatch(.*)',
	redirect: '/404'
}

export const router = createRouter({
	history: createWebHashHistory(),
	routes: constantRoutes
})

// 白名单列表
const whiteList = ['/login']

// 路由加载前
router.beforeEach(async (to, from, next) => {
	NProgress.start()

	// token存在的情况
	if (store.userStore.token) {
		if (to.path === '/login') {
			next('/home')
		} else {      
      
			// 用户信息不存在，则重新拉取用户等信息
			if (!store.userStore.user.userId) {
				await store.userStore.getUserInfoAction()
				// await store.appStore.getDictListAction()
				const menuRoutes = await store.routerStore.getMenuRoutes()
        
				// 根据后端菜单路由，生成KeepAlive路由
				const keepAliveRoutes = await getKeepAliveRoutes(menuRoutes, [])
        
				// 添加菜单路由
				asyncRoutes.children?.push(...keepAliveRoutes)
				router.addRoute(asyncRoutes)
        router.options.routes.push(asyncRoutes)
        
				// 错误路由
				router.addRoute(errorRoute)
        
				// 保存路由数据
				await store.routerStore.setRoutes(constantRoutes.concat(asyncRoutes))
        
				next({ ...to, replace: true })
			} else {
        // await store.userStore.getAuthorityListAction(to.meta.id || "479958025143058432")
				next()
			}
		}
	} else {
		// 没有token的情况下，可以进入白名单
		if (whiteList.indexOf(to.path) > -1) {
			next()
		} else {
			next('/login')
		}
	}
})

// 路由加载后
router.afterEach(() => {
	NProgress.done()
})

// 获取扁平化路由，将多级路由转换成一级路由
export const getKeepAliveRoutes = (rs: RouteRecordRaw[], breadcrumb: string[]): RouteRecordRaw[] => {
	const routerList: RouteRecordRaw[] = []

	rs.forEach((item: any) => {
		if (item.meta.title) {
			breadcrumb.push(item.meta.title)
		}

		if (item.children && item.children.length > 0) {
			routerList.push(...getKeepAliveRoutes(item.children, breadcrumb))
		} else {
			item.meta.breadcrumb.push(...breadcrumb)
			routerList.push(item)
		}

		breadcrumb.pop()
	})
	return routerList
}

// 加载vue组件
const layoutModules = import.meta.glob('/src/views/**/*.vue')

// 根据路径，动态获取vue组件
const getDynamicComponent = (path: string): any => {
  
	let component: any = layoutModules[`/src/views${path}.vue`]
	if (!component) {
		console.error('组件不存在，路径为：', path)
	}
  
	return component
}

// 根据菜单列表，生成路由数据
export const generateRoutes = (menuList: any): RouteRecordRaw[] => {
	const routerList: RouteRecordRaw[] = []

	menuList.forEach((menu: any) => {
		let component
		let path
		if (menu.children && menu.children.length > 0) {
			component = () => import('@/layout/index.vue')
			path =  menu.path
		} else {
			component = getDynamicComponent(menu.path)
			path = menu.path
		}
    
		const route: RouteRecordRaw = {
			path: path,
			name: pathToCamel(path),
			component: component,
			children: [],
			meta: {
				title: menu.name,
				icon: menu.icon,
				id: '' + menu.id,
				cache: true,
				_blank: menu.openStyle === 1,
				breadcrumb: [],
        hidden: menu.hidden
			}
		}

		// 有子菜单的情况
		if (menu.children && menu.children.length > 0) {
			route.children?.push(...generateRoutes(menu.children))
		}

		routerList.push(route)
	})

	return routerList
}
