<script setup lang="ts">
import setting from '@/setting'
</script>

<template>
  <div style="width: 100%">
    <div class="container">
      <p :data-text="setting.title">
        {{ setting.title }}
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 100px 0 60px;
  //   background-color: #000;
  //   position: relative;

  p {
    font-size: 64px;
    font-weight: 500;
    // color: #222;
    // color: rgb(217, 103, 122);
    color: #4d538d;
    position: relative;

    &::before {
      content: attr(data-text);
      position: absolute;
      //   初始文字颜色
      color: #fff;
      //   color: #4d538d;
      overflow: hidden;
      white-space: nowrap;
      border-right: 4px solid #fff;
      animation: move 8s linear infinite;
      filter: drop-shadow(0 0 20px #fff) drop-shadow(0 0 50px #fff);
    }

    @keyframes move {

      0%,
      10%,
      100% {
        width: 0;
      }

      70%,
      90% {
        width: 100%;
      }
    }
  }
}
</style>
