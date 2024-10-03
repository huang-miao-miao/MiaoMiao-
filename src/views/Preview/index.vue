<template>
  <vue-office-docx
        :src="docx"
        style="height: 100vh;"
        @rendered= "renderedHandler"
        @error= "errorHandler"
    />
    <!-- <vue-office-pdf
        :src="fileUrl"
        style="height: 100vh;overflow: auto"
        @rendered="rendered"
        @error="errorHandler"
        :options="{
          width: '100%',
          overflow: 'auto'
        }"
      /> -->
</template>

<script setup>
import {  onMounted, ref } from "vue";
// 引入VueOffice组件
import VueOfficeDocx from '@vue-office/docx';
import VueOfficeExcel from '@vue-office/excel';
import VueOfficePdf from '@vue-office/pdf';
// 引入相关样式
import '@vue-office/docx/lib/index.css';
import '@vue-office/excel/lib/index.css';
import { useRoute } from 'vue-router'

const route = useRoute()

const docx=ref('') //设置文档网络地址，可以是相对地址
const fileUrl = ref('')
// docx作为参数通过父组件传参
const renderedHandler=()=>{
  console.log("渲染完成")
}
const errorHandler=()=>{
  console.log("渲染失败")
}
onMounted(() => {
  console.log(route)
  docx.value = route.query.url
})
</script>

<style lang="scss" scoped>

</style>