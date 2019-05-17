<template>
  <div class="sg_box">
    <div style="margin-bottom: 20px" v-if="isShow">
      <!--审批意见 start 牵头部门 进度条以它为准-->
      <div class="sp_content">
        <p class="Opinion">审批意见
          <img :src="pass" alt="" v-if="qtbm.optype === 16"/>
          <img :src="notPass" alt="" v-if="qtbm.optype === 17"/>
        </p>
        <div class="pdf_box">
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
      <!--审批意见 end-->
    </div>
    <noinfo v-if="!isShow" :type="1"></noinfo>
  </div>
</template>

<script>
  import {time, pass, no_2, time_2 as time2, notPass} from '@/interface/ImgInterface.js'
  import {timestampToTime,lcChangejd} from "../../assets/commonjs/utils";
  import $utils from "../../assets/commonjs/utils";
  import noinfo from "../common/noinfo"
  export default {
    name: "design",
    props:['type'],
    data(){
      return{
        time,
        time2,
        pass,
        no_2,
        notPass,
        isShow:false,
        prosId:'',
        qtbm:{},
      }

    },
    created(){
      this.prosId = this.$route.params.prosid
      this.getResult();
    },
    methods:{
      //获取审批结果
      getResult() {
        this.$http('post', `fromLs/processResults?prosId=${this.prosId}`).then(res => {
          if (res.code === 200) {
            let info = res.data || [];
            if(JSON.stringify(info.qtbm) !== '{}'){
              if (info.qtbm.optime) {
                info.qtbm.optime = timestampToTime(info.qtbm.optime);
              }
              this.qtbm = info.qtbm || {};
              this.isShow = true;
            }
          }else{
            console.log(res.message)
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
  .sg_box{
    height:initial;
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
          height:30px;
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
