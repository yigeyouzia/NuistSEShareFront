<!-- //文件下载显示面板 -->
<script lang="ts" setup>
import type { PropType } from 'vue'
import { h, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { LessonDetail } from '@/types/FileData'

const props = defineProps({
  // 定义props
  fileInfo: {
    type: Object as PropType<LessonDetail>,
    // eslint-disable-next-line vue/require-valid-default-prop
    default: {},
  },
})

const dialogVisible = ref(false)

const filePath = `${props.fileInfo.fileTerm} / ${props.fileInfo.fileBelongsToLesson} / ${props.fileInfo.fileType}`
const fileSize = Number.parseFloat((props.fileInfo.fileSize as number / 1024 / 1024).toFixed(2))
const downloadMessage = {
  success: '已经开始下载！',
  fail: '下载失败！',
}

function fileDownload(url: string) {
  const a = document.createElement('a')
  a.href = url
  a.style.display = 'none'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

function handleDownload() {
  ElMessageBox({
    title: '选择下载源',
    message: h('p', null, [
      h('input', {
        type: 'radio',
        checked: true,
      }),
      h('span', null, '源：Littlewith 的 Alist'),
    ]),
    showCancelButton: true,
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    beforeClose: (action, instance, done) => {
      if (action === 'confirm') {
        instance.confirmButtonLoading = true
        instance.confirmButtonText = 'Loading...'

        // 获取下载链接并且解析
        async function startdownload(): Promise<string> {
          // const downloadUrl: LessonLink = await LessonDownload(Number(fileId))
          // return downloadUrl
          return props.fileInfo?.filePath
        }
        startdownload().then((resp) => {
          const finalDownloadLink = resp
          console.log(finalDownloadLink)
          // window.open(finalDownloadLink.toString())
          fileDownload(finalDownloadLink.toString())
        }).then(() => {
          ElMessage({
            type: 'success',
            message: `${downloadMessage.success}`,
          })
          dialogVisible.value = false
          done()
        }).catch(() => {
          // catch error
          ElMessage({
            type: 'error',
            message: `${downloadMessage.fail}`,
          })
          dialogVisible.value = false
          done()
        })
      }
      else {
        done()
      }
    },
  }).catch(() => {
    console.log('用户取消')
  })
}
</script>

<template>
  <ElButton class="downbutton border-0 mx-1 p-4" @click="dialogVisible = true">
    <ElIcon>
      <Download />
    </ElIcon>
    点击下载
  </ElButton>

  <ElDialog v-model="dialogVisible" title="文件信息" width="40%" class="download-card">
    <span class="font-semibold font-size-5">{{ fileInfo.fileName }}</span><br><br>
    <p><span class="font-semibold font-size-4">>></span>{{ filePath }}</p><br><br>
    <p><span class="font-semibold">文件大小</span>{{ fileSize }}MB</p><br>
    <span class="font-semibold">你确认下载该文件吗?</span><br><br>
    <template #footer>
      <span class="dialog-footer">
        <ElButton @click="dialogVisible = false">取消</ElButton>
        <ElButton type="primary" @click="handleDownload">
          立即下载
        </ElButton>
      </span>
    </template>
  </ElDialog>
</template>

<style scoped lang="scss">
.dialog-footer button:first-child {
  margin-right: 10px;
}

.download-card {
  background-image: url("http://images.hipc.cn/color/hipc_22031890.png") !important;
  @include background_color(themeBackgroundColor);
}

.downbutton {
  @include background_color(themeDowncardButtonColor);
  @include font_color(themeFontColor);
}

.downbutton:hover {
  transform: translateY(-3px);
}
</style>
