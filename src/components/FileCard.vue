<script lang="ts" setup>
import type { PropType } from 'vue'
import FileDownloadButton from '@/components/FileDownloadButton.vue'
import type { LessonDetail } from '@/types/FileData'

// 对原来的数据进行整理
const props = defineProps({
  // 定义props
  fileInfo: {
    type: Object as PropType<LessonDetail>,
    default: {},
  },
})
</script>

<template>
  <ElCard shadow="always" class="h-35">
    <p class="">
      {{ props.fileInfo.fileName }}
    </p>
    <p class="">
      文件大小:{{ parseFloat((props.fileInfo.fileSize as number / 1024 / 1024).toFixed(2)) }} MB
    </p>
    <p>
      {{
        `${props.fileInfo.fileTerm} / ${props.fileInfo.fileBelongsToLesson} / ${props.fileInfo.fileType}`
      }}
    </p><br>
    <FileDownloadButton :file-info="props.fileInfo" />
  </ElCard>
</template>
@/types/FileData
