//引入依赖

var express = require('express');
var utility = require('utility');

//创建一个express实例
var app =express();


app.get('/',function(req,res){
    // 从req.query 中获取我们的参数
    var q = req.query.q;
    
    //调用  utility.md5 方法
    var md5Value=utility.md5(q);
    
    //调用  utility.sha1 方法
    var sha1Value=utility.sha1(q);
    res.send(md5Value+' '+sha1Value);
});


app.listen(3000 , function(req,res){
	console.log('this app is running in post 3000');
});
