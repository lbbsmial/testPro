<template>
  <div class="box">
    <img :src="noinfo" alt=""/>
    <p>{{title}}暂未审批</p>
  </div>
</template>

<script>
  import {noinfo} from '@/interface/ImgInterface.js'

  export default {
    name: "noinfo",
    props: ['type'],
    data() {
      return {
        noinfo,
        title: ''
      }
    },
    created() {
      if (this.type == 1) {
        this.title = "设计方案"
      }else if(this.type == 2){
        this.title = "施工许可"
      }else if(this.type == 3){
        this.title = "竣工验收"
      }
    }
  }
</script>

<style lang="scss" scoped>
  .box {
    width: 100%;
    text-align: center;
    margin-top: 50px;

    p {
      color: #ccc;
      margin: 0;
      height: 34px;
      line-height: 34px;
    }
    
    img {
      width: 40px;
      width: 42px;
      background-size: cover;
    }

  }

</style>
