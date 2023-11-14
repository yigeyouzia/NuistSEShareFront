import { createRouter, createWebHashHistory } from 'vue-router'

// 小仓库

// RouteRecordRaw
import { constantRoute } from './routes'

// footer处理

// 创建路由器
const router = createRouter({
  // 路由模式
  history: createWebHashHistory(),
  // history: createWebHistory(),
  routes: constantRoute,
  //   滚动行为
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    }
  },
})

export default router
