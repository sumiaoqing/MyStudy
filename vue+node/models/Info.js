const mongoose=require('mongoose')
const Schema=mongoose.Schema//关系数据库的表结构


//创建表 心情日志
const InfoSchema=new Schema({
    tel:
    {
        type:String,
        // required:true
    },
    sex:
    {
        type:String,
        // required:true
    },
    adress:
    {
        type:String,
        // required:true
    },
    hobby:
    {
        type:String,
    },
    email:
    {
        type:String,
    }
})

module.exports=info=mongoose.model('info',InfoSchema)//暴露出去的表的名称