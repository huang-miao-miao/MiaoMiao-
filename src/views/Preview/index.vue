<template>
  <vue-office-docx
        :src="fileUrl"
        v-if= 'filecategory==="6"'
        style="height: 100vh;"
        @rendered= "renderedHandler"
        @error= "errorHandler"
    />
    <vue-office-pdf
        :src="fileUrl"
        v-if= 'filecategory==="7"'
        style="height: 100vh;"
        @rendered="rendered"
        @error="errorHandler"
      />
      <vue-office-excel
        :src="fileUrl"
        v-if= 'filecategory==="8"'
        style="height: 100vh;"
        @rendered="rendered"
        @error="errorHandler"
      />
      <img v-if='filecategory==="3"' :src="fileUrl" />
      <video v-if='filecategory==="1"' controls width="250">
        <source :src="fileUrl" type="video/webm" />
      </video>
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
const filecategory = ref(6) 
const fileUrl = ref('')  //设置文档网络地址，可以是相对地址
// docx作为参数通过父组件传参
const renderedHandler=()=>{
  console.log("渲染完成")
}
const errorHandler=()=>{
  console.log("渲染失败")
}
onMounted(() => {
  fileUrl.value = route.query.url
  filecategory.value = route.query.category
})
</script>

<style lang="scss" scoped>

</style>