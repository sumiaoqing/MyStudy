const mongoose=require('mongoose')
const Schema=mongoose.Schema//关系数据库的表结构


//创建表 心情日志
const MoodSchema=new Schema({
    title:
    {
        type:String,
        // required:true
    },
    comment:
    {
        type:String,
        // required:true
    },
    time:
    {
        type:String,
        // required:true
    },
    email:
    {
        type:String,
        // required:true
    }
})

module.exports=Mood=mongoose.model('mood',MoodSchema)//暴露出去的表的名称