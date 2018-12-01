//1.promise语法详解
//作用：解决异步回调的问题，传统方式:大部分使用回调函数，事件
let a=1;
let pro=new Promise(function(resolove,reject)//得到的是一个resolve,或者reject状态的对象
{
   if(a==10)
   {
       resolove('成功');//将resolve中的操作作为res的实参
   }
   else{
       reject('失败');//将reject中的操作作为err的实参
   }
})
pro.then((res)=>{console.log(res);},(err)=>{console.log(err);})
//then接受两个参数，一个为resolve函数，另一个为reject函数
pro.catch((err)=>{console.log(err);})//接受为reject状态的promise对象
//把几个promise打包，扔到一个数组里面，必须保证都是resolve状态
Promise.all([p1,p2,p3]);//只要有一个成功就返回

//2.async/await语法详解
//通过async可以指定一个函数为异步函数，执行异步函数后才能使用await
//await的作用其实是替代了then方法，将成功的resolve的值直接返回
async function demo()
{
    let result=await 123;//异步执行的语句前面加上await，表示后面的表达式需要等待
    return result;//返回值是一个promise对象
}
demo().then((res)=>{console.log(res);})
//await后面的promise对象，如果reject，则reject参数会被catch参数接收到，
//写不写return都可以，并且reject下面的代码不会执行,如果想下面的代码执行，必须用try catch包住
async function demo01()
{
    try{
        await Promise.reject('出错了');//模仿一个错误状态的promise对象
    }catch(e)
    {
      console.log(e);//此时的e是上面到的的reject里面的参数
    }
}
async function demo02()
{
        var result=await Promise.reject('出错了');//模仿一个错误状态的promise对象
        result.catch((err)=>//这种方法需要调用函数demo02，显示为红色报错 
        {
            console.log(err);
        })
}
//await只能放到async中
//相比genrator语义化更强
//await后面可以是promise对象，也可以是数字，字符串，布尔值
//async的函数返回值是一个promise对象
//只要await语句后面的promise状态变成reject，那么整个async就会中断
//3种方法捕获到错误
//1）在then中捕获
//2)在promise的catch方法捕获
//3)使用try...catch来捕获


//3.generator函数详解
//声明:Generator的声明方式类似一般的函数声明，只是多了个*号，并且一般可以在函数内看到yield关键字 例:
function* show()
{
    yield 'one';//匿名函数内部不能使用yield关键字
    yield 'two';
    return 'three';//return的东西不会遍历，done为true
}
var show=show();
show.next()//{done:false,value:'one'}
//输出的done表示迭代器是否遍历完成
//可以用for...of来获得一共多少个yield定义的步骤

//4.String类型的相关方法
let str='jfaoj'
str.includes('j');//判断是否有这个值，返回布尔值
str.indexOf('j');//返回索引的位置，找不到返回-1,索引值从1开始
str.startsWith('jf');//判断字符串是否以jf开始,返回布尔值
str.endsWith('oj');//判断字符串是否以oj结尾，返回布尔值
str.repeat(8);//参数为重复字符串的次数


//5.热闹的数组，Es5中的数组相关方法
let arr3=[['f'],{k:9},'k'];
arr3.forEach(function(value,index,arr)//回调函数，value为数组的值，index为数组的索引位置，arr为数组
{
    console.log(value,index,arr);
})
let arr4=[1,3,4,5]
arr4.filter(function(value,index,arr)//会创建一个新数组，过滤一些不合格的元素，存放满足条件的元素，返回值是创建的这个数组
{
    return value>3;
})
arr4.some(function(value,index,arr)
{
    value>6;
});//数组里面如果没有满足的条件的结果，有返回值，返回true
arr4.every();//同上，如果数组的所有条件都满足
arr4.reduce(function(total,curvalue,curindex,arr)//求数组的和从左往右
{
    return total+curvalue;
})
arr4.reduceRight();//同上从右向左
Array.of(3,4,5);//将一组值转换为数组
Array.from();//将一组类数组转换为数组

//6.新增了一个幂的运算符
//以前:
Math.pow(2,3);//现在2**3
