//用来注册以及验证
const express=require('express')
const router=express.Router()
const bcrypt=require('bcrypt')
const gravatar=require('gravatar')
const keys=require('../../config/keys')
const jwt=require('jsonwebtoken')
const passport=require('passport')

const User=require('../../models/User')//引入模型实例
const Mood=require('../../models/Mood')
const Comment=require('../../models/Comment')
const Pic=require('../../models/Pic')
const Profile=require('../../models/Profile')
const Link=require('../../models/Link')
const Info=require('../../models/Info')

// const se = session(options);

//请求为get  路由为api/users/test  公共数据
router.get('/test',(req,res)=>
{
    res.json('test ok')
})

//注册
router.post('/register',(req,res)=>
{
    // console.log(req.body

    //查询数据库中是否存在邮箱//与 Model.find 相同，但只返回单个文档
     User.findOne({email:req.body.email}).then((user)=>
     {
        
         if(user){
            // console.log(user);
             res.status(400).json('邮箱已被注册')
            
         }else
         {
             const avatar=gravatar.url(req.body.email,{s:'200',r:'pg',d:'mm'})
             const newUser=new User({
                 name:req.body.name,
                 email:req.body.email,
                 avatar,
                 password:req.body.password,
                 identity:req.body.identity
             })

     

          
    

                //     const picFiles={}//绑定图片对象
                //     picFiles.email=req.body.email;
                //     picFiles.name="测试信息";
                //     picFiles.type="测试信息";
                //     picFiles.url="测试信息";
                // new Pic(picFiles).save().then(email=>
                //     {
                //         // console.log(email);
                //     }).catch(err=>
                //         {
                //             console.log(err);
                //         })

                        

                            const infoFiles={}//绑定评论表对象
                            infoFiles.email=req.body.email;
                            infoFiles.tel="";
                            infoFiles.adress=''
                            infoFiles.sex='',
                            infoFiles.hobby=''
                        new Info(infoFiles).save().then(info=>
                            {
                                console.log(info);
                            }).catch(err=>
                                {
                                    console.log(err);
                                })

                        
             bcrypt.genSalt(10,function(err,salt)
             {
                 bcrypt.hash(newUser.password,salt,(err,hash)=>
                 {
                     if(err) throw err
                     newUser.password=hash//hash为加密后的密码
                     newUser.save(). then(user=>res.json(user)).catch(err=>console.log(err))
                 });
             })
         }
     })   
})

//登陆 返回token jwt passport 公共权限
router.post('/login',(req,res)=>
{
    console.log(req.body);
    const email=req.body.email
    const password=req.body.password
    
    //数据库查询
    User.findOne({email}).then(user=>
        {
            if(!user)
            {
                return res.status(400).json('用户不存在')
            }
            //如果用户存在那么密码匹配
            bcrypt.compare(password,user.password).
            then(isMatch=>
                {
                    if(isMatch)
                    {
                        req.session.email=user.email;//传递session为邮箱
                        const rule={id:user.id,name:user.name,avatar:user.avatar,identity:user.identity}
                        jwt.sign(rule,keys.secretOrKey,{expiresIn:3600},(err,token)=>
                        {
                            if(err) throw err
                            res.json(
                               {
                                   success:true,
                                   token:'Bearer '+token
                               }
                            )
                        })
                        // jwt.sign('规则','加密名字','过期时间','箭头函数')
                        // res.json({msg:'okkk密码正确'})
                    }else
                    {
                        return res.status(400).json('密码错误')
                    }
                })
        })
})

//验证token 返回current user 私有权限
router.get('/current',passport.authenticate('jwt',{session:false}),(req,res)=>
{
    res.json({id:req.user.id,
    name:req.user.name,
    email:req.user.email,
identity:req.user.identity})
})











module.exports=router;//暴露路由