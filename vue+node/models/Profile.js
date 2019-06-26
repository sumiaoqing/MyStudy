const mongoose=require('mongoose')
const Schema=mongoose.Schema//关系数据库的表结构


//创建表
const ProfileSchema=new Schema({
    type:
    {
        type:String,
        // required:true
    },
    article:
    {
        type:String,
        // required:true
    },
    note:
    {
        type:String,
        // required:true
    },
    title:
    {
        type:String,
    },
    jianjie:
    {
        type:String,
    },
    email:
    {
        type:String,
        // required:true
    }
})

module.exports=Profile=mongoose.model('profile',ProfileSchema)//暴露出去的表的名称