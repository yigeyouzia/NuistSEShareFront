<script setup lang="ts">
const props = defineProps({
  msg: {
    type: String,
  },
})
</script>

<template>
  <div class="no-data">
    <div class="iconfont icon-empty" />
    <div class="msg">
      {{ props.msg }}
    </div>
  </div>
</template>

<style lang="scss">
.no-data {
  text-align: center;
  padding: 10px 0px;

  .icon-empty {
    font-size: 50px;
    color: #bbb;
  }

  .msg {
    margin-top: 10px;
    color: #909399;
    font-size: 14px;
  }
}
</style>
