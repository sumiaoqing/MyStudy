//用来注册以及验证
const express=require('express')
const router=express.Router()
const Mood=require('../../models/Mood')//引入模型实例
const User=require('../../models/User')


//添加心情数据 api/moods
router.post('/add',(req,res)=>
{
    Mood.findOne({email:req.session.email}).then(email=>
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
                            const moodFiles={}
                            if(req.body.title) moodFiles.title=req.body.title;
                            if(req.body.comment) moodFiles.comment=req.body.comment;
                            if(req.body.time) moodFiles.time=req.body.time;
                            moodFiles.email=req.session.email;
                            // Mood.findByIdAndUpdate({email:req.body.email},{$set:moodFiles},{new:true}).then(mood=>res.json(mood))
                            // Mood.findOneAndUpdate({email:req.body.email},{$set:moodFiles},{new:true}).then(mood=>res.json(mood));
                            new Mood(moodFiles).save().then(mood=>
                                {
                                    res.json('心情存储ok');
                                })
                        }
                    })
            }else
            {
                const moodFiles={}
                if(req.body.title) moodFiles.title=req.body.title;
                if(req.body.comment) moodFiles.comment=req.body.comment;
                if(req.body.time) moodFiles.time=req.body.time;
                moodFiles.email=req.session.email;
                // Mood.findByIdAndUpdate({email:req.body.email},{$set:moodFiles},{new:true}).then(mood=>res.json(mood))
                // Mood.findOneAndUpdate({email:req.body.email},{$set:moodFiles},{new:true}).then(mood=>res.json(mood));
                new Mood(moodFiles).save().then(mood=>
                    {
                        res.json('心情存储ok');
                    })
            }   
        })  
})


//获取心情数据 get 
router.get('/',(req,res)=>
{
    Mood.find().then(mood=>
        {
            if(!mood) return res.status(404).json('没有内容')
            else 
            {
                  Mood.find({email:req.session.email}).then(mood=>
                    {
                        res.json(mood);
                    })
            }
            
        }).catch(err=>res.status(404).json(err))
})


//获取单个信息
router.get("/:id",(req,res)=>
{
   Mood.findOne({_id:req.params.id}).then(mood=>
    {
        if(!mood) return res.status(404).json('没有内容')
        res.json(mood)
    })
    .catch(err=>res.status(404).json(err))
})

//编辑个人信息
router.post('/edit/:id',(req,res)=>
{
    const moodFiles={}
    if(req.body.title) moodFiles.title=req.body.title;
    if(req.body.comment) moodFiles.comment=req.body.comment;
    if(req.body.time) moodFiles.time=req.body.time;

        Mood.findByIdAndUpdate({_id:req.params.id},{$set:moodFiles},{new:true}).then(mood=>res.json(mood))
})


//删除信息接口 delete
router.delete('/delete/:id',(req,res)=>
{
        Mood.findByIdAndRemove({_id:req.params.id}).then(mood=>
            {
                mood.save().then(mood=>res.json(mood))
            }).catch(err=>res.status(404).json('删除失败'))
})



module.exports=router;//暴露路由