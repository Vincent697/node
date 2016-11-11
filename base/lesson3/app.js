// 依赖  express superagent cheerio

//superagent 是一个  http 方面的库。可以发起 get 或者是 post 请求

//使用 superagent 和  cheerio 完成一个简单的 爬虫 demo

var express = require('express');

var superagent = require('superagent');

var cheerio = require('cheerio');

var app = express();

app.get('/',function(req,res,next){
	//用 supreagent 去抓取 edu.zhulong.com 的内容
	superagent.get('edu.zhulong.com')
		.end(function(err,sres){
			//常规的错误处理
			if(err){
				return next(err);
			}
			// sres.text里面  存储着网页的 html 内容，将它传给 cheerio.load 之后  
			// 就可以 得到一个实现了 jquery 接口的变量，我们习惯的命名为 '$'
			var $=cheerio.load(sres.text);
			var items=[];
			$('a').each(function(idx,element){
				var $ele=$(element);
				items.push({
					title: $ele.attr('title'),
					href: $ele.attr('href')
				});
			});
			res.send(items);
	});
	
});

app.listen('3000',function(req,res){});
