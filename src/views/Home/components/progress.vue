<template>
  <div class="title">上传任务</div>
  <div v-for="item in loadprogress" :key="item.id" class="itemprogress">
    <div class="itemprogresstitle">{{ item.filename }}</div>
    <div class="items">
      <el-progress :percentage= "item.progress" />
      <el-button @click="changeuploadstart(item.uid)" v-if="item.progress<100||check.value===1" type="primary" size="small" :icon="VideoPlay" circle />
      <el-button @click="changeuploadpause(item.uid)" v-if="item.progress<100||check.value===0" type="primary" size="small" :icon="VideoPause" circle />
      <el-button v-if="item.progress<100" type="primary" :icon="Close" circle />
      <el-button @click="deleteitem(item.uid)" v-if="item.progress===100" type="primary" :icon="Delete" circle />
    </div>
  </div>
</template>

<script setup>  
  import { ref } from 'vue'
  import {VideoPlay,VideoPause,Close,Delete} from '@element-plus/icons-vue'
  import { useProgressStore } from '@/stores/loadprogress'
  import { storeToRefs } from 'pinia'
  import { useOptionStore } from '@/stores/option';
  const OptionStore = useOptionStore()
  const ProgressStore = useProgressStore()
  const {loadprogress} = storeToRefs(ProgressStore)
  const check = ref(0)
  const emit = defineEmits(['restart-upload'])
  const changeuploadpause = (uid) => {
    check.value=1
    ProgressStore.setfilepause(uid)
  }
  const changeuploadstart = (uid) => {
    check.value=0
    ProgressStore.setfilestart(uid)
    console.log(uid)
    emit('restart-upload',uid)
  }
  const deleteitem = (uid) => {
    ProgressStore.deleteitem(uid)
    OptionStore.deleteitem(uid)
  }
</script>

<style lang="scss" scoped>
  .title{
    height: 30px;
    line-height: 30px;
    padding-left: 10px;
    }
</style>