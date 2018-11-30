//1.this指向以及箭头函数
var foo=function(key)
{
   return key;
}
//等价于
let foo1=(key)=>key;//本质是返回值
let sum=(num1,num2)=>//如果是式子要加圆括号
{
    num1+num2;
}
//箭头函数的this指向是定义函数所在的对象，不是运行时所在的对象（指向运行时的作用域）
//箭头函数不能当构造函数，所以不能使用new命令
//箭头函数里面没有arguments使用
//箭头函数不能使用yield命令，因此箭头函数不能用做generator函数
//箭头函数实质没有自己的this，因此就不能改变this指向


//2.let,const推荐使用，const定义的基本类型不能改变，对象可以。
//let不存在预解析，所以不存在变量提升
//在for循环中，相当于父级作用域和子级作用域的区别
//1.基本类型
const a=10;//不可变动
//2.复杂类型
const obj={"jj":18};
obj.prop=123;//可以为其添加属性，但是将obj指向其他对象则会报错，例：obj={"kk":10}
//let在一个块级作用域内不能重复定义，且变量一定要在声明后使用


//3.Class的概念
//es6之前的写法
function Person1(name,age)
{
  this.name=name;
  this.age=age;
}
//添加方法
Person1.prototype.sayhi
{
    console.log("saihi");
}
//初始化
var per1=new Person1("su",18);

//es6之后引入类的概念
class Person2
{
    constructor(name,age){//为构造函数添加属性
        this.name=name;
        this.age=age;
    }
    showName() {////定义"类"的方法的时候，前面不需要加上function这个关键字，
    //直接把函数定义放进去了就可以了。另外，方法之间不需要逗号分隔，加了会报错。
        console.log('showName');
    }
    //当一个属性只有getter没有setter的时候，我们是无法进行赋值操作的,第一次初始化也不行。
    set prop(value)//设置值函数setter
    {
        console.log(`setter${value}`);
    }
    get prop()//取值函数getter
    {
        return 'getter';
    }
    //调用的方法，先初始化一个实例，例：let per1=new Person2();  per1.prop=123,先设置值  再per1.prop;来取值
   static sayhello()
   {
       console.log("hello");//es6中静态方法，类自己能够的方法 调用方式Person2.sayhello();
   }
}
class Stud extends Person2{//声明一个stud类为person2的子类
    constructor(name,age,color)
    {
         super(name,age);//继承Person中的属性
         this.color=color;//自己独有的属性
    }
}
//如果要使用父类的属性，可以这样初始化父类 let stu=new Person2('su',18);
//这样就默认了stu实例的name,age为父类的，如果想要给他的color赋值,直接stu.color="lll";
//子类可以直接调用父类的静态方法 例子:Stud.sayhello();

//4.解构赋值的用法(简洁，高效)
//左右两边，结构的格式要保持一致，例"
let json={name:'11',age:18};
//解构赋值后
let{name,age}=json;//结构赋值定义的初始值不能相同
//不完全的结构可以成功，前题左边的数目小于右边
let [a,b]=[1,2,3];//输出的结果为1,2
//结构的时候可以给默认值
let[a,b=1]=[5];//a=5,b=1;
//字符串的结构默认看作数组
let arr='hee11';
let [a,b,c,d,e]=arr;//输出的结果为h e e 1 1
//解构可以用于对象(前提是变量名必须和属性名同名，才能取到正确的值)
let{foo,bzz}={foo:'aaa',bzz:"kkk"};
//如果一个数组成员是null,默认值就不会生效，因为nul不严格等于undefined

//5.扩展运算符rest+spread,俗称3个点...
console.log(...['apple','banan']);//得到的结果 apple,banan,展开的结果
function shownumber(...val)//其中...val相当于解构+剩余运算符
        {     
            console.log(val); 
        }
        shownumber(1,2,4,4)
//如果当剩余运算符，那么rest参数之后不能再有其他参数（只能是最后一个参数，否则会报错）例:
function show1(a,b,...c)
{
  console.log(a,b,c);
}
show1(1,2,3,4,5);//得到的结果为1,2,[3,4,5]
//解构赋值可以将字符串转换为数组，以及浅拷贝数组
console.log(...'hekkk');
let arr=[1,2,3];
let arr1=[...arr];


//5.模板字符串
let a='kkk';
console.log(`我是一个${a}`)//用两个反引号，需要拼接的地方用${};








