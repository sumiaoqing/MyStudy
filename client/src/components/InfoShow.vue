<template>
    <div class="infoshow">
       <el-row type="flex" class="row-bg" justify="center">
           <el-col :span='24'>

 
                                
                   <div class="user-name">{{user.name}}</div>
                
           


   <div class="user">
                    <img :src="user.avatar" class='avatar' alt="">
               </div>


<div class="wanshan">请填写你的个人信息(如需修改，请重新填写后保存)</div>
<div class="anniux">
<div class="lman">
  <el-radio v-model="radio" label="男" @change="changeSex">男生</el-radio>
  <el-radio v-model="radio" label="女" @change="changeSex">女生</el-radio>
  <el-input v-model="input3" placeholder="请输入你的电话" style="width:140px"></el-input>
</div>
    
</div>




<div class="xzcs">
       <div class="selsect-ct">
    <el-cascader
      size="large"
      :options="options"
      v-model="selectedOptions"
      @change="handleChange">
    </el-cascader>
  </div>
</div>
        
<div class="bc-all">
  <div class="bc">
  <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
    <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
  </el-checkbox-group>
</div>
</div>
  
 <div class="jsbc"><el-button type="primary" @click="baocun">保存</el-button></div>
            
           </el-col>
         
       </el-row>
    </div>
</template>
<script>
import { provinceAndCityData,CodeToText } from 'element-china-area-data';
 const cityOptions = ['美食', '电影', '音乐', '旅游'];
export default {
  data()
  {
   return {
      options: provinceAndCityData,
      selectedOptions: [],
      input3:'',
      sexs:'男',
      citysel:'',
      radio: '1',
      value:['美食', '音乐'],
        checkAll: false,
        checkedCities: ['美食', '音乐'],
        cities: cityOptions,
        isIndeterminate: true,
        id:'',
        infoall:{}
   }
  },
  name: "infoshow",
  computed: {
    user() {

      return this.$store.getters.user;
    }
  },
  mounted()
  {
      this.getInfo();
  },
  methods:
  {
    getInfo()
    {
        this.$axios.get('api/infos').then(res=>
        {
          console.log(res.data);
          this.id=res.data[0]._id;
            console.log(this.id);
        }   
        ).catch(err=>console.log(err));
    },
    
    baocun()
    {
         console.log(this.sexs);
    
         console.log(this.input3);
         console.log(this.citysel)
         console.log(this.value);
         let hobby=this.value.join(',')
         this.infoall={sex:this.sexs,tel:this.input3,adress:this.citysel,email:this.$store.getters.eComment,hobby:hobby}

         this.$axios.post(`/api/infos/edit/${this.id}`,this.infoall).then(res=>
         {
           this.$message('保存成功');
         }).catch(err=>console.log(err));

    },
    handleChange (value) {
        let ctt = CodeToText[value[0]] + CodeToText[value[1]]
       this.citysel=ctt;
      },
      changeSex(value)
      {
        if(value!='')
        {
           this.sexs=value;
        }
      },
      //  handleCheckAllChange(val) {
      //   this.checkedCities = val ? cityOptions : [];
      //   this.isIndeterminate = false;
      //   console.log(this.checkedCities);
      // },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
        this.value=value;
      }
  }
};
</script>
<style lang="scss" scoped>
.infoshow {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  /* padding: 16px; */
}
.row-bg {
  width: 100%;
  height: 100%;
}
.user img {
  width: 150px;
  border-radius: 50%;
}
.user
{
  padding-left: 80%;
}
.user-name
{
  width: 100%;
  height: 60px;
  text-align: center;
  line-height: 60px;
  font-size: 30px;
}
.wanshan
{
  color: red;
  padding-left: 20px;
  font-size: 20px;
  height: 40px;
  line-height: 40px;
  margin-bottom: 20px;
}
.anniux
{
  position: relative;
 height: 60px;
}
.lman
{
position: absolute;
left: 50%;
top: 50%;
transform: translate(-50%,-50%);
}
.xzcs
{
  position: relative;
  margin-top: 40px;
  height: 60px;
}
.selsect-ct
{
  position: absolute;
  left: 50%;
top: 50%;
transform: translate(-50%,-50%);
}
.bc-all
{
  position: relative;
  height: 80px;
  margin-top: 60px;
  margin-bottom: 60px;
}
.bc-all{
  position: absolute;
  left: 50%;
top: 50%;
transform: translate(-50%,-50%);
}
.jsbc
{
  display: table;
  margin: 0 auto;
  margin-top: 80px;
}
</style>
