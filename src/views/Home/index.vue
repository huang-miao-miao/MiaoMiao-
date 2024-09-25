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
            <el-header>
              <div class="header-button">
                <el-button type="primary" icon="Upload">
                  上传
                </el-button>
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
                <el-breadcrumb separator="/">
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
                <el-table-column class="name" width="300px" property="name" label="文件名"/>
                <el-table-column class="time" property="time" label="修改时间"/>
                <el-table-column property="size" label="文件大小"/>
            </el-table>
          </el-main>
          </el-container>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  
  const tableData = ref([{
    name: "test",
    time: "2016-05-04",
    size: "1MB"
  }])
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
            display: flex;
            justify-content: space-between;
        }
        .buttom {
            .buttom-left {
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

            }
        }
    }
  }
</style>