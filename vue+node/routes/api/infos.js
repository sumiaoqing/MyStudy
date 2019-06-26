//用来注册以及验证
const express=require('express')
const router=express.Router()
const Info=require('../../models/Info')//引入模型实例


//添加心情数据 api/links
router.post('/add',(req,res)=>
{
    Info.findOne({email:req.session.email}).then(email=>
        {
        //    res.json(email);      
            if(email===null)
            {
                console.log('没有')
            }else
            {
                const infoFiles={}
                if(req.body.tel) infoFiles.tel=req.body.tel;
                if(req.body.adress) infoFiles.adress=req.body.adress;
                if(req.body.hobby) infoFiles.hobby=req.body.hobby;
                if(req.body.sex) infoFiles.sex=req.body.sex;
               
                infoFiles.email=req.session.email;
                // Mood.findByIdAndUpdate({email:req.body.email},{$set:linkFiles},{new:true}).then(mood=>res.json(mood))
                // Mood.findOneAndUpdate({email:req.body.email},{$set:linkFiles},{new:true}).then(mood=>res.json(mood));
                new Info(infoFiles).save().then(info=>
                    {
                        res.json('链接存储ok');
                    })
            }   
        })  
})


//获取心情数据 get 
router.get('/',(req,res)=>
{
    Info.find().then(info=>
        {
            if(!info) return res.status(404).json('没有内容')
            else 
            {
                  Info.find({email:req.session.email}).then(link=>
                    {
                        res.json(link);
                    })
            }
            
        }).catch(err=>res.status(404).json(err))
})


//获取单个信息
router.get("/:id",(req,res)=>
{
   Info.findOne({_id:req.params.id}).then(link=>
    {
        if(!link) return res.status(404).json('没有内容')
        res.json(link)
    })
    .catch(err=>res.status(404).json(err))
})

//编辑个人信息
router.post('/edit/:id',(req,res)=>
{
    const infoFiles={}
                if(req.body.tel) infoFiles.tel=req.body.tel;
                if(req.body.adress) infoFiles.adress=req.body.adress;
                if(req.body.hobby) infoFiles.hobby=req.body.hobby;
                if(req.body.sex) infoFiles.sex=req.body.sex;

        Info.findByIdAndUpdate({_id:req.params.id},{$set:infoFiles},{new:true}).then(info=>res.json(info))
})


//删除信息接口 delete
router.delete('/delete/:id',(req,res)=>
{
        Info.findByIdAndRemove({_id:req.params.id}).then(info=>
            {
                info.save().then(info=>res.json(info))
            }).catch(err=>res.status(404).json('删除失败'))
})



module.exports=router;//暴露路由