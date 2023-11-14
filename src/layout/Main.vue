<!-- 右侧Main 带过度动画写法 -->
<script setup lang="ts">
import { ref } from 'vue'

// 控制当前组件是否销毁重建
const flag = ref(true)
</script>

<script lang="ts">
export default {
  name: 'Main',
}
</script>

<template>
  <!-- 二级路由出口 -->
  <RouterView v-slot="{ Component }">
    <Component :is="Component" v-if="flag" />
  </RouterView>
</template>

<style style scoped lang="scss">
.fade-enter-from {
  /* 透明度 */
  opacity: 0;
  transform: scale(0);
}

.fade-enter-active {
  transition: all 0.3s;
}

.fade-enter-to {
  opacity: 1;
  transform: scale(1);
}
</style>
