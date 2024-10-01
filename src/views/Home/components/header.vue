<template>
    <div class="left">
        <i class="iconfont icon-wangpan"></i>
        <span>MiaoMiao网盘</span>
    </div>
    <div class="right">
        <i style="cursor:pointer;margin-right: 18px;" @click="changProgress" class="iconfont icon-paixu"></i>
        <span>admin</span>
    </div>
</template>

<script setup>
  const emit = defineEmits(['change-progress'])
  const changProgress = () => {
    emit('change-progress')
  }
</script>

<style lang="scss" scoped>
  
</style>