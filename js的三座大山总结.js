//1.原型以及原型链
//构造函数的初始化过程
//首先创建空的对象，再让this指向这个空的对象，进而通过this.name来进行赋值
//let obj={}  字面量 let obj=new Object();
//原型的规则
//1)所有的引用类型（数组，对象，函数）都具有对象特性，可自由扩展
//2)所有的引用类型（数组，对象，函数）的都具有原型属性(_proto_)，值也是一个普通的对象
//3)所有的函数，都具有prototype属性，值也是一个普通的对象
//4)所有的引用类型的(_proto_)属性值都指向构造函数的prototype属性值
let obj={};
console.log(obj._proto_===Object.prototype);//true
//5)当试图获取对象属性时，如果对象本身没有这个属性，那么就会去他的(_proto_)(prototype)中去寻找


//2.作用域以及闭包
//预解析
console.log(a);//undefined
var a=1;
//相当于
var a;
console.log(a);
a=1;
//this的指向
//js里的this是一个指向函数执行环境的指针,this永远指向最后调用他的对象，并且在执行时才能获得值，定义的时候无法获取值
//3种方法改变this的指向bind() call()  apply()
//闭包的用途主要是两个
//读取函数内部的变量，让变量始终保持在内存中
function a()
        {
            var k=100;
            return function b()
            {
                var c=10;
                return c+k;
            }
        }
console.log(a()());

//3.异步和单线程
console.log('satrt');
setInterval(function()
{
   console.log('mid');
},1000);
console.log('end');
//输出顺序为start end mid
//为什么会产生异步?cpu同一时间只能处理一个事务，得按顺序一个个处理
//为什么js引擎是单线程?其主要用途是与用户互动，以及操作dom，决定他只能是单线程
//一个线程要操作dom节点，一个线程要删除dom节点，容易造成分歧
//任务列队
//js设计者便想到，主线程完全可以不管IO设备，将其挂起，
//然后执行后面的任务。等后面的任务结束掉，在反过头来处理挂起的任务。
//只要主线程空了，就会读取任务列队，这就是js的运行机制，也被称为 event loop（事件循环）。


