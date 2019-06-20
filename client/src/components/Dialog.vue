<template>
  <div id="dialog">
<el-dialog 
            :title="dialog.title" 
            :visible.sync="dialog.show"
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
<el-button  @click="adddialog('form')"    type="primary">确认<i class="el-icon-upload el-icon--right"></i></el-button>
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
            formLabelAlign: {
          time: '',
          title: '',
          comment: ''
        }
        }
    },props:
    {
          dialog:Object
    }
    ,methods: {
        adddialog(form)
        {
            this.$refs.form.validate(valid=>
            {
                if(valid)
                {
                    this.$axios.post('api/moods/add',this.formLabelAlign).then(res=>
                    {
                        this.$message({message:'添加成功'})
                        
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
