<script setup lang="ts">
import { onMounted } from 'vue'
import { getAllTerms, getLessonsByTerm } from '@/api/LessonApi'

onMounted(async () => {
  const res = await getAllTerms()
  console.log(res.data)

  const lesson = await getLessonsByTerm('大二上')
  console.log(lesson)
})
</script>

<template>
  <div>SoftDownLoad.vue</div>
</template>

<style scoped lang="scss">
div {
  color: white;
}
</style>
