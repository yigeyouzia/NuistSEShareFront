// 对外暴露配置路由(常量路由)
export const constantRoute = [
  // 1.主界面
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    name: 'layout',
    meta: {
      title: '主页',
      hidden: false,
      icon: '', // 菜单左侧图标
    },
    redirect: '/home',
    children: [
      // home
      {
        path: '/home',
        component: () => import('@/layout/Home.vue'),
        name: 'home',
        meta: {
          title: '主页',
          hidden: false,
          icon: '', // 菜单左侧图标
        },
      },
      // file
      {
        path: '/file',
        component: () => import('@/layout/FileDownLoad.vue'),
        name: 'file',
        meta: {
          title: '下载',
          hidden: false,
          icon: '', // 菜单左侧图标
        },
      },
      // soft
      {
        path: '/soft',
        component: () => import('@/layout/SoftDownLoad.vue'),
        name: 'soft',
        meta: {
          title: '软件',
          hidden: false,
          icon: '', // 菜单左侧图标
        },
      },
      {
        path: '/comment',
        component: () => import('@/layout/Comment.vue'),
        name: 'comment',
        meta: {
          title: '留言',
          hidden: false,
          icon: '', // 菜单左侧图标
        },
      },
    ],
  },
  {
    path: '/404',
    component: () => import('@/views/404.vue'),
    name: '404',
    meta: {
      title: '',
      hidden: false,
      icon: '', // 菜单左侧图标
    },
  },
  // 404
  {
    path: '/test',
    component: () => import('@/views/test.vue'),
    name: 'test',
    meta: {
      title: '',
      hidden: false,
      icon: '', // 菜单左侧图标
    },
  },
  // 任意
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'Any',
    meta: {
      title: '任意路由',
      hidden: true,
      icon: 'DataLine', // 菜单左侧图标
    },
  },
]
