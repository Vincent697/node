var express = require('express');
//首先引入 cookie-parser 这个模块
var cookieParser = require('cookie-parser');

var app= express();

app.listen(3000);

//使用cookieParser 中间件，cookieParser(secret,options)
//secret 是用来加密 cookie字符串（下面会提到 signedCookies）
//options 传入 cookie 的可选参数

app.use(cookieParser());

app.get('/',function(req,res){
    //如果请求中的 cookie 存在isVisit 则输出cookie
    //否则，设置cookie字段isVisit, 并设置过期时间为 1分钟
    if(req.cookies.isVisit){
        console.log(req.cookie);
        res.send("欢迎再次访问");
    }else{
        res.cookie('isVisit',1,{maxAge: 60*1000});
        res.send("欢迎第一次访问");
    }
});