<script setup lang="ts">
import setting from '@/setting'
</script>

<template>
  <div style="width: 100%">
    <div class="container xl:text-20 lg:text-20 md:text-16 sm:text-13 xs:text-9">
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
  margin: auto;
  padding: 120px 0 50px;
  position: relative;

  p {
    // font-size: 64px;
    // font-family: "SourceHanSansCN-Bold" !important;
    // font-weight: 700;
    text-wrap: balance;
    //font-size: 5rem;
    font-style:italic;
    font-family: 'presentanthem-z86w1','Times New Roman', Times, serif;
    font-weight: 600 !important;
    // color: #222;
    @include font_color("themeSloganFontColor");
    position: relative;

    &::after {
      content: attr(data-text);
      position: absolute;
      top: 0;
      left: 0;
      background-image: linear-gradient(to right,
          rgb(236, 72, 153),
          rgb(239, 68, 68),
          rgb(234, 179, 8));
      background-clip: text;
      -webkit-background-clip: text;
      color: transparent;
      clip-path: ellipse(60px 60px at 0% 50%);
      animation: move 8s ease-in-out infinite;
    }
  }

  @keyframes move {
    50% {
      clip-path: ellipse(60px 60px at 100% 50%);
    }

    100% {
      clip-path: ellipse(60px 60px at 0% 50%);
    }
  }
}
</style>
