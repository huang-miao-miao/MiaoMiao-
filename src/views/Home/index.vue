<template>
  <div class="home-index">
    <el-container class="container-father">
      <el-header class="header">
        <div class="left">
            <i class="iconfont icon-wangpan"></i>
            <span>MiaoMiao网盘</span>
        </div>
        <div class="right">
            <i style="cursor:pointer;margin-right: 18px;" @click="changeshowtransform" class="iconfont icon-paixu"></i>
            <span>admin</span>
        </div>
      </el-header>
      <el-container class="buttom">
        <el-aside width="100px" class="buttom-left">
            <ul>
            <li>
              <i class="iconfont icon-shouye"></i>
              <span>首页</span>
            </li>
            <li>
              <i class="iconfont icon-JC_054"></i>
              <span>分享</span>
            </li>
            <li>
              <i class="iconfont icon-icon"></i>
              <span>回收站</span>
            </li>
            <li>
              <i class="iconfont icon-shezhi"></i>
              <span>设置</span>
            </li>
          </ul>
        </el-aside>
        <el-container class="buttom-right">
          <el-aside class="buttom-right-left" width="150px">
            <ul>
            <li @click="getFileList">
              <i class="iconfont icon-all"></i>
              <span>全部</span>
            </li>
            <li @click="getMovieFileList(1)">
              <i class="iconfont icon-shipin"></i>
              <span>视频</span>
            </li>
            <li @click="getMovieFileList(2)">
              <i class="iconfont icon-yinpin"></i>
              <span>音频</span>
            </li>
            <li @click="getMovieFileList(3)">
              <i class="iconfont icon-tupian"></i>
              <span>图片</span>
            </li>
            <li @click="getMovieFileList(4)">
              <i class="iconfont icon-wenjian"></i>
              <span>文档</span>
            </li>
            <li @click="getMovieFileList(5)">
              <i class="iconfont icon-qita"></i>
              <span>其他</span>
            </li>
          </ul>
          </el-aside>
          <el-container class="buttom-right-right">
            <!-- action="http://localhost:8080/file/upload" -->
            <el-header height="80px">
              <div class="header-button" >
                <!-- :on-change="change_file" -->
                <!-- multiple -->
                <!-- :auto-upload= false -->
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
            </el-header>
            <el-main class="table-main">
            <el-table @cell-mouse-leave="mouseLeave" @cell-mouse-enter="mouseEnter" class="table" @select="selectL" :data="tableData" style="width: 99%">
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
              <div class="title">上传任务</div>
              <el-progress  :percentage="loadProgress" />
            </div>
          </el-main>
          </el-container>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
  import axios from 'axios'
  import SparkMD5 from 'spark-md5';
  import { onMounted, ref } from 'vue'
  import {Check,Close} from '@element-plus/icons-vue'
  import { FileList, MovieFileList, uploadFile, checkfile, uploadchuckfile, merge, CheckChunk, DeleteFile, createFolder } from '@/apis/file'
  import { parse } from 'vue/compiler-sfc';
  const tableData = ref([])
  const test = ref({
    userId: '1',
    fileId: '1'
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
  const loadProgress = ref(0)
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
  //创建空文件夹
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
  //选择表格文件
  const selectL = (selection, row) => {
    if(!deletelist.value.includes(row.fileId)){
      deletelist.value.push(row.fileId)
      return
    }
    const index = deletelist.value.indexOf(row.fileId)
    if (index !== -1) {
      deletelist.value.splice(index, 1);
    }
    // deletelist.value = deletelist.value.filter(fileId1=>fileId1!==row.fileId)
  }
  //进度条
  const changeshowtransform = () => {
    showtransform.value = !showtransform.value
  }
  const uploadVideoProcess = (event, UploadFile, UploadFiles) => {
    console.log(event)
    console.log(event.percent)
    if (event.status === 'ready') {
      loadProgress.value = parseInt(event.percent)
      // loadProgress.value.push({'uid':event.raw.uid})
      // const interval = setInterval(() => {
      //   if (loadProgress.value >= 100) {
      //     clearInterval(interval)
      //     return
      //   }
      //   loadProgress.value += 1 //进度条进度
      // }, 80)
    }
  }
  const handleRequest = async (options) => {
    //计算文件的md5值
    const UploadFile = options.file
    const fileMd5 = await getUploadFileMD5(UploadFile);
    //计算文件大小
    const fileSize = UploadFile.size
    //检查文件是否存在
    const checkfiledata = new FormData()
    checkfiledata.append('fileMd5', fileMd5)
    checkfiledata.append('FileSize', fileSize)
    checkfiledata.append('Filename', UploadFile.name)
    checkfiledata.append('pid',test.value.fileId)
    checkfiledata.append('userId',test.value.userId)
    const chekFile = await checkfile(checkfiledata);
    //文件已上传，返回，实现秒传
    if(chekFile.data==="文件已上传"){
      return false
    }
    // 可以设置大于多少兆可以分片上传，否则走普通上传
    if (fileSize <= chunksize) {
      console.log('111')
        const formData = new FormData()
        formData.append('file', UploadFile)
        formData.append('pid',test.value.fileId)
        formData.append('fileMd5',fileMd5)
      await axios.post('http://localhost:8080/file/upload',formData,{
           headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (ProgressEvent) => {
            console.log('计时中')
            loadProgress.value = Math.round((ProgressEvent.loaded/ProgressEvent.total)*100)
          }
        }).then(response => {  
          // loadProgress.value = 0
          console.log('File uploaded successfully');  
        })
        // await uploadFile(UploadFile,test.value.fileId,fileMd5)
        getFileList()
    }else{
      //大于10M进行分片上传
      //计算分片数量
      const chunkCount = Math.ceil(fileSize / chunksize)
      for (var i = 0; i < chunkCount; i++) {
          //检查每一片分片是否已上传，若已上传则不在上传，实现断点传续
          const checkchunkdata = new FormData()
          checkchunkdata.append("fileMd5",fileMd5)
          checkchunkdata.append("chunk",i)
          const checkchunk = await CheckChunk(checkchunkdata);
          if(checkchunk==="分块已存在"){
            continue
          }
          //分片开始位置
          let start = i * chunksize
          //分片结束位置
          let end = Math.min(fileSize, start + chunksize)
          //取文件指定范围内的byte，从而得到分片数据
          let _chunkFile = UploadFile.slice(start, end)
          let formdata = new FormData()
          formdata.append('fileMd5', fileMd5)
          formdata.append('chunkNumber', i)
          formdata.append('file', _chunkFile)
          // 通过await实现顺序上传
          await uploadchuckfile(formdata)
          loadProgress.value = Math.floor(((i+1)/chunkCount)*100)
      }
      //分块上传完毕，合并分块
      const formdata = new FormData()
      formdata.append('fileMd5', fileMd5)
      formdata.append('chunkCount', chunkCount)
      formdata.append('filename', UploadFile.name)
      formdata.append('pid',test.value.fileId)
      await merge(formdata)
      //上传完成，重新加载文件列表
      getFileList()
    }
  }
  //上传文件
  const change_file = async (UploadFile, UploadFiles) => {
    //计算文件的md5值
    const fileMd5 = await getUploadFileMD5(UploadFile.raw);
    //计算文件大小
    const fileSize = UploadFile.size
    //检查文件是否存在
    const checkfiledata = new FormData()
    checkfiledata.append('fileMd5', fileMd5)
    checkfiledata.append('FileSize', fileSize)
    checkfiledata.append('Filename', UploadFile.name)
    checkfiledata.append('pid',test.value.fileId)
    checkfiledata.append('userId',test.value.userId)
    const chekFile = await checkfile(checkfiledata);
    //文件已上传，返回，实现秒传
    if(chekFile.data==="文件已上传"){
      return false
    }
    // 可以设置大于多少兆可以分片上传，否则走普通上传
    if (fileSize <= chunksize) {
        console.log('111')
        const formData = new FormData()
        formData.append('file', file)
        formData.append('pid',pid)
        formData.append('fileMd5',fileMd5)
        await axios.post('/file/upload',formData,{
           headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (ProgressEvent) => {
            console.log('计时中')
            loadProgress.value = Math.round((ProgressEvent.loaded/ProgressEvent.total)*100)
          }
        }).then(response => {  
          console.log('File uploaded successfully');  
        })
        // await uploadFile(UploadFile,test.value.fileId,fileMd5)
        console.log('上传成功')
        getFileList()
    }else{
      //大于10M进行分片上传
      //计算分片数量
      const chunkCount = Math.ceil(fileSize / chunksize)
      for (var i = 0; i < chunkCount; i++) {
          //检查每一片分片是否已上传，若已上传则不在上传，实现断点传续
          const checkchunkdata = new FormData()
          checkchunkdata.append("fileMd5",fileMd5)
          checkchunkdata.append("chunk",i)
          const checkchunk = await CheckChunk(checkchunkdata);
          if(checkchunk==="分块已存在"){
            continue
          }
          //分片开始位置
          let start = i * chunksize
          //分片结束位置
          let end = Math.min(fileSize, start + chunksize)
          //取文件指定范围内的byte，从而得到分片数据
          let _chunkFile = UploadFile.raw.slice(start, end)
          let formdata = new FormData()
          formdata.append('fileMd5', fileMd5)
          formdata.append('chunkNumber', i)
          formdata.append('file', _chunkFile)
          // 通过await实现顺序上传
          await uploadchuckfile(formdata)
      }
      //分块上传完毕，合并分块
      const formdata = new FormData()
      formdata.append('fileMd5', fileMd5)
      formdata.append('chunkCount', chunkCount)
      formdata.append('filename', UploadFile.name)
      formdata.append('pid',test.value.fileId)
      await merge(formdata)
      //上传完成，重新加载文件列表
      getFileList()
    }
  }
  //获取文件md5值
  const getUploadFileMD5 = (file) => {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();

        fileReader.onload = () => {
          const arrayBuffer = fileReader.result;
          const md5Hash = SparkMD5.ArrayBuffer.hash(arrayBuffer);
          resolve(md5Hash);
        };

        fileReader.onerror = (error) => {
          reject(error);
        };

        fileReader.readAsArrayBuffer(file);
      });
  }
  //获取文件列表
  const getFileList = async () => {
    const { userId, fileId } = test.value
    const res = await FileList({ userId, fileId })
    tableData.value = res.data
  }
  const getMovieFileList = async (filecategory) => {
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
            .left {
              font-size: 18px;
            }
            .right {
              font-size: 18px;
            }
        }
        .buttom {
            .buttom-left {
              box-shadow: 1px 1px 5px #888888;
                ul {
                    li{
                        margin-top: 18px;
                        list-style-type:none;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                    }
                }
            }
            .buttom-right {
                .buttom-right-left {
                  border-right: 1px solid;
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
                }
                .header-button {
                  margin-top: 18px;
                  display: flex;
                  align-items: center;
                  .upload-demo {
                    padding-right: 18px;
                  }
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