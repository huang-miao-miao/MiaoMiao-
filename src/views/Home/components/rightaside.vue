<template>
  <ul>
    <li @click="changelist(0)">
        <i class="iconfont icon-all"></i>
        <span>全部</span>
    </li>
    <li @click="changelist(1)">
        <i class="iconfont icon-shipin"></i>
        <span>视频</span>
    </li>
    <li @click="changelist(2)">
        <i class="iconfont icon-yinpin"></i>
        <span>音频</span>
    </li>
    <li @click="changelist(3)">
        <i class="iconfont icon-tupian"></i>
        <span>图片</span>
    </li>
    <li @click="changelist(4)">
        <i class="iconfont icon-wenjian"></i>
        <span>文档</span>
    </li>
    <li @click="changelist(5)">
        <i class="iconfont icon-qita"></i>
        <span>其他</span>
    </li>
  </ul>
</template>

<script setup>
  const emit = defineEmits(['get-anther-list'])
  const changelist = (i) => {
    emit('get-anther-list',i)
  }
</script>

<style lang="scss" scoped>
    li {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 18px;
        height: 18px;
        cursor: pointer;
        i{
            margin-right: 18px;
        }
    }
</style>