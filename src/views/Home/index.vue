<template>
  <div class="home-index">
    <el-container class="container-father">
      <el-header class="header">
        <div class="left">
            <i class="iconfont icon-wangpan"></i>
            <span>MiaoMiao网盘</span>
        </div>
        <div class="right">
            <i class="iconfont icon-paixu"></i>
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
          <el-container>
            <!-- action="http://localhost:8080/file/upload" -->
            <el-header height="80px">
              <div class="header-button" >
                <el-upload
                  class="upload-demo"
                  action="#"
                  :on-change="change_file"
                  :show-file-list= false
                  :auto-upload= false
                >
                  <el-button class="upload-button" type="primary">文件上传</el-button>
                </el-upload>
                <el-button type="success" icon="DocumentAdd">
                  新建文件夹
                </el-button>
                <el-button type="info" icon="DeleteFilled">
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
                  <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
                  <el-breadcrumb-item>
                    <a href="/">promotion management</a>
                  </el-breadcrumb-item>
                  <el-breadcrumb-item>promotion list</el-breadcrumb-item>
                  <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
                </el-breadcrumb>
              </div>
            </el-header>
            <el-main>
            <el-table class="table" :data="tableData" style="width: 99%">
                <el-table-column type="selection" />
                <el-table-column class="name" width="300px" property="fileName" label="文件名"/>
                <el-table-column class="time" property="updatetime" label="修改时间"/>
                <el-table-column property="fileSize" label="文件大小"/>
            </el-table>
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
  import { FileList, MovieFileList, uploadFile, checkfile, uploadchuckfile, merge, CheckChunk } from '@/apis/file'
  const tableData = ref([])
  const test = ref({
    userId: '1',
    fileId: '1'
  })
  const form = ref({
    file: ''
  })
  const pid = ref('1')
  const chunksize = 10 * 1024 * 1024
  const change_file = async (UploadFile, UploadFiles) => {
    const fileMd5 = await getUploadFileMD5(UploadFile.raw);
    const fileSize = UploadFile.size
    const checkfiledata = new FormData()
    checkfiledata.append('fileMd5', fileMd5)
    checkfiledata.append('FileSize', fileSize)
    checkfiledata.append('Filename', UploadFile.name)
    checkfiledata.append('pid',1)
    const chekFile = await checkfile(checkfiledata);
    if(chekFile.data==="文件已上传"){
      return false
    }
    // 可以设置大于多少兆可以分片上传，否则走普通上传
    if (fileSize <= chunksize) {
        const res = await uploadFile(UploadFile,fileMd5)
        console.log(res)
        console.log("上传的文件大于10m才能分片上传")
    }else{
      const chunkCount = Math.ceil(fileSize / chunksize)
      console.log("文件大小：", (UploadFile.size / 1024 / 1024) + "Mb", "分片数：", chunkCount)
      console.log("向后端请求本次分片上传初始化")
      // console.log(res)
      for (var i = 0; i < chunkCount; i++) {
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
          console.log(UploadFile, '0000')
          let _chunkFile = UploadFile.raw.slice(start, end)
          console.log(_chunkFile)
          console.log("开始上传第" + i + "个分片")
          let formdata = new FormData()
          formdata.append('fileMd5', fileMd5)
          formdata.append('chunkNumber', i)
          formdata.append('file', _chunkFile)
          // 通过await实现顺序上传
          const res = await uploadchuckfile(formdata)
          console.log(res)
      }
      const formdata = new FormData()
      formdata.append('fileMd5', fileMd5)
      formdata.append('chunkCount', chunkCount)
      formdata.append('filename', UploadFile.name)
      const res = await merge(formdata)
      console.log(res)
    }
  }
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
    console.log(res)
    console.log(tableData.value)
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
        }
    }
  }
</style>