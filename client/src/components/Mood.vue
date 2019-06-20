<template>
<div id="mood">


          <v-dialog :dialog="dialog"></v-dialog>
          <v-editdialog :dialog1="dialog1"></v-editdialog>
          <el-button type="primary" icon="el-icon-edit" id="btn" @click="add()"></el-button>
   <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      label="日期"
      width="300"
      align="center">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.time}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="今日心情"
      width="500"
      align="center">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>标题: {{ scope.row.title }}</p>
          <p>内容: {{ scope.row.comment }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.title }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

    </div>
</template>


<script>
import Dialog from './Dialog.vue';
import EditDialog from './EditDialog.vue';
export default {
    data() {
        return  {
            tableData:[],
            dialog:{
                show:false,
                title:"记录心情",
            },
            dialog1:{
                show:false,
                title:"更改状态",
                id:''
            }
            
        }
    },
    components:
    {
         'v-dialog':Dialog,
         'v-editdialog':EditDialog,
    },
    created() {
        this.getMood();
    },
    methods: {
        getMood()
        {
            //获取数据
            this.$axios.get('/api/moods').then(res=>
            {
               this.tableData=res.data;

            
               for(let i=0;i<this.tableData.length;i++)
               {
                    this.tableData[i]={time:this.tableData[i].time,comment:this.tableData[i].comment,title:this.tableData[i].title,_id:this.tableData[i]._id}
    
               }     
              //  console.log(this.tableData);
           
            }).catch(err=>console.log(err));
        },
        add()
        {
          this.getMood();
              this.dialog.show=true;
        },
      handleEdit(index, row) {
            this.dialog1.show=true;
            // console.log(index);
            this.dialog1.id=this.tableData[index]._id;
           
            // console.log(this.dialog1)  ;
      },
      handleDelete(index, row) {
         this.$axios.delete(`api/moods/delete/${this.tableData[index]._id}`).then(res=>
         {
              this.$message({message:'删除成功'})
             this.getMood();
         }).catch(err=>console.log(err));
      }
    }
    }
</script>
<style lang="scss" scoped>
 #table
 {
     position: absolute;
     left: 600px;
     top: 800px;
 }
 #btn
 {
     position: absolute;
     right: 60px;
     top: 4px;
     z-index: 2;
 }
</style>

