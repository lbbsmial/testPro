<template>
  <div class="vue-details">
    <back-header />
    <div class="search-container" style="margin-top: 5px;">
      <div class="search">
        <i class="el-icon-search" style="color: rgb(218, 218, 218);" @click="getProjectList(searchVal)"></i>
        <input type="text" placeholder="项目编号 / 名称" v-model="searchVal"/>
      </div>
    </div>
    <!--设计方案 start-->
    <p class="line"></p>
    <div class="content">
      <p class="title_h">
        <img :src="design" alt=""/>
        设计方案
      </p>
      <div class="row" v-for="(item, index) in designList" :key="index" @click="seeEvent(item.prosname,item.prosid,1)">
        <div class="title">
          <p>{{item.prosname}}</p>&nbsp;
          <span class="span_1" v-if="item.statusNames === '接收'">{{item.statusNames}}</span>
          <span class="span_2" v-if="item.statusNames === '受理'">{{item.statusNames}}</span>
          <span class="span_3" v-if="item.statusNames === '办结'">{{item.statusNames}}</span>
        </div>
        <div class="container">
          <div class="col1">
            <img :src="no" alt="">
            <span>设计方案编号:{{item.lsProid}}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 设计方案 end-->

    <!--施工许可 start-->
    <p class="line"></p>
    <div class="content">
      <p class="title_h">
        <img :src="construction" alt=""/>
        施工许可
      </p>
      <div class="row" v-for="(item, index) in buildList" :key="index" @click="seeEvent(item.prosname,item.prosid,2)">
        <div class="title">
          <p>{{item.prosname}}</p>&nbsp;
          <span class="span_1" v-if="item.statusNames === '接收'">{{item.statusNames}}</span>
          <span class="span_2" v-if="item.statusNames === '受理'">{{item.statusNames}}</span>
          <span class="span_3" v-if="item.statusNames === '办结'">{{item.statusNames}}</span>
        </div>
        <div class="container">
          <div class="col1">
            <img :src="no" alt="">
            <span>施工许可编号:{{item.lsProid}}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 施工许可 end-->

    <!--竣工验收 start-->
    <p class="line"></p>
    <div class="content">
      <p class="title_h">
        <img :src="completed" alt=""/>
        竣工验收
      </p>
      <div class="row" v-for="(item, index) in acceptanceList" :key="index" @click="seeEvent(item.prosname,item.prosid,3)">
        <div class="title">
          <p>{{item.prosname}}</p>&nbsp;
          <span class="span_1" v-if="item.statusNames === '接收'">{{item.statusNames}}</span>
          <span class="span_2" v-if="item.statusNames === '受理'">{{item.statusNames}}</span>
          <span class="span_3" v-if="item.statusNames === '办结'">{{item.statusNames}}</span>
        </div>
        <div class="container">
          <div class="col1">
            <img :src="no" alt="">
            <span>竣工验收编号:{{item.lsProid}}</span>
          </div>
        </div>
      </div>
    </div>
    <!--竣工验收 end-->
  </div>
</template>
<script>
  import {design, construction, completed, no} from '@/interface/ImgInterface.js'
  import BackHeader from '../common/backHeader'
  import {lcChangejd, zlcChange} from "../../assets/commonjs/utils";

  export default {
    name: 'Details',
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
        no,
        design,
        construction,
        completed,
        projectId:'',
        search:'',
        title: '松江区泗泾镇K20-01项目',
        designList: [],//设计,
        buildList: [],//施工,
        acceptanceList: [],//竣工
      }
    },
    created() {
      this.projectId = this.$projectId;
      // this.projectId = '358';
      this.getProjectList();
    },
    methods: {
      getProjectList(searchVal = '') {
        this.$http('post', `fromLs/processList`,{
          projectId:this.projectId,
          search:searchVal
        }).then(res => {
          if (res.code === 200) {
            let info = res.data || [];
            //设计方案
            let dg = info.design || []
            if(dg){
              for (let i = 0; i <dg.length;i++){
                dg[i].statusNames = zlcChange(1,dg[i].stageid)
              }
              this.designList = dg;
            }
            //施工许可
            let bl = info.build || []
            if(bl){
              for (let i = 0; i <bl.length;i++){
                bl[i].statusNames = zlcChange(2,bl[i].stageid)
              }
            }
            this.buildList = bl;
            //竣工验收
            let ac = info.acceptance
            if(ac){
              for (let i = 0; i <ac.length;i++){
                ac[i].statusNames = zlcChange(3,ac[i].stageid)
              }
            }
            this.acceptanceList = ac;
          }
        })
      },
      seeEvent(title,prosid,type) {
        this.$http('post', `fromLs/get_speed?prosId=${prosid}`).then(res => {
          if (res.code === 200) {
            let info = res.data || {};
            if(JSON.stringify(info) !== '{}'){
              let js = lcChangejd(info.type,info.status)
              this.$store.dispatch("topTitle", title);
              this.$router.push({name:'CurrentProgress', path: '/part/currentprogress',params: {prosid:prosid,id: type,js:js,beginTime:info.begindate}})
            }else{
              this.$store.dispatch("topTitle", title);
              this.$router.push({name:'CurrentProgress', path: '/part/currentprogress',params: {prosid:prosid,id: type,js:'0'}})
            }
          }else{
            this.$store.dispatch("topTitle", title);
            this.$router.push({name:'CurrentProgress', path: '/part/currentprogress',params: {prosid:prosid,id: type,js:'0'}})
          }
        })

      }
    },
    components: {
      BackHeader
    }
  }
</script>
<style lang="scss" scoped>
  .vue-details {
    width: 100%;
    height: 100%;
    overflow-x: hidden;

    .search-container {
      padding: 5px 10px;
      box-sizing: border-box;
      overflow: hidden;

      .search {
        padding: 6px 8px;
        border-radius: 3px;
        background: rgb(245, 245, 245);
        width: -webkit-fill-available;

        i {
          font-weight: bold;
          float: left;
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

    .line {
      height: 5px;
      width: 100%;
      background: rgba(244, 243, 248, .5);
      margin: 10px 0;
    }

    .content {
      padding: 0 8px;

      .title_h {
        height: 26px;
        line-height: 26px;
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 15px;

        img {
          width: 20px;
          height: 22px;
          vertical-align: middle;
        }
      }

      .row {
        border-top: .5px solid rgb(245, 245, 245);
        padding: 10px 0 0 0;
        box-sizing: border-box;

        .title {
          font-size: 14px;
          padding: 0 15px;
          font-weight: bold;
          height: 25px;
          line-height: 25px;

          p{
            margin: 0;
            padding: 0;
            float: left;
            width: 60%;
            height: 100%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          span {
            float: right;
            display: inline-block;
            height: 25px;
            width: 54px;
            text-align: center;
            color: #fff;
          }

          .span_1 {
            background: url("../../assets/imgs/receive.png");
            background-size: cover;
          }

          .span_2 {
            background: url("../../assets/imgs/acceptance.png");
            background-size: cover;
          }

          .span_3 {
            background: url("../../assets/imgs/getThrough.png");
            background-size: cover;
            color: #ccc;
          }
        }

        .container {
          width: 100%;

          .col1 {
            display: inline-block;
            color: rgb(109, 109, 109);
            font-size: 14px;
            padding: 10px 15px;
            line-height: 18px;
            box-sizing: border-box;

            img {
              height: 16px;
              float: left;
              margin-right: 3px;
            }
          }
        }
      }

    }

  }
</style>
