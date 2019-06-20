<template>
  <div id="link">
    <div class="top-all">
      <div class="top-pic">
        <img src="../../public/read.jpg" alt class="pic">
      </div>
      <div class="top-right">
        <div class="message">主人寄语</div>
        <div v-for="item in messageSay" class="link-book" :key="item">{{item}}</div>
      </div>
    </div>

    <div class="tui-all">
    <div class="recommend">推荐文章</div>
    <div class="tuijian"><el-button type="primary" round @click="addLink">推荐</el-button></div>
</div>

    <div class="tui-link"><el-input
  placeholder="请输入链接"
  v-model="input1"
>
</el-input></div>
    <div class="tui-type">
      <el-input
  placeholder="请输入类型"
  v-model="input2"
>
</el-input>
    </div>
    <footer class="table-footer">
      <el-table
        :data="tableData.filter(data => !search || data.type.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%"
      >
        <el-table-column  prop="link" label="链接地址"></el-table-column>
        <el-table-column  prop="type" label="链接类型"></el-table-column>
        <el-table-column  prop="dzs" label="阅览数"></el-table-column>

        <el-table-column align="right">
          <template slot="header" slot-scope="scope">
            <el-input v-model="search" size="mini" placeholder="输入关键字搜索"/>
          </template>
          <template slot-scope="scope">
            <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Add</el-button> -->
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
    </footer>

<div class="paginationClass">
    <el-pagination
    @size-change="handleSizeChange1"
    @current-change="handleCurrentChange1" :current-page="currentPage1"
    :page-sizes="[1, 2, 3, 4]"
    :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
    :total="total1">
    </el-pagination>

</div>


  </div>
</template>

<script>
export default {
  data() {
    return {
      messageSay: [
        "青青园中葵，朝露待日晞。",
        "阳春布德泽，万物生光辉。",
        "常恐秋节至，焜黄华叶衰。",
        "百川东到海，何时复西归？",
        "少壮不努力，老大徒伤悲。"
      ],
      tableData: [],
      search: '',
      input1:'',
      input2:'',
      addData:{},
      total1:0,
      currentPage1:1,
      pageSize:10,
    };
  },
  mounted() {
    this.getLink();
  },
  methods: {
    handleSizeChange1(pageSize) {
      this.pageSize=pageSize;
      this.handleCurrentChange1(this.currentPage1);
    },
    handleCurrentChange1(currentPage)
    {
      this.currentPage1=currentPage;
      this.currentChangePage(this.tableData,currentPage)
      // console.log(this.tableData);
    },
       currentChangePage(list,currentPage) { 
      let from = (currentPage - 1) * this.pageSize;
      let to = currentPage * this.pageSize;
      this.tempList = [];
      for (; from < to; from++) {
        if (list[from]) {
          this.tempList.push(list[from]);
        }
      }
},
    addLink()
    {
     
      this.addData={email:this.$store.getters.eComment,link:this.input1,type:this.input2,dzs:1};
      console.log(this.addData);
      this.$axios.post('/api/links/add',this.addData).then(res => {
          this.$message({ message: "链接保存成功" });
          this.getLink();
        })
        .catch(err => console.log(err));
    },
    handleDelete(index, row) {
       this.$axios
        .delete(`api/links/delete/${this.tableData[index]._id}`)
        .then(res => {
          this.$message({ message: "链接删除成功" });
          this.getLink();
        })
        .catch(err => console.log(err));
    },
    getLink() {
  //  console.log(this.$store.getters.dianzan);
      this.$axios
        .get("/api/links")
        .then(res => {     
          this.tableData=res.data;
          for(let i=0;i<this.tableData.length;i++)
          {
            this.tableData[i].dzs=this.tableData[i].dzs-1;
          }
          this.total1=res.data.length;
console.log(this.tableData);
        })
        .catch(err => console.log(err));
    }
  }
};
</script>

<style scoped>
.top-all {
  display: flex;
  flex-direction: row;
  height: 400px;
  margin-top: 2px;
}
.top-pic {
  flex: 3;
}
.top-right {
  flex: 0.5;
  border: 1px #b3614d solid;
  margin-left: 25px;
  margin-right: 25px;
  display: flex;
  flex-direction: column;
}
.pic {
  width: 100%;
  height: 100%;
}
.message {
  flex: 0.6;
  font-size: 25px;
  color: #b3614d;
  text-align: center;
  padding-top: 20px;
}
.link-book {
  flex: 0.8;
  color: #104e8b;
  padding-left: 25px;
}
.table-footer {
  margin-top: 20px;
}
.recommend {
  color: #104e8b;
  height: 90px;
  line-height: 90px;
  text-align: center;
  font-size: 25px;
  flex: 1;
}
.tuijian
{
  flex: 1;
  padding-top: 25px;
}
.tui-all
{
  display: flex;
}
</style>
