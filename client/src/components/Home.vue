<template>
    <div class="home">

        <div class="container">
            <h1 class="title">小青哥博客管理</h1>
<div class="why">我们有什么？？？</div>
       <el-collapse accordion>
  <el-collapse-item>
    <template slot="title">琐事分享的喜悦
    </template>
    <div>随时随地,写出你所想。</div>
    <div><img src="../assets/11.jpeg" alt=""></div>
  </el-collapse-item>
   <el-collapse-item>
    <template slot="title">极致的用户交互
    </template>
    <div>随时随地,写出你所想。</div>
    <div><img src="../assets/12.jpeg" alt=""></div>
  </el-collapse-item>

   <el-collapse-item>
    <template slot="title">丰富的功能模块
    </template>
   <div>随时随地,写出你所想。</div>
    <div><img src="../assets/13.jpeg" alt=""></div>
  </el-collapse-item>

   <el-collapse-item>
    <template slot="title">懂你的信息分类
    </template>
  <div>随时随地,写出你所想。</div>
    <div><img src="../assets/14.jpeg" alt=""></div>
  </el-collapse-item>
  
  



</el-collapse>


        </div>
    </div>
</template>

<script>
export default {
  data()
  {
    return {
      
    
    }
  },
  components:
  {
  
  },

mounted(){
     
}
}
</script>


<style lang="scss" scoped>
*{margin:0;padding:0;list-style:none;}
.home {
  width: 100%;
  height: auto;
  // background: url(../assets/bg.jpg) no-repeat;
  background-size: 100% 100%;
  background-color: #efefef;
}
.container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-top: 70px;
  text-align: center;
}
.title {
  font-size: 30px;
  margin-bottom: 45px;
}
.pic-lb
{
  width: 90%;
  height: 80%;
}
.why
{
  position: relative;
  margin-top: 10px;
  margin-bottom: 80px;
  color: #cc0000;
  font-size: 15px;
  font-family: Arial;
}
</style>