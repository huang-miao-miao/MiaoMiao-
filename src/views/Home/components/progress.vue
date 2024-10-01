<template>
  <div class="title">上传任务</div>
    <div v-for="item in loadprogress" :key="item.id" class="itemprogress">
    <div class="itemprogresstitle">{{ item.filename }}</div>
    <el-progress :percentage= "item.progress" />
  </div>
</template>

<script setup>  
  import { useProgressStore } from '@/stores/loadprogress'
  import { storeToRefs } from 'pinia'
  const ProgressStore = useProgressStore()
  const {loadprogress} = storeToRefs(ProgressStore)
</script>

<style lang="scss" scoped>
  .title{
    height: 30px;
    line-height: 30px;
    padding-left: 10px;
    }
</style>