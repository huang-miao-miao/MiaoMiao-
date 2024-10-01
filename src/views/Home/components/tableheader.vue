<template>
  <div class="header-button" >
    <el-upload
        class="upload-demo"
        action="#"
        :http-request = "handleRequest"
        :show-file-list= false
        :on-progress= "uploadVideoProcess"
        multiple
    >
        <el-button class="upload-button" type="primary">文件上传</el-button>
    </el-upload>
    <el-button @click= "changecreateFolder" type="success" icon="DocumentAdd">
        新建文件夹
    </el-button>
    <el-button @click= "deletefile" type="info" icon="DeleteFilled">
        批量删除
    </el-button>
    <el-button type="warning" icon="Rank">
        批量移动
    </el-button>
    <el-input
        v-model="input1"
        style="width: 240px;margin-left: 18px;"
        placeholder="请输入文件名搜索"
        class="fileselect"
    />
    <i @click="getFileList" class="iconfont icon-shuaxin" style="margin-left: 18px;cursor: pointer;"></i>
    </div>
    <div class="breadcrumb">
    <el-breadcrumb  separator="/">
        <el-breadcrumb-item v-for="(item,index) in breadcrumblist" style="cursor:pointer;" @click="breadcrumbclick(item,index)" :key="item.id">{{item.filename}}</el-breadcrumb-item>
    </el-breadcrumb>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>