<template>
  <div class="app-dashboard">
    <div class="banner">
      <img :src="banner" alt="banner" class="banner-background">
    </div>
    <div class="title-container">
      <span class="title">我的应用</span>
    </div>
    <div class="applications">
      <ul>
        <li v-for="(item, index) in applyArray" :key="index">
          <img :src="item.url" alt="" @click="onLink(item.link)"/>
          <span>{{item.title}}</span>
        </li>
      </ul>
    </div>
    <div class="dividing-line"></div>
    <div class="project-container">
      <div class="title-container">
        <span class="title">我的项目</span>
      </div>
      <div class="search-container">
        <div class="search">
          <i class="el-icon-search" style="color: rgb(218, 218, 218);" @click="getProjectList(searchVal)"></i>
          <input type="text" placeholder="项目编号 / 名称" v-model="searchVal"/>
        </div>
      </div>
      <div class="project-list">
        <div class="row" v-for="(item, index) in projectList" :key="index">
          <div class="title">{{item.projectName}}</div>
          <div class="container">
            <div class="col1">
              <img :src="no" alt="no">
              <span>项目编号&nbsp;{{item.projectNo}}</span>
            </div>
            <div class="col2">
              <img :src="talk" alt="talk" @click="getConversation(item.chatId)"/>
              <div class="btn" @click="processHandler(item.projectName,item.projectId)">
                进度
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {banner, gGao, dPan, no, talk} from '@/interface/ImgInterface.js'

  export default {
    name: 'Dashboard',
    watch: {
      searchVal(val) {
        if (val === '') {
          this.getProjectList();
        }
      }
    },
    data() {
      return {
        searchVal: '',
        banner,
        no,
        talk,
        applyArray: [
          {
            url: gGao,
            title: '公告',
            link: 'dingtalk://dingtalkclient/action/switchtab?index=2&name=work&scene=1&corpid=ding0a3be41951d6311735c2f4657eb6378f&agentid=231957444'
          },
          {
            url: dPan,
            title: '钉盘',
            link: false
          }
        ],
        projectList: [],
        userId: '086321133232022522'
      }
    },

    created() {
      this.getProjectList();
      this.getHeadData();
    },
    methods: {
      getHeadData() {
        this.$http('post', 'dict/getJsSpdw', {}).then(response => {
          let res = response.data;
          if (res.code === 200) {
            console.log(res)
          }
        });
      },



      processHandler(title,projectId) {
        Vue.prototype.$projectId = projectId;
        this.$store.dispatch("setHeaderTitle", title);
        this.$router.push({name:'Details',path:'/part/details',params: {}});
      },
      getProjectList(searchVal = '') {
        this.$http('post', `fromLs/myProjectList`,{
          userId:this.userId,
          search:searchVal
        }).then(res => {
          if (res.code === 200) {
            this.projectList = res.data || [];
          }
        })
      },
      getConversation(chatId) {
        this.$http('get', 'user/getJSAPITicket').then(res => {
          if (res.code === 200) {
            let _config = res.data;
            this.dd.ready(() => {
              this.dd.config({
                agentId: _config.agentid,
                corpId: _config.corpId,
                timeStamp: _config.timeStamp,
                nonceStr: _config.nonceStr,
                signature: _config.signature,
                jsApiList: [
                  'device.base.getInterface',
                  'biz.chat.toConversation',
                  'biz.chat.chooseConversationByCorpId',
                  'biz.chat.pickConversation',
                  'biz.util.openLink']
              });
              this.dd.error(function (error) {
                alert('dd error: ' + JSON.stringify(error));
              });
              this.dd.ready(() => {
                this.dd.biz.chat.toConversation({
                  corpId: 'ding0a3be41951d6311735c2f4657eb6378f', ////企业id,必须是用户所属的企业的corpid
                  chatId:'chatc394f220cf65dae40f9f04358c43b999',//会话Id
                  onSuccess: function (result) {
                  },
                  onFail: function (err) {
                    alert(err)
                  }
                });
                this.dd.error(function (error) {
                  alert('dd error: ' + JSON.stringify(error));
                });
              });
            });
          }
        });
      },
      onLink(link) {
        if (link) {
          top.location.href = link
        } else {
          this.dd.biz.microApp.openApp({
            agentId: '231957447',
            appId: '234',
            corpId: 'ding0a3be41951d6311735c2f4657eb6378f',
            onSuccess: function (result) {
            },
            onFail: function (err) {
              alert(err)
            }
          })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .app-dashboard {
    width: 100%;
    height: 100%;
    overflow-x: hidden;

    .banner {
      width: 100%;
      padding: 10px;
      box-sizing: border-box;
      border-bottom: .5px solid rgb(238, 238, 238);
      overflow: hidden;

      .banner-background {
        width: 100%;
      }
    }

    .title-container {
      width: 100%;
      padding: 5px 10px;
      box-sizing: border-box;
      margin-top: 10px;

      .title {
        font-size: 16px;
        font-weight: bold;
      }
    }

    .applications {
      width: 100%;

      ul, li {
        list-style: none;
        padding: 0;
        margin: 0;
      }

      ul {
        margin: 10px 0;
        overflow: hidden;
      }

      li {
        width: 80px;
        float: left;
        text-align: center;
        padding: 10px 0;
        box-sizing: border-box;

        img {
          height: 50px;
        }

        span {
          display: inline-block;
          width: 100%;
        }
      }
    }

    .dividing-line {
      height: 5px;
      width: 100%;
      background: rgb(244, 243, 248);
    }

    .project-container {
      overflow: hidden;

      .search-container {
        padding: 5px 10px;
        box-sizing: border-box;
        overflow: hidden;

        .search {
          padding: 6px 8px;
          border-radius: 3px;
          background: rgb(245, 245, 245);
          float: left;
          width: -webkit-fill-available;

          i {
            font-weight: bold;
          }

          input {
            background: transparent;
            border: 0;
            outline: none;
            width: calc(100% - 30px);
            padding-left: 7px;
            box-sizing: border-box;
          }
        }
      }

      .project-list {
        overflow: hidden;
        margin: 10px 0;
        border-top: .5px solid rgb(245, 245, 245);

        .row {
          padding: 10px 0;
          box-sizing: border-box;
          border-bottom: .5px solid rgb(245, 245, 245);

          .title {
            font-size: 18px;
            padding: 10px 15px;
          }

          .container {
            width: 100%;

            .col1 {
              display: inline-block;
              color: rgb(109, 109, 109);
              font-size: 16px;
              padding: 10px 15px;
              line-height: 18px;
              box-sizing: border-box;
              width: calc(100% - 130px);
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;

              img {
                height: 16px;
                float: left;
                margin-right: 3px;
              }
            }

            .col2 {
              display: inline-block;
              width: 130px;
              float: right;

              img {
                height: 24px;
                margin-top: 6px;
                float: left;
              }

              .btn {
                height: 24px;
                background: rgb(49, 148, 249);
                display: inline-block;
                padding: 0 15px;
                color: #fff;
                border-radius: 14px;
                margin-top: 6px;
                float: right;
                margin-right: 15px;
                font-size: 14px;
                line-height: 24px;
              }
            }
          }
        }
      }
    }
  }

</style>
