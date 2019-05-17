<template>
  <div class="vue-header">
    <i class="el-icon-arrow-left back" @click="$router.go(-1)"></i>
    <span>{{headerTitle}}</span>
  </div>
</template>

<script>
  export default {
    name: "BackHeader",
    computed: {
      headerTitle() {
        return this.$store.getters.headerTitle
      }
    }
  }
</script>

<style lang="scss" scoped>
  .vue-header {
    height: 40px;
    line-height: 40px;
    text-align: center;
    box-shadow: 0 0 3px #e2e2e2;
    width: 100%;
    position: relative;

    .back {
      font-size: 25px;
      position: absolute;
      left: 10px;
      top: 7px;
    }
  }
</style>
