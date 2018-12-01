//1.Es6正则相关
//命名捕获,以前的做法
let str =  '2018-09-06';
let reg = /(\d{4})-(\d{2})-(\d{2})/;
let arr = str.match(reg);
//match() 方法可在字符串内检索指定的值，或找到一个或多个正则表达式的匹配。
let [year, month, day] = [arr[1], arr[2], arr[3]];//解构赋值
//现在使用命名捕获
let reg1 = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
//replace() 方法用于在字符串中用一些字符替换另一些字符，或替换一个与正则表达式匹配的子串
let newstr = str.replace(reg1, '$<month>/$<day>/$<year>');
//反向引用命名捕获\k

//2.proxy代理
//对象只需关注于核心逻辑，一些非核心的逻辑，增强对象的一些功能
//proxy的作用:
//比如vue中拦截，预警，上报，扩展，统计，增加对象
//proxy是设计模式的一种代理模式
//语法：new Proxy(target,handler)target:被代理的对象，handler:对代理的对象做什么操作
//set(){},get(){},deleteProperty(){},has(){},apply(){}
//实现操作：访问一个对象身上的属性，默认不存在的时候给undefined,希望不存在的时候给警告信息
let obj={
    name:'sss'
}
let handler=
{
    get(target,key)
    {
        if(key in target)
        {
            return target[key];
        }
        else
        {
            console.warn(`${key}属性不在此对象身上`);
        }
    }
}
let newobj=new Proxy(obj,handler);
console.log(newobj.name);

//3.Reflect语法详解--未掌握

//4.标签函数
//以及正则dotAll中的s

//5.Math新增
Math.trunc();//截取只保留整数部分4.5->4
Math.sign();//判断数值-5=>-1,5=>1,0=>0,-0=>-0
Math.cbrt();//计算一个数的立方根

//6.Es6的模块化
export default uuu.js;//定义模块
import a from 'uuu.js' ;//使用模块

