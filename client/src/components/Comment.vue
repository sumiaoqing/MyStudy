<template>
  <div id="comment">
    <div class="all-com">
      <div class="left-com"></div>
      <div class="mid-com">
        <!-- <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="您的昵称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="评论内容">
            <el-input type="textarea" v-model="form.comment"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('form')">欢迎留下对本博客的意见以及建议</el-button>
          </el-form-item>
        </el-form> -->

        <el-table id="tab" :data="tableData" border >
          <el-table-column fixed prop="biaoshi" label="文章编号" width="100"></el-table-column>
          <el-table-column fixed prop="name" label="用户邮箱" width="100"></el-table-column>
          <el-table-column prop="comment" label="评论" width="100"></el-table-column>
          <el-table-column prop="response" label="回复内容" width="100"></el-table-column>
          <el-table-column fixed="right" label="操作" width="300">
            <template slot-scope="scope">
              <el-button @click="handleClick2(scope.row)" type="text" size="small">回复</el-button>
              <el-button @click="handleClick(scope.row)" type="text" size="small">确认</el-button>
              <el-button @click="handleClick1(scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-input v-if="resshow" v-model="input" placeholder="请输入回复内容" id="huifu"></el-input>
      </div>
      <div class="right-com"></div>
    </div>
  </div>
</template>
             
<script>
export default {
  data() {
    return {
      resshow: false,
      input: "",
      tableData: [],
      form: {
        name: "",
        comment: "",
        response: "",
        email:'',
        _id: ""
      }
    };
  },
  created() {
    this.getComment();
  },
  methods: {
    handleClick2(row) {
      console.log(row);
      this.resshow = true;
    },
    handleClick(row) {
      row.response = this.input;
      console.log(row.response);
      this.resshow = false;
      this.$axios
        .post(`/api/comments/edit/${row._id}`, row)
        .then(res => {
          this.$message("回复成功");
           this.getComment();
        })
        .catch(err => console.log(err));
    },
    handleClick1(row) {
      this.$axios
        .delete(`/api/comments/delete/${row._id}`, row)
        .then(res => {
          this.$message("删除成功");
         this.getComment();
        })
        .catch(err => console.log(err));
    },
    onSubmit(form) {
      this.form.email=this.$store.getters.eComment;
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$axios
            .post("/api/comments/add", this.form)
            .then(res => {
              this.$message({ message: "评论成功" });
              this.getComment();
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    },
    getComment() {
      this.$axios
        .get("/api/comments")
        .then(res => {
          console.log(this.$store.getters.eComment);
          this.tableData = res.data;
           this.form.email=this.$store.getters.eComment;
          // this.email=res.data[0].email;
          console.log(res.data);
          for (let i = 0; i < this.tableData.length; i++) {
            this.form[i] = {
              _id: this.tableData[i]._id,
              name: this.tableData[i].name,
              comment: this.tableData[i].comment,
              response: this.tableData[i].response
            };
          }
          // console.log(this.form);
        })
        .catch(err => console.log(err));
    }
  }
};
</script>

<style  lang="scss" scoped>
.all-com {
  display: flex;
}
.left-com {
  flex: 0.3;
}
.right-com {
  flex: 0.3;
}
.mid-com {
  flex: 0.4;
}
</style>
