//路由鉴权:鉴权,项目当中路由能不能被的权限的设置(某一个路由什么条件下可以访问、什么条件下不可以访问)
import router from '@/router'
import setting from './setting'
// pnpm i progress 进度条
// @ts-ignore 渐变色：background-image: linear-gradient(to right, red, cyan, yellow, pink);
import nprogress from 'nprogress'
// 取消加载小球
nprogress.configure({ showSpinner: false })
// 引入进度条样式
import 'nprogress/nprogress.css'

// 全局前置守卫
router.beforeEach(async (to: any, from: any, next: any) => {
  console.log(from);
  document.title = `${setting.title} - ${to.meta.title}`
  nprogress.start()
  next()
})
// 全局后置守卫
router.afterEach(() => {
  nprogress.done()
})
