//Json对象详解
//json对象和javascript的字面量创建对象相比,有两个地方有明显差异
//1.不需要声明变量
//2.没有末尾的分号
//json的对象的key必须要用双引号括起来

//js字面量创建对象
let obj=
{
    name:'su',
    age:20
};
//json对象的格式
let json={
    "name":"fff",
    "age":19
}

//json可以表示数组，也没有变量分号
let arr=[{"name":"su"},{"age":29}];

//json流行的原因
//1.与js拥有类似的语法特性
//2.可以把json对象解析为有用的js对象

JSON.stringify(obj);//把js对象序列化为json字符串 结果:{"name":"su","age":20}

JSON.parse();//把json数据格式解析为有用的js对象,
//传入json报错的原因:因为把Object作为参数传到JSON.parse()里时，它会默把Object转为string,已经是js对象了

//用来过滤结果
JSON.stringify(obj,["name"]);//第一个参数为对象,第二个参数传递的数组 结果{"name":"su"}

let arr=["hyui","fhihfih"];
let json2=JSON.stringify(arr,function(key,value)//第一个参数为数组,第二个参数为函数 
{    
        return value.join(",");//结果为 "hyui,fhihfih"
})
JSON.parse(json2);//得到结果： hyui,fhihfih

//json和jsonp的区别
//JSON是一种基于文本的数据交换方式（不支持跨域），而JSONP是一种非官方跨域数据交互协议。
//简单地使用json并不能支持跨域资源请求，为了解决这个问题，需要采用jsonp数据交互协议。
//该协议的一个要点就是允许用户传递一个callback参数给服务端，
//然后服务端返回数据时会将这个callback参数作为函数名来包裹住JSON数据，这样客户端就可以随意定制自己的函数来自动处理返回数据了。
//jsonp格式
callback({"name":"fff"})

