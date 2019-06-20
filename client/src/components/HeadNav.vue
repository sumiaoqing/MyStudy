<template>
<div class="headnav">
    <header class="head-nav">
        <el-row>
            <el-col :span="6" class='logo-container'>
                <img src="../assets/logo.png" class='logo' alt="">
                <span class='title'>小青哥博客管理系统</span>
            </el-col>
            <el-col :span='6' class="user">
                <div class="userinfo">
                    <img :src="user.avatar" class='avatar' alt="">
                     <div class='welcome'>
                        <p class='name1'>欢迎</p>
                        <p class='name2'>{{user.name}}</p>
                    </div>
                    <span class='username'>
                        <el-dropdown
                                trigger="click"
                                 @command='setDialogInfo'>
                            <span class="el-dropdown-link">
                                <i class="el-icon-caret-bottom el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command='info'>个人信息</el-dropdown-item>
                                <el-dropdown-item command='guangc'>博客广场</el-dropdown-item>
                                <el-dropdown-item  command='logout'>退出</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                     </span>
                </div>
            </el-col>
        </el-row>
    </header>
</div>
</template>

<script>
export default {
      computed:
      {
          user()
          {
              return this.$store.getters.user;
          }
      },methods: {
    setDialogInfo(cmditem) {
      if (!cmditem) {
        console.log("test");
        this.$message("菜单选项缺少command属性");
        return;
      }
      switch (cmditem) {
        case "info":
          this.showInfoList();
          break;
        case "logout":
          this.logout();
          break;
           case "guangc":
          this.guangc();
          break;
      }
    },
    showInfoList() {
      // 个人信息
      this.$router.push("/infoshow");
    } ,
    guangc()
    {
 this.$router.push("/share");
    },
    logout() {
      // 清除token
      localStorage.removeItem("eleToken");
      this.$store.dispatch("clearCurrentState");

      // 页面跳转
      this.$router.push("/login");
    }
  }
}
</script>

<style lang="scss" scoped>
.head-nav
{
    width: 100%;
    height: 60px;
    min-width: 600px;
    // padding: 5px;
    background: #324057;
    color: #fff;
    border-bottom: 1px solid #1f2d3d;
}
.headnav
{
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow-y: auto;
}
.logo-container {
  line-height: 60px;
  min-width: 400px;
}
.logo {
  height: 50px;
  width: 50px;
  margin-right: 5px;
  vertical-align: middle;
  display: inline-block;
}
.title {
  vertical-align: middle;
  font-size: 22px;
  font-family: "Microsoft YaHei";
  letter-spacing: 3px;
}
.user {
  line-height: 60px;
  text-align: right;
  float: right;
  padding-right: 10px;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  vertical-align: middle;
  display: inline-block;
}
.welcome {
  display: inline-block;
  width: auto;
  vertical-align: middle;
  padding: 0 5px;
}
.name1{
  line-height: 20px;
  text-align: center;
  font-size: 14px;
  position: relative;
  top: -10px;
  font-size: 12px;
}
.name2{
  color: #409eff;
  font-weight: bolder;
  position: absolute;
  top:-3px;
}
.el-dropdown {
  color: #fff;
}
.username {
  cursor: pointer;
  margin-right: 5px;
}
</style>
