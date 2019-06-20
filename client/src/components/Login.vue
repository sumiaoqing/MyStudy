<template>
    <div class="login">
     <section class="form_container">
         <div class="manage_tip">
        <span>小青哥博客管理系统</span>
<el-form :model="loginUser" :rules="rules" ref="loginForm" label-width="60px" class="loginForm">
  <el-form-item id="youxiang" label="邮箱" prop="email">
    <el-input  v-model="loginUser.email"  placeholder="请输入邮箱"></el-input>
  </el-form-item>
  <el-form-item  id="mima" label="密码" prop="password">
    <el-input   type="password" v-model="loginUser.password"  placeholder="请输入密码"></el-input>
  </el-form-item>
  
  
  <el-form-item>
    <el-button type='primary' class="submit_btn" @click="submitForm('loginForm')">登陆</el-button>
  </el-form-item>
  <div class="tiparea">
       <p id="zhuce">还没有账号?现在<router-link to='/register'>注册</router-link></p>
  </div>
</el-form>
         </div>
     </section>
    </div>
</template>

<script>
import jwt_decode from 'jwt-decode';
export default {
    name:'login',
    data()
    {
        return{
            loginUser:
            {       
                email:'',
                password:''
             
            },
            rules://规则验证
            {
                email:[
                    {
                    type:'email',
                    required:true,
                    message:'邮箱不能为空',
                    trigger:'blur'
                }],
                password:[
                    {
                    required:true,
                    message:'密码不能为空',
                    trigger:'blur'
                    },
                    {
                    min:6,
                    max:30,
                    message:'长度在6到30之间',
                    trigger:'blur'
                }]
            }
        }
    } ,
    methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .post("/api/users/login", this.loginUser)
            .then(res => {
              // console.log(res);
             //token
             const {token}=res.data;
             //存储到ls
             localStorage.setItem('eleToken',token);
             //解析token
             const decode=jwt_decode(token);

            //  console.log(decoded);

            //token存储到vuex中
            this.$store.dispatch("setIsAutnenticated", !this.isEmpty(decode));
            this.$store.dispatch("setUser", decode);
             this.$store.dispatch('echa1',this.loginUser.email);
             this.$router.push('./index')
            });  
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    isEmpty(value)
    {
      value===undefined||
      value===null||
      (typeof value==='object'&&Object.keys(value).length===0)||
      (typeof value==='string' &&vlaue.trim().length===0);
    }
  }
};
</script>

<style lang="scss" scoped>
$width_all:350px;
$left_all:37%;
span{
  display: inline-block;
    font-size: 35px;
    font-weight: 700;
    padding: 35px 0;
    margin-bottom: 30px;
    position: relative;
    left:39%;
    top:200px;
}
#youxiang,#mima
{
  width: $width_all;
}
.loginForm
{
  width: 350px;
  position: relative;
  left: $left_all;
  top: 170px;
}
#zhuce
{
position: relative;
  display: inline-block;
  top:-66px;
  left: 50%;
}
.login
{
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow-y: auto;
  background-image:url(../assets/login.jpg);
}
</style>