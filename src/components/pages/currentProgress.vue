<template>
  <div class="box">
    <back-header/>
    <div class="app-Speed">
      <p class="title">当前进度</p>
      <p class="line"></p>
      <p class="xm_title">{{topTitle}}</p>
      <div class="jdSpeed">
        <progressStep :type="typeNum2" :bar="typeNum"></progressStep>
      </div>
      <!--<progress type="1" bar="1" /> type 1竣工验收 2设计方案 3施工许可 bar 4个阶段-->
      <div class="start_time">
        <img :src="time" alt="" class="time_img">
        <span>{{ProjectFlow}}开始时间&nbsp;:&nbsp;{{beginTime}}</span>
      </div>
      <el-tabs v-model="activeName" @tab-click="handleClick(activeName)" :stretch=true style="width: calc(100% - 16px)">
        <el-tab-pane label="审批结果" name="1"></el-tab-pane>
        <el-tab-pane label="流转记录" name="2"></el-tab-pane>
      </el-tabs>
      <!--审批结果部分 start-->
      <template v-if="activeName === '1'">
        <design v-if="type === 1"></design>
        <construction v-if="type === 2"></construction>
        <acceptance v-if="type === 3"></acceptance>
      </template>


      <!--审批结果部分 end-->
      <!--审流转记录部分 start-->
      <template v-if="activeName === '2'">
        <el-table :data="tableData" class="tabSty" border>
          <el-table-column prop="index" label="序号" width="40"></el-table-column>
          <el-table-column prop="optime" label="日期" width="150"></el-table-column>
          <el-table-column prop="resultName" label="操作"></el-table-column>
          <el-table-column prop="orgname" label="部门" show-overflow-tooltip width="150"></el-table-column>
          <el-table-column prop="address" label="意见" width="72" fixed="right">
            <template slot-scope="scope">
              <template v-if="scope.row.opcomment!=null&&scope.row.opcomment!=''">
                <el-button @click="SeeDetails(scope.row.opcomment)" type="primary" size="mini">查看</el-button>
              </template>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <!--流转记录部分 end-->

      <!--dialog 部分 strat-->
      <el-dialog
        title="流转记录意见"
        :visible.sync="dialogVisible"
        width="80%"
        :before-close="handleClose">
        <span>{{dialogInfo}}</span>
        <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisible = false">退出</el-button>
  </span>
      </el-dialog>
      <!--dialog 部分 end-->
    </div>
  </div>
</template>

<script>
  import {time} from '@/interface/ImgInterface.js'
  import BackHeader from '../common/backHeader'
  import progressStep from '../common/progress'
  import {timestampToTime} from '../../assets/commonjs/utils'
  import construction from './construction'
  import design from './design'
  import acceptance from './acceptance'

  export default {
    name: "CurrentProgress",
    data() {
      return {
        time,
        dialogVisible: false,
        dialogInfo: '',
        prosId: '',
        type: 1,
        typeNum: '',
        typeNum2: '',
        title: '松江区泗泾镇K20-01项目',
        ProjectFlow: '设计方案',
        beginTime: '',
        activeName: '1',
        tableData: [],
      }
    },
    created() {
      this.beginTime = this.$route.params.beginTime;
      this.type = this.$route.params.id;
      this.prosId = this.$route.params.prosid;
      this.typeNum = Number(this.$route.params.js);
      this.getCirculation();
      if (this.type === 1) {
        this.typeNum2 = 2;
        this.ProjectFlow = '设计方案';
      } else if (this.type === 2) {
        this.typeNum2 = 3;
        this.ProjectFlow = '施工许可';
      } else if (this.type === 3) {
        this.typeNum2 = 1;
        this.ProjectFlow = '竣工验收';
      }
    },
    methods: {
      //获取流转记录
      getCirculation() {
        this.$http('post', `fromLs/processRecords?prosId=${this.prosId}`).then(res => {
          if (res.code === 200) {
            let info = res.data || [];
            info.forEach(function (item, index) {
              item.index = index + 1;
              if (item.optime) {
                item.optime = timestampToTime(item.optime);
              }
            });
            this.tableData = info;
          }
        })
      },
      //查看弹窗
      SeeDetails(comment) {
        this.dialogInfo = comment;
        this.dialogVisible = true;
      },
      handleClose(done) {
            done();
      },
      handleClick(activeName) {
      },
    },
    computed: {
      topTitle() {
        return this.$store.getters.topTitle;
      },
    },
    components: {
      BackHeader,
      progressStep,
      construction,
      design,
      acceptance,
    }
  }
</script>

<style lang="scss" scoped>
  .box {
    height: 100%;
    width: 100%;
    overflow-x: hidden;

    .app-Speed {
      padding: 0 8px;
      /*height: calc(100% - 10px);*/
      width: 100%;
      overflow-x: hidden;
      margin-top: 10px;

      p {
        margin: 0;
        padding: 0;
      }

      ul, li {
        list-style: none;
        padding: 0;
        margin: 0;
      }

      .title {
        text-align: center;
        font-size: 20px;
        font-weight: bold;
      }

      .line {
        height: 1px;
        width: 100%;
        background: rgba(244, 243, 248, .5);
        margin: 8px 0;
      }

      .xm_title {
        width: 90%;
        text-align: center;
        line-height: 24px;
      }

      .jdSpeed {
        width: 100%;
        margin: 20px 0;
      }

      .start_time {
        width: calc(100% - 16px);
        height: 34px;
        line-height: 34px;
        text-align: center;
        background: rgb(37, 136, 238);
        font-size: 14px;
        color: #ffe;

        .time_img {
          display: inline-block;
          width: 18px;
          height: 18px;
          background-size: cover;
          vertical-align: middle;
        }
      }

      .tabSty {
        width: calc(98% - 16px);
        margin: 0 1%;
        box-sizing: border-box;
        overflow-x: auto;
      }

    }
  }

</style>
