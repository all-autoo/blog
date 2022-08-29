import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import { registerStore } from './store'
import { directive } from './utils/directive'
import { router } from './router'
import { i18n } from './i18n'
import { getLabel } from "@/utils/tool";
import 'virtual:svg-icons-register'

import '@/icons/iconfont/iconfont'
import '@/styles/index.scss'
import 'element-plus/theme-chalk/src/message.scss'
import 'element-plus/theme-chalk/src/message-box.scss'

import FastTableColumn from '@/components/fast-table-column'
import FastRadioGroup from '@/components/fast-radio-group'
import FastSelect from '@/components/fast-select'

const app = createApp(App)

// 挂载全局方法
app.config.globalProperties.$getLabel = getLabel

app.use(createPinia())
// 注册 Pinia
registerStore()
// 注册 自定义指令
directive(app)
app.use(router)
app.use(i18n)
app.use(FastTableColumn)
app.use(FastRadioGroup)
app.use(FastSelect)
app.mount('#app')
