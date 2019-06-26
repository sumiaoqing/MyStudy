//用来注册以及验证
const express=require('express')
const router=express.Router()
const Link=require('../../models/Link')//引入模型实例
const User=require('../../models/User')


router.post('/add',(req,res)=>
{
    Link.findOne({email:req.session.email}).then(email=>
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
                            const linkFiles={}
                if(req.body.type) linkFiles.type=req.body.type;
                if(req.body.link) linkFiles.link=req.body.link;
                if(req.body.dzs) linkFiles.dzs=req.body.dzs;
                linkFiles.email=req.session.email;
                // Mood.findByIdAndUpdate({email:req.body.email},{$set:moodFiles},{new:true}).then(mood=>res.json(mood))
                // Mood.findOneAndUpdate({email:req.body.email},{$set:moodFiles},{new:true}).then(mood=>res.json(mood));
                new Link(linkFiles).save().then(link=>
                    {
                        res.json(link);
                    })
                        }
                    }
                    )
            }else
            {
                const linkFiles={}
                if(req.body.type) linkFiles.type=req.body.type;
                if(req.body.link) linkFiles.link=req.body.link;
                if(req.body.dzs) linkFiles.dzs=req.body.dzs;
                linkFiles.email=req.session.email;
                // Mood.findByIdAndUpdate({email:req.body.email},{$set:moodFiles},{new:true}).then(mood=>res.json(mood))
                // Mood.findOneAndUpdate({email:req.body.email},{$set:moodFiles},{new:true}).then(mood=>res.json(mood));
                new Link(linkFiles).save().then(link=>
                    {
                        res.json('链接存储ok');
                    })
            }   
        })  
})


//获取心情数据 get 
router.get('/',(req,res)=>
{
    Link.find().then(link=>
        {
            if(!link) return res.status(404).json('没有内容')
            else 
            {
                  Link.find({email:req.session.email}).then(link=>
                    {
                        res.json(link);
                    })
            }
            
        }).catch(err=>res.status(404).json(err))
})

router.get('/showl',(req,res)=>
{
    Link.find().then(link=>
        {
            if(!link) return res.status(404).json('没有内容')
            else 
            {
                  Link.find({}).sort({'dzs':-1}).then(link=>
                    {
                        res.json(link);
                    })
            }
            
        }).catch(err=>res.status(404).json(err))
})

//获取单个信息
router.get("/:id",(req,res)=>
{
   Link.findOne({_id:req.params.id}).then(link=>
    {
        if(!link) return res.status(404).json('没有内容')
        res.json(link)
    })
    .catch(err=>res.status(404).json(err))
})

//编辑个人信息
router.post('/edit/:id',(req,res)=>
{
    const linkFiles={}
    if(req.body.type) linkFiles.type=req.body.type;
    if(req.body.link) linkFiles.link=req.body.link;
    if(req.body.dzs) linkFiles.dzs=req.body.dzs; 
        Link.findByIdAndUpdate({_id:req.params.id},{$set:linkFiles},{new:true}).then(link=>res.json(link))
})


//删除信息接口 delete
router.delete('/delete/:id',(req,res)=>
{
        Link.findByIdAndRemove({_id:req.params.id}).then(link=>
            {
                link.save().then(link=>res.json(link))
            }).catch(err=>res.status(404).json('删除失败'))
})



module.exports=router;//暴露路由