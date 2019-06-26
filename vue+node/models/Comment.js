const mongoose=require('mongoose')
const Schema=mongoose.Schema//关系数据库的表结构


//创建表 心情日志
const CommentSchema=new Schema({
    name:
    {
        type:String,
        required:true
    },
    comment:
    {
        type:String,
        required:true
    },
    response:
    {
        type:String
    },email:
    {
        type:String
    },
    biaoshi:
    {
        type:String,
    }
})

module.exports=Comment=mongoose.model('comment',CommentSchema)//暴露出去的表的名称