//深入理解原型以及原型链

function Person(name,age)
{
   this.name=name;
   this.age=age;
}
Person.prototype.eat=function()
{
    console.log('eat');
}
let per=new Person('su',18);
console.dir(per.__proto__==Person.prototype);
console.log(per.__proto__.__proto__==Person.prototype.__proto__);
console.log(Person.prototype.__proto__==Object.prototype);
console.log(Object.prototype.__proto__==null);

//原型的指向是否可以改变
//实例对象的原型__proto__指向的是该对象所有的构造函数的原型对象

//构造函数的原型对象(prototype)指向如果改变了，实例对象的(__proto__)指向也会发生改变
//实例对象和原型对象的关系是通过__proto__原型来联系起来的关系就叫原型链