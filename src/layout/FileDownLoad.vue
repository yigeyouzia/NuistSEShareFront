<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from 'vue'
import FileCard from '@/components/FileCard.vue'
import MirrorSideButton from '@/components/MirrorSideButton.vue'
import type { LessonDetail } from '@/types/FileData'
import { getAllTerms, getLessonsByTerm } from '@/api/LessonApi'
import { getPageLessons } from '@/api/FileDataApi.ts'
import type { label } from '@/types/Lesson.ts'

// 声明一个加载
const LessonsListInfo = ref<LessonDetail[]>([])
// const LessonsListInfoBack = ref<LessonDetail[]>([])
const loading = ref(true)

const readyForShow = ref(false)

// 关键词
const Keyword = ref<string>('')

const TermOptions = ref<label[]>([]) //  年级选项
const TermChoose = ref('') // 已选择年级
const LessonOptions = ref<label[]>([])
const LesssonChoose = ref('') // 已选择年级

// 1.分页查询
async function pageLessons() {
  const res = await getPageLessons(1, 100, TermChoose.value, LesssonChoose.value, Keyword.value)
  LessonsListInfo.value = res.data.records
}

watch(() => [TermChoose.value, LesssonChoose.value, Keyword.value], () => {
  pageLessons()
})

// 2.左侧分类删选
// 根据年级选获取课程列表
async function getLessons(term: string) {
  LesssonChoose.value = ''
  if (term === '')
    LessonOptions.value = []

  const res = await getLessonsByTerm(term)
  LessonOptions.value = res.data
}

watch(
  () => TermChoose.value,
  async (newVal: string) => {
    await getLessons(newVal)
  },
  { immediate: true, deep: true },
)

onMounted(async () => {
  nextTick(async () => {
    loading.value = true
    // 11
    const res = await getAllTerms()
    TermOptions.value = res.data
    await pageLessons()
    loading.value = false
  }).then(() => {
    readyForShow.value = true
  })
})
</script>

<template>
  <!-- <Pagination :loading="loading" :data-source="LessonsListInfo" no-data-msg="暂时没有数据捏☆*: .｡. o(≧▽≦)o .｡.:*☆👀👀"
    @loadData="loadLessons">
    <template #default="{ data }">
      <div>{{ data }}</div>
    </template>
  </Pagination> -->
  <div v-if="!readyForShow">
    <!-- 加载框 -->
    <div class="center">
      <div class="loading" style="font-size:xx-large" />
      <h2>加载中</h2>
    </div>
  </div>
  <div v-if="readyForShow" class="mx-2">
    <!-- 左侧 -->
    <div class="grid grid-cols-24">
      <div class="p-2 xl:block col-span-4 lg:block col-span-4 md:block col-span-4 sm:hidden xs:hidden hidden">
        <div class="source-choose w-full rounded-5" style="height:73vh;">
          <img src="../../public/logo.png" style="max-width: 100%; max-height: 100%;">
          <div class="p-5 font-bold">
            一共{{ LessonsListInfo.length }}条记录<br><small class="font-thin"
                                                        style="font-size:smaller"
            >滑动以查看更多⬆</small>
          </div>
          <div class="mt-1 pl-5 font-bold mb-3">
            添加筛选
          </div>
          <div>
            <ElSelect v-model="TermChoose" class="pl-5 mb-3 pr-2" placeholder="按年级筛选">
              <ElOption v-for="item in TermOptions" :key="item.label" :label="item.label" :value="item.value" />
            </ElSelect>

            <ElSelect v-model="LesssonChoose" class="pl-5 mb-3 pr-2" placeholder="按课程筛选">
              <ElOption v-for="item in LessonOptions" :key="item.label" :label="item.label" :value="item.value" />
            </ElSelect>
          </div>
        </div>
      </div>

      <!-- 右边的容器 -->
      <div class="p-2 xl:col-span-20 lg:col-span-20 md:col-span-20 sm:col-span-24 xs:col-span-24 col-span-24">
        <!-- 右容器 -->
        <div class="grid grid-cols-24">
          <!-- 选择资料类型 -->
          <div class="p-2 xl:col-span-12 xl:col-start-7 md:col-span-12 md:col-start-7 sm:block col-span-24 justify-end"
               style="height:60px;"
          >
            <div class="h-full w-full source-choose rounded">
              <div class="search-input">
                <MirrorSideButton class="mr-3 h-full" />
                <input v-model="Keyword" class="h-full rounded p-3 border-0 drop-shadow w-full"
                       placeholder="在这里搜索你的资料"
                >
              </div>
            </div>
          </div>

          <!-- 课程列表 -->
          <div class="sourcelist col-span-24">
            <div class="grid grid-cols-24">
              <div v-for="item in LessonsListInfo" :key="item.fileId"
                   class="p-2 md:col-span-12 col-span-24 xl:col-span-8"
              >
                <FileCard :file-info="item" class="source-list-item border-0" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<!-- >>>>>>> ee86719d919ff632e59ee2ded3e04352764b2819 -->

<style scoped lang="scss">
.sourcelist {
  height: 65vh;
  /* 隐藏垂直滚动条 */
  overflow-y: scroll;
  scrollbar-width: none;
  /* Firefox支持隐藏滚动条 */
  -ms-overflow-style: none;
  /* Internet Explorer支持隐藏滚动条 */

  /* 隐藏滚动条 -webkit-scrollbar 支持 WebKit 浏览器 */
  &::-webkit-scrollbar {
    width: 0;
    /* 设置滚动条宽度为 0.5em */
  }

  &::-webkit-scrollbar-thumb {
    background: transparent;
    /* 隐藏滚动条拇指（拖动部分） */
  }

}

.source-choose {
  @include background_color(themeBackgroundColor);
  @include font_color("themeFontColor");
}

.source-list-item {
  @include background_color(themeBackgroundColor);
  @include font_color("themeFontColor");
}

.source-list-item:hover {
  box-shadow: 0 0 10px rgb(229, 231, 231) inset, 0 0 10px rgb(219, 195, 216);
}

//加载动画的部分
.loading {
  position: relative;
  width: 48px;
  height: 48px;
  animation: satellite 3s infinite linear;
  border: 1px solid #000;
  border-radius: 100%;
}

.loading:before,
.loading:after {
  position: absolute;
  left: 1px;
  top: 1px;
  width: 12px;
  height: 12px;
  content: "";
  border-radius: 100%;
  background-color: #000;
  box-shadow: 0 0 10px #000;
}

.loading:after {
  right: 0;
  width: 20px;
  height: 20px;
  margin: 13px;
}

@keyframes satellite {
  from {
    transform: rotate(0) translateZ(0);
  }

  to {
    transform: rotate(360deg) translateZ(0);
  }
}

.center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.search-input {
  height: 100%;
  display: flex;
  padding-left: 230px;
  padding: 5px;

  input {
    @include background_color("themeBackgroundColor");
  }
}
</style>
