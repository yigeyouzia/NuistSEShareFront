<script setup lang="ts">
import NoData from '@/components/Pagination/NoData.vue'

const props = defineProps({
  dataSource: {
    type: Object,
  },
  loading: {
    type: Boolean,
  },
  noDataMsg: {
    type: String,
    default: '空空如也',
  },
})

// 改变页码方法
const emit = defineEmits(['loadData'])
function handlePageNoChange(pageNo: any) {
  //   改变页码
  console.log(pageNo)
  //   调用父组件方法重新载入数据
  emit('loadData')
}
</script>

<template>
  <!-- 数据集合组件 利用分页 -->
  <!-- 4显示无数据 -->
  <div v-if="props.loading && props.dataSource != null && props.dataSource.length == 0">
    <NoData :msg="noDataMsg" />
  </div>
  <!-- 3骨架 -->
  <div v-if="props.loading" class="skeleton">
    <ElSkeleton :row="2" animated />
  </div>
  <!-- 1数据插槽  -->
  <div v-for="item in dataSource" v-if="loading">
    <slot :data="item" />
  </div>
  <!-- 2分页组件 -->
  <div class="pagination">
    <!-- v-if="dataSource.pageTotal > 1" -->
    <el-pagination background layout="prev, pager, next" style="text-align: right" :page-size="15"
      @current-change="handlePageNoChange" />
  </div>
</template>

<style lang="scss">
.pagination {
  padding: 10px 0px 10px 10px;
}

.skeleton {
  padding: 15px;
}
</style>
