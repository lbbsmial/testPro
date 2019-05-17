<template>
  <div class="sg_box">
    <div style="margin-bottom: 20px" v-if="isShow">
      <!--规划部门意见 start-->
      <div class="sp_content" v-if="isghbm">
        <p class="Opinion">规划部门意见
          <img :src="pass" alt="" v-if="ghbm.optype === 16"/>
          <img :src="notPass" alt="" v-if="ghbm.optype === 17"/>
        </p>
        <div class="pdf_box">
          <div class="codes">
            <span>规划许可证编号:{{ghxkzbh}}</span>
          </div>
          <ul>
            <li v-for="(ittr) in ghbm.replyFile">
              <p class="pdf_p">审批文件&nbsp;: &nbsp; {{ittr.fileName}}</p>
              <el-button @click="downloadEvent(ittr)" type="primary" size="small" class="pdf_btn">下载</el-button>
            </li>
          </ul>
        </div>
        <p class="Opinion_c">{{ghbm.opcomment}}</p>
        <div class="Opinion_f">
          <div class="f_left">
            <img :src="time2" alt="">
            <span>审批时间:{{ghbm.optime}}</span>
          </div>
        </div>
      </div>
      <!--规划部门意见 end-->

      <!--建设部门意见 start 牵头部门 进度条以它为准-->
      <div class="sp_content" v-if="isqtbm">
          <p class="Opinion">建设部门意见
            <img :src="pass" alt="" v-if="qtbm.optype === 16"/>
            <img :src="notPass" alt="" v-if="qtbm.optype === 17"/>
          </p>
          <div class="pdf_box">
            <div class="codes">
              <span>施工许可证编号:{{sgxkzbh}}</span>
            </div>
            <ul>
              <li v-for="(ittr) in qtbm.replyFile">
                <p class="pdf_p">审批文件&nbsp;: &nbsp; {{ittr.fileName}}</p>
                <el-button @click="downloadEvent(ittr)" type="primary" size="small" class="pdf_btn">下载</el-button>
              </li>
            </ul>
          </div>
          <p class="Opinion_c">{{qtbm.opcomment}}</p>
          <div class="Opinion_f">
            <div class="f_left">
              <img :src="time2" alt="">
              <span>审批时间:{{qtbm.optime}}</span>
            </div>
          </div>
      </div>
      <!--建设部门意见 end-->

      <!--审图公司意见 start-->
      <div class="sp_content" v-if="isstgs">
        <p class="Opinion">审图公司意见
          <img :src="pass" alt="" v-if="stgs.optype === 16"/>
          <img :src="notPass" alt="" v-if="stgs.optype === 17"/>
        </p>
        <div class="pdf_box">
          <ul>
            <li v-for="(ittr) in stgs.replyFile">
              <p class="pdf_p">审批文件&nbsp;: &nbsp; {{ittr.fileName}}</p>
              <el-button @click="downloadEvent(ittr)" type="primary" size="small" class="pdf_btn">下载</el-button>
            </li>
          </ul>
        </div>
        <p class="Opinion_c">{{stgs.opcomment}}</p>
        <div class="Opinion_f">
          <div class="f_left">
            <img :src="time2" alt="">
            <span>审批时间:{{stgs.optime}}</span>
          </div>
        </div>
      </div>
      <!--规划部门意见 end-->
    </div>
    <noinfo v-if="!isShow" :type="2"></noinfo>
  </div>
</template>

<script>
  import {time, pass, no_2, time_2 as time2, notPass} from '@/interface/ImgInterface.js'
  import noinfo from "../common/noinfo"
  import {timestampToTime} from "../../assets/commonjs/utils";
  import $utils from "../../assets/commonjs/utils";
  export default {
    name: "construction",
    data() {
      return {
        time,
        time2,
        pass,
        no_2,
        notPass,
        ghxkzbh:'',
        sgxkzbh:'',
        isShow:false,
        isghbm:false,
        isqtbm:false,
        isstgs:false,
        prosId: '',
        ghbm: {},
        stgs: {},
        qtbm: [],
      }

    },
    created() {
      this.prosId = this.$route.params.prosid
      this.getResult();
    },
    methods: {
      //获取审批结果
      getResult() {
        this.$http('post', `fromLs/processResults?prosId=${this.prosId}`).then(res => {
          if (res.code === 200) {
            let info = res.data || {};
            if (JSON.stringify(info) !== '{}') {
              this.ghxkzbh = info.ghxkzbh || "暂无" //规划许可证编号
              this.sgxkzbh = info.sgxkzbh || "暂无" //施工许可证编号
              if (info.ghbm) {
                this.ghbm = info.ghbm || {};
                this.ghbm.optime = timestampToTime(this.ghbm.optime);
                this.isghbm = true;
              }
              if (info.qtbm) {
                this.qtbm = info.qtbm || {};
                this.qtbm.optime = timestampToTime(this.qtbm.optime);
                this.isqtbm = true;
              }
              if (info.stgs) {
                this.stgs = info.stgs || {};
                this.stgs.optime = timestampToTime(this.stgs.optime);
                this.isstgs = true;
              }
              this.isShow = true;
            }
          }
        })
      },
      //下载文件事件
      downloadEvent(obj){
        $utils.downloadFile(obj)
      }
    },
   components:{
     noinfo
   }
  }
</script>

<style lang="scss" scoped>
  .sg_box {
    height: initial;
    width: initial;

    p {
      margin: 0;
      padding: 0;
    }

    ul, li {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .sp_content {
      margin: 0 2%;
      width: calc(96% - 16px);

      .Opinion {
        width: 100%;
        height: 40px;
        line-height: 40px;
        font-size: 16px;
        margin-bottom: 10px;
        font-weight: bolder;

        img {
          margin-left: 10px;
          display: inline-block;
          width: 48px;
          height: 40px;
          background-size: cover;
          vertical-align: middle;
        }
      }

      .pdf_box {
        font-size: 14px;
        width: 100%;
        overflow: hidden;

        .codes {
          height: 30px;
          line-height: 30px;
          width: 100%;
          box-sizing: border-box;
          font-size: 14px;
          font-weight: normal;
          color: #C1C1C1;
          margin: 5px 0;
        }

        .pdf_p {
          margin-bottom: 10px;
          height:30px;
          line-height: 30px;
          width: 73%;
          padding: 0 9% 0 2%;
          float: left;
          background: rgb(236, 245, 254);
          overflow:hidden; //超出的文本隐藏
          text-overflow:ellipsis; //溢出用省略号显示
          white-space:nowrap; //溢出不换行
        }

        .pdf_btn {
          height: 30px;
          width: 16%;
          float: right;
          background: rgb(49, 148, 249);
        }
      }

      .Opinion_c {
        margin: 15px 0;
        font-size: 14px;
        font-weight: normal;
        color: #333;
      }

      .Opinion_f {
        height: 30px;
        line-height: 30px;
        width: 100%;
        box-sizing: border-box;
        font-size: 14px;
        font-weight: normal;
        color: #C1C1C1;
        text-align: right;

        img {
          display: inline-block;
          width: 16px;
          height: 16px;
          background-size: cover;
          vertical-align: middle;
        }
      }
    }
  }

</style>
