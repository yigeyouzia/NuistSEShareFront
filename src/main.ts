import { createApp } from 'vue'
import App from '@/App.vue'

// 1element ui
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// @ts-expect-error忽略当前文件ts类型的检测否则有红色提示(打包会失败)
import zhCn from 'element-plus/dist/locale/zh-cn.mjs' // 国际化

// 2svg 插件
import 'virtual:svg-icons-register'

// 3引入自定义插件对象，注册全局组件

// 4.路由
import router from './router'

// 6.引入全局样式
import '@/styles/index.scss'
//import '@/styles/style.css'
import 'uno.css'

// import 'virtual:uno.css'

// 8引入pinia
import pinia from './store'
import globalComponent from '@/components'
import './permission'

const app = createApp(App)

// 1安装ele
app.use(ElementPlus, {
  locale: zhCn,
})

// 2.安装自定义插件
app.use(globalComponent)
// 4.路由注册
app.use(router)
// 8注册pinia
app.use(pinia)

app.mount('#app')
