<script setup lang="ts">
import NuistTitleSearch from '@/components/NuistTitleSearch.vue'
import BirdButton from '@/components/BirdButton.vue'
import useLessonsStore from '@/store/modules/Lessons.ts'
import Slogan from '@/components/Slogan.vue'

// 使用仓库
const useLessons = useLessonsStore()
useLessons.getAllLessons()
</script>

<template>
  <div class="home">
    <NuistTitleSearch class="title-search" />
    <Slogan />
    <BirdButton class="bird-btn" />
  </div>
</template>

<style scoped lang="scss">
.home {

  .title-search {
    margin-top: 60px;
  }

  // .bird-btn {
  //   margin-bottom: 300px;
  // }
}
</style>
