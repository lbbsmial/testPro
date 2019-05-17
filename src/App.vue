<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    height: 100%;
    width: 100%;
  }

  html, body {
    height: 100%;
    width: 100%;
  }

  body {
    margin: 0;
    background: #fff;
  }

  input::-webkit-input-placeholder {
    color: #b6bfca;
  }

  input {
    color: #525252;
  }
</style>
