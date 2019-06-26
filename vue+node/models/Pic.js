const mongoose=require('mongoose')
const Schema=mongoose.Schema//关系数据库的表结构


//创建表 心情日志
const PicSchema=new Schema({
    email:
    {
        type:String,
        // required:true
    },
    name:
    {
        type:String,
        // required:true
    },
    type:
    {
        type:String,
        // required:true
    },
    url:
    {
        type:String,
        // required:true
    }
})

module.exports=Pic=mongoose.model('pic',PicSchema)//暴露出去的表的名称