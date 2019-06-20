<template>
    <div class="register">
     <section class="form_container">
         <div class="manage_tip">
             <span id="sign_up">Sign up</span>
<el-form :model="registerUser" :rules="rules" ref="registerForm" label-width="80px" class="registerForm">
  <el-form-item   label="用户名" prop="name">
    <el-input class="shurukuang" v-model="registerUser.name"  placeholder="请输入用户名"></el-input>
  </el-form-item>
  <el-form-item   label="邮箱" prop="email">
    <el-input  class="shurukuang" v-model="registerUser.email"  placeholder="请输入邮箱"></el-input>
  </el-form-item>
  <el-form-item   label="密码" prop="password">
    <el-input class="shurukuang" type="password" v-model="registerUser.password"  placeholder="请输入密码"></el-input>
  </el-form-item>
  <el-form-item  label="确认密码" prop="password2">
    <el-input class="shurukuang" type="password" v-model="registerUser.password2"  placeholder="请确认密码"></el-input>
  </el-form-item>
  <el-form-item label="选择身份">
      <el-select v-model="registerUser.identity" placeholder="请选择身份">
          <el-option label="会员" value="member"></el-option>
          <!-- <el-option label="游客" value='tourist'></el-option> -->
      </el-select>
  </el-form-item>
  
  <el-form-item>
    <el-button type='primary' class="submit_btn" @click="submitForm('registerForm')">注册</el-button>
  </el-form-item>
</el-form>
         </div>
     </section>
    </div>
</template>

<script>
export default {
    name:'register',
    data()
    {
       var validatePass2=(rule,value,callback)=>
       {
           if(value!==this.registerUser.password)
           {
               callback(new Error('两次密码不一致'));
           }else{
               callback();
           }
       };
        return{
            registerUser:
            {
                name:'',
                email:'',
                password:'',
                password2:'',
                identity:''
            },
            rules://规则验证
            {
                name:[
                    {
                    required:true,
                    message:'用户名不能为空',
                    trigger:'blur'},//触发条件
                    {
                    min:2,
                    max:30,
                    message:'长度在2到30之间',
                    trigger:'blur'
                }],
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
                }],
                password2:[
                     {
                    required:true,
                    message:'确认密码不能为空',
                    trigger:'blur'
                    },
                    {
                    min:6,
                    max:30,
                    message:'长度在6到30之间',
                    trigger:'blur'
                },
                {
                    validator:validatePass2,
                    trigger:'blur'
                }
                ]
            }
        }
    } ,
    methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .post("/api/users/register", this.registerUser)
            .then(res => {
              // 注册成功
              console.log(res);
              this.$message({
                message: "注册成功！",
                type: "success"
              });
              this.$router.push("/login");
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
 .shurukuang
 {
   width: 350px;
 }
 #sign_up
 {
   position: relative;
    display: inline-block;
    font-size: 35px;
    font-weight: 700;
    padding: 35px 0;
    left: 45%;
    top: 100px;
 }
 .registerForm
 {
   position: relative;
   left: 37%;
   top: 130px;
   width: 350px;
 }
 .register
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


