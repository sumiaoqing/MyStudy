const mongoose=require('mongoose')
const Schema=mongoose.Schema//关系数据库的表结构


//创建表 心情日志
const LinkSchema=new Schema({
    link:
    {
        type:String,
        // required:true
    },
    type:
    {
        type:String,
        // required:true
    },
    email:
    {
        type:String,
        // required:true
    },
    dzs:
    {
        type:Number,
    }
})

module.exports=link=mongoose.model('link',LinkSchema)//暴露出去的表的名称