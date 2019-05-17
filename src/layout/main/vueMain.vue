<template>
  <div class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key"/>
      </keep-alive>
    </transition>
  </div>
</template>
<script>
  export default {
    name: 'VueMain',
    computed: {
      cachedViews() {
        return this.$route.fullPath
      },
      key() {
        return this.$route.fullPath
      }
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../styles/transition.scss";
  @import "./styles/style.scss";
</style>
