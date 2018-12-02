//改变this指向的三个方法
//apply
//函数名字.apply(对象,[参数1,参数2]);
//方法名字.apply(对象,[参数1,参数2]);
//call
//函数名字.(对象,参数1,参数2);
//方法名字.(对象,参数1,参数2);

//apply和call也可以是函数的调用方式
let x=1;
let y=2;
function f1(x,y)
{
  return x+y;
}
f1(10,20);
f1.apply(window,[10,20]);
f1.call(window,100,200);
//只是想要使用别的对象的方法，并且希望这个方法是当前对象的，那么就使用apply,call改变指向
//apply和call实际上并不在函数这个实例对象中，而是在function的prototype中

//bind的语法
//函数名.bind(对象，参数，参数);返回值是复制后的函数
//方法名.bind(对象，参数，参数);返回值是复制后的方法

//apply和call都是调用的时候改变this指向的,bind是复制的时候改变this的指向

//例子:
function Person(age)
{
    this.age=age;
}
Person.prototype.say=function()
{
    console.log(this.age);
}
function Stud(age)
{
    this.age=age;
}
let per=new Person(10);
let stu=new Stud(20);
per.say.call(stu);//此时得到的结果20
per.say.apply(stu);
per.say.bind(stu)();//bind有返回值,返回的是复制后的方法
