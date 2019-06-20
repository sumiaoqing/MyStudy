<template>
    <div class="index">
        <v-headernav></v-headernav>
        <!-- <router-view></router-view> -->
        <v-leftmenu></v-leftmenu>
       <div class="rightContainer">
      <router-view></router-view>
    </div>
    </div>
</template>

<script>
import HeadNav from './HeadNav'
import LeftMenu from './LeftMenu'
export default {
    name:'index',
    components:{
        "v-headernav":HeadNav,
        'v-leftmenu':LeftMenu
    }
}
</script>

<style lang="scss" scoped>
.index
{
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow-y: auto;
}
.rightContainer {
  position: relative;
  top: 60px;
  left: 180px;
  width: calc(100% - 180px);
  height: calc(100% - 71px);
  overflow: auto;
}
</style>

