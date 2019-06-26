const mongoose=require('mongoose')
const Schema=mongoose.Schema//关系数据库的表结构

//创建表
const UserSchema=new Schema({
    name:
    {
        type:String,
        required:true
    },
    email:
    {
        type:String,
        required:true
    },
    avatar:{
        type:String
    },
    identity:
    {
          type:String,
          required:true
    },
    password:
    {
        type:String,
        required:true
    },
    date:
    {
        type:Date,
        default:Date.now
    }
})

module.exports=User=mongoose.model('users',UserSchema)//暴露出去的表的名称