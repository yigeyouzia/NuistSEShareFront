<script lang="ts" setup>
import { onMounted } from 'vue'
import router from '@/router/index.ts'

// 监听器，监听页面高度
function handleScroll() {
  const footer = document.getElementById('footerCore')
  const main = document.getElementById('main')
  const header = document.getElementById('header')
  if (header === null)
    return

  const headerHeight = Number.parseInt(window.getComputedStyle(header).height, 10)

  if (main === null)
    return

  const mainHeight = Number.parseInt(window.getComputedStyle(main).height, 10)

  const windowHeight = window.innerHeight

  if (footer === null)
    return

  if (mainHeight + headerHeight + 50 > windowHeight + 10)
    footer.style.position = ''
  else
    footer.style.position = 'fixed'
}

onMounted(() => {
  handleScroll()
  window.addEventListener('resize', handleScroll)
  router.afterEach(() => {
    handleScroll()
  })
})
</script>

<template>
  <div id="footerCore" class="footer">
    <div class="grid grid-cols-24">
      <div class="text-center col-span-12">
        <div class="font-thin mt-1 text-xs footer-font-color">
          Copyright &copy; 2023-2024 Nuist SE Share <br>
          <i class="font-italic right">All rights reserved</i>
        </div>
      </div>
      <div class="text-center col-span-12">
        <div class="font-thin mt-1 text-xs footer-font-color">
          Power By Alist.
          Thanks to：<br>
          <a class="footer-font-color" href="https://github.com/yigeyouzia" target="_blank">Yigeyouzia</a>&nbsp;<a
            class="footer-font-color" href="https://www.littlewith.top/" target="_blank"
          >Littlewith</a>
          &nbsp;<a class="footer-font-color" href="https://github.com/nottttrrrrr" target="_blank">Nottttrrrrr</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.footer-font-color {
  @include font-color(themeFooterFontColor);
}

.footer {
  margin-top: 20px;
  width: 100%;
  height: 45px;
  bottom: 0;
  @include background_color(themeBackgroundColor);
  @include font_color("themeFontColor");
}

.fixed-footer {
  position: fixed;
}

.right {
  font-size: xx-small;
}
</style>
