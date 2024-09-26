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
            <li>
              <i class="iconfont icon-all"></i>
              <span>设置</span>
            </li>
            <li>
              <i class="iconfont icon-shipin"></i>
              <span>视频</span>
            </li>
            <li>
              <i class="iconfont icon-yinpin"></i>
              <span>音频</span>
            </li>
            <li>
              <i class="iconfont icon-tupian"></i>
              <span>图片</span>
            </li>
            <li>
              <i class="iconfont icon-wenjian"></i>
              <span>文档</span>
            </li>
            <li>
              <i class="iconfont icon-qita"></i>
              <span>其他</span>
            </li>
          </ul>
          </el-aside>
          <el-container>
            <el-header height="80px">
              <div class="header-button" >
                <el-upload
                  class="upload-demo"
                  action="http://localhost:8080/file/upload"
                  show-file-list=false
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
                <i  class="iconfont icon-shuaxin" style="margin-left: 18px"></i>
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
  import { onMounted, ref } from 'vue'
  import { FileList } from '@/apis/file'
  const tableData = ref([{}])
  const test = ref({
    userId: '1',
    fileId: '1'
  })
  const getFileList = async () => {
    const { userId, fileId } = test.value
    const res = await FileList({ userId, fileId })
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
                    padding-top: 10px;
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