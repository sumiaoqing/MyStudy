<template>
  <div id="dialog">
<el-dialog 
            :title="dialog1.title" 
            :visible.sync="dialog1.show"
            :close-on-click-modal='false'
            :close-on-press-escape='false'
            :modal-append-to-body="false">       
  <el-form 
  ref="form"
  :label-position="labelPosition" label-width="40px" :model="formLabelAlign" >
  <el-form-item label="日期">
    <el-input v-model="formLabelAlign.time"></el-input>
  </el-form-item>
  <el-form-item label="标题">
    <el-input v-model="formLabelAlign.title"></el-input>
  </el-form-item>
  <el-form-item label="内容">
    <el-input v-model="formLabelAlign.comment"></el-input>
  </el-form-item>
  <el-form-item>
<el-button  @click="editdialog('form')"  type="primary">编辑<i class="el-icon-upload el-icon--right"></i></el-button>
  </el-form-item>
</el-form>
</el-dialog>

  </div>
</template>

<script>
export default {
    data() {
        return {
            labelPosition: 'left',
            _id:'',
            formLabelAlign: {
          time: '',
          title: '',
          comment: ''
         
        }
        }
    },
    props:
    {
          dialog1:Object,
    }
    ,methods: {
        editdialog(form)
        { 
            console.log(this.dialog1);
            this.$refs.form.validate(valid=>
            {
                if(valid)
                {
                    this._id=this.dialog1.id;
                    this.$axios.post(`api/moods/edit/${this._id}`,this.formLabelAlign).then(res=>
                    {
                        this.$message({message:'编辑心情成功'})
                    }).catch(err=>
                    {
                        console.log(err);
                    })
                }
            })
        }
    },
}
</script>
