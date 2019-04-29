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
  font-family: sans-serif , 'Avenir', Helvetica, Arial;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
  overflow: hidden;

}
  .el-menu--inline{
    background-color:rgba(255,255,255,0)!important;
  }
  .el-menu {
    background-color:rgba(255,255,255,0)!important;
    border-right: 0px!important;
  }
  
  .el-menu .el-menu-item {
    background-color:rgba(255,255,255,0)!important;
  }
  .el-menu .el-submenu, .el-submenu__title{
    background-color:rgba(255,255,255,0)!important;
  }
body {
   background-image: -webkit-radial-gradient(10% 0, farthest-side ellipse, #414e60 20%, #94a3b1);
   height: 100%;
   background-attachment: fixed, fixed;
}
</style>
