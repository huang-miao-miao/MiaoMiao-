<template>
  <div class="home-index">
    <el-container class="container-father">
      <el-header class="header">
        <Header @change-progress= "changeshowtransform" />
      </el-header>
      <el-container class="buttom">
        <el-aside width="100px" class="buttom-left">
          <LeftAside />
        </el-aside>
        <el-container class="buttom-right">
          <el-aside class="buttom-right-left" width="150px">
            <RightAside @get-anther-list = "getMovieFileList" />
          </el-aside>
          <el-container class="buttom-right-right">
            <el-header height="80px">
              <TableHeader 
              @create-folder= "changecreateFolder" 
              @delete-file= "deletefile"
              @get-filelist= "getFileList"
               />
              <div class="breadcrumb">
                <el-breadcrumb  separator="/">
                  <el-breadcrumb-item v-for="(item,index) in breadcrumblist" style="cursor:pointer;" @click="breadcrumbclick(item,index)" :key="item.id">{{item.filename}}</el-breadcrumb-item>
                </el-breadcrumb>
              </div>
            </el-header>
            <el-main class="table-main">
            <el-table @cell-mouse-leave="mouseLeave" @cell-mouse-enter="mouseEnter" class="table" @select-all= "alldeletefile" @select= "selectL" :data="tableData" style="width: 99%">
                <el-table-column type="selection" />
                <el-table-column class="name" width="500px" label="文件名">
                  <template #default="scope">
                    <div v-if="scope.row.fileId==='1'" class="addFolder">
                      <el-input v-model="foldername" style="width: 240px;margin-right:15px;" />
                      <el-button @click="ensurecreate" type="success" size="small" :icon="Check" circle />
                      <el-button type="danger" size="small" :icon="Close" circle />
                    </div>
                    <div v-else class="items">
                      <div class="item-fileName" style="cursor:pointer;" @click="selectitem(scope.row)">
                        <span>{{scope.row.fileName}}</span>
                      </div>
                      <div v-show="showClickIcon===true&&scope.row.fileId==rowid" class="item-button">
                          <span>分享</span>
                          <span>下载</span>
                          <span>删除</span>
                          <span>重命名</span>
                          <span>移动</span>
                      </div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column class="time" property="updatetime" label="修改时间"/>
                <el-table-column property="fileSize" label="文件大小"/>
            </el-table>
            <div v-if="showtransform" class="transform">
              <Progress />
            </div>
          </el-main>
          </el-container>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
  import axios, { all } from 'axios'
  import SparkMD5 from 'spark-md5';
  import Header from './components/header.vue'
  import LeftAside from './components/leftaside.vue'
  import RightAside from './components/rightaside.vue'
  import TableHeader from './components/tableheader.vue'
  import Progress from './components/progress.vue'
  import { onMounted, ref } from 'vue'
  import { storeToRefs } from 'pinia'
  import {Check,Close} from '@element-plus/icons-vue'
  import { FileList, MovieFileList, uploadFile, checkfile, uploadchuckfile, merge, CheckChunk, DeleteFile, createFolder } from '@/apis/file'
  import { parse } from 'vue/compiler-sfc';
  import { useUserStore } from '@/stores/user';
  import { useFileStore } from '@/stores/file';
  const tableData = ref([])
  const userStore = useUserStore()
  const fileStore = useFileStore()
  const { userid } = storeToRefs(userStore)
  const { fileid } = storeToRefs(fileStore)
  const test = ref({
    userId: userid,
    fileId: fileid
  })
  const foldername = ref('')
  const showClickIcon = ref(false)
  const rowid = ref('')
  const form = ref({
    file: ''
  })
  const pid = ref('1')
  const deletelist = ref([])
  const showtransform = ref(false)
  const breadcrumblist = ref([{'fileid':'1','filename':'主页'}])
  const chunksize = 10 * 1024 * 1024
  //点击文件名称
  const selectitem = (row) => {
    if(row.folderType===0){
      breadcrumblist.value.push({'fileid':row.fileId,'filename':row.fileName})
      test.value.fileId = row.fileId;
      getFileList()
    }
  }
  //新建文件夹步骤二（向后端发请求新建文件夹）
  const ensurecreate = async () => {
    if(foldername.value===''){
      console.log('请输入文件夹名字')
      return
    }
    const ff = test.value
    ff.fileName=foldername.value
    const res = await createFolder(ff)
    tableData.value.shift
    foldername.value=''
    getFileList()
  }
  //新建文件夹步骤一（出现input输入文件夹名称）
  const changecreateFolder = () => {
    tableData.value.unshift({'fileId':'1'})
  }
  const mouseEnter = (row,column,cell,event) => {
    showClickIcon.value=true
	  rowid.value=row.fileId
  }
  const mouseLeave = (row) => {
    showClickIcon.value = false
  }
  //点击面包屑
  const breadcrumbclick = async (item,index) => {
    breadcrumblist.value = breadcrumblist.value.slice(0,index+1)
    test.value.fileId = item.fileid
    await getFileList()
  }
  const alldeletefile = (selection) => {
    console.log(selection)
    if(selection.length===0){
      deletelist.value.length=0
      return
    }
    deletelist.value.length=0
    for(var i =0;i<selection.length;i++){
      const { fileId } = selection[i]
      deletelist.value.push(fileId)
    }
  }
  //删除文件
  const deletefile = async () => {
    if(deletelist.value.length===0){
      console.log("没选择要删除的文件")
      return 
    }
    await DeleteFile(deletelist.value)
    deletelist.value = ref([])
    getFileList()
  }
  //单选表格文件
  const selectL = (selection, row) => {
    if(!deletelist.value.includes(row.fileId)){
      deletelist.value.push(row.fileId)
      return
    }
    const index = deletelist.value.indexOf(row.fileId)
    if (index !== -1) {
      deletelist.value.splice(index, 1);
    }
  }
  //控制进度条出现
  const changeshowtransform = () => {
    showtransform.value = !showtransform.value
  }
  //获取文件列表
  const getFileList = async () => {
    const { userId, fileId } = test.value
    const res = await FileList({ userId, fileId })
    tableData.value = res.data
  }
  //获取指定类型文件列表
  const getMovieFileList = async (filecategory) => {
    if(filecategory===0){
      getFileList()
      return
    }
    test.value.fileCategory = filecategory
    const { userId, fileId ,fileCategory } = test.value
    const res = await MovieFileList({ userId, fileId, fileCategory })
    tableData.value = res.data
  }
  onMounted(()=>{
    getFileList()
  })
</script>

<style lang="scss" scoped>
  .home-index {
    height: 100%;
    width: 100%;
    position: fixed;
    .container-father {
        height: 100%;
        width: 100%;
        .header {
            border-bottom: 1px solid;
            display: flex;
            justify-content: space-between;
            box-shadow: 1px 1px 5px #888888;
            align-items: center;
        }
        .buttom {
            .buttom-left {
              box-shadow: 1px 1px 5px #888888;
            }
            .buttom-right {
                .buttom-right-left {
                  border-right: 1px solid;
                }
                .breadcrumb {
                  margin-top: 18px;
                  margin-bottom: 18px;
                }
            }
            .table-main {
              position: relative;
                overflow: hidden;
                .table{
                  .items{
                    display: flex;
                    justify-content: space-between;
                    span{
                      padding-right: 2px;
                    }
                  }
                }
                .transform{
                  position: absolute;
                  bottom: 0;
                  right: 0;
                  width: 500px;
                  height: 500px;
                  // background-color: skyblue;
                  border: 1px solid;
                  box-shadow: 1px 1px 5px #888888;
                  .title{
                    height: 30px;
                    line-height: 30px;
                    padding-left: 10px;
                  }
                } 
            }
        }
    }
  }
</style>