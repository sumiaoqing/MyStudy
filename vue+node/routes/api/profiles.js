//用来注册以及验证
const express=require('express')
const router=express.Router()

const Profile=require('../../models/Profile')//引入模型实例
const User=require('../../models/User')

//添加心情数据 api/profiles
router.post('/add',(req,res)=>
{
    Profile.findOne({email:req.session.email}).then(email=>
        {
        //    res.json(email);      
            if(email===null)
            {
                // console.log('没有')
                User.findOne({email:req.session.email}).then(email=>
                    {
                        if(email===null)
                        {
                            console.log('没有此用户')
                        }else
                        {
                            const profilesFiles={}               
                            if(req.body.type) profilesFiles.type=req.body.type;
                            if(req.body.article) profilesFiles.article=req.body.article;
                            if(req.body.note) profilesFiles.note=req.body.note;
                            if(req.body.title) profilesFiles.title=req.body.title;
                            if(req.body.jianjie) profilesFiles.jianjie=req.body.jianjie;
                            profilesFiles.email=req.session.email;
                           
                            // Profile.findByIdAndUpdate({email:req.body.email},{$set:profilesFiles},{new:true}).then(Profile=>res.json(Profile))
                            // Profile.findOneAndUpdate({email:req.body.email},{$set:profilesFiles},{new:true}).then(Profile=>res.json(Profile));
                            new Profile(profilesFiles).save().then(Profile=>
                                {
                                    res.json(Profile);
                                })
                        }
                    })
            }else
            {
                const profilesFiles={}               
                if(req.body.type) profilesFiles.type=req.body.type;
                if(req.body.article) profilesFiles.article=req.body.article;
                if(req.body.note) profilesFiles.note=req.body.note;
                if(req.body.title) profilesFiles.title=req.body.title;
                if(req.body.jianjie) profilesFiles.jianjie=req.body.jianjie;
                profilesFiles.email=req.session.email;
               
                // Profile.findByIdAndUpdate({email:req.body.email},{$set:profilesFiles},{new:true}).then(Profile=>res.json(Profile))
                // Profile.findOneAndUpdate({email:req.body.email},{$set:profilesFiles},{new:true}).then(Profile=>res.json(Profile));
                new Profile(profilesFiles).save().then(Profile=>
                    {
                        res.json(Profile);
                    })
            }   
        })  
})


///获取心情数据 get 
router.get('/',(req,res)=>
{
    Profile.find().then(profile=>
        {
            if(!profile) return res.status(404).json('没有内容')
            else 
            {
                  Profile.find({email:req.session.email}).then(profile=>
                    { 
                        res.json(profile);
                    })
            }
            
        }).catch(err=>res.status(404).json(err))
})

router.get('/show',(req,res)=>
{
    Profile.find().then(profile=>
        {
            if(!profile) return res.status(404).json('没有内容')
            else 
            {
                  Profile.find().then(profile=>
                    { 
                        res.json(profile);
                    })
            }
            
        }).catch(err=>res.status(404).json(err))
})

//获取单个信息
router.get("/:id",(req,res)=>
{
   Profile.findOne({_id:req.params.id}).then(Profile=>
    {
        if(!Profile) return res.status(404).json('没有内容')
        res.json(Profile)
    })
    .catch(err=>res.status(404).json(err))
})

//编辑个人信息
router.post('/edit/:id',(req,res)=>
{
    const profilesFiles={}
    if(req.body.type) profilesFiles.type=req.body.type;
    if(req.body.article) profilesFiles.article=req.body.article;
    if(req.body.note) profilesFiles.note=req.body.note;
    if(req.body.title) profilesFiles.title=req.body.title;
    if(req.body.jianjie) profilesFiles.jianjie=req.body.jianjie;
    profilesFiles.email=req.session.email;

        Profile.findByIdAndUpdate({_id:req.params.id},{$set:profilesFiles},{new:true}).then(Profile=>res.json(Profile))
})


//删除信息接口 delete
router.delete('/delete/:id',(req,res)=>
{
        Profile.findByIdAndRemove({_id:req.params.id}).then(Profile=>
            {
                Profile.save().then(Profile=>res.json(Profile))
            }).catch(err=>res.status(404).json('删除失败'))
})



module.exports=router;//暴露路由