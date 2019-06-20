<template>
  <div id="pic">

<form>
        <input type="file" @change="getFile($event)"/>
        <el-button type="primary" @click="submitForm($event)">上传<i class="el-icon-upload el-icon--right"></i></el-button>
    </form>

<el-input v-model="input" placeholder="请输入图片描述"></el-input>


<el-table :data="tableData">
  <el-table-column label="图片" width="300" align="center">
      <template slot-scope="scope">
         <img :src="scope.row.url">
         <div>{{scope.row.type}}</div>
         <el-button type="primary" icon="el-icon-delete" @click="deletee(scope.row)"></el-button>
      </template>
  </el-table-column>
</el-table>

<!-- <div v-for="item in tableData">
  <img :src="item.url" alt="" srcset="">
</div> -->



</div>
  



<!-- <div class="pic-all">
  <div class="pic1"><img src="./../../public/upload/pic1.jpeg" alt="" srcset="" class="pic">
  <div class="title">我想要的生活</div>

<el-upload
  action="https://jsonplaceholder.typicode.com/posts/"
  list-type="picture-card"
  :on-preview="handlePictureCardPreview"
  :on-remove="handleRemove">
  <i class="el-icon-plus"></i>
</el-upload>
<el-dialog :visible.sync="dialogVisible">
  <img width="100%" :src="dialogImageUrl" alt="">
</el-dialog>
  </div>
  <div class="pic2"><img src="./../../public/upload/pic2.jpeg" alt="" srcset="" class="pic">
  <div class="title">工作需要继续</div>
 
<el-upload
  action="https://jsonplaceholder.typicode.com/posts/"
  list-type="picture-card"
  :on-preview="handlePictureCardPreview"
  :on-remove="handleRemove">
  <i class="el-icon-plus"></i>
</el-upload>
<el-dialog :visible.sync="dialogVisible">
  <img width="100%" :src="dialogImageUrl" alt="">
</el-dialog>
  </div>
  <div class="pic3"><img src="./../../public/upload/pic3.jpeg" alt="" srcset="" class="pic">
  <div class="title">理想不变，信念不改</div>
<el-upload
  action="https://jsonplaceholder.typicode.com/posts/"
  list-type="picture-card"
  :on-preview="handlePictureCardPreview"
  :on-remove="handleRemove">
  <i class="el-icon-plus"></i>
</el-upload>
<el-dialog :visible.sync="dialogVisible">
  <img width="100%" :src="dialogImageUrl" alt="">
</el-dialog>
  </div>
</div> -->






  </div>
</template>

<script>
export default {
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        name:'',
        addData:{},
        tuData:{},
        input:'',
        tableData:[]
        
      };
    },
    mounted() {
      this.getpic();
    },
    methods: {
      deletee(row)
      {
      console.log(row);
      this.$axios.delete(`api/pics/delete/${row._id}`).then(res=>
      {
        this.$message('图片删除成功');
        this.tableData=[];
        this.getpic();
      }).catch(err=>console.log(err));
      },
      getFile(event) {
                        this.file = event.target.files[0];
                        this.addData.name=this.file.name;
                    },
                     submitForm(event) {
                        event.preventDefault();
                        let formData = new FormData();
                      this.addData.email=this.$store.getters.eComment;
                      this.addData.url=`http://localhost:5000/${this.addData.name}`;
                      console.log(this.addData.url);
                        formData.append('imageFile', this.file);
                        formData.append('email',this.$store.getters.eComment);
                     

                        let config = {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        }
                        this.$axios.post('api/pics/uploads',formData,config).then(res=>
                        {
                          this.$message('图片长传成功')
                        }).catch(err=>console.log(err));
                        this.addData.type=this.input;
                        this.$axios.post('api/pics/add',this.addData).then(res=>
                        {
                        this.$message('图片已存入数据库');
                        this.tableData=[];
                        this.getpic();
                        }).catch(err=>console.log(err));
                     },
   getpic()
          { 
            this.$axios.get('/api/pics').then(res=>
            {
            console.log(res.data);
            for(let i=0;i<res.data.length;i++)
            {
              this.tableData.push(res.data[i]);
            }
            }).catch(err=>console.log(err));
          }
    }  
  }
</script>

<style lang="scss" scoped>
.pic-all
{
  display: flex;
  flex-direction: row;
  margin-top: 100px;
}
.pic1
{
  flex: 0.3;
  margin-left: 60px;
}
.pic2
{
  flex: 0.3
}
.pic3
{
  flex: 0.3
}
.pic
{
  width: 350px;
  height: 350px;
}
.title
{
  font-size: 20px;
}
img{
  width: 300px;
  height: 300px;
}
</style>

