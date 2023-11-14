<script setup lang="ts">
// import NuistTitle from "@/components/NuistTitle.vue";
import { onMounted, ref, watch } from 'vue'
import { Moon, Sunny } from '@element-plus/icons-vue'
import { useRoute, useRouter } from 'vue-router'
//import { useDark, useToggle } from '@vueuse/core'
import Footer from './Footer.vue'
import Main from './Main.vue'

// unocss dark模式
// const isDark = useDark()
// const toggleDark = useToggle(isDark)

// 路由器对象
const $router = useRouter()
// 路由对象
const $route = useRoute()

// 当前路由名字
const name = ref($route.name)

watch(
  () => $route.name,
  () => {
    name.value = $route.name
  },
  { immediate: true, deep: true },
)

function goRoute(num: number) {
  // 路由跳转
  if (num === 1)
    $router.push({ path: '/home' })
  else if (num === 2)
    $router.push({ path: '/file' })
  else if (num === 3)
    $router.push({ path: '/soft' })
  else
    $router.push({ path: '/comment' })
}

// 主题
const theme = ref(true)
// 主题绑定
watch(theme, (newTheme) => {
  if (newTheme)
    window.document.documentElement.setAttribute('data-theme', 'light')
  else
    window.document.documentElement.setAttribute('data-theme', 'dark')
})

// 上述主题不会自动挂载，这里使用钩子函数手动触发
onMounted(() => {
  const now = new Date()
  if (now.getHours() >= 18 || now.getHours() < 6) {
    window.document.documentElement.setAttribute('data-theme', 'dark')
    theme.value = false
  }
  else {
    window.document.documentElement.setAttribute('data-theme', 'light')
    theme.value = true
  }
})
</script>

<template>
  <div class="layout_container">
    <div class="layout_tabber" id="header">
      <div class="tabber_item xs:text-sm sm:text-sm text-sm" :class="{ route: name === 'home' ? true : false }"
        @click="goRoute(1)">
        主页
      </div>
      <div class="tabber_item  xs:text-sm sm:text-sm text-sm" :class="{ route: name === 'file' ? true : false }"
        @click="goRoute(2)">
        文件下载
      </div>
      <div class="tabber_item  xs:text-sm sm:text-sm text-sm" :class="{ route: name === 'soft' ? true : false }"
        @click="goRoute(3)">
        软件下载
      </div>
      <div class="tabber_item  xs:text-sm sm:text-sm text-sm" :class="{ route: name === 'contact' ? true : false }"
        @click="goRoute(4)">
        留言
      </div>
      <ElSwitch v-model="theme" :active-action-icon="Sunny" :inactive-action-icon="Moon" class="theme-change" />
    </div>

    <div id="main">
      <Main />
    </div>

    <div id="footer">
      <Footer />
    </div>

  </div>
</template>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;
  //background-color: $base-index-backgroud-color;

  .layout_tabber {
    display: flex;
    height: 40px;
    // background-color: #fff;
    text-align: center;
    align-items: center;
    box-shadow: 0 4px 7px -5px;
    @include background_color("themeBackgroundColor");

    .tabber_item {
      //font-style: italic;
      font-weight: bold;
      margin-left: 6px;
      @include font_color("themeFontColor");
      padding: 7px;
      cursor: pointer;
    }

    .tabber_item:hover {
      border-bottom: 3px solid rgb(206, 83, 83);
    }

    .theme-change {
      margin-left: 15px;
      @include font_color("themeFontColor");
      padding: 7px;
      cursor: pointer;
    }

    .route {
      border-bottom: 3px solid rgb(206, 83, 83);
    }

    background-size: $base-index-background-size;

  }

  // .layout_main {
  // position: absolute;
  // left: 50%;
  // top: 35%;
  // transform: translate(-50%, -50%);
  // }
}
</style>
