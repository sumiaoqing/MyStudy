//1.for...of遍历，以及for...in遍历
//for...of主要用来遍历数组
let arr=[1,2,3];
for(let item of arr)
{
    console.log(item);//得到结果1,2,3
}
//for...in主要用来遍历对象中的属性,例如json
let json={
    name:'su',
    age:18
}
for(let key in json)
{
    console.log(key);//json对象的键
    console.log(json[key]);//json对象的值
}


//2.新的数据结构Set,类似数组，但是其中的值唯一,可以用来数组去重
//主要有以下四个方法:
//add(value):添加某个值，返回Set结构本身
//delete(value):删除某个值，返回一个布尔值，表示是否删除成功
//has(value)：返回一个布尔值,判断此值是否为set成员,需要参数接收
//clear():清除所有成员
//有size的属性为set长度
let arr=['a','b','c','a'];
let set1=new Set(arr);//Set函数可以接受一个数组（或类似数组的对象）作为参数，用来初始化。
console.log(set1.size);
set1.add('d');
set1.delete('c');
var set11=set1.has('a');
set1.clear();
//Set结构的实例有4个遍历方法，可以用于遍历成员
set1.keys();//返回一个键名的遍历器  SetIterator {"a", "b", "c"}
set1.values();//返回一个键值的遍历器
set1.entries();//返回一个键值对的遍历器
set1.forEach();//使用回调函数遍历每个成员  

//3.新的数据结构Map,类似json，但是json的键（key)只能是字符串，json的值可以为任意类型
//主要有size属性，set,get,has,delete,clear等方法
//Map可以接受数组作为参数，数组成员还是一个数组
let map1=new Map([['000',0],['333',3]]);
map1.set('111',1);
map1.set('222',2);
console.log(map1.size);//4个
var m=map1.get('111');//get方法有返回值
//has,delete,clear用法和Set类似

//4.ES2017新增Object的3个属性,以及2个方法
var json2=
{
    name:'yyy'
    ,age:18
}
console.log(Object.keys(json2));//键的集合
console.log(Object.entries(json2));//项的集合
console.log(object.values(set2));//值的集合
Object.is('1','1');//接受两个参数，用来比较两个值是否严格相等，相当于===，不同之处有两点
//第一点：+0!=-0  第二点:NaN等于NaN
let arr3=[];
Object.assign(arr3,{name:'rrr',age:19});//接受二个参数，第一个目标对象，第二个source1,source2,...n

//5.新的数据结构Symbols，他的值是唯一的，不可变的
let sym=Symbol('Symbol');//目的为了生成一个唯一的标识符
console.log(typeof sym);
//不能new,用来定义唯一或一些私有类型


