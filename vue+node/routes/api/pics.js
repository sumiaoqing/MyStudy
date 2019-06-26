//用来注册以及验证
const express=require('express')
const router=express.Router()
const Pic=require('../../models/Pic')//引入模型实例
const app=express();
const fs=require('fs');//文件模块
const multer=require('multer');//图片上传中间件
// const upload=multer({dest:'./client/public/uploads'});//定义图片上传的临时目录
const upload=multer({dest:'./public'});//定义图片上传的临时目录
const User=require('../../models/User')



//添加心情数据 api/pics
router.post('/add',(req,res)=>
{
    Pic.findOne({email:req.session.email}).then(email=>
        {
        //    res.json(email);      
            if(email===null)
            {
                User.findOne({email:req.session.email}).then(email=>
                    {
                        if(email===null)
                        {
                            console.log('没有此用户')
                        }else
                        {
                            const picFiles={}
                            if(req.body.name) picFiles.name=req.body.name;
                            if(req.body.url) picFiles.url=req.body.url;
                            if(req.body.type) picFiles.type=req.body.type;
                            picFiles.email=req.session.email;
                            // Mood.findByIdAndUpdate({email:req.body.email},{$set:moodFiles},{new:true}).then(mood=>res.json(mood))
                            // Mood.findOneAndUpdate({email:req.body.email},{$set:moodFiles},{new:true}).then(mood=>res.json(mood));
                            new Pic(picFiles).save().then(pic=>
                                {
                                    res.json('心情存储ok');
                                })
                        }
                    })
            }else
            {
                const picFiles={}
                if(req.body.name) picFiles.name=req.body.name;
                if(req.body.url) picFiles.url=req.body.url;
                if(req.body.type) picFiles.type=req.body.type;
                picFiles.email=req.session.email;
                // Mood.findByIdAndUpdate({email:req.body.email},{$set:moodFiles},{new:true}).then(mood=>res.json(mood))
                // Mood.findOneAndUpdate({email:req.body.email},{$set:moodFiles},{new:true}).then(mood=>res.json(mood));
                new Pic(picFiles).save().then(pic=>
                    {
                        res.json('心情存储ok');
                    })
            }   
        })  
})

// router.post('/uploads',upload.array('imageFile'),(req,res,next)=>
// {
    
//      for(let i=0;i<req.files.length;i++)
//      {
//          fs.rename(req.files[i].path,"./client/public/upload/"+req.files[i].originalname,(err)=>
//          {
//              if(err)
//              {
//                  throw err;
//              }else
//              {
//                 Pic.findOne({email:req.session.email}).then(email=>
//                     {
//                         if(email===null)
//                         {
//                             console.log('没有pic')
//                         }else
//                         {
//                             console.log(req.session.email);
//                             console.log(req.files[0].originalname);
//                             // const picFiles={}
//                             // if(req.body.name) picFiles.name=req.files[0].originalname;
//                             // if(req.body.type) picFiles.type=req.body.type;
//                             // picFiles.url="../.././public/upload/";
//                             // picFiles.email=req.session.email;
//                             // new Pic(picFiles).save().then(pic=>
//                             //     {
//                             //     })
//                         }   
//                     })  
//              }
//          })
//      }
//      res.writeHead(200,{"Access-Control-Allow-Origin": "*"})//允许跨域
//      res.end(JSON.stringify(req.files)+JSON.stringify(req.body));    
// })


router.post('/uploads',upload.array('imageFile'),(req,res,next)=>
{
    console.log(req.body);
     for(let i=0;i<req.files.length;i++)
     {
         fs.rename(req.files[i].path,"./public/"+req.files[i].originalname,(err)=>
         {
             if(err)
             {
                 throw err;
             }else
             {
                Pic.findOne({email:req.session.email}).then(email=>
                    {
                        if(email===null)
                        {
                            console.log('没有pic')
                        }else
                        {
                           console.log(req.files[i].path);
                            // console.log(req.session.email);
                            // console.log(req.files[0].originalname);
                            // console.log(req.files.path);
                            // const picFiles={}
                            // if(req.body.name) picFiles.name=req.files[0].originalname;
                            // if(req.body.type) picFiles.type=req.body.type;
                            // picFiles.url="../.././public/upload/";
                            // picFiles.email=req.session.email;
                            // new Pic(picFiles).save().then(pic=>
                            //     {
                            //     })
                        }   
                    })  
             }
         })
     }
     res.writeHead(200,{"Access-Control-Allow-Origin": "*"})//允许跨域
     res.end(JSON.stringify(req.files)+JSON.stringify(req.body));    
})

//获取图片数据 get 
router.get('/',(req,res)=>
{
    Pic.find().then(pic=>
        {
            if(!pic) return res.status(404).json('没有内容')
            else 
            {
                  Pic.find({email:req.session.email}).then(pic=>
                    {
                        res.json(pic);
                    })
            }
            
        }).catch(err=>res.status(404).json(err))
})


//获取单个信息
router.get("/:id",(req,res)=>
{
   Pic.findOne({_id:req.params.id}).then(pic=>
    {
        if(!pic) return res.status(404).json('没有内容')
        res.json(pic)
    })
    .catch(err=>res.status(404).json(err))
})

//编辑个人信息
router.post('/edit/:id',(req,res)=>
{
    const picFiles={}
                if(req.body.name) picFiles.name=req.body.name;
                if(req.body.type) picFiles.type=req.body.type;
                if(req.body.url) picFiles.url=req.body.url;

        Pic.findByIdAndUpdate({_id:req.params.id},{$set:picFiles},{new:true}).then(pic=>res.json(pic))
})


//删除信息接口 delete
router.delete('/delete/:id',(req,res)=>
{
        Pic.findByIdAndRemove({_id:req.params.id}).then(pic=>
            {
                pic.save().then(pic=>res.json(pic))
            }).catch(err=>res.status(404).json('删除失败'))
})



module.exports=router;//暴露路由