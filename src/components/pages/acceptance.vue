<template>
  <div class="sg_box">
    <div style="margin-bottom: 20px" v-if="isShow">
      <!--综合验收意见  牵头部门 进度条以它为准start-->
      <div class="sp_content" v-if="isqtbm">
        <p class="Opinion">综合验收意见
          <img :src="pass" alt="" v-if="qtbm.optype === 16"/>
          <img :src="notPass" alt="" v-if="qtbm.optype === 17"/>
        </p>
        <div class="pdf_box">
          <div class="codes">
            <span>竣工备案证书编号:{{jgbabh}}</span>
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
      <!--综合验收意见 end-->

      <!--专项验收意见 start-->
      <ul class="sp_content" v-if="isblbm">
        <p class="Opinion">专项验收意见</p>
        <li  v-for="(item) in blbm">
          <div class="pdf_box">
            <div class="codes">
              <span>验收部门:{{item.orgname}}</span>
              <img :src="pass" alt="" v-if="item.optype === 16"/>
              <img :src="notPass" alt="" v-if="item.optype === 17"/>
            </div>
            <ul>
              <li v-for="(ittr) in item.replyFile">
                <p class="pdf_p">审批文件&nbsp;: &nbsp; {{ittr.fileName}}</p>
                <el-button @click="downloadEvent(ittr)" type="primary" size="small" class="pdf_btn">下载</el-button>
              </li>
            </ul>
          </div>
          <p class="Opinion_c">{{item.opcomment}}</p>
          <div class="Opinion_f">
            <div class="f_left">
              <img :src="time2" alt="">
              <span>审批时间:{{item.optime}}</span>
            </div>
          </div>
        </li>
      </ul>
      <!--专项验收意见 end-->

      <!--提前查看内容/前期验收意见 start-->
      <div class="sp_content" v-if="istqys">
        <p class="Opinion">提前查看内容/前期验收意见</p>
        <div class="pdf_box">
          <ul>
            <li v-for="(ittr) in applyFiles1" style="overflow: hidden">
              <p class="pdf_p">{{ittr.txbmName}}&nbsp;: &nbsp; {{ittr.fileName}}</p>
              <el-button @click="downloadEvent(ittr)" type="primary" size="small" class="pdf_btn">下载</el-button>
            </li>
            <p class="pdf_line" v-if="applyFiles1.length"></p>
            <li v-for="(ittr) in applyFiles2" style="overflow: hidden">
              <p class="pdf_p">{{ittr.txbmName}}&nbsp;: &nbsp; {{ittr.fileName}}</p>
              <el-button @click="downloadEvent(ittr)" type="primary" size="small" class="pdf_btn">下载</el-button>
            </li>
            <p class="pdf_line" v-if="applyFiles2.length"></p>
            <li v-for="(ittr) in applyFiles3" style="overflow: hidden">
              <p class="pdf_p">{{ittr.txbmName}}&nbsp;: &nbsp; {{ittr.fileName}}</p>
              <el-button @click="downloadEvent(ittr)" type="primary" size="small" class="pdf_btn">下载</el-button>
            </li>
            <p class="pdf_line" v-if="applyFiles3.length"></p>
            <li v-for="(ittr) in applyFiles4" style="overflow: hidden">
              <p class="pdf_p">{{ittr.txbmName}}&nbsp;: &nbsp; {{ittr.fileName}}</p>
              <el-button @click="downloadEvent(ittr)" type="primary" size="small" class="pdf_btn">下载</el-button>
            </li>
            <p class="pdf_line" v-if="applyFiles4.length"></p>
            <li v-for="(ittr) in applyFiles5" style="overflow: hidden">
              <p class="pdf_p">{{ittr.txbmName}}&nbsp;: &nbsp; {{ittr.fileName}}</p>
              <el-button @click="downloadEvent(ittr)" type="primary" size="small" class="pdf_btn">下载</el-button>
            </li>
            <p class="pdf_line" v-if="applyFiles5.length"></p>
            <li v-for="(ittr) in applyFiles6" style="overflow: hidden">
              <p class="pdf_p">{{ittr.txbmName}}&nbsp;: &nbsp; {{ittr.fileName}}</p>
              <el-button @click="downloadEvent(ittr)" type="primary" size="small" class="pdf_btn">下载</el-button>
            </li>
            <p class="pdf_line" v-if="applyFiles6.length"></p>
            <li v-for="(ittr) in applyFiles7" style="overflow: hidden">
              <p class="pdf_p">{{ittr.txbmName}}&nbsp;: &nbsp; {{ittr.fileName}}</p>
              <el-button @click="downloadEvent(ittr)" type="primary" size="small" class="pdf_btn">下载</el-button>
            </li>
            <p class="pdf_line" v-if="applyFiles7.length"></p>
            <li v-for="(ittr) in applyFiles8" style="overflow: hidden">
              <p class="pdf_p">{{ittr.txbmName}}&nbsp;: &nbsp; {{ittr.fileName}}</p>
              <el-button @click="downloadEvent(ittr)" type="primary" size="small" class="pdf_btn">下载</el-button>
            </li>
            <p class="pdf_line" v-if="applyFiles8.length"></p>
            <li v-for="(ittr) in applyFiles9" style="overflow: hidden">
              <p class="pdf_p">{{ittr.txbmName}}&nbsp;: &nbsp; {{ittr.fileName}}</p>
              <el-button @click="downloadEvent(ittr)" type="primary" size="small" class="pdf_btn">下载</el-button>
            </li>
          </ul>
        </div>
      </div>
      <!--提前查看内容/前期验收意见 end-->
    </div>
    <noinfo v-if="!isShow" :type="3"></noinfo>
  </div>
</template>

<script>
  import {time, pass, no_2, time_2 as time2, notPass} from '@/interface/ImgInterface.js'
  import noinfo from "../common/noinfo"
  import {timestampToTime} from "../../assets/commonjs/utils";
  import $utils from "../../assets/commonjs/utils";
  export default {
    name: "sg",
    data(){
      return{
        time,
        time2,
        pass,
        no_2,
        notPass,
        isShow:false,
        isqtbm:false,
        isblbm:false,
        istqys:false,
        jgbabh:'',
        prosId:'',
        qtbm: {},
        blbm: [],
        applyFiles1: [],
        applyFiles2: [],
        applyFiles3: [],
        applyFiles4: [],
        applyFiles5: [],
        applyFiles6: [],
        applyFiles7: [],
        applyFiles8: [],
        applyFiles9: [],
      }

    },
    created(){
      this.$emit('childEvent','jg');
      this.prosId = this.$route.params.prosid
      this.getResult();
    },
    methods:{
      //获取审批结果
      getResult() {
        this.$http('post', `fromLs/processResults?prosId=${this.prosId}`).then(res => {
          if (res.code === 200) {
            let info = res.data || {};
            if(JSON.stringify(info) !== '{}'){
              if (info.qtbm) {
                this.qtbm = info.qtbm || {};
                this.qtbm.optime = timestampToTime(this.qtbm.optime);
                this.isqtbm = true;
              }
              if (info.blbm.length) {
                this.blbm = info.blbm || [];
                for (let i = 0; i <this.blbm.length;i++){
                  this.blbm[i].optime = timestampToTime(this.blbm[i].optime);
                }
                this.isblbm = true;
              }

              if (info.applyFiles.length) {
                let applyFiles = info.applyFiles || [];
                for (let i = 0; i <applyFiles.length;i++){
                  if(applyFiles[i].comment == 1){
                    applyFiles[i].txbmName = '规划土地意见'
                    this.applyFiles1.push(applyFiles[i])
                  }else if(applyFiles[i].comment == 2){
                    applyFiles[i].txbmName = '消防意见'
                    this.applyFiles2.push(applyFiles[i])
                  }else if(applyFiles[i].comment == 3){
                    applyFiles[i].txbmName = '出入口意见'
                    this.applyFiles3.push(applyFiles[i])
                  }else if(applyFiles[i].comment == 4){
                    applyFiles[i].txbmName = '绿化市容意见'
                    this.applyFiles4.push(applyFiles[i])
                  }else if(applyFiles[i].comment == 5){
                    applyFiles[i].txbmName = '民防意见'
                    this.applyFiles5.push(applyFiles[i])
                  }else if(applyFiles[i].comment == 6){
                    applyFiles[i].txbmName = '防雷意见'
                    this.applyFiles6.push(applyFiles[i])
                  }else if(applyFiles[i].comment == 7){
                    applyFiles[i].txbmName = '卫生意见'
                    this.applyFiles7.push(applyFiles[i])
                  }else if(applyFiles[i].comment == 8){
                    applyFiles[i].txbmName = '停车位意见'
                    this.applyFiles8.push(applyFiles[i])
                  }else if(applyFiles[i].comment == 9){
                    applyFiles[i].txbmName = '档案意见'
                    this.applyFiles9.push(applyFiles[i])
                  }

                }
                this.applyFiles = applyFiles;
                this.istqys = true;
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

        .codes {
          height: 40px;
          line-height: 40px;
          width: 100%;
          box-sizing: border-box;
          font-size: 14px;
          font-weight: normal;
          color: #C1C1C1;
          margin: 5px 0;
          span{
            display: inline-block;
            height:48px;
            line-height: 48px;
            width: 75%;
            float: left;
            overflow:hidden; //超出的文本隐藏
            text-overflow:ellipsis; //溢出用省略号显示
            white-space:nowrap; //溢出不换行
          }

          img {
            margin-left: 10px;
            display: inline-block;
            width: 48px;
            height: 40px;
            background-size: cover;
            vertical-align: middle;
          }
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
          height:30px;
          width: 16%;
          float: right;
          background: rgb(49, 148, 249);
        }
        .pdf_line{
          margin: -5px 0 10px 0;
          width: 100%;
          border-bottom: 1px solid #eeeeee;
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
