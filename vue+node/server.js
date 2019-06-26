const express=require('express')
const app=express()
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const passport=require('passport')
const session = require('express-session');
const fs=require('fs');//文件模块
const multer=require('multer');//图片上传中间件
const path=require('path')
// const cookieParser=require('cookie-parser')

const db=require('./config/keys').mongoURL//连接数据库
mongoose.connect(db).then(()=>
{
    console.log('db ok')
}).catch((err)=>
{
    console.log(err)
})
app.use(express.static(path.join(__dirname, './public')))
app.use(bodyParser.urlencoded({extended:false}))//使用中间件,用来解析req.body中的数据
app.use(bodyParser.json())



// app.use(cookieParser());

const users=require('./routes/api/users')//引入users文件
const profiles=require('./routes/api/profiles')//博文
const moods=require("./routes/api/moods")//心情
const comments=require('./routes/api/comments')//评论
const pics=require('./routes/api/pics')//图片墙
const links=require('./routes/api/links')//链接表
const infos=require('./routes/api/infos')//信息表

app.use(session({
    secret:'12345',
    resave:false,
    saveUninitialized:true,
    // cookie:{secure:true}
}))

app.use('/api/users',users)//使用路由,前面的作用是不暴露真实的文件目录 登陆表
app.use('/api/profiles',profiles) //博文表
app.use('/api/moods',moods) //心情表
app.use('/api/comments',comments)//评论表
app.use('/api/pics',pics)//图片表
app.use('/api/links',links)
app.use('/api/infos',infos)

const port =process.env.port||5000//设置端口号

app.listen(port,()=>
{
    console.log('run 5000')
})

app.use(passport.initialize())//初始化passport
require('./config/passport')(passport)
