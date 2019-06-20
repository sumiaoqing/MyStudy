<template>
  <div class="xqing">
    <div class="all">
      <div class="anniu">
      <div class="anniugc"><el-button type="info" @click="guang">博文广场</el-button></div>
</div>
      <div class="biaoti"><div class="biti">{{article.title}}</div></div>
      <div class="right-yx">作者邮箱：{{article.email}}</div>
      <!-- <div>简介：{{article.jianjie}}</div> -->

      <div class="wenzhang">
      <div v-html="article.article" class="bowens">{{article.article}}</div>
      <div class="bowenx">备注：{{article.note}}</div>
      </div>

      <!-- <el-input v-model="name" placeholder="请输入昵称" style="width:150px"></el-input> -->

      <div class="pl">
      <div class="pls"><el-input v-model="comment" placeholder="请输入评论" style="width:900px"></el-input></div>
      <div class="plx"><el-button type="info" @click="pingL">评论后查看更多回复</el-button></div>
      </div>

      <div v-for="(item,key) in comment1" class="foot">
        <div v-if="item.biaoshi==biaoshi" class="bcomment">
          {{item.name}}的评论：<span class="plcom">{{item.comment}}</span>
          <div class="bresp">博主回复：<span  class="plcom">{{item.response}}</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      article: {},
      // name: "",
      comment: "",
      response: "",
      form: {},
      comment1: {},
      biaoshi: ""
    };
  },
  mounted() {
    this.getBo();
    this.getComment();
  },
  methods: {
    guang() {
      this.$router.push("/share");
    },
    getComment() {
      this.$axios
        .get("/api/comments")
        .then(res => {
          this.comment1 = res.data;
          console.log(res.data);
        })
        .catch(err => console.log(err));
    },
    pingL() {
      this.biaoshi = this.$store.getters.id;
      this.form = {
        name:this.$store.getters.eComment,
        comment: this.comment,
        response: this.response,
        email: this.article.email,
        biaoshi: this.biaoshi
      };
      console.log(this.form);
      this.$axios
        .post("/api/comments/add", this.form)
        .then(res => {
          this.$message({ message: "评论成功" });
          //   location.reload();
          this.getComment();
        })
        .catch(err => {
          console.log(err);
        });
    },
    getBo() {
      //获取数据
      this.$axios
        .get(`/api/profiles/${this.$store.getters.id}`)
        .then(res => {
          this.article = res.data;
          console.log(  this.$store.getters.eComment);
          console.log(this.article);
        })
        .catch(err => console.log(err));
    }
  }
};
</script>

<style scoped>
.xqing {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow-y: auto;
   background-color: #efefef;
}
.all {
  /* background-size: 100% 100%;
  background: url(../assets/login.jpg) no-repeat; */
  height: 100%;
  width: 100%;
}
.biaoti {
  width: 100%;
  height: 50px;
  position: relative;
}
.biti{
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  background-color: #ccffff;
  border-radius: 5px;
  padding: 10px;
  font-size: 30px;
  color: #919191;
}
.right-yx {
  position: relative;
  width: 250px;
  font-size: 15px;
  padding-left: 35px;
  color: #7D9EC0;
  height: 50px;
  line-height: 50px;

  border-radius: 15px;
}
.anniu
{
  position: relative;
  width: 100%;
  height: 50px;
}
.anniudl
{
  position: absolute;
  right: 10px;
  top: 20px;
}
.anniugc
{
  position: absolute;
  right: 80px;
  top: 20px;
}
.wenzhang
{
  border-top: 2px solid #EAEAEA;
  border-bottom: 2px solid #EAEAEA;
  padding-left: 30px;
  padding-right: 30px;
  height: 400px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}
.bowens
{
  flex: 0.8;
  padding-top: 5px;
}
.bowenx
{
  flex: 0.2;
  color: #8B3A62;
}
.pl
{
  position: relative;
  height: 60px;
  display: flex;
  margin-top: 15px;
}
.pls
{
 flex: 0.8;
 padding-left: 70px;
}
.plx
{
 flex: 0.2;
}
.bcomment
{
  color: black;
  width: 100%;
  padding-bottom: 1px solid #424242;
}
.plcom
{
  color: #8B008B;
  font-size: 15px;
}
.foot
{
  padding-left: 30px;
  font-size: 18px;
  position: relative;
  width: 380px;
}
.bresp
{
  color: #B8B8B8;
  font-size: 15px;
}
</style>
