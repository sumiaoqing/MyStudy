<template>
  <div id="fundlist">

    <quill-editor v-model="content" ref="myQuillEditor" :options="editorOption"></quill-editor>


<div class="input-bw">

<div class="input2"><el-input v-model="input2" placeholder="请输入标题"></el-input></div>

<div class="input3"><el-input v-model="input3" placeholder="请输入简介"></el-input></div>

    <div class="select-type">
      <el-select v-model="value8" filterable placeholder="请选择类型" @change="changeItem">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>

    <div class="input">
      <el-input type="textarea" :rows="2" placeholder="请输入备注" v-model="textarea"></el-input>
    </div>

<div class="el-save">
<el-button type="primary" round @click="saveHtml()" >保存博文</el-button>
</div>

    </div>

    <div class="item-type">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="音乐相关" name="first">
          <div v-for="(item,key) in tableData" v-if="item.type=='music'">
            <div class="show-art">
              <div class="art">博文内容：</div>
              <div v-html="item.article">{{item.article}}</div>
              <div class="delete-art">
                <el-button type="primary" icon="el-icon-delete" @click="seeArt(item,key)"></el-button>
              </div>
              <div class="beizhu-art">备注：{{item.note}}</div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="游戏相关">
          <div v-for="(item,key) in tableData" v-if="item.type=='game'">
            <div class="show-art">
              <div class="art">博文内容：</div>
              <div v-html="item.article">{{item.article}}</div>
              <div class="delete-art">
                <el-button type="primary" icon="el-icon-delete" @click="seeArt(item,key)"></el-button>
              </div>
              <div class="beizhu-art">备注：{{item.note}}</div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="电影相关">
          <div v-for="(item,key) in tableData" v-if="item.type=='movie'">
            <div class="show-art">
             <div class="art">博文内容：</div>
              <div v-html="item.article">{{item.article}}</div>
              <div class="delete-art">
                <el-button type="primary" icon="el-icon-delete" @click="seeArt(item,key)"></el-button>
              </div>
              <div class="beizhu-art">备注：{{item.note}}</div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="热门相关">
          <div v-for="(item,key) in tableData" v-if="item.type=='hot'">
            <div class="show-art">
            <div class="art">博文内容：</div>
              <div v-html="item.article">{{item.article}}</div>
              <div class="delete-art">
                <el-button type="primary" icon="el-icon-delete" @click="seeArt(item,key)"></el-button>
              </div>
              <div class="beizhu-art">备注：{{item.note}}</div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>



  </div>
</template>

<script>
import { quillEditor } from "vue-quill-editor";
export default {
  data() {
    return {
      tableData: [],
      content: null,
      editorOption: {},
      activeName: "second",
      contentData: {},
      contentData1: [],
      typeS: "music", //初始的类别
      email: "",
      idData: [],
      textarea: "",
      input2:'',
      input3:'',
      options: [
        {
          value: "music",
          label: "音乐相关"
        },
        {
          value: "game",
          label: "游戏相关"
        },
        {
          value: "movie",
          label: "电影相关"
        },
        {
          value: "hot",
          label: "热门相关"
        }
      ],
      value8: ""
    };
  },
  mounted() {
    this.getProfile();
  },
  methods: {
    changeItem(item) {
      console.log(item);
      this.typeS = item;
    },
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    seeArt(item, key) {
      console.log(key);
      //   this.contentData1.splice(this.contentData1.indexOf(item));障眼法式的删除

      this.$axios
        .delete(`api/profiles/delete/${this.idData[key]}`)
        .then(res => {
          this.$message({ message: "删除成功" });
          this.getProfile();
        })
        .catch(err => console.log(err));
    },
    saveHtml() {
      console.log(this.content);
      // this.contentData1.push(this.content);
      this.changeItem(this.typeS);
      console.log(this.textarea);
      this.contentData = {
        type: this.typeS,
        note: this.textarea,
        article: this.content,
        email: this.email,
        title:this.input2,
        jianjie:this.input3,
      };
      this.$axios
        .post("/api/profiles/add", this.contentData)
        .then(res => {
          // console.log(res);
          this.$message({ message: "保存成功" });
         this.getProfile();
        })
        .catch(err => console.log(err));
    },
    getProfile() {
      //获取数据
      this.$axios
        .get("/api/profiles")
        .then(res => {
          console.log(res.data);
          this.tableData = res.data;
          this.email = res.data.email;
          for (let i = 0; i < res.data.length; i++) {
            this.contentData1[i] = res.data[i].article;
            this.idData[i] = res.data[i]._id;
          }
          console.log(this.idData);
        })
        .catch(err => console.log(err));
    }
  }
};
</script>

<style>
.show-art {
  width: 100%;
  height: auto;
  border-top: 4px solid #324057;
  border-bottom: 4px solid #324057;
  margin-bottom: 20px;
  margin-top: 10px;
  padding-top: 20px;
  padding-bottom: 20px;
}
img {
  width: 120px;
  height: 120px;
}
.delete-art {
  position: absolute;
  right: 0px;
}
.art
{
    font-size: 20px;
    color: #00bfff;
    font-family: 'Times New Roman', Times, serif;
}
.beizhu-art
{
    color: black;
    font-family: 'Times New Roman', Times, serif;
    font-size: 20px;
}
.item-type
{
  margin-top: 30px;
}
.input-bw
{
  display: flex;
}
.select-type
{
  flex: 0.3;
  margin-top: 15px;
}
.input
{
  flex: 0.35;
   margin-top: 15px;
}
.input2
{
   flex:0.3;
   margin-top: 15px;
}
.input3
{
   flex: 0.5;
   margin-top: 15px;
}
.el-save
{
  flex: 0.15;
  margin-left: 50px;
  margin-top: 15px;
}
</style>



