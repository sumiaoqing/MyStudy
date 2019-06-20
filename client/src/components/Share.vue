<template>
  <div id="share">

      <div class="all">
      <div class="guangc">博文广场 <el-button type="info"  @click="delu" class="dl">返回系统</el-button></div>
    
    
<div class="swiper-container" style="width:60%;height:100%;">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <img class="pic-lb" src="../assets/bg.jpg" alt="" width="100%">
        </div>
        <div class="swiper-slide">
          <img  class="pic-lb" src="../assets/123.jpg" alt="" width="100%">
        </div>
        <div class="swiper-slide">
          <img  class="pic-lb" src="../assets/login.jpg" alt="" width="100%">
        </div>
      </div>
</div>
      </div>

<div class="right-gg">
    <div class="zlgg">
  <div class="zlggs">
      站内公告
  </div>
  <div class="zlggx">
      这是一个有关于分享的主页，用户可以交流自己的学习心得，以及推荐优秀的网址链接。
  </div>
  </div>

<div class="rmbq">
    <div class="rmbqs">
        热门标签
    </div>
    <span class="rmbqx" v-for="(item ,key) in rmbq ">
        {{item}}
    </span>
    </div>
</div>


<div class="xmbw">
<div class="xmbw-l">
   <div class="zxfb">最新发布</div>
   <div class="xxbw" v-for="(item,index) in article">
       <div class="anniuz">
       <div class="xxbw-1">{{item.title}}</div>
       <div class="xxbw-2">{{item.jianjie}}</div>
       <div class="xxbw-3">文章作者:{{item.email}}<div class="bqx">{{item.type}}</div></div>
       </div>
       <div class="anniux">
<el-button type="info" @click="lookA(item)" class="xxbw-info">详情查看</el-button>
<!-- <button @click="shouc(item)">222</button> -->

       </div>
       
       </div>
</div>
<div class="xmbw-r">
    <div class="tuilink">
            <div class="links">链接推荐</div>
    <div v-for="(item,key) in link" class="linkx">
        <a class="lj" :href="item.link" target="view_window" @click="dianzan(item,key)">{{item.link}}</a>
        <div class="yh">推荐用户：{{item.email}}</div>
        <div class="ty">推荐类型：{{item.type}}</div>
        <div class="yll">
            <el-badge :value="linkchange[key]">
  <el-button size="small">阅览量</el-button>
</el-badge>
        </div>
    </div>
    </div>
</div>
</div>


  </div>
</template>

<script>
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css';
export default {
    data(){
      return {
          article:{},
          link:{},
          rmbq:[],
          dzlink:{},
          dzjl:[],
          linkchange:[]
      }
    },
    methods:
    {
        // shouc(item)
        // {
        //      console.log(item._id);
        //      console.log(this.$store.getters.eComment);
        // },
        dianzan(item,key)
        {
            // this.$store.getters.dianzan+1
            // this.$store.dispatch('dz1',item.dzs);
             this.dzjl[key]=item.dzs+1;
            //  console.log(item.dzs);
             console.log(this.dzjl);
            this.dzlink={email:item.email,link:item.link,type:item.type,dzs:this.dzjl[key]}
            this.$axios.post(`/api/links/edit/${item._id}`,this.dzlink).then(res=>
            {
               console.log(res.data);
                this.$message('阅览+1');
                this.getLink();
            }).catch(err=>console.log(err));
        },
        delu()
        {
            this.$router.push('/index');
        }, 
        lookA(item)
        {
            console.log(item._id);
            // this.$store.getters.id=item._id;
            this.$store.dispatch('chg1',item._id)
            this.$router.push('/xqing')
        }, 
        getShare() {
      //获取数据
      this.$axios
        .get("/api/profiles/show")
        .then(res => {
         this.article=res.data;
         for(let i=0;i<this.article.length;i++)
         {
             this.rmbq.push(this.article[i].type);
         }
         this.rmbq=new Set(this.rmbq);
        })
        .catch(err => console.log(err));
    },
    getLink() {
      //获取数据
      this.$axios
        .get("/api/links/showl")
        .then(res => {
         this.link=res.data;
         for(let i=0;i<this.link.length;i++)
         {
             this.linkchange[i]=this.link[i].dzs-1;
         }
          console.log(this.linkchange);
        })
        .catch(err => console.log(err));
    }
    },
    mounted()
    {
      this.getShare();
      this.getLink();
      var mySwiper = new Swiper('.swiper-container', {
          autoplay:3000,
          speed:1000,
          loop:true,
          onClick: function(swiper){
            // alert(mySwiper.realIndex);     //当前索引
            if(mySwiper.realIndex==0)
            {
             
            }
          }
        })
      
    }
      
}
</script>

<style scoped>
#share
{
  position: absolute;
  width: 100%;
  height: auto;
  top: 0;
  left: 0;
  background-color: #efefef;
}
body
{
    margin: 0 !important;
}
.all{
    /* background-size: 100% 100%; */
  height: 100%;
  width: 100%;
}
.guangc
{
    width: 100%;
    height: 60px;
    line-height: 60px;
    font-size: 28px;
    color: #838B83;
    font-weight: 900;
    font-family:Arial;
    background-color: #424242;
}
.dl
{
    position: absolute;
    top: 10px;
    right: 20px;
}
.com-all
{
    display: flex;
}
.tuilink
{
    flex: 0.3;
}
.tuibo
{
    flex: 0.8;
}
.links
{
     background-color: #B8B8B8;
    color: black;
    padding-left: 15px;
    margin-bottom: 10px;
}
.lj
{
   color: black;
   margin-top: 5px;
   margin-bottom: 5px;
  
}
.yh
{
color: #8B3A62;
 margin-top: 5px;
   margin-bottom: 5px;
   font-size: 15px;
}
.ty
{
color: #525252;
 margin-top: 5px;
   margin-bottom: 5px;
  
   font-size: 13px;
}
.bowenx
{
    display: flex;
}
.look-all
{
    flex: 0.2;
    padding-top: 10px;
}
.wzjj
{
    flex: 0.3;
    color: #ff0000;
    font-size: 18px;
}
.wzjj-all
{
    flex: 0.3;
    color: black;
    font-weight: 600;
    font-size: 15px;
}
.pic-lb
{
    width: 740px;
    height: 340px;
}
.swiper-container
{
    margin-left: 150px;;
    margin-top: 18px;
}
.right-gg
{
    position: absolute;
    height: 340px;
    right: 150px;
    top: 77px;
    width: 200px;
    background-color: #EAEAEA;
    display: flex;
    flex-direction: column;
}
.zlgg
{
    width: 100%;
    height: 30px;
    
    flex: 0.5;
}
.rmbq
{
    flex: 0.5;
}
.zlggs
{
background-color: #76EE00;
margin-left: 15px;
margin-right: 120px;
color: #ffffff;
font-size: 13px;
padding-left: 5px;
}
.zlggx
{
    color: #838B83;
    font-size: 15px;
    padding-top: 30px;
    margin-left: 15px;
}
.rmbqs
{
    background-color: #B8B8B8;
    color: black;
    padding-left: 15px;
    margin-bottom: 10px;
}
.rmbq-1
{
    width: 100%;
    background-color: #525252;
    border:1px solid #525252;
    border-radius: 8px;
}
.rmbqx
{
    background-color: #525252;
    border:1px solid #525252;
    display: inline-block;
    border-radius: 4px;
    margin-left: 5px;
    margin-top: 5px;
}
.xmbw-l
{
    width: 730px;
    height: auto;
    background-color: #EAEAEA;
    margin-left: 150px;
    margin-top: 15px;
}
.zxfb
{
    width: 100%;
    height: 25px;
    background-color: #B8B8B8;
    padding-left: 2px;
    font-size: 13px;
    line-height: 25px;
    color: 	#A1A1A1;
}
.xxbw
{
    border:1px solid #A1A1A1;
    padding-left: 20px;
    padding-top: 10px;
    width: 678px;
    margin-left: 15px;
    margin-top: 20px;
    display: flex;
    height: 100px;
}
.anniuz
{
    flex: 0.8;
    display: flex;
    flex-direction: column;
}
.anniux
{
    flex: 0.2
}
.xxbw-1
{
    flex: 0.3;
    color: black;
    font-weight: 600;
    font-family: Arial;
}
.xxbw-2
{
    flex: 0.3;
    color: #838B83;
    font-size: 17px;
}
.xxbw-3
{
    padding-top: 5px;
    flex: 0.3;
    font-size: 13px;
    color: #8B3A62;
}
.xxbw-info
{
    width: 100px;
}
.xmbw-r
{
    position: absolute;
    right: 100px;
    top: 450px;
    width: 250px;
    background-color: #EAEAEA;
}
.linkx
{
    border-bottom: 1px solid  #A1A1A1;
     overflow-x: hidden;
     white-space:nowrap; /*让文本强制在一行不换行*/
    text-overflow:ellipsis;/*显示省略号来代表被修剪的文本*/
    margin-top: 10px;
    margin-bottom: 10px;
}
.bqx
{
    color: #525252;
    font-size: 10px;
    font-weight: 1000;
}
.yll
{
    margin-left: 165px;
}
</style>

