//原生ajax
//ajax就是浏览器提供的一套api,可以通过jacascript调用,从而实现通过代码控制请求与响应，实现网络编程

//请求类型为GET
//1.创建异步对象
let xhr=new XMLHttpRequest();//xhr发送请求接受响应
//2.设置请求的url参数,参数一是请求的类型,参数二是请求的url,可以带参数
xhr.open('GET','time.php');
//3.发送请求
xhr.send();
//4.注册事件 onreadystatechange 状态改变就会调用
xhr.onreadystatechange=function()
{
    if(xhr.readyState==4 &&xhr.status==200)
    {
//5.如果能够进到这个判断 说明 数据 完美的回来了,并且请求的页面是存在的
  console.log(this.response);//获得字符串形式的响应数据。
    }
}

//请求类型为POST
//1.创建异步对象 
let xhr1=new XMLHttpRequest();
//2.设置请求的类型及url,post请求一定要添加请求头才行不然会报错
xhr1.setRequestHeader("Content-type","application/x-www-form-urlencoded");
xhr.open('POST','time.php');
//3.发送请求
xhr1.send();
//4.注册事件
xhr1.onreadystatechange=function()
{
    if(xhr1.readyState==4 &&xhr1.status==200)
    {
//5.如果能够进到这个判断 说明 数据 完美的回来了,并且请求的页面是存在的
  console.log(this.responseText);//获得字符串形式的响应数据。
    }
}

//readystate
//0=>代理xhr被创建，但是尚未调用open方法
//1=>open()方法已经被调用，建立了连接
//3=>send()方法已经被调用，并且已经可以获取状态行和响应头
//4=>响应体下载中,responseText属性可能已经包含部分数据
//5=>响应体下载完成,可以直接使用responseText

//跨域
//同源策略：不同源之间默认不能相互相互发送ajax请求
//不同源地址之间如果需要相互请求,必须服务端和客户端相互配合才能完成

//跨域资源共享cors???

//json和jsonp的区别
//JSON是一种基于文本的数据交换方式（不支持跨域），而JSONP是一种非官方跨域数据交互协议。
//简单地使用json并不能支持跨域资源请求，为了解决这个问题，需要采用jsonp数据交互协议。
//该协议的一个要点就是允许用户传递一个callback参数给服务端，
//然后服务端返回数据时会将这个callback参数作为函数名来包裹住JSON数据，这样客户端就可以随意定制自己的函数来自动处理返回数据了。

//关于html几种标签能否获取数据的说明
//<img src="http://www.baidu.com?id=xxx"> 支持，可以接受服务端数据，过程复杂
//<iframe src="http://www.baidu.com?id=xxx" frameborder="0"></iframe> 会在css处理阶段报错
//<script src="http://www.baidu.com?id=xxx"></script> script可以接受数据并处理

//jsonp是通过动态<script>元素来使用的，使用时可以为src属性指定一个跨域url
let script1=document.createElement('script');
script1.src='http://www.laoxiagnbang.com/data.php?callback=getData';
document.body.appendChild(script1);

function getData(data)
{
    console.log(data);
}

//ajax的jsonp方式跨源
$.ajax(
    {
       type:"GET",
       url:'http://www.laoxiagnbang.com/data.txt',
       async:true,
       dataType:'jsonp',
       jsonp:"callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认）
       jsonpCallback:"handle",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
       success:function(data)
       {
           console.log(data);
       }
    }
)
//data.txt文件格式如下 handle({"data":"myname"})//handle为回调函数
